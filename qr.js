/* Minimal QR encoder - byte mode, EC level M, versions 1..10, all 8 masks scored.
   Vanilla, no dependencies, so the whole app stays one self-contained file. */
var QR=(function(){
  var EXP=[],LOG=[];
  (function(){var x=1;for(var i=0;i<256;i++){EXP[i]=x;LOG[x]=i;x<<=1;if(x&256)x^=0x11D;}})();
  function mul(a,b){return (a===0||b===0)?0:EXP[(LOG[a]+LOG[b])%255];}
  function rsPoly(n){var p=[1];for(var i=0;i<n;i++){var q=[1,EXP[i]],r=[];
    for(var j=0;j<p.length+1;j++)r[j]=0;
    for(var a=0;a<p.length;a++)for(var b=0;b<2;b++)r[a+b]^=mul(p[a],q[b]);
    p=r;}return p;}
  /* data codewords / ec-per-block / blocks, EC level M, versions 1..10 */
  var V=[null,
    {t:26,e:10,b:1},{t:44,e:16,b:1},{t:70,e:26,b:1},{t:100,e:18,b:2},{t:134,e:24,b:2},
    {t:172,e:16,b:4}];   /* versions 7-10 removed: they need version-info blocks
                            and a 16-bit length that this encoder does not write. */
  function cap(v){var s=V[v];return s.t-s.e*s.b;}

  function make(text){
    var bytes=[],i;
    for(i=0;i<text.length;i++){var c=text.charCodeAt(i);
      if(c<128)bytes.push(c);
      else if(c<2048){bytes.push(192|c>>6,128|c&63);}
      else {bytes.push(224|c>>12,128|c>>6&63,128|c&63);}}
    var ver=1;while(ver<6&&bytes.length+2>cap(ver))ver++;
    if(bytes.length+2>cap(ver)) throw new Error("QR payload too long: "+bytes.length+" bytes");
    var spec=V[ver],total=cap(ver);
    /* bit stream: mode 0100, length, data, terminator */
    var bits=[];
    function put(val,len){for(var k=len-1;k>=0;k--)bits.push((val>>k)&1);}
    put(4,4); put(bytes.length,8);
    for(i=0;i<bytes.length;i++)put(bytes[i],8);
    for(i=0;i<4&&bits.length<total*8;i++)bits.push(0);
    while(bits.length%8)bits.push(0);
    var data=[];for(i=0;i<bits.length;i+=8){var b=0;for(var j=0;j<8;j++)b=(b<<1)|bits[i+j];data.push(b);}
    var pad=[236,17],pi=0;while(data.length<total)data.push(pad[pi++%2]);

    /* split into blocks, compute EC, interleave */
    var nb=spec.b, base=Math.floor(total/nb), extra=total%nb, blocks=[],ecs=[],p=0;
    var gp=rsPoly(spec.e);
    for(i=0;i<nb;i++){
      var len=base+(i>=nb-extra?1:0), blk=data.slice(p,p+len);p+=len;
      blocks.push(blk);
      var rem=blk.concat(new Array(spec.e).fill(0));
      for(var d=0;d<blk.length;d++){var f=rem[d];if(f!==0)
        for(var g=1;g<gp.length;g++)rem[d+g]^=mul(gp[g],f);}
      ecs.push(rem.slice(blk.length));
    }
    var out=[],mx=Math.max.apply(null,blocks.map(function(b){return b.length;}));
    for(i=0;i<mx;i++)for(var k2=0;k2<nb;k2++)if(i<blocks[k2].length)out.push(blocks[k2][i]);
    for(i=0;i<spec.e;i++)for(var k3=0;k3<nb;k3++)out.push(ecs[k3][i]);

    /* lay out the matrix */
    var n=17+ver*4, m=[],res=[];
    for(i=0;i<n;i++){m[i]=[];res[i]=[];for(var j2=0;j2<n;j2++){m[i][j2]=0;res[i][j2]=0;}}
    function fn(r,c){ if(r<0||c<0||r>=n||c>=n)return; m[r][c]=1;res[r][c]=1; }
    function set(r,c,v){ if(r<0||c<0||r>=n||c>=n)return; m[r][c]=v;res[r][c]=1; }
    function finder(r,c){for(var a=-1;a<8;a++)for(var b=-1;b<8;b++){
      if(r+a<0||c+b<0||r+a>=n||c+b>=n)continue;
      var on=(a>=0&&a<=6&&(b===0||b===6))||(b>=0&&b<=6&&(a===0||a===6))||(a>=2&&a<=4&&b>=2&&b<=4);
      set(r+a,c+b,on?1:0);}}
    finder(0,0);finder(0,n-7);finder(n-7,0);
    for(i=8;i<n-8;i++){set(6,i,i%2?0:1);set(i,6,i%2?0:1);}
    if(ver>1){var al=[6,n-7];
      for(var x1=0;x1<al.length;x1++)for(var y1=0;y1<al.length;y1++){
        var ar=al[y1],ac=al[x1];
        if((ar===6&&ac===6)||(ar===6&&ac===n-7)||(ar===n-7&&ac===6))continue;
        for(var a2=-2;a2<=2;a2++)for(var b2=-2;b2<=2;b2++)
          set(ar+a2,ac+b2,(Math.abs(a2)===2||Math.abs(b2)===2||(a2===0&&b2===0))?1:0);}}
    for(i=0;i<9;i++){if(i!==6){res[8][i]=1;res[i][8]=1;}}
    for(i=0;i<8;i++){res[8][n-1-i]=1;res[n-1-i][8]=1;}
    set(n-8,8,1);

    /* place data, zig-zag from bottom right */
    var bi=0,dir=-1,row=n-1;
    for(var col=n-1;col>0;col-=2){ if(col===6)col--;
      while(true){ for(var s2=0;s2<2;s2++){ var cc=col-s2;
          if(!res[row][cc]){ var bit=0;
            if(bi<out.length*8){bit=(out[bi>>3]>>(7-(bi&7)))&1;}
            m[row][cc]=bit; bi++; } }
        row+=dir; if(row<0||row>=n){row-=dir;dir=-dir;break;} } }

    /* pick the mask with the lowest penalty */
    function maskAt(k,r,c){switch(k){
      case 0:return (r+c)%2===0; case 1:return r%2===0; case 2:return c%3===0;
      case 3:return (r+c)%3===0; case 4:return (Math.floor(r/2)+Math.floor(c/3))%2===0;
      case 5:return (r*c)%2+(r*c)%3===0; case 6:return ((r*c)%2+(r*c)%3)%2===0;
      default:return ((r+c)%2+(r*c)%3)%2===0;}}
    var FMT=[0x5412,0x5125,0x5E7C,0x5B4B,0x45F9,0x40CE,0x4F97,0x4AA0]; /* level M, mask 0..7 */
    var best=null,bestPen=Infinity;
    for(var k4=0;k4<8;k4++){
      var g2=[];for(i=0;i<n;i++){g2[i]=[];for(var j3=0;j3<n;j3++)
        g2[i][j3]=res[i][j3]?m[i][j3]:(m[i][j3]^(maskAt(k4,i,j3)?1:0));}
      var f2=FMT[k4];
      /* Format info, 15 bits, written twice. Copy 1 runs along row 8 then up
         column 8; copy 2 runs up column 8 from the bottom then along row 8 from
         the right. Getting these coordinates wrong yields a matrix that looks
         perfect and decodes as nothing. */
      for(i=0;i<15;i++){var b3=(f2>>i)&1;
        if(i<6)       g2[8][i]=b3;
        else if(i===6)g2[8][7]=b3;
        else if(i===7)g2[8][8]=b3;
        else if(i===8)g2[7][8]=b3;
        else          g2[14-i][8]=b3;
        /* copy 2: bits 0-6 climb column 8 from the bottom, then bit 7 onward run
           along row 8 from the right. Bit 7 must NOT land on (n-8,8) - that cell
           is the dark module, and writing it there is what broke masks 0 and 3. */
        if(i<7) g2[n-1-i][8]=b3;
        else    g2[8][n-15+i]=b3;}
      g2[n-8][8]=1;
      /* penalty: runs of 5+, 2x2 blocks, dark ratio */
      var pen=0,dark=0;
      for(i=0;i<n;i++){var rr=1,cr=1;
        for(var j4=1;j4<n;j4++){
          rr=(g2[i][j4]===g2[i][j4-1])?rr+1:1; if(rr===5)pen+=3; else if(rr>5)pen++;
          cr=(g2[j4][i]===g2[j4-1][i])?cr+1:1; if(cr===5)pen+=3; else if(cr>5)pen++;}}
      for(i=0;i<n-1;i++)for(var j5=0;j5<n-1;j5++){
        var v0=g2[i][j5];
        if(v0===g2[i][j5+1]&&v0===g2[i+1][j5]&&v0===g2[i+1][j5+1])pen+=3;}
      for(i=0;i<n;i++)for(var j6=0;j6<n;j6++)if(g2[i][j6])dark++;
      pen+=Math.floor(Math.abs(dark*100/(n*n)-50)/5)*10;
      if(pen<bestPen){bestPen=pen;best=g2;}
    }
    return best;
  }

  /* render to an SVG string - crisp at any size, prints fine */
  function svg(text,px,fg,bg){
    var g=make(text),n=g.length,q=4,d=n+q*2,s="";
    for(var r=0;r<n;r++){var run=0;
      for(var c=0;c<n;c++){
        if(g[r][c])run++;
        if((!g[r][c]||c===n-1)&&run){var w=run,x=(c+(g[r][c]?1:0))-run+q;
          s+='<rect x="'+x+'" y="'+(r+q)+'" width="'+w+'" height="1"/>';run=0;}}}
    return '<svg viewBox="0 0 '+d+' '+d+'" width="'+px+'" height="'+px+'" '+
      'shape-rendering="crispEdges" xmlns="http://www.w3.org/2000/svg">'+
      '<rect width="'+d+'" height="'+d+'" fill="'+(bg||"#fff")+'"/>'+
      '<g fill="'+(fg||"#000")+'">'+s+'</g></svg>';
  }
  return {svg:svg,make:make};
})();
