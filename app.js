/* ---------------- fabrics + real quilt blocks ---------------- */
var FAB=[
 {n:"amber", a:"#B8762E",b:"#E3BB84"},{n:"sage",  a:"#5B7B62",b:"#A8C0A4"},
 {n:"plum",  a:"#7C6A9C",b:"#BCAFD2"},{n:"ochre", a:"#C08B3E",b:"#E6C78A"},
 {n:"teal",  a:"#4F7383",b:"#9DBAC4"},{n:"rose",  a:"#B5697A",b:"#E0B0B8"},
 {n:"navy",  a:"#22304F",b:"#8E9BB6"},{n:"moss",  a:"#6E7A46",b:"#BCC48F"}
];
var CREAM="#F7F0E3";
function block(kind,f,ghost){
  var a=ghost?"#C9CFDA":f.a, b=ghost?"#DFE3EA":f.b, g=ghost?"#EFE6D6":CREAM;
  var s='<svg class="blk" viewBox="0 0 60 60" preserveAspectRatio="none" aria-hidden="true">';
  s+='<rect width="60" height="60" fill="'+g+'"/>';
  if(kind===0){
    s+='<path d="M0 0h30v30H0z" fill="'+b+'"/><path d="M0 0h30L0 30z" fill="'+a+'"/>';
    s+='<path d="M30 0h30v30H30z" fill="'+a+'"/><path d="M60 0v30H30z" fill="'+b+'"/>';
    s+='<path d="M0 30h30v30H0z" fill="'+a+'"/><path d="M0 60V30h30z" fill="'+b+'"/>';
    s+='<path d="M30 30h30v30H30z" fill="'+b+'"/><path d="M60 60H30V30z" fill="'+a+'"/>';
  }else if(kind===1){
    for(var r=0;r<3;r++)for(var c=0;c<3;c++)
      s+='<rect x="'+c*20+'" y="'+r*20+'" width="20" height="20" fill="'+((r+c)%2?b:a)+'"/>';
  }else if(kind===2){
    var cs=[a,b,a,b,a,b];
    for(var i=0;i<6;i++){var p=i*5;
      s+='<rect x="'+p+'" y="'+p+'" width="'+(60-p*2)+'" height="'+(60-p*2)+'" fill="'+cs[i]+'"/>';}
    s+='<rect x="26" y="26" width="8" height="8" fill="'+a+'"/>';
  }else if(kind===3){
    for(var k=0;k<4;k++){var y=k*15;
      s+='<rect y="'+y+'" width="60" height="15" fill="'+b+'"/>';
      s+='<path d="M0 '+(y+15)+'L30 '+y+'L60 '+(y+15)+'z" fill="'+a+'"/>';}
  }else if(kind===4){
    s+='<path d="M30 30L0 0h30z" fill="'+a+'"/><path d="M30 30L60 0v30z" fill="'+b+'"/>';
    s+='<path d="M30 30L60 60H30z" fill="'+a+'"/><path d="M30 30L0 60V30z" fill="'+b+'"/>';
    s+='<path d="M30 30L30 0h30z" fill="'+b+'"/><path d="M30 30L60 30v30z" fill="'+a+'"/>';
    s+='<path d="M30 30L30 60H0z" fill="'+b+'"/><path d="M30 30L0 30V0z" fill="'+a+'"/>';
  }else if(kind===5){
    s+='<rect width="60" height="60" fill="'+b+'"/><rect x="20" y="20" width="20" height="20" fill="'+a+'"/>';
    s+='<path d="M20 20L30 0l10 20z" fill="'+a+'"/><path d="M40 20L60 30 40 40z" fill="'+a+'"/>';
    s+='<path d="M40 40L30 60 20 40z" fill="'+a+'"/><path d="M20 40L0 30l20-10z" fill="'+a+'"/>';
  }else if(kind===6){
    for(var q=0;q<4;q++)for(var r2=0;r2<4;r2++){var x=q*15,yy=r2*15,alt=(q+r2)%2;
      s+='<rect x="'+x+'" y="'+yy+'" width="15" height="5" fill="'+(alt?a:b)+'"/>';
      s+='<rect x="'+x+'" y="'+(yy+5)+'" width="15" height="5" fill="'+(alt?b:a)+'"/>';
      s+='<rect x="'+x+'" y="'+(yy+10)+'" width="15" height="5" fill="'+(alt?a:b)+'"/>';}
  }else{
    s+='<rect x="4" y="4" width="22" height="22" fill="'+a+'"/><rect x="34" y="4" width="22" height="22" fill="'+b+'"/>';
    s+='<rect x="4" y="34" width="22" height="22" fill="'+b+'"/><rect x="34" y="34" width="22" height="22" fill="'+a+'"/>';
    s+='<circle cx="30" cy="30" r="9" fill="'+a+'"/><circle cx="30" cy="30" r="4.5" fill="'+g+'"/>';
  }
  s+='<path d="M0 15h60M0 30h60M0 45h60M15 0v60M30 0v60M45 0v60" stroke="rgba(255,255,255,.15)" stroke-width="1" stroke-dasharray="2 3"/>';
  return s+'</svg>';
}
function esc(t){return String(t==null?"":t).replace(/[&<>"]/g,function(c){
  return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];});}
