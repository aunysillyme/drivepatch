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
var NAMES=["R. Alvarez","T. Whitmore","J. Okafor","M. Brennan","S. Petrou","L. Hadley",
 "A. Nkemelu","D.ফell","K. Amara","P. Considine","N. Oyelaran","H. Vasquez"];
var PHONES=["07700 900 141","07700 900 265","07700 900 383","07700 900 412","07700 900 559",
 "07700 900 617","07700 900 728","07700 900 830","07700 900 946","07700 900 052",
 "07700 900 173","07700 900 284"];
var EMBLEMS=["The Winter Wren","The Cedar Branch","The Copper Lantern","The Quiet Harbour",
 "The Amber Thistle","The Hollow Sparrow","The Bramble Meadow","The Salt Kettle",
 "The Ember Finch","The Willow Hearth","The Winter Thistle","The Cedar Sparrow"];
var STREETS=["14 Farrow Lane","3 Beckwith Court","82 Alder Row","27 Hollis Street",
 "9 Marsden Terrace","51 Quayle Road","6 Ivybridge Close","33 Pennant Way",
 "18 Cobham Rise","70 Sedge Walk","5 Lantern Yard","44 Birchall Grove"];
var WINDOWS=["Left on the doorstep, no knock","Pull up and we load the boot","A ten minute window, no queue"];
SQUARES.forEach(function(d,i){
  if(d.k===undefined)d.k=(i*3+1)%8;
  d.addr=STREETS[i%STREETS.length]+", Northside";
  d.how=WINDOWS[i%3];
  d.by_when=["Thursday","Friday","next Monday","Saturday"][i%4];
  d.name=NAMES[i%NAMES.length];        /* organisers only, never rendered publicly */
  d.phone=PHONES[i%PHONES.length];
  d.emblem=EMBLEMS[i%EMBLEMS.length];
  d.delivered=false;
});
/* every check-in, drop-off and delivery, in the order it happened */
var LEDGER=[
 {t:"Clara checked in at the collection desk",who:"Clara",kind:"check-in",when:"Sat 09:52"},
 {t:"Maria dropped off groceries for square #2",who:"Maria",kind:"drop-off",when:"Thu 11:20"},
 {t:"Dev delivered to The Copper Lantern",who:"Dev",kind:"delivered",when:"Wed 16:05"}
];
function logIt(kind,text,who){
  LEDGER.unshift({t:text,who:who||((ME&&ME.name)||"somebody"),kind:kind,when:"just now"});
}

