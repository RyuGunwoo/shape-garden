'use strict';
const MathEngine=(()=>{
 const normalize=s=>String(s??'').normalize('NFKC').replace(/[⁄∕／]/g,'/').replace(/。/g,'.').trim();
 function rational(value){
  const s=normalize(value);let m;
  if((m=s.match(/^(\d{1,6})\s+(\d{1,6})\s*\/\s*(\d{1,6})$/))){const w=BigInt(m[1]),n=BigInt(m[2]),d=BigInt(m[3]);return d===0n?null:{n:w*d+n,d};}
  if((m=s.match(/^(\d{1,6})\s*\/\s*(\d{1,6})$/))){const n=BigInt(m[1]),d=BigInt(m[2]);return d===0n?null:{n,d};}
  if((m=s.match(/^(\d{1,6})(?:\.(\d{1,6}))?$/))){const digits=m[2]||'',d=10n**BigInt(digits.length);return{n:BigInt(m[1])*d+BigInt(digits||'0'),d};}
  if((m=s.match(/^\.(\d{1,6})$/)))return{n:BigInt(m[1]),d:10n**BigInt(m[1].length)};
  return null;
 }
 function parse(q,value){
  if(q.answerType==='choice')return q.choices.includes(value)?{choice:value}:null;
  const s=normalize(value);
  if(q.answerType==='integer'&&!/^\d{1,6}$/.test(s))return null;
  if(q.answerType==='decimal'&&!/^(?:\d{1,6}(?:\.\d{1,6})?|\.\d{1,6})$/.test(s))return null;
  if(q.answerType==='fraction'&&s.includes('.'))return null;
  return rational(s);
 }
 function grade(q,value){const a=parse(q,value);if(!a)return null;if(q.answerType==='choice')return a.choice===q.correct;const b=rational(q.correct);return !!b&&a.n*b.d===b.n*a.d;}
 return{normalize,rational,parse,grade};
})();
if(typeof module!=='undefined')module.exports=MathEngine;