function pinSvg(){return '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#4E5566" stroke-width="2"><path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11z"/><circle cx="12" cy="10" r="2.6"/></svg>';}

/* ---------------- the drive ---------------- */
var DRIVE={name:"Northside Winter Drive",ends:"14 December",org:"Northside Trust"};
var SQUARES=[
 {t:"A family of five &middot; warm coats, two children under six",s:"wait",days:3},
 {t:"A grandmother raising two &middot; groceries for the week",s:"held",by:"Maria",note:"dropping off Thursday",f:1,k:2},
 {t:"A teenager &middot; nobody has claimed anything for this age yet",s:"wait",days:6},
 {t:"A single dad, three kids &middot; winter boots",s:"held",by:"the Okonkwo family",note:"packed",f:2,k:5},
 {t:"A newborn arriving in January &middot; anything at all",s:"held",by:"Dev",note:"delivered",f:3,k:0},
 {t:"Two sisters, 9 and 11 &middot; a warm bed each",s:"wait",days:2},
 {t:"An older couple &middot; heating oil and a hot meal",s:"held",by:"St Anne's",note:"delivered",f:4,k:3},
 {t:"A family of three &middot; nothing specified, they didn't want to ask",s:"wait",days:8},
 {t:"A mum on her own &middot; a winter coat, size 12",s:"held",by:"the Reyes family",note:"packed",f:5,k:1},
 {t:"A boy of seven who loses track of time building things",s:"wait",days:1},
 {t:"Someone living alone &middot; a hot meal and company",s:"held",by:"Tomas",note:"delivered",f:6,k:6},
 {t:"A family of six &middot; bedding, and the heating is off",s:"wait",days:4}
];
var STREETS=["14 Farrow Lane","3 Beckwith Court","82 Alder Row","27 Hollis Street",
 "9 Marsden Terrace","51 Quayle Road","6 Ivybridge Close","33 Pennant Way",
 "18 Cobham Rise","70 Sedge Walk","5 Lantern Yard","44 Birchall Grove"];
var WINDOWS=["Left on the doorstep, no knock","Pull up and we load the boot","A ten minute window, no queue"];
SQUARES.forEach(function(d,i){
  if(d.k===undefined)d.k=(i*3+1)%8;
  d.addr=STREETS[i%STREETS.length]+", Northside";
  d.how=WINDOWS[i%3];
  d.by_when=["Thursday","Friday","next Monday","Saturday"][i%4];
});

var TASKS=[
 {when:"Today<br>9:00",t:"Sorting warm coats and bedding",where:"Lower hall, tables along the north wall",st:"wait"},
 {when:"Today<br>13:30",t:"North neighbourhood delivery run",where:"Loading bay behind the church",st:"wait"},
 {when:"Sat<br>10:00",t:"Morning collection desk",where:"Front entrance table by the steps",st:"done"}
];
var PLEDGES=[
 {t:"Warm coats &times; 4",st:"wait",note:"Stitched to your name. Waiting for drop-off."},
 {t:"Bedding for two",st:"done",note:"Received at the hall and folded into the drive."}
];
var JOURNAL=[
 {d:"Tuesday, 3 December",t:"The hall is warm and ready",
  p:"The board opened this morning with unsewn squares across the hall. Arthur brought three boxes of heavy knit gloves before nine, and Martha set up the packing tables by the heaters. We are still finding our rhythm, but the hall is warm and ready."},
 {d:"Friday, 6 December",t:"Parcels stacking up at the back",
  p:"Several more squares were stitched in today, mostly for warm boots and bedding. David spent the afternoon loading vans while Clara sorted woollen socks by size. The room at the back of the hall is filling up with parcels ready to go."},
 {d:"Wednesday, 11 December",t:"We are short on children's coats",
  p:"We are falling behind on children's winter coats, and several squares are stuck waiting because of it. Our storage shelves for heavy outerwear were completely bare by five o'clock. Sarah is reaching out to nearby community groups tomorrow morning to see if we can find more."},
 {d:"Monday, 16 December",t:"Every parcel reached a porch before dark",
  p:"A steady day at the hall despite the sleet outside. Thomas and Elena drove the northern delivery route so that every parcel reached a front porch before dark. Only a few squares remain on the board tonight, and the quilt is almost whole."}
];
var SPONSORS=["Kirkby & Sons Hardware","The Corner Bakery","Northside Dental","Lena's Flowers"];

