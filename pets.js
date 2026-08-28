/* ---------------- appliqué animals: stitched onto a patchwork square ----------------
   Drawn, never photographed. A real shelter can ship this without licensing a
   single image, and it looks like nothing else in the sector. */
function animal(kind,f,seed){
  var body=CREAM, line="rgba(32,36,46,.72)", blush="rgba(181,105,122,.5)";
  var s='<svg class="blk" viewBox="0 0 60 60" preserveAspectRatio="xMidYMid slice" aria-hidden="true">';
  s+='<rect width="60" height="60" fill="'+f.b+'"/>';
  /* a soft patchwork ground behind the animal */
  s+='<path d="M0 0h30v30H0z" fill="'+f.a+'" opacity=".28"/>';
  s+='<path d="M30 30h30v30H30z" fill="'+f.a+'" opacity=".28"/>';
  s+='<path d="M0 15h60M0 30h60M0 45h60M15 0v60M30 0v60M45 0v60" stroke="rgba(255,255,255,.22)" stroke-width="1" stroke-dasharray="2 3"/>';
  var g='<g stroke="'+line+'" stroke-width="1.4" stroke-linejoin="round" stroke-linecap="round">';
  if(kind==="cat"||kind==="kitten"){
    var sc=kind==="kitten"?.86:1, cy=kind==="kitten"?36:34;
    g+='<g transform="translate(30 '+cy+') scale('+sc+') translate(-30 -'+cy+')">';
    /* ears */
    g+='<path d="M17 '+(cy-9)+' L20 '+(cy-23)+' L31 '+(cy-13)+' Z" fill="'+body+'"/>';
    g+='<path d="M43 '+(cy-9)+' L40 '+(cy-23)+' L29 '+(cy-13)+' Z" fill="'+body+'"/>';
    g+='<path d="M20.5 '+(cy-11)+' L22 '+(cy-19)+' L27.5 '+(cy-13.5)+' Z" fill="'+blush+'" stroke="none"/>';
    g+='<path d="M39.5 '+(cy-11)+' L38 '+(cy-19)+' L32.5 '+(cy-13.5)+' Z" fill="'+blush+'" stroke="none"/>';
    /* head */
    g+='<ellipse cx="30" cy="'+cy+'" rx="16.5" ry="14" fill="'+body+'"/>';
    /* eyes shut and content, or open, depending on the seed */
    if(seed%2){ g+='<path d="M22 '+(cy-2)+' q3 3 6 0M32 '+(cy-2)+' q3 3 6 0" fill="none"/>'; }
    else { g+='<ellipse cx="25" cy="'+(cy-2)+'" rx="2.3" ry="2.8" fill="'+line+'" stroke="none"/>'+
              '<ellipse cx="35" cy="'+(cy-2)+'" rx="2.3" ry="2.8" fill="'+line+'" stroke="none"/>'; }
    g+='<path d="M28 '+(cy+4)+' h4 l-2 2.4 Z" fill="'+line+'" stroke="none"/>';
    g+='<path d="M30 '+(cy+6.4)+' v2 M30 '+(cy+8.4)+' q-2.6 2.2-5 0 M30 '+(cy+8.4)+' q2.6 2.2 5 0" fill="none"/>';
    g+='<path d="M13 '+(cy+2)+' h-7 M13 '+(cy+5)+' h-6.5 M47 '+(cy+2)+' h7 M47 '+(cy+5)+' h6.5" fill="none" stroke-width="1.1"/>';
    g+='</g>';
  } else {
    var cy2=kind==="puppy"?37:35, sc2=kind==="puppy"?.88:1;
    g+='<g transform="translate(30 '+cy2+') scale('+sc2+') translate(-30 -'+cy2+')">';
    /* floppy ears behind the head */
    g+='<ellipse cx="14" cy="'+(cy2-2)+'" rx="6" ry="12" fill="'+f.a+'" transform="rotate(-14 14 '+(cy2-2)+')"/>';
    g+='<ellipse cx="46" cy="'+(cy2-2)+'" rx="6" ry="12" fill="'+f.a+'" transform="rotate(14 46 '+(cy2-2)+')"/>';
    g+='<ellipse cx="30" cy="'+(cy2-2)+'" rx="16" ry="13.5" fill="'+body+'"/>';
    /* muzzle */
    g+='<ellipse cx="30" cy="'+(cy2+6)+'" rx="10" ry="7.5" fill="'+body+'"/>';
    g+='<ellipse cx="25" cy="'+(cy2-4)+'" rx="2.3" ry="2.7" fill="'+line+'" stroke="none"/>';
    g+='<ellipse cx="35" cy="'+(cy2-4)+'" rx="2.3" ry="2.7" fill="'+line+'" stroke="none"/>';
    g+='<ellipse cx="30" cy="'+(cy2+2.5)+'" rx="3.1" ry="2.4" fill="'+line+'" stroke="none"/>';
    g+='<path d="M30 '+(cy2+4.9)+' v2.4 M30 '+(cy2+7.3)+' q-3 2.4-5.4 0 M30 '+(cy2+7.3)+' q3 2.4 5.4 0" fill="none"/>';
    if(seed%3===0) g+='<path d="M30 '+(cy2+9.6)+' q0 4 3.4 4.6" fill="'+blush+'" stroke="'+line+'" stroke-width="1.1"/>';
    g+='</g>';
  }
  g+='</g>';
  /* the appliqué stitch line around the whole square */
  s+=g+'<rect x="3" y="3" width="54" height="54" fill="none" stroke="rgba(255,255,255,.5)" stroke-width="1.2" stroke-dasharray="3 3"/>';
  return s+'</svg>';
}