var TASKS=[
 {when:"Today<br>9:00",t:"Sorting warm coats and bedding",where:"Lower hall, tables along the north wall",st:"wait",
  addr:"St Anne's Parish Hall, 2 Quayle Road, Northside",lead:"Martha",leadPh:"07700 900 118",
  brief:"Coats and bedding come in unsorted. Sort by size, put anything damp on the rack by the heaters, and flag anything that needs washing. There is tea.",
  bring:"nothing, and wear something you do not mind getting dusty",hrs:"about 3 hours"},
 {when:"Today<br>13:30",t:"North neighbourhood delivery run",where:"Loading bay behind the church",st:"wait",
  addr:"Loading bay, St Anne's Church, Quayle Road, Northside",lead:"David",leadPh:"07700 900 204",
  brief:"Eight parcels on the north loop. Each one has a card on it with the household's handover choice - doorstep, boot, or a ten minute window. Follow the card, not your instinct.",
  bring:"a car, and your phone for the handover scans",hrs:"about 3 hours"},
 {when:"Sat<br>10:00",t:"Morning collection desk",where:"Front entrance table by the steps",st:"done",
  addr:"St Anne's Parish Hall, 2 Quayle Road, Northside",lead:"Clara",leadPh:"07700 900 331",
  brief:"Take donations at the door, thank people properly, and write what came in on the sheet. Most of the job is being the friendly face.",
  bring:"nothing at all",hrs:"about 4 hours"}
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
/* Paid runs. Sponsors fund these so the drive can pay people who need the money,
   including people who are on the receiving side of it. Nobody is asked which. */
var PAID=[
 {t:"Stitch in a patch",rate:20,hrs:2,unit:"per patch you finish",by:"Kirkby & Sons Hardware",
  when:"any time before Sunday",where:"Lower hall, or from home",need:"nothing, we show you",taken:null},
 {t:"Evening delivery run, north loop",rate:22,hrs:3,unit:"per hour",by:"The Corner Bakery",
  when:"Thu 17:00 - 20:00",where:"Loading bay behind the church",need:"a car and a clean licence",taken:null},
 {t:"Weekend sorting and packing",rate:18,hrs:12,unit:"per hour",by:"Northside Dental",
  when:"Sat and Sun, 10:00 - 16:00",where:"Lower hall",need:"nothing at all",taken:null},
 {t:"Saturday collection point",rate:18,hrs:4,unit:"per hour",by:"Lena's Flowers",
  when:"Sat 09:00 - 13:00",where:"Front entrance table",need:"you can sit down for most of it",taken:"Elena"},
 {t:"Van driver, two depot runs",rate:25,hrs:6,unit:"per hour",by:"Kirkby & Sons Hardware",
  when:"Fri 08:00 - 14:00",where:"Depot, Quayle Road",need:"a van licence, fuel covered",taken:null}
];

/* ---------------- state ---------------- */
var ME=null, VIEW="quilt", FILTER="all", pickFab=0, pickIdx=-1, pickPet=-1;
var CHECKED=null, HOURS=0;
function checkIn(){
  CHECKED="just now"; HOURS+=3;
  logIt("check-in",(ME&&ME.name?ME.name:"A volunteer")+" checked in at the hall",ME&&ME.name);
  render();
}
var $=function(id){return document.getElementById(id);};
function waiting(){return SQUARES.filter(function(d){return d.s==="wait";});}
function fabFor(name){return FAB[(String(name).length*3+String(name).charCodeAt(0))%8];}

/* ---------------- shell ---------------- */
function header(){
  var h='<button class="brand" onclick="go(\'quilt\')">DrivePatch</button>'+
        '<span class="drivepick">'+DRIVE.name+' &middot; ends '+DRIVE.ends+'</span><span class="spacer"></span>';
  if(!ME){
    h+='<button class="btn ghost" onclick="openAuth()">Sign in</button>'+
       '<button class="btn" onclick="go(\'ask\')">Ask for something</button>';
  }
  else {
    var f=fabFor(ME.name);
    h+='<span class="me"><span class="sw">'+block(2,f,false)+'</span>'+
       '<span>'+esc(ME.name)+'</span><span class="role-pill">'+ME.role+'</span>'+
       '<button class="no" style="padding:4px" onclick="signOut()">sign out</button></span>';
  }
  $("top").innerHTML=h;
  var tabs=[["quilt","The quilt","\uD83E\uDDF5"],["pets","Pets &amp; shelter","\uD83D\uDC3E"],
            ["journal","Drive journal","\uD83D\uDE9A"],["paid","Sponsored work","\uD83D\uDCB5"],["sponsor","Sponsor a drive","\uD83D\uDC9B"]];
  if(ME&&ME.role!=="family") tabs.unshift(["dash","Dashboard","\uD83C\uDFE1"]);
  if(ME&&ME.role==="volunteer") tabs.splice(2,0,["mine","My tasks","\uD83D\uDCCB"]);
  if(ME&&ME.role==="provider")  tabs.splice(2,0,["mine","My pledges","\uD83D\uDCE6"]);
  if(ME&&ME.role==="admin")     tabs.splice(2,0,["mine","Run the drive","\uD83D\uDDDD"],["people","The register","\uD83D\uDDC2"]);
  if(ME&&ME.role==="family")    tabs=[["slip","My request","\uD83D\uDD4A"],["pets","Pets &amp; shelter","\uD83D\uDC3E"],["journal","Drive journal","\uD83D\uDE9A"]];
  $("nav").innerHTML=tabs.map(function(t){
    return '<button class="'+(VIEW===t[0]?"on":"")+'" onclick="go(\''+t[0]+'\')">'+
      '<span class="ico" aria-hidden="true">'+(t[2]||"")+'</span>'+t[1]+'</button>';}).join("");
}
function go(v){VIEW=v;render();window.scrollTo(0,0);}
function signOut(){ME=null;VIEW="quilt";render();}

/* ---------------- views ---------------- */

/* ---------------- the progress board ----------------
   Not "how far along are we" - every drive dashboard says that and it tells the
   organiser nothing they can act on. This says whether they are going to FINISH,
   which of the needs nobody is touching, and who has been waiting too long. */
var DAYS_LEFT=6;                       /* to the drive's closing date */
function kindOf(t){
  var s=String(t).toLowerCase();
  if(/coat|boot|warm|jacket|clothes|size/.test(s))   return "warm clothes";
  if(/groceries|meal|food|eat|hot meal/.test(s))     return "food";
  if(/bed|bedding|blanket|heating|heat|oil/.test(s)) return "keeping warm at home";
  if(/teenager|newborn|baby|boy|girl|child|sister/.test(s)) return "something for a child";
  return "not specified";
}
function pace(){
  /* squares taken per day so far, then how long the rest would take at that rate */
  var held=SQUARES.filter(function(d){return d.s==="held";}).length;
  var elapsed=8;                        /* days the drive has been open */
  var perDay=held/elapsed;
  var left=waiting().length;
  if(!left) return {done:true};
  if(perDay<=0) return {days:Infinity,perDay:0,late:true};
  var days=Math.ceil(left/perDay);
  return {days:days,perDay:perDay,late:days>DAYS_LEFT,over:days-DAYS_LEFT};
}
function stuck(){return waiting().filter(function(d){return (d.days||0)>=5;});}
function starved(){
  var by={};
  waiting().forEach(function(d){var k=kindOf(d.t);by[k]=(by[k]||0)+1;});
  var top=null,tn=0;
  for(var k in by){if(by[k]>tn){tn=by[k];top=k;}}
  return top?{kind:top,n:tn}:null;
}
function waitLadder(){
  var buckets=[0,0,0,0];   /* 0-2, 3-4, 5-7, 8+ days */
  waiting().forEach(function(d){var v=d.days||0;
    buckets[v<3?0:v<5?1:v<8?2:3]++;});
  var max=Math.max.apply(null,buckets)||1;
  var lab=["under 3 days","3 to 4 days","5 to 7 days","over a week"];
  var col=["var(--ok)","var(--navy)","var(--warm)","#A33F1F"];
  return '<div class="ladder">'+buckets.map(function(v,i){
    return '<div class="rung"><div class="bar"><span style="height:'+
      (v?Math.max(9,Math.round(v/max*100)):3)+'%;background:'+col[i]+'"></span></div>'+
      '<b>'+v+'</b><span>'+lab[i]+'</span></div>';}).join("")+'</div>';
}
function progressBoard(){
  var p=pace(), st=stuck(), sv=starved(), w=waiting().length, tot=SQUARES.length;
  if(!w) return '';
  var paceCard = p.late
    ? '<div class="pcard warn"><div class="pk">will this drive finish?</div>'+
      '<div class="pv">No &mdash; '+p.over+' day'+(p.over===1?"":"s")+' short</div>'+
      '<p>At the rate squares are being taken, the last household is reached about '+
      p.days+' days from now. The drive closes in '+DAYS_LEFT+'. '+
      '<b>'+Math.ceil((w-p.perDay*DAYS_LEFT))+' households would be left waiting.</b></p></div>'
    : '<div class="pcard ok"><div class="pk">will this drive finish?</div>'+
      '<div class="pv">Yes, with '+(DAYS_LEFT-p.days)+' day'+((DAYS_LEFT-p.days)===1?"":"s")+' spare</div>'+
      '<p>At the current rate the last household is reached in about '+p.days+' days, and the drive closes in '+DAYS_LEFT+'.</p></div>';

  return '<div class="sect">the progress board</div>'+
    '<div class="pgrid">'+
      paceCard+
      '<div class="pcard"><div class="pk">nobody has touched these</div>'+
        '<div class="pv">'+st.length+'</div>'+
        '<p>'+(st.length?'Waiting five days or more with no volunteer. '+
          'These are the ones to name out loud at the next meeting.':'Every square has had interest in the last few days.')+'</p>'+
        (st.length?'<div class="stucklist">'+st.slice(0,3).map(function(d){
          return '<button class="stuckrow" onclick="openSquare('+SQUARES.indexOf(d)+')">'+
            '<span class="d">'+(d.days||0)+'d</span><span>'+d.t+'</span></button>';}).join("")+'</div>':'')+
      '</div>'+
      '<div class="pcard"><div class="pk">what is going unclaimed</div>'+
        '<div class="pv">'+(sv?esc(sv.kind):"nothing")+'</div>'+
        '<p>'+(sv?sv.n+' of the '+w+' waiting squares are this. Donors give what they have, '+
          'not what is short &mdash; so this is the thing to ask for by name.':'')+'</p></div>'+
      '<div class="pcard"><div class="pk">how long people have waited</div>'+
        waitLadder()+
      '</div>'+
    '</div>';
}

function countBar(){
  var w=waiting().length,tot=SQUARES.length;
  return '<div class="count'+(w?"":" done")+'"><b>'+(w||"Nobody")+'</b>'+
    '<span class="lab">'+(w===1?"household still waiting":(w?"households still waiting":"is waiting"))+'</span>'+
    '<span class="sub">'+(tot-w)+' of '+tot+' taken care of &middot; '+
      (typeof petWaiting==="function"?petWaiting()+' shelter squares and '+
        PETS.filter(function(p){return p.need==="foster";}).length+' animals too':'')+'<br>'+
    '<em>'+(w?"longest wait is "+Math.max.apply(null,waiting().map(function(d){return d.days||0;}))+" days":"the quilt is finished")+'</em></span></div>';
}
function pawSvg(){return '<svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden="true">'+
 '<ellipse cx="7" cy="8" rx="2.3" ry="3"/><ellipse cx="12" cy="6.2" rx="2.3" ry="3.1"/>'+
 '<ellipse cx="17" cy="8" rx="2.3" ry="3"/><ellipse cx="20" cy="13" rx="2.1" ry="2.6"/>'+
 '<path d="M12 11.4c3.2 0 5.6 2.5 5.6 4.8 0 1.9-1.7 2.9-3.4 2.9-1 0-1.5-.4-2.2-.4s-1.2.4-2.2.4c-1.7 0-3.4-1-3.4-2.9 0-2.3 2.4-4.8 5.6-4.8z"/></svg>';}

/* one board. households, animals needing a foster, and what the shelter is short of. */
function boardItems(){
  var out=SQUARES.map(function(d,i){return {kind:"hh",d:d,i:i};});
  PETS.filter(function(p){return p.need==="foster";}).forEach(function(p){
    out.push({kind:"pet",p:p});});
  PETNEEDS.forEach(function(d,i){out.push({kind:"sup",d:d,i:i});});
  return out;
}
function quiltHTML(){
  return boardItems().map(function(it){
    if(it.kind==="pet"){
      var p=it.p, hid=(FILTER==="hh")?" hide":"";
      return '<button class="patch held pet ispet'+hid+'" onclick="openPet(\''+esc(p.n)+'\')">'+
        petFace(p,p.n.length)+'<span class="pawbadge">'+pawSvg()+'</span><span class="lbl">'+
        '<span class="tag pet"><i></i>'+esc(p.age)+' &middot; needs a foster</span>'+
        '<span class="need">'+esc(p.n)+'</span>'+
        '<span class="by">'+esc(p.s)+'</span>'+
        '<span class="cta">Meet '+esc(p.n)+'</span></span></button>';
    }
    var d=it.d, held=d.s==="held", f=FAB[held?(it.kind==="sup"?(it.i*3)%8:d.f):0];
    var hid=((FILTER==="wait"&&held)||(FILTER==="hh"&&it.kind==="sup")||
             (FILTER==="pets"&&it.kind==="hh"))?" hide":"";
    var attr=it.kind==="sup"?'data-pn="'+it.i+'"':'data-i="'+it.i+'"';
    return '<button class="patch '+(held?"held":"waiting")+(it.kind==="sup"?" ispet":"")+hid+'" '+attr+
      (held?" disabled":"")+'>'+
      block(it.kind==="sup"?(it.i*2+1)%8:d.k,f,!held)+
      (it.kind==="sup"?'<span class="pawbadge">'+pawSvg()+'</span>':'')+
      '<span class="stitch"></span><span class="lbl">'+
      '<span class="tag'+(it.kind==="sup"?" pet":"")+'"><i></i>'+
        (it.kind==="sup"?"shelter &middot; ":"")+(held?"taken care of":"still waiting")+'</span>'+
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
    progressBoard()+
    '<div class="bar"><h2>The quilt</h2>'+
    '<button class="chip '+(FILTER==="all"?"on":"")+'" onclick="setF(\'all\')">Everything</button>'+
    '<button class="chip '+(FILTER==="wait"?"on":"")+'" onclick="setF(\'wait\')">Still waiting</button>'+
    '<button class="chip '+(FILTER==="hh"?"on":"")+'" onclick="setF(\'hh\')">Households</button>'+
    '<button class="chip pets '+(FILTER==="pets"?"on":"")+'" onclick="setF(\'pets\')">'+pawSvg()+' Pets &amp; shelter</button>'+
    '<span class="hint">Every square is one household or one animal.</span></div>'+
    '<div class="quilt" id="quilt">'+quiltHTML()+'</div>'+
    '<div class="sect">who is holding a square</div><div class="people">'+contributors()+'</div>'+
    '<div class="foot"><b>Nobody\'s name appears on this quilt.</b> Households are shown as the shape of what '+
    'they need. Only the organisers can see who is who, and only because somebody has to hand the coats over. '+
    'Organisers: keep the wording general &mdash; in a small community, enough detail is a name.</div>';
}
function vMineVolunteer(){
  var t=TASKS.map(function(k,i){
    return '<button class="row rowlink" onclick="openTask('+i+')"><div class="when">'+k.when+'</div><div class="body">'+
      '<h4>'+k.t+'</h4><div class="where">'+pinSvg()+esc(k.where)+'</div>'+
      '<div class="muted" style="margin-top:5px">'+esc(k.hrs)+' &middot; with '+esc(k.lead)+'</div></div>'+
      '<div class="side"><span class="pill '+(k.st==="done"?"done":"wait")+'">'+
      (k.st==="done"?"done":"to do")+'</span><span class="muted" style="font-size:12px">details &rarr;</span></div></button>';}).join("");
  return '<h1 style="font-size:34px;margin-bottom:6px">Hello, '+esc(ME.name)+'.</h1>'+
    '<p class="lede">Thank you for giving your time to the drive today.</p>'+
    '<div class="sect">here are the places where hands are needed right now</div>'+t+
    '<div class="card" style="margin-top:8px"><div class="qr">'+
    '<div class="code">'+QR.svg("DRIVEPATCH:CHECKIN:"+encodeURIComponent(ME.name)+":NORTHSIDE",130,"#22304F","#FEFBF6")+'</div>'+
    '<div class="txt"><h4>Scan code to check in</h4>'+
    (CHECKED?'<div class="pill done" style="display:inline-block;margin-bottom:8px">checked in '+esc(CHECKED)+'</div>':
      '<div><button class="btn warm" style="margin-bottom:10px" onclick="checkIn()">Or check in here</button></div>')+
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
      '<div class="card"><div class="muted">checked in today</div><div class="big">'+
        LEDGER.filter(function(l){return l.kind==="check-in";}).length+'</div></div>'+
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
    '<div class="foot"><b>Sponsors see the same quilt everyone else sees, and a receipt.</b> '+
    'No names, no addresses. Organisers should still read each square before it goes up &mdash; in a small town, '+
    '&ldquo;a single dad, three kids, Alder Row&rdquo; is a name even when you have not written one.</div>';
}
function vSlip(){
  var em=ME?ME.name:"The Winter Wren";
  var fresh=SQUARES.filter(function(d){return d.fresh;})[0];
  return '<div class="slip"><div class="muted" style="letter-spacing:.14em;text-transform:uppercase;font-size:10.5px;font-weight:600">your slip</div>'+
    '<div class="em">'+esc(em)+'</div>'+
    '<p style="color:var(--ink2)">Here is where things stand with your square. You will never have to stand in a queue or explain your situation to anyone.</p>'+
    '<div class="steps">'+
      '<div class="step done"><span class="dot">&#10003;</span><div><h4>We have your note</h4><p>Your square is on the quilt board.</p></div></div>'+
      '<div class="step now"><span class="dot">&bull;</span><div><h4>A neighbour has taken your square</h4><p>They are putting everything together now. You do not need to call or wonder.</p></div></div>'+
      '<div class="step todo"><span class="dot"></span><div><h4>Ready for a quiet handover</h4><p>We will text you the moment it is ready, with the way you asked to receive it.</p></div></div>'+
    '</div>'+
    (fresh?'<div class="note" style="border-left-color:var(--ok)"><b>Your square is on the quilt now.</b> '+
      'It reads: &ldquo;'+fresh.t+'&rdquo; &mdash; and that is all anybody else can see. '+
      '<button class="no" style="padding:2px 0;text-decoration:underline" onclick="go(\'quilt\')">Look at the board</button></div>':'')+
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
    '<input class="in" id="askNeed" placeholder="warm coats, or a hot meal, or you do not have to say">'+
    '<div class="sl">and if there is a child, what makes them lose track of time?</div>'+
    '<input class="in" id="askJoy" placeholder="building things, drawing, anything at all">'+
    '<div class="sl">how would you like to receive it</div>'+
    '<div class="rowb" id="howList" style="margin-bottom:18px">'+
      HOWS.map(function(w,i){return '<button class="chip'+(HOW===i?" on":"")+
        '" onclick="setHow('+i+')">'+w+'</button>';}).join("")+'</div>'+
    '<button class="btn warm" onclick="submitAsk()">Send this quietly</button>'+
    '<div class="priv">We ask what a child loves because a present chosen for &ldquo;a boy, 9&rdquo; is a present that gets left in a cupboard. You will get a slip with two words on it, and that is the only thing you will ever need to check on this.</div>'+
    '</div>';
}
var WHO=[], HOW=-1, MYEMBLEM=null;
var E1=["Winter","Cedar","Copper","Quiet","Amber","Hollow","Bramble","Salt","Ember","Willow"];
var E2=["Wren","Branch","Lantern","Harbour","Thistle","Sparrow","Meadow","Kettle","Finch","Hearth"];
function newEmblem(){
  return "The "+E1[Math.floor(Math.random()*E1.length)]+" "+E2[Math.floor(Math.random()*E2.length)];
}
/* Turn what a household typed into a square, WITHOUT ever writing a name.
   Composition and the ask only - the same shape every other square has. */
function submitAsk(){
  var need=($("askNeed")&&$("askNeed").value.trim())||"";
  var joy=($("askJoy")&&$("askJoy").value.trim())||"";
  var kids=WHO.filter(function(w){return w==="a child";}).length;
  var teens=WHO.filter(function(w){return w==="a teenager";}).length;
  var elders=WHO.filter(function(w){return w==="an elder";}).length;
  var who;
  if(!WHO.length) who="A household";
  else if(WHO.length===1) who="Someone on their own";
  else who="A household of "+WHO.length;
  var bits=[];
  if(kids) bits.push(kids===1?"one child":kids+" children");
  if(teens) bits.push(teens===1?"a teenager":teens+" teenagers");
  if(elders) bits.push(elders===1?"an elder at home":elders+" elders at home");
  var line=who+(bits.length?" \u00b7 "+bits.join(", "):"");
  line+=" \u00b7 "+(need||"nothing specified, they didn't want to ask");
  if(joy) line+=" \u00b7 loses track of time "+joy;
  MYEMBLEM=newEmblem();
  SQUARES.unshift({t:line,s:"wait",days:0,k:Math.floor(Math.random()*8),
    addr:"(held by the organisers until somebody takes this square)",
    how:HOW>=0?HOWS[HOW]:"however is easiest",by_when:"as soon as somebody takes it",
    fresh:true});
  WHO=[];HOW=-1;
  ME={name:MYEMBLEM,role:"family"};
  VIEW="slip";render();window.scrollTo(0,0);
}
var HOWS=["Left quietly on the doorstep","Pull up and we load the boot","A ten minute window, no line"];
function addWho(k){WHO.push(k);drawWho();}
function dropWho(i){WHO.splice(i,1);drawWho();}
function setHow(i){HOW=(HOW===i?-1:i);render();}
function drawWho(){
  var l=$("whoList"); if(!l)return;
  l.innerHTML=WHO.length?WHO.map(function(k,i){
    return '<button class="person tagx" onclick="dropWho('+i+')" title="remove">'+
      '<b>'+esc(k)+'</b><span class="x">&times;</span></button>';}).join("")
    : '<span class="muted">Nobody added yet. Tap the buttons above.</span>';
}


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
function dropPaid(i){PAID[i].taken=null;PAID[i].takenBy=null;render();}
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
             [HOURS,"hours logged"],
             ["$"+myPaid().reduce(function(s,p){return s+p.rate*p.hrs;},0),"sponsored work taken","var(--warm)"]])+
    (myPaid().length?'<div class="sect">paid work you have taken</div>'+myPaid().map(function(p){
      return '<div class="row"><div class="when">$'+(p.rate*p.hrs)+'</div><div class="body">'+
        '<h4>'+esc(p.t)+'</h4><div class="where">'+pinSvg()+esc(p.where)+' &middot; '+esc(p.when)+'</div></div>'+
        '<div class="side"><span class="pill done">yours</span></div></div>';}).join("")
      :'')+
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
    progressBoard()+
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
      '<div class="blurred" aria-hidden="true">&mdash;&mdash; &mdash;&mdash;&mdash;&mdash;&mdash;, &mdash;&mdash;&mdash;&mdash;</div>'+
      '<p class="muted" style="margin:12px auto 14px;max-width:46ch">The address is not on this page. It is not blurred text you could copy or a screen reader could read &mdash; it is simply not rendered until somebody takes the square on.</p>'+
      '<button class="btn" onclick="openAuth()">Sign in to see the address</button></div>';
  } else if(!mine){
    gate='<div class="card" style="border-style:dashed;text-align:center;padding:26px">'+
      '<div class="sl" style="margin-bottom:9px">delivery address</div>'+
      '<div class="blurred" aria-hidden="true">&mdash;&mdash; &mdash;&mdash;&mdash;&mdash;&mdash;, &mdash;&mdash;&mdash;&mdash;</div>'+
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
function resetSheet(){
  $("dsub").innerHTML="You're taking this one on. It stops being a number the moment you do.";
  $("dfl").style.display="";
  $("dpriv").innerHTML="Taking this on shows you the delivery address, because somebody has to get there. You will still never see the household's name, and they chose how it reaches them.";
}
function claimSquare(i){
  resetSheet(); pickIdx=i; pickPet=-1;
  $("dneed").innerHTML=SQUARES[i].t;
  $("fabs").innerHTML=FAB.map(function(f,k){
    return '<button type="button" class="fab'+(k===pickFab?" on":"")+'" data-f="'+k+'">'+block(k%8,f,false)+'</button>';}).join("");
  if(ME&&ME.name)$("dname").value=ME.name;
  $("dlg").showModal();
}


function vPaid(){
  var open=PAID.filter(function(p){return !p.taken;});
  var pot=open.reduce(function(s,p){return s+p.rate*p.hrs;},0);
  return '<div class="hero"><h1>Sponsored work, <em>paid by the hour.</em></h1>'+
    '<p class="lede">Sponsors put money behind these so the drive can pay people for the work. '+
    'Anyone can take one, and we never ask whether you are also on the board.</p></div>'+
    '<div class="count"><b>'+open.length+'</b><span class="lab">'+
      (open.length===1?"opportunity open":"opportunities open")+'</span>'+
      '<span class="sub">$'+pot+' unclaimed this week<br>'+
      '<em>paid within 3 days, no invoice needed</em></span></div>'+
    (ME&&myPaid().length?'<div class="sect">yours</div>'+myPaid().map(function(p){
       return '<div class="row" style="border-color:var(--ok);border-width:2px">'+
         '<div class="when" style="min-width:96px"><div style="font-family:Fraunces,Georgia,serif;font-size:26px;color:var(--ok);line-height:1">$'+(p.rate*p.hrs)+'</div>'+
         '<div class="muted" style="font-size:11.5px">you will be paid</div></div>'+
         '<div class="body"><h4>'+esc(p.t)+'</h4><div class="where">'+pinSvg()+esc(p.where)+' &middot; '+esc(p.when)+'</div>'+
         '<div class="muted" style="margin-top:5px">Paid within 3 days of finishing. No invoice.</div></div>'+
         '<div class="side"><button class="btn ghost" onclick="dropPaid('+PAID.indexOf(p)+')">Hand it back</button></div></div>';}).join("")
      :'')+
    '<div class="sect">open right now</div>'+
    PAID.map(function(p,i){
      return '<div class="row"><div class="when" style="min-width:96px">'+
          '<div style="font-family:Fraunces,Georgia,serif;font-size:30px;color:var(--warm);line-height:1">$'+p.rate+'</div>'+
          '<div class="muted" style="font-size:11.5px">'+esc(p.unit)+'</div></div>'+
        '<div class="body"><h4>'+esc(p.t)+'</h4>'+
        '<div class="where">'+pinSvg()+esc(p.where)+' &middot; '+esc(p.when)+'</div>'+
        '<div class="muted" style="margin-top:5px">You need: '+esc(p.need)+'</div>'+
        '<div class="muted" style="margin-top:3px">Sponsored by '+esc(p.by)+
          ' &middot; about $'+(p.rate*p.hrs)+' in total</div></div>'+
        '<div class="side">'+(p.taken
          ? '<span class="pill '+(ME&&p.takenBy===ME.name?"done":"wait")+'">'+
              (ME&&p.takenBy===ME.name?"yours \u00b7 in your dashboard":"taken by "+esc(p.taken))+'</span>'
          : (ME?'<button class="btn warm" onclick="takePaid('+i+')">Take this</button>'
               :'<button class="btn ghost" onclick="openAuth()">Sign in to take this</button>'))+
        '</div></div>';}).join("")+
    '<div class="sect">who is funding this</div><div class="people">'+
      SPONSORS.map(function(s){return '<span class="person" style="padding-left:13px"><b>'+esc(s)+'</b></span>';}).join("")+
    '</div>'+
    '<div class="foot"><b>Nobody is asked why they want the money.</b> A person can be on the '+
    'quilt and on this page in the same week, and neither page knows about the other. '+
    'That is the point: needing help and needing work are the same week for most people.</div>';
}
function takePaid(i){
  if(!ME){ openAuth(); return; }              /* the drive has to know who is owed */
  PAID[i].taken=ME.name; PAID[i].takenBy=ME.name; render();
}
function myPaid(){return PAID.filter(function(p){return ME&&p.takenBy===ME.name;});}


/* ---------------- one task, in full ----------------
   Same gate as a square: the exact address only appears once we know who you
   are. A stranger reading the board should not learn where the stock is either. */
var TASKNOW=-1;
function openTask(i){TASKNOW=i;VIEW="task";render();window.scrollTo(0,0);}
function vTask(){
  var k=TASKS[TASKNOW]; if(!k)return ME?vMineVolunteer():vQuilt();
  var gate = ME
    ? '<div class="card" style="border-color:var(--ok);border-width:2px">'+
      '<div class="sl" style="margin-bottom:8px">where to go</div>'+
      '<h3 style="font-size:24px;margin-bottom:6px">'+esc(k.addr)+'</h3>'+
      '<div class="where" style="display:flex;align-items:center;gap:7px;color:var(--ink2);margin:8px 0">'+pinSvg()+esc(k.where)+'</div>'+
      '<div class="muted">Ask for <b style="color:var(--ink)">'+esc(k.lead)+'</b> &middot; '+esc(k.leadPh)+
        ' &middot; if you are running late, ring, do not just not turn up.</div>'+
      '<div class="qr" style="margin-top:18px"><div class="code">'+
        QR.svg("DRIVEPATCH:CHECKIN:"+encodeURIComponent((ME&&ME.name)||"volunteer")+":T"+TASKNOW,120,"#22304F","#FEFBF6")+'</div>'+
        '<div class="txt"><h4>Scan this when you arrive</h4><p>Check in at the garden gate. '+
        'No clipboard, and nobody has to find you to tick you off a list.</p></div></div></div>'
    : '<div class="card" style="border-style:dashed;text-align:center;padding:26px">'+
      '<div class="sl" style="margin-bottom:9px">where to go</div>'+
      '<div class="blurred" aria-hidden="true">&mdash;&mdash; &mdash;&mdash;&mdash;&mdash;&mdash;, &mdash;&mdash;&mdash;&mdash;</div>'+
      '<p class="muted" style="margin:12px auto 14px;max-width:46ch">The address is not on this page until we know who is coming. '+
      'Not blurred text &mdash; simply not rendered.</p>'+
      '<button class="btn" onclick="openAuth()">Sign in to see the address</button></div>';
  return '<button class="btn ghost" onclick="go(\''+(ME?"mine":"quilt")+'\')" style="margin-bottom:18px">&larr; Back to my tasks</button>'+
    '<div class="grid g2" style="align-items:start">'+
      '<div>'+
        '<div class="sl">'+k.when.replace("<br>"," &middot; ")+' &middot; '+esc(k.hrs)+'</div>'+
        '<h1 style="font-size:32px;line-height:1.15;margin:6px 0 12px">'+esc(k.t)+'</h1>'+
        '<p class="lede" style="font-size:16.5px;margin-bottom:18px">'+esc(k.brief)+'</p>'+
        '<div class="deets">'+
          '<div><b>What to bring</b><span>'+esc(k.bring)+'</span></div>'+
          '<div><b>How long</b><span>'+esc(k.hrs)+'</span></div>'+
          '<div><b>Who is running it</b><span>'+esc(k.lead)+'</span></div>'+
          '<div><b>Status</b><span>'+(k.st==="done"?"finished":"still needs somebody")+'</span></div>'+
        '</div>'+
      '</div>'+
      '<div>'+gate+'</div>'+
    '</div>'+
    '<div class="foot"><b>If you cannot make it, say so.</b> A task handed back on the morning is a '+
    'problem the organisers can solve. One nobody turns up to is a household that waits another week.</div>';
}


/* ---------------- the organisers' register ----------------
   The brief asks for a record of who needs help and one place to manage it.
   This is the only screen in the product where a household's real name exists. */
function vRegister(){
  if(!ME||ME.role!=="admin") return '<div class="card">Only the organisers can open the register. '+
    '<button class="btn" style="margin-left:8px" onclick="openAuth()">Sign in</button></div>';
  var rows=SQUARES.map(function(d,i){
    return '<tr>'+
      '<td><b>'+esc(d.name||"(new)")+'</b><div class="muted">'+esc(d.phone||"")+'</div></td>'+
      '<td class="em">'+esc(d.emblem||"-")+'</td>'+
      '<td>'+d.t+'</td>'+
      '<td class="muted">'+esc(d.addr||"")+'<div>'+esc(d.how||"")+'</div></td>'+
      '<td>'+(d.delivered?'<span class="pill done">delivered</span>'
             :d.s==="held"?'<span class="pill wait">'+esc(d.by)+' has it</span>'
             :'<span class="pill late">'+(d.days||0)+'d waiting</span>')+'</td>'+
      '<td>'+(d.s==="held"&&!d.delivered
        ?'<button class="btn warm" onclick="markDelivered('+i+')">Mark delivered</button>'
        :d.delivered?'<span class="muted">closed</span>'
        :'<button class="btn ghost" onclick="openSquare('+i+')">Open</button>')+'</td>'+
    '</tr>';}).join("");
  return '<h1 style="font-size:32px;margin-bottom:6px">The register</h1>'+
    '<p class="lede">Every household that asked, with the name and number attached. '+
    'This is the only page in DrivePatch where these appear. Do not screen-share it.</p>'+
    '<div class="rowb" style="margin:18px 0">'+
      '<button class="btn" onclick="openAddHh()">Add a household</button>'+
      '<button class="btn ghost" onclick="exportCsv()">Export the drive records</button>'+
      '<span class="muted">'+SQUARES.length+' households &middot; '+
        SQUARES.filter(function(d){return d.delivered;}).length+' delivered</span></div>'+
    '<div class="tblwrap"><table class="reg"><thead><tr>'+
      '<th>Household</th><th>Their slip</th><th>What they asked for</th><th>Where it goes</th><th>Status</th><th></th>'+
    '</tr></thead><tbody>'+rows+'</tbody></table></div>'+
    '<div class="sect">what has actually happened</div>'+
    LEDGER.map(function(l){
      return '<div class="row"><div class="when">'+esc(l.when)+'</div><div class="body">'+
        '<h4 style="font-size:16.5px">'+esc(l.t)+'</h4></div>'+
        '<div class="side"><span class="pill '+(l.kind==="delivered"?"done":"wait")+'">'+esc(l.kind)+'</span></div></div>';}).join("");
}
function markDelivered(i){
  SQUARES[i].delivered=true;
  logIt("delivered","Delivered to "+(SQUARES[i].emblem||"a household"),ME&&ME.name);
  render();
}
function openAddHh(){
  resetSheet();
  $("dneed").innerHTML="Add a household";
  $("dsub").innerHTML="This puts a square on the quilt. Only you will ever see the name.";
  $("dfl").style.display="none";
  $("fabs").innerHTML='<div style="grid-column:1/-1">'+
    '<div class="sl">their name, for your records only</div><input class="in" id="hhName" placeholder="R. Alvarez">'+
    '<div class="sl">phone</div><input class="in" id="hhPh" placeholder="07700 900 000">'+
    '<div class="sl">what goes on the quilt &mdash; no name, keep it general</div>'+
    '<input class="in" id="hhNeed" placeholder="A family of four &middot; warm coats">'+
    '<div class="sl">delivery address</div><input class="in" id="hhAddr" placeholder="14 Farrow Lane, Northside">'+
    '</div>';
  $("dname").parentNode.querySelector(".sl").style.display="none";
  $("dname").style.display="none";
  $("dpriv").innerHTML="The name and address stay on the register. The quilt shows only the line you type above, so write it the way you would want it written about you.";
  window.__addHh=true; $("dlg").showModal();
}


/* ---------------- faded hearts behind everything ----------------
   Deterministic scatter, not random, so it never reflows or flickers between
   renders. Kept very low opacity on purpose: this page is about families who
   are short this winter, and loud hearts would read as saccharine. */
function heartField(){
  var seed=20261128;
  function rnd(){seed=(seed*1103515245+12345)&0x7FFFFFFF;return seed/0x7FFFFFFF;}
  var P="M12 21.1l-1.4-1.3C5.4 15.2 2 12.2 2 8.6 2 5.6 4.4 3.2 7.4 3.2c1.7 0 3.3.8 4.6 2.1"+
        " 1.3-1.3 2.9-2.1 4.6-2.1 3 0 5.4 2.4 5.4 5.4 0 3.6-3.4 6.6-8.6 11.2L12 21.1z";
  var out="",i,tones=["#B8762E","#22304F","#4E7A5C","#B5697A"];
  for(i=0;i<46;i++){
    var x=rnd()*100, y=rnd()*100,
        s=0.5+rnd()*1.5,
        rot=(rnd()*50-25).toFixed(1),
        op=(0.030+rnd()*0.055).toFixed(3),
        c=tones[Math.floor(rnd()*tones.length)];
    out+='<g transform="translate('+x.toFixed(2)+' '+y.toFixed(2)+') rotate('+rot+') scale('+
      (s*0.16).toFixed(3)+')" opacity="'+op+'"><path d="'+P+'" fill="'+c+'" transform="translate(-12 -12)"/></g>';
  }
  return '<svg class="hearts" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true">'+out+'</svg>';
}

function render(){
  if(!document.querySelector(".hearts"))
    document.body.insertAdjacentHTML("afterbegin",heartField());
  header();
  var v=VIEW,h="";
  if(v==="dash"&&ME)h=vDash();
  else if(v==="mine"&&ME){h=ME.role==="volunteer"?vMineVolunteer():ME.role==="provider"?vMineProvider():vMineAdmin();}
  else if(v==="pets")h=vPets();
  else if(v==="pet")h=vPet();
  else if(v==="people")h=vRegister();
  else if(v==="journal")h=vJournal();
  else if(v==="sponsor")h=vSponsor();
  else if(v==="paid")h=vPaid();
  else if(v==="slip")h=vSlip();
  else if(v==="ask"){h=vAsk();setTimeout(drawWho,0);}
  else if(v==="sq")h=vSquare();
  else if(v==="task")h=vTask();
  else h=vQuilt();
  $("app").innerHTML=h;
}
function setF(f){FILTER=f;render();}

/* ---------------- claiming a square ---------------- */
document.addEventListener("click",function(e){
  var p=e.target.closest(".patch"); if(!p||p.disabled)return;
  if(p.dataset.pn!==undefined){
    var pn=PETNEEDS[+p.dataset.pn];
    resetSheet(); $("dneed").innerHTML=pn.t;
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
  if(window.__addHh){
    var nn=($("hhName")&&$("hhName").value.trim())||"(no name given)";
    var need=($("hhNeed")&&$("hhNeed").value.trim())||"A household \u00b7 nothing specified";
    SQUARES.unshift({t:need,s:"wait",days:0,k:Math.floor(Math.random()*8),
      name:nn,phone:($("hhPh")&&$("hhPh").value.trim())||"",
      addr:($("hhAddr")&&$("hhAddr").value.trim())||"(address not recorded)",
      how:"however is easiest",by_when:"as soon as somebody takes it",
      emblem:newEmblem(),delivered:false});
    logIt("registered","A household was added to the register",ME&&ME.name);
    window.__addHh=false;
    $("dname").style.display=""; var sl=$("dname").parentNode.querySelector(".sl"); if(sl)sl.style.display="";
    $("dlg").close(); render(); return;
  }
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
  /* a name typed as =1+1 must not become a formula when the org opens this */
  var csv=rows.map(function(r){return r.map(function(c){
    var v=String(c); if(/^[=+\-@\t\r]/.test(v)) v="'"+v;
    return '"'+v.replace(/"/g,'""')+'"';}).join(",");}).join("\n");
  var url=URL.createObjectURL(new Blob([csv],{type:"text/csv"}));
  var a=document.createElement("a");a.href=url;a.download="northside-winter-drive.csv";
  document.body.appendChild(a);a.click();document.body.removeChild(a);
  setTimeout(function(){URL.revokeObjectURL(url);},3000);
}
render();