/* ---------------- state ---------------- */
var ME=null, VIEW="quilt", FILTER="all", pickFab=0, pickIdx=-1, pickPet=-1;
var $=function(id){return document.getElementById(id);};
function waiting(){return SQUARES.filter(function(d){return d.s==="wait";});}
function fabFor(name){return FAB[(String(name).length*3+String(name).charCodeAt(0))%8];}

/* ---------------- shell ---------------- */
function header(){
  var h='<button class="brand" onclick="go(\'quilt\')">DrivePatch</button>'+
        '<span class="drivepick">'+DRIVE.name+' &middot; ends '+DRIVE.ends+'</span><span class="spacer"></span>';
  if(!ME) h+='<button class="btn ghost" onclick="openAuth()">Sign in</button>'+
             '<button class="btn" onclick="go(\'ask\')">Ask for something</button>';
  else {
    var f=fabFor(ME.name);
    h+='<span class="me"><span class="sw">'+block(2,f,false)+'</span>'+
       '<span>'+esc(ME.name)+'</span><span class="role-pill">'+ME.role+'</span>'+
       '<button class="no" style="padding:4px" onclick="signOut()">sign out</button></span>';
  }
  $("top").innerHTML=h;
  var tabs=[["quilt","The quilt"],["pets","Pets &amp; shelter"],["journal","Drive journal"],["sponsor","Sponsor a drive"]];
  if(ME&&ME.role!=="family") tabs.unshift(["dash","Dashboard"]);
  if(ME&&ME.role==="volunteer") tabs.splice(2,0,["mine","My tasks"]);
  if(ME&&ME.role==="provider")  tabs.splice(2,0,["mine","My pledges"]);
  if(ME&&ME.role==="admin")     tabs.splice(2,0,["mine","Run the drive"],["people","Everyone"]);
  if(ME&&ME.role==="family")    tabs=[["slip","My request"],["pets","Pets &amp; shelter"],["journal","Drive journal"]];
  $("nav").innerHTML=tabs.map(function(t){
    return '<button class="'+(VIEW===t[0]?"on":"")+'" onclick="go(\''+t[0]+'\')">'+t[1]+'</button>';}).join("");
}
function go(v){VIEW=v;render();window.scrollTo(0,0);}
function signOut(){ME=null;VIEW="quilt";render();}