/* a photo where we have one, the appliqué square where we do not */
function petFace(p,seed){
  if(p.img) return '<img class="blk" src="'+p.img+'" alt="'+esc(p.n)+'" loading="lazy">';
  return animal(p.k,FAB[p.f],seed);
}
var PETNOW=null;
function openPet(name){
  PETNOW=PETS.filter(function(p){return p.n===name;})[0]||null;
  VIEW="pet"; render(); window.scrollTo(0,0);
}
function vPet(){
  var p=PETNOW; if(!p) return vPets();
  var slots=p.walks.map(function(w){
    var taken=BOOKED[p.n+"|"+w];
    return '<button class="chip'+(taken?" on":"")+'" '+(taken?"disabled":"")+
      ' onclick="bookWalk(\''+esc(p.n)+'\',\''+w+'\')">'+w+(taken?" \u00b7 yours":"")+'</button>';}).join("");
  return '<button class="btn ghost" onclick="go(\'pets\')" style="margin-bottom:18px">&larr; Back to the shelter</button>'+
  '<div class="petpage">'+
    '<div class="petshot">'+petFace(p,p.n.length)+'</div>'+
    '<div>'+
      '<div class="sl">'+esc(p.age)+' &middot; '+(p.need==="foster"?"needs a foster tonight":"looking for company")+'</div>'+
      '<h1 style="font-size:44px;line-height:1;margin:6px 0 12px">'+esc(p.n)+'</h1>'+
      '<p class="lede" style="font-size:17px;margin-bottom:16px">'+esc(p.s)+'</p>'+
      '<div class="traits">'+p.traits.map(function(t){return '<span class="tr">'+esc(t)+'</span>';}).join("")+'</div>'+
      '<div class="deets">'+
        '<div><b>Loves</b><span>'+esc(p.likes)+'</span></div>'+
        '<div><b>Not keen on</b><span>'+esc(p.dislikes)+'</span></div>'+
        '<div><b>At the vet</b><span>'+esc(p.vet)+'</span></div>'+
        '<div><b>With others</b><span>'+esc(p["with"])+'</span></div>'+
      '</div>'+
      '<div class="rowb" style="margin-top:20px">'+
        (p.need==="foster"?'<button class="btn warm" onclick="foster(\''+esc(p.n)+'\')">Foster '+esc(p.n)+'</button>':'')+
        (p.walks.length?'<button class="btn ghost" onclick="document.querySelector(\'.walkslots\').scrollIntoView({block:\'center\'})">Book a walk</button>':'')+
      '</div>'+
    '</div>'+
  '</div>'+
  (p.walks.length?'<div class="sect">walk '+esc(p.n)+'</div>'+
    '<p class="lede" style="font-size:16px;margin-bottom:14px">Pick a time. You turn up, they get an hour out, and somebody is pleased to see you.</p>'+
    '<div class="rowb walkslots">'+slots+'</div>':'')+
  '<div class="foot"><b>'+esc(p.n)+' has a name and a face on purpose.</b> Households on this drive do not, '+
  'and that asymmetry is deliberate: a name is what gets an animal home, and anonymity is what lets a family ask.</div>';
}

