import{Q as N,a as G,b as L}from"./Main.52b9528a.js";import{Q as C}from"./QCard.6e576dfa.js";import{_ as U,O as j,L as T,r as c,c as d,a3 as o,U as i,Y as v,a4 as g,a7 as n,X as A,a5 as S,W as u,$ as z,a0 as $,S as p,V as m,a8 as E,a9 as F,a6 as H}from"./index.7ddce7ca.js";const O={class:"row justify-center q-col-gutter-x-md"},W=["src","srcset"],X={key:1,class:"desc text-grey-2"},Y={__name:"GallerySlide",props:{title:{type:String,default:null},subTitle:{type:String,default:null},images:{type:Array,required:!0,default:()=>[]},locale:{type:String,default:"ko"},controlColor:{type:String,default:"primary"},textColor:{type:String,default:"black"},intersection:{type:Boolean,default:!1},ratio:{type:Number,default:1},transitionDuration:{type:Number,default:300}},emits:["before-show","show"],setup(a,{emit:J}){const y=a,h=j(),V=T(),w=c(0),b=d(()=>h.screen.lt.md?2:h.screen.lt.lg?3:4),Q=d(()=>y.images),I=d(()=>Q.value.reduce((e,t,s)=>(s%b.value?e[e.length-1].push(t):e.push([t]),e),[])),r=c(!1),l=c({}),B=e=>{e?(l.value=e,r.value=!0):r.value=!1},k=c(!y.intersection),D=e=>{k.value=e.isIntersecting},_=d(()=>V.sizes);return(e,t)=>(o(),i("div",null,[v("div",{class:n(["title",`text-${a.textColor}`])},g(a.title),3),v("div",{class:n(["sub-title",`text-${a.textColor}`])},g(a.subTitle),3),A((o(),S(L,{modelValue:w.value,"onUpdate:modelValue":t[0]||(t[0]=s=>w.value=s),class:n([k.value?"complete":"","intersection bg-transparent text-white full-height"]),"keep-alive":"","transition-prev":"slide-right","transition-next":"slide-left",swipeable:"",animated:"",infinite:"","control-color":a.controlColor,arrows:"",padding:"","transition-duration":a.transitionDuration},{default:u(()=>[(o(!0),i(z,null,$(p(I),(s,x)=>(o(),S(N,{class:"no-scroll",key:x,name:x},{default:u(()=>[v("div",O,[(o(!0),i(z,null,$(s,(f,q)=>(o(),i("div",{class:n(`col-${12/p(b)}`),key:q},[m(C,{class:"no-shadow bg-grey-4 cursor-pointer",onClick:K=>B(f)},{default:u(()=>[m(G,{ratio:1,src:f.src,srcset:f.srcset,sizes:p(_)},null,8,["src","srcset","sizes"])]),_:2},1032,["onClick"])],2))),128))])]),_:2},1032,["name"]))),128))]),_:1},8,["modelValue","class","control-color","transition-duration"])),[[H,D]]),m(F,{modelValue:r.value,"onUpdate:modelValue":t[2]||(t[2]=s=>r.value=s),onBeforeHide:t[3]||(t[3]=s=>l.value={})},{default:u(()=>[m(C,{class:n(["shadow-1 bg-grey-2 cursor-pointer no-scroll position-relative",a.ratio>1?"vertical":"horizontal"]),onClick:t[1]||(t[1]=s=>r.value=!1)},{default:u(()=>[v("img",{class:"fit img",src:l.value.src,srcset:l.value.srcset},null,8,W),e.$slots.info?E(e.$slots,"info",{key:0,info:l.value},void 0,!0):(o(),i("div",X,g(l.value.desc[a.locale]),1))]),_:3},8,["class"])]),_:3},8,["modelValue"])]))}};var Z=U(Y,[["__scopeId","data-v-154ed294"]]);export{Z as default};