/* ---------------- views ---------------- */
function countBar(){
  var w=waiting().length,tot=SQUARES.length;
  return '<div class="count'+(w?"":" done")+'"><b>'+(w||"Nobody")+'</b>'+
    '<span class="lab">'+(w===1?"household still waiting":(w?"households still waiting":"is waiting"))+'</span>'+
    '<span class="sub">'+(tot-w)+' of '+tot+' taken care of<br>'+
    '<em>'+(w?"longest wait is "+Math.max.apply(null,waiting().map(function(d){return d.days||0;}))+" days":"the quilt is finished")+'</em></span></div>';
}
function quiltHTML(){
  return SQUARES.map(function(d,i){
    var held=d.s==="held", f=FAB[held?d.f:0], hid=(FILTER==="wait"&&held)?" hide":"";
    return '<button class="patch '+(held?"held":"waiting")+hid+'" data-i="'+i+'"'+(held?" disabled":"")+'>'+
      block(d.k,f,!held)+'<span class="stitch"></span><span class="lbl">'+
      '<span class="tag"><i></i>'+(held?"taken care of":"still waiting")+'</span>'+
      '<span class="need">'+d.t+'</span>'+
      (held?'<span class="by">Stitched in by '+esc(d.by)+' &middot; '+esc(d.note)+'</span>'
           :'<span class="cta">I\'ll volunteer</span>')+
      '</span></button>';}).join("");
}
function contributors(){
  var seen={},out=[];
  SQUARES.forEach(function(d){if(d.s==="held"&&!seen[d.by]){seen[d.by]=1;
    out.push('<span class="person"><span class="sw">'+block(1,FAB[d.f],false)+'</span><b>'+esc(d.by)+'</b></span>');}});
  return out.join("");
}
function vQuilt(){
  return '<div class="hero"><h1>A drive where <em>nobody waits.</em></h1>'+
    '<p class="lede">Every other drive counts what came in. This one counts who hasn\'t been reached yet, and the number only goes down.</p></div>'+
    countBar()+
    '<div class="bar"><h2>The quilt</h2>'+
    '<button class="chip '+(FILTER==="all"?"on":"")+'" onclick="setF(\'all\')">Everything</button>'+
    '<button class="chip '+(FILTER==="wait"?"on":"")+'" onclick="setF(\'wait\')">Only what\'s still waiting</button>'+
    '<span class="hint">Every square is one household. Take one and it\'s yours to finish.</span></div>'+
    '<div class="quilt" id="quilt">'+quiltHTML()+'</div>'+
    '<div class="sect">who is holding a square</div><div class="people">'+contributors()+'</div>'+
    '<div class="foot"><b>Nobody\'s name appears on this quilt.</b> Households are shown as the shape of what they need, never as who they are. Only the organisers can see who is who, and only because somebody has to hand the coats over.</div>';
}
function vMineVolunteer(){
  var t=TASKS.map(function(k){
    return '<div class="row"><div class="when">'+k.when+'</div><div class="body">'+
      '<h4>'+k.t+'</h4><div class="where">'+pinSvg()+esc(k.where)+'</div></div>'+
      '<div class="side"><span class="pill '+(k.st==="done"?"done":"wait")+'">'+
      (k.st==="done"?"done":"to do")+'</span></div></div>';}).join("");
  return '<h1 style="font-size:34px;margin-bottom:6px">Hello, '+esc(ME.name)+'.</h1>'+
    '<p class="lede">Thank you for giving your time to the drive today.</p>'+
    '<div class="sect">here are the places where hands are needed right now</div>'+t+
    '<div class="card" style="margin-top:8px"><div class="qr">'+
    '<div class="code">'+QR.svg("DRIVEPATCH:CHECKIN:"+encodeURIComponent(ME.name)+":NORTHSIDE",130,"#22304F","#FEFBF6")+'</div>'+
    '<div class="txt"><h4>Scan code to check in</h4>'+
    '<p>When you arrive, please check in at the garden gate before heading to your spot. '+
    'The organiser scans this, so you never have to find anyone or sign a clipboard.</p></div></div></div>';
}
function vMineProvider(){
  var p=PLEDGES.map(function(k){
    return '<div class="row"><div class="body"><h4>'+k.t+'</h4>'+
      '<div class="where" style="margin-top:6px">'+esc(k.note)+'</div></div>'+
      '<div class="side"><span class="pill '+(k.st==="done"?"done":"wait")+'">'+
      (k.st==="done"?"received":"not dropped off")+'</span></div></div>';}).join("");
  return '<h1 style="font-size:34px;margin-bottom:6px">Welcome back, '+esc(ME.name)+'.</h1>'+
    '<p class="lede">Thank you for taking a square on the quilt.</p>'+
    '<div class="sect">the squares you have promised for this drive</div>'+p+
    '<div class="card" style="margin-top:8px"><div class="qr">'+
    '<div class="code">'+QR.svg("DRIVEPATCH:DROPOFF:"+encodeURIComponent(ME.name)+":NORTHSIDE",130,"#22304F","#FEFBF6")+'</div>'+
    '<div class="txt"><h4>Tape this to your bag</h4>'+
    '<p>Please bring items to the parish hall side door between ten and four on weekdays. '+
    'Whoever receives it scans this and your square turns warm the same minute.</p></div></div></div>'+
    '<div class="note" style="max-width:640px">You will not see the family name, to keep their winter quiet and private.</div>';
}
function vMineAdmin(){
  var longest=waiting().sort(function(a,b){return (b.days||0)-(a.days||0);}).slice(0,3);
  return '<h1 style="font-size:34px;margin-bottom:6px">The quilt today, square by square.</h1>'+
    '<p class="lede">You are the only person who sees real names, so keep this window private.</p>'+
    countBar()+
    '<div class="grid g3" style="margin-top:14px">'+
      '<div class="card"><div class="muted">still waiting</div><div class="big">'+waiting().length+'</div></div>'+
      '<div class="card"><div class="muted">volunteers with nothing to do</div><div class="big">2</div></div>'+
      '<div class="card"><div class="muted">pledges past drop-off</div><div class="big" style="color:var(--warm)">1</div></div>'+
    '</div>'+
    '<div class="sect">households waiting longest for an unsewn square to turn warm</div>'+
    longest.map(function(d){
      return '<div class="row"><div class="when">'+(d.days||0)+' days</div><div class="body">'+
        '<h4 style="font-size:17px">'+d.t+'</h4></div><div class="side">'+
        '<span class="pill '+((d.days||0)>5?"late":"wait")+'">'+((d.days||0)>5?"chase this":"waiting")+'</span></div></div>';}).join("")+
    '<div class="sect">this pledge is past its drop-off date and may need a quiet follow-up</div>'+
    '<div class="row"><div class="body"><h4 style="font-size:17px">Warm coats &times; 4 &mdash; promised by R. Alvarez</h4>'+
      '<div class="where" style="margin-top:6px">Due at the hall two days ago</div></div>'+
      '<div class="side"><span class="pill late">overdue</span></div></div>'+
    '<div class="rowb" style="margin-top:20px">'+
      '<button class="btn" onclick="exportCsv()">Download the drive records as a spreadsheet</button>'+
      '<span class="muted">names included, so keep the file safe</span></div>';
}
function vPeople(){
  return '<h1 style="font-size:32px;margin-bottom:14px">Everyone on this drive</h1>'+
   '<div class="sect">giving time</div><div class="people">'+
   ["Thomas","Elena","Clara","David","Martha"].map(function(n){
     return '<span class="person"><span class="sw">'+block(4,fabFor(n),false)+'</span><b>'+n+'</b><span>volunteer</span></span>';}).join("")+
   '</div><div class="sect">giving goods</div><div class="people">'+
   ["Maria","Dev","Tomas","the Okonkwo family","the Reyes family","St Anne's"].map(function(n){
     return '<span class="person"><span class="sw">'+block(1,fabFor(n),false)+'</span><b>'+esc(n)+'</b><span>provider</span></span>';}).join("")+
   '</div><div class="sect">households</div>'+
   '<div class="note" style="max-width:620px">Twelve households are registered on this drive. Their names are deliberately not listed here, even for you. Open a single square to see the one name you need at the moment you need it.</div>';
}
function vJournal(){
  return '<h1 style="font-size:34px;margin-bottom:8px">Drive journal</h1>'+
    '<p class="lede" style="margin-bottom:26px">What actually happened, written by the people running it. Everyone can read this, including the households.</p>'+
    JOURNAL.slice().reverse().map(function(p){
      return '<div class="post"><div class="date">'+p.d+'</div><h4>'+p.t+'</h4><p>'+p.p+'</p></div>';}).join("");
}
function vSponsor(){
  return '<div class="spon"><h2>Put your name on a whole <em>row of the quilt.</em></h2>'+
    '<p>A sponsor covers the squares nobody claims. Every drive has them: the teenagers, '+
    'the awkward sizes, the household that asked for nothing. That is where sponsorship goes first.</p>'+
    '<div class="tiers">'+
      '<button class="tier"><b>&pound;50</b><span>One square. One household who would otherwise still be waiting on the last day.</span></button>'+
      '<button class="tier"><b>&pound;250</b><span>A row of five, and your name on the drive journal.</span></button>'+
      '<button class="tier"><b>&pound;600</b><span>Sponsor the whole drive. Your name sits under the count all winter.</span></button>'+
    '</div>'+
    '<div class="sect" style="color:rgba(234,226,212,.6);margin-top:26px">already sponsoring this winter</div>'+
    '<div class="sponsors">'+SPONSORS.map(function(s){return '<span class="s">'+esc(s)+'</span>';}).join("")+'</div>'+
    '</div>'+
    '<div class="foot"><b>Sponsors never see a household.</b> They see the same quilt everyone else sees, and a receipt.</div>';
}
function vSlip(){
  var em=ME?ME.name:"The Winter Wren";
  return '<div class="slip"><div class="muted" style="letter-spacing:.14em;text-transform:uppercase;font-size:10.5px;font-weight:600">your slip</div>'+
    '<div class="em">'+esc(em)+'</div>'+
    '<p style="color:var(--ink2)">Here is where things stand with your square. You will never have to stand in a queue or explain your situation to anyone.</p>'+
    '<div class="steps">'+
      '<div class="step done"><span class="dot">&#10003;</span><div><h4>We have your note</h4><p>Your square is on the quilt board.</p></div></div>'+
      '<div class="step now"><span class="dot">&bull;</span><div><h4>A neighbour has taken your square</h4><p>They are putting everything together now. You do not need to call or wonder.</p></div></div>'+
      '<div class="step todo"><span class="dot"></span><div><h4>Ready for a quiet handover</h4><p>We will text you the moment it is ready, with the way you asked to receive it.</p></div></div>'+
    '</div>'+
    '<div class="note">If you have lost this slip, ring the number on your text. We will never ask you to prove who you are to get an answer about your own request.</div>'+
    '</div>';
}
function vAsk(){
  return '<div class="hero"><h1>Tell us <em>who is around your table.</em></h1>'+
    '<p class="lede">No documents. No queue. Nobody sees your name except the people packing the box.</p></div>'+
    '<div class="card" style="max-width:640px;margin-top:22px">'+
    '<div class="sl">who is at home</div>'+
    '<div class="rowb" style="margin-bottom:18px">'+
      '<button class="btn ghost" onclick="addWho(\'a child\')">+ a child</button>'+
      '<button class="btn ghost" onclick="addWho(\'a teenager\')">+ a teenager</button>'+
      '<button class="btn ghost" onclick="addWho(\'a grown-up\')">+ a grown-up</button>'+
      '<button class="btn ghost" onclick="addWho(\'an elder\')">+ an elder</button></div>'+
    '<div class="people" id="whoList" style="margin-bottom:18px"></div>'+
    '<div class="sl">what would make the biggest difference</div>'+
    '<input class="in" placeholder="warm coats, or a hot meal, or you do not have to say">'+
    '<div class="sl">and if there is a child, what makes them lose track of time?</div>'+
    '<input class="in" placeholder="building things, drawing, anything at all">'+
    '<div class="sl">how would you like to receive it</div>'+
    '<div class="rowb" style="margin-bottom:18px">'+
      '<button class="btn ghost">Left quietly on the doorstep</button>'+
      '<button class="btn ghost">Pull up and we load the boot</button>'+
      '<button class="btn ghost">A ten minute window, no line</button></div>'+
    '<button class="btn warm" onclick="go(\'slip\')">Send this quietly</button>'+
    '<div class="priv">We ask what a child loves because a present chosen for &ldquo;a boy, 9&rdquo; is a present that gets left in a cupboard. You will get a slip with two words on it, and that is the only thing you will ever need to check on this.</div>'+
    '</div>';
}
function addWho(k){var l=$("whoList");
  l.insertAdjacentHTML("beforeend",'<span class="person" style="padding-left:13px"><b>'+k+'</b></span>');}