/* ---------------- the shelter side of the drive ---------------- */
var PETS=[
 {n:"Biscuit",k:"kitten",age:"11 weeks",f:3,img:"pets/biscuit.jpg",
  traits:["sleeps in shoes","purrs constantly","tiny"],
  likes:"being carried in a coat pocket",dislikes:"being put down",
  vet:"vaccinated, too young to neuter",with:"good with other cats, untested with dogs",
  s:"Found under a parked van in the sleet. Sleeps in a shoe. Needs a foster before the cold sets in.",
  need:"foster",walks:[]},
 {n:"Marlow",k:"dog",age:"6 years",f:4,img:"pets/marlow.jpg",
  traits:["quiet","heavy-footed","leans"],
  likes:"leaning his whole weight on your leg",dislikes:"being left in the yard",
  vet:"neutered, chipped, all up to date",with:"fine with dogs, calm around children",
  s:"Waited longest of anyone here. Quiet, heavy-footed, leans on your leg the whole time.",
  need:"walk",walks:["Tue 10:00","Tue 15:00","Thu 11:00","Sat 09:30"]},
 {n:"Pepper",k:"cat",age:"3 years",f:2,img:"pets/pepper.jpg",
  traits:["watchful","clean","talks"],
  likes:"a windowsill and someone in the room",dislikes:"being the only one left",
  vet:"spayed, chipped, healthy",with:"came in with a sister who has been rehomed",
  s:"Came in with her sister, who has been rehomed. Does not like being the only one left.",
  need:"foster",walks:[]},
 {n:"Tuppence",k:"puppy",age:"14 weeks",f:0,img:"pets/tuppence.jpg",
  traits:["chaotic","affectionate","teething"],
  likes:"socks, shoes, table legs, you",dislikes:"nothing yet, give it time",
  vet:"first jabs done, second due in three weeks",with:"loves everyone, no manners at all",
  s:"Chews everything that is not nailed down. Will be somebody's whole world.",
  need:"walk",walks:["Wed 14:00","Fri 10:30","Sat 13:00"]},
 {n:"Otis",k:"dog",age:"9 years",f:6,
  traits:["deaf","unbothered","enormous"],
  likes:"a sofa, and somebody sitting on it with him",dislikes:"stairs",
  vet:"neutered, arthritic, on daily medication we provide",with:"utterly unbothered by anything",
  s:"Old, deaf, entirely unbothered. Wants a sofa and somebody to sit on it.",
  need:"foster",walks:["Mon 11:00","Thu 15:30"]},
 {n:"Nettle",k:"cat",age:"2 years",f:5,
  traits:["shy then not","warm","opinionated"],
  likes:"your keyboard, specifically",dislikes:"the first four minutes of meeting you",
  vet:"spayed, chipped, healthy",with:"better as the only cat",
  s:"Shy for about four minutes, then she is on your keyboard.",
  need:"walk",walks:["Tue 13:00","Fri 16:00"]}
];
var PETNEEDS=[
 {t:"Kitten milk replacer &middot; the shelter is out until Friday",s:"wait"},
 {t:"Blankets &middot; every crate needs one and eleven do not have one",s:"wait"},
 {t:"Puppy chew toys &middot; nobody ever donates these",s:"wait"},
 {t:"Cat litter &middot; the single biggest running cost here",s:"held",by:"the Corner Bakery",note:"delivered"},
 {t:"Slip leads &middot; six, for the walking programme",s:"held",by:"Lena",note:"dropping off Thursday"},
 {t:"A heat pad for the intake room",s:"wait"}
];
var BOOKED={};

function petWaiting(){return PETNEEDS.filter(function(d){return d.s==="wait";}).length;}

