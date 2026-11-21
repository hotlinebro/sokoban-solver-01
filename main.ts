import{readdirSync as A,readFileSync as B,mkdirSync as C,writeFileSync as E}from"node:fs";
let D,U8=Uint8Array,I3=Int32Array,e=process.env,I=e.MAKEFUN_INPUT_DIR||"/input",O=e.MAKEFUN_OUTPUT_DIR||"/output";
let R=(a,o,f,s,t,k)=>{let l=f,n=1;k[0]=f;s[f]=t;while(n>0){let p=k[--n];if(p<l)l=p;for(let d of D){let q=p+d;if(!a[q]&&!o[q]&&s[q]!=t){s[q]=t;k[n++]=q}}}return l};
let S=(a,g,b,p)=>{let n=a.length,y=new U8(n),v=new U8(n),q=[...g],o=new U8(n),e=new I3(n),m=new I3(n),k=new I3(n),t=0;
for(let x of g)y[x]=1,v[x]=1;for(let x of q){for(let d of D){let y=x-d;if(!a[y]&&!a[y-d]&&!v[y]){v[y]=1;q.push(y)}}}
if(b.some(x=>!v[x]))return 0;
let B=[b],P=[p],A=[-1],Q=new Map;
for(let x of b)o[x]=1;Q.set(R(a,o,p,e,++t,k)+","+b,0);
let f=-1;
for(let h=0;f<0&&h<B.length;h++){let s=B[h];for(let x of s)o[x]=1;R(a,o,P[h],e,++t,k);let u=t;
for(let j=0;j<s.length&&f<0;j++){let q=s[j];for(let c of D){let T=q+c;if(e[q-c]!=u||a[T]||o[T]||!v[T])continue;o[q]=0,o[T]=1;let N=s.slice();N[j]=T;N.sort((x,y)=>x-y);let G=R(a,o,q,m,++t,k)+","+N;o[T]=0,o[q]=1;if(Q.has(G))continue;if(B.length>=25e4)return 0;Q.set(G,B.length);B.push(N);P.push(q);A.push(h);if(N.every(c=>y[c])){f=B.length-1;break}}}
for(let x of s)o[x]=0}
if(f<0)return 0;
let M="",C=B[f];
for(let s=f;s>0;s=A[s]){let N=B[A[s]],r=P[s],T=C.find(x=>!N.includes(x)),d=T-r,di=D.indexOf(d),st=P[A[s]];for(let x of N)o[x]=1;
let v2=new I3(n).fill(-1),h2=[],w2=[st],s2="";v2[st]=st;
for(let x of w2){if(x==r-d)break;for(let j=0;j<4;j++){let y=x+D[j];if(a[y]||o[y]||v2[y]>-1)continue;v2[y]=x;h2[y]="udlr"[j];w2.push(y)}}
for(let x=r-d;x!=st;x=v2[x])s2=h2[x]+s2;M=s2+"UDLR"[di]+M;
for(let x of N)o[x]=0;C=N}
return[M,P[f]]};
let G=(w,p,b,g)=>{let m=new Map,k=x=>((x/w|0)<(p/w|0)?0:1)*9+((x%w)/7|0);
for(let i=0;i<2;i++)for(let x of i?g:b){let r=m.get(k(x))||[[],[]];r[i].push(x);m.set(k(x),r)}
return[...m.values()].filter(r=>r[0].length)};
let Y=t=>{let r=t.trim().split("\n"),h=r.length,w=r[0].length,a=new U8(w*h).fill(1),g=[],b=[],p=-1;
r.forEach((s,y)=>{for(let x=0;x<w;x++){let c=s[x],i=y*w+x;a[i]=c=="#"?1:0;if(".*+".includes(c))g.push(i);if("$*".includes(c))b.push(i);if("@+".includes(c))p=i}});
D=[-w,w,-1,1];let r2=G(w,p,b,g);
if(!r2)return"";
let m="";
for(let x of r2){let a2=a.slice();for(let o of r2)if(o!=x)for(let b2 of o[2]?o[1]:o[0])a2[b2]=1;
let s=S(a2,x[1],x[0],p);if(!s)return"";m+=s[0];p=s[1];x[2]=1}
return m};
for(let i of A(I)){C(O+"/"+i,{recursive:!0});E(O+"/"+i+"/solution.txt",Y(B(I+"/"+i+"/level.txt","utf8"))+"\n")}