/* ---------------- dashboards: what this person should do next ---------------- */
function statRow(items){
  return '<div class="grid g3" style="margin:18px 0 4px">'+items.map(function(s){
    return '<div class="card"><div class="muted">'+s[1]+'</div>'+
      '<div class="big"'+(s[2]?' style="color:'+s[2]+'"':'')+'>'+s[0]+'</div></div>';}).join("")+'</div>';
}
function nextCard(kicker,title,where,action,onclick){
  return '<div class="card" style="border-color:var(--navy);border-width:2px;margin-top:6px">'+
    '<div class="sl" style="margin-bottom:8px">'+kicker+'</div>'+
    '<h3 style="font-size:26px;margin-bottom:6px">'+title+'</h3>'+
    (where?'<div class="where" style="font-size:15px;color:var(--ink2);display:flex;align-items:center;gap:7px;margin-bottom:14px">'+pinSvg()+where+'</div>':'')+
    (action?'<button class="btn" onclick="'+onclick+'">'+action+'</button>':'')+'</div>';
}
function myHeld(){return SQUARES.filter(function(d){return d.s==="held"&&d.by===(ME&&ME.name);}).length;}
function myWalks(){var c=0;for(var k in BOOKED)c++;return c;}

function dashVolunteer(){
  var next=TASKS.filter(function(t){return t.st==="wait";})[0];
  return '<h1 style="font-size:36px;margin-bottom:4px">Hello, '+esc(ME.name)+'.</h1>'+
    '<p class="lede">Thank you for giving your time to the drive today.</p>'+
    (next?nextCard("your next shift",next.t,esc(next.where),"See all my tasks","go(\'mine\')"):
          nextCard("nothing booked","You have no active tasks right now.","","Find something to do","go(\'mine\')"))+
    statRow([[TASKS.filter(function(t){return t.st==="wait";}).length,"tasks to do"],
             [myHeld(),"squares you are holding"],
             [myWalks(),"walks booked"]])+
    '<div class="sect">the drive right now</div>'+countBar();
}
function dashProvider(){
  var open=PLEDGES.filter(function(p){return p.st==="wait";})[0];
  return '<h1 style="font-size:36px;margin-bottom:4px">Welcome back, '+esc(ME.name)+'.</h1>'+
    '<p class="lede">Thank you for taking a square on the quilt.</p>'+
    (open?nextCard("still to drop off",open.t,"Parish hall side door, ten to four on weekdays","See all my pledges","go(\'mine\')"):
          nextCard("all clear","Everything you promised has arrived.","","Take another square","go(\'quilt\')"))+
    statRow([[PLEDGES.filter(function(p){return p.st==="wait";}).length,"not dropped off yet"],
             [PLEDGES.filter(function(p){return p.st==="done";}).length,"received"],
             [myHeld(),"squares you are holding"]])+
    '<div class="sect">the drive right now</div>'+countBar();
}
function dashAdmin(){
  var w=waiting(), longest=w.slice().sort(function(x,y){return (y.days||0)-(x.days||0);})[0];
  return '<h1 style="font-size:36px;margin-bottom:4px">'+esc(ME.name)+'.</h1>'+
    '<p class="lede">You are the only person who sees real names, so keep this window private.</p>'+
    (longest?nextCard("waiting longest &mdash; chase this one",longest.t,
      (longest.days||0)+" days on the board with nobody holding it","Open the drive","go(\'mine\')"):
      nextCard("all clear","Every square has somebody.","","Open the drive","go(\'mine\')"))+
    statRow([[w.length,"households still waiting"],
             [2,"volunteers with nothing to do"],
             [1,"pledges past drop-off","var(--warm)"]])+
    statRow([[petWaiting(),"shelter squares waiting"],
             [PETS.filter(function(p){return p.need==="foster";}).length,"animals needing a foster"],
             [SPONSORS.length,"sponsors this winter"]])+
    '<div class="rowb" style="margin-top:20px">'+
      '<button class="btn" onclick="exportCsv()">Download the drive records</button>'+
      '<button class="btn ghost" onclick="go(\'people\')">See everyone</button>'+
      '<button class="btn ghost" onclick="go(\'mine\')">Run the drive</button></div>';
}
function vDash(){
  if(!ME) return vQuilt();
  if(ME.role==="volunteer")return dashVolunteer();
  if(ME.role==="provider") return dashProvider();
  if(ME.role==="admin")    return dashAdmin();
  return vSlip();
}