function vPets(){
  var fosters=PETS.filter(function(p){return p.need==="foster";});
  var walkers=PETS.filter(function(p){return p.walks.length;});
  var h='<div class="hero"><h1>The shelter is <em>on the quilt too.</em></h1>'+
    '<p class="lede">Same drive, same board. Some squares are households and some are animals, '+
    'and the ones nobody has taken stay cool either way.</p></div>';

  h+='<div class="count"><b>'+petWaiting()+'</b><span class="lab">shelter squares still waiting</span>'+
     '<span class="sub">'+fosters.length+' animals need a foster tonight<br><em>'+
     walkers.reduce(function(a,p){return a+p.walks.length;},0)+' walking slots free this week</em></span></div>';

  h+='<div class="sect">foster a pet</div>'+
     '<p class="lede" style="margin-bottom:16px;font-size:16px">A foster is not adoption. It is a warm room for a few weeks while we find the right home. The shelter pays for the food and the vet.</p>'+
     '<div class="quilt">'+fosters.map(function(p,i){return petCard(p,i,"foster");}).join("")+'</div>';

  h+='<div class="sect">book a walk</div>'+
     '<p class="lede" style="margin-bottom:16px;font-size:16px">Pick an animal and a time. You turn up, they get an hour out, and the longest-waiting ones are listed first.</p>'+
     '<div class="grid g2">'+walkers.map(function(p){return walkCard(p);}).join("")+'</div>';

  h+='<div class="sect">what the shelter is short of</div><div class="quilt">'+
     PETNEEDS.map(function(d,i){
       var held=d.s==="held", f=FAB[held?((i*3)%8):0];
       return '<button class="patch '+(held?"held":"waiting")+'" data-pn="'+i+'"'+(held?" disabled":"")+'>'+
         block((i*2+1)%8,f,!held)+'<span class="stitch"></span><span class="lbl">'+
         '<span class="tag"><i></i>'+(held?"taken care of":"still waiting")+'</span>'+
         '<span class="need">'+d.t+'</span>'+
         (held?'<span class="by">Stitched in by '+esc(d.by)+' &middot; '+esc(d.note)+'</span>'
              :'<span class="cta">I\'ll volunteer</span>')+
         '</span></button>';}).join("")+'</div>';

  h+='<div class="foot"><b>Animals get names, households do not.</b> That is deliberate. '+
     'Nobody is shamed by having their dog\'s name on a board, and a name is what gets an animal fostered.</div>';
  return h;
}
function petCard(p,i,mode){
  return '<button class="patch held pet" onclick="openPet(\''+esc(p.n)+'\')">'+petFace(p,i)+
    '<span class="lbl"><span class="tag"><i></i>'+esc(p.age)+' &middot; needs a foster</span>'+
    '<span class="need" style="font-size:20px">'+esc(p.n)+'</span>'+
    '<span class="by" style="margin-top:5px">'+esc(p.s)+'</span>'+
    '<span class="cta" style="margin-top:11px">Meet '+esc(p.n)+'</span>'+
    '</span></button>';
}
function walkCard(p){
  var slots=p.walks.map(function(w){
    var key=p.n+"|"+w, taken=BOOKED[key];
    return '<button class="chip'+(taken?" on":"")+'" '+(taken?"disabled":"")+
      ' onclick="bookWalk(\''+esc(p.n)+'\',\''+w+'\')">'+w+(taken?" &middot; yours":"")+'</button>';}).join("");
  return '<div class="card" style="padding:0;overflow:hidden">'+
    '<div class="walkcard">'+
      '<button class="walkthumb" onclick="openPet(\''+esc(p.n)+'\')" aria-label="'+esc(p.n)+'">'+petFace(p,p.n.length)+'</button>'+
      '<div style="padding:16px 18px;flex:1;min-width:0">'+
        '<h4 style="font-size:21px;margin-bottom:2px"><button class="petlink" onclick="openPet(\''+esc(p.n)+'\')">'+esc(p.n)+'</button></h4>'+
        '<div class="muted" style="margin-bottom:7px">'+esc(p.age)+'</div>'+
        '<p style="font-size:14.5px;color:var(--ink2);line-height:1.5;margin-bottom:12px">'+esc(p.s)+'</p>'+
        '<div class="sl" style="margin-bottom:8px">free walking slots</div>'+
        '<div class="rowb">'+slots+'</div>'+
      '</div></div></div>';
}
function bookWalk(name,when){
  BOOKED[name+"|"+when]=1; render();
  setTimeout(function(){
    var d=$("dlg");
    $("dneed").innerHTML="You're walking "+esc(name)+".";
    $("dsub").innerHTML=esc(when)+". They get an hour out, and somebody to be pleased to see.";
    $("dfl").style.display="none";
    $("dpriv").innerHTML="Turn up a few minutes early. If something comes up you can hand the slot back and nobody minds &mdash; better a free slot than an empty one.";
    $("fabs").innerHTML='<div style="grid-column:1/-1" class="qr">'+
      '<div class="code">'+QR.svg(qrLink("pet/"+encodeURIComponent(name)),120,"#22304F","#FEFBF6")+'</div>'+
      '<div class="txt"><h4>Show this at the kennel door</h4><p>The staff scan it and bring '+esc(name)+
      ' out to you. No paperwork, no waiting at reception.</p></div></div>';
    $("dname").value=ME?ME.name:"";
    d.showModal();
  },120);
}
function foster(name){
  var d=$("dlg");
  $("dneed").innerHTML="Foster "+esc(name)+".";
  $("dsub").innerHTML="A warm room, and somebody to notice them. That is the whole job.";
  $("dfl").style.display="none";
  $("dpriv").innerHTML="Somebody from the shelter rings you first for a chat, not an inspection. You can say no after that call and it costs you nothing.";
  $("fabs").innerHTML='<div style="grid-column:1/-1" class="note" style="margin:0">'+
    'A foster is a warm room for a few weeks, not a lifetime promise. '+
    'The shelter covers food, litter and every vet visit. If it turns out you cannot keep going, '+
    'you ring us and we collect &mdash; no guilt, no questions.</div>';
  $("dname").value=ME?ME.name:"";
  d.showModal();
}