/* ---------------- one square, in full ----------------
   The address is the most sensitive field in the whole system, so it is gated
   twice: signed out you cannot even ask, and signed in you still have to take
   the square on before it appears. Nobody browses where poor people live. */
var SQ=-1;
function openSquare(i){SQ=i;VIEW="sq";render();window.scrollTo(0,0);}
function vSquare(){
  var d=SQUARES[SQ]; if(!d)return vQuilt();
  var held=d.s==="held", mine=held&&ME&&d.by===ME.name;
  var f=FAB[held?d.f:0];
  var gate;
  if(!ME){
    gate='<div class="card" style="border-style:dashed;text-align:center;padding:26px">'+
      '<div class="sl" style="margin-bottom:9px">delivery address</div>'+
      '<div class="blurred">'+esc(d.addr)+'</div>'+
      '<p class="muted" style="margin:12px auto 14px;max-width:44ch">Addresses are never shown to people who are not signed in. Not blurred in the browser &mdash; not sent at all.</p>'+
      '<button class="btn" onclick="openAuth()">Sign in to see the address</button></div>';
  } else if(!mine){
    gate='<div class="card" style="border-style:dashed;text-align:center;padding:26px">'+
      '<div class="sl" style="margin-bottom:9px">delivery address</div>'+
      '<div class="blurred">'+esc(d.addr)+'</div>'+
      '<p class="muted" style="margin:12px auto 14px;max-width:46ch">'+
      (held?'Somebody else is holding this square, so the address is theirs, not yours.'
           :'Take this square on and the address appears. Until then nobody needs it, including you.')+'</p>'+
      (held?'':'<button class="btn warm" onclick="claimSquare('+SQ+')">Claim this square to see the address</button>')+'</div>';
  } else {
    gate='<div class="card" style="border-color:var(--ok);border-width:2px">'+
      '<div class="sl" style="margin-bottom:9px">delivery address &middot; yours only</div>'+
      '<h3 style="font-size:25px;margin-bottom:4px">'+esc(d.addr)+'</h3>'+
      '<div class="where" style="display:flex;align-items:center;gap:7px;color:var(--ink2);margin:8px 0 4px">'+pinSvg()+esc(d.how)+'</div>'+
      '<div class="muted">Please have it there by '+esc(d.by_when)+'.</div>'+
      '<div class="qr" style="margin-top:18px"><div class="code">'+
        QR.svg("DRIVEPATCH:DROP:"+SQ+":"+encodeURIComponent(d.addr),120,"#22304F","#FEFBF6")+'</div>'+
        '<div class="txt"><h4>Show this at handover</h4><p>Scanned once and the square turns warm for everybody watching the quilt.</p></div></div>'+
      '<div class="priv" style="margin-top:16px">You are seeing this because you took this square on. It disappears again if you hand it back.</div></div>';
  }
  return '<button class="btn ghost" onclick="go(\'quilt\')" style="margin-bottom:18px">&larr; Back to the quilt</button>'+
    '<div class="grid g2" style="align-items:start">'+
      '<div><div class="patch '+(held?"held":"waiting")+'" style="cursor:default;max-width:330px">'+
        block(d.k,f,!held)+'<span class="stitch"></span><span class="lbl">'+
        '<span class="tag"><i></i>'+(held?"taken care of":"still waiting")+'</span>'+
        '<span class="need">'+d.t+'</span>'+
        (held?'<span class="by">Stitched in by '+esc(d.by)+'</span>':'')+
        '</span></div></div>'+
      '<div>'+
        '<div class="sl">square #'+(SQ+1)+' &middot; '+DRIVE.name+'</div>'+
        '<h1 style="font-size:30px;line-height:1.2;margin:6px 0 12px">'+d.t+'</h1>'+
        (held?'':'<p class="lede" style="font-size:16px;margin-bottom:16px">On the board '+(d.days||0)+' days. Nobody is holding it yet.</p>')+
        '<div class="sect" style="margin-top:8px">what is needed</div>'+
        '<div class="card" style="margin-bottom:14px"><p style="color:var(--ink2)">'+d.t+
          '. Bring what you would want somebody to bring you. If you are unsure, the organisers will tell you.</p></div>'+
        gate+
      '</div></div>'+
    '<div class="foot"><b>The household never sees you either.</b> They get a text saying it is ready, in the way they chose to receive it.</div>';
}
function claimSquare(i){
  pickIdx=i; pickPet=-1;
  $("dneed").innerHTML=SQUARES[i].t;
  $("fabs").innerHTML=FAB.map(function(f,k){
    return '<button type="button" class="fab'+(k===pickFab?" on":"")+'" data-f="'+k+'">'+block(k%8,f,false)+'</button>';}).join("");
  if(ME&&ME.name)$("dname").value=ME.name;
  $("dlg").showModal();
}

function render(){
  header();
  var v=VIEW,h="";
  if(v==="dash"&&ME)h=vDash();
  else if(v==="mine"&&ME){h=ME.role==="volunteer"?vMineVolunteer():ME.role==="provider"?vMineProvider():vMineAdmin();}
  else if(v==="pets")h=vPets();
  else if(v==="people")h=vPeople();
  else if(v==="journal")h=vJournal();
  else if(v==="sponsor")h=vSponsor();
  else if(v==="slip")h=vSlip();
  else if(v==="ask")h=vAsk();
  else if(v==="sq")h=vSquare();
  else h=vQuilt();
  $("app").innerHTML=h;
}
function setF(f){FILTER=f;render();}

/* ---------------- claiming a square ---------------- */
document.addEventListener("click",function(e){
  var p=e.target.closest(".patch"); if(!p||p.disabled)return;
  if(p.dataset.pn!==undefined){
    var pn=PETNEEDS[+p.dataset.pn];
    $("dneed").innerHTML=pn.t;
    $("fabs").innerHTML=FAB.map(function(f,i){
      return '<button type="button" class="fab'+(i===pickFab?" on":"")+'" data-f="'+i+'">'+block(i%8,f,false)+'</button>';}).join("");
    if(ME&&ME.name)$("dname").value=ME.name;
    pickIdx=-1; pickPet=+p.dataset.pn; $("dlg").showModal(); return;
  }
  if(p.dataset.i!==undefined){ openSquare(+p.dataset.i); return; }
});
document.addEventListener("click",function(e){
  var b=e.target.closest(".fab"); if(!b)return;
  document.querySelectorAll(".fab").forEach(function(x){x.classList.remove("on");});
  b.classList.add("on"); pickFab=+b.dataset.f;
});
function stitchIn(){
  var nm=$("dname").value.trim()||"a neighbour";
  if(pickPet>=0){ PETNEEDS[pickPet].s="held"; PETNEEDS[pickPet].by=nm;
    PETNEEDS[pickPet].note="just taken on"; pickPet=-1; $("dlg").close(); render(); return; }
  if(pickIdx<0){ $("dlg").close(); return; }
  SQUARES[pickIdx].s="held"; SQUARES[pickIdx].f=pickFab;
  SQUARES[pickIdx].by=nm; SQUARES[pickIdx].note="just taken on";
  var idx=pickIdx; $("dlg").close(); render();
  if(VIEW==="sq"){SQ=idx;render();}
  var el=document.querySelector('#quilt [data-i="'+idx+'"]');
  if(el){el.classList.add("sewing");el.scrollIntoView({block:"center",behavior:"smooth"});}
  if(!waiting().length)setTimeout(function(){$("hush").classList.add("on");},1100);
}

/* ---------------- sign in ---------------- */
function openAuth(){$("auth").showModal();}
document.addEventListener("click",function(e){
  var r=e.target.closest(".role"); if(!r)return;
  document.querySelectorAll(".role").forEach(function(x){x.classList.remove("on");});
  document.querySelectorAll(".pane").forEach(function(x){x.classList.remove("on");});
  r.classList.add("on"); $("p-"+r.dataset.r).classList.add("on");
});
function doSignIn(kind){
  var v=$(kind==="family"?"fem":kind==="admin"?"aname":"vname").value.trim();
  if(!v)v=kind==="family"?"The Winter Wren":kind==="admin"?"Northside Trust":"a neighbour";
  ME={name:v,role:kind};
  VIEW=kind==="family"?"slip":"dash";
  $("auth").close(); render();
}

/* ---------------- export ---------------- */
function exportCsv(){
  var rows=[["square","status","need","held_by","days_waiting"]];
  SQUARES.forEach(function(d,i){rows.push([i+1,d.s==="held"?"taken care of":"still waiting",
    d.t.replace(/&middot;/g,"-").replace(/"/g,"'"),d.by||"",d.days||0]);});
  var csv=rows.map(function(r){return r.map(function(c){return '"'+String(c)+'"';}).join(",");}).join("\n");
  var url=URL.createObjectURL(new Blob([csv],{type:"text/csv"}));
  var a=document.createElement("a");a.href=url;a.download="northside-winter-drive.csv";
  document.body.appendChild(a);a.click();document.body.removeChild(a);
  setTimeout(function(){URL.revokeObjectURL(url);},3000);
}
render();
