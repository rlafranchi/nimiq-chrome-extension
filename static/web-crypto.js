require=function e(t,i,r){function f(d,a){if(!i[d]){if(!t[d]){var s="function"==typeof require&&require;if(!a&&s)return s(d,!0);if(n)return n(d,!0);var c=new Error("Cannot find module '"+d+"'");throw c.code="MODULE_NOT_FOUND",c}var h=i[d]={exports:{}};t[d][0].call(h.exports,function(e){var i=t[d][1][e];return f(i||e)},h,h.exports,e,t,i,r)}return i[d].exports}for(var n="function"==typeof require&&require,d=0;d<r.length;d++)f(r[d]);return f}({1:[function(e,t,i){!function(t,i){"use strict";function r(e,t){if(!e)throw new Error(t||"Assertion failed")}function f(e,t){e.super_=t;var i=function(){};i.prototype=t.prototype,e.prototype=new i,e.prototype.constructor=e}function n(e,t,i){if(n.isBN(e))return e;this.negative=0,this.words=null,this.length=0,this.red=null,null!==e&&("le"!==t&&"be"!==t||(i=t,t=10),this._init(e||0,t||10,i||"be"))}function d(e,t,i){for(var r=0,f=Math.min(e.length,i),n=t;n<f;n++){var d=e.charCodeAt(n)-48;r<<=4,r|=d>=49&&d<=54?d-49+10:d>=17&&d<=22?d-17+10:15&d}return r}function a(e,t,i,r){for(var f=0,n=Math.min(e.length,i),d=t;d<n;d++){var a=e.charCodeAt(d)-48;f*=r,f+=a>=49?a-49+10:a>=17?a-17+10:a}return f}function s(e){for(var t=new Array(e.bitLength()),i=0;i<t.length;i++){var r=i/26|0,f=i%26;t[i]=(e.words[r]&1<<f)>>>f}return t}function c(e,t,i){i.negative=t.negative^e.negative;var r=e.length+t.length|0;i.length=r,r=r-1|0;var f=0|e.words[0],n=0|t.words[0],d=f*n,a=67108863&d,s=d/67108864|0;i.words[0]=a;for(var c=1;c<r;c++){for(var h=s>>>26,o=67108863&s,u=Math.min(c,t.length-1),b=Math.max(0,c-e.length+1);b<=u;b++){var l=c-b|0;h+=(d=(f=0|e.words[l])*(n=0|t.words[b])+o)/67108864|0,o=67108863&d}i.words[c]=0|o,s=0|h}return 0!==s?i.words[c]=0|s:i.length--,i.strip()}function h(e,t,i){i.negative=t.negative^e.negative,i.length=e.length+t.length;for(var r=0,f=0,n=0;n<i.length-1;n++){var d=f;f=0;for(var a=67108863&r,s=Math.min(n,t.length-1),c=Math.max(0,n-e.length+1);c<=s;c++){var h=n-c,o=(0|e.words[h])*(0|t.words[c]),u=67108863&o;a=67108863&(u=u+a|0),f+=(d=(d=d+(o/67108864|0)|0)+(u>>>26)|0)>>>26,d&=67108863}i.words[n]=a,r=d,d=f}return 0!==r?i.words[n]=r:i.length--,i.strip()}function o(e,t,i){return(new u).mulp(e,t,i)}function u(e,t){this.x=e,this.y=t}function b(e,t){this.name=e,this.p=new n(t,16),this.n=this.p.bitLength(),this.k=new n(1).iushln(this.n).isub(this.p),this.tmp=this._tmp()}function l(){b.call(this,"k256","ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f")}function p(){b.call(this,"p224","ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001")}function m(){b.call(this,"p192","ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff")}function v(){b.call(this,"25519","7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed")}function g(e){if("string"==typeof e){var t=n._prime(e);this.m=t.p,this.prime=t}else r(e.gtn(1),"modulus must be greater than 1"),this.m=e,this.prime=null}function y(e){g.call(this,e),this.shift=this.m.bitLength(),this.shift%26!=0&&(this.shift+=26-this.shift%26),this.r=new n(1).iushln(this.shift),this.r2=this.imod(this.r.sqr()),this.rinv=this.r._invmp(this.m),this.minv=this.rinv.mul(this.r).isubn(1).div(this.m),this.minv=this.minv.umod(this.r),this.minv=this.r.sub(this.minv)}"object"==typeof t?t.exports=n:i.BN=n,n.BN=n,n.wordSize=26;var M;try{M=e("buffer").Buffer}catch(e){}n.isBN=function(e){return e instanceof n||null!==e&&"object"==typeof e&&e.constructor.wordSize===n.wordSize&&Array.isArray(e.words)},n.max=function(e,t){return e.cmp(t)>0?e:t},n.min=function(e,t){return e.cmp(t)<0?e:t},n.prototype._init=function(e,t,i){if("number"==typeof e)return this._initNumber(e,t,i);if("object"==typeof e)return this._initArray(e,t,i);"hex"===t&&(t=16),r(t===(0|t)&&t>=2&&t<=36);var f=0;"-"===(e=e.toString().replace(/\s+/g,""))[0]&&f++,16===t?this._parseHex(e,f):this._parseBase(e,t,f),"-"===e[0]&&(this.negative=1),this.strip(),"le"===i&&this._initArray(this.toArray(),t,i)},n.prototype._initNumber=function(e,t,i){e<0&&(this.negative=1,e=-e),e<67108864?(this.words=[67108863&e],this.length=1):e<4503599627370496?(this.words=[67108863&e,e/67108864&67108863],this.length=2):(r(e<9007199254740992),this.words=[67108863&e,e/67108864&67108863,1],this.length=3),"le"===i&&this._initArray(this.toArray(),t,i)},n.prototype._initArray=function(e,t,i){if(r("number"==typeof e.length),e.length<=0)return this.words=[0],this.length=1,this;this.length=Math.ceil(e.length/3),this.words=new Array(this.length);for(var f=0;f<this.length;f++)this.words[f]=0;var n,d,a=0;if("be"===i)for(f=e.length-1,n=0;f>=0;f-=3)d=e[f]|e[f-1]<<8|e[f-2]<<16,this.words[n]|=d<<a&67108863,this.words[n+1]=d>>>26-a&67108863,(a+=24)>=26&&(a-=26,n++);else if("le"===i)for(f=0,n=0;f<e.length;f+=3)d=e[f]|e[f+1]<<8|e[f+2]<<16,this.words[n]|=d<<a&67108863,this.words[n+1]=d>>>26-a&67108863,(a+=24)>=26&&(a-=26,n++);return this.strip()},n.prototype._parseHex=function(e,t){this.length=Math.ceil((e.length-t)/6),this.words=new Array(this.length);for(var i=0;i<this.length;i++)this.words[i]=0;var r,f,n=0;for(i=e.length-6,r=0;i>=t;i-=6)f=d(e,i,i+6),this.words[r]|=f<<n&67108863,this.words[r+1]|=f>>>26-n&4194303,(n+=24)>=26&&(n-=26,r++);i+6!==t&&(f=d(e,t,i+6),this.words[r]|=f<<n&67108863,this.words[r+1]|=f>>>26-n&4194303),this.strip()},n.prototype._parseBase=function(e,t,i){this.words=[0],this.length=1;for(var r=0,f=1;f<=67108863;f*=t)r++;r--,f=f/t|0;for(var n=e.length-i,d=n%r,s=Math.min(n,n-d)+i,c=0,h=i;h<s;h+=r)c=a(e,h,h+r,t),this.imuln(f),this.words[0]+c<67108864?this.words[0]+=c:this._iaddn(c);if(0!==d){var o=1;for(c=a(e,h,e.length,t),h=0;h<d;h++)o*=t;this.imuln(o),this.words[0]+c<67108864?this.words[0]+=c:this._iaddn(c)}},n.prototype.copy=function(e){e.words=new Array(this.length);for(var t=0;t<this.length;t++)e.words[t]=this.words[t];e.length=this.length,e.negative=this.negative,e.red=this.red},n.prototype.clone=function(){var e=new n(null);return this.copy(e),e},n.prototype._expand=function(e){for(;this.length<e;)this.words[this.length++]=0;return this},n.prototype.strip=function(){for(;this.length>1&&0===this.words[this.length-1];)this.length--;return this._normSign()},n.prototype._normSign=function(){return 1===this.length&&0===this.words[0]&&(this.negative=0),this},n.prototype.inspect=function(){return(this.red?"<BN-R: ":"<BN: ")+this.toString(16)+">"};var w=["","0","00","000","0000","00000","000000","0000000","00000000","000000000","0000000000","00000000000","000000000000","0000000000000","00000000000000","000000000000000","0000000000000000","00000000000000000","000000000000000000","0000000000000000000","00000000000000000000","000000000000000000000","0000000000000000000000","00000000000000000000000","000000000000000000000000","0000000000000000000000000"],S=[0,0,25,16,12,11,10,9,8,8,7,7,7,7,6,6,6,6,6,6,6,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],_=[0,0,33554432,43046721,16777216,48828125,60466176,40353607,16777216,43046721,1e7,19487171,35831808,62748517,7529536,11390625,16777216,24137569,34012224,47045881,64e6,4084101,5153632,6436343,7962624,9765625,11881376,14348907,17210368,20511149,243e5,28629151,33554432,39135393,45435424,52521875,60466176];n.prototype.toString=function(e,t){e=e||10,t=0|t||1;var i;if(16===e||"hex"===e){i="";for(var f=0,n=0,d=0;d<this.length;d++){var a=this.words[d],s=(16777215&(a<<f|n)).toString(16);i=0!==(n=a>>>24-f&16777215)||d!==this.length-1?w[6-s.length]+s+i:s+i,(f+=2)>=26&&(f-=26,d--)}for(0!==n&&(i=n.toString(16)+i);i.length%t!=0;)i="0"+i;return 0!==this.negative&&(i="-"+i),i}if(e===(0|e)&&e>=2&&e<=36){var c=S[e],h=_[e];i="";var o=this.clone();for(o.negative=0;!o.isZero();){var u=o.modn(h).toString(e);i=(o=o.idivn(h)).isZero()?u+i:w[c-u.length]+u+i}for(this.isZero()&&(i="0"+i);i.length%t!=0;)i="0"+i;return 0!==this.negative&&(i="-"+i),i}r(!1,"Base should be between 2 and 36")},n.prototype.toNumber=function(){var e=this.words[0];return 2===this.length?e+=67108864*this.words[1]:3===this.length&&1===this.words[2]?e+=4503599627370496+67108864*this.words[1]:this.length>2&&r(!1,"Number can only safely store up to 53 bits"),0!==this.negative?-e:e},n.prototype.toJSON=function(){return this.toString(16)},n.prototype.toBuffer=function(e,t){return r(void 0!==M),this.toArrayLike(M,e,t)},n.prototype.toArray=function(e,t){return this.toArrayLike(Array,e,t)},n.prototype.toArrayLike=function(e,t,i){var f=this.byteLength(),n=i||Math.max(1,f);r(f<=n,"byte array longer than desired length"),r(n>0,"Requested array length <= 0"),this.strip();var d,a,s="le"===t,c=new e(n),h=this.clone();if(s){for(a=0;!h.isZero();a++)d=h.andln(255),h.iushrn(8),c[a]=d;for(;a<n;a++)c[a]=0}else{for(a=0;a<n-f;a++)c[a]=0;for(a=0;!h.isZero();a++)d=h.andln(255),h.iushrn(8),c[n-a-1]=d}return c},Math.clz32?n.prototype._countBits=function(e){return 32-Math.clz32(e)}:n.prototype._countBits=function(e){var t=e,i=0;return t>=4096&&(i+=13,t>>>=13),t>=64&&(i+=7,t>>>=7),t>=8&&(i+=4,t>>>=4),t>=2&&(i+=2,t>>>=2),i+t},n.prototype._zeroBits=function(e){if(0===e)return 26;var t=e,i=0;return 0==(8191&t)&&(i+=13,t>>>=13),0==(127&t)&&(i+=7,t>>>=7),0==(15&t)&&(i+=4,t>>>=4),0==(3&t)&&(i+=2,t>>>=2),0==(1&t)&&i++,i},n.prototype.bitLength=function(){var e=this.words[this.length-1],t=this._countBits(e);return 26*(this.length-1)+t},n.prototype.zeroBits=function(){if(this.isZero())return 0;for(var e=0,t=0;t<this.length;t++){var i=this._zeroBits(this.words[t]);if(e+=i,26!==i)break}return e},n.prototype.byteLength=function(){return Math.ceil(this.bitLength()/8)},n.prototype.toTwos=function(e){return 0!==this.negative?this.abs().inotn(e).iaddn(1):this.clone()},n.prototype.fromTwos=function(e){return this.testn(e-1)?this.notn(e).iaddn(1).ineg():this.clone()},n.prototype.isNeg=function(){return 0!==this.negative},n.prototype.neg=function(){return this.clone().ineg()},n.prototype.ineg=function(){return this.isZero()||(this.negative^=1),this},n.prototype.iuor=function(e){for(;this.length<e.length;)this.words[this.length++]=0;for(var t=0;t<e.length;t++)this.words[t]=this.words[t]|e.words[t];return this.strip()},n.prototype.ior=function(e){return r(0==(this.negative|e.negative)),this.iuor(e)},n.prototype.or=function(e){return this.length>e.length?this.clone().ior(e):e.clone().ior(this)},n.prototype.uor=function(e){return this.length>e.length?this.clone().iuor(e):e.clone().iuor(this)},n.prototype.iuand=function(e){var t;t=this.length>e.length?e:this;for(var i=0;i<t.length;i++)this.words[i]=this.words[i]&e.words[i];return this.length=t.length,this.strip()},n.prototype.iand=function(e){return r(0==(this.negative|e.negative)),this.iuand(e)},n.prototype.and=function(e){return this.length>e.length?this.clone().iand(e):e.clone().iand(this)},n.prototype.uand=function(e){return this.length>e.length?this.clone().iuand(e):e.clone().iuand(this)},n.prototype.iuxor=function(e){var t,i;this.length>e.length?(t=this,i=e):(t=e,i=this);for(var r=0;r<i.length;r++)this.words[r]=t.words[r]^i.words[r];if(this!==t)for(;r<t.length;r++)this.words[r]=t.words[r];return this.length=t.length,this.strip()},n.prototype.ixor=function(e){return r(0==(this.negative|e.negative)),this.iuxor(e)},n.prototype.xor=function(e){return this.length>e.length?this.clone().ixor(e):e.clone().ixor(this)},n.prototype.uxor=function(e){return this.length>e.length?this.clone().iuxor(e):e.clone().iuxor(this)},n.prototype.inotn=function(e){r("number"==typeof e&&e>=0);var t=0|Math.ceil(e/26),i=e%26;this._expand(t),i>0&&t--;for(var f=0;f<t;f++)this.words[f]=67108863&~this.words[f];return i>0&&(this.words[f]=~this.words[f]&67108863>>26-i),this.strip()},n.prototype.notn=function(e){return this.clone().inotn(e)},n.prototype.setn=function(e,t){r("number"==typeof e&&e>=0);var i=e/26|0,f=e%26;return this._expand(i+1),this.words[i]=t?this.words[i]|1<<f:this.words[i]&~(1<<f),this.strip()},n.prototype.iadd=function(e){var t;if(0!==this.negative&&0===e.negative)return this.negative=0,t=this.isub(e),this.negative^=1,this._normSign();if(0===this.negative&&0!==e.negative)return e.negative=0,t=this.isub(e),e.negative=1,t._normSign();var i,r;this.length>e.length?(i=this,r=e):(i=e,r=this);for(var f=0,n=0;n<r.length;n++)t=(0|i.words[n])+(0|r.words[n])+f,this.words[n]=67108863&t,f=t>>>26;for(;0!==f&&n<i.length;n++)t=(0|i.words[n])+f,this.words[n]=67108863&t,f=t>>>26;if(this.length=i.length,0!==f)this.words[this.length]=f,this.length++;else if(i!==this)for(;n<i.length;n++)this.words[n]=i.words[n];return this},n.prototype.add=function(e){var t;return 0!==e.negative&&0===this.negative?(e.negative=0,t=this.sub(e),e.negative^=1,t):0===e.negative&&0!==this.negative?(this.negative=0,t=e.sub(this),this.negative=1,t):this.length>e.length?this.clone().iadd(e):e.clone().iadd(this)},n.prototype.isub=function(e){if(0!==e.negative){e.negative=0;var t=this.iadd(e);return e.negative=1,t._normSign()}if(0!==this.negative)return this.negative=0,this.iadd(e),this.negative=1,this._normSign();var i=this.cmp(e);if(0===i)return this.negative=0,this.length=1,this.words[0]=0,this;var r,f;i>0?(r=this,f=e):(r=e,f=this);for(var n=0,d=0;d<f.length;d++)n=(t=(0|r.words[d])-(0|f.words[d])+n)>>26,this.words[d]=67108863&t;for(;0!==n&&d<r.length;d++)n=(t=(0|r.words[d])+n)>>26,this.words[d]=67108863&t;if(0===n&&d<r.length&&r!==this)for(;d<r.length;d++)this.words[d]=r.words[d];return this.length=Math.max(this.length,d),r!==this&&(this.negative=1),this.strip()},n.prototype.sub=function(e){return this.clone().isub(e)};var A=function(e,t,i){var r,f,n,d=e.words,a=t.words,s=i.words,c=0,h=0|d[0],o=8191&h,u=h>>>13,b=0|d[1],l=8191&b,p=b>>>13,m=0|d[2],v=8191&m,g=m>>>13,y=0|d[3],M=8191&y,w=y>>>13,S=0|d[4],_=8191&S,A=S>>>13,x=0|d[5],I=8191&x,z=x>>>13,q=0|d[6],k=8191&q,R=q>>>13,j=0|d[7],P=8191&j,L=j>>>13,E=0|d[8],N=8191&E,B=E>>>13,O=0|d[9],F=8191&O,T=O>>>13,C=0|a[0],H=8191&C,Z=C>>>13,U=0|a[1],D=8191&U,J=U>>>13,X=0|a[2],V=8191&X,K=X>>>13,W=0|a[3],Y=8191&W,G=W>>>13,Q=0|a[4],$=8191&Q,ee=Q>>>13,te=0|a[5],ie=8191&te,re=te>>>13,fe=0|a[6],ne=8191&fe,de=fe>>>13,ae=0|a[7],se=8191&ae,ce=ae>>>13,he=0|a[8],oe=8191&he,ue=he>>>13,be=0|a[9],le=8191&be,pe=be>>>13;i.negative=e.negative^t.negative,i.length=19;var me=(c+(r=Math.imul(o,H))|0)+((8191&(f=(f=Math.imul(o,Z))+Math.imul(u,H)|0))<<13)|0;c=((n=Math.imul(u,Z))+(f>>>13)|0)+(me>>>26)|0,me&=67108863,r=Math.imul(l,H),f=(f=Math.imul(l,Z))+Math.imul(p,H)|0,n=Math.imul(p,Z);var ve=(c+(r=r+Math.imul(o,D)|0)|0)+((8191&(f=(f=f+Math.imul(o,J)|0)+Math.imul(u,D)|0))<<13)|0;c=((n=n+Math.imul(u,J)|0)+(f>>>13)|0)+(ve>>>26)|0,ve&=67108863,r=Math.imul(v,H),f=(f=Math.imul(v,Z))+Math.imul(g,H)|0,n=Math.imul(g,Z),r=r+Math.imul(l,D)|0,f=(f=f+Math.imul(l,J)|0)+Math.imul(p,D)|0,n=n+Math.imul(p,J)|0;var ge=(c+(r=r+Math.imul(o,V)|0)|0)+((8191&(f=(f=f+Math.imul(o,K)|0)+Math.imul(u,V)|0))<<13)|0;c=((n=n+Math.imul(u,K)|0)+(f>>>13)|0)+(ge>>>26)|0,ge&=67108863,r=Math.imul(M,H),f=(f=Math.imul(M,Z))+Math.imul(w,H)|0,n=Math.imul(w,Z),r=r+Math.imul(v,D)|0,f=(f=f+Math.imul(v,J)|0)+Math.imul(g,D)|0,n=n+Math.imul(g,J)|0,r=r+Math.imul(l,V)|0,f=(f=f+Math.imul(l,K)|0)+Math.imul(p,V)|0,n=n+Math.imul(p,K)|0;var ye=(c+(r=r+Math.imul(o,Y)|0)|0)+((8191&(f=(f=f+Math.imul(o,G)|0)+Math.imul(u,Y)|0))<<13)|0;c=((n=n+Math.imul(u,G)|0)+(f>>>13)|0)+(ye>>>26)|0,ye&=67108863,r=Math.imul(_,H),f=(f=Math.imul(_,Z))+Math.imul(A,H)|0,n=Math.imul(A,Z),r=r+Math.imul(M,D)|0,f=(f=f+Math.imul(M,J)|0)+Math.imul(w,D)|0,n=n+Math.imul(w,J)|0,r=r+Math.imul(v,V)|0,f=(f=f+Math.imul(v,K)|0)+Math.imul(g,V)|0,n=n+Math.imul(g,K)|0,r=r+Math.imul(l,Y)|0,f=(f=f+Math.imul(l,G)|0)+Math.imul(p,Y)|0,n=n+Math.imul(p,G)|0;var Me=(c+(r=r+Math.imul(o,$)|0)|0)+((8191&(f=(f=f+Math.imul(o,ee)|0)+Math.imul(u,$)|0))<<13)|0;c=((n=n+Math.imul(u,ee)|0)+(f>>>13)|0)+(Me>>>26)|0,Me&=67108863,r=Math.imul(I,H),f=(f=Math.imul(I,Z))+Math.imul(z,H)|0,n=Math.imul(z,Z),r=r+Math.imul(_,D)|0,f=(f=f+Math.imul(_,J)|0)+Math.imul(A,D)|0,n=n+Math.imul(A,J)|0,r=r+Math.imul(M,V)|0,f=(f=f+Math.imul(M,K)|0)+Math.imul(w,V)|0,n=n+Math.imul(w,K)|0,r=r+Math.imul(v,Y)|0,f=(f=f+Math.imul(v,G)|0)+Math.imul(g,Y)|0,n=n+Math.imul(g,G)|0,r=r+Math.imul(l,$)|0,f=(f=f+Math.imul(l,ee)|0)+Math.imul(p,$)|0,n=n+Math.imul(p,ee)|0;var we=(c+(r=r+Math.imul(o,ie)|0)|0)+((8191&(f=(f=f+Math.imul(o,re)|0)+Math.imul(u,ie)|0))<<13)|0;c=((n=n+Math.imul(u,re)|0)+(f>>>13)|0)+(we>>>26)|0,we&=67108863,r=Math.imul(k,H),f=(f=Math.imul(k,Z))+Math.imul(R,H)|0,n=Math.imul(R,Z),r=r+Math.imul(I,D)|0,f=(f=f+Math.imul(I,J)|0)+Math.imul(z,D)|0,n=n+Math.imul(z,J)|0,r=r+Math.imul(_,V)|0,f=(f=f+Math.imul(_,K)|0)+Math.imul(A,V)|0,n=n+Math.imul(A,K)|0,r=r+Math.imul(M,Y)|0,f=(f=f+Math.imul(M,G)|0)+Math.imul(w,Y)|0,n=n+Math.imul(w,G)|0,r=r+Math.imul(v,$)|0,f=(f=f+Math.imul(v,ee)|0)+Math.imul(g,$)|0,n=n+Math.imul(g,ee)|0,r=r+Math.imul(l,ie)|0,f=(f=f+Math.imul(l,re)|0)+Math.imul(p,ie)|0,n=n+Math.imul(p,re)|0;var Se=(c+(r=r+Math.imul(o,ne)|0)|0)+((8191&(f=(f=f+Math.imul(o,de)|0)+Math.imul(u,ne)|0))<<13)|0;c=((n=n+Math.imul(u,de)|0)+(f>>>13)|0)+(Se>>>26)|0,Se&=67108863,r=Math.imul(P,H),f=(f=Math.imul(P,Z))+Math.imul(L,H)|0,n=Math.imul(L,Z),r=r+Math.imul(k,D)|0,f=(f=f+Math.imul(k,J)|0)+Math.imul(R,D)|0,n=n+Math.imul(R,J)|0,r=r+Math.imul(I,V)|0,f=(f=f+Math.imul(I,K)|0)+Math.imul(z,V)|0,n=n+Math.imul(z,K)|0,r=r+Math.imul(_,Y)|0,f=(f=f+Math.imul(_,G)|0)+Math.imul(A,Y)|0,n=n+Math.imul(A,G)|0,r=r+Math.imul(M,$)|0,f=(f=f+Math.imul(M,ee)|0)+Math.imul(w,$)|0,n=n+Math.imul(w,ee)|0,r=r+Math.imul(v,ie)|0,f=(f=f+Math.imul(v,re)|0)+Math.imul(g,ie)|0,n=n+Math.imul(g,re)|0,r=r+Math.imul(l,ne)|0,f=(f=f+Math.imul(l,de)|0)+Math.imul(p,ne)|0,n=n+Math.imul(p,de)|0;var _e=(c+(r=r+Math.imul(o,se)|0)|0)+((8191&(f=(f=f+Math.imul(o,ce)|0)+Math.imul(u,se)|0))<<13)|0;c=((n=n+Math.imul(u,ce)|0)+(f>>>13)|0)+(_e>>>26)|0,_e&=67108863,r=Math.imul(N,H),f=(f=Math.imul(N,Z))+Math.imul(B,H)|0,n=Math.imul(B,Z),r=r+Math.imul(P,D)|0,f=(f=f+Math.imul(P,J)|0)+Math.imul(L,D)|0,n=n+Math.imul(L,J)|0,r=r+Math.imul(k,V)|0,f=(f=f+Math.imul(k,K)|0)+Math.imul(R,V)|0,n=n+Math.imul(R,K)|0,r=r+Math.imul(I,Y)|0,f=(f=f+Math.imul(I,G)|0)+Math.imul(z,Y)|0,n=n+Math.imul(z,G)|0,r=r+Math.imul(_,$)|0,f=(f=f+Math.imul(_,ee)|0)+Math.imul(A,$)|0,n=n+Math.imul(A,ee)|0,r=r+Math.imul(M,ie)|0,f=(f=f+Math.imul(M,re)|0)+Math.imul(w,ie)|0,n=n+Math.imul(w,re)|0,r=r+Math.imul(v,ne)|0,f=(f=f+Math.imul(v,de)|0)+Math.imul(g,ne)|0,n=n+Math.imul(g,de)|0,r=r+Math.imul(l,se)|0,f=(f=f+Math.imul(l,ce)|0)+Math.imul(p,se)|0,n=n+Math.imul(p,ce)|0;var Ae=(c+(r=r+Math.imul(o,oe)|0)|0)+((8191&(f=(f=f+Math.imul(o,ue)|0)+Math.imul(u,oe)|0))<<13)|0;c=((n=n+Math.imul(u,ue)|0)+(f>>>13)|0)+(Ae>>>26)|0,Ae&=67108863,r=Math.imul(F,H),f=(f=Math.imul(F,Z))+Math.imul(T,H)|0,n=Math.imul(T,Z),r=r+Math.imul(N,D)|0,f=(f=f+Math.imul(N,J)|0)+Math.imul(B,D)|0,n=n+Math.imul(B,J)|0,r=r+Math.imul(P,V)|0,f=(f=f+Math.imul(P,K)|0)+Math.imul(L,V)|0,n=n+Math.imul(L,K)|0,r=r+Math.imul(k,Y)|0,f=(f=f+Math.imul(k,G)|0)+Math.imul(R,Y)|0,n=n+Math.imul(R,G)|0,r=r+Math.imul(I,$)|0,f=(f=f+Math.imul(I,ee)|0)+Math.imul(z,$)|0,n=n+Math.imul(z,ee)|0,r=r+Math.imul(_,ie)|0,f=(f=f+Math.imul(_,re)|0)+Math.imul(A,ie)|0,n=n+Math.imul(A,re)|0,r=r+Math.imul(M,ne)|0,f=(f=f+Math.imul(M,de)|0)+Math.imul(w,ne)|0,n=n+Math.imul(w,de)|0,r=r+Math.imul(v,se)|0,f=(f=f+Math.imul(v,ce)|0)+Math.imul(g,se)|0,n=n+Math.imul(g,ce)|0,r=r+Math.imul(l,oe)|0,f=(f=f+Math.imul(l,ue)|0)+Math.imul(p,oe)|0,n=n+Math.imul(p,ue)|0;var xe=(c+(r=r+Math.imul(o,le)|0)|0)+((8191&(f=(f=f+Math.imul(o,pe)|0)+Math.imul(u,le)|0))<<13)|0;c=((n=n+Math.imul(u,pe)|0)+(f>>>13)|0)+(xe>>>26)|0,xe&=67108863,r=Math.imul(F,D),f=(f=Math.imul(F,J))+Math.imul(T,D)|0,n=Math.imul(T,J),r=r+Math.imul(N,V)|0,f=(f=f+Math.imul(N,K)|0)+Math.imul(B,V)|0,n=n+Math.imul(B,K)|0,r=r+Math.imul(P,Y)|0,f=(f=f+Math.imul(P,G)|0)+Math.imul(L,Y)|0,n=n+Math.imul(L,G)|0,r=r+Math.imul(k,$)|0,f=(f=f+Math.imul(k,ee)|0)+Math.imul(R,$)|0,n=n+Math.imul(R,ee)|0,r=r+Math.imul(I,ie)|0,f=(f=f+Math.imul(I,re)|0)+Math.imul(z,ie)|0,n=n+Math.imul(z,re)|0,r=r+Math.imul(_,ne)|0,f=(f=f+Math.imul(_,de)|0)+Math.imul(A,ne)|0,n=n+Math.imul(A,de)|0,r=r+Math.imul(M,se)|0,f=(f=f+Math.imul(M,ce)|0)+Math.imul(w,se)|0,n=n+Math.imul(w,ce)|0,r=r+Math.imul(v,oe)|0,f=(f=f+Math.imul(v,ue)|0)+Math.imul(g,oe)|0,n=n+Math.imul(g,ue)|0;var Ie=(c+(r=r+Math.imul(l,le)|0)|0)+((8191&(f=(f=f+Math.imul(l,pe)|0)+Math.imul(p,le)|0))<<13)|0;c=((n=n+Math.imul(p,pe)|0)+(f>>>13)|0)+(Ie>>>26)|0,Ie&=67108863,r=Math.imul(F,V),f=(f=Math.imul(F,K))+Math.imul(T,V)|0,n=Math.imul(T,K),r=r+Math.imul(N,Y)|0,f=(f=f+Math.imul(N,G)|0)+Math.imul(B,Y)|0,n=n+Math.imul(B,G)|0,r=r+Math.imul(P,$)|0,f=(f=f+Math.imul(P,ee)|0)+Math.imul(L,$)|0,n=n+Math.imul(L,ee)|0,r=r+Math.imul(k,ie)|0,f=(f=f+Math.imul(k,re)|0)+Math.imul(R,ie)|0,n=n+Math.imul(R,re)|0,r=r+Math.imul(I,ne)|0,f=(f=f+Math.imul(I,de)|0)+Math.imul(z,ne)|0,n=n+Math.imul(z,de)|0,r=r+Math.imul(_,se)|0,f=(f=f+Math.imul(_,ce)|0)+Math.imul(A,se)|0,n=n+Math.imul(A,ce)|0,r=r+Math.imul(M,oe)|0,f=(f=f+Math.imul(M,ue)|0)+Math.imul(w,oe)|0,n=n+Math.imul(w,ue)|0;var ze=(c+(r=r+Math.imul(v,le)|0)|0)+((8191&(f=(f=f+Math.imul(v,pe)|0)+Math.imul(g,le)|0))<<13)|0;c=((n=n+Math.imul(g,pe)|0)+(f>>>13)|0)+(ze>>>26)|0,ze&=67108863,r=Math.imul(F,Y),f=(f=Math.imul(F,G))+Math.imul(T,Y)|0,n=Math.imul(T,G),r=r+Math.imul(N,$)|0,f=(f=f+Math.imul(N,ee)|0)+Math.imul(B,$)|0,n=n+Math.imul(B,ee)|0,r=r+Math.imul(P,ie)|0,f=(f=f+Math.imul(P,re)|0)+Math.imul(L,ie)|0,n=n+Math.imul(L,re)|0,r=r+Math.imul(k,ne)|0,f=(f=f+Math.imul(k,de)|0)+Math.imul(R,ne)|0,n=n+Math.imul(R,de)|0,r=r+Math.imul(I,se)|0,f=(f=f+Math.imul(I,ce)|0)+Math.imul(z,se)|0,n=n+Math.imul(z,ce)|0,r=r+Math.imul(_,oe)|0,f=(f=f+Math.imul(_,ue)|0)+Math.imul(A,oe)|0,n=n+Math.imul(A,ue)|0;var qe=(c+(r=r+Math.imul(M,le)|0)|0)+((8191&(f=(f=f+Math.imul(M,pe)|0)+Math.imul(w,le)|0))<<13)|0;c=((n=n+Math.imul(w,pe)|0)+(f>>>13)|0)+(qe>>>26)|0,qe&=67108863,r=Math.imul(F,$),f=(f=Math.imul(F,ee))+Math.imul(T,$)|0,n=Math.imul(T,ee),r=r+Math.imul(N,ie)|0,f=(f=f+Math.imul(N,re)|0)+Math.imul(B,ie)|0,n=n+Math.imul(B,re)|0,r=r+Math.imul(P,ne)|0,f=(f=f+Math.imul(P,de)|0)+Math.imul(L,ne)|0,n=n+Math.imul(L,de)|0,r=r+Math.imul(k,se)|0,f=(f=f+Math.imul(k,ce)|0)+Math.imul(R,se)|0,n=n+Math.imul(R,ce)|0,r=r+Math.imul(I,oe)|0,f=(f=f+Math.imul(I,ue)|0)+Math.imul(z,oe)|0,n=n+Math.imul(z,ue)|0;var ke=(c+(r=r+Math.imul(_,le)|0)|0)+((8191&(f=(f=f+Math.imul(_,pe)|0)+Math.imul(A,le)|0))<<13)|0;c=((n=n+Math.imul(A,pe)|0)+(f>>>13)|0)+(ke>>>26)|0,ke&=67108863,r=Math.imul(F,ie),f=(f=Math.imul(F,re))+Math.imul(T,ie)|0,n=Math.imul(T,re),r=r+Math.imul(N,ne)|0,f=(f=f+Math.imul(N,de)|0)+Math.imul(B,ne)|0,n=n+Math.imul(B,de)|0,r=r+Math.imul(P,se)|0,f=(f=f+Math.imul(P,ce)|0)+Math.imul(L,se)|0,n=n+Math.imul(L,ce)|0,r=r+Math.imul(k,oe)|0,f=(f=f+Math.imul(k,ue)|0)+Math.imul(R,oe)|0,n=n+Math.imul(R,ue)|0;var Re=(c+(r=r+Math.imul(I,le)|0)|0)+((8191&(f=(f=f+Math.imul(I,pe)|0)+Math.imul(z,le)|0))<<13)|0;c=((n=n+Math.imul(z,pe)|0)+(f>>>13)|0)+(Re>>>26)|0,Re&=67108863,r=Math.imul(F,ne),f=(f=Math.imul(F,de))+Math.imul(T,ne)|0,n=Math.imul(T,de),r=r+Math.imul(N,se)|0,f=(f=f+Math.imul(N,ce)|0)+Math.imul(B,se)|0,n=n+Math.imul(B,ce)|0,r=r+Math.imul(P,oe)|0,f=(f=f+Math.imul(P,ue)|0)+Math.imul(L,oe)|0,n=n+Math.imul(L,ue)|0;var je=(c+(r=r+Math.imul(k,le)|0)|0)+((8191&(f=(f=f+Math.imul(k,pe)|0)+Math.imul(R,le)|0))<<13)|0;c=((n=n+Math.imul(R,pe)|0)+(f>>>13)|0)+(je>>>26)|0,je&=67108863,r=Math.imul(F,se),f=(f=Math.imul(F,ce))+Math.imul(T,se)|0,n=Math.imul(T,ce),r=r+Math.imul(N,oe)|0,f=(f=f+Math.imul(N,ue)|0)+Math.imul(B,oe)|0,n=n+Math.imul(B,ue)|0;var Pe=(c+(r=r+Math.imul(P,le)|0)|0)+((8191&(f=(f=f+Math.imul(P,pe)|0)+Math.imul(L,le)|0))<<13)|0;c=((n=n+Math.imul(L,pe)|0)+(f>>>13)|0)+(Pe>>>26)|0,Pe&=67108863,r=Math.imul(F,oe),f=(f=Math.imul(F,ue))+Math.imul(T,oe)|0,n=Math.imul(T,ue);var Le=(c+(r=r+Math.imul(N,le)|0)|0)+((8191&(f=(f=f+Math.imul(N,pe)|0)+Math.imul(B,le)|0))<<13)|0;c=((n=n+Math.imul(B,pe)|0)+(f>>>13)|0)+(Le>>>26)|0,Le&=67108863;var Ee=(c+(r=Math.imul(F,le))|0)+((8191&(f=(f=Math.imul(F,pe))+Math.imul(T,le)|0))<<13)|0;return c=((n=Math.imul(T,pe))+(f>>>13)|0)+(Ee>>>26)|0,Ee&=67108863,s[0]=me,s[1]=ve,s[2]=ge,s[3]=ye,s[4]=Me,s[5]=we,s[6]=Se,s[7]=_e,s[8]=Ae,s[9]=xe,s[10]=Ie,s[11]=ze,s[12]=qe,s[13]=ke,s[14]=Re,s[15]=je,s[16]=Pe,s[17]=Le,s[18]=Ee,0!==c&&(s[19]=c,i.length++),i};Math.imul||(A=c),n.prototype.mulTo=function(e,t){var i=this.length+e.length;return 10===this.length&&10===e.length?A(this,e,t):i<63?c(this,e,t):i<1024?h(this,e,t):o(this,e,t)},u.prototype.makeRBT=function(e){for(var t=new Array(e),i=n.prototype._countBits(e)-1,r=0;r<e;r++)t[r]=this.revBin(r,i,e);return t},u.prototype.revBin=function(e,t,i){if(0===e||e===i-1)return e;for(var r=0,f=0;f<t;f++)r|=(1&e)<<t-f-1,e>>=1;return r},u.prototype.permute=function(e,t,i,r,f,n){for(var d=0;d<n;d++)r[d]=t[e[d]],f[d]=i[e[d]]},u.prototype.transform=function(e,t,i,r,f,n){this.permute(n,e,t,i,r,f);for(var d=1;d<f;d<<=1)for(var a=d<<1,s=Math.cos(2*Math.PI/a),c=Math.sin(2*Math.PI/a),h=0;h<f;h+=a)for(var o=s,u=c,b=0;b<d;b++){var l=i[h+b],p=r[h+b],m=i[h+b+d],v=r[h+b+d],g=o*m-u*v;v=o*v+u*m,m=g,i[h+b]=l+m,r[h+b]=p+v,i[h+b+d]=l-m,r[h+b+d]=p-v,b!==a&&(g=s*o-c*u,u=s*u+c*o,o=g)}},u.prototype.guessLen13b=function(e,t){var i=1|Math.max(t,e),r=1&i,f=0;for(i=i/2|0;i;i>>>=1)f++;return 1<<f+1+r},u.prototype.conjugate=function(e,t,i){if(!(i<=1))for(var r=0;r<i/2;r++){var f=e[r];e[r]=e[i-r-1],e[i-r-1]=f,f=t[r],t[r]=-t[i-r-1],t[i-r-1]=-f}},u.prototype.normalize13b=function(e,t){for(var i=0,r=0;r<t/2;r++){var f=8192*Math.round(e[2*r+1]/t)+Math.round(e[2*r]/t)+i;e[r]=67108863&f,i=f<67108864?0:f/67108864|0}return e},u.prototype.convert13b=function(e,t,i,f){for(var n=0,d=0;d<t;d++)n+=0|e[d],i[2*d]=8191&n,n>>>=13,i[2*d+1]=8191&n,n>>>=13;for(d=2*t;d<f;++d)i[d]=0;r(0===n),r(0==(-8192&n))},u.prototype.stub=function(e){for(var t=new Array(e),i=0;i<e;i++)t[i]=0;return t},u.prototype.mulp=function(e,t,i){var r=2*this.guessLen13b(e.length,t.length),f=this.makeRBT(r),n=this.stub(r),d=new Array(r),a=new Array(r),s=new Array(r),c=new Array(r),h=new Array(r),o=new Array(r),u=i.words;u.length=r,this.convert13b(e.words,e.length,d,r),this.convert13b(t.words,t.length,c,r),this.transform(d,n,a,s,r,f),this.transform(c,n,h,o,r,f);for(var b=0;b<r;b++){var l=a[b]*h[b]-s[b]*o[b];s[b]=a[b]*o[b]+s[b]*h[b],a[b]=l}return this.conjugate(a,s,r),this.transform(a,s,u,n,r,f),this.conjugate(u,n,r),this.normalize13b(u,r),i.negative=e.negative^t.negative,i.length=e.length+t.length,i.strip()},n.prototype.mul=function(e){var t=new n(null);return t.words=new Array(this.length+e.length),this.mulTo(e,t)},n.prototype.mulf=function(e){var t=new n(null);return t.words=new Array(this.length+e.length),o(this,e,t)},n.prototype.imul=function(e){return this.clone().mulTo(e,this)},n.prototype.imuln=function(e){r("number"==typeof e),r(e<67108864);for(var t=0,i=0;i<this.length;i++){var f=(0|this.words[i])*e,n=(67108863&f)+(67108863&t);t>>=26,t+=f/67108864|0,t+=n>>>26,this.words[i]=67108863&n}return 0!==t&&(this.words[i]=t,this.length++),this},n.prototype.muln=function(e){return this.clone().imuln(e)},n.prototype.sqr=function(){return this.mul(this)},n.prototype.isqr=function(){return this.imul(this.clone())},n.prototype.pow=function(e){var t=s(e);if(0===t.length)return new n(1);for(var i=this,r=0;r<t.length&&0===t[r];r++,i=i.sqr());if(++r<t.length)for(var f=i.sqr();r<t.length;r++,f=f.sqr())0!==t[r]&&(i=i.mul(f));return i},n.prototype.iushln=function(e){r("number"==typeof e&&e>=0);var t,i=e%26,f=(e-i)/26,n=67108863>>>26-i<<26-i;if(0!==i){var d=0;for(t=0;t<this.length;t++){var a=this.words[t]&n,s=(0|this.words[t])-a<<i;this.words[t]=s|d,d=a>>>26-i}d&&(this.words[t]=d,this.length++)}if(0!==f){for(t=this.length-1;t>=0;t--)this.words[t+f]=this.words[t];for(t=0;t<f;t++)this.words[t]=0;this.length+=f}return this.strip()},n.prototype.ishln=function(e){return r(0===this.negative),this.iushln(e)},n.prototype.iushrn=function(e,t,i){r("number"==typeof e&&e>=0);var f;f=t?(t-t%26)/26:0;var n=e%26,d=Math.min((e-n)/26,this.length),a=67108863^67108863>>>n<<n,s=i;if(f-=d,f=Math.max(0,f),s){for(var c=0;c<d;c++)s.words[c]=this.words[c];s.length=d}if(0===d);else if(this.length>d)for(this.length-=d,c=0;c<this.length;c++)this.words[c]=this.words[c+d];else this.words[0]=0,this.length=1;var h=0;for(c=this.length-1;c>=0&&(0!==h||c>=f);c--){var o=0|this.words[c];this.words[c]=h<<26-n|o>>>n,h=o&a}return s&&0!==h&&(s.words[s.length++]=h),0===this.length&&(this.words[0]=0,this.length=1),this.strip()},n.prototype.ishrn=function(e,t,i){return r(0===this.negative),this.iushrn(e,t,i)},n.prototype.shln=function(e){return this.clone().ishln(e)},n.prototype.ushln=function(e){return this.clone().iushln(e)},n.prototype.shrn=function(e){return this.clone().ishrn(e)},n.prototype.ushrn=function(e){return this.clone().iushrn(e)},n.prototype.testn=function(e){r("number"==typeof e&&e>=0);var t=e%26,i=(e-t)/26,f=1<<t;return!(this.length<=i)&&!!(this.words[i]&f)},n.prototype.imaskn=function(e){r("number"==typeof e&&e>=0);var t=e%26,i=(e-t)/26;if(r(0===this.negative,"imaskn works only with positive numbers"),this.length<=i)return this;if(0!==t&&i++,this.length=Math.min(i,this.length),0!==t){var f=67108863^67108863>>>t<<t;this.words[this.length-1]&=f}return this.strip()},n.prototype.maskn=function(e){return this.clone().imaskn(e)},n.prototype.iaddn=function(e){return r("number"==typeof e),r(e<67108864),e<0?this.isubn(-e):0!==this.negative?1===this.length&&(0|this.words[0])<e?(this.words[0]=e-(0|this.words[0]),this.negative=0,this):(this.negative=0,this.isubn(e),this.negative=1,this):this._iaddn(e)},n.prototype._iaddn=function(e){this.words[0]+=e;for(var t=0;t<this.length&&this.words[t]>=67108864;t++)this.words[t]-=67108864,t===this.length-1?this.words[t+1]=1:this.words[t+1]++;return this.length=Math.max(this.length,t+1),this},n.prototype.isubn=function(e){if(r("number"==typeof e),r(e<67108864),e<0)return this.iaddn(-e);if(0!==this.negative)return this.negative=0,this.iaddn(e),this.negative=1,this;if(this.words[0]-=e,1===this.length&&this.words[0]<0)this.words[0]=-this.words[0],this.negative=1;else for(var t=0;t<this.length&&this.words[t]<0;t++)this.words[t]+=67108864,this.words[t+1]-=1;return this.strip()},n.prototype.addn=function(e){return this.clone().iaddn(e)},n.prototype.subn=function(e){return this.clone().isubn(e)},n.prototype.iabs=function(){return this.negative=0,this},n.prototype.abs=function(){return this.clone().iabs()},n.prototype._ishlnsubmul=function(e,t,i){var f,n=e.length+i;this._expand(n);var d,a=0;for(f=0;f<e.length;f++){d=(0|this.words[f+i])+a;var s=(0|e.words[f])*t;a=((d-=67108863&s)>>26)-(s/67108864|0),this.words[f+i]=67108863&d}for(;f<this.length-i;f++)a=(d=(0|this.words[f+i])+a)>>26,this.words[f+i]=67108863&d;if(0===a)return this.strip();for(r(-1===a),a=0,f=0;f<this.length;f++)a=(d=-(0|this.words[f])+a)>>26,this.words[f]=67108863&d;return this.negative=1,this.strip()},n.prototype._wordDiv=function(e,t){var i=this.length-e.length,r=this.clone(),f=e,d=0|f.words[f.length-1];0!==(i=26-this._countBits(d))&&(f=f.ushln(i),r.iushln(i),d=0|f.words[f.length-1]);var a,s=r.length-f.length;if("mod"!==t){(a=new n(null)).length=s+1,a.words=new Array(a.length);for(var c=0;c<a.length;c++)a.words[c]=0}var h=r.clone()._ishlnsubmul(f,1,s);0===h.negative&&(r=h,a&&(a.words[s]=1));for(var o=s-1;o>=0;o--){var u=67108864*(0|r.words[f.length+o])+(0|r.words[f.length+o-1]);for(u=Math.min(u/d|0,67108863),r._ishlnsubmul(f,u,o);0!==r.negative;)u--,r.negative=0,r._ishlnsubmul(f,1,o),r.isZero()||(r.negative^=1);a&&(a.words[o]=u)}return a&&a.strip(),r.strip(),"div"!==t&&0!==i&&r.iushrn(i),{div:a||null,mod:r}},n.prototype.divmod=function(e,t,i){if(r(!e.isZero()),this.isZero())return{div:new n(0),mod:new n(0)};var f,d,a;return 0!==this.negative&&0===e.negative?(a=this.neg().divmod(e,t),"mod"!==t&&(f=a.div.neg()),"div"!==t&&(d=a.mod.neg(),i&&0!==d.negative&&d.iadd(e)),{div:f,mod:d}):0===this.negative&&0!==e.negative?(a=this.divmod(e.neg(),t),"mod"!==t&&(f=a.div.neg()),{div:f,mod:a.mod}):0!=(this.negative&e.negative)?(a=this.neg().divmod(e.neg(),t),"div"!==t&&(d=a.mod.neg(),i&&0!==d.negative&&d.isub(e)),{div:a.div,mod:d}):e.length>this.length||this.cmp(e)<0?{div:new n(0),mod:this}:1===e.length?"div"===t?{div:this.divn(e.words[0]),mod:null}:"mod"===t?{div:null,mod:new n(this.modn(e.words[0]))}:{div:this.divn(e.words[0]),mod:new n(this.modn(e.words[0]))}:this._wordDiv(e,t)},n.prototype.div=function(e){return this.divmod(e,"div",!1).div},n.prototype.mod=function(e){return this.divmod(e,"mod",!1).mod},n.prototype.umod=function(e){return this.divmod(e,"mod",!0).mod},n.prototype.divRound=function(e){var t=this.divmod(e);if(t.mod.isZero())return t.div;var i=0!==t.div.negative?t.mod.isub(e):t.mod,r=e.ushrn(1),f=e.andln(1),n=i.cmp(r);return n<0||1===f&&0===n?t.div:0!==t.div.negative?t.div.isubn(1):t.div.iaddn(1)},n.prototype.modn=function(e){r(e<=67108863);for(var t=(1<<26)%e,i=0,f=this.length-1;f>=0;f--)i=(t*i+(0|this.words[f]))%e;return i},n.prototype.idivn=function(e){r(e<=67108863);for(var t=0,i=this.length-1;i>=0;i--){var f=(0|this.words[i])+67108864*t;this.words[i]=f/e|0,t=f%e}return this.strip()},n.prototype.divn=function(e){return this.clone().idivn(e)},n.prototype.egcd=function(e){r(0===e.negative),r(!e.isZero());var t=this,i=e.clone();t=0!==t.negative?t.umod(e):t.clone();for(var f=new n(1),d=new n(0),a=new n(0),s=new n(1),c=0;t.isEven()&&i.isEven();)t.iushrn(1),i.iushrn(1),++c;for(var h=i.clone(),o=t.clone();!t.isZero();){for(var u=0,b=1;0==(t.words[0]&b)&&u<26;++u,b<<=1);if(u>0)for(t.iushrn(u);u-- >0;)(f.isOdd()||d.isOdd())&&(f.iadd(h),d.isub(o)),f.iushrn(1),d.iushrn(1);for(var l=0,p=1;0==(i.words[0]&p)&&l<26;++l,p<<=1);if(l>0)for(i.iushrn(l);l-- >0;)(a.isOdd()||s.isOdd())&&(a.iadd(h),s.isub(o)),a.iushrn(1),s.iushrn(1);t.cmp(i)>=0?(t.isub(i),f.isub(a),d.isub(s)):(i.isub(t),a.isub(f),s.isub(d))}return{a:a,b:s,gcd:i.iushln(c)}},n.prototype._invmp=function(e){r(0===e.negative),r(!e.isZero());var t=this,i=e.clone();t=0!==t.negative?t.umod(e):t.clone();for(var f=new n(1),d=new n(0),a=i.clone();t.cmpn(1)>0&&i.cmpn(1)>0;){for(var s=0,c=1;0==(t.words[0]&c)&&s<26;++s,c<<=1);if(s>0)for(t.iushrn(s);s-- >0;)f.isOdd()&&f.iadd(a),f.iushrn(1);for(var h=0,o=1;0==(i.words[0]&o)&&h<26;++h,o<<=1);if(h>0)for(i.iushrn(h);h-- >0;)d.isOdd()&&d.iadd(a),d.iushrn(1);t.cmp(i)>=0?(t.isub(i),f.isub(d)):(i.isub(t),d.isub(f))}var u;return(u=0===t.cmpn(1)?f:d).cmpn(0)<0&&u.iadd(e),u},n.prototype.gcd=function(e){if(this.isZero())return e.abs();if(e.isZero())return this.abs();var t=this.clone(),i=e.clone();t.negative=0,i.negative=0;for(var r=0;t.isEven()&&i.isEven();r++)t.iushrn(1),i.iushrn(1);for(;;){for(;t.isEven();)t.iushrn(1);for(;i.isEven();)i.iushrn(1);var f=t.cmp(i);if(f<0){var n=t;t=i,i=n}else if(0===f||0===i.cmpn(1))break;t.isub(i)}return i.iushln(r)},n.prototype.invm=function(e){return this.egcd(e).a.umod(e)},n.prototype.isEven=function(){return 0==(1&this.words[0])},n.prototype.isOdd=function(){return 1==(1&this.words[0])},n.prototype.andln=function(e){return this.words[0]&e},n.prototype.bincn=function(e){r("number"==typeof e);var t=e%26,i=(e-t)/26,f=1<<t;if(this.length<=i)return this._expand(i+1),this.words[i]|=f,this;for(var n=f,d=i;0!==n&&d<this.length;d++){var a=0|this.words[d];n=(a+=n)>>>26,a&=67108863,this.words[d]=a}return 0!==n&&(this.words[d]=n,this.length++),this},n.prototype.isZero=function(){return 1===this.length&&0===this.words[0]},n.prototype.cmpn=function(e){var t=e<0;if(0!==this.negative&&!t)return-1;if(0===this.negative&&t)return 1;this.strip();var i;if(this.length>1)i=1;else{t&&(e=-e),r(e<=67108863,"Number is too big");var f=0|this.words[0];i=f===e?0:f<e?-1:1}return 0!==this.negative?0|-i:i},n.prototype.cmp=function(e){if(0!==this.negative&&0===e.negative)return-1;if(0===this.negative&&0!==e.negative)return 1;var t=this.ucmp(e);return 0!==this.negative?0|-t:t},n.prototype.ucmp=function(e){if(this.length>e.length)return 1;if(this.length<e.length)return-1;for(var t=0,i=this.length-1;i>=0;i--){var r=0|this.words[i],f=0|e.words[i];if(r!==f){r<f?t=-1:r>f&&(t=1);break}}return t},n.prototype.gtn=function(e){return 1===this.cmpn(e)},n.prototype.gt=function(e){return 1===this.cmp(e)},n.prototype.gten=function(e){return this.cmpn(e)>=0},n.prototype.gte=function(e){return this.cmp(e)>=0},n.prototype.ltn=function(e){return-1===this.cmpn(e)},n.prototype.lt=function(e){return-1===this.cmp(e)},n.prototype.lten=function(e){return this.cmpn(e)<=0},n.prototype.lte=function(e){return this.cmp(e)<=0},n.prototype.eqn=function(e){return 0===this.cmpn(e)},n.prototype.eq=function(e){return 0===this.cmp(e)},n.red=function(e){return new g(e)},n.prototype.toRed=function(e){return r(!this.red,"Already a number in reduction context"),r(0===this.negative,"red works only with positives"),e.convertTo(this)._forceRed(e)},n.prototype.fromRed=function(){return r(this.red,"fromRed works only with numbers in reduction context"),this.red.convertFrom(this)},n.prototype._forceRed=function(e){return this.red=e,this},n.prototype.forceRed=function(e){return r(!this.red,"Already a number in reduction context"),this._forceRed(e)},n.prototype.redAdd=function(e){return r(this.red,"redAdd works only with red numbers"),this.red.add(this,e)},n.prototype.redIAdd=function(e){return r(this.red,"redIAdd works only with red numbers"),this.red.iadd(this,e)},n.prototype.redSub=function(e){return r(this.red,"redSub works only with red numbers"),this.red.sub(this,e)},n.prototype.redISub=function(e){return r(this.red,"redISub works only with red numbers"),this.red.isub(this,e)},n.prototype.redShl=function(e){return r(this.red,"redShl works only with red numbers"),this.red.shl(this,e)},n.prototype.redMul=function(e){return r(this.red,"redMul works only with red numbers"),this.red._verify2(this,e),this.red.mul(this,e)},n.prototype.redIMul=function(e){return r(this.red,"redMul works only with red numbers"),this.red._verify2(this,e),this.red.imul(this,e)},n.prototype.redSqr=function(){return r(this.red,"redSqr works only with red numbers"),this.red._verify1(this),this.red.sqr(this)},n.prototype.redISqr=function(){return r(this.red,"redISqr works only with red numbers"),this.red._verify1(this),this.red.isqr(this)},n.prototype.redSqrt=function(){return r(this.red,"redSqrt works only with red numbers"),this.red._verify1(this),this.red.sqrt(this)},n.prototype.redInvm=function(){return r(this.red,"redInvm works only with red numbers"),this.red._verify1(this),this.red.invm(this)},n.prototype.redNeg=function(){return r(this.red,"redNeg works only with red numbers"),this.red._verify1(this),this.red.neg(this)},n.prototype.redPow=function(e){return r(this.red&&!e.red,"redPow(normalNum)"),this.red._verify1(this),this.red.pow(this,e)};var x={k256:null,p224:null,p192:null,p25519:null};b.prototype._tmp=function(){var e=new n(null);return e.words=new Array(Math.ceil(this.n/13)),e},b.prototype.ireduce=function(e){var t,i=e;do{this.split(i,this.tmp),t=(i=(i=this.imulK(i)).iadd(this.tmp)).bitLength()}while(t>this.n);var r=t<this.n?-1:i.ucmp(this.p);return 0===r?(i.words[0]=0,i.length=1):r>0?i.isub(this.p):i.strip(),i},b.prototype.split=function(e,t){e.iushrn(this.n,0,t)},b.prototype.imulK=function(e){return e.imul(this.k)},f(l,b),l.prototype.split=function(e,t){for(var i=Math.min(e.length,9),r=0;r<i;r++)t.words[r]=e.words[r];if(t.length=i,e.length<=9)return e.words[0]=0,void(e.length=1);var f=e.words[9];for(t.words[t.length++]=4194303&f,r=10;r<e.length;r++){var n=0|e.words[r];e.words[r-10]=(4194303&n)<<4|f>>>22,f=n}f>>>=22,e.words[r-10]=f,0===f&&e.length>10?e.length-=10:e.length-=9},l.prototype.imulK=function(e){e.words[e.length]=0,e.words[e.length+1]=0,e.length+=2;for(var t=0,i=0;i<e.length;i++){var r=0|e.words[i];t+=977*r,e.words[i]=67108863&t,t=64*r+(t/67108864|0)}return 0===e.words[e.length-1]&&(e.length--,0===e.words[e.length-1]&&e.length--),e},f(p,b),f(m,b),f(v,b),v.prototype.imulK=function(e){for(var t=0,i=0;i<e.length;i++){var r=19*(0|e.words[i])+t,f=67108863&r;r>>>=26,e.words[i]=f,t=r}return 0!==t&&(e.words[e.length++]=t),e},n._prime=function(e){if(x[e])return x[e];var t;if("k256"===e)t=new l;else if("p224"===e)t=new p;else if("p192"===e)t=new m;else{if("p25519"!==e)throw new Error("Unknown prime "+e);t=new v}return x[e]=t,t},g.prototype._verify1=function(e){r(0===e.negative,"red works only with positives"),r(e.red,"red works only with red numbers")},g.prototype._verify2=function(e,t){r(0==(e.negative|t.negative),"red works only with positives"),r(e.red&&e.red===t.red,"red works only with red numbers")},g.prototype.imod=function(e){return this.prime?this.prime.ireduce(e)._forceRed(this):e.umod(this.m)._forceRed(this)},g.prototype.neg=function(e){return e.isZero()?e.clone():this.m.sub(e)._forceRed(this)},g.prototype.add=function(e,t){this._verify2(e,t);var i=e.add(t);return i.cmp(this.m)>=0&&i.isub(this.m),i._forceRed(this)},g.prototype.iadd=function(e,t){this._verify2(e,t);var i=e.iadd(t);return i.cmp(this.m)>=0&&i.isub(this.m),i},g.prototype.sub=function(e,t){this._verify2(e,t);var i=e.sub(t);return i.cmpn(0)<0&&i.iadd(this.m),i._forceRed(this)},g.prototype.isub=function(e,t){this._verify2(e,t);var i=e.isub(t);return i.cmpn(0)<0&&i.iadd(this.m),i},g.prototype.shl=function(e,t){return this._verify1(e),this.imod(e.ushln(t))},g.prototype.imul=function(e,t){return this._verify2(e,t),this.imod(e.imul(t))},g.prototype.mul=function(e,t){return this._verify2(e,t),this.imod(e.mul(t))},g.prototype.isqr=function(e){return this.imul(e,e.clone())},g.prototype.sqr=function(e){return this.mul(e,e)},g.prototype.sqrt=function(e){if(e.isZero())return e.clone();var t=this.m.andln(3);if(r(t%2==1),3===t){var i=this.m.add(new n(1)).iushrn(2);return this.pow(e,i)}for(var f=this.m.subn(1),d=0;!f.isZero()&&0===f.andln(1);)d++,f.iushrn(1);r(!f.isZero());var a=new n(1).toRed(this),s=a.redNeg(),c=this.m.subn(1).iushrn(1),h=this.m.bitLength();for(h=new n(2*h*h).toRed(this);0!==this.pow(h,c).cmp(s);)h.redIAdd(s);for(var o=this.pow(h,f),u=this.pow(e,f.addn(1).iushrn(1)),b=this.pow(e,f),l=d;0!==b.cmp(a);){for(var p=b,m=0;0!==p.cmp(a);m++)p=p.redSqr();r(m<l);var v=this.pow(o,new n(1).iushln(l-m-1));u=u.redMul(v),o=v.redSqr(),b=b.redMul(o),l=m}return u},g.prototype.invm=function(e){var t=e._invmp(this.m);return 0!==t.negative?(t.negative=0,this.imod(t).redNeg()):this.imod(t)},g.prototype.pow=function(e,t){if(t.isZero())return new n(1).toRed(this);if(0===t.cmpn(1))return e.clone();var i=new Array(16);i[0]=new n(1).toRed(this),i[1]=e;for(var r=2;r<i.length;r++)i[r]=this.mul(i[r-1],e);var f=i[0],d=0,a=0,s=t.bitLength()%26;for(0===s&&(s=26),r=t.length-1;r>=0;r--){for(var c=t.words[r],h=s-1;h>=0;h--){var o=c>>h&1;f!==i[0]&&(f=this.sqr(f)),0!==o||0!==d?(d<<=1,d|=o,(4===++a||0===r&&0===h)&&(f=this.mul(f,i[d]),a=0,d=0)):a=0}s=26}return f},g.prototype.convertTo=function(e){var t=e.umod(this.m);return t===e?t.clone():t},g.prototype.convertFrom=function(e){var t=e.clone();return t.red=null,t},n.mont=function(e){return new y(e)},f(y,g),y.prototype.convertTo=function(e){return this.imod(e.ushln(this.shift))},y.prototype.convertFrom=function(e){var t=this.imod(e.mul(this.rinv));return t.red=null,t},y.prototype.imul=function(e,t){if(e.isZero()||t.isZero())return e.words[0]=0,e.length=1,e;var i=e.imul(t),r=i.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),f=i.isub(r).iushrn(this.shift),n=f;return f.cmp(this.m)>=0?n=f.isub(this.m):f.cmpn(0)<0&&(n=f.iadd(this.m)),n._forceRed(this)},y.prototype.mul=function(e,t){if(e.isZero()||t.isZero())return new n(0)._forceRed(this);var i=e.mul(t),r=i.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),f=i.isub(r).iushrn(this.shift),d=f;return f.cmp(this.m)>=0?d=f.isub(this.m):f.cmpn(0)<0&&(d=f.iadd(this.m)),d._forceRed(this)},y.prototype.invm=function(e){return this.imod(e._invmp(this.m).mul(this.r2))._forceRed(this)}}(void 0===t||t,this)},{}],2:[function(e,t,i){function r(e){this.rand=e}var f;if(t.exports=function(e){return f||(f=new r(null)),f.generate(e)},t.exports.Rand=r,r.prototype.generate=function(e){return this._rand(e)},r.prototype._rand=function(e){if(this.rand.getBytes)return this.rand.getBytes(e);for(var t=new Uint8Array(e),i=0;i<t.length;i++)t[i]=this.rand.getByte();return t},"object"==typeof self)self.crypto&&self.crypto.getRandomValues?r.prototype._rand=function(e){var t=new Uint8Array(e);return self.crypto.getRandomValues(t),t}:self.msCrypto&&self.msCrypto.getRandomValues?r.prototype._rand=function(e){var t=new Uint8Array(e);return self.msCrypto.getRandomValues(t),t}:"object"==typeof window&&(r.prototype._rand=function(){throw new Error("Not implemented yet")});else try{var n=e("crypto");if("function"!=typeof n.randomBytes)throw new Error("Not supported");r.prototype._rand=function(e){return n.randomBytes(e)}}catch(e){}},{crypto:3}],3:[function(e,t,i){},{}],4:[function(e,t,i){"use strict";function r(e,t){this.type=e,this.p=new n(t.p,16),this.red=t.prime?n.red(t.prime):n.mont(this.p),this.zero=new n(0).toRed(this.red),this.one=new n(1).toRed(this.red),this.two=new n(2).toRed(this.red),this.n=t.n&&new n(t.n,16),this.g=t.g&&this.pointFromJSON(t.g,t.gRed),this._wnafT1=new Array(4),this._wnafT2=new Array(4),this._wnafT3=new Array(4),this._wnafT4=new Array(4);var i=this.n&&this.p.div(this.n);!i||i.cmpn(100)>0?this.redN=null:(this._maxwellTrick=!0,this.redN=this.n.toRed(this.red))}function f(e,t){this.curve=e,this.type=t,this.precomputed=null}var n=e("bn.js"),d=e("../../elliptic").utils,a=d.getNAF,s=d.getJSF,c=d.assert;t.exports=r,r.prototype.point=function(){throw new Error("Not implemented")},r.prototype.validate=function(){throw new Error("Not implemented")},r.prototype._fixedNafMul=function(e,t){c(e.precomputed);var i=e._getDoubles(),r=a(t,1),f=(1<<i.step+1)-(i.step%2==0?2:1);f/=3;for(var n=[],d=0;d<r.length;d+=i.step){for(var s=0,t=d+i.step-1;t>=d;t--)s=(s<<1)+r[t];n.push(s)}for(var h=this.jpoint(null,null,null),o=this.jpoint(null,null,null),u=f;u>0;u--){for(d=0;d<n.length;d++)(s=n[d])===u?o=o.mixedAdd(i.points[d]):s===-u&&(o=o.mixedAdd(i.points[d].neg()));h=h.add(o)}return h.toP()},r.prototype._wnafMul=function(e,t){var i=4,r=e._getNAFPoints(i);i=r.wnd;for(var f=r.points,n=a(t,i),d=this.jpoint(null,null,null),s=n.length-1;s>=0;s--){for(var t=0;s>=0&&0===n[s];s--)t++;if(s>=0&&t++,d=d.dblp(t),s<0)break;var h=n[s];c(0!==h),d="affine"===e.type?h>0?d.mixedAdd(f[h-1>>1]):d.mixedAdd(f[-h-1>>1].neg()):h>0?d.add(f[h-1>>1]):d.add(f[-h-1>>1].neg())}return"affine"===e.type?d.toP():d},r.prototype._wnafMulAdd=function(e,t,i,r,f){for(var n=this._wnafT1,d=this._wnafT2,c=this._wnafT3,h=0,o=0;o<r;o++){var u=(x=t[o])._getNAFPoints(e);n[o]=u.wnd,d[o]=u.points}for(o=r-1;o>=1;o-=2){var b=o-1,l=o;if(1===n[b]&&1===n[l]){var p=[t[b],null,null,t[l]];0===t[b].y.cmp(t[l].y)?(p[1]=t[b].add(t[l]),p[2]=t[b].toJ().mixedAdd(t[l].neg())):0===t[b].y.cmp(t[l].y.redNeg())?(p[1]=t[b].toJ().mixedAdd(t[l]),p[2]=t[b].add(t[l].neg())):(p[1]=t[b].toJ().mixedAdd(t[l]),p[2]=t[b].toJ().mixedAdd(t[l].neg()));var m=[-3,-1,-5,-7,0,7,5,1,3],v=s(i[b],i[l]);h=Math.max(v[0].length,h),c[b]=new Array(h),c[l]=new Array(h);for(A=0;A<h;A++){var g=0|v[0][A],y=0|v[1][A];c[b][A]=m[3*(g+1)+(y+1)],c[l][A]=0,d[b]=p}}else c[b]=a(i[b],n[b]),c[l]=a(i[l],n[l]),h=Math.max(c[b].length,h),h=Math.max(c[l].length,h)}for(var M=this.jpoint(null,null,null),w=this._wnafT4,o=h;o>=0;o--){for(var S=0;o>=0;){for(var _=!0,A=0;A<r;A++)w[A]=0|c[A][o],0!==w[A]&&(_=!1);if(!_)break;S++,o--}if(o>=0&&S++,M=M.dblp(S),o<0)break;for(A=0;A<r;A++){var x,I=w[A];0!==I&&(I>0?x=d[A][I-1>>1]:I<0&&(x=d[A][-I-1>>1].neg()),M="affine"===x.type?M.mixedAdd(x):M.add(x))}}for(o=0;o<r;o++)d[o]=null;return f?M:M.toP()},r.BasePoint=f,f.prototype.eq=function(){throw new Error("Not implemented")},f.prototype.validate=function(){return this.curve.validate(this)},r.prototype.decodePoint=function(e,t){e=d.toArray(e,t);var i=this.p.byteLength();if((4===e[0]||6===e[0]||7===e[0])&&e.length-1==2*i)return 6===e[0]?c(e[e.length-1]%2==0):7===e[0]&&c(e[e.length-1]%2==1),this.point(e.slice(1,1+i),e.slice(1+i,1+2*i));if((2===e[0]||3===e[0])&&e.length-1===i)return this.pointFromX(e.slice(1,1+i),3===e[0]);throw new Error("Unknown point format")},f.prototype.encodeCompressed=function(e){return this.encode(e,!0)},f.prototype._encode=function(e){var t=this.curve.p.byteLength(),i=this.getX().toArray("be",t);return e?[this.getY().isEven()?2:3].concat(i):[4].concat(i,this.getY().toArray("be",t))},f.prototype.encode=function(e,t){return d.encode(this._encode(t),e)},f.prototype.precompute=function(e){if(this.precomputed)return this;var t={doubles:null,naf:null,beta:null};return t.naf=this._getNAFPoints(8),t.doubles=this._getDoubles(4,e),t.beta=this._getBeta(),this.precomputed=t,this},f.prototype._hasDoubles=function(e){if(!this.precomputed)return!1;var t=this.precomputed.doubles;return!!t&&t.points.length>=Math.ceil((e.bitLength()+1)/t.step)},f.prototype._getDoubles=function(e,t){if(this.precomputed&&this.precomputed.doubles)return this.precomputed.doubles;for(var i=[this],r=this,f=0;f<t;f+=e){for(var n=0;n<e;n++)r=r.dbl();i.push(r)}return{step:e,points:i}},f.prototype._getNAFPoints=function(e){if(this.precomputed&&this.precomputed.naf)return this.precomputed.naf;for(var t=[this],i=(1<<e)-1,r=1===i?null:this.dbl(),f=1;f<i;f++)t[f]=t[f-1].add(r);return{wnd:e,points:t}},f.prototype._getBeta=function(){return null},f.prototype.dblp=function(e){for(var t=this,i=0;i<e;i++)t=t.dbl();return t}},{"../../elliptic":"elliptic","bn.js":1}],5:[function(e,t,i){"use strict";function r(e){this.twisted=1!=(0|e.a),this.mOneA=this.twisted&&-1==(0|e.a),this.extended=this.mOneA,c.call(this,"edwards",e),this.a=new a(e.a,16).umod(this.red.m),this.a=this.a.toRed(this.red),this.c=new a(e.c,16).toRed(this.red),this.c2=this.c.redSqr(),this.d=new a(e.d,16).toRed(this.red),this.dd=this.d.redAdd(this.d),h(!this.twisted||0===this.c.fromRed().cmpn(1)),this.oneC=1==(0|e.c)}function f(e,t,i,r,f){c.BasePoint.call(this,e,"projective"),null===t&&null===i&&null===r?(this.x=this.curve.zero,this.y=this.curve.one,this.z=this.curve.one,this.t=this.curve.zero,this.zOne=!0):(this.x=new a(t,16),this.y=new a(i,16),this.z=r?new a(r,16):this.curve.one,this.t=f&&new a(f,16),this.x.red||(this.x=this.x.toRed(this.curve.red)),this.y.red||(this.y=this.y.toRed(this.curve.red)),this.z.red||(this.z=this.z.toRed(this.curve.red)),this.t&&!this.t.red&&(this.t=this.t.toRed(this.curve.red)),this.zOne=this.z===this.curve.one,this.curve.extended&&!this.t&&(this.t=this.x.redMul(this.y),this.zOne||(this.t=this.t.redMul(this.z.redInvm()))))}var n=e("../curve"),d=e("../../elliptic"),a=e("bn.js"),s=e("inherits"),c=n.base,h=d.utils.assert;s(r,c),t.exports=r,r.prototype._mulA=function(e){return this.mOneA?e.redNeg():this.a.redMul(e)},r.prototype._mulC=function(e){return this.oneC?e:this.c.redMul(e)},r.prototype.jpoint=function(e,t,i,r){return this.point(e,t,i,r)},r.prototype.pointFromX=function(e,t){(e=new a(e,16)).red||(e=e.toRed(this.red));var i=e.redSqr(),r=this.c2.redSub(this.a.redMul(i)),f=this.one.redSub(this.c2.redMul(this.d).redMul(i)),n=r.redMul(f.redInvm()),d=n.redSqrt();if(0!==d.redSqr().redSub(n).cmp(this.zero))throw new Error("invalid point");var s=d.fromRed().isOdd();return(t&&!s||!t&&s)&&(d=d.redNeg()),this.point(e,d)},r.prototype.pointFromY=function(e,t){(e=new a(e,16)).red||(e=e.toRed(this.red));var i=e.redSqr(),r=i.redSub(this.one),f=i.redMul(this.d).redAdd(this.one),n=r.redMul(f.redInvm());if(0===n.cmp(this.zero)){if(t)throw new Error("invalid point");return this.point(this.zero,e)}var d=n.redSqrt();if(0!==d.redSqr().redSub(n).cmp(this.zero))throw new Error("invalid point");return d.isOdd()!==t&&(d=d.redNeg()),this.point(d,e)},r.prototype.validate=function(e){if(e.isInfinity())return!0;e.normalize();var t=e.x.redSqr(),i=e.y.redSqr(),r=t.redMul(this.a).redAdd(i),f=this.c2.redMul(this.one.redAdd(this.d.redMul(t).redMul(i)));return 0===r.cmp(f)},s(f,c.BasePoint),r.prototype.pointFromJSON=function(e){return f.fromJSON(this,e)},r.prototype.point=function(e,t,i,r){return new f(this,e,t,i,r)},f.fromJSON=function(e,t){return new f(e,t[0],t[1],t[2])},f.prototype.inspect=function(){return this.isInfinity()?"<EC Point Infinity>":"<EC Point x: "+this.x.fromRed().toString(16,2)+" y: "+this.y.fromRed().toString(16,2)+" z: "+this.z.fromRed().toString(16,2)+">"},f.prototype.isInfinity=function(){return 0===this.x.cmpn(0)&&0===this.y.cmp(this.z)},f.prototype._extDbl=function(){var e=this.x.redSqr(),t=this.y.redSqr(),i=this.z.redSqr();i=i.redIAdd(i);var r=this.curve._mulA(e),f=this.x.redAdd(this.y).redSqr().redISub(e).redISub(t),n=r.redAdd(t),d=n.redSub(i),a=r.redSub(t),s=f.redMul(d),c=n.redMul(a),h=f.redMul(a),o=d.redMul(n);return this.curve.point(s,c,o,h)},f.prototype._projDbl=function(){var e,t,i,r=this.x.redAdd(this.y).redSqr(),f=this.x.redSqr(),n=this.y.redSqr();if(this.curve.twisted){var d=(c=this.curve._mulA(f)).redAdd(n);if(this.zOne)e=r.redSub(f).redSub(n).redMul(d.redSub(this.curve.two)),t=d.redMul(c.redSub(n)),i=d.redSqr().redSub(d).redSub(d);else{var a=this.z.redSqr(),s=d.redSub(a).redISub(a);e=r.redSub(f).redISub(n).redMul(s),t=d.redMul(c.redSub(n)),i=d.redMul(s)}}else{var c=f.redAdd(n),a=this.curve._mulC(this.c.redMul(this.z)).redSqr(),s=c.redSub(a).redSub(a);e=this.curve._mulC(r.redISub(c)).redMul(s),t=this.curve._mulC(c).redMul(f.redISub(n)),i=c.redMul(s)}return this.curve.point(e,t,i)},f.prototype.dbl=function(){return this.isInfinity()?this:this.curve.extended?this._extDbl():this._projDbl()},f.prototype._extAdd=function(e){var t=this.y.redSub(this.x).redMul(e.y.redSub(e.x)),i=this.y.redAdd(this.x).redMul(e.y.redAdd(e.x)),r=this.t.redMul(this.curve.dd).redMul(e.t),f=this.z.redMul(e.z.redAdd(e.z)),n=i.redSub(t),d=f.redSub(r),a=f.redAdd(r),s=i.redAdd(t),c=n.redMul(d),h=a.redMul(s),o=n.redMul(s),u=d.redMul(a);return this.curve.point(c,h,u,o)},f.prototype._projAdd=function(e){var t,i,r=this.z.redMul(e.z),f=r.redSqr(),n=this.x.redMul(e.x),d=this.y.redMul(e.y),a=this.curve.d.redMul(n).redMul(d),s=f.redSub(a),c=f.redAdd(a),h=this.x.redAdd(this.y).redMul(e.x.redAdd(e.y)).redISub(n).redISub(d),o=r.redMul(s).redMul(h);return this.curve.twisted?(t=r.redMul(c).redMul(d.redSub(this.curve._mulA(n))),i=s.redMul(c)):(t=r.redMul(c).redMul(d.redSub(n)),i=this.curve._mulC(s).redMul(c)),this.curve.point(o,t,i)},f.prototype.add=function(e){return this.isInfinity()?e:e.isInfinity()?this:this.curve.extended?this._extAdd(e):this._projAdd(e)},f.prototype.mul=function(e){return this._hasDoubles(e)?this.curve._fixedNafMul(this,e):this.curve._wnafMul(this,e)},f.prototype.mulAdd=function(e,t,i){return this.curve._wnafMulAdd(1,[this,t],[e,i],2,!1)},f.prototype.jmulAdd=function(e,t,i){return this.curve._wnafMulAdd(1,[this,t],[e,i],2,!0)},f.prototype.normalize=function(){if(this.zOne)return this;var e=this.z.redInvm();return this.x=this.x.redMul(e),this.y=this.y.redMul(e),this.t&&(this.t=this.t.redMul(e)),this.z=this.curve.one,this.zOne=!0,this},f.prototype.neg=function(){return this.curve.point(this.x.redNeg(),this.y,this.z,this.t&&this.t.redNeg())},f.prototype.getX=function(){return this.normalize(),this.x.fromRed()},f.prototype.getY=function(){return this.normalize(),this.y.fromRed()},f.prototype.eq=function(e){return this===e||0===this.getX().cmp(e.getX())&&0===this.getY().cmp(e.getY())},f.prototype.eqXToP=function(e){var t=e.toRed(this.curve.red).redMul(this.z);if(0===this.x.cmp(t))return!0;for(var i=e.clone(),r=this.curve.redN.redMul(this.z);;){if(i.iadd(this.curve.n),i.cmp(this.curve.p)>=0)return!1;if(t.redIAdd(r),0===this.x.cmp(t))return!0}return!1},f.prototype.toP=f.prototype.normalize,f.prototype.mixedAdd=f.prototype.add},{"../../elliptic":"elliptic","../curve":6,"bn.js":1,inherits:32}],6:[function(e,t,i){"use strict";var r=i;r.base=e("./base"),r.short=e("./short"),r.mont=e("./mont"),r.edwards=e("./edwards")},{"./base":4,"./edwards":5,"./mont":7,"./short":8}],7:[function(e,t,i){"use strict";function r(e){s.call(this,"mont",e),this.a=new d(e.a,16).toRed(this.red),this.b=new d(e.b,16).toRed(this.red),this.i4=new d(4).toRed(this.red).redInvm(),this.two=new d(2).toRed(this.red),this.a24=this.i4.redMul(this.a.redAdd(this.two))}function f(e,t,i){s.BasePoint.call(this,e,"projective"),null===t&&null===i?(this.x=this.curve.one,this.z=this.curve.zero):(this.x=new d(t,16),this.z=new d(i,16),this.x.red||(this.x=this.x.toRed(this.curve.red)),this.z.red||(this.z=this.z.toRed(this.curve.red)))}var n=e("../curve"),d=e("bn.js"),a=e("inherits"),s=n.base,c=e("../../elliptic").utils;a(r,s),t.exports=r,r.prototype.validate=function(e){var t=e.normalize().x,i=t.redSqr(),r=i.redMul(t).redAdd(i.redMul(this.a)).redAdd(t);return 0===r.redSqrt().redSqr().cmp(r)},a(f,s.BasePoint),r.prototype.decodePoint=function(e,t){return this.point(c.toArray(e,t),1)},r.prototype.point=function(e,t){return new f(this,e,t)},r.prototype.pointFromJSON=function(e){return f.fromJSON(this,e)},f.prototype.precompute=function(){},f.prototype._encode=function(){return this.getX().toArray("be",this.curve.p.byteLength())},f.fromJSON=function(e,t){return new f(e,t[0],t[1]||e.one)},f.prototype.inspect=function(){return this.isInfinity()?"<EC Point Infinity>":"<EC Point x: "+this.x.fromRed().toString(16,2)+" z: "+this.z.fromRed().toString(16,2)+">"},f.prototype.isInfinity=function(){return 0===this.z.cmpn(0)},f.prototype.dbl=function(){var e=this.x.redAdd(this.z).redSqr(),t=this.x.redSub(this.z).redSqr(),i=e.redSub(t),r=e.redMul(t),f=i.redMul(t.redAdd(this.curve.a24.redMul(i)));return this.curve.point(r,f)},f.prototype.add=function(){throw new Error("Not supported on Montgomery curve")},f.prototype.diffAdd=function(e,t){var i=this.x.redAdd(this.z),r=this.x.redSub(this.z),f=e.x.redAdd(e.z),n=e.x.redSub(e.z).redMul(i),d=f.redMul(r),a=t.z.redMul(n.redAdd(d).redSqr()),s=t.x.redMul(n.redISub(d).redSqr());return this.curve.point(a,s)},f.prototype.mul=function(e){for(var t=e.clone(),i=this,r=this.curve.point(null,null),f=this,n=[];0!==t.cmpn(0);t.iushrn(1))n.push(t.andln(1));for(var d=n.length-1;d>=0;d--)0===n[d]?(i=i.diffAdd(r,f),r=r.dbl()):(r=i.diffAdd(r,f),i=i.dbl());return r},f.prototype.mulAdd=function(){throw new Error("Not supported on Montgomery curve")},f.prototype.jumlAdd=function(){throw new Error("Not supported on Montgomery curve")},f.prototype.eq=function(e){return 0===this.getX().cmp(e.getX())},f.prototype.normalize=function(){return this.x=this.x.redMul(this.z.redInvm()),this.z=this.curve.one,this},f.prototype.getX=function(){return this.normalize(),this.x.fromRed()}},{"../../elliptic":"elliptic","../curve":6,"bn.js":1,inherits:32}],8:[function(e,t,i){"use strict";function r(e){h.call(this,"short",e),this.a=new s(e.a,16).toRed(this.red),this.b=new s(e.b,16).toRed(this.red),this.tinv=this.two.redInvm(),this.zeroA=0===this.a.fromRed().cmpn(0),this.threeA=0===this.a.fromRed().sub(this.p).cmpn(-3),this.endo=this._getEndomorphism(e),this._endoWnafT1=new Array(4),this._endoWnafT2=new Array(4)}function f(e,t,i,r){h.BasePoint.call(this,e,"affine"),null===t&&null===i?(this.x=null,this.y=null,this.inf=!0):(this.x=new s(t,16),this.y=new s(i,16),r&&(this.x.forceRed(this.curve.red),this.y.forceRed(this.curve.red)),this.x.red||(this.x=this.x.toRed(this.curve.red)),this.y.red||(this.y=this.y.toRed(this.curve.red)),this.inf=!1)}function n(e,t,i,r){h.BasePoint.call(this,e,"jacobian"),null===t&&null===i&&null===r?(this.x=this.curve.one,this.y=this.curve.one,this.z=new s(0)):(this.x=new s(t,16),this.y=new s(i,16),this.z=new s(r,16)),this.x.red||(this.x=this.x.toRed(this.curve.red)),this.y.red||(this.y=this.y.toRed(this.curve.red)),this.z.red||(this.z=this.z.toRed(this.curve.red)),this.zOne=this.z===this.curve.one}var d=e("../curve"),a=e("../../elliptic"),s=e("bn.js"),c=e("inherits"),h=d.base,o=a.utils.assert;c(r,h),t.exports=r,r.prototype._getEndomorphism=function(e){if(this.zeroA&&this.g&&this.n&&1===this.p.modn(3)){var t,i;if(e.beta)t=new s(e.beta,16).toRed(this.red);else{var r=this._getEndoRoots(this.p);t=(t=r[0].cmp(r[1])<0?r[0]:r[1]).toRed(this.red)}if(e.lambda)i=new s(e.lambda,16);else{var f=this._getEndoRoots(this.n);0===this.g.mul(f[0]).x.cmp(this.g.x.redMul(t))?i=f[0]:(i=f[1],o(0===this.g.mul(i).x.cmp(this.g.x.redMul(t))))}var n;return n=e.basis?e.basis.map(function(e){return{a:new s(e.a,16),b:new s(e.b,16)}}):this._getEndoBasis(i),{beta:t,lambda:i,basis:n}}},r.prototype._getEndoRoots=function(e){var t=e===this.p?this.red:s.mont(e),i=new s(2).toRed(t).redInvm(),r=i.redNeg(),f=new s(3).toRed(t).redNeg().redSqrt().redMul(i);return[r.redAdd(f).fromRed(),r.redSub(f).fromRed()]},r.prototype._getEndoBasis=function(e){for(var t,i,r,f,n,d,a,c,h,o=this.n.ushrn(Math.floor(this.n.bitLength()/2)),u=e,b=this.n.clone(),l=new s(1),p=new s(0),m=new s(0),v=new s(1),g=0;0!==u.cmpn(0);){var y=b.div(u);c=b.sub(y.mul(u)),h=m.sub(y.mul(l));var M=v.sub(y.mul(p));if(!r&&c.cmp(o)<0)t=a.neg(),i=l,r=c.neg(),f=h;else if(r&&2==++g)break;a=c,b=u,u=c,m=l,l=h,v=p,p=M}n=c.neg(),d=h;var w=r.sqr().add(f.sqr());return n.sqr().add(d.sqr()).cmp(w)>=0&&(n=t,d=i),r.negative&&(r=r.neg(),f=f.neg()),n.negative&&(n=n.neg(),d=d.neg()),[{a:r,b:f},{a:n,b:d}]},r.prototype._endoSplit=function(e){var t=this.endo.basis,i=t[0],r=t[1],f=r.b.mul(e).divRound(this.n),n=i.b.neg().mul(e).divRound(this.n),d=f.mul(i.a),a=n.mul(r.a),s=f.mul(i.b),c=n.mul(r.b);return{k1:e.sub(d).sub(a),k2:s.add(c).neg()}},r.prototype.pointFromX=function(e,t){(e=new s(e,16)).red||(e=e.toRed(this.red));var i=e.redSqr().redMul(e).redIAdd(e.redMul(this.a)).redIAdd(this.b),r=i.redSqrt();if(0!==r.redSqr().redSub(i).cmp(this.zero))throw new Error("invalid point");var f=r.fromRed().isOdd();return(t&&!f||!t&&f)&&(r=r.redNeg()),this.point(e,r)},r.prototype.validate=function(e){if(e.inf)return!0;var t=e.x,i=e.y,r=this.a.redMul(t),f=t.redSqr().redMul(t).redIAdd(r).redIAdd(this.b);return 0===i.redSqr().redISub(f).cmpn(0)},r.prototype._endoWnafMulAdd=function(e,t,i){for(var r=this._endoWnafT1,f=this._endoWnafT2,n=0;n<e.length;n++){var d=this._endoSplit(t[n]),a=e[n],s=a._getBeta();d.k1.negative&&(d.k1.ineg(),a=a.neg(!0)),d.k2.negative&&(d.k2.ineg(),s=s.neg(!0)),r[2*n]=a,r[2*n+1]=s,f[2*n]=d.k1,f[2*n+1]=d.k2}for(var c=this._wnafMulAdd(1,r,f,2*n,i),h=0;h<2*n;h++)r[h]=null,f[h]=null;return c},c(f,h.BasePoint),r.prototype.point=function(e,t,i){return new f(this,e,t,i)},r.prototype.pointFromJSON=function(e,t){return f.fromJSON(this,e,t)},f.prototype._getBeta=function(){if(this.curve.endo){var e=this.precomputed;if(e&&e.beta)return e.beta;var t=this.curve.point(this.x.redMul(this.curve.endo.beta),this.y);if(e){var i=this.curve,r=function(e){return i.point(e.x.redMul(i.endo.beta),e.y)};e.beta=t,t.precomputed={beta:null,naf:e.naf&&{wnd:e.naf.wnd,points:e.naf.points.map(r)},doubles:e.doubles&&{step:e.doubles.step,points:e.doubles.points.map(r)}}}return t}},f.prototype.toJSON=function(){return this.precomputed?[this.x,this.y,this.precomputed&&{doubles:this.precomputed.doubles&&{step:this.precomputed.doubles.step,points:this.precomputed.doubles.points.slice(1)},naf:this.precomputed.naf&&{wnd:this.precomputed.naf.wnd,points:this.precomputed.naf.points.slice(1)}}]:[this.x,this.y]},f.fromJSON=function(e,t,i){function r(t){return e.point(t[0],t[1],i)}"string"==typeof t&&(t=JSON.parse(t));var f=e.point(t[0],t[1],i);if(!t[2])return f;var n=t[2];return f.precomputed={beta:null,doubles:n.doubles&&{step:n.doubles.step,points:[f].concat(n.doubles.points.map(r))},naf:n.naf&&{wnd:n.naf.wnd,points:[f].concat(n.naf.points.map(r))}},f},f.prototype.inspect=function(){return this.isInfinity()?"<EC Point Infinity>":"<EC Point x: "+this.x.fromRed().toString(16,2)+" y: "+this.y.fromRed().toString(16,2)+">"},f.prototype.isInfinity=function(){return this.inf},f.prototype.add=function(e){if(this.inf)return e;if(e.inf)return this;if(this.eq(e))return this.dbl();if(this.neg().eq(e))return this.curve.point(null,null);if(0===this.x.cmp(e.x))return this.curve.point(null,null);var t=this.y.redSub(e.y);0!==t.cmpn(0)&&(t=t.redMul(this.x.redSub(e.x).redInvm()));var i=t.redSqr().redISub(this.x).redISub(e.x),r=t.redMul(this.x.redSub(i)).redISub(this.y);return this.curve.point(i,r)},f.prototype.dbl=function(){if(this.inf)return this;var e=this.y.redAdd(this.y);if(0===e.cmpn(0))return this.curve.point(null,null);var t=this.curve.a,i=this.x.redSqr(),r=e.redInvm(),f=i.redAdd(i).redIAdd(i).redIAdd(t).redMul(r),n=f.redSqr().redISub(this.x.redAdd(this.x)),d=f.redMul(this.x.redSub(n)).redISub(this.y);return this.curve.point(n,d)},f.prototype.getX=function(){return this.x.fromRed()},f.prototype.getY=function(){return this.y.fromRed()},f.prototype.mul=function(e){return e=new s(e,16),this._hasDoubles(e)?this.curve._fixedNafMul(this,e):this.curve.endo?this.curve._endoWnafMulAdd([this],[e]):this.curve._wnafMul(this,e)},f.prototype.mulAdd=function(e,t,i){var r=[this,t],f=[e,i];return this.curve.endo?this.curve._endoWnafMulAdd(r,f):this.curve._wnafMulAdd(1,r,f,2)},f.prototype.jmulAdd=function(e,t,i){var r=[this,t],f=[e,i];return this.curve.endo?this.curve._endoWnafMulAdd(r,f,!0):this.curve._wnafMulAdd(1,r,f,2,!0)},f.prototype.eq=function(e){return this===e||this.inf===e.inf&&(this.inf||0===this.x.cmp(e.x)&&0===this.y.cmp(e.y))},f.prototype.neg=function(e){if(this.inf)return this;var t=this.curve.point(this.x,this.y.redNeg());if(e&&this.precomputed){var i=this.precomputed,r=function(e){return e.neg()};t.precomputed={naf:i.naf&&{wnd:i.naf.wnd,points:i.naf.points.map(r)},doubles:i.doubles&&{step:i.doubles.step,points:i.doubles.points.map(r)}}}return t},f.prototype.toJ=function(){return this.inf?this.curve.jpoint(null,null,null):this.curve.jpoint(this.x,this.y,this.curve.one)},c(n,h.BasePoint),r.prototype.jpoint=function(e,t,i){return new n(this,e,t,i)},n.prototype.toP=function(){if(this.isInfinity())return this.curve.point(null,null);var e=this.z.redInvm(),t=e.redSqr(),i=this.x.redMul(t),r=this.y.redMul(t).redMul(e);return this.curve.point(i,r)},n.prototype.neg=function(){return this.curve.jpoint(this.x,this.y.redNeg(),this.z)},n.prototype.add=function(e){if(this.isInfinity())return e;if(e.isInfinity())return this;var t=e.z.redSqr(),i=this.z.redSqr(),r=this.x.redMul(t),f=e.x.redMul(i),n=this.y.redMul(t.redMul(e.z)),d=e.y.redMul(i.redMul(this.z)),a=r.redSub(f),s=n.redSub(d);if(0===a.cmpn(0))return 0!==s.cmpn(0)?this.curve.jpoint(null,null,null):this.dbl();var c=a.redSqr(),h=c.redMul(a),o=r.redMul(c),u=s.redSqr().redIAdd(h).redISub(o).redISub(o),b=s.redMul(o.redISub(u)).redISub(n.redMul(h)),l=this.z.redMul(e.z).redMul(a);return this.curve.jpoint(u,b,l)},n.prototype.mixedAdd=function(e){if(this.isInfinity())return e.toJ();if(e.isInfinity())return this;var t=this.z.redSqr(),i=this.x,r=e.x.redMul(t),f=this.y,n=e.y.redMul(t).redMul(this.z),d=i.redSub(r),a=f.redSub(n);if(0===d.cmpn(0))return 0!==a.cmpn(0)?this.curve.jpoint(null,null,null):this.dbl();var s=d.redSqr(),c=s.redMul(d),h=i.redMul(s),o=a.redSqr().redIAdd(c).redISub(h).redISub(h),u=a.redMul(h.redISub(o)).redISub(f.redMul(c)),b=this.z.redMul(d);return this.curve.jpoint(o,u,b)},n.prototype.dblp=function(e){if(0===e)return this;if(this.isInfinity())return this;if(!e)return this.dbl();if(this.curve.zeroA||this.curve.threeA){for(var t=this,i=0;i<e;i++)t=t.dbl();return t}for(var r=this.curve.a,f=this.curve.tinv,n=this.x,d=this.y,a=this.z,s=a.redSqr().redSqr(),c=d.redAdd(d),i=0;i<e;i++){var h=n.redSqr(),o=c.redSqr(),u=o.redSqr(),b=h.redAdd(h).redIAdd(h).redIAdd(r.redMul(s)),l=n.redMul(o),p=b.redSqr().redISub(l.redAdd(l)),m=l.redISub(p),v=b.redMul(m);v=v.redIAdd(v).redISub(u);var g=c.redMul(a);i+1<e&&(s=s.redMul(u)),n=p,a=g,c=v}return this.curve.jpoint(n,c.redMul(f),a)},n.prototype.dbl=function(){return this.isInfinity()?this:this.curve.zeroA?this._zeroDbl():this.curve.threeA?this._threeDbl():this._dbl()},n.prototype._zeroDbl=function(){var e,t,i;if(this.zOne){var r=this.x.redSqr(),f=this.y.redSqr(),n=f.redSqr(),d=this.x.redAdd(f).redSqr().redISub(r).redISub(n);d=d.redIAdd(d);var a=r.redAdd(r).redIAdd(r),s=a.redSqr().redISub(d).redISub(d),c=n.redIAdd(n);c=(c=c.redIAdd(c)).redIAdd(c),e=s,t=a.redMul(d.redISub(s)).redISub(c),i=this.y.redAdd(this.y)}else{var h=this.x.redSqr(),o=this.y.redSqr(),u=o.redSqr(),b=this.x.redAdd(o).redSqr().redISub(h).redISub(u);b=b.redIAdd(b);var l=h.redAdd(h).redIAdd(h),p=l.redSqr(),m=u.redIAdd(u);m=(m=m.redIAdd(m)).redIAdd(m),e=p.redISub(b).redISub(b),t=l.redMul(b.redISub(e)).redISub(m),i=(i=this.y.redMul(this.z)).redIAdd(i)}return this.curve.jpoint(e,t,i)},n.prototype._threeDbl=function(){var e,t,i;if(this.zOne){var r=this.x.redSqr(),f=this.y.redSqr(),n=f.redSqr(),d=this.x.redAdd(f).redSqr().redISub(r).redISub(n);d=d.redIAdd(d);var a=r.redAdd(r).redIAdd(r).redIAdd(this.curve.a),s=a.redSqr().redISub(d).redISub(d);e=s;var c=n.redIAdd(n);c=(c=c.redIAdd(c)).redIAdd(c),t=a.redMul(d.redISub(s)).redISub(c),i=this.y.redAdd(this.y)}else{var h=this.z.redSqr(),o=this.y.redSqr(),u=this.x.redMul(o),b=this.x.redSub(h).redMul(this.x.redAdd(h));b=b.redAdd(b).redIAdd(b);var l=u.redIAdd(u),p=(l=l.redIAdd(l)).redAdd(l);e=b.redSqr().redISub(p),i=this.y.redAdd(this.z).redSqr().redISub(o).redISub(h);var m=o.redSqr();m=(m=(m=m.redIAdd(m)).redIAdd(m)).redIAdd(m),t=b.redMul(l.redISub(e)).redISub(m)}return this.curve.jpoint(e,t,i)},n.prototype._dbl=function(){var e=this.curve.a,t=this.x,i=this.y,r=this.z,f=r.redSqr().redSqr(),n=t.redSqr(),d=i.redSqr(),a=n.redAdd(n).redIAdd(n).redIAdd(e.redMul(f)),s=t.redAdd(t),c=(s=s.redIAdd(s)).redMul(d),h=a.redSqr().redISub(c.redAdd(c)),o=c.redISub(h),u=d.redSqr();u=(u=(u=u.redIAdd(u)).redIAdd(u)).redIAdd(u);var b=a.redMul(o).redISub(u),l=i.redAdd(i).redMul(r);return this.curve.jpoint(h,b,l)},n.prototype.trpl=function(){if(!this.curve.zeroA)return this.dbl().add(this);var e=this.x.redSqr(),t=this.y.redSqr(),i=this.z.redSqr(),r=t.redSqr(),f=e.redAdd(e).redIAdd(e),n=f.redSqr(),d=this.x.redAdd(t).redSqr().redISub(e).redISub(r),a=(d=(d=(d=d.redIAdd(d)).redAdd(d).redIAdd(d)).redISub(n)).redSqr(),s=r.redIAdd(r);s=(s=(s=s.redIAdd(s)).redIAdd(s)).redIAdd(s);var c=f.redIAdd(d).redSqr().redISub(n).redISub(a).redISub(s),h=t.redMul(c);h=(h=h.redIAdd(h)).redIAdd(h);var o=this.x.redMul(a).redISub(h);o=(o=o.redIAdd(o)).redIAdd(o);var u=this.y.redMul(c.redMul(s.redISub(c)).redISub(d.redMul(a)));u=(u=(u=u.redIAdd(u)).redIAdd(u)).redIAdd(u);var b=this.z.redAdd(d).redSqr().redISub(i).redISub(a);return this.curve.jpoint(o,u,b)},n.prototype.mul=function(e,t){return e=new s(e,t),this.curve._wnafMul(this,e)},n.prototype.eq=function(e){if("affine"===e.type)return this.eq(e.toJ());if(this===e)return!0;var t=this.z.redSqr(),i=e.z.redSqr();if(0!==this.x.redMul(i).redISub(e.x.redMul(t)).cmpn(0))return!1;var r=t.redMul(this.z),f=i.redMul(e.z);return 0===this.y.redMul(f).redISub(e.y.redMul(r)).cmpn(0)},n.prototype.eqXToP=function(e){var t=this.z.redSqr(),i=e.toRed(this.curve.red).redMul(t);if(0===this.x.cmp(i))return!0;for(var r=e.clone(),f=this.curve.redN.redMul(t);;){if(r.iadd(this.curve.n),r.cmp(this.curve.p)>=0)return!1;if(i.redIAdd(f),0===this.x.cmp(i))return!0}return!1},n.prototype.inspect=function(){return this.isInfinity()?"<EC JPoint Infinity>":"<EC JPoint x: "+this.x.toString(16,2)+" y: "+this.y.toString(16,2)+" z: "+this.z.toString(16,2)+">"},n.prototype.isInfinity=function(){return 0===this.z.cmpn(0)}},{"../../elliptic":"elliptic","../curve":6,"bn.js":1,inherits:32}],9:[function(e,t,i){"use strict";function r(e){"short"===e.type?this.curve=new a.curve.short(e):"edwards"===e.type?this.curve=new a.curve.edwards(e):this.curve=new a.curve.mont(e),this.g=this.curve.g,this.n=this.curve.n,this.hash=e.hash,s(this.g.validate(),"Invalid curve"),s(this.g.mul(this.n).isInfinity(),"Invalid curve, G*N != O")}function f(e,t){Object.defineProperty(n,e,{configurable:!0,enumerable:!0,get:function(){var i=new r(t);return Object.defineProperty(n,e,{configurable:!0,enumerable:!0,value:i}),i}})}var n=i,d=e("hash.js"),a=e("../elliptic"),s=a.utils.assert;n.PresetCurve=r,f("p192",{type:"short",prime:"p192",p:"ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff",a:"ffffffff ffffffff ffffffff fffffffe ffffffff fffffffc",b:"64210519 e59c80e7 0fa7e9ab 72243049 feb8deec c146b9b1",n:"ffffffff ffffffff ffffffff 99def836 146bc9b1 b4d22831",hash:d.sha256,gRed:!1,g:["188da80e b03090f6 7cbf20eb 43a18800 f4ff0afd 82ff1012","07192b95 ffc8da78 631011ed 6b24cdd5 73f977a1 1e794811"]}),f("p224",{type:"short",prime:"p224",p:"ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001",a:"ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff fffffffe",b:"b4050a85 0c04b3ab f5413256 5044b0b7 d7bfd8ba 270b3943 2355ffb4",n:"ffffffff ffffffff ffffffff ffff16a2 e0b8f03e 13dd2945 5c5c2a3d",hash:d.sha256,gRed:!1,g:["b70e0cbd 6bb4bf7f 321390b9 4a03c1d3 56c21122 343280d6 115c1d21","bd376388 b5f723fb 4c22dfe6 cd4375a0 5a074764 44d58199 85007e34"]}),f("p256",{type:"short",prime:null,p:"ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff ffffffff",a:"ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff fffffffc",b:"5ac635d8 aa3a93e7 b3ebbd55 769886bc 651d06b0 cc53b0f6 3bce3c3e 27d2604b",n:"ffffffff 00000000 ffffffff ffffffff bce6faad a7179e84 f3b9cac2 fc632551",hash:d.sha256,gRed:!1,g:["6b17d1f2 e12c4247 f8bce6e5 63a440f2 77037d81 2deb33a0 f4a13945 d898c296","4fe342e2 fe1a7f9b 8ee7eb4a 7c0f9e16 2bce3357 6b315ece cbb64068 37bf51f5"]}),f("p384",{type:"short",prime:null,p:"ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 ffffffff",a:"ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 fffffffc",b:"b3312fa7 e23ee7e4 988e056b e3f82d19 181d9c6e fe814112 0314088f 5013875a c656398d 8a2ed19d 2a85c8ed d3ec2aef",n:"ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff c7634d81 f4372ddf 581a0db2 48b0a77a ecec196a ccc52973",hash:d.sha384,gRed:!1,g:["aa87ca22 be8b0537 8eb1c71e f320ad74 6e1d3b62 8ba79b98 59f741e0 82542a38 5502f25d bf55296c 3a545e38 72760ab7","3617de4a 96262c6f 5d9e98bf 9292dc29 f8f41dbd 289a147c e9da3113 b5f0b8c0 0a60b1ce 1d7e819d 7a431d7c 90ea0e5f"]}),f("p521",{type:"short",prime:null,p:"000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff",a:"000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffc",b:"00000051 953eb961 8e1c9a1f 929a21a0 b68540ee a2da725b 99b315f3 b8b48991 8ef109e1 56193951 ec7e937b 1652c0bd 3bb1bf07 3573df88 3d2c34f1 ef451fd4 6b503f00",n:"000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffa 51868783 bf2f966b 7fcc0148 f709a5d0 3bb5c9b8 899c47ae bb6fb71e 91386409",hash:d.sha512,gRed:!1,g:["000000c6 858e06b7 0404e9cd 9e3ecb66 2395b442 9c648139 053fb521 f828af60 6b4d3dba a14b5e77 efe75928 fe1dc127 a2ffa8de 3348b3c1 856a429b f97e7e31 c2e5bd66","00000118 39296a78 9a3bc004 5c8a5fb4 2c7d1bd9 98f54449 579b4468 17afbd17 273e662c 97ee7299 5ef42640 c550b901 3fad0761 353c7086 a272c240 88be9476 9fd16650"]}),f("curve25519",{type:"mont",prime:"p25519",p:"7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",a:"76d06",b:"1",n:"1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",hash:d.sha256,gRed:!1,g:["9"]}),f("ed25519",{type:"edwards",prime:"p25519",p:"7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",a:"-1",c:"1",d:"52036cee2b6ffe73 8cc740797779e898 00700a4d4141d8ab 75eb4dca135978a3",n:"1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",hash:d.sha256,gRed:!1,g:["216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a","6666666666666666666666666666666666666666666666666666666666666658"]});var c;try{c=e("./precomputed/secp256k1")}catch(e){c=void 0}f("secp256k1",{type:"short",prime:"k256",p:"ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f",a:"0",b:"7",n:"ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141",h:"1",hash:d.sha256,beta:"7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee",lambda:"5363ad4cc05c30e0a5261c028812645a122e22ea20816678df02967c1b23bd72",basis:[{a:"3086d221a7d46bcde86c90e49284eb15",b:"-e4437ed6010e88286f547fa90abfe4c3"},{a:"114ca50f7a8e2f3f657c1108d9d44cfd8",b:"3086d221a7d46bcde86c90e49284eb15"}],gRed:!1,g:["79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798","483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8",c]})},{"../elliptic":"elliptic","./precomputed/secp256k1":16,"hash.js":19}],10:[function(e,t,i){"use strict";function r(e){if(!(this instanceof r))return new r(e);"string"==typeof e&&(a(d.curves.hasOwnProperty(e),"Unknown curve "+e),e=d.curves[e]),e instanceof d.curves.PresetCurve&&(e={curve:e}),this.curve=e.curve.curve,this.n=this.curve.n,this.nh=this.n.ushrn(1),this.g=this.curve.g,this.g=e.curve.g,this.g.precompute(e.curve.n.bitLength()+1),this.hash=e.hash||e.curve.hash}var f=e("bn.js"),n=e("hmac-drbg"),d=e("../../elliptic"),a=d.utils.assert,s=e("./key"),c=e("./signature");t.exports=r,r.prototype.keyPair=function(e){return new s(this,e)},r.prototype.keyFromPrivate=function(e,t){return s.fromPrivate(this,e,t)},r.prototype.keyFromPublic=function(e,t){return s.fromPublic(this,e,t)},r.prototype.genKeyPair=function(e){e||(e={});for(var t=new n({hash:this.hash,pers:e.pers,persEnc:e.persEnc||"utf8",entropy:e.entropy||d.rand(this.hash.hmacStrength),entropyEnc:e.entropy&&e.entropyEnc||"utf8",nonce:this.n.toArray()}),i=this.n.byteLength(),r=this.n.sub(new f(2));;){var a=new f(t.generate(i));if(!(a.cmp(r)>0))return a.iaddn(1),this.keyFromPrivate(a)}},r.prototype._truncateToN=function(e,t){var i=8*e.byteLength()-this.n.bitLength();return i>0&&(e=e.ushrn(i)),!t&&e.cmp(this.n)>=0?e.sub(this.n):e},r.prototype.sign=function(e,t,i,r){"object"==typeof i&&(r=i,i=null),r||(r={}),t=this.keyFromPrivate(t,i),e=this._truncateToN(new f(e,16));for(var d=this.n.byteLength(),a=t.getPrivate().toArray("be",d),s=e.toArray("be",d),h=new n({hash:this.hash,entropy:a,nonce:s,pers:r.pers,persEnc:r.persEnc||"utf8"}),o=this.n.sub(new f(1)),u=0;!0;u++){var b=r.k?r.k(u):new f(h.generate(this.n.byteLength()));if(!((b=this._truncateToN(b,!0)).cmpn(1)<=0||b.cmp(o)>=0)){var l=this.g.mul(b);if(!l.isInfinity()){var p=l.getX(),m=p.umod(this.n);if(0!==m.cmpn(0)){var v=b.invm(this.n).mul(m.mul(t.getPrivate()).iadd(e));if(0!==(v=v.umod(this.n)).cmpn(0)){var g=(l.getY().isOdd()?1:0)|(0!==p.cmp(m)?2:0);return r.canonical&&v.cmp(this.nh)>0&&(v=this.n.sub(v),g^=1),new c({r:m,s:v,recoveryParam:g})}}}}}},r.prototype.verify=function(e,t,i,r){e=this._truncateToN(new f(e,16)),i=this.keyFromPublic(i,r);var n=(t=new c(t,"hex")).r,d=t.s;if(n.cmpn(1)<0||n.cmp(this.n)>=0)return!1;if(d.cmpn(1)<0||d.cmp(this.n)>=0)return!1;var a=d.invm(this.n),s=a.mul(e).umod(this.n),h=a.mul(n).umod(this.n);if(!this.curve._maxwellTrick)return!(o=this.g.mulAdd(s,i.getPublic(),h)).isInfinity()&&0===o.getX().umod(this.n).cmp(n);var o=this.g.jmulAdd(s,i.getPublic(),h);return!o.isInfinity()&&o.eqXToP(n)},r.prototype.recoverPubKey=function(e,t,i,r){a((3&i)===i,"The recovery param is more than two bits"),t=new c(t,r);var n=this.n,d=new f(e),s=t.r,h=t.s,o=1&i,u=i>>1;if(s.cmp(this.curve.p.umod(this.curve.n))>=0&&u)throw new Error("Unable to find sencond key candinate");s=u?this.curve.pointFromX(s.add(this.curve.n),o):this.curve.pointFromX(s,o);var b=t.r.invm(n),l=n.sub(d).mul(b).umod(n),p=h.mul(b).umod(n);return this.g.mulAdd(l,s,p)},r.prototype.getKeyRecoveryParam=function(e,t,i,r){if(null!==(t=new c(t,r)).recoveryParam)return t.recoveryParam;for(var f=0;f<4;f++){var n;try{n=this.recoverPubKey(e,t,f)}catch(e){continue}if(n.eq(i))return f}throw new Error("Unable to find valid recovery factor")}},{"../../elliptic":"elliptic","./key":11,"./signature":12,"bn.js":1,"hmac-drbg":31}],11:[function(e,t,i){"use strict";function r(e,t){this.ec=e,this.priv=null,this.pub=null,t.priv&&this._importPrivate(t.priv,t.privEnc),t.pub&&this._importPublic(t.pub,t.pubEnc)}var f=e("bn.js"),n=e("../../elliptic").utils.assert;t.exports=r,r.fromPublic=function(e,t,i){return t instanceof r?t:new r(e,{pub:t,pubEnc:i})},r.fromPrivate=function(e,t,i){return t instanceof r?t:new r(e,{priv:t,privEnc:i})},r.prototype.validate=function(){var e=this.getPublic();return e.isInfinity()?{result:!1,reason:"Invalid public key"}:e.validate()?e.mul(this.ec.curve.n).isInfinity()?{result:!0,reason:null}:{result:!1,reason:"Public key * N != O"}:{result:!1,reason:"Public key is not a point"}},r.prototype.getPublic=function(e,t){return"string"==typeof e&&(t=e,e=null),this.pub||(this.pub=this.ec.g.mul(this.priv)),t?this.pub.encode(t,e):this.pub},r.prototype.getPrivate=function(e){return"hex"===e?this.priv.toString(16,2):this.priv},r.prototype._importPrivate=function(e,t){this.priv=new f(e,t||16),this.priv=this.priv.umod(this.ec.curve.n)},r.prototype._importPublic=function(e,t){if(e.x||e.y)return"mont"===this.ec.curve.type?n(e.x,"Need x coordinate"):"short"!==this.ec.curve.type&&"edwards"!==this.ec.curve.type||n(e.x&&e.y,"Need both x and y coordinate"),void(this.pub=this.ec.curve.point(e.x,e.y));this.pub=this.ec.curve.decodePoint(e,t)},r.prototype.derive=function(e){return e.mul(this.priv).getX()},r.prototype.sign=function(e,t,i){return this.ec.sign(e,this,t,i)},r.prototype.verify=function(e,t){return this.ec.verify(e,t,this)},r.prototype.inspect=function(){return"<Key priv: "+(this.priv&&this.priv.toString(16,2))+" pub: "+(this.pub&&this.pub.inspect())+" >"}},{"../../elliptic":"elliptic","bn.js":1}],12:[function(e,t,i){"use strict";function r(e,t){if(e instanceof r)return e;this._importDER(e,t)||(h(e.r&&e.s,"Signature without r or s"),this.r=new s(e.r,16),this.s=new s(e.s,16),void 0===e.recoveryParam?this.recoveryParam=null:this.recoveryParam=e.recoveryParam)}function f(){this.place=0}function n(e,t){var i=e[t.place++];if(!(128&i))return i;for(var r=15&i,f=0,n=0,d=t.place;n<r;n++,d++)f<<=8,f|=e[d];return t.place=d,f}function d(e){for(var t=0,i=e.length-1;!e[t]&&!(128&e[t+1])&&t<i;)t++;return 0===t?e:e.slice(t)}function a(e,t){if(t<128)e.push(t);else{var i=1+(Math.log(t)/Math.LN2>>>3);for(e.push(128|i);--i;)e.push(t>>>(i<<3)&255);e.push(t)}}var s=e("bn.js"),c=e("../../elliptic").utils,h=c.assert;t.exports=r,r.prototype._importDER=function(e,t){e=c.toArray(e,t);var i=new f;if(48!==e[i.place++])return!1;if(n(e,i)+i.place!==e.length)return!1;if(2!==e[i.place++])return!1;var r=n(e,i),d=e.slice(i.place,r+i.place);if(i.place+=r,2!==e[i.place++])return!1;var a=n(e,i);if(e.length!==a+i.place)return!1;var h=e.slice(i.place,a+i.place);return 0===d[0]&&128&d[1]&&(d=d.slice(1)),0===h[0]&&128&h[1]&&(h=h.slice(1)),this.r=new s(d),this.s=new s(h),this.recoveryParam=null,!0},r.prototype.toDER=function(e){var t=this.r.toArray(),i=this.s.toArray();for(128&t[0]&&(t=[0].concat(t)),128&i[0]&&(i=[0].concat(i)),t=d(t),i=d(i);!(i[0]||128&i[1]);)i=i.slice(1);var r=[2];a(r,t.length),(r=r.concat(t)).push(2),a(r,i.length);var f=r.concat(i),n=[48];return a(n,f.length),n=n.concat(f),c.encode(n,e)}},{"../../elliptic":"elliptic","bn.js":1}],13:[function(e,t,i){"use strict";function r(e){if(a("ed25519"===e,"only tested with ed25519 so far"),!(this instanceof r))return new r(e);var e=n.curves[e].curve;this.curve=e,this.g=e.g,this.g.precompute(e.n.bitLength()+1),this.pointClass=e.point().constructor,this.encodingLength=Math.ceil(e.n.bitLength()/8),this.hash=f.sha512}var f=e("hash.js"),n=e("../../elliptic"),d=n.utils,a=d.assert,s=d.parseBytes,c=e("./key"),h=e("./signature");t.exports=r,r.prototype.sign=function(e,t){e=s(e);var i=this.keyFromSecret(t),r=this.hashInt(i.messagePrefix(),e),f=this.g.mul(r),n=this.encodePoint(f),d=this.hashInt(n,i.pubBytes(),e).mul(i.priv()),a=r.add(d).umod(this.curve.n);return this.makeSignature({R:f,S:a,Rencoded:n})},r.prototype.verify=function(e,t,i){e=s(e),t=this.makeSignature(t);var r=this.keyFromPublic(i),f=this.hashInt(t.Rencoded(),r.pubBytes(),e),n=this.g.mul(t.S());return t.R().add(r.pub().mul(f)).eq(n)},r.prototype.hashInt=function(){for(var e=this.hash(),t=0;t<arguments.length;t++)e.update(arguments[t]);return d.intFromLE(e.digest()).umod(this.curve.n)},r.prototype.keyFromPublic=function(e){return c.fromPublic(this,e)},r.prototype.keyFromSecret=function(e){return c.fromSecret(this,e)},r.prototype.makeSignature=function(e){return e instanceof h?e:new h(this,e)},r.prototype.encodePoint=function(e){var t=e.getY().toArray("le",this.encodingLength);return t[this.encodingLength-1]|=e.getX().isOdd()?128:0,t},r.prototype.decodePoint=function(e){var t=(e=d.parseBytes(e)).length-1,i=e.slice(0,t).concat(-129&e[t]),r=0!=(128&e[t]),f=d.intFromLE(i);return this.curve.pointFromY(f,r)},r.prototype.encodeInt=function(e){return e.toArray("le",this.encodingLength)},r.prototype.decodeInt=function(e){return d.intFromLE(e)},r.prototype.isPoint=function(e){return e instanceof this.pointClass}},{"../../elliptic":"elliptic","./key":14,"./signature":15,"hash.js":19}],14:[function(e,t,i){"use strict";function r(e,t){this.eddsa=e,this._secret=d(t.secret),e.isPoint(t.pub)?this._pub=t.pub:this._pubBytes=d(t.pub)}var f=e("../../elliptic").utils,n=f.assert,d=f.parseBytes,a=f.cachedProperty;r.fromPublic=function(e,t){return t instanceof r?t:new r(e,{pub:t})},r.fromSecret=function(e,t){return t instanceof r?t:new r(e,{secret:t})},r.prototype.secret=function(){return this._secret},a(r,"pubBytes",function(){return this.eddsa.encodePoint(this.pub())}),a(r,"pub",function(){return this._pubBytes?this.eddsa.decodePoint(this._pubBytes):this.eddsa.g.mul(this.priv())}),a(r,"privBytes",function(){var e=this.eddsa,t=this.hash(),i=e.encodingLength-1,r=t.slice(0,e.encodingLength);return r[0]&=248,r[i]&=127,r[i]|=64,r}),a(r,"priv",function(){return this.eddsa.decodeInt(this.privBytes())}),a(r,"hash",function(){return this.eddsa.hash().update(this.secret()).digest()}),a(r,"messagePrefix",function(){return this.hash().slice(this.eddsa.encodingLength)}),r.prototype.sign=function(e){return n(this._secret,"KeyPair can only verify"),this.eddsa.sign(e,this)},r.prototype.verify=function(e,t){return this.eddsa.verify(e,t,this)},r.prototype.getSecret=function(e){return n(this._secret,"KeyPair is public only"),f.encode(this.secret(),e)},r.prototype.getPublic=function(e){return f.encode(this.pubBytes(),e)},t.exports=r},{"../../elliptic":"elliptic"}],15:[function(e,t,i){"use strict";function r(e,t){this.eddsa=e,"object"!=typeof t&&(t=s(t)),Array.isArray(t)&&(t={R:t.slice(0,e.encodingLength),S:t.slice(e.encodingLength)}),d(t.R&&t.S,"Signature without R or S"),e.isPoint(t.R)&&(this._R=t.R),t.S instanceof f&&(this._S=t.S),this._Rencoded=Array.isArray(t.R)?t.R:t.Rencoded,this._Sencoded=Array.isArray(t.S)?t.S:t.Sencoded}var f=e("bn.js"),n=e("../../elliptic").utils,d=n.assert,a=n.cachedProperty,s=n.parseBytes;a(r,"S",function(){return this.eddsa.decodeInt(this.Sencoded())}),a(r,"R",function(){return this.eddsa.decodePoint(this.Rencoded())}),a(r,"Rencoded",function(){return this.eddsa.encodePoint(this.R())}),a(r,"Sencoded",function(){return this.eddsa.encodeInt(this.S())}),r.prototype.toBytes=function(){return this.Rencoded().concat(this.Sencoded())},r.prototype.toHex=function(){return n.encode(this.toBytes(),"hex").toUpperCase()},t.exports=r},{"../../elliptic":"elliptic","bn.js":1}],16:[function(e,t,i){t.exports={doubles:{step:4,points:[["e60fce93b59e9ec53011aabc21c23e97b2a31369b87a5ae9c44ee89e2a6dec0a","f7e3507399e595929db99f34f57937101296891e44d23f0be1f32cce69616821"],["8282263212c609d9ea2a6e3e172de238d8c39cabd5ac1ca10646e23fd5f51508","11f8a8098557dfe45e8256e830b60ace62d613ac2f7b17bed31b6eaff6e26caf"],["175e159f728b865a72f99cc6c6fc846de0b93833fd2222ed73fce5b551e5b739","d3506e0d9e3c79eba4ef97a51ff71f5eacb5955add24345c6efa6ffee9fed695"],["363d90d447b00c9c99ceac05b6262ee053441c7e55552ffe526bad8f83ff4640","4e273adfc732221953b445397f3363145b9a89008199ecb62003c7f3bee9de9"],["8b4b5f165df3c2be8c6244b5b745638843e4a781a15bcd1b69f79a55dffdf80c","4aad0a6f68d308b4b3fbd7813ab0da04f9e336546162ee56b3eff0c65fd4fd36"],["723cbaa6e5db996d6bf771c00bd548c7b700dbffa6c0e77bcb6115925232fcda","96e867b5595cc498a921137488824d6e2660a0653779494801dc069d9eb39f5f"],["eebfa4d493bebf98ba5feec812c2d3b50947961237a919839a533eca0e7dd7fa","5d9a8ca3970ef0f269ee7edaf178089d9ae4cdc3a711f712ddfd4fdae1de8999"],["100f44da696e71672791d0a09b7bde459f1215a29b3c03bfefd7835b39a48db0","cdd9e13192a00b772ec8f3300c090666b7ff4a18ff5195ac0fbd5cd62bc65a09"],["e1031be262c7ed1b1dc9227a4a04c017a77f8d4464f3b3852c8acde6e534fd2d","9d7061928940405e6bb6a4176597535af292dd419e1ced79a44f18f29456a00d"],["feea6cae46d55b530ac2839f143bd7ec5cf8b266a41d6af52d5e688d9094696d","e57c6b6c97dce1bab06e4e12bf3ecd5c981c8957cc41442d3155debf18090088"],["da67a91d91049cdcb367be4be6ffca3cfeed657d808583de33fa978bc1ec6cb1","9bacaa35481642bc41f463f7ec9780e5dec7adc508f740a17e9ea8e27a68be1d"],["53904faa0b334cdda6e000935ef22151ec08d0f7bb11069f57545ccc1a37b7c0","5bc087d0bc80106d88c9eccac20d3c1c13999981e14434699dcb096b022771c8"],["8e7bcd0bd35983a7719cca7764ca906779b53a043a9b8bcaeff959f43ad86047","10b7770b2a3da4b3940310420ca9514579e88e2e47fd68b3ea10047e8460372a"],["385eed34c1cdff21e6d0818689b81bde71a7f4f18397e6690a841e1599c43862","283bebc3e8ea23f56701de19e9ebf4576b304eec2086dc8cc0458fe5542e5453"],["6f9d9b803ecf191637c73a4413dfa180fddf84a5947fbc9c606ed86c3fac3a7","7c80c68e603059ba69b8e2a30e45c4d47ea4dd2f5c281002d86890603a842160"],["3322d401243c4e2582a2147c104d6ecbf774d163db0f5e5313b7e0e742d0e6bd","56e70797e9664ef5bfb019bc4ddaf9b72805f63ea2873af624f3a2e96c28b2a0"],["85672c7d2de0b7da2bd1770d89665868741b3f9af7643397721d74d28134ab83","7c481b9b5b43b2eb6374049bfa62c2e5e77f17fcc5298f44c8e3094f790313a6"],["948bf809b1988a46b06c9f1919413b10f9226c60f668832ffd959af60c82a0a","53a562856dcb6646dc6b74c5d1c3418c6d4dff08c97cd2bed4cb7f88d8c8e589"],["6260ce7f461801c34f067ce0f02873a8f1b0e44dfc69752accecd819f38fd8e8","bc2da82b6fa5b571a7f09049776a1ef7ecd292238051c198c1a84e95b2b4ae17"],["e5037de0afc1d8d43d8348414bbf4103043ec8f575bfdc432953cc8d2037fa2d","4571534baa94d3b5f9f98d09fb990bddbd5f5b03ec481f10e0e5dc841d755bda"],["e06372b0f4a207adf5ea905e8f1771b4e7e8dbd1c6a6c5b725866a0ae4fce725","7a908974bce18cfe12a27bb2ad5a488cd7484a7787104870b27034f94eee31dd"],["213c7a715cd5d45358d0bbf9dc0ce02204b10bdde2a3f58540ad6908d0559754","4b6dad0b5ae462507013ad06245ba190bb4850f5f36a7eeddff2c27534b458f2"],["4e7c272a7af4b34e8dbb9352a5419a87e2838c70adc62cddf0cc3a3b08fbd53c","17749c766c9d0b18e16fd09f6def681b530b9614bff7dd33e0b3941817dcaae6"],["fea74e3dbe778b1b10f238ad61686aa5c76e3db2be43057632427e2840fb27b6","6e0568db9b0b13297cf674deccb6af93126b596b973f7b77701d3db7f23cb96f"],["76e64113f677cf0e10a2570d599968d31544e179b760432952c02a4417bdde39","c90ddf8dee4e95cf577066d70681f0d35e2a33d2b56d2032b4b1752d1901ac01"],["c738c56b03b2abe1e8281baa743f8f9a8f7cc643df26cbee3ab150242bcbb891","893fb578951ad2537f718f2eacbfbbbb82314eef7880cfe917e735d9699a84c3"],["d895626548b65b81e264c7637c972877d1d72e5f3a925014372e9f6588f6c14b","febfaa38f2bc7eae728ec60818c340eb03428d632bb067e179363ed75d7d991f"],["b8da94032a957518eb0f6433571e8761ceffc73693e84edd49150a564f676e03","2804dfa44805a1e4d7c99cc9762808b092cc584d95ff3b511488e4e74efdf6e7"],["e80fea14441fb33a7d8adab9475d7fab2019effb5156a792f1a11778e3c0df5d","eed1de7f638e00771e89768ca3ca94472d155e80af322ea9fcb4291b6ac9ec78"],["a301697bdfcd704313ba48e51d567543f2a182031efd6915ddc07bbcc4e16070","7370f91cfb67e4f5081809fa25d40f9b1735dbf7c0a11a130c0d1a041e177ea1"],["90ad85b389d6b936463f9d0512678de208cc330b11307fffab7ac63e3fb04ed4","e507a3620a38261affdcbd9427222b839aefabe1582894d991d4d48cb6ef150"],["8f68b9d2f63b5f339239c1ad981f162ee88c5678723ea3351b7b444c9ec4c0da","662a9f2dba063986de1d90c2b6be215dbbea2cfe95510bfdf23cbf79501fff82"],["e4f3fb0176af85d65ff99ff9198c36091f48e86503681e3e6686fd5053231e11","1e63633ad0ef4f1c1661a6d0ea02b7286cc7e74ec951d1c9822c38576feb73bc"],["8c00fa9b18ebf331eb961537a45a4266c7034f2f0d4e1d0716fb6eae20eae29e","efa47267fea521a1a9dc343a3736c974c2fadafa81e36c54e7d2a4c66702414b"],["e7a26ce69dd4829f3e10cec0a9e98ed3143d084f308b92c0997fddfc60cb3e41","2a758e300fa7984b471b006a1aafbb18d0a6b2c0420e83e20e8a9421cf2cfd51"],["b6459e0ee3662ec8d23540c223bcbdc571cbcb967d79424f3cf29eb3de6b80ef","67c876d06f3e06de1dadf16e5661db3c4b3ae6d48e35b2ff30bf0b61a71ba45"],["d68a80c8280bb840793234aa118f06231d6f1fc67e73c5a5deda0f5b496943e8","db8ba9fff4b586d00c4b1f9177b0e28b5b0e7b8f7845295a294c84266b133120"],["324aed7df65c804252dc0270907a30b09612aeb973449cea4095980fc28d3d5d","648a365774b61f2ff130c0c35aec1f4f19213b0c7e332843967224af96ab7c84"],["4df9c14919cde61f6d51dfdbe5fee5dceec4143ba8d1ca888e8bd373fd054c96","35ec51092d8728050974c23a1d85d4b5d506cdc288490192ebac06cad10d5d"],["9c3919a84a474870faed8a9c1cc66021523489054d7f0308cbfc99c8ac1f98cd","ddb84f0f4a4ddd57584f044bf260e641905326f76c64c8e6be7e5e03d4fc599d"],["6057170b1dd12fdf8de05f281d8e06bb91e1493a8b91d4cc5a21382120a959e5","9a1af0b26a6a4807add9a2daf71df262465152bc3ee24c65e899be932385a2a8"],["a576df8e23a08411421439a4518da31880cef0fba7d4df12b1a6973eecb94266","40a6bf20e76640b2c92b97afe58cd82c432e10a7f514d9f3ee8be11ae1b28ec8"],["7778a78c28dec3e30a05fe9629de8c38bb30d1f5cf9a3a208f763889be58ad71","34626d9ab5a5b22ff7098e12f2ff580087b38411ff24ac563b513fc1fd9f43ac"],["928955ee637a84463729fd30e7afd2ed5f96274e5ad7e5cb09eda9c06d903ac","c25621003d3f42a827b78a13093a95eeac3d26efa8a8d83fc5180e935bcd091f"],["85d0fef3ec6db109399064f3a0e3b2855645b4a907ad354527aae75163d82751","1f03648413a38c0be29d496e582cf5663e8751e96877331582c237a24eb1f962"],["ff2b0dce97eece97c1c9b6041798b85dfdfb6d8882da20308f5404824526087e","493d13fef524ba188af4c4dc54d07936c7b7ed6fb90e2ceb2c951e01f0c29907"],["827fbbe4b1e880ea9ed2b2e6301b212b57f1ee148cd6dd28780e5e2cf856e241","c60f9c923c727b0b71bef2c67d1d12687ff7a63186903166d605b68baec293ec"],["eaa649f21f51bdbae7be4ae34ce6e5217a58fdce7f47f9aa7f3b58fa2120e2b3","be3279ed5bbbb03ac69a80f89879aa5a01a6b965f13f7e59d47a5305ba5ad93d"],["e4a42d43c5cf169d9391df6decf42ee541b6d8f0c9a137401e23632dda34d24f","4d9f92e716d1c73526fc99ccfb8ad34ce886eedfa8d8e4f13a7f7131deba9414"],["1ec80fef360cbdd954160fadab352b6b92b53576a88fea4947173b9d4300bf19","aeefe93756b5340d2f3a4958a7abbf5e0146e77f6295a07b671cdc1cc107cefd"],["146a778c04670c2f91b00af4680dfa8bce3490717d58ba889ddb5928366642be","b318e0ec3354028add669827f9d4b2870aaa971d2f7e5ed1d0b297483d83efd0"],["fa50c0f61d22e5f07e3acebb1aa07b128d0012209a28b9776d76a8793180eef9","6b84c6922397eba9b72cd2872281a68a5e683293a57a213b38cd8d7d3f4f2811"],["da1d61d0ca721a11b1a5bf6b7d88e8421a288ab5d5bba5220e53d32b5f067ec2","8157f55a7c99306c79c0766161c91e2966a73899d279b48a655fba0f1ad836f1"],["a8e282ff0c9706907215ff98e8fd416615311de0446f1e062a73b0610d064e13","7f97355b8db81c09abfb7f3c5b2515888b679a3e50dd6bd6cef7c73111f4cc0c"],["174a53b9c9a285872d39e56e6913cab15d59b1fa512508c022f382de8319497c","ccc9dc37abfc9c1657b4155f2c47f9e6646b3a1d8cb9854383da13ac079afa73"],["959396981943785c3d3e57edf5018cdbe039e730e4918b3d884fdff09475b7ba","2e7e552888c331dd8ba0386a4b9cd6849c653f64c8709385e9b8abf87524f2fd"],["d2a63a50ae401e56d645a1153b109a8fcca0a43d561fba2dbb51340c9d82b151","e82d86fb6443fcb7565aee58b2948220a70f750af484ca52d4142174dcf89405"],["64587e2335471eb890ee7896d7cfdc866bacbdbd3839317b3436f9b45617e073","d99fcdd5bf6902e2ae96dd6447c299a185b90a39133aeab358299e5e9faf6589"],["8481bde0e4e4d885b3a546d3e549de042f0aa6cea250e7fd358d6c86dd45e458","38ee7b8cba5404dd84a25bf39cecb2ca900a79c42b262e556d64b1b59779057e"],["13464a57a78102aa62b6979ae817f4637ffcfed3c4b1ce30bcd6303f6caf666b","69be159004614580ef7e433453ccb0ca48f300a81d0942e13f495a907f6ecc27"],["bc4a9df5b713fe2e9aef430bcc1dc97a0cd9ccede2f28588cada3a0d2d83f366","d3a81ca6e785c06383937adf4b798caa6e8a9fbfa547b16d758d666581f33c1"],["8c28a97bf8298bc0d23d8c749452a32e694b65e30a9472a3954ab30fe5324caa","40a30463a3305193378fedf31f7cc0eb7ae784f0451cb9459e71dc73cbef9482"],["8ea9666139527a8c1dd94ce4f071fd23c8b350c5a4bb33748c4ba111faccae0","620efabbc8ee2782e24e7c0cfb95c5d735b783be9cf0f8e955af34a30e62b945"],["dd3625faef5ba06074669716bbd3788d89bdde815959968092f76cc4eb9a9787","7a188fa3520e30d461da2501045731ca941461982883395937f68d00c644a573"],["f710d79d9eb962297e4f6232b40e8f7feb2bc63814614d692c12de752408221e","ea98e67232d3b3295d3b535532115ccac8612c721851617526ae47a9c77bfc82"]]},naf:{wnd:7,points:[["f9308a019258c31049344f85f89d5229b531c845836f99b08601f113bce036f9","388f7b0f632de8140fe337e62a37f3566500a99934c2231b6cb9fd7584b8e672"],["2f8bde4d1a07209355b4a7250a5c5128e88b84bddc619ab7cba8d569b240efe4","d8ac222636e5e3d6d4dba9dda6c9c426f788271bab0d6840dca87d3aa6ac62d6"],["5cbdf0646e5db4eaa398f365f2ea7a0e3d419b7e0330e39ce92bddedcac4f9bc","6aebca40ba255960a3178d6d861a54dba813d0b813fde7b5a5082628087264da"],["acd484e2f0c7f65309ad178a9f559abde09796974c57e714c35f110dfc27ccbe","cc338921b0a7d9fd64380971763b61e9add888a4375f8e0f05cc262ac64f9c37"],["774ae7f858a9411e5ef4246b70c65aac5649980be5c17891bbec17895da008cb","d984a032eb6b5e190243dd56d7b7b365372db1e2dff9d6a8301d74c9c953c61b"],["f28773c2d975288bc7d1d205c3748651b075fbc6610e58cddeeddf8f19405aa8","ab0902e8d880a89758212eb65cdaf473a1a06da521fa91f29b5cb52db03ed81"],["d7924d4f7d43ea965a465ae3095ff41131e5946f3c85f79e44adbcf8e27e080e","581e2872a86c72a683842ec228cc6defea40af2bd896d3a5c504dc9ff6a26b58"],["defdea4cdb677750a420fee807eacf21eb9898ae79b9768766e4faa04a2d4a34","4211ab0694635168e997b0ead2a93daeced1f4a04a95c0f6cfb199f69e56eb77"],["2b4ea0a797a443d293ef5cff444f4979f06acfebd7e86d277475656138385b6c","85e89bc037945d93b343083b5a1c86131a01f60c50269763b570c854e5c09b7a"],["352bbf4a4cdd12564f93fa332ce333301d9ad40271f8107181340aef25be59d5","321eb4075348f534d59c18259dda3e1f4a1b3b2e71b1039c67bd3d8bcf81998c"],["2fa2104d6b38d11b0230010559879124e42ab8dfeff5ff29dc9cdadd4ecacc3f","2de1068295dd865b64569335bd5dd80181d70ecfc882648423ba76b532b7d67"],["9248279b09b4d68dab21a9b066edda83263c3d84e09572e269ca0cd7f5453714","73016f7bf234aade5d1aa71bdea2b1ff3fc0de2a887912ffe54a32ce97cb3402"],["daed4f2be3a8bf278e70132fb0beb7522f570e144bf615c07e996d443dee8729","a69dce4a7d6c98e8d4a1aca87ef8d7003f83c230f3afa726ab40e52290be1c55"],["c44d12c7065d812e8acf28d7cbb19f9011ecd9e9fdf281b0e6a3b5e87d22e7db","2119a460ce326cdc76c45926c982fdac0e106e861edf61c5a039063f0e0e6482"],["6a245bf6dc698504c89a20cfded60853152b695336c28063b61c65cbd269e6b4","e022cf42c2bd4a708b3f5126f16a24ad8b33ba48d0423b6efd5e6348100d8a82"],["1697ffa6fd9de627c077e3d2fe541084ce13300b0bec1146f95ae57f0d0bd6a5","b9c398f186806f5d27561506e4557433a2cf15009e498ae7adee9d63d01b2396"],["605bdb019981718b986d0f07e834cb0d9deb8360ffb7f61df982345ef27a7479","2972d2de4f8d20681a78d93ec96fe23c26bfae84fb14db43b01e1e9056b8c49"],["62d14dab4150bf497402fdc45a215e10dcb01c354959b10cfe31c7e9d87ff33d","80fc06bd8cc5b01098088a1950eed0db01aa132967ab472235f5642483b25eaf"],["80c60ad0040f27dade5b4b06c408e56b2c50e9f56b9b8b425e555c2f86308b6f","1c38303f1cc5c30f26e66bad7fe72f70a65eed4cbe7024eb1aa01f56430bd57a"],["7a9375ad6167ad54aa74c6348cc54d344cc5dc9487d847049d5eabb0fa03c8fb","d0e3fa9eca8726909559e0d79269046bdc59ea10c70ce2b02d499ec224dc7f7"],["d528ecd9b696b54c907a9ed045447a79bb408ec39b68df504bb51f459bc3ffc9","eecf41253136e5f99966f21881fd656ebc4345405c520dbc063465b521409933"],["49370a4b5f43412ea25f514e8ecdad05266115e4a7ecb1387231808f8b45963","758f3f41afd6ed428b3081b0512fd62a54c3f3afbb5b6764b653052a12949c9a"],["77f230936ee88cbbd73df930d64702ef881d811e0e1498e2f1c13eb1fc345d74","958ef42a7886b6400a08266e9ba1b37896c95330d97077cbbe8eb3c7671c60d6"],["f2dac991cc4ce4b9ea44887e5c7c0bce58c80074ab9d4dbaeb28531b7739f530","e0dedc9b3b2f8dad4da1f32dec2531df9eb5fbeb0598e4fd1a117dba703a3c37"],["463b3d9f662621fb1b4be8fbbe2520125a216cdfc9dae3debcba4850c690d45b","5ed430d78c296c3543114306dd8622d7c622e27c970a1de31cb377b01af7307e"],["f16f804244e46e2a09232d4aff3b59976b98fac14328a2d1a32496b49998f247","cedabd9b82203f7e13d206fcdf4e33d92a6c53c26e5cce26d6579962c4e31df6"],["caf754272dc84563b0352b7a14311af55d245315ace27c65369e15f7151d41d1","cb474660ef35f5f2a41b643fa5e460575f4fa9b7962232a5c32f908318a04476"],["2600ca4b282cb986f85d0f1709979d8b44a09c07cb86d7c124497bc86f082120","4119b88753c15bd6a693b03fcddbb45d5ac6be74ab5f0ef44b0be9475a7e4b40"],["7635ca72d7e8432c338ec53cd12220bc01c48685e24f7dc8c602a7746998e435","91b649609489d613d1d5e590f78e6d74ecfc061d57048bad9e76f302c5b9c61"],["754e3239f325570cdbbf4a87deee8a66b7f2b33479d468fbc1a50743bf56cc18","673fb86e5bda30fb3cd0ed304ea49a023ee33d0197a695d0c5d98093c536683"],["e3e6bd1071a1e96aff57859c82d570f0330800661d1c952f9fe2694691d9b9e8","59c9e0bba394e76f40c0aa58379a3cb6a5a2283993e90c4167002af4920e37f5"],["186b483d056a033826ae73d88f732985c4ccb1f32ba35f4b4cc47fdcf04aa6eb","3b952d32c67cf77e2e17446e204180ab21fb8090895138b4a4a797f86e80888b"],["df9d70a6b9876ce544c98561f4be4f725442e6d2b737d9c91a8321724ce0963f","55eb2dafd84d6ccd5f862b785dc39d4ab157222720ef9da217b8c45cf2ba2417"],["5edd5cc23c51e87a497ca815d5dce0f8ab52554f849ed8995de64c5f34ce7143","efae9c8dbc14130661e8cec030c89ad0c13c66c0d17a2905cdc706ab7399a868"],["290798c2b6476830da12fe02287e9e777aa3fba1c355b17a722d362f84614fba","e38da76dcd440621988d00bcf79af25d5b29c094db2a23146d003afd41943e7a"],["af3c423a95d9f5b3054754efa150ac39cd29552fe360257362dfdecef4053b45","f98a3fd831eb2b749a93b0e6f35cfb40c8cd5aa667a15581bc2feded498fd9c6"],["766dbb24d134e745cccaa28c99bf274906bb66b26dcf98df8d2fed50d884249a","744b1152eacbe5e38dcc887980da38b897584a65fa06cedd2c924f97cbac5996"],["59dbf46f8c94759ba21277c33784f41645f7b44f6c596a58ce92e666191abe3e","c534ad44175fbc300f4ea6ce648309a042ce739a7919798cd85e216c4a307f6e"],["f13ada95103c4537305e691e74e9a4a8dd647e711a95e73cb62dc6018cfd87b8","e13817b44ee14de663bf4bc808341f326949e21a6a75c2570778419bdaf5733d"],["7754b4fa0e8aced06d4167a2c59cca4cda1869c06ebadfb6488550015a88522c","30e93e864e669d82224b967c3020b8fa8d1e4e350b6cbcc537a48b57841163a2"],["948dcadf5990e048aa3874d46abef9d701858f95de8041d2a6828c99e2262519","e491a42537f6e597d5d28a3224b1bc25df9154efbd2ef1d2cbba2cae5347d57e"],["7962414450c76c1689c7b48f8202ec37fb224cf5ac0bfa1570328a8a3d7c77ab","100b610ec4ffb4760d5c1fc133ef6f6b12507a051f04ac5760afa5b29db83437"],["3514087834964b54b15b160644d915485a16977225b8847bb0dd085137ec47ca","ef0afbb2056205448e1652c48e8127fc6039e77c15c2378b7e7d15a0de293311"],["d3cc30ad6b483e4bc79ce2c9dd8bc54993e947eb8df787b442943d3f7b527eaf","8b378a22d827278d89c5e9be8f9508ae3c2ad46290358630afb34db04eede0a4"],["1624d84780732860ce1c78fcbfefe08b2b29823db913f6493975ba0ff4847610","68651cf9b6da903e0914448c6cd9d4ca896878f5282be4c8cc06e2a404078575"],["733ce80da955a8a26902c95633e62a985192474b5af207da6df7b4fd5fc61cd4","f5435a2bd2badf7d485a4d8b8db9fcce3e1ef8e0201e4578c54673bc1dc5ea1d"],["15d9441254945064cf1a1c33bbd3b49f8966c5092171e699ef258dfab81c045c","d56eb30b69463e7234f5137b73b84177434800bacebfc685fc37bbe9efe4070d"],["a1d0fcf2ec9de675b612136e5ce70d271c21417c9d2b8aaaac138599d0717940","edd77f50bcb5a3cab2e90737309667f2641462a54070f3d519212d39c197a629"],["e22fbe15c0af8ccc5780c0735f84dbe9a790badee8245c06c7ca37331cb36980","a855babad5cd60c88b430a69f53a1a7a38289154964799be43d06d77d31da06"],["311091dd9860e8e20ee13473c1155f5f69635e394704eaa74009452246cfa9b3","66db656f87d1f04fffd1f04788c06830871ec5a64feee685bd80f0b1286d8374"],["34c1fd04d301be89b31c0442d3e6ac24883928b45a9340781867d4232ec2dbdf","9414685e97b1b5954bd46f730174136d57f1ceeb487443dc5321857ba73abee"],["f219ea5d6b54701c1c14de5b557eb42a8d13f3abbcd08affcc2a5e6b049b8d63","4cb95957e83d40b0f73af4544cccf6b1f4b08d3c07b27fb8d8c2962a400766d1"],["d7b8740f74a8fbaab1f683db8f45de26543a5490bca627087236912469a0b448","fa77968128d9c92ee1010f337ad4717eff15db5ed3c049b3411e0315eaa4593b"],["32d31c222f8f6f0ef86f7c98d3a3335ead5bcd32abdd94289fe4d3091aa824bf","5f3032f5892156e39ccd3d7915b9e1da2e6dac9e6f26e961118d14b8462e1661"],["7461f371914ab32671045a155d9831ea8793d77cd59592c4340f86cbc18347b5","8ec0ba238b96bec0cbdddcae0aa442542eee1ff50c986ea6b39847b3cc092ff6"],["ee079adb1df1860074356a25aa38206a6d716b2c3e67453d287698bad7b2b2d6","8dc2412aafe3be5c4c5f37e0ecc5f9f6a446989af04c4e25ebaac479ec1c8c1e"],["16ec93e447ec83f0467b18302ee620f7e65de331874c9dc72bfd8616ba9da6b5","5e4631150e62fb40d0e8c2a7ca5804a39d58186a50e497139626778e25b0674d"],["eaa5f980c245f6f038978290afa70b6bd8855897f98b6aa485b96065d537bd99","f65f5d3e292c2e0819a528391c994624d784869d7e6ea67fb18041024edc07dc"],["78c9407544ac132692ee1910a02439958ae04877151342ea96c4b6b35a49f51","f3e0319169eb9b85d5404795539a5e68fa1fbd583c064d2462b675f194a3ddb4"],["494f4be219a1a77016dcd838431aea0001cdc8ae7a6fc688726578d9702857a5","42242a969283a5f339ba7f075e36ba2af925ce30d767ed6e55f4b031880d562c"],["a598a8030da6d86c6bc7f2f5144ea549d28211ea58faa70ebf4c1e665c1fe9b5","204b5d6f84822c307e4b4a7140737aec23fc63b65b35f86a10026dbd2d864e6b"],["c41916365abb2b5d09192f5f2dbeafec208f020f12570a184dbadc3e58595997","4f14351d0087efa49d245b328984989d5caf9450f34bfc0ed16e96b58fa9913"],["841d6063a586fa475a724604da03bc5b92a2e0d2e0a36acfe4c73a5514742881","73867f59c0659e81904f9a1c7543698e62562d6744c169ce7a36de01a8d6154"],["5e95bb399a6971d376026947f89bde2f282b33810928be4ded112ac4d70e20d5","39f23f366809085beebfc71181313775a99c9aed7d8ba38b161384c746012865"],["36e4641a53948fd476c39f8a99fd974e5ec07564b5315d8bf99471bca0ef2f66","d2424b1b1abe4eb8164227b085c9aa9456ea13493fd563e06fd51cf5694c78fc"],["336581ea7bfbbb290c191a2f507a41cf5643842170e914faeab27c2c579f726","ead12168595fe1be99252129b6e56b3391f7ab1410cd1e0ef3dcdcabd2fda224"],["8ab89816dadfd6b6a1f2634fcf00ec8403781025ed6890c4849742706bd43ede","6fdcef09f2f6d0a044e654aef624136f503d459c3e89845858a47a9129cdd24e"],["1e33f1a746c9c5778133344d9299fcaa20b0938e8acff2544bb40284b8c5fb94","60660257dd11b3aa9c8ed618d24edff2306d320f1d03010e33a7d2057f3b3b6"],["85b7c1dcb3cec1b7ee7f30ded79dd20a0ed1f4cc18cbcfcfa410361fd8f08f31","3d98a9cdd026dd43f39048f25a8847f4fcafad1895d7a633c6fed3c35e999511"],["29df9fbd8d9e46509275f4b125d6d45d7fbe9a3b878a7af872a2800661ac5f51","b4c4fe99c775a606e2d8862179139ffda61dc861c019e55cd2876eb2a27d84b"],["a0b1cae06b0a847a3fea6e671aaf8adfdfe58ca2f768105c8082b2e449fce252","ae434102edde0958ec4b19d917a6a28e6b72da1834aff0e650f049503a296cf2"],["4e8ceafb9b3e9a136dc7ff67e840295b499dfb3b2133e4ba113f2e4c0e121e5","cf2174118c8b6d7a4b48f6d534ce5c79422c086a63460502b827ce62a326683c"],["d24a44e047e19b6f5afb81c7ca2f69080a5076689a010919f42725c2b789a33b","6fb8d5591b466f8fc63db50f1c0f1c69013f996887b8244d2cdec417afea8fa3"],["ea01606a7a6c9cdd249fdfcfacb99584001edd28abbab77b5104e98e8e3b35d4","322af4908c7312b0cfbfe369f7a7b3cdb7d4494bc2823700cfd652188a3ea98d"],["af8addbf2b661c8a6c6328655eb96651252007d8c5ea31be4ad196de8ce2131f","6749e67c029b85f52a034eafd096836b2520818680e26ac8f3dfbcdb71749700"],["e3ae1974566ca06cc516d47e0fb165a674a3dabcfca15e722f0e3450f45889","2aeabe7e4531510116217f07bf4d07300de97e4874f81f533420a72eeb0bd6a4"],["591ee355313d99721cf6993ffed1e3e301993ff3ed258802075ea8ced397e246","b0ea558a113c30bea60fc4775460c7901ff0b053d25ca2bdeee98f1a4be5d196"],["11396d55fda54c49f19aa97318d8da61fa8584e47b084945077cf03255b52984","998c74a8cd45ac01289d5833a7beb4744ff536b01b257be4c5767bea93ea57a4"],["3c5d2a1ba39c5a1790000738c9e0c40b8dcdfd5468754b6405540157e017aa7a","b2284279995a34e2f9d4de7396fc18b80f9b8b9fdd270f6661f79ca4c81bd257"],["cc8704b8a60a0defa3a99a7299f2e9c3fbc395afb04ac078425ef8a1793cc030","bdd46039feed17881d1e0862db347f8cf395b74fc4bcdc4e940b74e3ac1f1b13"],["c533e4f7ea8555aacd9777ac5cad29b97dd4defccc53ee7ea204119b2889b197","6f0a256bc5efdf429a2fb6242f1a43a2d9b925bb4a4b3a26bb8e0f45eb596096"],["c14f8f2ccb27d6f109f6d08d03cc96a69ba8c34eec07bbcf566d48e33da6593","c359d6923bb398f7fd4473e16fe1c28475b740dd098075e6c0e8649113dc3a38"],["a6cbc3046bc6a450bac24789fa17115a4c9739ed75f8f21ce441f72e0b90e6ef","21ae7f4680e889bb130619e2c0f95a360ceb573c70603139862afd617fa9b9f"],["347d6d9a02c48927ebfb86c1359b1caf130a3c0267d11ce6344b39f99d43cc38","60ea7f61a353524d1c987f6ecec92f086d565ab687870cb12689ff1e31c74448"],["da6545d2181db8d983f7dcb375ef5866d47c67b1bf31c8cf855ef7437b72656a","49b96715ab6878a79e78f07ce5680c5d6673051b4935bd897fea824b77dc208a"],["c40747cc9d012cb1a13b8148309c6de7ec25d6945d657146b9d5994b8feb1111","5ca560753be2a12fc6de6caf2cb489565db936156b9514e1bb5e83037e0fa2d4"],["4e42c8ec82c99798ccf3a610be870e78338c7f713348bd34c8203ef4037f3502","7571d74ee5e0fb92a7a8b33a07783341a5492144cc54bcc40a94473693606437"],["3775ab7089bc6af823aba2e1af70b236d251cadb0c86743287522a1b3b0dedea","be52d107bcfa09d8bcb9736a828cfa7fac8db17bf7a76a2c42ad961409018cf7"],["cee31cbf7e34ec379d94fb814d3d775ad954595d1314ba8846959e3e82f74e26","8fd64a14c06b589c26b947ae2bcf6bfa0149ef0be14ed4d80f448a01c43b1c6d"],["b4f9eaea09b6917619f6ea6a4eb5464efddb58fd45b1ebefcdc1a01d08b47986","39e5c9925b5a54b07433a4f18c61726f8bb131c012ca542eb24a8ac07200682a"],["d4263dfc3d2df923a0179a48966d30ce84e2515afc3dccc1b77907792ebcc60e","62dfaf07a0f78feb30e30d6295853ce189e127760ad6cf7fae164e122a208d54"],["48457524820fa65a4f8d35eb6930857c0032acc0a4a2de422233eeda897612c4","25a748ab367979d98733c38a1fa1c2e7dc6cc07db2d60a9ae7a76aaa49bd0f77"],["dfeeef1881101f2cb11644f3a2afdfc2045e19919152923f367a1767c11cceda","ecfb7056cf1de042f9420bab396793c0c390bde74b4bbdff16a83ae09a9a7517"],["6d7ef6b17543f8373c573f44e1f389835d89bcbc6062ced36c82df83b8fae859","cd450ec335438986dfefa10c57fea9bcc521a0959b2d80bbf74b190dca712d10"],["e75605d59102a5a2684500d3b991f2e3f3c88b93225547035af25af66e04541f","f5c54754a8f71ee540b9b48728473e314f729ac5308b06938360990e2bfad125"],["eb98660f4c4dfaa06a2be453d5020bc99a0c2e60abe388457dd43fefb1ed620c","6cb9a8876d9cb8520609af3add26cd20a0a7cd8a9411131ce85f44100099223e"],["13e87b027d8514d35939f2e6892b19922154596941888336dc3563e3b8dba942","fef5a3c68059a6dec5d624114bf1e91aac2b9da568d6abeb2570d55646b8adf1"],["ee163026e9fd6fe017c38f06a5be6fc125424b371ce2708e7bf4491691e5764a","1acb250f255dd61c43d94ccc670d0f58f49ae3fa15b96623e5430da0ad6c62b2"],["b268f5ef9ad51e4d78de3a750c2dc89b1e626d43505867999932e5db33af3d80","5f310d4b3c99b9ebb19f77d41c1dee018cf0d34fd4191614003e945a1216e423"],["ff07f3118a9df035e9fad85eb6c7bfe42b02f01ca99ceea3bf7ffdba93c4750d","438136d603e858a3a5c440c38eccbaddc1d2942114e2eddd4740d098ced1f0d8"],["8d8b9855c7c052a34146fd20ffb658bea4b9f69e0d825ebec16e8c3ce2b526a1","cdb559eedc2d79f926baf44fb84ea4d44bcf50fee51d7ceb30e2e7f463036758"],["52db0b5384dfbf05bfa9d472d7ae26dfe4b851ceca91b1eba54263180da32b63","c3b997d050ee5d423ebaf66a6db9f57b3180c902875679de924b69d84a7b375"],["e62f9490d3d51da6395efd24e80919cc7d0f29c3f3fa48c6fff543becbd43352","6d89ad7ba4876b0b22c2ca280c682862f342c8591f1daf5170e07bfd9ccafa7d"],["7f30ea2476b399b4957509c88f77d0191afa2ff5cb7b14fd6d8e7d65aaab1193","ca5ef7d4b231c94c3b15389a5f6311e9daff7bb67b103e9880ef4bff637acaec"],["5098ff1e1d9f14fb46a210fada6c903fef0fb7b4a1dd1d9ac60a0361800b7a00","9731141d81fc8f8084d37c6e7542006b3ee1b40d60dfe5362a5b132fd17ddc0"],["32b78c7de9ee512a72895be6b9cbefa6e2f3c4ccce445c96b9f2c81e2778ad58","ee1849f513df71e32efc3896ee28260c73bb80547ae2275ba497237794c8753c"],["e2cb74fddc8e9fbcd076eef2a7c72b0ce37d50f08269dfc074b581550547a4f7","d3aa2ed71c9dd2247a62df062736eb0baddea9e36122d2be8641abcb005cc4a4"],["8438447566d4d7bedadc299496ab357426009a35f235cb141be0d99cd10ae3a8","c4e1020916980a4da5d01ac5e6ad330734ef0d7906631c4f2390426b2edd791f"],["4162d488b89402039b584c6fc6c308870587d9c46f660b878ab65c82c711d67e","67163e903236289f776f22c25fb8a3afc1732f2b84b4e95dbda47ae5a0852649"],["3fad3fa84caf0f34f0f89bfd2dcf54fc175d767aec3e50684f3ba4a4bf5f683d","cd1bc7cb6cc407bb2f0ca647c718a730cf71872e7d0d2a53fa20efcdfe61826"],["674f2600a3007a00568c1a7ce05d0816c1fb84bf1370798f1c69532faeb1a86b","299d21f9413f33b3edf43b257004580b70db57da0b182259e09eecc69e0d38a5"],["d32f4da54ade74abb81b815ad1fb3b263d82d6c692714bcff87d29bd5ee9f08f","f9429e738b8e53b968e99016c059707782e14f4535359d582fc416910b3eea87"],["30e4e670435385556e593657135845d36fbb6931f72b08cb1ed954f1e3ce3ff6","462f9bce619898638499350113bbc9b10a878d35da70740dc695a559eb88db7b"],["be2062003c51cc3004682904330e4dee7f3dcd10b01e580bf1971b04d4cad297","62188bc49d61e5428573d48a74e1c655b1c61090905682a0d5558ed72dccb9bc"],["93144423ace3451ed29e0fb9ac2af211cb6e84a601df5993c419859fff5df04a","7c10dfb164c3425f5c71a3f9d7992038f1065224f72bb9d1d902a6d13037b47c"],["b015f8044f5fcbdcf21ca26d6c34fb8197829205c7b7d2a7cb66418c157b112c","ab8c1e086d04e813744a655b2df8d5f83b3cdc6faa3088c1d3aea1454e3a1d5f"],["d5e9e1da649d97d89e4868117a465a3a4f8a18de57a140d36b3f2af341a21b52","4cb04437f391ed73111a13cc1d4dd0db1693465c2240480d8955e8592f27447a"],["d3ae41047dd7ca065dbf8ed77b992439983005cd72e16d6f996a5316d36966bb","bd1aeb21ad22ebb22a10f0303417c6d964f8cdd7df0aca614b10dc14d125ac46"],["463e2763d885f958fc66cdd22800f0a487197d0a82e377b49f80af87c897b065","bfefacdb0e5d0fd7df3a311a94de062b26b80c61fbc97508b79992671ef7ca7f"],["7985fdfd127c0567c6f53ec1bb63ec3158e597c40bfe747c83cddfc910641917","603c12daf3d9862ef2b25fe1de289aed24ed291e0ec6708703a5bd567f32ed03"],["74a1ad6b5f76e39db2dd249410eac7f99e74c59cb83d2d0ed5ff1543da7703e9","cc6157ef18c9c63cd6193d83631bbea0093e0968942e8c33d5737fd790e0db08"],["30682a50703375f602d416664ba19b7fc9bab42c72747463a71d0896b22f6da3","553e04f6b018b4fa6c8f39e7f311d3176290d0e0f19ca73f17714d9977a22ff8"],["9e2158f0d7c0d5f26c3791efefa79597654e7a2b2464f52b1ee6c1347769ef57","712fcdd1b9053f09003a3481fa7762e9ffd7c8ef35a38509e2fbf2629008373"],["176e26989a43c9cfeba4029c202538c28172e566e3c4fce7322857f3be327d66","ed8cc9d04b29eb877d270b4878dc43c19aefd31f4eee09ee7b47834c1fa4b1c3"],["75d46efea3771e6e68abb89a13ad747ecf1892393dfc4f1b7004788c50374da8","9852390a99507679fd0b86fd2b39a868d7efc22151346e1a3ca4726586a6bed8"],["809a20c67d64900ffb698c4c825f6d5f2310fb0451c869345b7319f645605721","9e994980d9917e22b76b061927fa04143d096ccc54963e6a5ebfa5f3f8e286c1"],["1b38903a43f7f114ed4500b4eac7083fdefece1cf29c63528d563446f972c180","4036edc931a60ae889353f77fd53de4a2708b26b6f5da72ad3394119daf408f9"]]}}},{}],17:[function(e,t,i){"use strict";var r=i,f=e("bn.js"),n=e("minimalistic-assert"),d=e("minimalistic-crypto-utils");r.assert=n,r.toArray=d.toArray,r.zero2=d.zero2,r.toHex=d.toHex,r.encode=d.encode,r.getNAF=function(e,t){for(var i=[],r=1<<t+1,f=e.clone();f.cmpn(1)>=0;){var n;if(f.isOdd()){var d=f.andln(r-1);n=d>(r>>1)-1?(r>>1)-d:d,f.isubn(n)}else n=0;i.push(n);for(var a=0!==f.cmpn(0)&&0===f.andln(r-1)?t+1:1,s=1;s<a;s++)i.push(0);f.iushrn(a)}return i},r.getJSF=function(e,t){var i=[[],[]];e=e.clone(),t=t.clone();for(var r=0,f=0;e.cmpn(-r)>0||t.cmpn(-f)>0;){var n=e.andln(3)+r&3,d=t.andln(3)+f&3;3===n&&(n=-1),3===d&&(d=-1);var a;a=0==(1&n)?0:3!=(c=e.andln(7)+r&7)&&5!==c||2!==d?n:-n,i[0].push(a);var s;if(0==(1&d))s=0;else{var c=t.andln(7)+f&7;s=3!==c&&5!==c||2!==n?d:-d}i[1].push(s),2*r===a+1&&(r=1-r),2*f===s+1&&(f=1-f),e.iushrn(1),t.iushrn(1)}return i},r.cachedProperty=function(e,t,i){var r="_"+t;e.prototype[t]=function(){return void 0!==this[r]?this[r]:this[r]=i.call(this)}},r.parseBytes=function(e){return"string"==typeof e?r.toArray(e,"hex"):e},r.intFromLE=function(e){return new f(e,"hex","le")}},{"bn.js":1,"minimalistic-assert":33,"minimalistic-crypto-utils":34}],18:[function(e,t,i){t.exports={_args:[[{raw:"elliptic@^6.4.0",scope:null,escapedName:"elliptic",name:"elliptic",rawSpec:"^6.4.0",spec:">=6.4.0 <7.0.0",type:"range"},"/Users/RLaFranchi/Projects/nimiq-core"]],_from:"elliptic@>=6.4.0 <7.0.0",_id:"elliptic@6.4.0",_inCache:!0,_location:"/elliptic",_nodeVersion:"7.0.0",_npmOperationalInternal:{host:"packages-18-east.internal.npmjs.com",tmp:"tmp/elliptic-6.4.0.tgz_1487798866428_0.30510620190761983"},_npmUser:{name:"indutny",email:"fedor@indutny.com"},_npmVersion:"3.10.8",_phantomChildren:{},_requested:{raw:"elliptic@^6.4.0",scope:null,escapedName:"elliptic",name:"elliptic",rawSpec:"^6.4.0",spec:">=6.4.0 <7.0.0",type:"range"},_requiredBy:["/","/browserify-sign","/create-ecdh"],_resolved:"https://registry.npmjs.org/elliptic/-/elliptic-6.4.0.tgz",_shasum:"cac9af8762c85836187003c8dfe193e5e2eae5df",_shrinkwrap:null,_spec:"elliptic@^6.4.0",_where:"/Users/RLaFranchi/Projects/nimiq-core",author:{name:"Fedor Indutny",email:"fedor@indutny.com"},bugs:{url:"https://github.com/indutny/elliptic/issues"},dependencies:{"bn.js":"^4.4.0",brorand:"^1.0.1","hash.js":"^1.0.0","hmac-drbg":"^1.0.0",inherits:"^2.0.1","minimalistic-assert":"^1.0.0","minimalistic-crypto-utils":"^1.0.0"},description:"EC cryptography",devDependencies:{brfs:"^1.4.3",coveralls:"^2.11.3",grunt:"^0.4.5","grunt-browserify":"^5.0.0","grunt-cli":"^1.2.0","grunt-contrib-connect":"^1.0.0","grunt-contrib-copy":"^1.0.0","grunt-contrib-uglify":"^1.0.1","grunt-mocha-istanbul":"^3.0.1","grunt-saucelabs":"^8.6.2",istanbul:"^0.4.2",jscs:"^2.9.0",jshint:"^2.6.0",mocha:"^2.1.0"},directories:{},dist:{shasum:"cac9af8762c85836187003c8dfe193e5e2eae5df",tarball:"https://registry.npmjs.org/elliptic/-/elliptic-6.4.0.tgz"},files:["lib"],gitHead:"6b0d2b76caae91471649c8e21f0b1d3ba0f96090",homepage:"https://github.com/indutny/elliptic",keywords:["EC","Elliptic","curve","Cryptography"],license:"MIT",main:"lib/elliptic.js",maintainers:[{name:"indutny",email:"fedor@indutny.com"}],name:"elliptic",optionalDependencies:{},readme:"ERROR: No README data found!",repository:{type:"git",url:"git+ssh://git@github.com/indutny/elliptic.git"},scripts:{jscs:"jscs benchmarks/*.js lib/*.js lib/**/*.js lib/**/**/*.js test/index.js",jshint:"jscs benchmarks/*.js lib/*.js lib/**/*.js lib/**/**/*.js test/index.js",lint:"npm run jscs && npm run jshint",test:"npm run lint && npm run unit",unit:"istanbul test _mocha --reporter=spec test/index.js",version:"grunt dist && git add dist/"},version:"6.4.0"}},{}],19:[function(e,t,i){var r=i;r.utils=e("./hash/utils"),r.common=e("./hash/common"),r.sha=e("./hash/sha"),r.ripemd=e("./hash/ripemd"),r.hmac=e("./hash/hmac"),r.sha1=r.sha.sha1,r.sha256=r.sha.sha256,r.sha224=r.sha.sha224,r.sha384=r.sha.sha384,r.sha512=r.sha.sha512,r.ripemd160=r.ripemd.ripemd160},{"./hash/common":20,"./hash/hmac":21,"./hash/ripemd":22,"./hash/sha":23,"./hash/utils":30}],20:[function(e,t,i){"use strict";function r(){this.pending=null,this.pendingTotal=0,this.blockSize=this.constructor.blockSize,this.outSize=this.constructor.outSize,this.hmacStrength=this.constructor.hmacStrength,this.padLength=this.constructor.padLength/8,this.endian="big",this._delta8=this.blockSize/8,this._delta32=this.blockSize/32}var f=e("./utils"),n=e("minimalistic-assert");i.BlockHash=r,r.prototype.update=function(e,t){if(e=f.toArray(e,t),this.pending?this.pending=this.pending.concat(e):this.pending=e,this.pendingTotal+=e.length,this.pending.length>=this._delta8){var i=(e=this.pending).length%this._delta8;this.pending=e.slice(e.length-i,e.length),0===this.pending.length&&(this.pending=null),e=f.join32(e,0,e.length-i,this.endian);for(var r=0;r<e.length;r+=this._delta32)this._update(e,r,r+this._delta32)}return this},r.prototype.digest=function(e){return this.update(this._pad()),n(null===this.pending),this._digest(e)},r.prototype._pad=function(){var e=this.pendingTotal,t=this._delta8,i=t-(e+this.padLength)%t,r=new Array(i+this.padLength);r[0]=128;for(var f=1;f<i;f++)r[f]=0;if(e<<=3,"big"===this.endian){for(var n=8;n<this.padLength;n++)r[f++]=0;r[f++]=0,r[f++]=0,r[f++]=0,r[f++]=0,r[f++]=e>>>24&255,r[f++]=e>>>16&255,r[f++]=e>>>8&255,r[f++]=255&e}else for(r[f++]=255&e,r[f++]=e>>>8&255,r[f++]=e>>>16&255,r[f++]=e>>>24&255,r[f++]=0,r[f++]=0,r[f++]=0,r[f++]=0,n=8;n<this.padLength;n++)r[f++]=0;return r}},{"./utils":30,"minimalistic-assert":33}],21:[function(e,t,i){"use strict";function r(e,t,i){if(!(this instanceof r))return new r(e,t,i);this.Hash=e,this.blockSize=e.blockSize/8,this.outSize=e.outSize/8,this.inner=null,this.outer=null,this._init(f.toArray(t,i))}var f=e("./utils"),n=e("minimalistic-assert");t.exports=r,r.prototype._init=function(e){e.length>this.blockSize&&(e=(new this.Hash).update(e).digest()),n(e.length<=this.blockSize);for(var t=e.length;t<this.blockSize;t++)e.push(0);for(t=0;t<e.length;t++)e[t]^=54;for(this.inner=(new this.Hash).update(e),t=0;t<e.length;t++)e[t]^=106;this.outer=(new this.Hash).update(e)},r.prototype.update=function(e,t){return this.inner.update(e,t),this},r.prototype.digest=function(e){return this.outer.update(this.inner.digest()),this.outer.digest(e)}},{"./utils":30,"minimalistic-assert":33}],22:[function(e,t,i){"use strict";function r(){if(!(this instanceof r))return new r;b.call(this),this.h=[1732584193,4023233417,2562383102,271733878,3285377520],this.endian="little"}function f(e,t,i,r){return e<=15?t^i^r:e<=31?t&i|~t&r:e<=47?(t|~i)^r:e<=63?t&r|i&~r:t^(i|~r)}function n(e){return e<=15?0:e<=31?1518500249:e<=47?1859775393:e<=63?2400959708:2840853838}function d(e){return e<=15?1352829926:e<=31?1548603684:e<=47?1836072691:e<=63?2053994217:0}var a=e("./utils"),s=e("./common"),c=a.rotl32,h=a.sum32,o=a.sum32_3,u=a.sum32_4,b=s.BlockHash;a.inherits(r,b),i.ripemd160=r,r.blockSize=512,r.outSize=160,r.hmacStrength=192,r.padLength=64,r.prototype._update=function(e,t){for(var i=this.h[0],r=this.h[1],a=this.h[2],s=this.h[3],b=this.h[4],g=i,y=r,M=a,w=s,S=b,_=0;_<80;_++){var A=h(c(u(i,f(_,r,a,s),e[l[_]+t],n(_)),m[_]),b);i=b,b=s,s=c(a,10),a=r,r=A,A=h(c(u(g,f(79-_,y,M,w),e[p[_]+t],d(_)),v[_]),S),g=S,S=w,w=c(M,10),M=y,y=A}A=o(this.h[1],a,w),this.h[1]=o(this.h[2],s,S),this.h[2]=o(this.h[3],b,g),this.h[3]=o(this.h[4],i,y),this.h[4]=o(this.h[0],r,M),this.h[0]=A},r.prototype._digest=function(e){return"hex"===e?a.toHex32(this.h,"little"):a.split32(this.h,"little")};var l=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,7,4,13,1,10,6,15,3,12,0,9,5,2,14,11,8,3,10,14,4,9,15,8,1,2,7,0,6,13,11,5,12,1,9,11,10,0,8,12,4,13,3,7,15,14,5,6,2,4,0,5,9,7,12,2,10,14,1,3,8,11,6,15,13],p=[5,14,7,0,9,2,11,4,13,6,15,8,1,10,3,12,6,11,3,7,0,13,5,10,14,15,8,12,4,9,1,2,15,5,1,3,7,14,6,9,11,8,12,2,10,0,4,13,8,6,4,1,3,11,15,0,5,12,2,13,9,7,10,14,12,15,10,4,1,5,8,7,6,2,13,14,0,3,9,11],m=[11,14,15,12,5,8,7,9,11,13,14,15,6,7,9,8,7,6,8,13,11,9,7,15,7,12,15,9,11,7,13,12,11,13,6,7,14,9,13,15,14,8,13,6,5,12,7,5,11,12,14,15,14,15,9,8,9,14,5,6,8,6,5,12,9,15,5,11,6,8,13,12,5,12,13,14,11,8,5,6],v=[8,9,9,11,13,15,15,5,7,7,8,11,14,14,12,6,9,13,15,7,12,8,9,11,7,7,12,7,6,15,13,11,9,7,15,11,8,6,6,14,12,13,5,14,13,13,7,5,15,5,8,11,14,14,6,14,6,9,12,9,12,5,15,8,8,5,12,9,12,5,14,6,8,13,6,5,15,13,11,11]},{"./common":20,"./utils":30}],23:[function(e,t,i){"use strict";i.sha1=e("./sha/1"),i.sha224=e("./sha/224"),i.sha256=e("./sha/256"),i.sha384=e("./sha/384"),i.sha512=e("./sha/512")},{"./sha/1":24,"./sha/224":25,"./sha/256":26,"./sha/384":27,"./sha/512":28}],24:[function(e,t,i){"use strict";function r(){if(!(this instanceof r))return new r;o.call(this),this.h=[1732584193,4023233417,2562383102,271733878,3285377520],this.W=new Array(80)}var f=e("../utils"),n=e("../common"),d=e("./common"),a=f.rotl32,s=f.sum32,c=f.sum32_5,h=d.ft_1,o=n.BlockHash,u=[1518500249,1859775393,2400959708,3395469782];f.inherits(r,o),t.exports=r,r.blockSize=512,r.outSize=160,r.hmacStrength=80,r.padLength=64,r.prototype._update=function(e,t){for(var i=this.W,r=0;r<16;r++)i[r]=e[t+r];for(;r<i.length;r++)i[r]=a(i[r-3]^i[r-8]^i[r-14]^i[r-16],1);var f=this.h[0],n=this.h[1],d=this.h[2],o=this.h[3],b=this.h[4];for(r=0;r<i.length;r++){var l=~~(r/20),p=c(a(f,5),h(l,n,d,o),b,i[r],u[l]);b=o,o=d,d=a(n,30),n=f,f=p}this.h[0]=s(this.h[0],f),this.h[1]=s(this.h[1],n),this.h[2]=s(this.h[2],d),this.h[3]=s(this.h[3],o),this.h[4]=s(this.h[4],b)},r.prototype._digest=function(e){return"hex"===e?f.toHex32(this.h,"big"):f.split32(this.h,"big")}},{"../common":20,"../utils":30,"./common":29}],25:[function(e,t,i){"use strict";function r(){if(!(this instanceof r))return new r;n.call(this),this.h=[3238371032,914150663,812702999,4144912697,4290775857,1750603025,1694076839,3204075428]}var f=e("../utils"),n=e("./256");f.inherits(r,n),t.exports=r,r.blockSize=512,r.outSize=224,r.hmacStrength=192,r.padLength=64,r.prototype._digest=function(e){return"hex"===e?f.toHex32(this.h.slice(0,7),"big"):f.split32(this.h.slice(0,7),"big")}},{"../utils":30,"./256":26}],26:[function(e,t,i){"use strict";function r(){if(!(this instanceof r))return new r;v.call(this),this.h=[1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225],this.k=g,this.W=new Array(64)}var f=e("../utils"),n=e("../common"),d=e("./common"),a=e("minimalistic-assert"),s=f.sum32,c=f.sum32_4,h=f.sum32_5,o=d.ch32,u=d.maj32,b=d.s0_256,l=d.s1_256,p=d.g0_256,m=d.g1_256,v=n.BlockHash,g=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298];f.inherits(r,v),t.exports=r,r.blockSize=512,r.outSize=256,r.hmacStrength=192,r.padLength=64,r.prototype._update=function(e,t){for(var i=this.W,r=0;r<16;r++)i[r]=e[t+r];for(;r<i.length;r++)i[r]=c(m(i[r-2]),i[r-7],p(i[r-15]),i[r-16]);var f=this.h[0],n=this.h[1],d=this.h[2],v=this.h[3],g=this.h[4],y=this.h[5],M=this.h[6],w=this.h[7];for(a(this.k.length===i.length),r=0;r<i.length;r++){var S=h(w,l(g),o(g,y,M),this.k[r],i[r]),_=s(b(f),u(f,n,d));w=M,M=y,y=g,g=s(v,S),v=d,d=n,n=f,f=s(S,_)}this.h[0]=s(this.h[0],f),this.h[1]=s(this.h[1],n),this.h[2]=s(this.h[2],d),this.h[3]=s(this.h[3],v),this.h[4]=s(this.h[4],g),this.h[5]=s(this.h[5],y),this.h[6]=s(this.h[6],M),this.h[7]=s(this.h[7],w)},r.prototype._digest=function(e){return"hex"===e?f.toHex32(this.h,"big"):f.split32(this.h,"big")}},{"../common":20,"../utils":30,"./common":29,"minimalistic-assert":33}],27:[function(e,t,i){"use strict";function r(){if(!(this instanceof r))return new r;n.call(this),this.h=[3418070365,3238371032,1654270250,914150663,2438529370,812702999,355462360,4144912697,1731405415,4290775857,2394180231,1750603025,3675008525,1694076839,1203062813,3204075428]}var f=e("../utils"),n=e("./512");f.inherits(r,n),t.exports=r,r.blockSize=1024,r.outSize=384,r.hmacStrength=192,r.padLength=128,r.prototype._digest=function(e){return"hex"===e?f.toHex32(this.h.slice(0,12),"big"):f.split32(this.h.slice(0,12),"big")}},{"../utils":30,"./512":28}],28:[function(e,t,i){"use strict";function r(){if(!(this instanceof r))return new r;R.call(this),this.h=[1779033703,4089235720,3144134277,2227873595,1013904242,4271175723,2773480762,1595750129,1359893119,2917565137,2600822924,725511199,528734635,4215389547,1541459225,327033209],this.k=j,this.W=new Array(160)}function f(e,t,i,r,f){var n=e&i^~e&f;return n<0&&(n+=4294967296),n}function n(e,t,i,r,f,n){var d=t&r^~t&n;return d<0&&(d+=4294967296),d}function d(e,t,i,r,f){var n=e&i^e&f^i&f;return n<0&&(n+=4294967296),n}function a(e,t,i,r,f,n){var d=t&r^t&n^r&n;return d<0&&(d+=4294967296),d}function s(e,t){var i=y(e,t,28)^y(t,e,2)^y(t,e,7);return i<0&&(i+=4294967296),i}function c(e,t){var i=M(e,t,28)^M(t,e,2)^M(t,e,7);return i<0&&(i+=4294967296),i}function h(e,t){var i=y(e,t,14)^y(e,t,18)^y(t,e,9);return i<0&&(i+=4294967296),i}function o(e,t){var i=M(e,t,14)^M(e,t,18)^M(t,e,9);return i<0&&(i+=4294967296),i}function u(e,t){var i=y(e,t,1)^y(e,t,8)^w(e,t,7);return i<0&&(i+=4294967296),i}function b(e,t){var i=M(e,t,1)^M(e,t,8)^S(e,t,7);return i<0&&(i+=4294967296),i}function l(e,t){var i=y(e,t,19)^y(t,e,29)^w(e,t,6);return i<0&&(i+=4294967296),i}function p(e,t){var i=M(e,t,19)^M(t,e,29)^S(e,t,6);return i<0&&(i+=4294967296),i}var m=e("../utils"),v=e("../common"),g=e("minimalistic-assert"),y=m.rotr64_hi,M=m.rotr64_lo,w=m.shr64_hi,S=m.shr64_lo,_=m.sum64,A=m.sum64_hi,x=m.sum64_lo,I=m.sum64_4_hi,z=m.sum64_4_lo,q=m.sum64_5_hi,k=m.sum64_5_lo,R=v.BlockHash,j=[1116352408,3609767458,1899447441,602891725,3049323471,3964484399,3921009573,2173295548,961987163,4081628472,1508970993,3053834265,2453635748,2937671579,2870763221,3664609560,3624381080,2734883394,310598401,1164996542,607225278,1323610764,1426881987,3590304994,1925078388,4068182383,2162078206,991336113,2614888103,633803317,3248222580,3479774868,3835390401,2666613458,4022224774,944711139,264347078,2341262773,604807628,2007800933,770255983,1495990901,1249150122,1856431235,1555081692,3175218132,1996064986,2198950837,2554220882,3999719339,2821834349,766784016,2952996808,2566594879,3210313671,3203337956,3336571891,1034457026,3584528711,2466948901,113926993,3758326383,338241895,168717936,666307205,1188179964,773529912,1546045734,1294757372,1522805485,1396182291,2643833823,1695183700,2343527390,1986661051,1014477480,2177026350,1206759142,2456956037,344077627,2730485921,1290863460,2820302411,3158454273,3259730800,3505952657,3345764771,106217008,3516065817,3606008344,3600352804,1432725776,4094571909,1467031594,275423344,851169720,430227734,3100823752,506948616,1363258195,659060556,3750685593,883997877,3785050280,958139571,3318307427,1322822218,3812723403,1537002063,2003034995,1747873779,3602036899,1955562222,1575990012,2024104815,1125592928,2227730452,2716904306,2361852424,442776044,2428436474,593698344,2756734187,3733110249,3204031479,2999351573,3329325298,3815920427,3391569614,3928383900,3515267271,566280711,3940187606,3454069534,4118630271,4000239992,116418474,1914138554,174292421,2731055270,289380356,3203993006,460393269,320620315,685471733,587496836,852142971,1086792851,1017036298,365543100,1126000580,2618297676,1288033470,3409855158,1501505948,4234509866,1607167915,987167468,1816402316,1246189591];m.inherits(r,R),t.exports=r,r.blockSize=1024,r.outSize=512,r.hmacStrength=192,r.padLength=128,r.prototype._prepareBlock=function(e,t){for(var i=this.W,r=0;r<32;r++)i[r]=e[t+r];for(;r<i.length;r+=2){var f=l(i[r-4],i[r-3]),n=p(i[r-4],i[r-3]),d=i[r-14],a=i[r-13],s=u(i[r-30],i[r-29]),c=b(i[r-30],i[r-29]),h=i[r-32],o=i[r-31];i[r]=I(f,n,d,a,s,c,h,o),i[r+1]=z(f,n,d,a,s,c,h,o)}},r.prototype._update=function(e,t){this._prepareBlock(e,t);var i=this.W,r=this.h[0],u=this.h[1],b=this.h[2],l=this.h[3],p=this.h[4],m=this.h[5],v=this.h[6],y=this.h[7],M=this.h[8],w=this.h[9],S=this.h[10],I=this.h[11],z=this.h[12],R=this.h[13],j=this.h[14],P=this.h[15];g(this.k.length===i.length);for(var L=0;L<i.length;L+=2){var E=j,N=P,B=h(M,w),O=o(M,w),F=f(M,0,S,0,z),T=n(0,w,0,I,0,R),C=this.k[L],H=this.k[L+1],Z=i[L],U=i[L+1],D=q(E,N,B,O,F,T,C,H,Z,U),J=k(E,N,B,O,F,T,C,H,Z,U);E=s(r,u),N=c(r,u),B=d(r,0,b,0,p),O=a(0,u,0,l,0,m);var X=A(E,N,B,O),V=x(E,N,B,O);j=z,P=R,z=S,R=I,S=M,I=w,M=A(v,y,D,J),w=x(y,y,D,J),v=p,y=m,p=b,m=l,b=r,l=u,r=A(D,J,X,V),u=x(D,J,X,V)}_(this.h,0,r,u),_(this.h,2,b,l),_(this.h,4,p,m),_(this.h,6,v,y),_(this.h,8,M,w),_(this.h,10,S,I),_(this.h,12,z,R),_(this.h,14,j,P)},r.prototype._digest=function(e){return"hex"===e?m.toHex32(this.h,"big"):m.split32(this.h,"big")}},{"../common":20,"../utils":30,"minimalistic-assert":33}],29:[function(e,t,i){"use strict";function r(e,t,i){return e&t^~e&i}function f(e,t,i){return e&t^e&i^t&i}function n(e,t,i){return e^t^i}var d=e("../utils").rotr32;i.ft_1=function(e,t,i,d){return 0===e?r(t,i,d):1===e||3===e?n(t,i,d):2===e?f(t,i,d):void 0},i.ch32=r,i.maj32=f,i.p32=n,i.s0_256=function(e){return d(e,2)^d(e,13)^d(e,22)},i.s1_256=function(e){return d(e,6)^d(e,11)^d(e,25)},i.g0_256=function(e){return d(e,7)^d(e,18)^e>>>3},i.g1_256=function(e){return d(e,17)^d(e,19)^e>>>10}},{"../utils":30}],30:[function(e,t,i){"use strict";function r(e){return(e>>>24|e>>>8&65280|e<<8&16711680|(255&e)<<24)>>>0}function f(e){return 1===e.length?"0"+e:e}function n(e){return 7===e.length?"0"+e:6===e.length?"00"+e:5===e.length?"000"+e:4===e.length?"0000"+e:3===e.length?"00000"+e:2===e.length?"000000"+e:1===e.length?"0000000"+e:e}var d=e("minimalistic-assert"),a=e("inherits");i.inherits=a,i.toArray=function(e,t){if(Array.isArray(e))return e.slice();if(!e)return[];var i=[];if("string"==typeof e)if(t){if("hex"===t)for((e=e.replace(/[^a-z0-9]+/gi,"")).length%2!=0&&(e="0"+e),r=0;r<e.length;r+=2)i.push(parseInt(e[r]+e[r+1],16))}else for(var r=0;r<e.length;r++){var f=e.charCodeAt(r),n=f>>8,d=255&f;n?i.push(n,d):i.push(d)}else for(r=0;r<e.length;r++)i[r]=0|e[r];return i},i.toHex=function(e){for(var t="",i=0;i<e.length;i++)t+=f(e[i].toString(16));return t},i.htonl=r,i.toHex32=function(e,t){for(var i="",f=0;f<e.length;f++){var d=e[f];"little"===t&&(d=r(d)),i+=n(d.toString(16))}return i},i.zero2=f,i.zero8=n,i.join32=function(e,t,i,r){var f=i-t;d(f%4==0);for(var n=new Array(f/4),a=0,s=t;a<n.length;a++,s+=4){var c;c="big"===r?e[s]<<24|e[s+1]<<16|e[s+2]<<8|e[s+3]:e[s+3]<<24|e[s+2]<<16|e[s+1]<<8|e[s],n[a]=c>>>0}return n},i.split32=function(e,t){for(var i=new Array(4*e.length),r=0,f=0;r<e.length;r++,f+=4){var n=e[r];"big"===t?(i[f]=n>>>24,i[f+1]=n>>>16&255,i[f+2]=n>>>8&255,i[f+3]=255&n):(i[f+3]=n>>>24,i[f+2]=n>>>16&255,i[f+1]=n>>>8&255,i[f]=255&n)}return i},i.rotr32=function(e,t){return e>>>t|e<<32-t},i.rotl32=function(e,t){return e<<t|e>>>32-t},i.sum32=function(e,t){return e+t>>>0},i.sum32_3=function(e,t,i){return e+t+i>>>0},i.sum32_4=function(e,t,i,r){return e+t+i+r>>>0},i.sum32_5=function(e,t,i,r,f){return e+t+i+r+f>>>0},i.sum64=function(e,t,i,r){var f=e[t],n=r+e[t+1]>>>0,d=(n<r?1:0)+i+f;e[t]=d>>>0,e[t+1]=n},i.sum64_hi=function(e,t,i,r){return(t+r>>>0<t?1:0)+e+i>>>0},i.sum64_lo=function(e,t,i,r){return t+r>>>0},i.sum64_4_hi=function(e,t,i,r,f,n,d,a){var s=0,c=t;return s+=(c=c+r>>>0)<t?1:0,s+=(c=c+n>>>0)<n?1:0,e+i+f+d+(s+=(c=c+a>>>0)<a?1:0)>>>0},i.sum64_4_lo=function(e,t,i,r,f,n,d,a){return t+r+n+a>>>0},i.sum64_5_hi=function(e,t,i,r,f,n,d,a,s,c){var h=0,o=t;return h+=(o=o+r>>>0)<t?1:0,h+=(o=o+n>>>0)<n?1:0,h+=(o=o+a>>>0)<a?1:0,e+i+f+d+s+(h+=(o=o+c>>>0)<c?1:0)>>>0},i.sum64_5_lo=function(e,t,i,r,f,n,d,a,s,c){return t+r+n+a+c>>>0},i.rotr64_hi=function(e,t,i){return(t<<32-i|e>>>i)>>>0},i.rotr64_lo=function(e,t,i){return(e<<32-i|t>>>i)>>>0},i.shr64_hi=function(e,t,i){return e>>>i},i.shr64_lo=function(e,t,i){return(e<<32-i|t>>>i)>>>0}},{inherits:32,"minimalistic-assert":33}],31:[function(e,t,i){"use strict";function r(e){if(!(this instanceof r))return new r(e);this.hash=e.hash,this.predResist=!!e.predResist,this.outLen=this.hash.outSize,this.minEntropy=e.minEntropy||this.hash.hmacStrength,this._reseed=null,this.reseedInterval=null,this.K=null,this.V=null;var t=n.toArray(e.entropy,e.entropyEnc||"hex"),i=n.toArray(e.nonce,e.nonceEnc||"hex"),f=n.toArray(e.pers,e.persEnc||"hex");d(t.length>=this.minEntropy/8,"Not enough entropy. Minimum is: "+this.minEntropy+" bits"),this._init(t,i,f)}var f=e("hash.js"),n=e("minimalistic-crypto-utils"),d=e("minimalistic-assert");t.exports=r,r.prototype._init=function(e,t,i){var r=e.concat(t).concat(i);this.K=new Array(this.outLen/8),this.V=new Array(this.outLen/8);for(var f=0;f<this.V.length;f++)this.K[f]=0,this.V[f]=1;this._update(r),this._reseed=1,this.reseedInterval=281474976710656},r.prototype._hmac=function(){return new f.hmac(this.hash,this.K)},r.prototype._update=function(e){var t=this._hmac().update(this.V).update([0]);e&&(t=t.update(e)),this.K=t.digest(),this.V=this._hmac().update(this.V).digest(),e&&(this.K=this._hmac().update(this.V).update([1]).update(e).digest(),this.V=this._hmac().update(this.V).digest())},r.prototype.reseed=function(e,t,i,r){"string"!=typeof t&&(r=i,i=t,t=null),e=n.toArray(e,t),i=n.toArray(i,r),d(e.length>=this.minEntropy/8,"Not enough entropy. Minimum is: "+this.minEntropy+" bits"),this._update(e.concat(i||[])),this._reseed=1},r.prototype.generate=function(e,t,i,r){if(this._reseed>this.reseedInterval)throw new Error("Reseed is required");"string"!=typeof t&&(r=i,i=t,t=null),i&&(i=n.toArray(i,r||"hex"),this._update(i));for(var f=[];f.length<e;)this.V=this._hmac().update(this.V).digest(),f=f.concat(this.V);var d=f.slice(0,e);return this._update(i),this._reseed++,n.encode(d,t)}},{"hash.js":19,"minimalistic-assert":33,"minimalistic-crypto-utils":34}],32:[function(e,t,i){"function"==typeof Object.create?t.exports=function(e,t){e.super_=t,e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}})}:t.exports=function(e,t){e.super_=t;var i=function(){};i.prototype=t.prototype,e.prototype=new i,e.prototype.constructor=e}},{}],33:[function(e,t,i){function r(e,t){if(!e)throw new Error(t||"Assertion failed")}t.exports=r,r.equal=function(e,t,i){if(e!=t)throw new Error(i||"Assertion failed: "+e+" != "+t)}},{}],34:[function(e,t,i){"use strict";function r(e){return 1===e.length?"0"+e:e}function f(e){for(var t="",i=0;i<e.length;i++)t+=r(e[i].toString(16));return t}var n=i;n.toArray=function(e,t){if(Array.isArray(e))return e.slice();if(!e)return[];var i=[];if("string"!=typeof e){for(r=0;r<e.length;r++)i[r]=0|e[r];return i}if("hex"===t)for((e=e.replace(/[^a-z0-9]+/gi,"")).length%2!=0&&(e="0"+e),r=0;r<e.length;r+=2)i.push(parseInt(e[r]+e[r+1],16));else for(var r=0;r<e.length;r++){var f=e.charCodeAt(r),n=f>>8,d=255&f;n?i.push(n,d):i.push(d)}return i},n.zero2=r,n.toHex=f,n.encode=function(e,t){return"hex"===t?f(e):e}},{}],elliptic:[function(e,t,i){"use strict";var r=i;r.version=e("../package.json").version,r.utils=e("./elliptic/utils"),r.rand=e("brorand"),r.curve=e("./elliptic/curve"),r.curves=e("./elliptic/curves"),r.ec=e("./elliptic/ec"),r.eddsa=e("./elliptic/eddsa")},{"../package.json":18,"./elliptic/curve":6,"./elliptic/curves":9,"./elliptic/ec":10,"./elliptic/eddsa":13,"./elliptic/utils":17,brorand:2}],"fast-sha256":[function(e,t,i){!function(e,i){var r={};i(r);var f=r.default;for(var n in r)f[n]=r[n];"object"==typeof t&&"object"==typeof t.exports?t.exports=f:"function"==typeof define&&define.amd?define(function(){return f}):e.sha256=f}(this,function(e){"use strict";function t(e,t,i,f,n){for(var d,a,s,c,h,o,u,b,l,p,m,v,g;n>=64;){for(d=t[0],a=t[1],s=t[2],c=t[3],h=t[4],o=t[5],u=t[6],b=t[7],p=0;p<16;p++)m=f+4*p,e[p]=(255&i[m])<<24|(255&i[m+1])<<16|(255&i[m+2])<<8|255&i[m+3];for(p=16;p<64;p++)v=((l=e[p-2])>>>17|l<<15)^(l>>>19|l<<13)^l>>>10,g=((l=e[p-15])>>>7|l<<25)^(l>>>18|l<<14)^l>>>3,e[p]=(v+e[p-7]|0)+(g+e[p-16]|0);for(p=0;p<64;p++)v=(((h>>>6|h<<26)^(h>>>11|h<<21)^(h>>>25|h<<7))+(h&o^~h&u)|0)+(b+(r[p]+e[p]|0)|0)|0,g=((d>>>2|d<<30)^(d>>>13|d<<19)^(d>>>22|d<<10))+(d&a^d&s^a&s)|0,b=u,u=o,o=h,h=c+v|0,c=s,s=a,a=d,d=v+g|0;t[0]+=d,t[1]+=a,t[2]+=s,t[3]+=c,t[4]+=h,t[5]+=o,t[6]+=u,t[7]+=b,f+=64,n-=64}return f}function i(e){var t=(new f).update(e),i=t.digest();return t.clean(),i}e.digestLength=32,e.blockSize=64;var r=new Uint32Array([1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298]),f=function(){function i(){this.digestLength=e.digestLength,this.blockSize=e.blockSize,this.state=new Int32Array(8),this.temp=new Int32Array(64),this.buffer=new Uint8Array(128),this.bufferLength=0,this.bytesHashed=0,this.finished=!1,this.reset()}return i.prototype.reset=function(){return this.state[0]=1779033703,this.state[1]=3144134277,this.state[2]=1013904242,this.state[3]=2773480762,this.state[4]=1359893119,this.state[5]=2600822924,this.state[6]=528734635,this.state[7]=1541459225,this.bufferLength=0,this.bytesHashed=0,this.finished=!1,this},i.prototype.clean=function(){for(e=0;e<this.buffer.length;e++)this.buffer[e]=0;for(var e=0;e<this.temp.length;e++)this.temp[e]=0;this.reset()},i.prototype.update=function(e,i){if(void 0===i&&(i=e.length),this.finished)throw new Error("SHA256: can't update because hash was finished.");var r=0;if(this.bytesHashed+=i,this.bufferLength>0){for(;this.bufferLength<64&&i>0;)this.buffer[this.bufferLength++]=e[r++],i--;64===this.bufferLength&&(t(this.temp,this.state,this.buffer,0,64),this.bufferLength=0)}for(i>=64&&(r=t(this.temp,this.state,e,r,i),i%=64);i>0;)this.buffer[this.bufferLength++]=e[r++],i--;return this},i.prototype.finish=function(e){if(!this.finished){var i=this.bytesHashed,r=this.bufferLength,f=i/536870912|0,n=i<<3,d=i%64<56?64:128;this.buffer[r]=128;for(a=r+1;a<d-8;a++)this.buffer[a]=0;this.buffer[d-8]=f>>>24&255,this.buffer[d-7]=f>>>16&255,this.buffer[d-6]=f>>>8&255,this.buffer[d-5]=f>>>0&255,this.buffer[d-4]=n>>>24&255,this.buffer[d-3]=n>>>16&255,this.buffer[d-2]=n>>>8&255,this.buffer[d-1]=n>>>0&255,t(this.temp,this.state,this.buffer,0,d),this.finished=!0}for(var a=0;a<8;a++)e[4*a+0]=this.state[a]>>>24&255,e[4*a+1]=this.state[a]>>>16&255,e[4*a+2]=this.state[a]>>>8&255,e[4*a+3]=this.state[a]>>>0&255;return this},i.prototype.digest=function(){var e=new Uint8Array(this.digestLength);return this.finish(e),e},i.prototype._saveState=function(e){for(var t=0;t<this.state.length;t++)e[t]=this.state[t]},i.prototype._restoreState=function(e,t){for(var i=0;i<this.state.length;i++)this.state[i]=e[i];this.bytesHashed=t,this.finished=!1,this.bufferLength=0},i}();e.Hash=f;var n=function(){function e(e){this.inner=new f,this.outer=new f,this.blockSize=this.inner.blockSize,this.digestLength=this.inner.digestLength;var t=new Uint8Array(this.blockSize);if(e.length>this.blockSize)(new f).update(e).finish(t).clean();else for(i=0;i<e.length;i++)t[i]=e[i];for(i=0;i<t.length;i++)t[i]^=54;this.inner.update(t);for(i=0;i<t.length;i++)t[i]^=106;this.outer.update(t),this.istate=new Uint32Array(this.digestLength/4),this.ostate=new Uint32Array(this.digestLength/4),this.inner._saveState(this.istate),this.outer._saveState(this.ostate);for(var i=0;i<t.length;i++)t[i]=0}return e.prototype.reset=function(){return this.inner._restoreState(this.istate,this.inner.blockSize),this.outer._restoreState(this.ostate,this.outer.blockSize),this},e.prototype.clean=function(){for(var e=0;e<this.istate.length;e++)this.ostate[e]=this.istate[e]=0;this.inner.clean(),this.outer.clean()},e.prototype.update=function(e){return this.inner.update(e),this},e.prototype.finish=function(e){return this.outer.finished?this.outer.finish(e):(this.inner.finish(e),this.outer.update(e,this.digestLength).finish(e)),this},e.prototype.digest=function(){var e=new Uint8Array(this.digestLength);return this.finish(e),e},e}();e.HMAC=n,e.hash=i,e.__esModule=!0,e.default=i,e.hmac=function(e,t){var i=new n(e).update(t),r=i.digest();return i.clean(),r},e.pbkdf2=function(e,t,i,r){for(var f=new n(e),d=f.digestLength,a=new Uint8Array(4),s=new Uint8Array(d),c=new Uint8Array(d),h=new Uint8Array(r),o=0;o*d<r;o++){var u=o+1;for(a[0]=u>>>24&255,a[1]=u>>>16&255,a[2]=u>>>8&255,a[3]=u>>>0&255,f.reset(),f.update(t),f.update(a),f.finish(c),l=0;l<d;l++)s[l]=c[l];for(l=2;l<=i;l++){f.reset(),f.update(c).finish(c);for(var b=0;b<d;b++)s[b]^=c[b]}for(var l=0;l<d&&o*d+l<r;l++)h[o*d+l]=s[l]}for(o=0;o<d;o++)s[o]=c[o]=0;for(o=0;o<4;o++)a[o]=0;return f.clean(),h}})},{}]},{},[]);
Nimiq = typeof Nimiq !== 'undefined' ? Nimiq : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : {};
(function (exports) {
    exports = typeof exports !== 'undefined' ? exports : {};

class Class {
    static register(cls) {
        if (typeof exports !== 'undefined') exports[cls.name] = cls;
    }
}
Class.register(Class);

class LogNative {
    constructor() {
        this._global_level = Log.TRACE;
        this._tag_levels = {};
        if (window.localStorage) {
            try {
                let c = window.localStorage.getItem('log_tag_levels');
                if (c && typeof c === 'string') c = JSON.parse(c);
                if (c && typeof c === 'object') this._tag_levels = c;
            } catch (e) {
                console.warn('Failed to load log configuration from local storage.');
            }
        }
    }

    isLoggable(tag, level) {
        if (tag && this._tag_levels[tag]) {
            return this._tag_levels[tag] <= level;
        }
        if (this._tag_levels['*']) {
            return this._tag_levels['*'] <= level;
        }
        return this._global_level <= level;
    }

    setLoggable(tag, level) {
        if (tag && tag.name) tag = tag.name;
        this._tag_levels[tag] = level;
        if (window.localStorage) {
            window.localStorage.setItem('log_tag_levels', JSON.stringify(this._tag_levels));
        }
    }

    msg(level, tag, args) {
        if (tag && tag.name) tag = tag.name;
        if (!this.isLoggable(tag, level)) return;
        if (tag) args.unshift(tag + ':');
        args.unshift(`[${Log._level_tag(level)} ${new Date().toTimeString().substr(0, 8)}]`);
        if (console.error && level >= Log.ERROR) {
            console.error.apply(null, args);
        } else if (console.warn && level >= Log.WARNING) {
            console.warn.apply(null, args);
        } else if (console.info && level >= Log.INFO) {
            console.info.apply(null, args);
        } else if (console.debug && level >= Log.DEBUG) {
            console.debug.apply(null, args);
        } else if (console.trace && level <= Log.TRACE) {
            console.trace.apply(null, args);
        } else {
            console.log.apply(null, args);
        }
    }
}
Class.register(LogNative);

class Log {
    static _level_tag(level) {
        switch (level) {
            case Log.TRACE:
                return 'T';
            case Log.VERBOSE:
                return 'V';
            case Log.DEBUG:
                return 'D';
            case Log.INFO:
                return 'I';
            case Log.WARNING:
                return 'W';
            case Log.ERROR:
                return 'E';
            case Log.ASSERT:
                return 'A';
            default:
                return '*';
        }
    }

    static get instance() {
        if (!Log._instance) {
            Log._instance = new Log(new LogNative());
        }
        return Log._instance;
    }

    constructor(native) {
        this._native = native;
    }

    setLoggable(tag, level) {
        this._native.setLoggable(tag, level);
    }

    get level() {
        return this._native._global_level;
    }

    set level(l) {
        this._native._global_level = l;
    }

    msg(level, tag, args) {
        this._native.msg(level, tag, args);
    }

    static d() {
        let tag, args;
        if (arguments.length >= 2) {
            tag = arguments[0];
            args = Array.prototype.slice.call(arguments, 1);
        } else {
            tag = undefined;
            args = Array.prototype.slice.call(arguments, 0);
        }
        Log.instance.msg(Log.DEBUG, tag, args);
    }

    static e() {
        let tag, args;
        if (arguments.length >= 2) {
            tag = arguments[0];
            args = Array.prototype.slice.call(arguments, 1);
        } else {
            tag = undefined;
            args = Array.prototype.slice.call(arguments, 0);
        }
        Log.instance.msg(Log.ERROR, tag, args);
    }

    static i() {
        let tag, args;
        if (arguments.length >= 2) {
            tag = arguments[0];
            args = Array.prototype.slice.call(arguments, 1);
        } else {
            tag = undefined;
            args = Array.prototype.slice.call(arguments, 0);
        }
        Log.instance.msg(Log.INFO, tag, args);
    }

    static v() {
        let tag, args;
        if (arguments.length >= 2) {
            tag = arguments[0];
            args = Array.prototype.slice.call(arguments, 1);
        } else {
            tag = undefined;
            args = Array.prototype.slice.call(arguments, 0);
        }
        Log.instance.msg(Log.VERBOSE, tag, args);
    }

    static w() {
        let tag, args;
        if (arguments.length >= 2) {
            tag = arguments[0];
            args = Array.prototype.slice.call(arguments, 1);
        } else {
            tag = undefined;
            args = Array.prototype.slice.call(arguments, 0);
        }
        Log.instance.msg(Log.WARNING, tag, args);
    }

    static t() {
        let tag, args;
        if (arguments.length >= 2) {
            tag = arguments[0];
            args = Array.prototype.slice.call(arguments, 1);
        } else {
            tag = undefined;
            args = Array.prototype.slice.call(arguments, 0);
        }
        Log.instance.msg(Log.TRACE, tag, args);
    }
}
Log.TRACE = 1;
Log.VERBOSE = 2;
Log.DEBUG = 3;
Log.INFO = 4;
Log.WARNING = 5;
Log.ERROR = 6;
Log.ASSERT = 7;
Log._instance = null;
Class.register(Log);

class Observable {
    static get WILDCARD() {
        return '*';
    }

    constructor() {
        this._listeners = {};
    }

    on(type, callback) {
        this._listeners[type] = this._listeners[type] || [];
        this._listeners[type].push(callback);
    }

    fire() {
        if (!arguments.length) throw 'Observable.fire() needs type argument';

        // Notify listeners for this event type.
        const type = arguments[0];
        if (this._listeners[type]) {
            const args = Array.prototype.slice.call(arguments, 1);
            for (const listener of this._listeners[type]) {
                listener.apply(null, args);
            }
        }

        // Notify wildcard listeners. Pass event type as first argument
        if (this._listeners[Observable.WILDCARD]) {
            for (const listener of this._listeners[Observable.WILDCARD]) {
                listener.apply(null, arguments);
            }
        }
    }

    bubble() {
        if (arguments.length < 2) throw 'Observable.bubble() needs observable and at least 1 type argument';

        const observable = arguments[0];
        const types = Array.prototype.slice.call(arguments, 1);
        for (const type of types) {
            let callback;
            if (type == Observable.WILDCARD) {
                callback = function() {
                    this.fire.apply(this, arguments);
                };
            } else {
                callback = function() {
                    this.fire.apply(this, [type, ...arguments]);
                };
            }
            observable.on(type, callback.bind(this));
        }
    }
}
Class.register(Observable);

class BaseTypedDB {
    static get db() {
        if (BaseTypedDB._db) return Promise.resolve(BaseTypedDB._db);

        const indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.OIndexedDB || window.msIndexedDB;
        const dbVersion = 4;
        const request = indexedDB.open('nimiq', dbVersion);

        return new Promise((resolve, error) => {
            request.onsuccess = () => {
                BaseTypedDB._db = request.result;
                resolve(request.result);
            };

            request.onupgradeneeded = event => {
                const db = event.target.result;

                // XXX For testing, delete local blockchain copy on upgrade.
                // TODO remove for production!!!
                try {
                    db.deleteObjectStore('accounts');
                } catch (e) {
                    // Thrown if the object store doesn't exist, ignore
                }
                try {
                    db.deleteObjectStore('blocks');
                } catch (e) {
                    // Thrown if the object store doesn't exist, ignore
                }

                db.createObjectStore('accounts');
                db.createObjectStore('blocks');

                try {
                    db.createObjectStore('certificate');
                } catch (e) {
                    // Thrown if the object store already exists, ignore
                }
                try {
                    db.createObjectStore('wallet');
                } catch (e) {
                    // Thrown if the object store already exists, ignore
                }
            };
        });
    }

    constructor(tableName, type) {
        if (type && !type.unserialize) throw 'TypedDB requires type with .unserialize()';
        this._tableName = tableName;
        this._type = type;
    }

    _get(key) {
        return BaseTypedDB.db.then(db => new Promise((resolve, error) => {
            const getTx = db.transaction([this._tableName])
                .objectStore(this._tableName)
                .get(key);
            getTx.onsuccess = event => resolve(event.target.result);
            getTx.onerror = error;
        }));
    }

    _put(key, value) {
        return BaseTypedDB.db.then(db => new Promise((resolve, error) => {
            const putTx = db.transaction([this._tableName], 'readwrite')
                .objectStore(this._tableName)
                .put(value, key);
            putTx.onsuccess = event => resolve(event.target.result);
            putTx.onerror = error;
        }));
    }

    getObject(key) {
        return this._get(key).then(value => value && this._type ? this._type.unserialize(new SerialBuffer(value)) : value);
    }

    putObject(key, value) {
        if (this._type && !value.serialize) throw 'TypedDB requires objects with .serialize()';
        return this._put(key, this._type ? value.serialize() : value);
    }

    getString(key) {
        return this._get(key);
    }

    putString(key, value) {
        return this._put(key, value);
    }

    remove(key) {
        return BaseTypedDB.db.then(db => new Promise((resolve, error) => {
            const deleteTx = db.transaction([this._tableName], 'readwrite')
                .objectStore(this._tableName)
                .delete(key);
            deleteTx.onsuccess = event => resolve(event.target.result);
            deleteTx.onerror = error;
        }));
    }

    nativeTransaction() {
        return BaseTypedDB.db.then(db => new NativeDBTransaction(db, this._tableName, this._type));
    }
}
Class.register(BaseTypedDB);

class NativeDBTransaction extends Observable {
    constructor(db, tableName, type) {
        super();
        this._db = db;
        this._tableName = tableName;
        this._type = type;
    }

    open() {
        this._tx = this._db.transaction([this._tableName], 'readwrite');
        this._store = this._tx.objectStore(this._tableName);
        this._finished = false;

        this._tx.oncomplete = () => {
            this.fire('complete');
            this._finished = true;
        };
        this._tx.onerror = e => {
            this.fire('error', e);
            this._finished = true;
        };
    }

    putObject(key, value) {
        if (this._finished) throw 'Transaction is already finished!';
        if (this._type && !value.serialize) throw 'TypedDB requires objects with .serialize()';
        return this._store.put(this._type ? value.serialize() : value, key);
    }

    putString(key, value) {
        if (this._finished) throw 'Transaction is already finished!';
        this._store.put(value, key);
    }

    remove(key) {
        if (this._finished) throw 'Transaction is already finished!';
        this._store.delete(key);
    }

    commit() {
        // no-op on IndexedDB
    }
}
Class.register(NativeDBTransaction);

class TypedDB extends BaseTypedDB {
    constructor(tableName, type) {
        super(tableName, type);
        this._cache = {};
    }

    async getObject(key) {
        if (this._cache[key] === undefined) {
            this._cache[key] = await BaseTypedDB.prototype.getObject.call(this, key);
        }
        return this._cache[key];
    }

    putObject(key, value) {
        this._cache[key] = value;
        return super.putObject(key, value);
    }

    async getString(key) {
        if (this._cache[key] === undefined) {
            this._cache[key] = await BaseTypedDB.prototype.getString.call(this, key);
        }
        return this._cache[key];
    }

    putString(key, value) {
        this._cache[key] = value;
        return super.putString(key, value);
    }

    remove(key) {
        delete this._cache[key];
        return super.remove(key);
    }

    updateCache(values) {
        for (let key in values) {
            this._cache[key] = values[key];
        }
    }

    flushCache(keys) {
        if (!keys) {
            this._cache = {};
        } else {
            for (let key of keys) {
                delete this._cache[key];
            }
        }
    }

    transaction() {
        return new TypedDBTransaction(this);
    }
}
Class.register(TypedDB);

class CryptoLib {
    static get instance() {
        let native = typeof window !== 'undefined' ? (window.crypto.subtle) : (self.crypto.subtle);
        if (native) return native;
        if (!CryptoLib._poly_instance) {
            CryptoLib._poly_instance = CryptoLib._init_poly();
        }
        return CryptoLib._poly_instance;
    }

    static _init_poly() {
        const poly = {
            _nimiq_isSlowCurves: true,
            _nimiq_callDigestDelayedWhenMining: true
        };

        // We can use Webkit's SHA-256
        let wk = typeof window !== 'undefined' ? (window.crypto.webkitSubtle) : (self.crypto.webkitSubtle);
        if (wk) {
            poly.digest = (alg, arr) => wk.digest(alg, arr);
        } else {
            const sha256 = require('fast-sha256');
            poly.digest = async (alg, arr) => {
                if (alg !== 'SHA-256') throw 'Unsupported algorithm.';
                return new sha256.Hash().update(arr).digest();
            };
        }

        const ec = require('elliptic').ec('p256');

        poly.generateKey = function (config, exportable, usage) {
            const keyPair = ec.genKeyPair();
            return {privateKey: {type: 'private', pair: keyPair}, publicKey: {type: 'public', pair: keyPair}};
        };

        const fromDER = function (der) {
            let res = [];
            let start = 4;
            for (let i = 0; i < 2; ++i) {
                let len = der[start - 1];
                for (let j = 0; j < Math.max(32 - len, 0); ++j) res.push(0);
                if (len === 33) {
                    res = res.concat(Array.prototype.slice.call(der, start + 1, start + len));
                } else {
                    res = res.concat(Array.prototype.slice.call(der, start, start + len));
                }
                start = start + len + 2;
            }

            return new Uint8Array(res);
        };

        const toDER = function (arr) {
            let res = [48, 0];
            for (let i = 0; i < 2; ++i) {
                res.push(2);
                if ((arr[0] & 0x80) === 0x80) {
                    res.push(33);
                    res.push(0);
                    res = res.concat(Array.prototype.slice.call(arr, (i * 32), (i * 32) + 32));
                } else {
                    let len = 32;
                    while (res[((i + 1) * 32) - len] === 0 && (res[((i + 1) * 32) - len + 1] & 0x80) === 0x80) len--;
                    res.push(len);
                    res = res.concat(Array.prototype.slice.call(arr, ((i + 1) * 32) - len, (i * 32) + 32));
                }
            }
            res[1] = res.length - 2;
            return res;
        };

        poly.sign = async function (config, privateKey, data) {
            const digest = await poly.digest(config.hash, data);
            const msgHash = new Uint8Array(digest);
            return fromDER(privateKey.pair.sign(msgHash).toDER());
        };

        poly.verify = async function (config, publicKey, signature, data) {
            const digest = await poly.digest(config.hash, data);
            const msgHash = new Uint8Array(digest);
            return publicKey.pair.verify(msgHash, {r: signature.slice(0, 32), s: signature.slice(32, 64)});
        };

        const toUri64 = function (arr) {
            return btoa(String.fromCharCode(...arr)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
        };

        const fromUri64 = function (u64) {
            return Uint8Array.from(atob(u64.replace(/-/g, '+').replace(/_/g, '/') + '='), c => c.charCodeAt(0));
        };

        const toHex = function (arr) {
            return Array.prototype.map.call(arr, x => ('00' + x.toString(16)).slice(-2)).join('');
        };

        poly.exportKey = function (type, key) {
            if (key.type === 'public' && type === 'raw') {
                return key.pair.getPublic().encode();
            } else if (key.type === 'private' && type === 'jwk') {
                let pub = key.pair.getPublic().encode();
                return {
                    crv: 'P-256',
                    d: toUri64(key.pair.getPrivate().toArrayLike(Uint8Array)),
                    ext: true,
                    key_ops: ['sign'],
                    kty: 'EC',
                    x: toUri64(pub.slice(1, 33)),
                    y: toUri64(pub.slice(33)),
                };
            } else {
                throw 'Invalid key or unsupported type.';
            }
        };

        poly.importKey = function (type, key, config, exportable, usage) {
            if (type === 'raw' && key[0] === 4) {
                return {type: 'public', pair: ec.keyFromPublic(key)};
            } else if (type === 'jwk' && key.crv === 'P-256') {
                if (key.d) {
                    let priv = ec.keyFromPrivate(fromUri64(key.d));
                    priv.validate();
                    return {type: 'private', pair: priv};
                }
                if (key.x && key.y) {
                    return {
                        type: 'public',
                        pair: ec.keyFromPublic('04' + toHex(fromUri64(key.x)) + toHex(fromUri64(key.y)), 'hex')
                    };
                }
            }
            throw 'Invalid key or unsupported type.';
        };
        return poly;
    }
}
CryptoLib._poly_instance = null;
Class.register(CryptoLib);

class NetworkConfig {
    static myPeerAddress() {
        if (!PlatformUtils.supportsWebRTC()) {
            return new DumbPeerAddress(
                Services.myServices(), Date.now(), NetAddress.UNSPECIFIED,
                /*id*/ NumberUtils.randomUint64());
        }

        if (!NetworkConfig._mySignalId) {
            throw 'PeerAddress is not configured';
        }

        return new RtcPeerAddress(
            Services.myServices(), Date.now(), NetAddress.UNSPECIFIED,
            NetworkConfig._mySignalId, /*distance*/ 0);
    }

    // Used for filtering peer addresses by protocols.
    static myProtocolMask() {
        return Protocol.WS | Protocol.RTC;
    }

    static canConnect(protocol) {
        switch (protocol) {
            case Protocol.WS:
                return true;
            case Protocol.RTC:
                return PlatformUtils.supportsWebRTC();
            case Protocol.DUMB:
            default:
                return false;
        }
    }

    static configurePeerAddress(signalId) {
        NetworkConfig._mySignalId = signalId;
    }
}
Class.register(NetworkConfig);

// TODO The certificate is going to expire eventually. Automatically renew it.
window.RTCPeerConnection = window.RTCPeerConnection || window.webkitRTCPeerConnection;
class WebRtcCertificate {
    static async get() {
        if (!WebRtcCertificate._certificate) {
            WebRtcCertificate._certificate = await WebRtcCertificate._getOrCreate();
        }
        // TODO: solve more cleverly
        // If certificate is expired, renew.
        if (WebRtcCertificate._certificate.expires <= Date.now()) {
            WebRtcCertificate._certificate = await WebRtcCertificate._create();
        }
        return WebRtcCertificate._certificate;
    }

    static async _getOrCreate() {
        const db = new TypedDB('certificate');
        let cert = await db.getObject('certKey');
        if (!cert) {
            cert = await WebRtcCertificate._create(db);
        }
        return cert;
    }

    static async _create(db) {
        db = db || new TypedDB('certificate');
        const cert = await RTCPeerConnection.generateCertificate({
            name: 'ECDSA',
            namedCurve: 'P-256'
        });
        await db.putObject('certKey', cert);
        return cert;
    }
}
WebRtcCertificate._certificate = null;
Class.register(WebRtcCertificate);

class WebRtcConfig {
    static async get() {
        // Initialize singleton.
        if (!WebRtcConfig._config) {
            // If browser does not support WebRTC, simply return empty config.
            if (!PlatformUtils.supportsWebRTC()) {
                WebRtcConfig._config = {};
                return WebRtcConfig._config;
            }

            const certificate = await WebRtcCertificate.get();
            WebRtcConfig._config = {
                iceServers: [
                    { urls: 'stun:stun.l.google.com:19302' },
                    { urls: 'stun:stun.nimiq-network.com:19302' }
                ],
                certificates : [certificate]
            };

            // Configure our peer address.
            const signalId = await WebRtcConfig.mySignalId();
            NetworkConfig.configurePeerAddress(signalId);
        }

        return WebRtcConfig._config;
    }

    static async mySignalId() {
        const config = await WebRtcConfig.get();
        const conn = new RTCPeerConnection(config);
        conn.createDataChannel('pseudo');
        return conn.createOffer().then(desc => {
            return WebRtcUtils.sdpToSignalId(desc.sdp);
        });
    }
}
Class.register(WebRtcConfig);

class WebRtcConnector extends Observable {
    constructor() {
        super();
        return this._init();
    }

    async _init() {
        this._connectors = {};
        this._config = await WebRtcConfig.get();
        this._timers = new Timers();

        return this;
    }

    connect(peerAddress, signalChannel) {
        if (peerAddress.protocol !== Protocol.RTC) throw 'Malformed peerAddress';

        const signalId = peerAddress.signalId;
        if (this._connectors[signalId]) {
            Log.w(WebRtcConnector, `WebRtc: Already connecting/connected to ${signalId}`);
            return false;
        }

        const connector = new OutboundPeerConnector(this._config, peerAddress, signalChannel);
        connector.on('connection', conn => this._onConnection(conn, signalId));
        this._connectors[signalId] = connector;

        this._timers.setTimeout(`connect_${signalId}`, () => {
            delete this._connectors[signalId];
            this._timers.clearTimeout(`connect_${signalId}`);
            this.fire('error', peerAddress, 'timeout');
        }, WebRtcConnector.CONNECT_TIMEOUT);

        return true;
    }

    isValidSignal(msg) {
        return !!this._connectors[msg.senderId] && this._connectors[msg.senderId].nonce === msg.nonce;
    }

    onSignal(channel, msg) {
        // Check if we received an unroutable/ttl exceeded response from one of the signaling peers.
        if (msg.isUnroutable() || msg.isTtlExceeded()) {
            // Clear the timeout early if we initiated the connection.
            if (this.isValidSignal(msg) && this._connectors[msg.senderId] instanceof OutboundPeerConnector) {
                const peerAddress = this._connectors[msg.senderId].peerAddress;

                delete this._connectors[msg.senderId];
                this._timers.clearTimeout(`connect_${msg.senderId}`);

                // XXX Reason needs to be adapted when more flags are added.
                const reason =  msg.isUnroutable() ? 'unroutable' : 'ttl exceeded';
                this.fire('error', peerAddress, reason);
            }

            return;
        }

        let payload;
        try {
            payload = JSON.parse(BufferUtils.toAscii(msg.payload));
        } catch (e) {
            Log.e(WebRtcConnector, `Failed to parse signal payload from ${msg.senderId}`);
            return;
        }

        if (!payload) {
            Log.w(WebRtcConnector, `Discarding signal from ${msg.senderId} - empty payload`);
            return;
        }

        if (payload.type === 'offer') {
            // Check if we have received an offer on an ongoing connection.
            // This can happen if two peers initiate connections to one another
            // simultaneously. Resolve this by having the peer with the higher
            // signalId discard the offer while the one with the lower signalId
            // accepts it.
            if (this._connectors[msg.senderId]) {
                if (msg.recipientId > msg.senderId) {
                    // Discard the offer.
                    Log.d(WebRtcConnector, `Simultaneous connection, discarding offer from ${msg.senderId} (<${msg.recipientId})`);
                    return;
                } else {
                    // We are going to accept the offer. Clear the connect timeout
                    // from our previous Outbound connection attempt to this peer.
                    Log.d(WebRtcConnector, `Simultaneous connection, accepting offer from ${msg.senderId} (>${msg.recipientId})`);
                    this._timers.clearTimeout(`connect_${msg.senderId}`);
                }
            }

            // Accept the offer.
            const connector = new InboundPeerConnector(this._config, channel, msg.senderId, payload);
            connector.on('connection', conn => this._onConnection(conn, msg.senderId));
            this._connectors[msg.senderId] = connector;

            this._timers.setTimeout(`connect_${msg.senderId}`, () => {
                this._timers.clearTimeout(`connect_${msg.senderId}`);
                delete this._connectors[msg.senderId];
            }, WebRtcConnector.CONNECT_TIMEOUT);
        }

        // If we are already establishing a connection with the sender of this
        // signal, forward it to the corresponding connector.
        else if (this._connectors[msg.senderId]) {
            this._connectors[msg.senderId].onSignal(payload);
        }

        // If none of the above conditions is met, the signal is invalid and we discard it.
    }

    _onConnection(conn, signalId) {
        // Clear the connect timeout.
        this._timers.clearTimeout(`connect_${signalId}`);

        // Clean up when this connection closes.
        conn.on('close', () => this._onClose(signalId));

        // Tell listeners about the new connection.
        this.fire('connection', conn);
    }

    _onClose(signalId) {
        delete this._connectors[signalId];
        this._timers.clearTimeout(`connect_${signalId}`);
    }
}
WebRtcConnector.CONNECT_TIMEOUT = 5000; // ms
Class.register(WebRtcConnector);

class PeerConnector extends Observable {
    constructor(config, signalChannel, signalId, peerAddress) {
        super();
        this._signalChannel = signalChannel;
        this._signalId = signalId;
        this._peerAddress = peerAddress; // null for inbound connections

        this._nonce = NumberUtils.randomUint32();

        this._rtcConnection = new RTCPeerConnection(config);
        this._rtcConnection.onicecandidate = e => this._onIceCandidate(e);

        this._lastIceCandidate = null;
    }

    onSignal(signal) {
        if (signal.sdp) {
            // Validate that the signalId given in the session description matches
            // the advertised signalId.
            const signalId = WebRtcUtils.sdpToSignalId(signal.sdp);
            if (signalId !== this._signalId) {
                // TODO what to do here?
                Log.e(PeerConnector, `Invalid remote description received: expected signalId ${this._signalId}, got {signalId}`);
                return;
            }

            this._rtcConnection.setRemoteDescription(new RTCSessionDescription(signal))
                .then(() => {
                    if (signal.type === 'offer') {
                        this._rtcConnection.createAnswer(this._onDescription.bind(this), this._errorLog);
                    }
                })
                .catch(e => e);
        } else if (signal.candidate) {
            this._lastIceCandidate = new RTCIceCandidate(signal);
            this._rtcConnection.addIceCandidate(this._lastIceCandidate)
                .catch(e => e);
        }
    }

    _signal(signal) {
        this._signalChannel.signal(
            NetworkConfig.myPeerAddress().signalId,
            this._signalId,
            this._nonce,
            Network.SIGNAL_TTL_INITIAL,
            0, /*flags*/
            BufferUtils.fromAscii(JSON.stringify(signal))
        );
    }

    _onIceCandidate(event) {
        if (event.candidate !== null) {
            this._signal(event.candidate);
        }
    }

    _onDescription(description) {
        this._rtcConnection.setLocalDescription(description, () => {
            this._signal(description);
        }, this._errorLog);
    }

    _onDataChannel(event) {
        const channel = event.channel || event.target;

        // There is no API to get the remote IP address. As a crude heuristic, we parse the IP address
        // from the last ICE candidate seen before the connection was established.
        // TODO Can we improve this?
        let netAddress = null;
        if (this._lastIceCandidate) {
            try {
                netAddress = WebRtcUtils.candidateToNetAddress(this._lastIceCandidate);
            } catch(e) {
                Log.w(PeerConnector, `Failed to parse IP from ICE candidate: ${this._lastIceCandidate}`);
            }
        } else {
            // XXX Why does this happen?
            Log.w(PeerConnector, 'No ICE candidate seen for inbound connection');
        }

        const conn = new PeerConnection(channel, Protocol.RTC, netAddress, this._peerAddress);
        this.fire('connection', conn);
    }

    _errorLog(error) {
        Log.e(PeerConnector, error);
    }

    get nonce() {
        return this._nonce;
    }

    get peerAddress() {
        return this._peerAddress;
    }
}
Class.register(PeerConnector);

class OutboundPeerConnector extends PeerConnector {
    constructor(config, peerAddress, signalChannel) {
        super(config, signalChannel, peerAddress.signalId, peerAddress);
        this._peerAddress = peerAddress;

        // Create offer.
        const channel = this._rtcConnection.createDataChannel('data-channel');
        channel.binaryType = 'arraybuffer';
        channel.onopen = e => this._onDataChannel(e);
        this._rtcConnection.createOffer(this._onDescription.bind(this), this._errorLog);
    }
}
Class.register(OutboundPeerConnector);

class InboundPeerConnector extends PeerConnector {
    constructor(config, signalChannel, signalId, offer) {
        super(config, signalChannel, signalId, null);
        this._rtcConnection.ondatachannel = e => this._onDataChannel(e);
        this.onSignal(offer);
    }
}
Class.register(InboundPeerConnector);

class WebRtcUtils {
    static sdpToSignalId(sdp) {
        return sdp
            .match('fingerprint:sha-256(.*)\r\n')[1]     // parse fingerprint
            .replace(/:/g, '')                           // replace colons
            .slice(1, 33);                               // truncate hash to 16 bytes
    }

    static candidateToNetAddress(candidate) {
        // TODO XXX Ad-hoc parsing of candidates - Improve!
        const parts = candidate.candidate.split(' ');
        if (parts.length < 6) {
            return null;
        }
        return NetAddress.fromIP(parts[4]);
    }
}
Class.register(WebRtcUtils);

class WebSocketConnector extends Observable {
    constructor() {
        super();
        this._timers = new Timers();
    }

    connect(peerAddress) {
        if (peerAddress.protocol !== Protocol.WS) throw 'Malformed peerAddress';

        const timeoutKey = `connect_${peerAddress}`;
        if (this._timers.timeoutExists(timeoutKey)) {
            Log.w(WebSocketConnector, `Already connecting to ${peerAddress}`);
            return false;
        }

        const ws = new WebSocket(`wss://${peerAddress.host}:${peerAddress.port}`);
        ws.onopen = () => {
            this._timers.clearTimeout(timeoutKey);

            // There is no way to determine the remote IP ... thanks for nothing, WebSocket API.
            const conn = new PeerConnection(ws, Protocol.WS, /*netAddress*/ null, peerAddress);
            this.fire('connection', conn);
        };
        ws.onerror = e => {
            this._timers.clearTimeout(timeoutKey);
            this.fire('error', peerAddress, e);
        };

        this._timers.setTimeout(timeoutKey, () => {
            this._timers.clearTimeout(timeoutKey);

            // We don't want to fire the error event again if the websocket
            // connect fails at a later time.
            ws.onerror = null;

            // If the connection succeeds after we have fired the error event,
            // close it.
            ws.onopen = () => {
                Log.w(WebSocketConnector, `Connection to ${peerAddress} succeeded after timeout - closing it`);
                ws.close();
            };

            this.fire('error', peerAddress, 'timeout');
        }, WebSocketConnector.CONNECT_TIMEOUT);

        return true;
    }
}
WebSocketConnector.CONNECT_TIMEOUT = 1000 * 5; // 5 seconds
Class.register(WebSocketConnector);

class Services {
    // XXX Temporary stub, needs to be configurable later on.
    static myServices() {
        // Needs to be != 0 in order to be discoverable by peers.
        return Services.DEFAULT;
    }

    // Used for filtering peer addresses by services.
    static myServiceMask() {
        return 0xffffffff;
    }
}
Services.DEFAULT = 1;
Class.register(Services);

class Synchronizer extends Observable {
    constructor() {
        super();
        this._queue = [];
        this._working = false;
    }

    push(fn, resolve, error) {
        this._queue.push({fn: fn, resolve: resolve, error: error});
        if (!this._working) {
            this._doWork();
        }
    }

    async _doWork() {
        this._working = true;
        this.fire('work-start', this);

        while (this._queue.length) {
            const job = this._queue.shift();
            try {
                const result = await job.fn();
                job.resolve(result);
            } catch (e) {
                if (job.error) job.error(e);
            }
        }

        this._working = false;
        this.fire('work-end', this);
    }

    get working() {
        return this._working;
    }
}
Class.register(Synchronizer);

class Timers {
    constructor() {
        this._timeouts = {};
        this._intervals = {};
    }

    setTimeout(key, fn, waitTime) {
        if (this._timeouts[key]) throw 'Duplicate timeout for key ' + key;
        this._timeouts[key] = setTimeout(fn, waitTime);
    }

    clearTimeout(key) {
        clearTimeout(this._timeouts[key]);
        delete this._timeouts[key];
    }

    resetTimeout(key, fn, waitTime) {
        clearTimeout(this._timeouts[key]);
        this._timeouts[key] = setTimeout(fn, waitTime);
    }

    timeoutExists(key) {
        return this._timeouts[key] !== undefined;
    }

    setInterval(key, fn, intervalTime) {
        if (this._intervals[key]) throw 'Duplicate interval for key ' + key;
        this._intervals[key] = setInterval(fn, intervalTime);
    }

    clearInterval(key) {
        clearInterval(this._intervals[key]);
        delete this._intervals[key];
    }

    resetInterval(key, fn, intervalTime) {
        clearInterval(this._intervals[key]);
        this._intervals[key] = setInterval(fn, intervalTime);
    }

    intervalExists(key) {
        return this._intervals[key] !== undefined;
    }

    clearAll() {
        for (const key in this._timeouts) {
            this.clearTimeout(key);
        }
        for (const key in this._intervals) {
            this.clearInterval(key);
        }
    }
}
Class.register(Timers);

class Version {
    static isCompatible(code) {
        return code === Version.CODE;
    }
}
Version.CODE = 1;
Class.register(Version);

class ArrayUtils {
    static randomElement(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    static subarray(uintarr, begin, end) {
        function clamp(v, min, max) { return v < min ? min : v > max ? max : v; }

        if (begin === undefined) { begin = 0; }
        if (end === undefined) { end = uintarr.byteLength; }

        begin = clamp(begin, 0, uintarr.byteLength);
        end = clamp(end, 0, uintarr.byteLength);

        let len = end - begin;
        if (len < 0) {
            len = 0;
        }

        return new Uint8Array(uintarr.buffer, uintarr.byteOffset + begin, len);
    }
}
Class.register(ArrayUtils);

class HashMap {
    constructor(fnHash) {
        this._map = {};
        this._fnHash = fnHash || HashMap._hash;
    }

    static _hash(o) {
        return o.hashCode ? o.hashCode() : o.toString();
    }

    get(key) {
        return this._map[this._fnHash(key)];
    }

    put(key, value) {
        this._map[this._fnHash(key)] = value;
    }

    remove(key) {
        delete this._map[this._fnHash(key)];
    }

    clear() {
        this._map = {};
    }

    contains(key) {
        return this.get(key) !== undefined;
    }

    keys() {
        return Object.keys(this._map);
    }

    values() {
        return Object.values(this._map);
    }

    get length() {
        // XXX inefficient
        return Object.keys(this._map).length;
    }
}
Class.register(HashMap);

class HashSet {
    constructor(fnHash) {
        this._map = {};
        this._fnHash = fnHash || HashSet._hash;
    }

    static _hash(o) {
        return o.hashCode ? o.hashCode() : o.toString();
    }

    add(value) {
        this._map[this._fnHash(value)] = value;
    }

    get(value) {
        return this._map[this._fnHash(value)];
    }

    remove(value) {
        delete this._map[this._fnHash(value)];
    }

    clear() {
        this._map = {};
    }

    contains(value) {
        return this._map[this._fnHash(value)] !== undefined;
    }

    values() {
        return Object.values(this._map);
    }

    get length() {
        // XXX inefficient
        return Object.keys(this._map).length;
    }
}
Class.register(HashSet);

class Queue {
    constructor(fnHash) {
        this._queue = [];
        this._fnHash = fnHash || Queue._hash;
    }

    static _hash(o) {
        return o.hashCode ? o.hashCode() : o.toString();
    }

    enqueue(value) {
        this._queue.push(value);
    }

    dequeue() {
        return this._queue.shift();
    }

    indexOf(value) {
        for (let i = 0; i <= this._queue.length; ++i) {
            if (this._fnHash(value) === this._fnHash(this._queue[i])) {
                return i;
            }
        }
        return -1;
    }

    remove(value) {
        const index = this.indexOf(value);
        if (index > -1) {
            this._queue.splice(index, 1);
        }
    }

    dequeueUntil(value) {
        const index = this.indexOf(value);
        if (index > -1) {
            return this._queue.splice(0, index + 1);
        }
        return [];
    }

    clear() {
        this._queue = [];
    }

    values() {
        return this._queue;
    }

    get length() {
        return this._queue.length;
    }
}
Class.register(Queue);

class IndexedArray {
    constructor(array, ignoreDuplicates) {
        this._array = array || new Array();
        this._ignoreDuplicates = ignoreDuplicates;

        this._index = {};
        this._buildIndex();

        return new Proxy(this._array, this);
    }

    _buildIndex() {
        for (let i = 0; i < this._array.length; ++i) {
            this._index[this._array[i]] = i;
        }
    }

    get(target, key) {
        if (typeof key == 'symbol') {
            return undefined;
        }

        // Forward index access (e.g. arr[5]) to underlying array.
        if (!isNaN(key)) {
            return target[key];
        }

        // Forward "public" properties of IndexedArray to 'this' (push(), pop() ...).
        if (this[key] && key[0] !== '_') {
            return this[key].bind ? this[key].bind(this) : this[key];
        }

        return undefined;
    }

    // TODO index access set, e.g. arr[5] = 42

    push(value) {
        if (this._index[value] !== undefined) {
            if (!this._ignoreDuplicates) throw 'IndexedArray.push() failed - value ' + value + ' already exists';
            return this._index[value];
        }

        const length = this._array.push(value);
        this._index[value] = length - 1;
        return length;
    }

    pop() {
        const value = this._array.pop();
        delete this._index[value];
        return value;
    }

    remove(value) {
        const index = this._index[value];
        if (index !== undefined) {
            delete this._array[this._index[value]];
            delete this._index[value];
            return index;
        }
        return -1;
    }

    indexOf(value) {
        return this._index[value] >= 0 ? this._index[value] : -1;
    }

    isEmpty() {
        return Object.keys(this._index).length == 0;
    }

    slice(start, end) {
        const arr = this._array.slice(start, end);
        return new IndexedArray(arr, this._ignoreDuplicates);
    }

    get length() {
        return this._array.length;
    }

    get array() {
        return this._array;
    }
}
Class.register(IndexedArray);

class BufferUtils {
    static toAscii(buffer) {
        return String.fromCharCode.apply(null, new Uint8Array(buffer));
    }

    static fromAscii(string) {
        var buf = new Uint8Array(string.length);
        for (let i = 0; i < string.length; ++i) {
            buf[i] = string.charCodeAt(i);
        }
        return buf;
    }

    static toBase64(buffer) {
        return btoa(String.fromCharCode(...new Uint8Array(buffer)));
    }

    static fromBase64(base64) {
        return new SerialBuffer(Uint8Array.from(atob(base64), c => c.charCodeAt(0)));
    }

    static toBase64Url(buffer) {
        return BufferUtils.toBase64(buffer).replace(/\//g, '_').replace(/\+/g, '-').replace(/=/g, '.');
    }

    static fromBase64Url(base64) {
        return new SerialBuffer(Uint8Array.from(atob(base64.replace(/_/g, '/').replace(/-/g, '+').replace(/\./g, '=')), c => c.charCodeAt(0)));
    }

    static toHex(buffer) {
        return Array.prototype.map.call(buffer, x => ('00' + x.toString(16)).slice(-2)).join('');
    }

    static fromHex(hex) {
        if (hex.length % 2 !== 0) return null;
        return new SerialBuffer(Uint8Array.from(hex.match(/.{2}/g), byte => parseInt(byte, 16)));
    }

    static concatTypedArrays(a, b) {
        const c = new (a.constructor)(a.length + b.length);
        c.set(a, 0);
        c.set(b, a.length);
        return c;
    }

    static equals(a, b) {
        if (a.length !== b.length) return false;
        const viewA = new Uint8Array(a);
        const viewB = new Uint8Array(b);
        for (let i = 0; i < a.length; i++) {
            if (viewA[i] !== viewB[i]) return false;
        }
        return true;
    }
}
Class.register(BufferUtils);

class SerialBuffer extends Uint8Array {
    constructor(arg) {
        super(arg);
        this._view = new DataView(this.buffer);
        this._readPos = 0;
        this._writePos = 0;
    }

    subarray(start, end) {
        return ArrayUtils.subarray(this, start, end);
    }

    get readPos() {
        return this._readPos;
    }
    set readPos(value) {
        if (value < 0 || value > this.byteLength) throw `Invalid readPos ${value}`;
        this._readPos = value;
    }

    get writePos() {
        return this._writePos;
    }
    set writePos(value) {
        if (value < 0 || value > this.byteLength) throw `Invalid writePos ${value}`;
        this._writePos = value;
    }

    read(length) {
        const value = this.subarray(this._readPos, this._readPos + length);
        this._readPos += length;
        return value;
    }
    write(array) {
        this.set(array, this._writePos);
        this._writePos += array.byteLength;
    }

    readUint8() {
        return this._view.getUint8(this._readPos++);
    }
    writeUint8(value) {
        this._view.setUint8(this._writePos++, value);
    }

    readUint16() {
        const value = this._view.getUint16(this._readPos);
        this._readPos += 2;
        return value;
    }
    writeUint16(value) {
        this._view.setUint16(this._writePos, value);
        this._writePos += 2;
    }

    readUint32() {
        const value = this._view.getUint32(this._readPos);
        this._readPos += 4;
        return value;
    }
    writeUint32(value) {
        this._view.setUint32(this._writePos, value);
        this._writePos += 4;
    }

    readUint64() {
        const value = this._view.getFloat64(this._readPos);
        if (!NumberUtils.isUint64(value)) throw 'Malformed value';
        this._readPos += 8;
        return value;
    }
    writeUint64(value) {
        if (!NumberUtils.isUint64(value)) throw 'Malformed value';
        this._view.setFloat64(this._writePos, value);
        this._writePos += 8;
    }

    readFloat64() {
        const value = this._view.getFloat64(this._readPos);
        this._readPos += 8;
        return value;

    }
    writeFloat64(value) {
        this._view.setFloat64(this._writePos, value);
        this._writePos += 8;
    }

    readString(length) {
        const bytes = this.read(length);
        return BufferUtils.toAscii(bytes);
    }
    writeString(value, length) {
        if (StringUtils.isMultibyte(value) || value.length !== length) throw 'Malformed value/length';
        const bytes = BufferUtils.fromAscii(value);
        this.write(bytes);
    }

    readPaddedString(length) {
        const bytes = this.read(length);
        let i = 0;
        while (i < length && bytes[i] !== 0x0) i++;
        const view = new Uint8Array(bytes.buffer, bytes.byteOffset, i);
        return BufferUtils.toAscii(view);
    }
    writePaddedString(value, length) {
        if (StringUtils.isMultibyte(value) || value.length > length) throw 'Malformed value/length';
        const bytes = BufferUtils.fromAscii(value);
        this.write(bytes);
        const padding = length - bytes.byteLength;
        this.write(new Uint8Array(padding));
    }

    readVarLengthString() {
        const length = this.readUint8();
        if (this._readPos + length > this.length) throw 'Malformed length';
        const bytes = this.read(length);
        return BufferUtils.toAscii(bytes);
    }
    writeVarLengthString(value) {
        if (StringUtils.isMultibyte(value) || !NumberUtils.isUint8(value.length)) throw 'Malformed value';
        const bytes = BufferUtils.fromAscii(value);
        this.writeUint8(bytes.byteLength);
        this.write(bytes);
    }
}
Class.register(SerialBuffer);

class Crypto {
    static get lib() { return CryptoLib.instance; }

    // Signature implementation using Ed25519 via tweetnacl
    // tweetnacl is rather slow, so not using this for now
    //
    // static get curve() { return require('tweetnacl'); }
    //
    // static get publicKeySize() {
    //     return Crypto.curve.sign.publicKeyLength;
    // }
    //
    // static get publicKeyType() {
    //     return Uint8Array;
    // }
    //
    // static publicKeySerialize(obj) {
    //     return obj;
    // }
    //
    // static publicKeyUnserialize(arr) {
    //     return arr;
    // }
    //
    // static publicKeyDerive(privateKey) {
    //     return Crypto.keyPairPublic(Crypto.keyPairDerive(privateKey));
    // }
    //
    // static get privateKeySize() {
    //     return Crypto.curve.sign.secretKeyLength;
    // }
    //
    // static get privateKeyType() {
    //     return Uint8Array;
    // }
    //
    // static privateKeySerialize(obj) {
    //     return obj;
    // }
    //
    // static privateKeyUnserialize(arr) {
    //     return arr;
    // }
    //
    // static privateKeyGenerate() {
    //     return Crypto.keyPairPrivate(Crypto.keyPairGenerate());
    // }
    //
    // static get keyPairType() {
    //     return Object;
    // }
    //
    // static keyPairGenerate() {
    //     return Crypto.curve.sign.keyPair();
    // }
    //
    // static keyPairDerive(privateKey) {
    //     return Crypto.curve.sign.keyPair.fromSecretKey(privateKey);
    // }
    //
    // static keyPairPrivate(obj) {
    //     return obj.secretKey;
    // }
    //
    // static keyPairPublic(obj) {
    //     return obj.publicKey;
    // }
    //
    // static signatureCreate(privateKey, data) {
    //     return Crypto.curve.sign.detached(data, privateKey);
    // }
    //
    // static signatureVerify(publicKey, data, signature) {
    //     return Crypto.curve.sign.detached.verify(data, signature, publicKey);
    // }
    //
    // static signatureSerialize(obj) {
    //     return obj;
    // }
    //
    // static signatureUnserialize(arr) {
    //     return arr;
    // }
    //
    // static get signatureSize() {
    //     return Crypto.curve.sign.signatureLength;
    // }
    //
    // static get signatureType() {
    //     return Uint8Array;
    // }

    // Signature implementation using P-256/SHA-256 with WebCrypto API
    static get _keyConfig() {
        return {name: 'ECDSA', namedCurve: 'P-256'};
    }

    static get _signConfig() {
        return {name: 'ECDSA', hash: 'SHA-256'};
    }

    static get publicKeySize() {
        return 64;
    }

    static get publicKeyType() {
        return Object;
    }

    static publicKeySerialize(obj) {
        if (obj.raw.length === 64) {
            return obj.raw;
        }  else {
            return obj.raw.slice(1);
        }
    }

    static publicKeyUnserialize(arr) {
        return {raw: arr};
    }

    static async _publicKeyNative(obj) {
        if (!obj._native) {
            let arr;
            if (obj.raw.length === 64) {
                arr = new Uint8Array(65);
                arr[0] = 4;
                arr.set(obj.raw, 1);
            } else {
                arr = obj.raw;
            }
            obj._native = await Crypto.lib.importKey('raw', arr, Crypto._keyConfig, true, ['verify']);
        }
        return obj._native;
    }

    static async publicKeyDerive(privateKey) {
        return Crypto.keyPairPublic(await Crypto.keyPairDerive(privateKey));
    }

    static get privateKeySize() {
        return 96;
    }

    static get privateKeyType() {
        return Object;
    }

    static _jwk_serialize(jwk) {
        const fromUri64 = function (u64) {
            return Array.from(atob(u64.replace(/-/g, '+').replace(/_/g, '/') + '='), c => c.charCodeAt(0));
        };
        return new Uint8Array(fromUri64(jwk.d).concat(fromUri64(jwk.x)).concat(fromUri64(jwk.y)));
    }

    static _jwk_unserialize(arr) {
        const toUri64 = function (arr) {
            return btoa(String.fromCharCode(...arr)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
        };

        return {
            crv: 'P-256',
            d: toUri64(Array.prototype.slice.call(arr, 0, 32)),
            ext: true,
            key_ops: ['sign'],
            kty: 'EC',
            x: toUri64(Array.prototype.slice.call(arr, 32, 64)),
            y: toUri64(Array.prototype.slice.call(arr, 64)),
        };
    }

    static privateKeySerialize(obj) {
        return Crypto._jwk_serialize(obj.jwk);
    }

    static privateKeyUnserialize(arr) {
        return {jwk: Crypto._jwk_unserialize(arr)};
    }

    static async _privateKeyNative(obj) {
        if (!obj._native) {
            obj._native = await Crypto.lib.importKey('jwk', obj.jwk, Crypto._keyConfig, true, ['sign']);
        }
        return obj._native;
    }

    static async privateKeyGenerate() {
        return Crypto.keyPairPrivate(await Crypto.keyPairGenerate());
    }

    static get keyPairType() {
        return Object;
    }

    static async keyPairGenerate() {
        let key = await Crypto.lib.generateKey(Crypto._keyConfig, true, ['sign', 'verify']);
        return {
            secretKey: {
                _native: key.privateKey,
                jwk: await Crypto.lib.exportKey('jwk', key.privateKey)
            },
            publicKey: {
                _native: key.publicKey,
                raw: new Uint8Array(await Crypto.lib.exportKey('raw', key.publicKey)).subarray(1)
            }
        };
    }

    static keyPairDerive(privateKey) {
        return {
            secretKey: privateKey,
            publicKey: Crypto.publicKeyUnserialize(new Uint8Array(Array.prototype.slice.call(Crypto.privateKeySerialize(privateKey), 32)))
        };
    }

    static keyPairPrivate(obj) {
        return obj.secretKey;
    }

    static keyPairPublic(obj) {
        return obj.publicKey;
    }

    static async signatureCreate(privateKey, data) {
        return new Uint8Array(await Crypto.lib.sign(Crypto._signConfig, await Crypto._privateKeyNative(privateKey), data));
    }

    static async signatureVerify(publicKey, data, signature) {
        return Crypto.lib.verify(Crypto._signConfig, await Crypto._publicKeyNative(publicKey), signature, data);
    }

    static signatureSerialize(obj) {
        return obj;
    }

    static signatureUnserialize(arr) {
        return arr;
    }

    static get signatureSize() {
        return 64;
    }

    static get signatureType() {
        return Uint8Array;
    }

    // Light hash implementation using SHA-256 with WebCrypto API and fast-sha256 fallback
    //
    // static get sha256() { return require('fast-sha256'); }
    //
    // static async hashLight(arr) {
    //     if (Crypto.lib) {
    //         return new Uint8Array(await Crypto.lib.digest('SHA-256', arr));
    //     } else {
    //         return new Promise((res) => {
    //             // Performs badly, but better than a dead UI
    //             setTimeout(() => {
    //                 res(new Crypto.sha256.Hash().update(arr).digest());
    //             });
    //         });
    //     }
    // }

    // Light hash implementation using SHA-256 with WebCrypto API
    static async hashLight(arr) {
        return new Uint8Array(await Crypto.lib.digest('SHA-256', arr));
    }

    // Hard hash implementation using double light hash
    //static async hashHard(arr) {
    //    return Crypto.hashLight(await Crypto.hashLight(arr));
    //}

    // Hard hash implementation using light hash
    static async hashHard(arr) {
        if (Crypto.lib._nimiq_callDigestDelayedWhenMining) {
            return await new Promise((resolve, error) => {
                window.setTimeout(() => {
                    Crypto.hashLight(arr).then(resolve);
                });
            });
        } else {
            return Crypto.hashLight(arr);
        }
    }

    static get hashSize() {
        return 32;
    }

    static get hashType() {
        return Uint8Array;
    }
}
Class.register(Crypto);

class CRC32 {
    static _createTable () {
        let b;
        const table = [];

        for (let j = 0; j < 256; ++j) {
            b = j;
            for (let k = 0; k < 8; ++k) {
                b = b & 1 ? CRC32._POLYNOMIAL ^ (b >>> 1) : b >>> 1;
            }
            table[j] = b >>> 0;
        }
        return table;
    }

    static compute(buf) {
        if (!CRC32._table) CRC32._table = CRC32._createTable();
        if (!CRC32._hex_chars) CRC32._hex_chars = '0123456789abcdef'.split('');

        const message = new Uint8Array(buf);
        const initialValue = -1;

        let crc = initialValue;
        let hex = '';

        for (let i = 0; i < message.length; ++i) {
            crc = CRC32._table[(crc ^ message[i]) & 0xFF] ^ (crc >>> 8);
        }
        crc ^= initialValue;

        hex += CRC32._hex_chars[(crc >> 28) & 0x0F] + CRC32._hex_chars[(crc >> 24) & 0x0F] +
            CRC32._hex_chars[(crc >> 20) & 0x0F] + CRC32._hex_chars[(crc >> 16) & 0x0F] +
            CRC32._hex_chars[(crc >> 12) & 0x0F] + CRC32._hex_chars[(crc >> 8) & 0x0F] +
            CRC32._hex_chars[(crc >> 4) & 0x0F] + CRC32._hex_chars[crc & 0x0F];

        return parseInt(hex, 16);
    }
}
CRC32._table = null;
CRC32._hex_chars = null;
CRC32._POLYNOMIAL = 0xEDB88320;
Class.register(CRC32);

class ObjectDB extends TypedDB {
    constructor(tableName, type) {
        super(tableName, type);
    }

    async key(obj) {
        if (obj.hash) return (await obj.hash()).toBase64();
        if (obj.hashCode) return obj.hashCode();
        throw 'ObjectDB requires objects with a .hash() or .hashCode() method';
    }

    async get(key) {
        return await TypedDB.prototype.getObject.call(this, key);
    }

    async put(obj) {
        const key = await this.key(obj);
        await TypedDB.prototype.putObject.call(this, key, obj);
        return key;
    }

    async remove(obj) {
        const key = await this.key(obj);
        await TypedDB.prototype.remove.call(this, key);
        return key;
    }

    async transaction() {
        const tx = await TypedDB.prototype.transaction.call(this);
        const that = this;

        tx.get = key => tx.getObject(key);
        tx.put = async function(obj) {
            const key = await that.key(obj);
            await tx.putObject(key, obj);
            return key;
        };
        const superRemove = tx.remove.bind(tx);
        tx.remove = async function(obj) {
            const key = await that.key(obj);
            await superRemove(key);
            return key;
        };

        return tx;
    }
}
Class.register(ObjectDB);

class TypedDBTransaction {
    constructor(db) {
        this._db = db;
        this._objects = {};
        this._strings = {};
        this._deletions = {};
    }

    commit() {
        return this._db.nativeTransaction().then( tx => new Promise( (resolve, reject) => {
            tx.open();
            tx.on('complete', () => {
                if (this._db.updateCache && this._db.flushCache) {
                    this._db.updateCache(this._objects);
                    this._db.updateCache(this._strings);
                    this._db.flushCache(Object.keys(this._deletions));
                }

                resolve(true);
            });
            tx.on('error', e => reject(e));

            for (const key in this._objects) {
                // FIXME Firefox seems to hang here!!!
                tx.putObject(key, this._objects[key]);
            }

            for (const key in this._strings) {
                tx.putString(key, this._strings[key]);
            }

            for (const key in this._deletions) {
                tx.remove(key);
            }

            tx.commit();
        }));
    }

    async getObject(key) {
        if (this._deletions[key]) return undefined;
        if (this._objects[key] !== undefined) return this._objects[key];
        return this._db.getObject(key);
    }

    putObject(key, value) {
        this._objects[key] = value;
        delete this._deletions[key];
    }

    async getString(key) {
        if (this._deletions[key]) return undefined;
        if (this._strings[key] !== undefined) return this._strings[key];
        return this._db.getString(key);
    }

    putString(key, value) {
        this._strings[key] = value;
        delete this._deletions[key];
    }

    remove(key) {
        this._deletions[key] = true;
        delete this._objects[key];
        delete this._strings[key];
    }
}
Class.register(TypedDBTransaction);

class NumberUtils {
    static isUint8(val) {
        return Number.isInteger(val)
            && val >= 0 && val <= NumberUtils.UINT8_MAX;
    }

    static isUint16(val) {
        return Number.isInteger(val)
            && val >= 0 && val <= NumberUtils.UINT16_MAX;
    }

    static isUint32(val) {
        return Number.isInteger(val)
            && val >= 0 && val <= NumberUtils.UINT32_MAX;
    }

    static isUint64(val) {
        return Number.isInteger(val)
            && val >= 0 && val <= NumberUtils.UINT64_MAX;
    }

    static randomUint32() {
        return Math.floor(Math.random() * (NumberUtils.UINT32_MAX + 1));
    }

    static randomUint64() {
        return Math.floor(Math.random() * (NumberUtils.UINT64_MAX + 1));
    }
}

NumberUtils.UINT8_MAX = 255;
NumberUtils.UINT16_MAX = 65535;
NumberUtils.UINT32_MAX = 4294967295;
NumberUtils.UINT64_MAX = Number.MAX_SAFE_INTEGER;
//Object.freeze(NumberUtils);
Class.register(NumberUtils);

class PlatformUtils {
    static isBrowser() {
        return typeof window !== "undefined";
    }

    static supportsWebRTC() {
        return PlatformUtils.isBrowser() && !!(window.RTCPeerConnection || window.webkitRTCPeerConnection);
    }
}
Class.register(PlatformUtils);

class StringUtils {
    static isMultibyte(str) {
        return /[\uD800-\uDFFF]/.test(str);
    }
}
Class.register(StringUtils);

class Policy {
    static get SATOSHIS_PER_COIN() {
        return 1e8;
    }

    static get BLOCK_TIME() {
        return 60; // Seconds
    }

    static get BLOCK_REWARD() {
        return Policy.coinsToSatoshis(50);
    }

    static get BLOCK_SIZE_MAX() {
        return 1e6; // 1 MB
    }

    static get BLOCK_TARGET_MAX() {
        return BlockUtils.compactToTarget(0x1f00ffff); // 16 zero bits, bitcoin uses 32 (0x1d00ffff)
    }

    static get DIFFICULTY_ADJUSTMENT_BLOCKS() {
        return 10; // Blocks
    }

    static coinsToSatoshis(coins) {
        return Math.round(coins * Policy.SATOSHIS_PER_COIN);
    }

    static satoshisToCoins(satoshis) {
        return satoshis / Policy.SATOSHIS_PER_COIN;
    }
}
Class.register(Policy);

class Primitive {
    constructor(arg, type, length) {
        if (type && !(arg instanceof type)) throw 'Primitive: Invalid type';
        if (length && arg.length && arg.length !== length) throw 'Primitive: Invalid length';
        this._obj = arg;
    }

    equals(o) {
        return o instanceof Primitive && BufferUtils.equals(this.serialize(), o.serialize());
    }

    serialize() {
        throw 'Primitive: serialize() not implemented';
    }

    toString() {
        return this.toBase64();
    }

    toBase64() {
        return BufferUtils.toBase64(this.serialize());
    }

    toHex() {
        return BufferUtils.toHex(this.serialize());
    }
}
Class.register(Primitive);

class Hash extends Primitive {
    constructor(arg) {
        if (arg === null) {
            arg = new Uint8Array(Crypto.hashSize);
        }
        super(arg, Crypto.hashType, Crypto.hashSize);
    }

    static async light(arr) {
        return new Hash(await Crypto.hashLight(arr));
    }

    static async hard(arr) {
        return new Hash(await Crypto.hashHard(arr));
    }

    static unserialize(buf) {
        return new Hash(buf.read(Crypto.hashSize));
    }

    serialize(buf) {
        buf = buf || new SerialBuffer(this.serializedSize);
        buf.write(this._obj);
        return buf;
    }

    subarray(begin, end) {
        return this._obj.subarray(begin, end);
    }

    get serializedSize() {
        return Crypto.hashSize;
    }

    equals(o) {
        return o instanceof Hash && super.equals(o);
    }

    static fromBase64(base64) {
        return new Hash(BufferUtils.fromBase64(base64));
    }

    static fromHex(hex) {
        return new Hash(BufferUtils.fromHex(hex));
    }

    static isHash(o) {
        return o instanceof Hash;
    }
}
Class.register(Hash);

class PrivateKey extends Primitive {
    constructor(arg) {
        super(arg, Crypto.privateKeyType, Crypto.privateKeySize);
    }

    static async generate() {
        return new PrivateKey(await Crypto.privateKeyGenerate());
    }

    static unserialize(buf) {
        return new PrivateKey(Crypto.privateKeyUnserialize(buf.read(Crypto.privateKeySize)));
    }

    serialize(buf) {
        buf = buf || new SerialBuffer(this.serializedSize);
        buf.write(Crypto.privateKeySerialize(this._obj));
        return buf;
    }

    get serializedSize() {
        return Crypto.privateKeySize;
    }

    equals(o) {
        return o instanceof PrivateKey && super.equals(o);
    }
}

Class.register(PrivateKey);

class PublicKey extends Primitive {
    constructor(arg) {
        super(arg, Crypto.publicKeyType, Crypto.publicKeySize);
    }

    static async derive(privateKey) {
        return new PublicKey(await Crypto.publicKeyDerive(privateKey._obj));
    }

    static unserialize(buf) {
        return new PublicKey(Crypto.publicKeyUnserialize(buf.read(Crypto.publicKeySize)));
    }

    serialize(buf) {
        buf = buf || new SerialBuffer(this.serializedSize);
        buf.write(Crypto.publicKeySerialize(this._obj));
        return buf;
    }

    get serializedSize() {
        return Crypto.publicKeySize;
    }

    equals(o) {
        return o instanceof PublicKey && super.equals(o);
    }

    async toAddress() {
        return new Address((await Hash.light(this.serialize())).subarray(0, 20));
    }
}
Class.register(PublicKey);

class KeyPair extends Primitive {
    constructor(arg) {
        super(arg, Crypto.keyPairType);
    }

    static async generate() {
        return new KeyPair(await Crypto.keyPairGenerate());
    }

    static async derive(privateKey) {
        return new KeyPair(await Crypto.keyPairDerive(privateKey._obj));
    }

    static unserialize(buf) {
        return new KeyPair(Crypto.keyPairDerive(Crypto.privateKeyUnserialize(buf.read(Crypto.privateKeySize))));
    }

    static fromHex(hexBuf) {
        return this.unserialize(BufferUtils.fromHex(hexBuf));
    }

    serialize(buf) {
        return this.privateKey.serialize(buf);
    }

    get privateKey() {
        return this._privateKey || (this._privateKey = new PrivateKey(Crypto.keyPairPrivate(this._obj)));
    }

    get publicKey() {
        return this._publicKey || (this._publicKey = new PublicKey(Crypto.keyPairPublic(this._obj)));
    }

    get serializedSize() {
        return this.privateKey.serializedSize;
    }

    equals(o) {
        return o instanceof KeyPair && super.equals(o);
    }
}

Class.register(KeyPair);

class Signature extends Primitive {
    constructor(arg) {
        super(arg, Crypto.signatureType, Crypto.signatureSize);
    }

    static async create(privateKey, data) {
        return new Signature(await Crypto.signatureCreate(privateKey._obj, data));
    }

    static unserialize(buf) {
        return new Signature(Crypto.signatureUnserialize(buf.read(Crypto.signatureSize)));
    }

    serialize(buf) {
        buf = buf || new SerialBuffer(this.serializedSize);
        buf.write(Crypto.signatureSerialize(this._obj));
        return buf;
    }

    get serializedSize() {
        return Crypto.signatureSize;
    }

    verify(publicKey, data) {
        return Crypto.signatureVerify(publicKey._obj, data, this._obj);
    }

    equals(o) {
        return o instanceof Signature && super.equals(o);
    }
}
Class.register(Signature);

class Address extends Primitive {
    static get SERIALIZED_SIZE() {
        return 20;
    }

    constructor(arg) {
        super(arg, Uint8Array, Address.SERIALIZED_SIZE);
    }

    static unserialize(buf) {
        return new Address(buf.read(Address.SERIALIZED_SIZE));
    }

    serialize(buf) {
        buf = buf || new SerialBuffer(this.serializedSize);
        buf.write(this._obj);
        return buf;
    }

    subarray(begin, end) {
        return this._obj.subarray(begin, end);
    }

    get serializedSize() {
        return Address.SERIALIZED_SIZE;
    }

    equals(o) {
        return o instanceof Address
            && super.equals(o);
    }

    static fromBase64(base64) {
        return new Address(BufferUtils.fromBase64(base64));
    }

    static fromHex(hex) {
        return new Address(BufferUtils.fromHex(hex));
    }
}
Class.register(Address);

class Balance {
    constructor(value = 0, nonce = 0) {
        if (!NumberUtils.isUint64(value)) throw 'Malformed value';
        if (!NumberUtils.isUint32(nonce)) throw 'Malformed nonce';

        this._value = value;
        this._nonce = nonce;
    }

    static unserialize(buf) {
        let value = buf.readUint64();
        let nonce = buf.readUint32();
        return new Balance(value, nonce);
    }

    serialize(buf) {
        buf = buf || new SerialBuffer(this.serializedSize);
        buf.writeUint64(this._value);
        buf.writeUint32(this._nonce);
        return buf;
    }

    get serializedSize() {
        return /*value*/ 8
            + /*nonce*/ 4;
    }

    get value() {
        return this._value;
    }

    get nonce() {
        return this._nonce;
    }

    equals(o) {
        return o instanceof Balance
            && this._value === o.value
            && this._nonce === o.nonce;
    }
}
Balance.INITIAL = new Balance();
Class.register(Balance);

class Account {
    constructor(balance) {
        if (!balance || !(balance instanceof Balance)) throw 'Malformed balance';
        this._balance = balance;
    }

    static unserialize(buf) {
        // We currently only support one account type: Basic.
        const type = buf.readUint8();
        if (type !== Account.Type.BASIC) throw 'Malformed account type';

        const balance = Balance.unserialize(buf);
        return new Account(balance);
    }

    serialize(buf) {
        buf = buf || new SerialBuffer(this.serializedSize);
        buf.writeUint8(Account.Type.BASIC);
        this._balance.serialize(buf);
        return buf;
    }

    get serializedSize() {
        return /*type*/ 1
            + this._balance.serializedSize;
    }

    equals(o) {
        return o instanceof Account
            && this._balance.equals(o.balance);
    }

    toString() {
        return `BasicAccount{value=${this._balance.value}, nonce=${this._balance.nonce}}`;
    }

    get balance() {
        return this._balance;
    }
}
Account.INITIAL = new Account(Balance.INITIAL);
Account.Type = {};
Account.Type.BASIC = 0;
Class.register(Account);

class AccountsTreeNode {
    static terminalNode(prefix, account) {
        return new AccountsTreeNode(AccountsTreeNode.TERMINAL, prefix, account);
    }

    static branchNode(prefix, children) {
        return new AccountsTreeNode(AccountsTreeNode.BRANCH, prefix, children);
    }

    constructor(type, prefix = '', arg) {
        this._type = type;
        this._prefix = prefix;
        if (this.isBranch()) {
            this._children = arg;
        } else if (this.isTerminal()){
            this._account = arg;
        } else {
            throw `Invalid AccountsTreeNode type: ${type}`;
        }
    }

    static isTerminalType(type) {
        return type === AccountsTreeNode.TERMINAL;
    }

    static isBranchType(type) {
        return type === AccountsTreeNode.BRANCH;
    }


    static unserialize(buf) {
        const type = buf.readUint8();
        const prefix = buf.readVarLengthString();

        if (AccountsTreeNode.isTerminalType(type)) {
            // Terminal node
            const account = Account.unserialize(buf);
            return AccountsTreeNode.terminalNode(prefix, account);
        } else if (AccountsTreeNode.isBranchType(type)) {
            // Branch node
            const children = [];
            const childCount = buf.readUint8();
            for (let i = 0; i < childCount; ++i) {
                const childIndex = buf.readUint8();
                const child = BufferUtils.toBase64(buf.read(/*keySize*/ 32));
                children[childIndex] = child;
            }
            return AccountsTreeNode.branchNode(prefix, children);
        } else {
            throw `Invalid AccountsTreeNode type: ${type}`;
        }
    }

    serialize(buf) {
        buf = buf || new SerialBuffer(this.serializedSize);
        buf.writeUint8(this._type);
        buf.writeVarLengthString(this._prefix);

        if (this.isTerminal()) {
            // Terminal node
            this._account.serialize(buf);
        } else {
            // Branch node
            const childCount = this._children.reduce((count, val) => count + !!val, 0);
            buf.writeUint8(childCount);
            for (let i = 0; i < this._children.length; ++i) {
                if (this._children[i]) {
                    buf.writeUint8(i);
                    buf.write(BufferUtils.fromBase64(this._children[i]));
                }
            }
        }
        return buf;
    }

    get serializedSize() {
        let payloadSize;
        if (this.isTerminal()) {
            payloadSize = this._account.serializedSize;
        } else {
            // The children array contains undefined values for non existing children.
            // Only count existing ones.
            const childrenSize = this._children.reduce((count, val) => count + !!val, 0)
                * (/*keySize*/ 32 + /*childIndex*/ 1);
            payloadSize = /*childCount*/ 1 + childrenSize;
        }

        return /*type*/ 1
            + /*extra byte varLengthString prefix*/ 1
            + this._prefix.length
            + payloadSize;
    }

    getChild(prefix) {
        return this._children && this._children[this._getChildIndex(prefix)];
    }

    withChild(prefix, child) {
        let children = this._children.slice() || [];
        children[this._getChildIndex(prefix)] = child;
        return AccountsTreeNode.branchNode(this._prefix, children);
    }

    withoutChild(prefix) {
        let children = this._children.slice() || [];
        delete children[this._getChildIndex(prefix)];
        return AccountsTreeNode.branchNode(this._prefix, children);
    }

    hasChildren() {
        return this._children && this._children.some(child => !!child);
    }

    hasSingleChild() {
        return this._children && this._children.reduce((count, val) => count + !!val, 0) === 1;
    }

    getFirstChild() {
        if (!this._children) {
            return undefined;
        }
        return this._children.find(child => !!child);
    }

    getChildren() {
        if (!this._children) {
            return undefined;
        }
        return this._children.filter(child => !!child);
    }

    get account() {
        return this._account;
    }

    get prefix() {
        return this._prefix;
    }

    set prefix(value) {
        this._prefix = value;
        this._hash = undefined;
    }

    withAccount(account) {
        return AccountsTreeNode.terminalNode(this._prefix, account);
    }

    async hash() {
        if (!this._hash) {
            this._hash = await Hash.light(this.serialize());
        }
        return this._hash;
    }

    isTerminal() {
        return AccountsTreeNode.isTerminalType(this._type);
    }

    isBranch() {
        return AccountsTreeNode.isBranchType(this._type);
    }

    _getChildIndex(prefix) {
        return parseInt(prefix[0], 16);
    }

    equals(o) {
        if (!(o instanceof AccountsTreeNode)) return false;
        if (!Object.is(this.prefix, o.prefix)) return false;
        if (this.isTerminal()) {
            return o.isTerminal() && o._account.equals(this._account);
        } else {
            if (!o.isBranch()) return false;
            for (let i = 0; i < this._children.length; ++i) {
                // hashes of child nodes
                const ourChild = this._children[i];
                const otherChild = o._children[i];
                if (ourChild) {
                    if (!otherChild || !Object.is(ourChild, otherChild)) return false;
                } else {
                    if (otherChild) return false;
                }
            }
        }
        return true;
    }
}
AccountsTreeNode.BRANCH = 0x00;
AccountsTreeNode.TERMINAL = 0xff;
Class.register(AccountsTreeNode);

class AccountsTreeStore {
    static getPersistent() {
        return new PersistentAccountsTreeStore();
    }

    static createVolatile() {
        return new VolatileAccountsTreeStore();
    }

    static createTemporary(backend, transaction = false) {
        return new TemporaryAccountsTreeStore(backend, transaction);
    }
}
Class.register(AccountsTreeStore);

class PersistentAccountsTreeStore extends ObjectDB {
    constructor() {
        super('accounts', AccountsTreeNode);
    }

    async getRootKey() {
        return await ObjectDB.prototype.getString.call(this, 'root');
    }

    async setRootKey(rootKey) {
        return await ObjectDB.prototype.putString.call(this, 'root', rootKey);
    }

    async transaction() {
        const tx = await ObjectDB.prototype.transaction.call(this);
        tx.getRootKey = function (rootKey) {
            return tx.getString('root');
        };
        tx.setRootKey = function (rootKey) {
            return tx.putString('root', rootKey);
        };
        return tx;
    }
}

class VolatileAccountsTreeStore {
    constructor() {
        this._store = {};
        this._rootKey = undefined;
    }

    async key(node) {
        return (await node.hash()).toBase64();
    }

    get(key) {
        return this._store[key];
    }

    async put(node) {
        const key = await this.key(node);
        this._store[key] = node;
        return key;
    }

    async remove(node) {
        const key = await this.key(node);
        delete this._store[key];
        return key;
    }

    transaction() {
        return new TemporaryAccountsTreeStore(this, true);
    }

    getRootKey() {
        return this._rootKey;
    }

    setRootKey(rootKey) {
        this._rootKey = rootKey;
    }
}

class TemporaryAccountsTreeStore {
    constructor(backend, transaction = false) {
        this._backend = backend;
        this._store = {};
        this._removed = {};
        this._transaction = transaction;
    }

    async key(node) {
        return (await node.hash()).toBase64();
    }

    async get(key) {
        // First try to find the key in our local store.
        if (this._store[key] === undefined) {
            // If it is not in there, get it from our backend.
            const node = await this._backend.get(key);
            // Undefined values in the backend are cached by null.
            // However to be consistent with the other implementations,
            // we return undefined.
            if (!node) {
                this._store[key] = null;
                return undefined;
            }
            // Assignment is intended! Cache value.
            // unserialize(serialize) copies node.
            return this._store[key] = AccountsTreeNode.unserialize(node.serialize());
        }
        return this._store[key] === null ? undefined : this._store[key];
    }

    async put(node) {
        const key = await this.key(node);
        this._store[key] = node;
        return key;
    }

    async remove(node) {
        const key = await this.key(node);
        this._removed[key] = node;
        this._store[key] = null;
        return key;
    }

    async commit() {
        if (!this._transaction) return;
        // Update backend with all our changes.
        // We also update cached values to ensure a consistent state with our view.
        let tx = this._backend;
        if (tx.transaction) {
            let txx = await tx.transaction();
            if (!(txx instanceof TemporaryAccountsTreeStore)) {
                tx = txx;
            }
        }
        for (let key of Object.keys(this._store)) {
            if (this._store[key] === null) {
                await tx.remove(this._removed[key]); // eslint-disable-line no-await-in-loop
            } else {
                await tx.put(this._store[key]); // eslint-disable-line no-await-in-loop
            }
        }
        if (this._rootKey !== undefined) {
            await tx.setRootKey(this._rootKey);
        }
        if (tx.commit) await tx.commit();
        this._rootKey = null;
        this._removed = {};
        this._store = {};
    }

    transaction() {
        return new TemporaryAccountsTreeStore(this, true);
    }

    async getRootKey() {
        if (this._rootKey === undefined) {
            this._rootKey = (await this._backend.getRootKey()) || null;
        }
        return this._rootKey === null ? undefined : this._rootKey;
    }

    setRootKey(rootKey) {
        this._rootKey = rootKey;
    }
}

class AccountsTree extends Observable {
    static getPersistent() {
        const store = AccountsTreeStore.getPersistent();
        return new AccountsTree(store);
    }

    static createVolatile() {
        const store = AccountsTreeStore.createVolatile();
        return new AccountsTree(store);
    }

    static createTemporary(backend) {
        const store = AccountsTreeStore.createTemporary(backend._store);
        return new AccountsTree(store);
    }

    constructor(treeStore) {
        super();
        this._store = treeStore;
        this._synchronizer = new Synchronizer();

        // Initialize root node.
        return this._initRoot();
    }

    async _initRoot() {
        let rootKey = await this._store.getRootKey();
        if (!rootKey) {
            const rootNode = AccountsTreeNode.branchNode(/*prefix*/ '', /*children*/ []);
            rootKey = await this._store.put(rootNode);
            await this._store.setRootKey(rootKey);
        }
        return this;
    }

    put(address, account, transaction) {
        return new Promise((resolve, error) => {
            this._synchronizer.push(() => {
                return this._put(address, account, transaction);
            }, resolve, error);
        });
    }

    async _put(address, account, transaction) {
        transaction = transaction || this._store;

        if (!(await this.get(address, transaction)) && Account.INITIAL.equals(account)) {
            return;
        }

        // Fetch the root node. This should never fail.
        const rootKey = await transaction.getRootKey();
        const rootNode = await transaction.get(rootKey);

        // Insert account into the tree at address.
        const prefix = address.toHex();
        await this._insert(transaction, rootNode, prefix, account, []);

        // Tell listeners that the account at address has changed.
        this.fire(address, account, address);
    }

    async _insert(transaction, node, prefix, account, rootPath) {
        // Find common prefix between node and new address.
        const commonPrefix = AccountsTree._commonPrefix(node.prefix, prefix);

        // Cut common prefix off the new address.
        prefix = prefix.substr(commonPrefix.length);

        // If the node prefix does not fully match the new address, split the node.
        if (commonPrefix.length !== node.prefix.length) {
            // Cut the common prefix off the existing node.
            await transaction.remove(node);
            node.prefix = node.prefix.substr(commonPrefix.length);
            const nodeKey = await transaction.put(node);

            // Insert the new account node.
            const newChild = AccountsTreeNode.terminalNode(prefix, account);
            const newChildKey = await transaction.put(newChild);

            // Insert the new parent node.
            const newParent = AccountsTreeNode.branchNode(commonPrefix, [])
                .withChild(node.prefix, nodeKey)
                .withChild(newChild.prefix, newChildKey);
            const newParentKey = await transaction.put(newParent);

            return this._updateKeys(transaction, newParent.prefix, newParentKey, rootPath);
        }

        // If the remaining address is empty, we have found an (existing) node
        // with the given address. Update the account.
        if (!prefix.length) {
            // Delete the existing node.
            await transaction.remove(node);

            // XXX How does this generalize to more than one account type?
            // Special case: If the new balance is the initial balance
            // (i.e. balance=0, nonce=0), it is like the account never existed
            // in the first place. Delete the node in this case.
            if (Account.INITIAL.equals(account)) {
                // We have already deleted the node, remove the subtree it was on.
                return this._prune(transaction, node.prefix, rootPath);
            }

            // Update the account.
            node = node.withAccount(account);
            const nodeKey = await transaction.put(node);

            return this._updateKeys(transaction, node.prefix, nodeKey, rootPath);
        }

        // If the node prefix matches and there are address bytes left, descend into
        // the matching child node if one exists.
        const childKey = node.getChild(prefix);
        if (childKey) {
            const childNode = await transaction.get(childKey);
            rootPath.push(node);
            return this._insert(transaction, childNode, prefix, account, rootPath);
        }

        // If no matching child exists, add a new child account node to the current node.
        const newChild = AccountsTreeNode.terminalNode(prefix, account);
        const newChildKey = await transaction.put(newChild);

        await transaction.remove(node);
        node = node.withChild(newChild.prefix, newChildKey);
        const nodeKey = await transaction.put(node);

        return this._updateKeys(transaction, node.prefix, nodeKey, rootPath);
    }

    async _prune(transaction, prefix, rootPath) {
        const rootKey = await transaction.getRootKey();

        // Walk along the rootPath towards the root node starting with the
        // immediate predecessor of the node specified by 'prefix'.
        let i = rootPath.length - 1;
        for (; i >= 0; --i) {
            let node = rootPath[i];
            let nodeKey = await transaction.remove(node); // eslint-disable-line no-await-in-loop

            node = node.withoutChild(prefix);

            // If the node has only a single child, merge it with the next node.
            if (node.hasSingleChild() && nodeKey !== rootKey) {
                const childKey = node.getFirstChild();
                const childNode = await transaction.get(childKey); // eslint-disable-line no-await-in-loop

                // Remove the current child node.
                await transaction.remove(childNode); // eslint-disable-line no-await-in-loop

                // Merge prefixes.
                childNode.prefix = node.prefix + childNode.prefix;

                nodeKey = await transaction.put(childNode); // eslint-disable-line no-await-in-loop
                return this._updateKeys(transaction, childNode.prefix, nodeKey, rootPath.slice(0, i));
            }
            // Otherwise, if the node has children left, update it and all keys on the
            // remaining root path. Pruning finished.
            // XXX Special case: We start with an empty root node. Don't delete it.
            else if (node.hasChildren() || nodeKey === rootKey) {
                nodeKey = await transaction.put(node); // eslint-disable-line no-await-in-loop
                return this._updateKeys(transaction, node.prefix, nodeKey, rootPath.slice(0, i));
            }

            // The node has no children left, continue pruning.
            prefix = node.prefix;
        }

        // XXX This should never be reached.
        return undefined;
    }

    async _updateKeys(transaction, prefix, nodeKey, rootPath) {
        // Walk along the rootPath towards the root node starting with the
        // immediate predecessor of the node specified by 'prefix'.
        let i = rootPath.length - 1;
        for (; i >= 0; --i) {
            let node = rootPath[i];
            await transaction.remove(node); // eslint-disable-line no-await-in-loop

            node = node.withChild(prefix, nodeKey);

            nodeKey = await transaction.put(node); // eslint-disable-line no-await-in-loop
            prefix = node.prefix;
        }

        await transaction.setRootKey(nodeKey);
        return nodeKey;
    }

    async get(address, transaction) {
        transaction = transaction || this._store;

        // Fetch the root node. This should never fail.
        const rootKey = await transaction.getRootKey();
        const rootNode = await transaction.get(rootKey);

        const prefix = address.toHex();
        return this._retrieve(transaction, rootNode, prefix);
    }

    async _retrieve(transaction, node, prefix) {
        // Find common prefix between node and requested address.
        const commonPrefix = AccountsTree._commonPrefix(node.prefix, prefix);

        // If the prefix does not fully match, the requested address is not part
        // of this node.
        if (commonPrefix.length !== node.prefix.length) return false;

        // Cut common prefix off the new address.
        prefix = prefix.substr(commonPrefix.length);

        // If the remaining address is empty, we have found the requested node.
        if (!prefix.length) return node.account;

        // Descend into the matching child node if one exists.
        const childKey = node.getChild(prefix);
        if (childKey) {
            const childNode = await transaction.get(childKey);
            return this._retrieve(transaction, childNode, prefix);
        }

        // No matching child exists, the requested address is not part of this node.
        return false;
    }

    async populate(nodes, transaction) {
        transaction = transaction || this._store;

        const rootNode = nodes[0];
        const rootKey = (await rootNode.hash()).toBase64();

        for (const node of nodes) {
            await transaction.put(node);
        }

        await transaction.setRootKey(rootKey);
    }

    async verify(transaction) {
        transaction = transaction || this._store;

        // Fetch the root node. This should never fail.
        const rootKey = await transaction.getRootKey();
        const rootNode = await transaction.get(rootKey);
        return this._verify(rootNode, transaction);
    }

    async _verify(node, transaction) {
        if (!node) return true;
        transaction = transaction || this._store;

        // well-formed node type
        if (!node.isBranch() && !node.isTerminal()) {
            Log.e(`Unrecognized node type ${node._type}`);
            return false;
        }

        if (node.hasChildren()) {
            for (let i = 0; i < 16; i++) {
                const nibble = i.toString(16);
                const subhash = node.getChild(nibble);
                if (!subhash) continue;
                const subnode = await transaction.get(subhash);

                // no dangling references
                if (!subnode) {
                    Log.e(`No subnode for hash ${subhash}`);
                    return false;
                }

                // no verification fails in the subnode
                if (!(await this._verify(subnode, transaction))) {
                    Log.e(`Verification of child ${i} failed`);
                    return false;
                }

                // position in children list is correct
                if (!subnode.prefix[0] === nibble) {
                    Log.e(`First nibble of child node does not match its position in the parent branch node: 
                    ${subnode.prefix[0]} vs ${nibble}`);
                    return false;
                }
            }
        }
        return true;
    }

    async clear() {
        const rootKey = await this._store.getRootKey();
        return this._clear(rootKey);
    }

    async _clear(nodeKey) {
        const node = await this._store.get(nodeKey);
        if (!node) return;
        await this._store.remove(node);

        if (node.hasChildren()) {
            for (const childNodeKey of node.getChildren()) {
                await this._clear(childNodeKey);
            }
        }
    }

    async export() {
        const rootKey = await this._store.getRootKey();

        const nodes = [];
        await this._export(rootKey, nodes);
        return nodes;
    }

    async _export(nodeKey, arr) {
        const node = await this._store.get(nodeKey);

        arr.push(BufferUtils.toBase64(node.serialize()));

        if (node.hasChildren()) {
            for (const childNodeKey of node.getChildren()) {
                await this._export(childNodeKey, arr);
            }
        }
    }

    async transaction() {
        // FIXME Firefox apparently has problems with transactions!
        // const tx = await this._store.transaction();
        const tx = await AccountsTreeStore.createTemporary(this._store, true);
        const that = this;
        return {
            get: function (address) {
                return that.get(address, tx);
            },

            put: function (address, account) {
                return that.put(address, account, tx);
            },

            commit: function () {
                return tx.commit();
            },

            root: async function () {
                return Hash.fromBase64(await tx.getRootKey());
            }
        };
    }

    static _commonPrefix(prefix1, prefix2) {
        let i = 0;
        for (; i < prefix1.length; ++i) {
            if (prefix1[i] !== prefix2[i]) break;
        }
        return prefix1.substr(0, i);
    }

    async root() {
        const rootKey = await this._store.getRootKey();
        return Hash.fromBase64(rootKey);
    }
}
Class.register(AccountsTree);



class Accounts extends Observable {
    static async getPersistent() {
        const tree = await AccountsTree.getPersistent();
        return new Accounts(tree);
    }

    static async createVolatile() {
        const tree = await AccountsTree.createVolatile();
        return new Accounts(tree);
    }

    static async createTemporary(backend) {
        const tree = await AccountsTree.createTemporary(backend._tree);
        return new Accounts(tree);
    }

    constructor(accountsTree) {
        super();
        this._tree = accountsTree;

        // Forward balance change events to listeners registered on this Observable.
        this.bubble(this._tree, '*');
    }

    async populate(nodes) {
        // To make sure we have a single transaction, we use a Temporary Tree during populate and commit that.
        const treeTx = await AccountsTreeStore.createTemporary(this._tree._store, true);
        await this._tree.populate(nodes, treeTx);
        if (await this._tree.verify(treeTx)) {
            await treeTx.commit();
            this.fire('populated');
            return true;
        } else {
            return false;
        }
    }

    clear() {
        return this._tree.clear();
    }

    async commitBlock(block) {
        // TODO we should validate if the block is going to be applied correctly.

        const treeTx = await this._tree.transaction();
        await this._execute(treeTx, block.body, (a, b) => a + b);

        const hash = await treeTx.root();
        if (!block.accountsHash.equals(hash)) throw 'AccountsHash mismatch';
        return treeTx.commit();
    }

    async commitBlockBody(body) {
        const treeTx = await this._tree.transaction();
        await this._execute(treeTx, body, (a, b) => a + b);
        return treeTx.commit();
    }

    async revertBlock(block) {
        return this.revertBlockBody(block.body);
    }

    async revertBlockBody(body) {
        const treeTx = await this._tree.transaction();
        await this._execute(treeTx, body, (a, b) => a - b);
        return treeTx.commit();
    }

    // We only support basic accounts at this time.
    async getBalance(address, treeTx = this._tree) {
        const account = await treeTx.get(address);
        if (account) {
            return account.balance;
        } else {
            return Account.INITIAL.balance;
        }
    }

    async _execute(treeTx, body, operator) {
        await this._executeTransactions(treeTx, body, operator);
        await this._rewardMiner(treeTx, body, operator);
    }

    async _rewardMiner(treeTx, body, op) {
        // Sum up transaction fees.
        const txFees = body.transactions.reduce((sum, tx) => sum + tx.fee, 0);
        await this._updateBalance(treeTx, body.minerAddr, txFees + Policy.BLOCK_REWARD, op);
    }

    async _executeTransactions(treeTx, body, op) {
        for (const tx of body.transactions) {
            await this._executeTransaction(treeTx, tx, op); // eslint-disable-line no-await-in-loop
        }
    }

    async _executeTransaction(treeTx, tx, op) {
        await this._updateSender(treeTx, tx, op);
        await this._updateRecipient(treeTx, tx, op);
    }

    async _updateSender(treeTx, tx, op) {
        const addr = await tx.getSenderAddr();
        await this._updateBalance(treeTx, addr, -tx.value - tx.fee, op);
    }

    async _updateRecipient(treeTx, tx, op) {
        await this._updateBalance(treeTx, tx.recipientAddr, tx.value, op);
    }

    async _updateBalance(treeTx, address, value, operator) {
        const balance = await this.getBalance(address, treeTx);

        const newValue = operator(balance.value, value);
        if (newValue < 0) {
            throw 'Balance Error!';
        }

        const newNonce = value < 0 ? operator(balance.nonce, 1) : balance.nonce;
        if (newNonce < 0) {
            throw 'Nonce Error!';
        }

        const newBalance = new Balance(newValue, newNonce);
        const newAccount = new Account(newBalance);
        await treeTx.put(address, newAccount);
    }

    export() {
        return this._tree.export();
    }

    hash() {
        return this._tree.root();
    }
}
Accounts.EMPTY_TREE_HASH = Hash.fromBase64('cJ6AyISHokEeHuTfufIqhhSS0gxHZRUMDHlKvXD4FHw=');
Class.register(Accounts);

class BlockHeader {
    constructor(prevHash, bodyHash, accountsHash, nBits, height, timestamp, nonce, version = BlockHeader.CURRENT_VERSION) {
        if (!NumberUtils.isUint16(version)) throw 'Malformed version';
        if (!Hash.isHash(prevHash)) throw 'Malformed prevHash';
        if (!Hash.isHash(bodyHash)) throw 'Malformed bodyHash';
        if (!Hash.isHash(accountsHash)) throw 'Malformed accountsHash';
        if (!NumberUtils.isUint32(nBits) || !BlockUtils.isValidCompact(nBits)) throw 'Malformed nBits';
        if (!NumberUtils.isUint32(height)) throw 'Invalid height';
        if (!NumberUtils.isUint32(timestamp)) throw 'Malformed timestamp';
        if (!NumberUtils.isUint64(nonce)) throw 'Malformed nonce';

        this._version = version;
        this._prevHash = prevHash;
        this._bodyHash = bodyHash;
        this._accountsHash = accountsHash;
        this._nBits = nBits;
        this._height = height;
        this._timestamp = timestamp;
        this._nonce = nonce;
    }

    static unserialize(buf) {
        const version = buf.readUint16();
        if (!BlockHeader.SUPPORTED_VERSIONS.includes(version)) throw 'Block version unsupported';
        const prevHash = Hash.unserialize(buf);
        const bodyHash = Hash.unserialize(buf);
        const accountsHash = Hash.unserialize(buf);
        const nBits = buf.readUint32();
        const height = buf.readUint32();
        const timestamp = buf.readUint32();
        const nonce = buf.readUint64();
        return new BlockHeader(prevHash, bodyHash, accountsHash, nBits, height, timestamp, nonce, version);
    }

    serialize(buf) {
        buf = buf || new SerialBuffer(this.serializedSize);
        buf.writeUint16(this._version);
        this._prevHash.serialize(buf);
        this._bodyHash.serialize(buf);
        this._accountsHash.serialize(buf);
        buf.writeUint32(this._nBits);
        buf.writeUint32(this._height);
        buf.writeUint32(this._timestamp);
        buf.writeUint64(this._nonce);
        return buf;
    }

    get serializedSize() {
        return /*version*/ 2
            + this._prevHash.serializedSize
            + this._bodyHash.serializedSize
            + this._accountsHash.serializedSize
            + /*nBits*/ 4
            + /*height*/ 4
            + /*timestamp*/ 4
            + /*nonce*/ 8;
    }

    async verifyProofOfWork(buf) {
        const pow = await this.pow(buf);
        return BlockUtils.isProofOfWork(pow, this.target);
    }

    async hash(buf) {
        this._hash = this._hash || await Hash.light(this.serialize(buf));
        return this._hash;
    }

    async pow(buf) {
        this._pow = this._pow || await Hash.hard(this.serialize(buf));
        return this._pow;
    }

    equals(o) {
        return o instanceof BlockHeader
            && this._prevHash.equals(o.prevHash)
            && this._bodyHash.equals(o.bodyHash)
            && this._accountsHash.equals(o.accountsHash)
            && this._nBits === o.nBits
            && this._height === o.height
            && this._timestamp === o.timestamp
            && this._nonce === o.nonce;
    }

    toString() {
        return `BlockHeader{`
            + `prevHash=${this._prevHash}, `
            + `bodyHash=${this._bodyHash}, `
            + `accountsHash=${this._accountsHash}, `
            + `nBits=${this._nBits.toString(16)}, `
            + `height=${this._height}, `
            + `timestamp=${this._timestamp}, `
            + `nonce=${this._nonce}`
            + `}`;
    }

    get prevHash() {
        return this._prevHash;
    }

    get bodyHash() {
        return this._bodyHash;
    }

    get accountsHash() {
        return this._accountsHash;
    }

    get nBits() {
        return this._nBits;
    }

    get target() {
        return BlockUtils.compactToTarget(this._nBits);
    }

    get difficulty() {
        return BlockUtils.compactToDifficulty(this._nBits);
    }

    get height() {
        return this._height;
    }

    get timestamp() {
        return this._timestamp;
    }

    get nonce() {
        return this._nonce;
    }

    // XXX The miner changes the nonce of an existing BlockHeader during the
    // mining process.
    set nonce(n) {
        this._nonce = n;
        this._hash = null;
        this._pow = null;
    }
}
BlockHeader.CURRENT_VERSION = 1;
BlockHeader.SUPPORTED_VERSIONS = [1];
Class.register(BlockHeader);

class BlockBody {

    constructor(minerAddr, transactions) {
        if (!(minerAddr instanceof Address)) throw 'Malformed minerAddr';
        if (!transactions || transactions.some(it => !(it instanceof Transaction))) throw 'Malformed transactions';
        this._minerAddr = minerAddr;
        this._transactions = transactions;
    }

    static unserialize(buf) {
        const minerAddr = Address.unserialize(buf);
        const numTransactions = buf.readUint16();
        const transactions = new Array(numTransactions);
        for (let i = 0; i < numTransactions; i++) {
            transactions[i] = Transaction.unserialize(buf);
        }
        return new BlockBody(minerAddr, transactions);
    }

    serialize(buf) {
        buf = buf || new SerialBuffer(this.serializedSize);
        this._minerAddr.serialize(buf);
        buf.writeUint16(this._transactions.length);
        for (let tx of this._transactions) {
            tx.serialize(buf);
        }
        return buf;
    }

    get serializedSize() {
        let size = this._minerAddr.serializedSize
            + /*transactionsLength*/ 2;
        for (let tx of this._transactions) {
            size += tx.serializedSize;
        }
        return size;
    }

    hash() {
        return BlockBody._computeRoot([this._minerAddr, ...this._transactions]);
    }

    static _computeRoot(values) {
        // values may contain:
        // - transactions (Transaction)
        // - miner address (Uint8Array)
        const len = values.length;
        if (len == 1) {
            const value = values[0];
            return value.hash ? /*transaction*/ value.hash() : /*miner address*/ Hash.light(value.serialize());
        }

        const mid = Math.round(len / 2);
        const left = values.slice(0, mid);
        const right = values.slice(mid);
        return Promise.all([
            BlockBody._computeRoot(left),
            BlockBody._computeRoot(right)
        ]).then(hashes => Hash.light(BufferUtils.concatTypedArrays(hashes[0].serialize(), hashes[1].serialize())));
    }

    equals(o) {
        return o instanceof BlockBody
            && this._minerAddr.equals(o.minerAddr)
            && this._transactions.every((tx, i) => tx.equals(o.transactions[i]));
    }

    get minerAddr() {
        return this._minerAddr;
    }

    get transactions() {
        return this._transactions;
    }

    get transactionCount() {
        return this._transactions.length;
    }
}
Class.register(BlockBody);

class BlockUtils {
    static compactToTarget(compact) {
        return (compact & 0xffffff) * Math.pow(2, (8 * ((compact >> 24) - 3)));
    }

    static targetToCompact(target) {
        // Convert the target into base 16 with zero-padding.
        let base16 = target.toString(16);
        if (base16.length % 2 != 0) {
            base16 = "0" + base16;
        }

        // If the first (most significant) byte is greater than 127 (0x7f),
        // prepend a zero byte.
        if (parseInt(base16.substr(0, 2), 16) > 0x7f) {
            base16 = "00" + base16;
        }

        // The first byte of the 'compact' format is the number of bytes,
        // including the prepended zero if it's present.
        let size = base16.length / 2;
        let compact = size << 24;

        // The following three bytes are the first three bytes of the above
        // representation. If less than three bytes are present, then one or
        // more of the last bytes of the compact representation will be zero.
        const numBytes = Math.min(size, 3);
        for (let i = 0; i < numBytes; ++i) {
            compact |= parseInt(base16.substr(i * 2, 2), 16) << ((2 - i) * 8);
        }

        return compact;
    }

    static compactToDifficulty(compact) {
        return Policy.BLOCK_TARGET_MAX / BlockUtils.compactToTarget(compact);
    }

    static difficultyToCompact(difficulty) {
        return BlockUtils.targetToCompact(Policy.BLOCK_TARGET_MAX / difficulty);
    }

    static difficultyToTarget(difficulty) {
        return Policy.BLOCK_TARGET_MAX / difficulty;
    }

    static targetToDifficulty(target) {
        return Policy.BLOCK_TARGET_MAX / target;
    }

    static isProofOfWork(hash, target) {
        return parseInt(hash.toHex(), 16) <= target;
    }

    static isValidCompact(compact) {
        return BlockUtils.isValidTarget(BlockUtils.compactToTarget(compact));
    }

    static isValidTarget(target) {
        return target >= 1 && target <= Policy.BLOCK_TARGET_MAX;
    }
}
Class.register(BlockUtils);

// TODO V2: Transactions may contain a payment reference such that the chain can prove existence of data
// TODO V2: Copy 'serialized' to detach all outer references
class Transaction {
    constructor(senderPubKey, recipientAddr, value, fee, nonce, signature, version = Transaction.CURRENT_VERSION) {
        if (!NumberUtils.isUint16(version)) throw 'Malformed version';
        if (!(senderPubKey instanceof PublicKey)) throw 'Malformed senderPubKey';
        if (!(recipientAddr instanceof Address)) throw 'Malformed recipientAddr';
        if (!NumberUtils.isUint64(value) || value == 0) throw 'Malformed value';
        if (!NumberUtils.isUint64(fee)) throw 'Malformed fee';
        if (!NumberUtils.isUint32(nonce)) throw 'Malformed nonce';
        // Signature may be initially empty and can be set later.
        if (signature !== undefined && !(signature instanceof Signature)) throw 'Malformed signature';

        // Note that the signature is NOT verified here.
        // Callers must explicitly invoke verifySignature() to check it.

        this._version = version;
        this._senderPubKey = senderPubKey;
        this._recipientAddr = recipientAddr;
        this._value = value;
        this._fee = fee;
        this._nonce = nonce;
        this._signature = signature;
    }

    static unserialize(buf) {
        // We currently only support one transaction type: Basic.
        const version = buf.readUint16();
        if (!Transaction.SUPPORTED_VERSIONS.includes(version)) throw 'Transaction version unsupported';
        const type = buf.readUint8();
        if (type !== Transaction.Type.BASIC) throw 'Malformed transaction type';
        const senderPubKey = PublicKey.unserialize(buf);
        const recipientAddr = Address.unserialize(buf);
        const value = buf.readUint64();
        const fee = buf.readUint64();
        const nonce = buf.readUint32();
        const signature = Signature.unserialize(buf);
        return new Transaction(senderPubKey, recipientAddr, value, fee, nonce, signature, version);
    }

    serialize(buf) {
        buf = buf || new SerialBuffer(this.serializedSize);
        this.serializeContent(buf);
        this._signature.serialize(buf);
        return buf;
    }

    get serializedSize() {
        return this.serializedContentSize
            + this._signature.serializedSize;
    }

    serializeContent(buf) {
        buf = buf || new SerialBuffer(this.serializedContentSize);
        buf.writeUint16(this._version);
        buf.writeUint8(Transaction.Type.BASIC);
        this._senderPubKey.serialize(buf);
        this._recipientAddr.serialize(buf);
        buf.writeUint64(this._value);
        buf.writeUint64(this._fee);
        buf.writeUint32(this._nonce);
        return buf;
    }

    get serializedContentSize() {
        return /*version*/ 2
            + /*type*/ 1
            + this._senderPubKey.serializedSize
            + this._recipientAddr.serializedSize
            + /*value*/ 8
            + /*fee*/ 8
            + /*nonce*/ 4;
    }

    async verifySignature() {
        return this._signature.verify(this._senderPubKey, this.serializeContent());
    }

    hash() {
        // Exclude the signature, we don't want transactions to be malleable.
        // TODO Think about this! This means that the signatures will not be
        // captured by the proof of work!
        return Hash.light(this.serializeContent());
    }

    equals(o) {
        return o instanceof Transaction
            && this._senderPubKey.equals(o.senderPubKey)
            && this._recipientAddr.equals(o.recipientAddr)
            && this._value === o.value
            && this._fee === o.fee
            && this._nonce === o.nonce
            && this._signature.equals(o.signature);
    }

    toString() {
        return `Transaction{`
            + `senderPubKey=${this._senderPubKey.toBase64()}, `
            + `recipientAddr=${this._recipientAddr.toBase64()}, `
            + `value=${this._value}, `
            + `fee=${this._fee}, `
            + `nonce=${this._nonce}, `
            + `signature=${this._signature.toBase64()}`
            + `}`;
    }

    get senderPubKey() {
        return this._senderPubKey;
    }

    getSenderAddr() {
        return this._senderPubKey.toAddress();
    }

    get recipientAddr() {
        return this._recipientAddr;
    }

    get value() {
        return this._value;
    }

    get fee() {
        return this._fee;
    }

    get nonce() {
        return this._nonce;
    }

    get signature() {
        return this._signature;
    }

    // Signature is set by the Wallet after signing a transaction.
    set signature(sig) {
        this._signature = sig;
    }
}
Transaction.CURRENT_VERSION = 1;
Transaction.SUPPORTED_VERSIONS = [1];
Transaction.Type = {};
Transaction.Type.BASIC = 0;

Class.register(Transaction);

class Block {
    constructor(header, body) {
        if (!(header instanceof BlockHeader)) throw 'Malformed header';
        if (!(body instanceof BlockBody)) throw 'Malformed body';
        this._header = header;
        this._body = body;
    }

    static unserialize(buf) {
        const header = BlockHeader.unserialize(buf);
        const body = BlockBody.unserialize(buf);
        return new Block(header, body);
    }

    serialize(buf) {
        buf = buf || new SerialBuffer(this.serializedSize);
        this._header.serialize(buf);
        this._body.serialize(buf);
        return buf;
    }

    get serializedSize() {
        return this._header.serializedSize
            + this._body.serializedSize;
    }

    get header() {
        return this._header;
    }

    get body() {
        return this._body;
    }

    get prevHash() {
        return this._header.prevHash;
    }

    get bodyHash() {
        return this._header.bodyHash;
    }

    get accountsHash() {
        return this._header.accountsHash;
    }

    get nBits() {
        return this._header.nBits;
    }

    get target() {
        return this._header.target;
    }

    get difficulty() {
        return this._header.difficulty;
    }

    get height() {
        return this._header.height;
    }

    get timestamp() {
        return this._header.timestamp;
    }

    get nonce() {
        return this._header.nonce;
    }

    get minerAddr() {
        return this._body.minerAddr;
    }

    get transactions() {
        return this._body.transactions;
    }

    get transactionCount() {
        return this._body.transactionCount;
    }

    hash() {
        return this._header.hash();
    }
}

/* Genesis Block */
Block.GENESIS = new Block(
    new BlockHeader(
        new Hash(null),
        new Hash(BufferUtils.fromBase64('Xmju8G32zjPl4m6U/ULB3Nyozs2BkVgX2k9fy5/HeEg=')),
        new Hash(BufferUtils.fromBase64('3OXA29ZLjMiwzb52dseSuRH4Reha9lAh4qfPLm6SF28=')),
        BlockUtils.difficultyToCompact(1),
        1,
        0,
        38760),
    new BlockBody(new Address(BufferUtils.fromBase64('kekkD0FSI5gu3DRVMmMHEOlKf1I')), [])
);
// Store hash for synchronous access
Block.GENESIS.HASH = Hash.fromBase64('AACIm7qoV7ybhlwQMvJrqjzSt5RJtq5++xi8jg91jfU=');
Block.GENESIS.hash().then(hash => {
    Block.GENESIS.HASH = hash;
    //Object.freeze(Block.GENESIS);
});

/* Checkpoint Block */
Block.CHECKPOINT = new Block(
    new BlockHeader(
        /*prevHash*/ new Hash(BufferUtils.fromBase64('AAAAA7cFTzKlX7MUYQoX4Z+KiZHuS20iyJjbWGjXHNg=')),
        /*bodyHash*/ new Hash(BufferUtils.fromBase64('QINftd68yuj5wbG/ATeAJRJmXqiLmrT0Xx+44Z/WUSM=')),
        /*accountsHash*/ new Hash(BufferUtils.fromBase64('IFs5LIya4yqQmdsKfaI1dHeWEaqMFOIxGRpnMv6HJYM=')),
        /*nBits*/ 487341920,
        /*height*/ 47101,
        /*timestamp*/ 1500270197,
        /*nonce*/ 759960,
        /*version*/ 1),
    new BlockBody(new Address(BufferUtils.fromBase64('XtRtx2vbgeH8xH6BYI+esqwmJn4=')), [])
);
Block.CHECKPOINT.hash().then(hash => {
    Block.CHECKPOINT.HASH = hash;
    //Object.freeze(Block.GENESIS);
});
Block.CHECKPOINT.TOTAL_WORK = 182067288.3717518;
Block.OLD_CHECKPOINTS = new IndexedArray([
    new Hash(BufferUtils.fromBase64('AAAACxKJIIfQb99dTIuiRyY6VkRlzBfbyknKo/515Ho=')),
    new Hash(BufferUtils.fromBase64('AAAAJHtA0SSxZb+sk2T9Qtzz4bWZdfz8pqbf5PNjywI=')),
    new Hash(BufferUtils.fromBase64('AAAALktDkTyMegm9e/CJG9NpkvF/7uPxp9q+zErQnl8=')),
    new Hash(BufferUtils.fromBase64('AAAABmq1g68uEMzKWLDBUa6810XEE9Vk/ifONRCUkUk=')),
    new Hash(BufferUtils.fromBase64('AAAAHpEZUIClGOSOrqjKJ+THcp8xyN4+5U2rvHlEkvw=')),
    new Hash(BufferUtils.fromBase64('AAAAFenBDl6b49lyL33tpV8eLzWf1dYIM8+9pxEGRfY=')),
    new Hash(BufferUtils.fromBase64('AAAABePxtVLWdRrzjxUmRGVPym7zuImTZEGMvZaRNEs=')),
    new Hash(BufferUtils.fromBase64('AAAAH4mCyHqdb+rcy0VDptF0CfLugU+gKYDA7oPuhWI=')),
    new Hash(BufferUtils.fromBase64('AAAAABu3j9L0ol18IHG25YMi4lHVyGwa5QJGrQJy4Qw=')),
    new Hash(BufferUtils.fromBase64('AAAAARX1b4n0Y1+dzdEU4cZW7GNvxKUEalDtH1vSsx8=')),
    new Hash(BufferUtils.fromBase64('AAAABH7wDY5FwWZho3QllcGRNveaOSoSwvybunpXoAc=')),
    new Hash(BufferUtils.fromBase64('AAAAFqUCFCnUYyybeKyAJuTBhtB29dOUHlo9W31TxPA=')),
    new Hash(BufferUtils.fromBase64('AAAAA+mSyp2Q3JsT5W5PbCLVHzGd3EsLMzkqSFt4AwM=')),
    new Hash(BufferUtils.fromBase64('AAAAAjFm8OCWhfzH2acJntnz921z15yxb5E+bh1N7k4=')),
    new Hash(BufferUtils.fromBase64('AAAAAIVQSMwa5TcuGg6t28wSQyijwBEhEMddTiNFNfw=')),
    new Hash(BufferUtils.fromBase64('AAAACfynhTg1AE83lWY0Il009MauEBohEWvpuJq9JjM=')),
    new Hash(BufferUtils.fromBase64('AAAADiUfwIOxDrscPaQKWXnt8JOQZ4igiJ08mMLB83k=')),
    new Hash(BufferUtils.fromBase64('AAAAAaviQ4P5/8HjNtl1Ixf2YQrqK2cBuGo1eM4gEvQ=')),
    new Hash(BufferUtils.fromBase64('AAAABs5JgeROyc2m8Q5ipp8zZ43VooArfOdXC4PBEl8=')),
    new Hash(BufferUtils.fromBase64('AAAAAMPvFcUV8nPAB2ggkJeFvP73SAPwNHoC1I1I+sA=')),
    new Hash(BufferUtils.fromBase64('AAAACOVTDF5/5y8bsaIbhJidyEzQEYfsh4cMFZ1TAew=')),
    new Hash(BufferUtils.fromBase64('AAAADrTB/DfobRJSPRwG4XKArX0Na3J03OvVJWhunJI=')),
    new Hash(BufferUtils.fromBase64('AAAABomr61e4IFqwoAh8s8yUXbYNedG/WLW7aHDZzco=')),
    new Hash(BufferUtils.fromBase64('AAAAB8zYJ87usp2Av9+q0TN786BOhri3PS0M8aEvwIQ=')),
    new Hash(BufferUtils.fromBase64('AAAAAngMt24MYmSe2tfgfj1NV4Fv10BZXDPcDTZHuQM=')),
    new Hash(BufferUtils.fromBase64('AAAAA2trckpN5D7NlSQGJEDmx/1uQR3lRSlXmsKY2wE=')),
    new Hash(BufferUtils.fromBase64('AAAACmdt5K8AjlabxT0SOqNgCaA3b+B43q0MF7ppN7Q=')),
    new Hash(BufferUtils.fromBase64('AAAADEVHAPy+L7Mvy9YfiIYoWnLNd+uWUnVitoX0/tA=')),
    new Hash(BufferUtils.fromBase64('AAAABYQ5353h3Lv7juIk1FrjU1q0wZoZVnq7Ocuw8IA=')),
    new Hash(BufferUtils.fromBase64('AAAAFVMaIN3bMR/bqcr/G8AXExIbg41bd/iZaLTyhWY=')),
    new Hash(BufferUtils.fromBase64('AAAAAqBBrvzSgRg8shTLLUXYw6W/8Je0H276xGYJ5wU=')),
    new Hash(BufferUtils.fromBase64('AAAACThS7/pP1Cm3q2/yFDcDqSwx8O1kK7cwc2tuzAA=')),
    new Hash(BufferUtils.fromBase64('AAAADhidwr1dh+1mGY2FmZq6rWDs0amAQL1C7axonY0='))
]);
Class.register(Block);

class Blockchain extends Observable {
    static getPersistent(accounts) {
        const store = BlockchainStore.getPersistent();
        return new Blockchain(store, accounts);
    }

    static createVolatile(accounts, allowCheckpoint=false) {
        const store = BlockchainStore.createVolatile();
        return new Blockchain(store, accounts, allowCheckpoint);
    }

    constructor(store, accounts, allowCheckpoint=true) {
        super();
        this._store = store;
        this._accounts = accounts;

        this._mainChain = null;
        this._mainPath = null;
        this._headHash = null;

        this._checkpointLoaded = false;

        // Blocks arriving fast over the network will create a backlog of blocks
        // in the synchronizer queue. Tell listeners when the blockchain is
        // ready to accept blocks again.
        this._synchronizer = new Synchronizer();
        this._synchronizer.on('work-end', () => this.fire('ready', this));

        return this._init(allowCheckpoint);
    }

    async _init(allowCheckpoint) {
        // Load the main chain from storage.
        this._mainChain = await this._store.getMainChain();

        // If we don't know any chains, start with the genesis chain.
        if (!this._mainChain) {
            this._mainChain = new Chain(Block.GENESIS);
            await this._store.put(this._mainChain);
            await this._store.setMainChain(this._mainChain);
            // Allow to load checkpoint if it exists and can be applied.
            if (allowCheckpoint && Block.CHECKPOINT && (await this.loadCheckpoint())) {
                this._mainChain = new Chain(Block.CHECKPOINT, Block.CHECKPOINT.TOTAL_WORK, Block.CHECKPOINT.height);
                await this._store.put(this._mainChain);
                await this._store.setMainChain(this._mainChain);
            }
        } else {
            // Fast-forward to CHECKPOINT if necessary.
            if (allowCheckpoint && Block.CHECKPOINT && this._mainChain.height < Block.CHECKPOINT.height && (await this.loadCheckpoint())) {
                this._mainChain = new Chain(Block.CHECKPOINT, Block.CHECKPOINT.TOTAL_WORK, Block.CHECKPOINT.height);
                await this._store.put(this._mainChain);
                await this._store.setMainChain(this._mainChain);
            }
        }

        // Cache the hash of the head of the current main chain.
        this._headHash = await this._mainChain.hash();

        // Fetch the path along the main chain.
        // XXX optimize this!
        this._mainPath = await this._fetchPath(this.head);

        // Always set checkpointLoaded to true, if our first block in the path is a checkpoint.
        if (this._mainPath.length > 0 && (this._mainPath[0].equals(Block.CHECKPOINT.HASH) || Block.OLD_CHECKPOINTS.indexOf(this._mainPath[0]))) {
            this._checkpointLoaded = true;
        }

        // Automatically commit the chain head if the accountsHash matches.
        // Needed to bootstrap the empty accounts tree.
        const accountsHash = await this.accountsHash();
        if (accountsHash.equals(Accounts.EMPTY_TREE_HASH)) {
            await this._accounts.commitBlock(this._mainChain.head);
        } else if (!accountsHash.equals(this._mainChain.head.accountsHash)) {
            // TODO what to do if the accounts hashes mismatch?
            throw 'AccountsHash mismatch in blockchain initialization';
        }

        return this;
    }

    async loadCheckpoint() {
        const accounts = await Accounts.createVolatile();

        // Load accountsTree at checkpoint.
        if (!AccountsTree.CHECKPOINT_NODES) {
            return false;
        }
        const nodes = AccountsTree.CHECKPOINT_NODES;
        // Read nodes.
        for (let i = 0; i < nodes.length; ++i) {
            nodes[i] = AccountsTreeNode.unserialize(BufferUtils.fromBase64(nodes[i]));
        }

        if (nodes.length === 0) {
            Log.d(Blockchain, 'Loading checkpoint failed, no nodes in AccountsTree.');
            return false;
        }

        // Check accountsHash.
        if (!(await nodes[0].hash()).equals(await Block.CHECKPOINT.accountsHash)) {
            Log.d(Blockchain, 'Loading checkpoint failed, accountsHash mismatch.');
            return false;
        }

        // Try populating the tree.
        if (!(await accounts.populate(nodes))) {
            Log.d(Blockchain, 'Loading checkpoint failed, tree could not be populated.');
            return false;

        }

        await this._accounts.clear();
        await this._accounts.populate(nodes);

        this._checkpointLoaded = true;
        return true;
    }

    // Retrieves up to maxBlocks predecessors of the given block.
    // Returns an array of max (maxBlocks + 1) block hashes with the given hash
    // as the last element.
    async _fetchPath(block, maxBlocks = 1000000) {
        let hash = await block.hash();
        const path = [hash];

        if (Block.GENESIS.HASH.equals(hash) || (this._checkpointLoaded && Block.CHECKPOINT.HASH.equals(hash))) {
            return new IndexedArray(path);
        }

        do {
            const prevChain = await this._store.get(block.prevHash.toBase64()); // eslint-disable-line no-await-in-loop
            if (!prevChain && Block.CHECKPOINT.HASH.equals(hash)) break;
            if (!prevChain && Block.OLD_CHECKPOINTS.indexOf(hash) >= 0) break; // we also need to stop if we encountered an old checkpoint
            if (!prevChain) throw `Failed to find predecessor block ${block.prevHash.toBase64()}`;

            // TODO unshift() is inefficient. We should build the array with push()
            // instead and iterate over it in reverse order.
            path.unshift(block.prevHash);

            // Advance to the predecessor block.
            hash = block.prevHash;
            block = prevChain.head;
        } while (--maxBlocks > 0 && !Block.GENESIS.HASH.equals(hash));

        return new IndexedArray(path);
    }

    pushBlock(block) {
        return new Promise((resolve, error) => {
            this._synchronizer.push(() => {
                return this._pushBlock(block);
            }, resolve, error);
        });
    }

    createTemporaryAccounts() {
        return Accounts.createTemporary(this._accounts);
    }

    async _pushBlock(block) {
        // Check if we already know this block. If so, ignore it.
        const hash = await block.hash();
        const knownChain = await this._store.get(hash.toBase64());
        if (knownChain && !this._isHarderChain(knownChain, hash)) {
            Log.v(Blockchain, `Ignoring known block ${hash.toBase64()}`);
            return Blockchain.PUSH_ERR_KNOWN_BLOCK;
        }

        // Retrieve the previous block. Fail if we don't know it.
        const prevChain = await this._store.get(block.prevHash.toBase64());
        if (!prevChain) {
            Log.v(Blockchain, `Discarding block ${hash.toBase64()} - previous block ${block.prevHash.toBase64()} unknown`);
            return Blockchain.PUSH_ERR_ORPHAN_BLOCK;
        }

        // Check all intrinsic block invariants.
        if (!(await this._verifyBlock(block))) {
            return Blockchain.PUSH_ERR_INVALID_BLOCK;
        }

        // Check that the block is a valid extension of its previous block.
        if (!(await this._isValidExtension(prevChain, block))) {
            return Blockchain.PUSH_ERR_INVALID_BLOCK;
        }

        // Block looks good, compute the new total work & height.
        const totalWork = prevChain.totalWork + block.difficulty;
        const height = prevChain.height + 1;

        // Store the new block.
        let newChain = knownChain;
        if (!knownChain) {
            newChain = new Chain(block, totalWork, height);
            await this._store.put(newChain);
        }

        // Check if the new block extends our current main chain.
        if (block.prevHash.equals(this._headHash)) {
            // Append new block to the main chain.
            if (!(await this._extend(newChain, hash))) {
                return Blockchain.PUSH_ERR_INVALID_BLOCK;
            }

            // Tell listeners that the head of the chain has changed.
            this.fire('head-changed', this.head);

            return Blockchain.PUSH_OK;
        }

        // Otherwise, check if the new chain is harder than our current main chain:
        if (this._isHarderChain(newChain, hash)) {
            // A fork has become the hardest chain, rebranch to it.
            await this._rebranch(newChain, hash);

            // Tell listeners that the head of the chain has changed.
            this.fire('head-changed', this.head);

            return Blockchain.PUSH_OK;
        }

        // Otherwise, we are creating/extending a fork. We have stored the block,
        // the head didn't change, nothing else to do.
        Log.v(Blockchain, `Creating/extending fork with block ${hash.toBase64()}, height=${newChain.height}, totalWork=${newChain.totalWork}`);

        return Blockchain.PUSH_OK;
    }

    _isHarderChain(newChain, headHash) {
        // - Pick chain with higher total work.
        // - If identical, pick chain with higher timestamp.
        // - If identical as well, pick chain with lower PoW hash.
        let isHarderChain = false;
        if (newChain.totalWork > this.totalWork) {
            isHarderChain = true;
        } else if (newChain.totalWork === this.totalWork) {
            if (newChain.head.timestamp > this.head.timestamp) {
                isHarderChain = true;
            } else if (newChain.head.timestamp === this.head.timestamp
                && parseInt(headHash.toHex(), 16) < parseInt(this.headHash.toHex(), 16)) {
                isHarderChain = true;
            }
        }
        return isHarderChain;
    }

    async _verifyBlock(block) {
        // Check that the maximum block size is not exceeded.
        if (block.serializedSize > Policy.BLOCK_SIZE_MAX) {
            Log.w(Blockchain, 'Rejected block - max block size exceeded');
            return false;
        }

        // XXX Check that there is only one transaction per sender per block.
        const senderPubKeys = {};
        for (const tx of block.body.transactions) {
            if (senderPubKeys[tx.senderPubKey]) {
                Log.w(Blockchain, 'Rejected block - more than one transaction per sender');
                return false;
            }
            if (tx.recipientAddr.equals(await tx.getSenderAddr())) {  // eslint-disable-line no-await-in-loop
                Log.w(Blockchain, 'Rejected block - sender and recipient coincide');
                return false;
            }
            senderPubKeys[tx.senderPubKey] = true;
        }

        // Verify that the block's timestamp is not too far in the future.
        // TODO Use network-adjusted time (see https://en.bitcoin.it/wiki/Block_timestamp).
        const maxTimestamp = Math.floor((Date.now() + Blockchain.BLOCK_TIMESTAMP_DRIFT_MAX) / 1000);
        if (block.header.timestamp > maxTimestamp) {
            Log.w(Blockchain, 'Rejected block - timestamp too far in the future');
            return false;
        }

        // Check that the headerHash matches the difficulty.
        if (!(await block.header.verifyProofOfWork())) {
            Log.w(Blockchain, 'Rejected block - PoW verification failed');
            return false;
        }

        // Check that header bodyHash matches the actual bodyHash.
        const bodyHash = await block.body.hash();
        if (!block.header.bodyHash.equals(bodyHash)) {
            Log.w(Blockchain, 'Rejecting block - body hash mismatch');
            return false;
        }
        // Check that all transaction signatures are valid.
        for (const tx of block.body.transactions) {
            if (!(await tx.verifySignature())) { // eslint-disable-line no-await-in-loop
                Log.w(Blockchain, 'Rejected block - invalid transaction signature');
                return false;
            }
        }

        // Everything checks out.
        return true;
    }

    async _isValidExtension(chain, block) {
        // Check that the height is one higher than previous
        if (chain.height !== block.header.height - 1) {
            Log.w(Blockchain, 'Rejecting block - not next in height');
            return false;
        }

        // Check that the difficulty matches.
        const nextCompactTarget = await this.getNextCompactTarget(chain);
        if (nextCompactTarget !== block.nBits) {
            Log.w(Blockchain, 'Rejecting block - difficulty mismatch');
            return false;
        }

        // Check that the timestamp is after (or equal) the previous block's timestamp.
        if (chain.head.timestamp > block.timestamp) {
            Log.w(Blockchain, 'Rejecting block - timestamp mismatch');
            return false;
        }

        // Everything checks out.
        return true;
    }

    async _extend(newChain, headHash) {
        // Validate that the block matches the current account state.
        try {
            await this._accounts.commitBlock(newChain.head);
        } catch (e) {
            // AccountsHash mismatch. This can happen if someone gives us an
            // invalid block. TODO error handling
            Log.w(Blockchain, `Rejecting block, AccountsHash mismatch: bodyHash=${newChain.head.bodyHash}, accountsHash=${newChain.head.accountsHash}`);
            return false;
        }

        // Update main chain.
        this._mainChain = newChain;
        this._mainPath.push(headHash);
        this._headHash = headHash;
        await this._store.setMainChain(this._mainChain);

        return true;
    }

    async _revert() {
        // Load the predecessor chain.
        const prevHash = this.head.prevHash;
        const prevChain = await this._store.get(prevHash.toBase64());
        if (!prevChain) throw `Failed to find predecessor block ${prevHash.toBase64()} while reverting`;

        // Test first
        const tmpAccounts = await this.createTemporaryAccounts();
        await tmpAccounts.revertBlock(this.head);
        const tmpHash = await tmpAccounts.hash();
        Log.d(Blockchain, `AccountsHash after revert: ${tmpHash}`);
        if (!tmpHash.equals(prevChain.head.accountsHash)) {
            throw 'Failed to revert main chain - inconsistent state';
        }

        // Revert the head block of the main chain.
        await this._accounts.revertBlock(this.head);

        // Update main chain.
        this._mainChain = prevChain;
        this._mainPath.pop();
        this._headHash = prevHash;
        await this._store.setMainChain(this._mainChain);

        // XXX Sanity check: Assert that the accountsHash now matches the
        // accountsHash of the current head.
        const accountsHash = await this.accountsHash();
        Log.d(Blockchain, `AccountsHash after revert: ${accountsHash}`);

        if (!accountsHash.equals(this.head.accountsHash)) {
            throw 'Failed to revert main chain - inconsistent state';
        }
    }

    async _rebranch(newChain, headHash) {
        Log.v(Blockchain, `Rebranching to fork ${headHash}, height=${newChain.height}, totalWork=${newChain.totalWork}`);

        // Find the common ancestor between our current main chain and the fork chain.
        // Walk up the fork chain until we find a block that is part of the main chain.
        // Store the chain along the way. In the worst case, this walks all the way
        // up to the genesis block.
        let forkHead = newChain.head;
        const forkChain = [newChain];
        while (this._mainPath.indexOf(forkHead.prevHash) < 0) {
            const prevChain = await this._store.get(forkHead.prevHash.toBase64()); // eslint-disable-line no-await-in-loop
            if (!prevChain) throw `Failed to find predecessor block ${forkHead.prevHash.toBase64()} while rebranching`;

            forkHead = prevChain.head;
            forkChain.unshift(prevChain);
        }

        // The predecessor of forkHead is the desired common ancestor.
        const commonAncestor = forkHead.prevHash;

        Log.v(Blockchain, `Found common ancestor ${commonAncestor.toBase64()} ${forkChain.length} blocks up`);

        // Revert all blocks on the current main chain until the common ancestor.
        while (!this.headHash.equals(commonAncestor)) {
            await this._revert(); // eslint-disable-line no-await-in-loop
        }

        // We have reverted to the common ancestor state. Apply all blocks on
        // the fork chain until we reach the new head.
        for (const chain of forkChain) {
            // XXX optimize!
            const hash = await chain.hash(); // eslint-disable-line no-await-in-loop
            await this._extend(chain, hash); // eslint-disable-line no-await-in-loop
        }
    }

    async getBlock(hash) {
        const chain = await this._store.get(hash.toBase64());
        return chain ? chain.head : null;
    }

    async getNextCompactTarget(chain) {
        chain = chain || this._mainChain;

        // The difficulty is adjusted every DIFFICULTY_ADJUSTMENT_BLOCKS blocks.
        if (chain.height % Policy.DIFFICULTY_ADJUSTMENT_BLOCKS === 0) {
            // If the given chain is the main chain, get the last DIFFICULTY_ADJUSTMENT_BLOCKS
            // blocks via this._mainChain, otherwise fetch the path.
            let startHash;
            if (chain === this._mainChain) {
                const startHeight = Math.max(this._mainPath.length - Policy.DIFFICULTY_ADJUSTMENT_BLOCKS, 0);
                startHash = this._mainPath[startHeight];
            } else {
                const path = await this._fetchPath(chain.head, Policy.DIFFICULTY_ADJUSTMENT_BLOCKS - 1);
                startHash = path[0];
            }

            // Compute the actual time it took to mine the last DIFFICULTY_ADJUSTMENT_BLOCKS blocks.
            const startChain = await this._store.get(startHash.toBase64());
            const actualTime = chain.head.timestamp - startChain.head.timestamp;

            // Compute the target adjustment factor.
            const expectedTime = Policy.DIFFICULTY_ADJUSTMENT_BLOCKS * Policy.BLOCK_TIME;
            let adjustment = actualTime / expectedTime;

            // Clamp the adjustment factor to [0.25, 4].
            adjustment = Math.max(adjustment, 0.25);
            adjustment = Math.min(adjustment, 4);

            // Compute the next target.
            const currentTarget = chain.head.target;
            let nextTarget = currentTarget * adjustment;

            // Make sure the target is below or equal the maximum allowed target (difficulty 1).
            // Also enforce a minimum target of 1.
            nextTarget = Math.min(nextTarget, Policy.BLOCK_TARGET_MAX);
            nextTarget = Math.max(nextTarget, 1);

            return BlockUtils.targetToCompact(nextTarget);
        }

        // If the difficulty is not adjusted at this height, the next difficulty
        // is the current difficulty.
        return chain.head.nBits;
    }

    get head() {
        return this._mainChain.head;
    }

    get totalWork() {
        return this._mainChain.totalWork;
    }

    get height() {
        return this._mainChain.height;
    }

    get headHash() {
        return this._headHash;
    }

    get path() {
        return this._mainPath;
    }

    get busy() {
        return this._synchronizer.working;
    }

    get checkpointLoaded() {
        return this._checkpointLoaded;
    }

    accountsHash() {
        return this._accounts.hash();
    }

    async exportMainPath(height) {
        height = height || this.head.height;
        const blocks = {};
        const path = [];

        for (let i = 0; i < this._mainPath.length; ++i) {
            const blockHash = this._mainPath[i];
            const block = await this.getBlock(blockHash);
            if (block.height > height) break;
            path.push(blockHash.toBase64());
            blocks[blockHash] = BufferUtils.toBase64(block.serialize());
        }

        return {
            'path': path,
            'blocks': blocks
        };
    }

    async exportAccounts(height) {
        height = height || this.head.height;
        const accounts = await Accounts.createTemporary(this._accounts);

        let currentBlock = this.head;
        // Do not revert the block with the desired height!
        while (currentBlock.height > height) {
            await accounts.revertBlock(currentBlock);
            currentBlock = await this.getBlock(currentBlock.prevHash);
        }

        if (!currentBlock.accountsHash.equals(await accounts.hash())) {
            throw 'AccountsHash mismatch while exporting';
        }

        if (!(await accounts._tree.verify())) {
            throw 'AccountsTree verification failed';
        }

        return accounts.export();
    }
}
Blockchain.BLOCK_TIMESTAMP_DRIFT_MAX = 1000 * 60 * 15; // 15 minutes
Blockchain.PUSH_OK = 0;
Blockchain.PUSH_ERR_KNOWN_BLOCK = 1;
Blockchain.PUSH_ERR_INVALID_BLOCK = -1;
Blockchain.PUSH_ERR_ORPHAN_BLOCK = -2;
Class.register(Blockchain);

class Chain {
    constructor(head, totalWork, height = 1) {
        this._head = head;
        this._totalWork = totalWork ? totalWork : head.difficulty;
        this._height = height;
    }

    static unserialize(buf) {
        const head = Block.unserialize(buf);
        const totalWork = buf.readFloat64();
        const height = buf.readUint32();
        return new Chain(head, totalWork, height);
    }

    serialize(buf) {
        buf = buf || new SerialBuffer(this.serializedSize);
        this._head.serialize(buf);
        buf.writeFloat64(this._totalWork);
        buf.writeUint32(this._height);
        return buf;
    }

    get serializedSize() {
        return this._head.serializedSize
            + /*totalWork*/ 8
            + /*height*/ 4;
    }

    get head() {
        return this._head;
    }

    get totalWork() {
        return this._totalWork;
    }

    get height() {
        return this._height;
    }

    hash() {
        return this._head.hash();
    }
}
Class.register(Chain);

class BlockchainStore {
    static getPersistent() {
        return new PersistentBlockchainStore();
    }

    static createVolatile() {
        return new VolatileBlockchainStore();
    }
}

class PersistentBlockchainStore extends ObjectDB {
    constructor() {
        super('blocks', Chain);
    }

    async getMainChain() {
        const key = await ObjectDB.prototype.getString.call(this, 'main');
        if (!key) return undefined;
        return ObjectDB.prototype.getObject.call(this, key);
    }

    async setMainChain(mainChain) {
        const key = await this.key(mainChain);
        return await ObjectDB.prototype.putString.call(this, 'main', key);
    }
}

class VolatileBlockchainStore {
    constructor() {
        this._store = {};
        this._mainChain = null;
    }

    async key(value) {
        return (await value.hash()).toBase64();
    }

    get(key) {
        return this._store[key];
    }

    async put(value) {
        const key = await this.key(value);
        this._store[key] = value;
        return key;
    }

    async remove(value) {
        const key = await this.key(value);
        delete this._store[key];
    }

    getMainChain() {
        return this._mainChain;
    }

    setMainChain(chain) {
        this._mainChain = chain;
    }
}
Class.register(BlockchainStore);

class Mempool extends Observable {
    constructor(blockchain, accounts) {
        super();
        this._blockchain = blockchain;
        this._accounts = accounts;

        // Our pool of transactions.
        this._transactions = {};

        // All public keys of transaction senders currently in the pool.
        this._senderPubKeys = {};

        // Listen for changes in the blockchain head to evict transactions that
        // have become invalid.
        blockchain.on('head-changed', () => this._evictTransactions());
    }

    async pushTransaction(transaction) {
        // Check if we already know this transaction.
        const hash = await transaction.hash();
        if (this._transactions[hash]) {
            Log.v(Mempool, `Ignoring known transaction ${hash.toBase64()}`);
            return false;
        }

        // Fully verify the transaction against the current accounts state.
        if (!(await this._verifyTransaction(transaction))) {
            return false;
        }

        // Only allow one transaction per senderPubKey at a time.
        // TODO This is a major limitation!
        if (this._senderPubKeys[transaction.senderPubKey]) {
            Log.w(Mempool, 'Rejecting transaction - duplicate sender public key');
            return false;
        }
        this._senderPubKeys[transaction.senderPubKey] = true;

        // Transaction is valid, add it to the mempool.
        this._transactions[hash] = transaction;

        // Tell listeners about the new valid transaction we received.
        this.fire('transaction-added', transaction);

        return true;
    }

    // Currently not asynchronous, but might be in the future.
    getTransaction(hash) {
        return this._transactions[hash];
    }

    // Currently not asynchronous, but might be in the future.
    getTransactions(maxCount = 5000) {
        // TODO Add logic here to pick the "best" transactions.
        const transactions = [];
        for (const hash in this._transactions) {
            if (transactions.length >= maxCount) break;
            transactions.push(this._transactions[hash]);
        }
        return transactions;
    }

    async _verifyTransaction(transaction) {
        // Verify transaction signature.
        if (!(await transaction.verifySignature())) {
            Log.w(Mempool, 'Rejected transaction - invalid signature', transaction);
            return false;
        }

        // Do not allow transactions where sender and recipient coincide.
        if (transaction.recipientAddr.equals(await transaction.getSenderAddr())) {
            Log.w(Mempool, 'Rejecting transaction - sender and recipient coincide');
            return false;
        }

        // Verify transaction balance.
        return this._verifyTransactionBalance(transaction);
    }

    async _verifyTransactionBalance(transaction, quiet) {
        // Verify balance and nonce:
        // - sender account balance must be greater or equal the transaction value + fee.
        // - sender account nonce must match the transaction nonce.
        const senderAddr = await transaction.getSenderAddr();
        const senderBalance = await this._accounts.getBalance(senderAddr);
        if (senderBalance.value < (transaction.value + transaction.fee)) {
            if (!quiet) Log.w(Mempool, 'Rejected transaction - insufficient funds', transaction);
            return false;
        }

        if (senderBalance.nonce !== transaction.nonce) {
            if (!quiet) Log.w(Mempool, 'Rejected transaction - invalid nonce', transaction);
            return false;
        }

        // Everything checks out.
        return true;
    }

    async _evictTransactions() {
        // Evict all transactions from the pool that have become invalid due
        // to changes in the account state (i.e. typically because the were included
        // in a newly mined block). No need to re-check signatures.
        for (const hash in this._transactions) {
            const transaction = this._transactions[hash];
            if (!(await this._verifyTransactionBalance(transaction, true))) { // eslint-disable-line no-await-in-loop
                delete this._transactions[hash];
                delete this._senderPubKeys[transaction.senderPubKey];
            }
        }

        // Tell listeners that the pool has updated after a blockchain head change.
        this.fire('transactions-ready');
    }
}
Class.register(Mempool);

class ConsensusAgent extends Observable {
    constructor(blockchain, mempool, peer) {
        super();
        this._blockchain = blockchain;
        this._mempool = mempool;
        this._peer = peer;

        // Flag indicating that we are currently syncing our blockchain with the peer's.
        this._syncing = false;

        // Flag indicating that have synced our blockchain with the peer's.
        this._synced = false;

        // The height of our blockchain when we last attempted to sync the chain.
        this._lastChainHeight = 0;

        // The number of failed blockchain sync attempts.
        this._failedSyncs = 0;

        // Set of all objects (InvVectors) that we think the remote peer knows.
        this._knownObjects = new HashSet();

        // InvVectors we want to request via getdata are collected here and
        // periodically requested.
        this._objectsToRequest = new IndexedArray([], true);

        // Objects that are currently being requested from the peer.
        this._objectsInFlight = null;

        // Helper object to keep track of timeouts & intervals.
        this._timers = new Timers();

        // Listen to consensus messages from the peer.
        peer.channel.on('inv',          msg => this._onInv(msg));
        peer.channel.on('getdata',      msg => this._onGetData(msg));
        peer.channel.on('notfound',     msg => this._onNotFound(msg));
        peer.channel.on('block',        msg => this._onBlock(msg));
        peer.channel.on('tx',           msg => this._onTx(msg));
        peer.channel.on('getblocks',    msg => this._onGetBlocks(msg));
        peer.channel.on('mempool',      msg => this._onMempool(msg));

        // Clean up when the peer disconnects.
        peer.channel.on('close', () => this._onClose());

        // Wait for the blockchain to processes queued blocks before requesting more.
        this._blockchain.on('ready', () => {
            if (this._syncing) this.syncBlockchain();
        });
    }

    /* Public API */

    async relayBlock(block) {
        // Don't relay if no consensus established yet.
        if (!this._synced) {
            return;
        }

        // Create InvVector.
        const hash = await block.hash();
        const vector = new InvVector(InvVector.Type.BLOCK, hash);

        // Don't relay block to this peer if it already knows it.
        if (this._knownObjects.contains(vector)) {
            return;
        }

        // Relay block to peer.
        this._peer.channel.inv([vector]);

        // Assume that the peer knows this block now.
        this._knownObjects.add(vector);
    }

    async relayTransaction(transaction) {
        // TODO Don't relay if no consensus established yet ???

        // Create InvVector.
        const hash = await transaction.hash();
        const vector = new InvVector(InvVector.Type.TRANSACTION, hash);

        // Don't relay transaction to this peer if it already knows it.
        if (this._knownObjects.contains(vector)) {
            return;
        }

        // Relay transaction to peer.
        this._peer.channel.inv([vector]);

        // Assume that the peer knows this transaction now.
        this._knownObjects.add(vector);
    }

    syncBlockchain() {
        this._syncing = true;

        // If the blockchain is still busy processing blocks, wait for it to catch up.
        if (this._blockchain.busy) {
            Log.v(ConsensusAgent, 'Blockchain busy, waiting ...');
        }
        // If we already requested blocks from the peer but it didn't give us any
        // good ones, retry or drop the peer.
        else if (this._lastChainHeight === this._blockchain.height) {
            this._failedSyncs++;
            if (this._failedSyncs < ConsensusAgent.MAX_SYNC_ATTEMPTS) {
                this._requestBlocks();
            } else {
                this._peer.channel.ban('blockchain sync failed');
            }
        }
        // If the peer has a longer chain than us, request blocks from it.
        else if (this._blockchain.height < this._peer.startHeight) {
            this._lastChainHeight = this._blockchain.height;
            this._requestBlocks();
        }
        // The peer has a shorter chain than us.
        // TODO what do we do here?
        else if (this._blockchain.height > this._peer.startHeight) {
            Log.v(ConsensusAgent, `Peer ${this._peer.peerAddress} has a shorter chain (${this._peer.startHeight}) than us`);

            // XXX assume consensus state?
            this._syncing = false;
            this._synced = true;
            this.fire('sync');
        }
        // We have the same chain height as the peer.
        // TODO Do we need to check that we have the same head???
        else {
            // Consensus established.
            this._syncing = false;
            this._synced = true;
            this.fire('sync');
        }
    }

    _requestBlocks() {
        // XXX Only one getblocks request at a time.
        if (this._timers.timeoutExists('getblocks')) {
            Log.e(ConsensusAgent, `Duplicate _requestBlocks()`);
            return;
        }

        // Request blocks starting from our hardest chain head going back to
        // the genesis block. Space out blocks more when getting closer to the
        // genesis block.
        const hashes = [];
        let step = 1;
        for (let i = this._blockchain.path.length - 1; i >= 0; i -= step) {
            // Push top 10 hashes first, then back off exponentially.
            if (hashes.length >= 10) {
                step *= 2;
            }
            hashes.push(this._blockchain.path[i]);
        }

        // Push the genesis block hash.
        if (hashes.length === 0 || !hashes[hashes.length-1].equals(Block.GENESIS.HASH)) {
            hashes.push(Block.GENESIS.HASH);
        }

        // Request blocks from peer.
        this._peer.channel.getblocks(hashes);

        // Drop the peer if it doesn't start sending InvVectors for its chain within the timeout.
        // TODO should we ban here instead?
        this._timers.setTimeout('getblocks', () => {
            this._timers.clearTimeout('getblocks');
            this._peer.channel.close('getblocks timeout');
        }, ConsensusAgent.REQUEST_TIMEOUT);
    }

    async _onInv(msg) {
        // Clear the getblocks timeout.
        this._timers.clearTimeout('getblocks');

        // Keep track of the objects the peer knows.
        for (const vector of msg.vectors) {
            this._knownObjects.add(vector);
        }

        // Check which of the advertised objects we know
        // Request unknown objects, ignore known ones.
        const unknownObjects = [];
        for (const vector of msg.vectors) {
            switch (vector.type) {
                case InvVector.Type.BLOCK: {
                    const block = await this._blockchain.getBlock(vector.hash);
                    if (!block) {
                        unknownObjects.push(vector);
                    }
                    break;
                }
                case InvVector.Type.TRANSACTION: {
                    const tx = await this._mempool.getTransaction(vector.hash);
                    if (!tx) {
                        unknownObjects.push(vector);
                    }
                    break;
                }
                default:
                    throw `Invalid inventory type: ${vector.type}`;
            }
        }

        Log.v(ConsensusAgent, `[INV] ${msg.vectors.length} vectors (${unknownObjects.length} new) received from ${this._peer.peerAddress}`);

        if (unknownObjects.length > 0) {
            // Store unknown vectors in objectsToRequest array.
            for (const obj of unknownObjects) {
                this._objectsToRequest.push(obj);
            }

            // Clear the request throttle timeout.
            this._timers.clearTimeout('inv');

            // If there are enough objects queued up, send out a getdata request.
            if (this._objectsToRequest.length >= ConsensusAgent.REQUEST_THRESHOLD) {
                this._requestData();
            }
            // Otherwise, wait a short time for more inv messages to arrive, then request.
            else {
                this._timers.setTimeout('inv', () => this._requestData(), ConsensusAgent.REQUEST_THROTTLE);
            }
        } else {
            // XXX The peer is weird. Give him another chance.
            this._noMoreData();
        }
    }

    _requestData() {
        // Only one request at a time.
        if (this._objectsInFlight) return;

        // Don't do anything if there are no objects queued to request.
        if (this._objectsToRequest.isEmpty()) return;

        // Mark the requested objects as in-flight.
        this._objectsInFlight = this._objectsToRequest;

        // Request all queued objects from the peer.
        // TODO depending in the REQUEST_THRESHOLD, we might need to split up
        // the getdata request into multiple ones.
        this._peer.channel.getdata(this._objectsToRequest.array);

        // Reset the queue.
        this._objectsToRequest = new IndexedArray([], true);

        // Set timer to detect end of request / missing objects
        this._timers.setTimeout('getdata', () => this._noMoreData(), ConsensusAgent.REQUEST_TIMEOUT);
    }

    _noMoreData() {
        // Cancel the request timeout timer.
        this._timers.clearTimeout('getdata');

        // Reset objects in flight.
        this._objectsInFlight = null;

        // If there are more objects to request, request them.
        if (!this._objectsToRequest.isEmpty()) {
            this._requestData();
        }
        // Otherwise, request more blocks if we are still syncing the blockchain.
        else if (this._syncing) {
            this.syncBlockchain();
        }
    }

    async _onBlock(msg) {
        const hash = await msg.block.hash();

        // Check if we have requested this block.
        const vector = new InvVector(InvVector.Type.BLOCK, hash);
        if (!this._objectsInFlight || this._objectsInFlight.indexOf(vector) < 0) {
            Log.w(ConsensusAgent, `Unsolicited block ${hash} received from ${this._peer.peerAddress}, discarding`);
            // TODO What should happen here? ban? drop connection?
            // Might not be unsolicited but just arrive after our timeout has triggered.
            return;
        }

        // Mark object as received.
        this._onObjectReceived(vector);

        // Put block into blockchain.
        const status = await this._blockchain.pushBlock(msg.block);

        // TODO send reject message if we don't like the block
        if (status === Blockchain.PUSH_ERR_INVALID_BLOCK) {
            this._peer.channel.ban('received invalid block');
        }
    }

    async _onTx(msg) {
        const hash = await msg.transaction.hash();
        Log.i(ConsensusAgent, `[TX] Received transaction ${hash} from ${this._peer.peerAddress}`);

        // Check if we have requested this transaction.
        const vector = new InvVector(InvVector.Type.TRANSACTION, hash);
        if (!this._objectsInFlight || this._objectsInFlight.indexOf(vector) < 0) {
            Log.w(ConsensusAgent, `Unsolicited transaction ${hash} received from ${this._peer.peerAddress}, discarding`);
            return;
        }

        // Mark object as received.
        this._onObjectReceived(vector);

        // Put transaction into mempool.
        this._mempool.pushTransaction(msg.transaction);

        // TODO send reject message if we don't like the transaction
        // TODO what to do if the peer keeps sending invalid transactions?
    }

    _onNotFound(msg) {
        Log.d(ConsensusAgent, `[NOTFOUND] ${msg.vectors.length} unknown objects received from ${this._peer.peerAddress}`);

        // Remove unknown objects from in-flight list.
        for (const vector of msg.vectors) {
            if (!this._objectsInFlight || this._objectsInFlight.indexOf(vector) < 0) {
                Log.w(ConsensusAgent, `Unsolicited notfound vector received from ${this._peer.peerAddress}, discarding`);
                continue;
            }

            this._onObjectReceived(vector);
        }
    }

    _onObjectReceived(vector) {
        if (!this._objectsInFlight) return;

        // Remove the vector from the objectsInFlight.
        this._objectsInFlight.remove(vector);

        // Reset the request timeout if we expect more objects to come.
        if (!this._objectsInFlight.isEmpty()) {
            this._timers.resetTimeout('getdata', () => this._noMoreData(), ConsensusAgent.REQUEST_TIMEOUT);
        } else {
            this._noMoreData();
        }
    }


    /* Request endpoints */

    async _onGetData(msg) {
        // Keep track of the objects the peer knows.
        for (const vector of msg.vectors) {
            this._knownObjects.add(vector);
        }

        // Check which of the requested objects we know.
        // Send back all known objects.
        // Send notfound for unknown objects.
        const unknownObjects = [];
        for (const vector of msg.vectors) {
            switch (vector.type) {
                case InvVector.Type.BLOCK: {
                    const block = await this._blockchain.getBlock(vector.hash);
                    if (block) {
                        // We have found a requested block, send it back to the sender.
                        this._peer.channel.block(block);
                    } else {
                        // Requested block is unknown.
                        unknownObjects.push(vector);
                    }
                    break;
                }
                case InvVector.Type.TRANSACTION: {
                    const tx = await this._mempool.getTransaction(vector.hash);
                    if (tx) {
                        // We have found a requested transaction, send it back to the sender.
                        this._peer.channel.tx(tx);
                    } else {
                        // Requested transaction is unknown.
                        unknownObjects.push(vector);
                    }
                    break;
                }
                default:
                    throw `Invalid inventory type: ${vector.type}`;
            }
        }

        // Report any unknown objects back to the sender.
        if (unknownObjects.length) {
            this._peer.channel.notfound(unknownObjects);
        }
    }

    async _onGetBlocks(msg) {
        Log.v(ConsensusAgent, `[GETBLOCKS] ${msg.hashes.length} block locators received from ${this._peer.peerAddress}`);

        // A peer has requested blocks. Check all requested block locator hashes
        // in the given order and pick the first hash that is found on our main
        // chain, ignore the rest. If none of the requested hashes is found,
        // pick the genesis block hash. Send the main chain starting from the
        // picked hash back to the peer.
        // TODO honor hashStop argument
        const mainPath = this._blockchain.path;
        let startIndex = -1;

        for (const hash of msg.hashes) {
            // Shortcut for genesis block which will be the only block sent by
            // fresh peers.
            if (Block.GENESIS.HASH.equals(hash)) {
                startIndex = 0;
                break;
            }

            // Check if we know the requested block.
            const block = await this._blockchain.getBlock(hash);

            // If we don't know the block, try the next one.
            if (!block) continue;

            // If the block is not on our main chain, try the next one.
            // mainPath is an IndexedArray with constant-time .indexOf()
            startIndex = mainPath.indexOf(hash);
            if (startIndex < 0) continue;

            // We found a block, ignore remaining block locator hashes.
            break;
        }

        // If we found none of the requested blocks on our main chain,
        // start with the genesis block.
        if (startIndex < 0) {
            // XXX Assert that the full path back to genesis is available in
            // blockchain.path. When the chain grows very long, it makes no
            // sense to keep the full path in memory.
            // We relax this assumption for clients that have a checkpoint loaded.
            if (this._blockchain.path.length !== this._blockchain.height
                    && !(this._blockchain.path.length > 0 && this._blockchain.checkPointLoaded && this._blockchain.path[0].equals(Block.CHECKPOINT.HASH))) {
                throw 'Blockchain.path.length != Blockchain.height';
            }

            startIndex = 0;
        }

        // Collect up to GETBLOCKS_VECTORS_MAX inventory vectors for the blocks starting right
        // after the identified block on the main chain.
        const stopIndex = Math.min(mainPath.length - 1, startIndex + ConsensusAgent.GETBLOCKS_VECTORS_MAX);
        const vectors = [];
        for (let i = startIndex + 1; i <= stopIndex; ++i) {
            vectors.push(new InvVector(InvVector.Type.BLOCK, mainPath[i]));
        }

        // Send the vectors back to the requesting peer.
        this._peer.channel.inv(vectors);
    }

    async _onMempool(msg) {
        // Query mempool for transactions
        const transactions = await this._mempool.getTransactions();

        // Send transactions back to sender.
        for (const tx of transactions) {
            this._peer.channel.tx(tx);
        }
    }

    _onClose() {
        // Clear all timers and intervals when the peer disconnects.
        this._timers.clearAll();

        this.fire('close', this);
    }

    get peer() {
        return this._peer;
    }

    get synced() {
        return this._synced;
    }
}
// Number of InvVectors in invToRequest pool to automatically trigger a getdata request.
ConsensusAgent.REQUEST_THRESHOLD = 50;
// Time to wait after the last received inv message before sending getdata.
ConsensusAgent.REQUEST_THROTTLE = 500; // ms
// Maximum time to wait after sending out getdata or receiving the last object for this request.
ConsensusAgent.REQUEST_TIMEOUT = 5000; // ms
// Maximum number of blockchain sync retries before closing the connection.
// XXX If the peer is on a long fork, it will count as a failed sync attempt
// if our blockchain doesn't switch to the fork within 500 (max InvVectors returned by getblocks)
// blocks.
ConsensusAgent.MAX_SYNC_ATTEMPTS = 5;
// Maximum number of inventory vectors to sent in the response for onGetBlocks.
ConsensusAgent.GETBLOCKS_VECTORS_MAX = 500;
Class.register(ConsensusAgent);

class Consensus extends Observable {
    constructor(blockchain, mempool, network) {
        super();
        this._blockchain = blockchain;
        this._mempool = mempool;

        this._agents = new HashMap();
        this._timers = new Timers();
        this._syncing = false;
        this._established = false;

        network.on('peer-joined', peer => this._onPeerJoined(peer));
        network.on('peer-left', peer => this._onPeerLeft(peer));

        // Notify peers when our blockchain head changes.
        blockchain.on('head-changed', head => {
            // Don't announce head changes if we are not synced yet.
            if (!this._established) return;

            for (const agent of this._agents.values()) {
                agent.relayBlock(head);
            }
        });

        // Relay new (verified) transactions to peers.
        mempool.on('transaction-added', tx => {
            // Don't relay transactions if we are not synced yet.
            if (!this._established) return;

            for (const agent of this._agents.values()) {
                agent.relayTransaction(tx);
            }
        });
    }

    _onPeerJoined(peer) {
        // Create a ConsensusAgent for each peer that connects.
        const agent = new ConsensusAgent(this._blockchain, this._mempool, peer);
        this._agents.put(peer.id, agent);

        // If no more peers connect within the specified timeout, start syncing.
        this._timers.resetTimeout('sync', this._syncBlockchain.bind(this), Consensus.SYNC_THROTTLE);
    }

    _onPeerLeft(peer) {
        this._agents.remove(peer.id);
    }

    _syncBlockchain() {
        // Wait for ongoing sync to finish.
        if (this._syncing) {
            return;
        }

        // Find the peers with the hardest chain that aren't sync'd yet.
        let bestTotalWork = -1;
        let bestAgents = [];
        for (const agent of this._agents.values()) {
            if (!agent.synced && agent.peer.totalWork > bestTotalWork) {
                bestTotalWork = agent.peer.totalWork;
                bestAgents = [agent];
            } else if (!agent.synced && agent.peer.totalWork === bestTotalWork) {
                bestAgents.push(agent);
            }
        }
        // Choose a random peer from those.
        let bestAgent = null;
        if (bestAgents.length > 0) {
            bestAgent = bestAgents[Math.floor(Math.random() * bestAgents.length)];
        }

        if (!bestAgent) {
            // We are synced with all connected peers.
            this._syncing = false;

            if (this._agents.length > 0) {
                // Report consensus-established if we have at least one connected peer.
                Log.d(Consensus, `Synced with all connected peers (${this._agents.length}), consensus established.`);
                Log.d(Consensus, `Blockchain: height=${this._blockchain.height}, totalWork=${this._blockchain.totalWork}, headHash=${this._blockchain.headHash}`);

                this._established = true;
                this.fire('established');
            } else {
                // We are not connected to any peers anymore. Report consensus-lost.
                this._established = false;
                this.fire('lost');
            }

            return;
        }

        Log.v(Consensus, `Syncing blockchain with peer ${bestAgent.peer.peerAddress}`);

        this._syncing = true;

        // If we expect this sync to change our blockchain height, tell listeners about it.
        if (bestAgent.peer.startHeight > this._blockchain.height) {
            this.fire('syncing', bestAgent.peer.startHeight);
        }

        bestAgent.on('sync', () => this._onPeerSynced());
        bestAgent.on('close', () => {
            this._onPeerLeft(bestAgent.peer);
            this._onPeerSynced();
        });
        bestAgent.syncBlockchain();
    }

    _onPeerSynced() {
        this._syncing = false;
        this._syncBlockchain();
    }

    get established() {
        return this._established;
    }

    // TODO confidence level?
}
Consensus.SYNC_THROTTLE = 1500; // 1.5 seconds
Class.register(Consensus);

class Protocol {
}
Protocol.DUMB = 0;
Protocol.WS = 1;
Protocol.RTC = 2;
Class.register(Protocol);

class NetAddress {
    static fromIP(ip) {
        const saneIp = NetUtils.sanitizeIP(ip);
        return new NetAddress(saneIp);
    }

    constructor(ip) {
        this._ip = ip;
    }

    static unserialize(buf) {
        const ip = buf.readVarLengthString();

        // Allow empty NetAddresses.
        if (!ip) {
            return NetAddress.UNSPECIFIED;
        }

        return NetAddress.fromIP(ip);
    }

    serialize(buf) {
        buf = buf || new SerialBuffer(this.serializedSize);
        buf.writeVarLengthString(this._ip);
        return buf;
    }

    get serializedSize() {
        return /*extraByte VarLengthString ip*/ 1
            + /*ip*/ this._ip.length;
    }

    equals(o) {
        return o instanceof NetAddress
            && this._ip === o.ip;
    }

    hashCode() {
        return this.toString();
    }

    toString() {
        return `${this._ip}`;
    }

    get ip() {
        return this._ip;
    }

    isPseudo() {
        return !this._ip || NetAddress.UNKNOWN.equals(this);
    }

    isPrivate() {
        return this.isPseudo() || NetUtils.isPrivateIP(this._ip);
    }
}
NetAddress.UNSPECIFIED = new NetAddress('');
NetAddress.UNKNOWN = new NetAddress('<unknown>');
Class.register(NetAddress);

class PeerAddress {
    constructor(protocol, services, timestamp, netAddress) {
        this._protocol = protocol;
        this._services = services;
        this._timestamp = timestamp;
        this._netAddress = netAddress || NetAddress.UNSPECIFIED;
    }

    static unserialize(buf) {
        const protocol = buf.readUint8();
        switch (protocol) {
            case Protocol.WS:
                return WsPeerAddress.unserialize(buf);

            case Protocol.RTC:
                return RtcPeerAddress.unserialize(buf);

            case Protocol.DUMB:
                return DumbPeerAddress.unserialize(buf);

            default:
                throw `Malformed PeerAddress protocol ${protocol}`;
        }
    }

    serialize(buf) {
        buf = buf || new SerialBuffer(this.serializedSize);
        buf.writeUint8(this._protocol);
        buf.writeUint32(this._services);
        buf.writeUint64(this._timestamp);

        // Never serialize private netAddresses.
        if (this._netAddress.isPrivate()) {
            NetAddress.UNSPECIFIED.serialize(buf);
        } else {
            this._netAddress.serialize(buf);
        }

        return buf;
    }

    get serializedSize() {
        return /*protocol*/ 1
            + /*services*/ 4
            + /*timestamp*/ 8
            + this._netAddress.serializedSize;
    }

    equals(o) {
        return o instanceof PeerAddress
            && this._protocol === o.protocol;
            /* services is ignored */
            /* timestamp is ignored */
            /* netAddress is ignored */
    }

    get protocol() {
        return this._protocol;
    }

    get services() {
        return this._services;
    }

    get timestamp() {
        return this._timestamp;
    }

    set timestamp(value) {
        // Never change the timestamp of a seed address.
        if (this.isSeed()) {
            return;
        }
        this._timestamp = value;
    }

    get netAddress() {
        return this._netAddress.isPseudo() ? null : this._netAddress;
    }

    set netAddress(value) {
        this._netAddress = value || NetAddress.UNSPECIFIED;
    }

    isSeed() {
        return this._timestamp === 0;
    }
}
Class.register(PeerAddress);

class WsPeerAddress extends PeerAddress {
    static seed(host, port) {
        return new WsPeerAddress(Services.DEFAULT, /*timestamp*/ 0, NetAddress.UNSPECIFIED, host, port);
    }

    constructor(services, timestamp, netAddress, host, port) {
        super(Protocol.WS, services, timestamp, netAddress);
        if (!host) throw 'Malformed host';
        if (!NumberUtils.isUint16(port)) throw 'Malformed port';
        this._host = host;
        this._port = port;
    }

    static unserialize(buf) {
        const services = buf.readUint32();
        const timestamp = buf.readUint64();
        const netAddress = NetAddress.unserialize(buf);
        const host = buf.readVarLengthString();
        const port = buf.readUint16();
        return new WsPeerAddress(services, timestamp, netAddress, host, port);
    }

    serialize(buf) {
        buf = buf || new SerialBuffer(this.serializedSize);
        super.serialize(buf);
        buf.writeVarLengthString(this._host);
        buf.writeUint16(this._port);
        return buf;
    }

    get serializedSize() {
        return super.serializedSize
            + /*extra byte VarLengthString host*/ 1
            + this._host.length
            + /*port*/ 2;
    }

    equals(o) {
        return super.equals(o)
            && o instanceof WsPeerAddress
            && this._host === o.host
            && this._port === o.port;
    }

    hashCode() {
        return this.toString();
    }

    toString() {
        return `wss://${this._host}:${this._port}`;
    }

    get host() {
        return this._host;
    }

    get port() {
        return this._port;
    }
}
Class.register(WsPeerAddress);

class RtcPeerAddress extends PeerAddress {
    constructor(services, timestamp, netAddress, signalId, distance) {
        super(Protocol.RTC, services, timestamp, netAddress);
        if (!RtcPeerAddress.isSignalId(signalId)) throw 'Malformed signalId';
        if (!NumberUtils.isUint8(distance)) throw 'Malformed distance';
        this._signalId = signalId;
        this._distance = distance;
    }

    static isSignalId(arg) {
        return /[a-z0-9]{32}/i.test(arg);
    }

    static unserialize(buf) {
        const services = buf.readUint32();
        const timestamp = buf.readUint64();
        const netAddress = NetAddress.unserialize(buf);
        const signalId = buf.readString(32);
        const distance = buf.readUint8();
        return new RtcPeerAddress(services, timestamp, netAddress, signalId, distance);
    }

    serialize(buf) {
        buf = buf || new SerialBuffer(this.serializedSize);
        super.serialize(buf);
        buf.writeString(this._signalId, 32);
        buf.writeUint8(this._distance);
        return buf;
    }

    get serializedSize() {
        return super.serializedSize
            + /*signalId*/ 32
            + /*distance*/ 1;
    }

    equals(o) {
        return super.equals(o)
            && o instanceof RtcPeerAddress
            && this._signalId === o.signalId;
    }

    hashCode() {
        return this.toString();
    }

    toString() {
        return `rtc://${this._signalId}`;
    }

    get signalId() {
        return this._signalId;
    }

    get distance() {
        return this._distance;
    }

    // Changed when passed on to other peers.
    set distance(value) {
        this._distance = value;
    }
}
Class.register(RtcPeerAddress);

class DumbPeerAddress extends PeerAddress {
    constructor(services, timestamp, netAddress, id) {
        super(Protocol.DUMB, services, timestamp, netAddress);
        this._id = id;
    }

    static unserialize(buf) {
        const services = buf.readUint32();
        const timestamp = buf.readUint64();
        const netAddress = NetAddress.unserialize(buf);
        const id = buf.readUint64();
        return new DumbPeerAddress(services, timestamp, netAddress, id);
    }

    serialize(buf) {
        buf = buf || new SerialBuffer(this.serializedSize);
        super.serialize(buf);
        buf.writeUint64(this._id);
        return buf;
    }

    get serializedSize() {
        return super.serializedSize
            + /*id*/ 8;
    }

    equals(o) {
        return super.equals(o)
            && o instanceof DumbPeerAddress
            && this._id === o.id;
    }

    hashCode() {
        return this.toString();
    }

    toString() {
        return `${this._id}`;
    }

    get id() {
        return this._id;
    }
}
Class.register(DumbPeerAddress);

// TODO Limit the number of addresses we store.
class PeerAddresses extends Observable {
    constructor() {
        super();

        // Set of PeerAddressStates of all peerAddresses we know.
        this._store = new HashSet();

        // Map from signalIds to RTC peerAddresses.
        this._signalIds = new HashMap();

        // Number of WebSocket/WebRTC peers.
        this._peerCountWs = 0;
        this._peerCountRtc = 0;
        this._peerCountDumb = 0;

        // Init seed peers.
        this.add(/*channel*/ null, PeerAddresses.SEED_PEERS);

        // Setup housekeeping interval.
        setInterval(() => this._housekeeping(), PeerAddresses.HOUSEKEEPING_INTERVAL);
    }

    pickAddress() {
        const addresses = this._store.values();
        const numAddresses = addresses.length;

        // Pick a random start index.
        const index = Math.floor(Math.random() * numAddresses);

        // Score up to 1000 addresses starting from the start index and pick the
        // one with the highest score. Never pick addresses with score < 0.
        const minCandidates = Math.min(numAddresses, 1000);
        const candidates = new HashMap();
        for (let i = 0; i < numAddresses; i++) {
            const idx = (index + i) % numAddresses;
            const address = addresses[idx];
            const score = this._scoreAddress(address);
            if (score >= 0) {
                candidates.put(score, address);
                if (candidates.length >= minCandidates) {
                    break;
                }
            }
        }

        if (candidates.length === 0) {
            return null;
        }

        // Return the candidate with the highest score.
        const scores = candidates.keys().sort((a, b) => b - a);
        const winner = candidates.get(scores[0]);
        return winner.peerAddress;
    }

    _scoreAddress(peerAddressState) {
        const peerAddress = peerAddressState.peerAddress;

        // Filter addresses that we cannot connect to.
        if (!NetworkConfig.canConnect(peerAddress.protocol)) {
            return -1;
        }

        // Filter addresses that are too old.
        if (this._exceedsAge(peerAddress)) {
            return -1;
        }

        const score = this._scoreProtocol(peerAddress)
            * ((peerAddress.timestamp / 1000) + 1);

        switch (peerAddressState.state) {
            case PeerAddressState.CONNECTING:
            case PeerAddressState.CONNECTED:
            case PeerAddressState.BANNED:
                return -1;

            case PeerAddressState.NEW:
            case PeerAddressState.TRIED:
                return score;

            case PeerAddressState.FAILED:
                return (1 - (peerAddressState.failedAttempts / peerAddressState.maxFailedAttempts)) * score;

            default:
                return -1;
        }
    }

    _scoreProtocol(peerAddress) {
        let score = 1;

        // We want at least two websocket connection
        if (this._peerCountWs < 2) {
            score *= peerAddress.protocol === Protocol.WS ? 3 : 1;
        } else {
            score *= peerAddress.protocol === Protocol.RTC ? 3 : 1;
        }

        // Prefer WebRTC addresses with lower distance:
        //  distance = 0: self
        //  distance = 1: direct connection
        //  distance = 2: 1 hop
        //  ...
        // We only expect distance >= 2 here.
        if (peerAddress.protocol === Protocol.RTC) {
            score *= 1 + ((PeerAddresses.MAX_DISTANCE - peerAddress.distance) / 2);
        }

        return score;
    }

    get peerCount() {
        return this._peerCountWs + this._peerCountRtc + this._peerCountDumb;
    }

    get(peerAddress) {
        return this._store.get(peerAddress);
    }

    getChannelBySignalId(signalId) {
        const peerAddressState = this._signalIds.get(signalId);
        if (peerAddressState && peerAddressState.bestRoute) {
            return peerAddressState.bestRoute.signalChannel;
        }
        return null;
    }

    // TODO improve this by returning the best addresses first.
    query(protocolMask, serviceMask, maxAddresses = 1000) {
        // XXX inefficient linear scan
        const now = Date.now();
        const addresses = [];
        for (const peerAddressState of this._store.values()) {
            // Never return banned or failed addresses.
            if (peerAddressState.state === PeerAddressState.BANNED
                    || peerAddressState.state === PeerAddressState.FAILED) {
                continue;
            }

            // Never return seed peers.
            const address = peerAddressState.peerAddress;
            if (address.isSeed()) {
                continue;
            }

            // Only return addresses matching the protocol mask.
            if ((address.protocol & protocolMask) === 0) {
                continue;
            }

            // Only return addresses matching the service mask.
            if ((address.services & serviceMask) === 0) {
                continue;
            }

            // Update timestamp for connected peers.
            if (peerAddressState.state === PeerAddressState.CONNECTED) {
                address.timestamp = now;
                // Also update timestamp for RTC connections
                if (peerAddressState.bestRoute) {
                    peerAddressState.bestRoute.timestamp = now;
                }
            }

            // Never return addresses that are too old.
            if (this._exceedsAge(address)) {
                continue;
            }

            // Return this address.
            addresses.push(address);

            // Stop if we have collected maxAddresses.
            if (addresses.length >= maxAddresses) {
                break;
            }
        }
        return addresses;
    }

    add(channel, arg) {
        const peerAddresses = arg.length !== undefined ? arg : [arg];
        const newAddresses = [];

        for (const addr of peerAddresses) {
            if (this._add(channel, addr)) {
                newAddresses.push(addr);
            }
        }

        // Tell listeners that we learned new addresses.
        if (newAddresses.length) {
            this.fire('added', newAddresses, this);
        }
    }

    _add(channel, peerAddress) {
        // Ignore our own address.
        if (NetworkConfig.myPeerAddress().equals(peerAddress)) {
            return false;
        }

        // Ignore address if it is too old.
        // Special case: allow seed addresses (timestamp == 0) via null channel.
        if (channel && this._exceedsAge(peerAddress)) {
            Log.d(PeerAddresses, `Ignoring address ${peerAddress} - too old (${new Date(peerAddress.timestamp)})`);
            return false;
        }

        // Ignore address if its timestamp is too far in the future.
        if (peerAddress.timestamp > Date.now() + PeerAddresses.MAX_TIMESTAMP_DRIFT) {
            Log.d(PeerAddresses, `Ignoring addresses ${peerAddress} - timestamp in the future`);
            return false;
        }

        // Increment distance values of RTC addresses.
        if (peerAddress.protocol === Protocol.RTC) {
            peerAddress.distance++;

            // Ignore address if it exceeds max distance.
            if (peerAddress.distance > PeerAddresses.MAX_DISTANCE) {
                Log.d(PeerAddresses, `Ignoring address ${peerAddress} - max distance exceeded`);
                // Drop any route to this peer over the current channel. This may prevent loops.
                const peerAddressState = this._store.get(peerAddress);
                if (peerAddressState) {
                    peerAddressState.deleteRoute(channel);
                }
                return false;
            }
        }

        // Check if we already know this address.
        let peerAddressState = this._store.get(peerAddress);
        if (peerAddressState) {
            const knownAddress = peerAddressState.peerAddress;

            // Ignore address if it is banned.
            if (peerAddressState.state === PeerAddressState.BANNED) {
                return false;
            }

            // Never update the timestamp of seed peers.
            if (knownAddress.isSeed()) {
                peerAddress.timestamp = 0;
            }

            // Never erase NetAddresses.
            if (knownAddress.netAddress && !peerAddress.netAddress) {
                peerAddress.netAddress = knownAddress.netAddress;
            }

            // Ignore address if it is a websocket address and we already know this address with a more recent timestamp.
            if (peerAddress.protocol === Protocol.WS && knownAddress.timestamp >= peerAddress.timestamp) {
                return false;
            }
        } else {
            // Add new peerAddressState.
            peerAddressState = new PeerAddressState(peerAddress);
            this._store.add(peerAddressState);
            if (peerAddress.protocol === Protocol.RTC) {
                // Index by signalId.
                this._signalIds.put(peerAddress.signalId, peerAddressState);
            }
        }

        // Add route.
        if (peerAddress.protocol === Protocol.RTC) {
            peerAddressState.addRoute(channel, peerAddress.distance, peerAddress.timestamp);
        }

        // If we are currently connected, allow only updates to the netAddress and only if we don't know it yet.
        if (peerAddressState.state === PeerAddressState.CONNECTED) {
            if (!peerAddressState.peerAddress.netAddress && peerAddress.netAddress) {
                peerAddressState.peerAddress.netAddress = peerAddress.netAddress;
            }

            return false;
        }

        // Update the address.
        peerAddressState.peerAddress = peerAddress;

        return true;
    }

    // Called when a connection to this peerAddress is being established.
    connecting(peerAddress) {
        const peerAddressState = this._store.get(peerAddress);
        if (!peerAddressState) {
            return;
        }
        if (peerAddressState.state === PeerAddressState.BANNED) {
            throw 'Connecting to banned address';
        }
        if (peerAddressState.state === PeerAddressState.CONNECTED) {
            throw `Duplicate connection to ${peerAddress}`;
        }

        peerAddressState.state = PeerAddressState.CONNECTING;
    }

    // Called when a connection to this peerAddress has been established.
    // The connection might have been initiated by the other peer, so address
    // may not be known previously.
    // If it is already known, it has been updated by a previous version message.
    connected(channel, peerAddress) {
        let peerAddressState = this._store.get(peerAddress);
        if (!peerAddressState) {
            peerAddressState = new PeerAddressState(peerAddress);

            if (peerAddress.protocol === Protocol.RTC) {
                this._signalIds.put(peerAddress.signalId, peerAddressState);
            }

            this._store.add(peerAddressState);
        } else {
            // Never update the timestamp of seed peers.
            if (peerAddressState.peerAddress.isSeed()) {
                peerAddress.timestamp = 0;
            }
        }

        if (peerAddressState.state === PeerAddressState.BANNED
            // Allow recovering seed peer's inbound connection to succeed.
            && !peerAddressState.peerAddress.isSeed()) {

            throw 'Connected to banned address';
        }

        if (peerAddressState.state !== PeerAddressState.CONNECTED) {
            this._updateConnectedPeerCount(peerAddress, 1);
        }

        peerAddressState.state = PeerAddressState.CONNECTED;
        peerAddressState.lastConnected = Date.now();
        peerAddressState.failedAttempts = 0;

        peerAddressState.peerAddress = peerAddress;
        peerAddressState.peerAddress.timestamp = Date.now();

        // Add route.
        if (peerAddress.protocol === Protocol.RTC) {
            peerAddressState.addRoute(channel, peerAddress.distance, peerAddress.timestamp);
        }
    }

    // Called when a connection to this peerAddress is closed.
    disconnected(channel, closedByRemote) {
        const peerAddress = channel.peerAddress;
        const peerAddressState = this._store.get(peerAddress);
        if (!peerAddressState) {
            return;
        }
        if (peerAddressState.state !== PeerAddressState.CONNECTING
            && peerAddressState.state !== PeerAddressState.CONNECTED) {
            throw `disconnected() called in unexpected state ${peerAddressState.state}`;
        }

        // Delete all addresses that were signalable over the disconnected peer.
        this._removeBySignalChannel(channel);

        if (peerAddressState.state === PeerAddressState.CONNECTED) {
            this._updateConnectedPeerCount(peerAddress, -1);
        }

        // Always set state to tried, even when deciding to delete this address.
        // In the latter case, this will not influence the deletion,
        // but it will prevent decrementing the peer count twice when banning seed nodes.
        peerAddressState.state = PeerAddressState.TRIED;

        // XXX Immediately delete address if the remote host closed the connection.
        // Also immediately delete dumb clients, since we cannot connect to those anyway.
        if (closedByRemote || peerAddress.protocol === Protocol.DUMB) {
            this._remove(peerAddress);
        }
    }

    // Called when a connection attempt to this peerAddress has failed.
    unreachable(peerAddress) {
        const peerAddressState = this._store.get(peerAddress);
        if (!peerAddressState) {
            return;
        }
        if (peerAddressState.state === PeerAddressState.BANNED) {
            return;
        }

        peerAddressState.state = PeerAddressState.FAILED;
        peerAddressState.failedAttempts++;

        if (peerAddressState.failedAttempts >= peerAddressState.maxFailedAttempts) {
            this._remove(peerAddress);
        }
    }

    // Called when a message has been returned as unroutable.
    unroutable(channel, peerAddress) {
        const peerAddressState = this._store.get(peerAddress);
        if (!peerAddressState) {
            return;
        }

        if (!peerAddressState.bestRoute || !peerAddressState.bestRoute.signalChannel.equals(channel)) {
            Log.w(PeerAddresses, `Got unroutable for ${peerAddress} on a channel other than the best route.`);
            return;
        }

        peerAddressState.deleteBestRoute();
        if (!peerAddressState.hasRoute()) {
            this._remove(peerAddressState.peerAddress);
        }
    }

    ban(peerAddress, duration = 10 /*minutes*/) {
        let peerAddressState = this._store.get(peerAddress);
        if (!peerAddressState) {
            peerAddressState = new PeerAddressState(peerAddress);
            this._store.add(peerAddressState);
        }
        if (peerAddressState.state === PeerAddressState.CONNECTED) {
            this._updateConnectedPeerCount(peerAddress, -1);
        }

        peerAddressState.state = PeerAddressState.BANNED;
        peerAddressState.bannedUntil = Date.now() + duration * 60 * 1000;

        // Drop all routes to this peer.
        peerAddressState.deleteAllRoutes();
    }

    isConnecting(peerAddress) {
        const peerAddressState = this._store.get(peerAddress);
        return peerAddressState && peerAddressState.state === PeerAddressState.CONNECTING;
    }

    isConnected(peerAddress) {
        const peerAddressState = this._store.get(peerAddress);
        return peerAddressState && peerAddressState.state === PeerAddressState.CONNECTED;
    }

    isBanned(peerAddress) {
        const peerAddressState = this._store.get(peerAddress);
        return peerAddressState
            && peerAddressState.state === PeerAddressState.BANNED
            // XXX Never consider seed peers to be banned. This allows us to use
            // the banning mechanism to prevent seed peers from being picked when
            // they are down, but still allows recovering seed peers' inbound
            // connections to succeed.
            && !peerAddressState.peerAddress.isSeed();
    }

    _remove(peerAddress) {
        const peerAddressState = this._store.get(peerAddress);
        if (!peerAddressState) {
            return;
        }

        // Never delete seed addresses, ban them instead for 5 minutes.
        if (peerAddressState.peerAddress.isSeed()) {
            this.ban(peerAddress, 5);
            return;
        }

        // Delete from signalId index.
        if (peerAddress.protocol === Protocol.RTC) {
            this._signalIds.remove(peerAddress.signalId);
        }

        // Don't delete bans.
        if (peerAddressState.state === PeerAddressState.BANNED) {
            return;
        }

        // Delete the address.
        this._store.remove(peerAddress);
    }

    // Delete all RTC-only routes that are signalable over the given peer.
    _removeBySignalChannel(channel) {
        // XXX inefficient linear scan
        for (const peerAddressState of this._store.values()) {
            if (peerAddressState.peerAddress.protocol === Protocol.RTC) {
                peerAddressState.deleteRoute(channel);
                if (!peerAddressState.hasRoute()) {
                    this._remove(peerAddressState.peerAddress);
                }
            }
        }
    }

    _updateConnectedPeerCount(peerAddress, delta) {
        switch (peerAddress.protocol) {
            case Protocol.WS:
                this._peerCountWs += delta;
                break;
            case Protocol.RTC:
                this._peerCountRtc += delta;
                break;
            case Protocol.DUMB:
                this._peerCountDumb += delta;
                break;
            default:
                Log.w(PeerAddresses, `Unknown protocol ${peerAddress.protocol}`);
        }
    }

    _housekeeping() {
        const now = Date.now();
        const unbannedAddresses = [];

        for (const peerAddressState of this._store.values()) {
            const addr = peerAddressState.peerAddress;

            switch (peerAddressState) {
                case PeerAddressState.NEW:
                case PeerAddressState.TRIED:
                case PeerAddressState.FAILED:
                    // Delete all new peer addresses that are older than MAX_AGE.
                    if (this._exceedsAge(addr)) {
                        Log.d(PeerAddresses, `Deleting old peer address ${addr}`);
                        this._remove(addr);
                    }
                    break;

                case PeerAddressState.BANNED:
                    if (peerAddressState.bannedUntil <= now) {
                        if (addr.isSeed()) {
                            // Restore banned seed addresses to the NEW state.
                            peerAddressState.state = PeerAddressState.NEW;
                            peerAddressState.failedAttempts = 0;
                            peerAddressState.bannedUntil = -1;
                            unbannedAddresses.push(addr);
                        } else {
                            // Delete expires bans.
                            this._store.remove(addr);
                        }
                    }
                    break;

                case PeerAddressState.CONNECTED:
                    // Keep timestamp up-to-date while we are connected.
                    addr.timestamp = now;
                    // Also update timestamp for RTC connections
                    if (peerAddressState.bestRoute) {
                        peerAddressState.bestRoute.timestamp = now;
                    }
                    break;

                default:
                    // TODO What about peers who are stuck connecting? Can this happen?
                    // Do nothing for CONNECTING peers.
            }
        }

        if (unbannedAddresses.length) {
            this.fire('added', unbannedAddresses, this);
        }
    }

    _exceedsAge(peerAddress) {
        // Seed addresses are never too old.
        if (peerAddress.isSeed()) {
            return false;
        }

        const age = Date.now() - peerAddress.timestamp;
        switch (peerAddress.protocol) {
            case Protocol.WS:
                return age > PeerAddresses.MAX_AGE_WEBSOCKET;

            case Protocol.RTC:
                return age > PeerAddresses.MAX_AGE_WEBRTC;

            case Protocol.DUMB:
                return age > PeerAddresses.MAX_AGE_DUMB;
        }
        return false;
    }

    get peerCountWs() {
        return this._peerCountWs;
    }

    get peerCountRtc() {
        return this._peerCountRtc;
    }

    get peerCountDumb() {
        return this._peerCountDumb;
    }
}
PeerAddresses.MAX_AGE_WEBSOCKET = 1000 * 60 * 15; // 15 minutes
PeerAddresses.MAX_AGE_WEBRTC = 1000 * 45; // 45 seconds
PeerAddresses.MAX_AGE_DUMB = 1000 * 45; // 45 seconds
PeerAddresses.MAX_DISTANCE = 4;
PeerAddresses.MAX_FAILED_ATTEMPTS_WS = 3;
PeerAddresses.MAX_FAILED_ATTEMPTS_RTC = 2;
PeerAddresses.MAX_TIMESTAMP_DRIFT = 1000 * 60 * 10; // 10 minutes
PeerAddresses.HOUSEKEEPING_INTERVAL = 1000 * 60 * 3; // 3 minutes
PeerAddresses.SEED_PEERS = [
    WsPeerAddress.seed('alpacash.com', 8080),
    WsPeerAddress.seed('nimiq1.styp-rekowsky.de', 8080),
    WsPeerAddress.seed('nimiq2.styp-rekowsky.de', 8080),
    WsPeerAddress.seed('seed1.nimiq-network.com', 8080),
    WsPeerAddress.seed('seed2.nimiq-network.com', 8080),
    WsPeerAddress.seed('seed3.nimiq-network.com', 8080),
    WsPeerAddress.seed('seed4.nimiq-network.com', 8080),
    WsPeerAddress.seed('emily.nimiq-network.com', 443)
];
Class.register(PeerAddresses);

class PeerAddressState {
    constructor(peerAddress) {
        this.peerAddress = peerAddress;

        this.state = PeerAddressState.NEW;
        this.lastConnected = -1;
        this.bannedUntil = -1;

        this._bestRoute = null;
        this._routes = new HashSet();

        this._failedAttempts = 0;
    }

    get maxFailedAttempts() {
        switch (this.peerAddress.protocol) {
            case Protocol.RTC:
                return PeerAddresses.MAX_FAILED_ATTEMPTS_RTC;
            case Protocol.WS:
                return PeerAddresses.MAX_FAILED_ATTEMPTS_WS;
            default:
                return 0;
        }
    }

    get failedAttempts() {
        if (this._bestRoute) {
            return this._bestRoute.failedAttempts;
        } else {
            return this._failedAttempts;
        }
    }

    set failedAttempts(value) {
        if (this._bestRoute) {
            this._bestRoute.failedAttempts = value;
            this._updateBestRoute(); // scores may have changed
        } else {
            this._failedAttempts = value;
        }
    }

    get bestRoute() {
        return this._bestRoute;
    }

    addRoute(signalChannel, distance, timestamp) {
        const oldRoute = this._routes.get(signalChannel);
        const newRoute = new SignalRoute(signalChannel, distance, timestamp);

        if (oldRoute) {
            // Do not reset failed attempts.
            newRoute.failedAttempts = oldRoute.failedAttempts;
        }
        this._routes.add(newRoute);

        if (!this._bestRoute || newRoute.score > this._bestRoute.score
            || (newRoute.score === this._bestRoute.score && timestamp > this._bestRoute.timestamp)) {

            this._bestRoute = newRoute;
            this.peerAddress.distance = this._bestRoute.distance;
        }
    }

    deleteBestRoute() {
        if (this._bestRoute) {
            this.deleteRoute(this._bestRoute.signalChannel);
        }
    }

    deleteRoute(signalChannel) {
        this._routes.remove(signalChannel); // maps to same hashCode
        if (this._bestRoute && this._bestRoute.signalChannel.equals(signalChannel)) {
            this._updateBestRoute();
        }
    }

    deleteAllRoutes() {
        this._bestRoute = null;
        this._routes = new HashSet();
    }

    hasRoute() {
        return this._routes.length > 0;
    }

    _updateBestRoute() {
        let bestRoute = null;
        // Choose the route with minimal distance and maximal timestamp.
        for (const route of this._routes.values()) {
            if (bestRoute === null || route.score > bestRoute.score
                || (route.score === bestRoute.score && route.timestamp > bestRoute.timestamp)) {

                bestRoute = route;
            }
        }
        this._bestRoute = bestRoute;
        if (this._bestRoute) {
            this.peerAddress.distance = this._bestRoute.distance;
        } else {
            this.peerAddress.distance = PeerAddresses.MAX_DISTANCE + 1;
        }
    }

    equals(o) {
        return o instanceof PeerAddressState
            && this.peerAddress.equals(o.peerAddress);
    }

    hashCode() {
        return this.peerAddress.hashCode();
    }

    toString() {
        return `PeerAddressState{peerAddress=${this.peerAddress}, state=${this.state}, `
            + `lastConnected=${this.lastConnected}, failedAttempts=${this.failedAttempts}, `
            + `bannedUntil=${this.bannedUntil}}`;
    }
}
PeerAddressState.NEW = 1;
PeerAddressState.CONNECTING = 2;
PeerAddressState.CONNECTED = 3;
PeerAddressState.TRIED = 4;
PeerAddressState.FAILED = 5;
PeerAddressState.BANNED = 6;
Class.register(PeerAddressState);

class SignalRoute {
    constructor(signalChannel, distance, timestamp) {
        this.failedAttempts = 0;
        this.timestamp = timestamp;
        this._signalChannel = signalChannel;
        this._distance = distance;
    }

    get signalChannel() {
        return this._signalChannel;
    }

    get distance() {
        return this._distance;
    }

    get score() {
        return ((PeerAddresses.MAX_DISTANCE - this._distance) / 2) * (1 - (this.failedAttempts / PeerAddresses.MAX_FAILED_ATTEMPTS_RTC));
    }

    equals(o) {
        return o instanceof SignalRoute
            && this._signalChannel.equals(o._signalChannel);
    }

    hashCode() {
        return this._signalChannel.hashCode();
    }

    toString() {
        return `SignalRoute{signalChannel=${this._signalChannel}, distance=${this._distance}, timestamp=${this.timestamp}, failedAttempts=${this.failedAttempts}}`;
    }
}
Class.register(SignalRoute);

class Message {
    constructor(type) {
        if (!type || !type.length || StringUtils.isMultibyte(type) || type.length > 12) throw 'Malformed type';
        this._type = type;
    }

    static peekType(buf) {
        // Store current read position.
        const pos = buf.readPos;

        // Set read position past the magic to the beginning of the type string.
        buf.readPos = 4;

        // Read the type string.
        const type = buf.readPaddedString(12);

        // Reset the read position to original.
        buf.readPos = pos;

        return type;
    }

    static _writeChecksum(buf, value) {
        // Store current write position.
        const pos = buf.writePos;

        // Set write position past the magic, type, and length fields to the
        // beginning of the checksum value.
        buf.writePos = 4 + 12 + 4;

        // Write the checksum value.
        buf.writeUint32(value);

        // Reset the write position to original.
        buf.writePos = pos;
    }

    static unserialize(buf) {
        // XXX Direct buffer manipulation currently requires this.
        if (buf.readPos !== 0) {
            throw 'Message.unserialize() requires buf.readPos == 0';
        }

        const magic = buf.readUint32();
        const type = buf.readPaddedString(12);
        buf.readUint32(); // length is ignored
        const checksum = buf.readUint32();

        // Validate magic.
        if (magic !== Message.MAGIC) throw 'Malformed magic';

        // Validate checksum.
        Message._writeChecksum(buf, 0);
        const calculatedChecksum = CRC32.compute(buf);
        if (checksum !== calculatedChecksum) throw 'Invalid checksum';

        return new Message(type);
    }

    _setChecksum(buf) {
        const checksum = CRC32.compute(buf);
        Message._writeChecksum(buf, checksum);
    }

    serialize(buf) {
        buf = buf || new SerialBuffer(this.serializedSize);
        // XXX Direct buffer manipulation currently requires this.
        if (buf.writePos !== 0) {
            throw 'Message.serialize() requires buf.writePos == 0';
        }

        buf.writeUint32(Message.MAGIC);
        buf.writePaddedString(this._type, 12);
        buf.writeUint32(this.serializedSize);
        buf.writeUint32(0); // written later by _setChecksum()

        return buf;
    }

    get serializedSize() {
        return /*magic*/ 4
            + /*type*/ 12
            + /*length*/ 4
            + /*checksum*/ 4;
    }

    get type() {
        return this._type;
    }
}
Message.MAGIC = 0x42042042;
Message.Type = {
    VERSION: 'version',
    INV: 'inv',
    GETDATA: 'getdata',
    NOTFOUND: 'notfound',
    GETBLOCKS: 'getblocks',
    GETHEADERS: 'getheaders',
    TX: 'tx',
    BLOCK: 'block',
    HEADERS: 'headers',
    MEMPOOL: 'mempool',
    REJECT: 'reject',

    ADDR: 'addr',
    GETADDR: 'getaddr',
    PING: 'ping',
    PONG: 'pong',

    SIGNAL: 'signal',

    SENDHEADERS: 'sendheaders',

    // Nimiq
    GETBALANCES: 'getbalances',
    BALANCES: 'balances'
};
Class.register(Message);

class AddrMessage extends Message {
    constructor(addresses) {
        super(Message.Type.ADDR);
        if (!addresses || !NumberUtils.isUint16(addresses.length)
            || addresses.some(it => !(it instanceof PeerAddress))) throw 'Malformed addresses';
        this._addresses = addresses;
    }

    static unserialize(buf) {
        Message.unserialize(buf);
        const count = buf.readUint16();
        const addresses = [];
        for (let i = 0; i < count; ++i) {
            addresses.push(PeerAddress.unserialize(buf));
        }
        return new AddrMessage(addresses);
    }

    serialize(buf) {
        buf = buf || new SerialBuffer(this.serializedSize);
        super.serialize(buf);
        buf.writeUint16(this._addresses.length);
        for (const addr of this._addresses) {
            addr.serialize(buf);
        }
        super._setChecksum(buf);
        return buf;
    }

    get serializedSize() {
        let size = super.serializedSize
            + /*count*/ 2;
        for (const addr of this._addresses) {
            size += addr.serializedSize;
        }
        return size;
    }

    get addresses() {
        return this._addresses;
    }
}
Class.register(AddrMessage);

class BlockMessage extends Message {
    constructor(block) {
        super(Message.Type.BLOCK);
        // TODO Bitcoin block messages start with a block version
        this._block = block;
    }

    static unserialize(buf) {
        Message.unserialize(buf);
        const block = Block.unserialize(buf);
        return new BlockMessage(block);
    }

    serialize(buf) {
        buf = buf || new SerialBuffer(this.serializedSize);
        super.serialize(buf);
        this._block.serialize(buf);
        super._setChecksum(buf);
        return buf;
    }

    get serializedSize() {
        return super.serializedSize
            + this._block.serializedSize;
    }

    get block() {
        return this._block;
    }
}
Class.register(BlockMessage);

class GetAddrMessage extends Message {
    constructor(protocolMask, serviceMask) {
        super(Message.Type.GETADDR);
        if (!NumberUtils.isUint8(protocolMask)) throw 'Malformed protocolMask';
        if (!NumberUtils.isUint32(serviceMask)) throw 'Malformed serviceMask';
        this._protocolMask = protocolMask;
        this._serviceMask = serviceMask;
    }

    static unserialize(buf) {
        Message.unserialize(buf);
        const protocolMask = buf.readUint8();
        const serviceMask = buf.readUint32();
        return new GetAddrMessage(protocolMask, serviceMask);
    }

    serialize(buf) {
        buf = buf || new SerialBuffer(this.serializedSize);
        super.serialize(buf);
        buf.writeUint8(this._protocolMask);
        buf.writeUint32(this._serviceMask);
        super._setChecksum(buf);
        return buf;
    }

    get serializedSize() {
        return super.serializedSize
            + /*protocolMask*/ 1
            + /*serviceMask*/ 4;
    }

    get protocolMask() {
        return this._protocolMask;
    }

    get serviceMask() {
        return this._serviceMask;
    }
}
Class.register(GetAddrMessage);

class GetBlocksMessage extends Message {
    constructor(hashes, hashStop) {
        super(Message.Type.GETBLOCKS);
        if (!hashes || !NumberUtils.isUint16(hashes.length)
            || hashes.some(it => !(it instanceof Hash))) throw 'Malformed hashes';
        this._hashes = hashes;
        this._hashStop = hashStop;
    }

    static unserialize(buf) {
        Message.unserialize(buf);
        const count = buf.readUint16();
        const hashes = [];
        for (let i = 0; i < count; i++) {
            hashes.push(Hash.unserialize(buf));
        }
        const hashStop = Hash.unserialize(buf);
        return new GetBlocksMessage(hashes, hashStop);
    }

    serialize(buf) {
        buf = buf || new SerialBuffer(this.serializedSize);
        super.serialize(buf);
        buf.writeUint16(this._hashes.length);
        for (const hash of this._hashes) {
            hash.serialize(buf);
        }
        this._hashStop.serialize(buf);
        super._setChecksum(buf);
        return buf;
    }

    get serializedSize() {
        let size = super.serializedSize
            + /*count*/ 2
            + this._hashStop.serializedSize;
        for (const hash of this._hashes) {
            size += hash.serializedSize;
        }
        return size;
    }

    get hashes() {
        return this._hashes;
    }

    get hashStop() {
        return this._hashStop;
    }
}
Class.register(GetBlocksMessage);

class InvVector {
    static async fromBlock(block) {
        const hash = await block.hash();
        return new InvVector(InvVector.Type.BLOCK, hash);
    }

    static async fromTransaction(tx) {
        const hash = await tx.hash();
        return new InvVector(InvVector.Type.TRANSACTION, hash);
    }

    constructor(type, hash) {
        // TODO validate type
        if (!Hash.isHash(hash)) throw 'Malformed hash';
        this._type = type;
        this._hash = hash;
    }

    static unserialize(buf) {
        const type = buf.readUint32();
        const hash = Hash.unserialize(buf);
        return new InvVector(type, hash);
    }

    serialize(buf) {
        buf = buf || new SerialBuffer(this.serializedSize);
        buf.writeUint32(this._type);
        this._hash.serialize(buf);
        return buf;
    }

    equals(o) {
        return o instanceof InvVector
            && this._type === o.type
            && this._hash.equals(o.hash);
    }

    hashCode() {
        return `${this._type}|${this._hash}`;
    }

    toString() {
        return `InvVector{type=${this._type}, hash=${this._hash}}`;
    }

    get serializedSize() {
        return /*invType*/ 4
            + this._hash.serializedSize;
    }

    get type() {
        return this._type;
    }

    get hash() {
        return this._hash;
    }
}
InvVector.Type = {
    ERROR: 0,
    TRANSACTION: 1,
    BLOCK: 2
};
Class.register(InvVector);

class BaseInventoryMessage extends Message {
    constructor(type, vectors) {
        super(type);
        if (!vectors || !NumberUtils.isUint16(vectors.length)
            || vectors.some(it => !(it instanceof InvVector))
            || vectors.length > BaseInventoryMessage.LENGTH_MAX) throw 'Malformed vectors';
        this._vectors = vectors;
    }

    serialize(buf) {
        buf = buf || new SerialBuffer(this.serializedSize);
        super.serialize(buf);
        buf.writeUint16(this._vectors.length);
        for (const vector of this._vectors) {
            vector.serialize(buf);
        }
        super._setChecksum(buf);
        return buf;
    }

    get serializedSize() {
        let size = super.serializedSize
            + /*count*/ 2;
        for (const vector of this._vectors) {
            size += vector.serializedSize;
        }
        return size;
    }

    get vectors() {
        return this._vectors;
    }
}
BaseInventoryMessage.LENGTH_MAX = 1000;
Class.register(BaseInventoryMessage);

class InvMessage extends BaseInventoryMessage {
    constructor(vectors) {
        super(Message.Type.INV, vectors);
    }

    static unserialize(buf) {
        Message.unserialize(buf);
        const count = buf.readUint16();
        const vectors = [];
        for (let i = 0; i < count; ++i) {
            vectors.push(InvVector.unserialize(buf));
        }
        return new InvMessage(vectors);
    }
}
Class.register(InvMessage);

class GetDataMessage extends BaseInventoryMessage {
    constructor(vectors) {
        super(Message.Type.GETDATA, vectors);
    }

    static unserialize(buf) {
        Message.unserialize(buf);
        const count = buf.readUint16();
        const vectors = [];
        for (let i = 0; i < count; ++i) {
            vectors.push(InvVector.unserialize(buf));
        }
        return new GetDataMessage(vectors);
    }
}

Class.register(GetDataMessage);

class NotFoundMessage extends BaseInventoryMessage {
    constructor(vectors) {
        super(Message.Type.NOTFOUND, vectors);
    }

    static unserialize(buf) {
        Message.unserialize(buf);
        const count = buf.readUint16();
        const vectors = [];
        for (let i = 0; i < count; ++i) {
            vectors.push(InvVector.unserialize(buf));
        }
        return new NotFoundMessage(vectors);
    }
}
Class.register(NotFoundMessage);

class MempoolMessage extends Message {
    constructor() {
        super(Message.Type.MEMPOOL);
    }

    static unserialize(buf) {
        Message.unserialize(buf);
        return new MempoolMessage();
    }

    serialize(buf) {
        buf = buf || new SerialBuffer(this.serializedSize);
        super.serialize(buf);
        super._setChecksum(buf);
        return buf;
    }

    get serializedSize() {
        return super.serializedSize;
    }

}
Class.register(MempoolMessage);

class PingMessage extends Message {
    constructor(nonce) {
        super(Message.Type.PING);
        this._nonce = nonce;
    }

    static unserialize(buf) {
        Message.unserialize(buf);
        const nonce = buf.readUint32();
        return new PingMessage(nonce);
    }

    serialize(buf) {
        buf = buf || new SerialBuffer(this.serializedSize);
        super.serialize(buf);
        buf.writeUint32(this._nonce);
        super._setChecksum(buf);
        return buf;
    }

    get serializedSize() {
        return super.serializedSize
            + /*nonce*/ 4;
    }

    get nonce() {
        return this._nonce;
    }
}
Class.register(PingMessage);

class PongMessage extends Message {
    constructor(nonce) {
        super(Message.Type.PONG);
        this._nonce = nonce;
    }

    static unserialize(buf) {
        Message.unserialize(buf);
        const nonce = buf.readUint32();
        return new PongMessage(nonce);
    }

    serialize(buf) {
        buf = buf || new SerialBuffer(this.serializedSize);
        super.serialize(buf);
        buf.writeUint32(this._nonce);
        super._setChecksum(buf);
        return buf;
    }

    get serializedSize() {
        return super.serializedSize
            + /*nonce*/ 4;
    }

    get nonce() {
        return this._nonce;
    }
}
Class.register(PongMessage);

class RejectMessage extends Message {
    constructor(messageType, code, reason, extraData) {
        super(Message.Type.REJECT);
        if (StringUtils.isMultibyte(messageType) || messageType.length > 12) throw 'Malformed type';
        if (!NumberUtils.isUint8(code)) throw 'Malformed code';
        if (StringUtils.isMultibyte(reason) || reason.length > 255) throw 'Malformed reason';
        if (!extraData || !(extraData instanceof Uint8Array) || !NumberUtils.isUint16(extraData.byteLength)) throw 'Malformed extraData';

        this._messageType = messageType;
        this._code = code;
        this._reason = reason;
        this._extraData = extraData;
    }

    static unserialize(buf) {
        Message.unserialize(buf);
        const messageType = buf.readVarLengthString();
        const code = buf.readUint8();
        const reason = buf.readVarLengthString();
        const length = buf.readUint16();
        const extraData = buf.read(length);
        return new RejectMessage(messageType, code, reason, extraData);
    }

    serialize(buf) {
        buf = buf || new SerialBuffer(this.serializedSize);
        super.serialize(buf);
        buf.writeVarLengthString(this._messageType);
        buf.writeUint8(this._code);
        buf.writeVarLengthString(this._reason);
        buf.writeUint16(this._extraData.byteLength);
        buf.write(this._extraData);
        super._setChecksum(buf);
        return buf;
    }

    get serializedSize() {
        return super.serializedSize
            + /*messageType VarLengthString extra byte*/ 1
            + this._messageType.length
            + /*code*/ 1
            + /*reason VarLengthString extra byte*/ 1
            + this._reason.length
            + /*extraDataLength*/ 2
            + this._extraData.byteLength;
    }

    get messageType() {
        return this._messageType;
    }

    get code() {
        return this._code;
    }

    get reason() {
        return this._reason;
    }

    get extraData() {
        return this._extraData;
    }
}
RejectMessage.Code = {};
RejectMessage.Code.DUPLICATE = 0x12;
Class.register(RejectMessage);

class SignalMessage extends Message {
    constructor(senderId, recipientId, nonce, ttl, flags = 0, payload = new Uint8Array()) {
        super(Message.Type.SIGNAL);
        if (!senderId || !RtcPeerAddress.isSignalId(senderId)) throw 'Malformed senderId';
        if (!recipientId || !RtcPeerAddress.isSignalId(recipientId)) throw 'Malformed recipientId';
        if (!NumberUtils.isUint32(nonce)) throw 'Malformed nonce';
        if (!NumberUtils.isUint8(ttl)) throw 'Malformed ttl';
        if (!NumberUtils.isUint8(flags)) throw 'Malformed flags';
        if (!payload || !(payload instanceof Uint8Array) || !NumberUtils.isUint16(payload.byteLength)) throw 'Malformed payload';
        this._senderId = senderId;
        this._recipientId = recipientId;
        this._nonce = nonce;
        this._ttl = ttl;
        this._flags = flags;
        this._payload = payload;
    }

    static unserialize(buf) {
        Message.unserialize(buf);
        const senderId = buf.readString(32);
        const recipientId = buf.readString(32);
        const nonce = buf.readUint32();
        const ttl = buf.readUint8();
        const flags = buf.readUint8();
        const length = buf.readUint16();
        const payload = buf.read(length);
        return new SignalMessage(senderId, recipientId, nonce, ttl, flags, payload);
    }

    serialize(buf) {
        buf = buf || new SerialBuffer(this.serializedSize);
        super.serialize(buf);
        buf.writeString(this._senderId, 32);
        buf.writeString(this._recipientId, 32);
        buf.writeUint32(this._nonce);
        buf.writeUint8(this._ttl);
        buf.writeUint8(this._flags);
        buf.writeUint16(this._payload.byteLength);
        buf.write(this._payload);
        super._setChecksum(buf);
        return buf;
    }

    get serializedSize() {
        return super.serializedSize
            + /*senderId*/ 32
            + /*recipientId*/ 32
            + /*nonce*/ 4
            + /*ttl*/ 1
            + /*flags*/ 1
            + /*payloadLength*/ 2
            + this._payload.byteLength;
    }

    get senderId() {
        return this._senderId;
    }

    get recipientId() {
        return this._recipientId;
    }

    get nonce() {
        return this._nonce;
    }

    get ttl() {
        return this._ttl;
    }

    get flags() {
        return this._flags;
    }

    get payload() {
        return this._payload;
    }

    isUnroutable() {
        return (this._flags & SignalMessage.Flags.UNROUTABLE) !== 0;
    }

    isTtlExceeded() {
        return (this._flags & SignalMessage.Flags.TTL_EXCEEDED) !== 0;
    }
}
SignalMessage.Flags = {};
SignalMessage.Flags.UNROUTABLE = 0x1;
SignalMessage.Flags.TTL_EXCEEDED = 0x2;
Class.register(SignalMessage);

class TxMessage extends Message {
    constructor(transaction) {
        super(Message.Type.TX);
        this._transaction = transaction;
    }

    static unserialize(buf) {
        Message.unserialize(buf);
        const transaction = Transaction.unserialize(buf);
        return new TxMessage(transaction);
    }

    serialize(buf) {
        buf = buf || new SerialBuffer(this.serializedSize);
        super.serialize(buf);
        this._transaction.serialize(buf);
        super._setChecksum(buf);
        return buf;
    }

    get serializedSize() {
        return super.serializedSize
            + this._transaction.serializedSize;
    }

    get transaction() {
        return this._transaction;
    }
}
Class.register(TxMessage);

class VersionMessage extends Message {
    constructor(version, peerAddress, genesisHash, startHeight, totalWork) {
        super(Message.Type.VERSION);
        if (!NumberUtils.isUint32(version)) throw 'Malformed version';
        if (!peerAddress || !(peerAddress instanceof PeerAddress)) throw 'Malformed peerAddress';
        if (!Hash.isHash(genesisHash)) throw 'Malformed genesisHash';
        if (!NumberUtils.isUint32(startHeight)) throw 'Malformed startHeight';
        // TODO Validate that totalWork is a valid double.

        this._version = version;
        this._peerAddress = peerAddress;
        this._genesisHash = genesisHash;
        this._startHeight = startHeight;
        this._totalWork = totalWork;
    }

    static unserialize(buf) {
        Message.unserialize(buf);
        const version = buf.readUint32();
        const peerAddress = PeerAddress.unserialize(buf);
        const genesisHash = Hash.unserialize(buf);
        const startHeight = buf.readUint32();
        const totalWork = buf.readFloat64();
        return new VersionMessage(version, peerAddress, genesisHash, startHeight, totalWork);
    }

    serialize(buf) {
        buf = buf || new SerialBuffer(this.serializedSize);
        super.serialize(buf);
        buf.writeUint32(this._version);
        this._peerAddress.serialize(buf);
        this._genesisHash.serialize(buf);
        buf.writeUint32(this._startHeight);
        buf.writeFloat64(this._totalWork);
        super._setChecksum(buf);
        return buf;
    }

    get serializedSize() {
        return super.serializedSize
            + /*version*/ 4
            + this._peerAddress.serializedSize
            + this._genesisHash.serializedSize
            + /*startHeight*/ 4
            + /*totalWork*/ 8;
    }

    get version() {
        return this._version;
    }

    get peerAddress() {
        return this._peerAddress;
    }

    get genesisHash() {
        return this._genesisHash;
    }

    get startHeight() {
        return this._startHeight;
    }

    get totalWork() {
        return this._totalWork;
    }
}
Class.register(VersionMessage);

class MessageFactory {
    static parse(buffer) {
        const buf = new SerialBuffer(buffer);
        const type = Message.peekType(buf);
        const clazz = MessageFactory.CLASSES[type];
        if (!clazz || !clazz.unserialize) throw `Invalid message type: ${type}`;
        return clazz.unserialize(buf);
    }
}
MessageFactory.CLASSES = {};
MessageFactory.CLASSES[Message.Type.VERSION] = VersionMessage;
MessageFactory.CLASSES[Message.Type.INV] = InvMessage;
MessageFactory.CLASSES[Message.Type.GETDATA] = GetDataMessage;
MessageFactory.CLASSES[Message.Type.NOTFOUND] = NotFoundMessage;
MessageFactory.CLASSES[Message.Type.BLOCK] = BlockMessage;
MessageFactory.CLASSES[Message.Type.TX] = TxMessage;
MessageFactory.CLASSES[Message.Type.GETBLOCKS] = GetBlocksMessage;
MessageFactory.CLASSES[Message.Type.MEMPOOL] = MempoolMessage;
MessageFactory.CLASSES[Message.Type.REJECT] = RejectMessage;
MessageFactory.CLASSES[Message.Type.ADDR] = AddrMessage;
MessageFactory.CLASSES[Message.Type.GETADDR] = GetAddrMessage;
MessageFactory.CLASSES[Message.Type.PING] = PingMessage;
MessageFactory.CLASSES[Message.Type.PONG] = PongMessage;
MessageFactory.CLASSES[Message.Type.SIGNAL] = SignalMessage;
Class.register(MessageFactory);

class NetworkAgent extends Observable {
    constructor(blockchain, addresses, channel) {
        super();
        this._blockchain = blockchain;
        this._addresses = addresses;
        this._channel = channel;

        // The peer object we create after the handshake completes.
        this._peer = null;

        // All peerAddresses that we think the remote peer knows.
        this._knownAddresses = new HashSet();

        // Helper object to keep track of timeouts & intervals.
        this._timers = new Timers();

        // True if we have received the peer's version message.
        this._versionReceived = false;

        // True if we have successfully sent our version message.
        this._versionSent = false;

        // Number of times we have tried to send out the version message.
        this._versionAttempts = 0;

        // Listen to network/control messages from the peer.
        channel.on('version',   msg => this._onVersion(msg));
        channel.on('verack',    msg => this._onVerAck(msg));
        channel.on('addr',      msg => this._onAddr(msg));
        channel.on('getaddr',   msg => this._onGetAddr(msg));
        channel.on('ping',      msg => this._onPing(msg));
        channel.on('pong',      msg => this._onPong(msg));

        // Clean up when the peer disconnects.
        channel.on('close', closedByRemote => this._onClose(closedByRemote));
    }

    relayAddresses(addresses) {
        // Don't relay if the handshake hasn't finished yet.
        if (!this._versionReceived || !this._versionSent) {
            return;
        }

        // Only relay addresses that the peer doesn't know yet. If the address
        // the peer knows is older than RELAY_THROTTLE, relay the address again.
        const filteredAddresses = addresses.filter(addr => {
            // Exclude RTC addresses that are already at MAX_DISTANCE.
            if (addr.protocol === Protocol.RTC && addr.distance >= PeerAddresses.MAX_DISTANCE) {
                return false;
            }

            // Exclude DumbPeerAddresses.
            if (addr.protocol === Protocol.DUMB) {
                return false;
            }

            const knownAddress = this._knownAddresses.get(addr);
            return !addr.isSeed() // Never relay seed addresses.
                && (!knownAddress || knownAddress.timestamp < Date.now() - NetworkAgent.RELAY_THROTTLE);
        });

        if (filteredAddresses.length) {
            this._channel.addr(filteredAddresses);

            // We assume that the peer knows these addresses now.
            for (const address of filteredAddresses) {
                this._knownAddresses.add(address);
            }
        }
    }


    /* Handshake */

    handshake() {
        // Kick off the handshake by telling the peer our version, network address & blockchain height.
        // Firefox sends the data-channel-open event too early, so sending the version message might fail.
        // Try again in this case.
        if (!this._channel.version(NetworkConfig.myPeerAddress(), this._blockchain.height, this._blockchain.totalWork)) {
            this._versionAttempts++;
            if (this._versionAttempts >= NetworkAgent.VERSION_ATTEMPTS_MAX) {
                this._channel.close('sending of version message failed');
                return;
            }

            setTimeout(this.handshake.bind(this), NetworkAgent.VERSION_RETRY_DELAY);
            return;
        }

        this._versionSent = true;

        // Drop the peer if it doesn't send us a version message.
        // Only do this if we haven't received the peer's version message already.
        if (!this._versionReceived) {
            // TODO Should we ban instead?
            this._timers.setTimeout('version', () => {
                this._timers.clearTimeout('version');
                this._channel.close('version timeout');
            }, NetworkAgent.HANDSHAKE_TIMEOUT);
        } else {
            // The peer has sent us his version message already.
            this._finishHandshake();
        }
    }

    _onVersion(msg) {
        // Make sure this is a valid message in our current state.
        if (!this._canAcceptMessage(msg)) {
            return;
        }

        // Clear the version timeout.
        this._timers.clearTimeout('version');

        // Check if the peer is running a compatible version.
        if (!Version.isCompatible(msg.version)) {
            this._channel.close(`incompatible version (ours=${Version.CODE}, theirs=${msg.version})`);
            return;
        }

        // Check if the peer is working on the same genesis block.
        if (!Block.GENESIS.HASH.equals(msg.genesisHash)) {
            this._channel.close(`different genesis block (${msg.genesisHash})`);
            return;
        }

        // TODO check services?

        // Check that the given peerAddress matches the one we expect.
        // In case of inbound WebSocket connections, this is the first time we
        // see the remote peer's peerAddress.
        // TODO We should validate that the given peerAddress actually resolves
        // to the peer's netAddress!
        if (this._channel.peerAddress) {
            if (!this._channel.peerAddress.equals(msg.peerAddress)) {
                this._channel.close('unexpected peerAddress in version message');
                return;
            }
        }

        // The client might not send its netAddress. Set it from our address database if we have it.
        const peerAddress = msg.peerAddress;
        if (!peerAddress.netAddress) {
            const storedAddress = this._addresses.get(peerAddress);
            if (storedAddress && storedAddress.netAddress) {
                peerAddress.netAddress = storedAddress.netAddress;
            }
        }
        this._channel.peerAddress = peerAddress;

        // Create peer object.
        this._peer = new Peer(
            this._channel,
            msg.version,
            msg.startHeight,
            msg.totalWork
        );

        // Remember that the peer has sent us this address.
        this._knownAddresses.add(peerAddress);

        this._versionReceived = true;

        if (this._versionSent) {
            this._finishHandshake();
        }
    }

    _finishHandshake() {
        // Setup regular connectivity check.
        // TODO randomize interval?
        this._timers.setInterval('connectivity',
            () => this._checkConnectivity(),
            NetworkAgent.CONNECTIVITY_CHECK_INTERVAL);

        // Regularly announce our address.
        this._timers.setInterval('announce-addr',
            () => this._channel.addr([NetworkConfig.myPeerAddress()]),
            NetworkAgent.ANNOUNCE_ADDR_INTERVAL);

        // Tell listeners about the new peer that connected.
        this.fire('handshake', this._peer, this);

        // Request new network addresses from the peer.
        this._requestAddresses();
    }


    /* Addresses */

    _requestAddresses() {
        // Request addresses from peer.
        this._channel.getaddr(NetworkConfig.myProtocolMask(), Services.myServiceMask());

        // We don't use a timeout here. The peer will not respond with an addr message if
        // it doesn't have any new addresses.
    }

    async _onAddr(msg) {
        // Make sure this is a valid message in our current state.
        if (!this._canAcceptMessage(msg)) {
            return;
        }

        // Reject messages that contain more than 1000 addresses, ban peer (bitcoin).
        if (msg.addresses.length > 1000) {
            Log.w(NetworkAgent, 'Rejecting addr message - too many addresses');
            this._channel.ban('addr message too large');
            return;
        }

        // Remember that the peer has sent us these addresses.
        for (const addr of msg.addresses) {
            this._knownAddresses.add(addr);
        }

        // Put the new addresses in the address pool.
        await this._addresses.add(this._channel, msg.addresses);

        // Tell listeners that we have received new addresses.
        this.fire('addr', msg.addresses, this);
    }

    _onGetAddr(msg) {
        // Make sure this is a valid message in our current state.
        if (!this._canAcceptMessage(msg)) {
            return;
        }

        // Find addresses that match the given serviceMask.
        const addresses = this._addresses.query(msg.protocolMask, msg.serviceMask);

        const filteredAddresses = addresses.filter(addr => {
            // Exclude RTC addresses that are already at MAX_DISTANCE.
            if (addr.protocol === Protocol.RTC && addr.distance >= PeerAddresses.MAX_DISTANCE) {
                return false;
            }

            // Exclude known addresses from the response unless they are older than RELAY_THROTTLE.
            const knownAddress = this._knownAddresses.get(addr);
            return !knownAddress || knownAddress.timestamp < Date.now() - NetworkAgent.RELAY_THROTTLE;
        });

        // Send the addresses back to the peer.
        // If we don't have any new addresses, don't send the message at all.
        if (filteredAddresses.length) {
            this._channel.addr(filteredAddresses);
        }
    }


    /* Connectivity Check */

    _checkConnectivity() {
        // Generate random nonce.
        const nonce = NumberUtils.randomUint32();

        // Send ping message to peer.
        // If sending the ping message fails, assume the connection has died.
        if (!this._channel.ping(nonce)) {
            this._channel.close('sending ping message failed');
            return;
        }

        // Drop peer if it doesn't answer with a matching pong message within the timeout.
        this._timers.setTimeout(`ping_${nonce}`, () => {
            this._timers.clearTimeout(`ping_${nonce}`);
            this._channel.close('ping timeout');
        }, NetworkAgent.PING_TIMEOUT);
    }

    _onPing(msg) {
        // Make sure this is a valid message in our current state.
        if (!this._canAcceptMessage(msg)) {
            return;
        }

        // Respond with a pong message
        this._channel.pong(msg.nonce);
    }

    _onPong(msg) {
        // Clear the ping timeout for this nonce.
        this._timers.clearTimeout(`ping_${msg.nonce}`);
    }

    _onClose(closedByRemote) {
        // Clear all timers and intervals when the peer disconnects.
        this._timers.clearAll();

        // Tell listeners that the peer has disconnected.
        this.fire('close', this._peer, this._channel, closedByRemote, this);
    }

    _canAcceptMessage(msg) {
        // The first message must be the version message.
        if (!this._versionReceived && msg.type !== Message.Type.VERSION) {
            Log.w(NetworkAgent, `Discarding ${msg.type} message from ${this._channel}`
                + ' - no version message received previously');
            return false;
        }
        return true;
    }

    get channel() {
        return this._channel;
    }

    get peer() {
        return this._peer;
    }
}
NetworkAgent.HANDSHAKE_TIMEOUT = 1000 * 3; // 3 seconds
NetworkAgent.PING_TIMEOUT = 1000 * 10; // 10 seconds
NetworkAgent.CONNECTIVITY_CHECK_INTERVAL = 1000 * 60; // 1 minute
NetworkAgent.ANNOUNCE_ADDR_INTERVAL = 1000 * 60 * 10; // 10 minutes
NetworkAgent.RELAY_THROTTLE = 1000 * 60 * 5; // 5 minutes
NetworkAgent.VERSION_ATTEMPTS_MAX = 10;
NetworkAgent.VERSION_RETRY_DELAY = 500; // 500 ms
Class.register(NetworkAgent);

class Network extends Observable {
    static get PEER_COUNT_MAX() {
        return PlatformUtils.isBrowser() ? 15 : 50000;
    }

    static get PEER_COUNT_PER_IP_WS_MAX() {
        return PlatformUtils.isBrowser() ? 1 : 25;
    }

    static get PEER_COUNT_PER_IP_RTC_MAX() {
        return 2;
    }

    constructor(blockchain) {
        super();
        this._blockchain = blockchain;
        return this._init();
    }

    async _init() {
        // Flag indicating whether we should actively connect to other peers
        // if our peer count is below PEER_COUNT_DESIRED.
        this._autoConnect = false;
        // Save the old state when going offline, to restore it when going online again.
        this._savedAutoConnect = false;

        // Number of ongoing outbound connection attempts.
        this._connectingCount = 0;

        // Map of agents indexed by connection ids.
        this._agents = new HashMap();

        // Map from netAddress.host -> number of connections to this host.
        this._connectionCounts = new HashMap();

        // Total bytes sent/received on past connections.
        this._bytesSent = 0;
        this._bytesReceived = 0;

        this._wsConnector = new WebSocketConnector();
        this._wsConnector.on('connection', conn => this._onConnection(conn));
        this._wsConnector.on('error', peerAddr => this._onError(peerAddr));

        this._rtcConnector = await new WebRtcConnector();
        this._rtcConnector.on('connection', conn => this._onConnection(conn));
        this._rtcConnector.on('error', (peerAddr, reason) => this._onError(peerAddr, reason));

        // Helper objects to manage PeerAddresses.
        // Must be initialized AFTER the WebSocket/WebRtcConnector.
        this._addresses = new PeerAddresses();

        // Relay new addresses to peers.
        this._addresses.on('added', addresses => {
            this._relayAddresses(addresses);
            this._checkPeerCount();
        });

        // If in browser, add event listener for online/offline detection.
        if (PlatformUtils.isBrowser()) {
            window.addEventListener('online', _ => this._onOnline());
            window.addEventListener('offline', _ => this._onOffline());
        }

        this._forwards = new SignalStore();

        return this;
    }

    connect() {
        this._autoConnect = true;
        this._savedAutoConnect = true;

        // Start connecting to peers.
        this._checkPeerCount();
    }

    disconnect(reason) {
        this._autoConnect = false;
        this._savedAutoConnect = false;

        // Close all active connections.
        for (const agent of this._agents.values()) {
            agent.channel.close(reason || 'manual network disconnect');
        }
    }

    isOnline() {
        // If in doubt, return true.
        return (!PlatformUtils.isBrowser() || window.navigator.onLine === undefined) || window.navigator.onLine;
    }

    _onOnline() {
        this._autoConnect = this._savedAutoConnect;

        if (this._autoConnect) {
            this._checkPeerCount();
        }
    }

    _onOffline() {
        this._savedAutoConnect = this._autoConnect;
        this.disconnect('network disconnect');
    }

    // XXX For testing
    disconnectWebSocket() {
        this._autoConnect = false;

        // Close all websocket connections.
        for (const agent of this._agents.values()) {
            if (agent.peer.peerAddress.protocol === Protocol.WS) {
                agent.channel.close('manual websocket disconnect');
            }
        }
    }

    _relayAddresses(addresses) {
        // Pick PEER_COUNT_RELAY random peers and relay addresses to them if:
        // - number of addresses <= 10
        // TODO more restrictions, see Bitcoin
        if (addresses.length > 10) {
            return;
        }

        // XXX We don't protect against picking the same peer more than once.
        // The NetworkAgent will take care of not sending the addresses twice.
        // In that case, the address will simply be relayed to less peers. Also,
        // the peer that we pick might already know the address.
        const agents = this._agents.values();
        for (let i = 0; i < Network.PEER_COUNT_RELAY; ++i) {
            const agent = ArrayUtils.randomElement(agents);
            if (agent) {
                agent.relayAddresses(addresses);
            }
        }
    }

    _checkPeerCount() {
        if (this._autoConnect // && this.isOnline() Do we need this? Not really if _onOnline/_onOffline is working.
            && this.peerCount + this._connectingCount < Network.PEER_COUNT_DESIRED
            && this._connectingCount < Network.CONNECTING_COUNT_MAX) {

            // Pick a peer address that we are not connected to yet.
            const peerAddress = this._addresses.pickAddress();

            // We can't connect if we don't know any more addresses.
            if (!peerAddress) {
                return;
            }

            // Connect to this address.
            this._connect(peerAddress);
        }
    }

    _connect(peerAddress) {
        switch (peerAddress.protocol) {
            case Protocol.WS:
                Log.d(Network, `Connecting to ${peerAddress} ...`);
                if (this._wsConnector.connect(peerAddress)) {
                    this._addresses.connecting(peerAddress);
                    this._connectingCount++;
                }
                break;

            case Protocol.RTC: {
                const signalChannel = this._addresses.getChannelBySignalId(peerAddress.signalId);
                Log.d(Network, `Connecting to ${peerAddress} via ${signalChannel.peerAddress}...`);
                if (this._rtcConnector.connect(peerAddress, signalChannel)) {
                    this._addresses.connecting(peerAddress);
                    this._connectingCount++;
                }
                break;
            }

            default:
                Log.e(Network, `Cannot connect to ${peerAddress} - unsupported protocol`);
                this._onError(peerAddress);
        }
    }

    _onConnection(conn) {
        // Decrement connectingCount if we have initiated this connection.
        if (conn.outbound && this._addresses.isConnecting(conn.peerAddress)) {
            this._connectingCount--;
        }

        // If the connector was able to determine the peer's netAddress,
        // enforce the max connections per IP limit here.
        if (conn.netAddress && !this._incrementConnectionCount(conn)) {
            return;
        }

        // Reject connection if we are already connected to this peer address.
        // This can happen if the peer connects (inbound) while we are
        // initiating a (outbound) connection to it.
        if (conn.outbound && this._addresses.isConnected(conn.peerAddress)) {
            conn.close('duplicate connection (outbound, pre handshake)');
            return;
        }

        // Reject peer if we have reached max peer count.
        if (this.peerCount >= Network.PEER_COUNT_MAX) {
            conn.close(`max peer count reached (${Network.PEER_COUNT_MAX})`);
            return;
        }

        // Connection accepted.
        const connType = conn.inbound ? 'inbound' : 'outbound';
        Log.d(Network, `Connection established (${connType}) #${conn.id} ${conn.netAddress || conn.peerAddress || '<pending>'}`);

        // Create peer channel.
        const channel = new PeerChannel(conn);
        channel.on('signal', msg => this._onSignal(channel, msg));
        channel.on('ban', reason => this._onBan(channel, reason));

        // Create network agent.
        const agent = new NetworkAgent(this._blockchain, this._addresses, channel);
        agent.on('handshake', peer => this._onHandshake(peer, agent));
        agent.on('close', (peer, channel, closedByRemote) => this._onClose(peer, channel, closedByRemote));

        // Store the agent.
        this._agents.put(conn.id, agent);

        // Initiate handshake with the peer.
        agent.handshake();

        // Call _checkPeerCount() here in case the peer doesn't send us any (new)
        // addresses to keep on connecting.
        // Add a delay before calling it to allow RTC peer addresses to be sent to us.
        setTimeout(() => this._checkPeerCount(), Network.ADDRESS_UPDATE_DELAY);
    }


    // Handshake with this peer was successful.
    _onHandshake(peer, agent) {
        // If the connector was able the determine the peer's netAddress, update the peer's advertised netAddress.
        if (peer.channel.netAddress) {
            // TODO What to do if it doesn't match the currently advertised one?
            if (peer.peerAddress.netAddress && !peer.peerAddress.netAddress.equals(peer.channel.netAddress)) {
                Log.w(Network, `Got different netAddress ${peer.channel.netAddress} for peer ${peer.peerAddress} `
                    + `- advertised was ${peer.peerAddress.netAddress}`);
            }

            // Only set the advertised netAddress if we have the public IP of the peer.
            // WebRTC connectors might return local IP addresses for peers on the same LAN.
            if (!peer.channel.netAddress.isPrivate()) {
                peer.peerAddress.netAddress = peer.channel.netAddress;
            }
        }
        // Otherwise, use the netAddress advertised for this peer if available.
        else if (peer.channel.peerAddress.netAddress) {
            peer.channel.netAddress = peer.channel.peerAddress.netAddress;

            // Enforce the max connection limit per IP here.
            if (!this._incrementConnectionCount(peer.channel.connection)) {
                return;
            }
        }
        // Otherwise, we don't know the netAddress of this peer. Use a pseudo netAddress.
        else {
            peer.channel.netAddress = NetAddress.UNKNOWN;
        }

        // Close connection if we are already connected to this peer.
        if (this._addresses.isConnected(peer.peerAddress)) {
            agent.channel.close('duplicate connection (post handshake)');
            return;
        }

        // Close connection if this peer is banned.
        if (this._addresses.isBanned(peer.peerAddress)) {
            agent.channel.close('peer is banned');
            return;
        }

        // Mark the peer's address as connected.
        this._addresses.connected(agent.channel, peer.peerAddress);

        // Tell others about the address that we just connected to.
        this._relayAddresses([peer.peerAddress]);

        // Let listeners know about this peer.
        this.fire('peer-joined', peer);

        // Let listeners know that the peers changed.
        this.fire('peers-changed');

        Log.d(Network, `[PEER-JOINED] ${peer.peerAddress} ${peer.netAddress} (version=${peer.version}, startHeight=${peer.startHeight}, totalWork=${peer.totalWork})`);
    }

    // Connection to this peer address failed.
    _onError(peerAddress, reason) {
        Log.w(Network, `Connection to ${peerAddress} failed` + (reason ? ` - ${reason}` : ''));

        if (this._addresses.isConnecting(peerAddress)) {
            this._connectingCount--;
        }

        this._addresses.unreachable(peerAddress);

        this._checkPeerCount();
    }

    // This peer channel was closed.
    _onClose(peer, channel, closedByRemote) {
        // Delete agent.
        this._agents.remove(channel.id);

        // Decrement connection count per IP if we already know the peer's netAddress.
        if (channel.netAddress && !channel.netAddress.isPseudo()) {
            this._decrementConnectionCount(channel.netAddress);
        }

        // Update total bytes sent/received.
        this._bytesSent += channel.connection.bytesSent;
        this._bytesReceived += channel.connection.bytesReceived;

        // peerAddress is undefined for incoming connections pre-handshake.
        if (channel.peerAddress) {
            // Check if the handshake with this peer has completed.
            if (this._addresses.isConnected(channel.peerAddress)) {
                // Mark peer as disconnected.
                this._addresses.disconnected(channel, closedByRemote);

                // Tell listeners that this peer has gone away.
                this.fire('peer-left', peer);

                // Let listeners know that the peers changed.
                this.fire('peers-changed');

                const kbTransferred = ((channel.connection.bytesSent
                    + channel.connection.bytesReceived) / 1000).toFixed(2);
                Log.d(Network, `[PEER-LEFT] ${peer.peerAddress} ${peer.netAddress} `
                    + `(version=${peer.version}, startHeight=${peer.startHeight}, `
                    + `transferred=${kbTransferred} kB)`);
            } else {
                // Treat connections closed pre-handshake as failed attempts.
                Log.w(Network, `Connection to ${channel.peerAddress} closed pre-handshake (by ${closedByRemote ? 'remote' : 'us'})`);
                this._addresses.unreachable(channel.peerAddress);
            }
        }

        this._checkPeerCount();
    }

    // This peer channel was banned.
    _onBan(channel, reason) {
        // TODO If this is an inbound connection, the peerAddres might not be set yet.
        // Ban the netAddress in this case.
        // XXX We should probably always ban the netAddress as well.
        if (channel.peerAddress) {
            this._addresses.ban(channel.peerAddress);
        } else {
            // TODO ban netAddress
        }
    }

    _incrementConnectionCount(conn) {
        let numConnections = this._connectionCounts.get(conn.netAddress) || 0;
        numConnections++;
        this._connectionCounts.put(conn.netAddress, numConnections);

        // Enforce max connections per IP limit.
        const maxConnections = conn.protocol === Protocol.WS ?
            Network.PEER_COUNT_PER_IP_WS_MAX : Network.PEER_COUNT_PER_IP_RTC_MAX;
        if (numConnections > maxConnections) {
            conn.close(`connection limit per ip (${maxConnections}) reached`);
            return false;
        }
        return true;
    }

    _decrementConnectionCount(netAddress) {
        let numConnections = this._connectionCounts.get(netAddress) || 1;
        numConnections = Math.max(numConnections - 1, 0);
        this._connectionCounts.put(netAddress, numConnections);
    }


    /* Signaling */

    _onSignal(channel, msg) {
        // Discard signals with invalid TTL.
        if (msg.ttl > Network.SIGNAL_TTL_INITIAL) {
            channel.ban('invalid signal ttl');
            return;
        }

        // Can be undefined for non-rtc nodes.
        const mySignalId = NetworkConfig.myPeerAddress().signalId;

        // Discard signals from myself.
        if (msg.senderId === mySignalId) {
            Log.w(Network, `Received signal from myself to ${msg.recipientId} from ${channel.peerAddress} (myId: ${mySignalId})`);
            return;
        }

        // If the signal has the unroutable flag set and we previously forwarded a matching signal,
        // mark the route as unusable.
        if (msg.isUnroutable() && this._forwards.signalForwarded(/*senderId*/ msg.recipientId, /*recipientId*/ msg.senderId, /*nonce*/ msg.nonce)) {
            this._addresses.unroutable(channel, msg.senderId);
        }

        // If the signal is intended for us, pass it on to our WebRTC connector.
        if (msg.recipientId === mySignalId) {
            // If we sent out a signal that did not reach the recipient because of TTL
            // or it was unroutable, delete this route.
            if (this._rtcConnector.isValidSignal(msg) && (msg.isUnroutable() || msg.isTtlExceeded())) {
                this._addresses.unroutable(channel, msg.senderId);
            }
            this._rtcConnector.onSignal(channel, msg);
            return;
        }

        // Discard signals that have reached their TTL.
        if (msg.ttl <= 0) {
            Log.w(Network, `Discarding signal from ${msg.senderId} to ${msg.recipientId} - TTL reached`);
            // Send signal containing TTL_EXCEEDED flag back in reverse direction.
            if (msg.flags === 0) {
                channel.signal(/*senderId*/ msg.recipientId, /*recipientId*/ msg.senderId, msg.nonce, Network.SIGNAL_TTL_INITIAL, SignalMessage.Flags.TTL_EXCEEDED);
            }
            return;
        }

        // Otherwise, try to forward the signal to the intended recipient.
        const signalChannel = this._addresses.getChannelBySignalId(msg.recipientId);
        if (!signalChannel) {
            Log.w(Network, `Failed to forward signal from ${msg.senderId} to ${msg.recipientId} - no route found`);
            // If we don't know a route to the intended recipient, return signal to sender with unroutable flag set and payload removed.
            // Only do this if the signal is not already a unroutable response.
            if (msg.flags === 0) {
                channel.signal(/*senderId*/ msg.recipientId, /*recipientId*/ msg.senderId, msg.nonce, Network.SIGNAL_TTL_INITIAL, SignalMessage.Flags.UNROUTABLE);
            }
            return;
        }

        // Discard signal if our shortest route to the target is via the sending peer.
        // XXX Why does this happen?
        if (signalChannel.peerAddress.equals(channel.peerAddress)) {
            Log.e(Network, `Discarding signal from ${msg.senderId} to ${msg.recipientId} - shortest route via sending peer`);
            return;
        }

        // Decrement ttl and forward signal.
        signalChannel.signal(msg.senderId, msg.recipientId, msg.nonce, msg.ttl - 1, msg.flags, msg.payload);

        // We store forwarded messages if there are no special flags set.
        if (msg.flags === 0) {
            this._forwards.add(msg.senderId, msg.recipientId, msg.nonce);
        }

        // XXX This is very spammy!!!
        Log.v(Network, `Forwarding signal (ttl=${msg.ttl}) from ${msg.senderId} `
            + `(received from ${channel.peerAddress}) to ${msg.recipientId} `
            + `(via ${signalChannel.peerAddress})`);
    }

    get peerCount() {
        return this._addresses.peerCount;
    }

    get peerCountWebSocket() {
        return this._addresses.peerCountWs;
    }

    get peerCountWebRtc() {
        return this._addresses.peerCountRtc;
    }

    get peerCountDumb() {
        return this._addresses.peerCountDumb;
    }

    get bytesSent() {
        return this._bytesSent
            + this._agents.values().reduce((n, agent) => n + agent.channel.connection.bytesSent, 0);
    }

    get bytesReceived() {
        return this._bytesReceived
            + this._agents.values().reduce((n, agent) => n + agent.channel.connection.bytesReceived, 0);
    }
}
Network.PEER_COUNT_DESIRED = 6;
Network.PEER_COUNT_RELAY = 4;
Network.CONNECTING_COUNT_MAX = 2;
Network.SIGNAL_TTL_INITIAL = 3;
Network.ADDRESS_UPDATE_DELAY = 1000; // 1 second
Class.register(Network);

class SignalStore {
    constructor(maxSize = 1000 /*maximum number of entries*/) {
        this._maxSize = maxSize;
        this._queue = new Queue();
        this._store = new HashMap();
    }

    get length() {
        return this._queue.length;
    }

    add(senderId, recipientId, nonce) {
        // If we already forwarded such a message, just update timestamp.
        if (this.contains(senderId, recipientId, nonce)) {
            const signal = new ForwardedSignal(senderId, recipientId, nonce);
            this._store.put(signal, Date.now());
            this._queue.remove(signal);
            this._queue.enqueue(signal);
            return;
        }

        // Delete oldest if needed.
        if (this.length >= this._maxSize) {
            const oldest = this._queue.dequeue();
            this._store.remove(oldest);
        }
        const signal = new ForwardedSignal(senderId, recipientId, nonce);
        this._queue.enqueue(signal);
        this._store.put(signal, Date.now());
    }

    contains(senderId, recipientId, nonce) {
        const signal = new ForwardedSignal(senderId, recipientId, nonce);
        return this._store.contains(signal);
    }

    signalForwarded(senderId, recipientId, nonce) {
        const signal = new ForwardedSignal(senderId, recipientId, nonce);
        const lastSeen = this._store.get(signal);
        if (!lastSeen) {
            return false;
        }
        const valid = lastSeen + ForwardedSignal.SIGNAL_MAX_AGE > Date.now();
        if (!valid) {
            // Because of the ordering, we know that everything after that is invalid too.
            const toDelete = this._queue.dequeueUntil(signal);
            for (const dSignal of toDelete) {
                this._store.remove(dSignal);
            }
        }
        return valid;
    }
}
SignalStore.SIGNAL_MAX_AGE = 10 /* seconds */;
Class.register(SignalStore);

class ForwardedSignal {
    constructor(senderId, recipientId, nonce) {
        this._senderId = senderId;
        this._recipientId = recipientId;
        this._nonce = nonce;
    }

    equals(o) {
        return o instanceof ForwardedSignal
            && this._senderId === o._senderId
            && this._recipientId === o._recipientId
            && this._nonce === o._nonce;
    }

    hashCode() {
        return this.toString();
    }

    toString() {
        return `ForwardedSignal{senderId=${this._senderId}, recipientId=${this._recipientId}, nonce=${this._nonce}}`;
    }
}
Class.register(ForwardedSignal);

class NetUtils {
    static isPrivateIP(ip) {
        if (NetUtils.isIPv4Address(ip)) {
            for (const subnet of NetUtils.IPv4_PRIVATE_NETWORK) {
                if (NetUtils.isIPv4inSubnet(ip, subnet)) {
                    return true;
                }
            }
            return false;
        }

        if (NetUtils.isIPv6Address(ip)) {
            const parts = ip.toLowerCase().split(':');
            const isEmbeddedIPv4 = NetUtils.isIPv4Address(parts[parts.length - 1]);
            if (isEmbeddedIPv4) {
                return NetUtils.isPrivateIP(parts[parts.length - 1]);
            }

            // Private subnet is fc00::/7.
            // So, we only check the first 7 bits of the address to be equal fc00.
            // The mask shifts by 16-7=9 bits (one part - mask size).
            if ((parseInt(parts[0], 16) & (-1<<9)) === 0xfc00) {
                return true;
            }

            // Link-local addresses are fe80::/10.
            // Shifting has to be carried out by 16-10=6 bits.
            if ((parseInt(parts[0], 16) & (-1<<6)) === 0xfe80) {
                return true;
            }

            // Does not seem to be a private IP.
            return false;
        }

        throw `Malformed IP address ${ip}`;
    }

    static isIPv4inSubnet(ip, subnet) {
        let [subIp, mask] = subnet.split('/');
        mask = -1<<(32-parseInt(mask));
        return (NetUtils._IPv4toLong(ip) & mask) === NetUtils._IPv4toLong(subIp);
    }

    static isIPv4Address(ip) {
        const match = ip.match(/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/);
        return !!match && parseInt(match[1]) <= 255 && parseInt(match[2]) <= 255
            && parseInt(match[3]) <= 255 && parseInt(match[4]) <= 255;
    }

    static isIPv6Address(ip) {
        const parts = ip.toLowerCase().split(':');
        // An IPv6 address consists of at most 8 parts and at least 3.
        if (parts.length > 8 || parts.length < 3) {
            return false;
        }

        const isEmbeddedIPv4 = NetUtils.isIPv4Address(parts[parts.length - 1]);

        let innerEmpty = false;
        for (let i = 0; i < parts.length; ++i) {
            // Check whether each part is valid.
            // Note: the last part may be a IPv4 address!
            // They can be embedded in the last part. Remember that they take 32bit.
            if (!(/^[a-f0-9]{0,4}$/.test(parts[i])
                    || (i === parts.length - 1
                        && isEmbeddedIPv4
                        && parts.length < 8))) {
                return false;
            }
            // Inside the parts, there has to be at most one empty part.
            if (parts[i].length === 0 && i > 0 && i < parts.length - 1) {
                if (innerEmpty) {
                    return false; // at least two empty parts
                }
                innerEmpty = true;
            }
        }

        // In the special case of embedded IPv4 addresses, everything but the last 48 bit must be 0.
        if (isEmbeddedIPv4) {
            // Exclude the last two parts.
            for (let i=0; i<parts.length-2; ++i) {
                if (!/^0{0,4}$/.test(parts[i])) {
                    return false;
                }
            }
        }

        // If the first part is empty, the second has to be empty as well (e.g., ::1).
        if (parts[0].length === 0) {
            return parts[1].length === 0;
        }

        // If the last part is empty, the second last has to be empty as well (e.g., 1::).
        if (parts[parts.length - 1].length === 0) {
            return parts[parts.length - 2].length === 0;
        }

        // If the length is less than 7 and an IPv4 address is embedded, there has to be an empty part.
        if (isEmbeddedIPv4 && parts.length < 7) {
            return innerEmpty;
        }

        // Otherwise if the length is less than 8, there has to be an empty part.
        if (parts.length < 8) {
            return innerEmpty;
        }

        return true;
    }

    static sanitizeIP(ip) {
        const saneIp = NetUtils._normalizeIP(ip);
        if (NetUtils.IP_BLACKLIST.indexOf(saneIp) >= 0) {
            throw `Malformed IP address ${ip}`;
        }
        // TODO reject IPv6 broadcast addresses
        return saneIp;
    }

    static _normalizeIP(ip) {
        if (NetUtils.isIPv4Address(ip)) {
            // Re-create IPv4 address to strip possible leading zeros.
            // Embed into IPv6 format.
            const match = ip.match(/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/);
            return `${parseInt(match[1])}.${parseInt(match[2])}.${parseInt(match[3])}.${parseInt(match[4])}`;
        }

        if (NetUtils.isIPv6Address(ip)) {
            // Shorten IPv6 address according to RFC 5952.

            // Only use lower-case letters.
            ip = ip.toLowerCase();

            // Split into parts.
            const parts = ip.split(':');

            // Return normalized IPv4 address if embedded.
            if (NetUtils.isIPv4Address(parts[parts.length - 1])) {
                return NetUtils._normalizeIP(parts[parts.length - 1]);
            }

            // If it is already shortened at one point, blow it up again.
            // It may be the case, that the current shortening is not as described in the RFC.
            const emptyIndex = parts.indexOf('');
            if (emptyIndex >= 0) {
                parts[emptyIndex] = '0';
                // Also check parts before and after emptyIndex and fill them up if necessary.
                if (emptyIndex > 0 && parts[emptyIndex-1] === '') {
                    parts[emptyIndex-1] = '0';
                }
                if (emptyIndex < parts.length - 1 && parts[emptyIndex+1] === '') {
                    parts[emptyIndex+1] = '0';
                }

                // Add 0s until we have a normal IPv6 length.
                const necessaryAddition = 8-parts.length;
                for (let i=0; i<necessaryAddition; ++i) {
                    parts.splice(emptyIndex, 0, '0');
                }
            }

            let maxZeroSeqStart = -1;
            let maxZeroSeqLength = 0;
            let curZeroSeqStart = -1;
            let curZeroSeqLength = 1;
            for (let i = 0; i < parts.length; ++i) {
                // Remove leading zeros from each part, but keep at least one number.
                parts[i] = parts[i].replace(/^0+([a-f0-9])/, '$1');

                // We look for the longest, leftmost consecutive sequence of zero parts.
                if (parts[i] === '0') {
                    // Freshly started sequence.
                    if (curZeroSeqStart < 0) {
                        curZeroSeqStart = i;
                    } else {
                        // Known sequence, so increment length.
                        curZeroSeqLength++;
                    }
                } else {
                    // A sequence just ended, check if it is of better length.
                    if (curZeroSeqStart >= 0 && curZeroSeqLength > maxZeroSeqLength) {
                        maxZeroSeqStart = curZeroSeqStart;
                        maxZeroSeqLength = curZeroSeqLength;
                        curZeroSeqStart = -1;
                        curZeroSeqLength = 1;
                    }
                }
            }

            if (curZeroSeqStart >= 0 && curZeroSeqLength > maxZeroSeqLength) {
                maxZeroSeqStart = curZeroSeqStart;
                maxZeroSeqLength = curZeroSeqLength;
            }

            // Remove consecutive zeros.
            if (maxZeroSeqStart >= 0 && maxZeroSeqLength > 1) {
                if (maxZeroSeqLength === parts.length) {
                    return '::';
                } else if (maxZeroSeqStart === 0 || maxZeroSeqStart + maxZeroSeqLength === parts.length) {
                    parts.splice(maxZeroSeqStart, maxZeroSeqLength, ':');
                } else {
                    parts.splice(maxZeroSeqStart, maxZeroSeqLength, '');
                }
            }

            return parts.join(':');
        }

        throw `Malformed IP address ${ip}`;
    }

    static _IPv4toLong(ip) {
        const match = ip.match(/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/);
        return (parseInt(match[1])<<24) + (parseInt(match[2])<<16) + (parseInt(match[3])<<8) + (parseInt(match[4]));
    }
}
NetUtils.IP_BLACKLIST = [
    '0.0.0.0',
    '127.0.0.1',
    '255.255.255.255',
    '::',
    '::1'
];
NetUtils.IPv4_PRIVATE_NETWORK = [
    '10.0.0.0/8',
    '172.16.0.0/12',
    '192.168.0.0/16',
    '100.64.0.0/10', // link-local

    // Actually, the following one is only an approximation,
    // the first and the last /24 subnets in the range should be excluded.
    '169.254.0.0/16'
];
Class.register(NetUtils);

class PeerChannel extends Observable {
    constructor(connection) {
        super();
        this._conn = connection;
        this._conn.on('message', msg => this._onMessage(msg));

        // Forward specified events on the connection to listeners of this Observable.
        this.bubble(this._conn, 'close', 'error', 'ban');
    }

    _onMessage(rawMsg) {
        let msg;
        try {
            msg = MessageFactory.parse(rawMsg);
        } catch(e) {
            Log.w(PeerChannel, `Failed to parse message from ${this.peerAddress || this.netAddress}: ${e}`);

            // Ban client if it sends junk.
            // TODO We should probably be more lenient here. Bitcoin sends a
            // reject message if the message can't be decoded.
            // From the Bitcoin Reference:
            //  "Be careful of reject message feedback loops where two peers
            //   each don’t understand each other’s reject messages and so keep
            //   sending them back and forth forever."
            this.ban('junk received');
        }

        if (!msg) return;

        try {
            this.fire(msg.type, msg, this);
        } catch (e) {
            Log.w(PeerChannel, `Error while processing ${msg.type} message from ${this.peerAddress || this.netAddress}: ${e}`);
        }
    }

    _send(msg) {
        return this._conn.send(msg.serialize());
    }

    close(reason) {
        this._conn.close(reason);
    }

    ban(reason) {
        this._conn.ban(reason);
    }

    version(peerAddress, startHeight, totalWork) {
        return this._send(new VersionMessage(Version.CODE, peerAddress, Block.GENESIS.HASH, startHeight, totalWork));
    }

    verack() {
        return this._send(new VerAckMessage());
    }

    inv(vectors) {
        return this._send(new InvMessage(vectors));
    }

    notfound(vectors) {
        return this._send(new NotFoundMessage(vectors));
    }

    getdata(vectors) {
        return this._send(new GetDataMessage(vectors));
    }

    block(block) {
        return this._send(new BlockMessage(block));
    }

    tx(transaction) {
        return this._send(new TxMessage(transaction));
    }

    getblocks(hashes, hashStop = new Hash(null)) {
        return this._send(new GetBlocksMessage(hashes, hashStop));
    }

    mempool() {
        return this._send(new MempoolMessage());
    }

    reject(messageType, code, reason, extraData) {
        return this._send(new RejectMessage(messageType, code, reason, extraData));
    }

    addr(addresses) {
        return this._send(new AddrMessage(addresses));
    }

    getaddr(protocolMask, serviceMask) {
        return this._send(new GetAddrMessage(protocolMask, serviceMask));
    }

    ping(nonce) {
        return this._send(new PingMessage(nonce));
    }

    pong(nonce) {
        return this._send(new PongMessage(nonce));
    }

    signal(senderId, recipientId, nonce, ttl, flags, payload) {
        return this._send(new SignalMessage(senderId, recipientId, nonce, ttl, flags, payload));
    }

    equals(o) {
        return o instanceof PeerChannel
            && this._conn.equals(o.connection);
    }

    hashCode() {
        return this._conn.hashCode();
    }

    toString() {
        return 'PeerChannel{conn=' + this._conn + '}';
    }

    get connection() {
        return this._conn;
    }

    get id() {
        return this._conn.id;
    }

    get protocol() {
        return this._conn.protocol;
    }

    get peerAddress() {
        return this._conn.peerAddress;
    }

    set peerAddress(value) {
        this._conn.peerAddress = value;
    }

    get netAddress() {
        return this._conn.netAddress;
    }

    set netAddress(value) {
        this._conn.netAddress = value;
    }

    get closed() {
        return this._conn.closed;
    }
}
Class.register(PeerChannel);

class PeerConnection extends Observable {
    constructor(nativeChannel, protocol, netAddress, peerAddress) {
        super();
        this._channel = nativeChannel;

        this._protocol = protocol;
        this._netAddress = netAddress;
        this._peerAddress = peerAddress;

        this._bytesSent = 0;
        this._bytesReceived = 0;

        this._inbound = !peerAddress;
        this._closedByUs = false;
        this._closed = false;

        // Unique id for this connection.
        this._id = PeerConnection._instanceCount++;

        if (this._channel.on) {
            this._channel.on('message', msg => this._onMessage(msg.data || msg));
            this._channel.on('close', () => this._onClose());
            this._channel.on('error', e => this.fire('error', e, this));
        } else {
            this._channel.onmessage = msg => this._onMessage(msg.data || msg);
            this._channel.onclose = () => this._onClose();
            this._channel.onerror = e => this.fire('error', e, this);
        }
    }

    _onMessage(msg) {
        // Don't emit messages if this channel is closed.
        if (this._closed) {
            return;
        }

        // XXX Cleanup!
        if (!PlatformUtils.isBrowser() || !(msg instanceof Blob)) {
            this._bytesReceived += msg.byteLength || msg.length;
            this.fire('message', msg, this);
        } else {
            // Browser only
            // TODO FileReader is slow and this is ugly anyways. Improve!
            const reader = new FileReader();
            reader.onloadend = () => this._onMessage(new Uint8Array(reader.result));
            reader.readAsArrayBuffer(msg);
        }
    }

    _onClose() {
        // Don't fire close event again when already closed.
        if (this._closed) {
            return;
        }

        // Mark this connection as closed.
        this._closed = true;

        // Tell listeners that this connection has closed.
        this.fire('close', !this._closedByUs, this);
    }

    _close() {
        this._closedByUs = true;

        // Don't wait for the native close event to fire.
        this._onClose();

        // Close the native channel.
        this._channel.close();
    }

    _isChannelOpen() {
        return this._channel.readyState === WebSocket.OPEN
            || this._channel.readyState === 'open';
    }

    _isChannelClosing() {
        return this._channel.readyState === WebSocket.CLOSING
            || this._channel.readyState === 'closing';
    }

    _isChannelClosed() {
        return this._channel.readyState === WebSocket.CLOSED
            || this._channel.readyState === 'closed';
    }

    send(msg) {
        const logAddress = this._peerAddress || this._netAddress;
        if (this._closed) {
            // XXX Debug, spammy!!!
            Log.e(PeerConnection, `Tried to send data over closed connection to ${logAddress}`, MessageFactory.parse(msg));
            return false;
        }

        // Fire close event (early) if channel is closing/closed.
        if (this._isChannelClosing() || this._isChannelClosed()) {
            Log.w(PeerConnection, `Not sending data to ${logAddress} - channel closing/closed (${this._channel.readyState})`);
            this._onClose();
            return false;
        }

        // Don't attempt to send if channel is not (yet) open.
        if (!this._isChannelOpen()) {
            Log.w(PeerConnection, `Not sending data to ${logAddress} - channel not open (${this._channel.readyState})`);
            return false;
        }

        try {
            this._channel.send(msg);
            this._bytesSent += msg.byteLength || msg.length;
            return true;
        } catch (e) {
            Log.e(PeerConnection, `Failed to send data to ${logAddress}: ${e.message || e}`);
            return false;
        }
    }

    close(reason) {
        const connType = this._inbound ? 'inbound' : 'outbound';
        Log.d(PeerConnection, `Closing ${connType} connection #${this._id} ${this._peerAddress || this._netAddress}` + (reason ? ` - ${reason}` : ''));
        this._close();
    }

    ban(reason) {
        Log.w(PeerConnection, `Banning peer ${this._peerAddress || this._netAddress}` + (reason ? ` - ${reason}` : ''));
        this._close();
        this.fire('ban', reason, this);
    }

    equals(o) {
        return o instanceof PeerConnection
            && this._id === o.id;
    }

    hashCode() {
        return this._id;
    }

    toString() {
        return `PeerConnection{id=${this._id}, protocol=${this._protocol}, peerAddress=${this._peerAddress}, netAddress=${this._netAddress}}`;
    }

    get id() {
        return this._id;
    }

    get protocol() {
        return this._protocol;
    }

    get peerAddress() {
        return this._peerAddress;
    }

    set peerAddress(value) {
        this._peerAddress = value;
    }

    get netAddress() {
        return this._netAddress;
    }

    set netAddress(value) {
        this._netAddress = value;
    }

    get bytesSent() {
        return this._bytesSent;
    }

    get bytesReceived() {
        return this._bytesReceived;
    }

    get inbound() {
        return this._inbound;
    }

    get outbound() {
        return !this._inbound;
    }

    get closed() {
        return this._closed;
    }
}
// Used to generate unique PeerConnection ids.
PeerConnection._instanceCount = 0;
Class.register(PeerConnection);

class Peer {
    constructor(channel, version, startHeight, totalWork) {
        this._channel = channel;
        this._version = version;
        this._startHeight = startHeight;
        this._totalWork = totalWork;
    }

    get channel() {
        return this._channel;
    }

    get version() {
        return this._version;
    }

    get startHeight() {
        return this._startHeight;
    }

    get totalWork() {
        return this._totalWork;
    }

    get id() {
        return this._channel.id;
    }

    get peerAddress() {
        return this._channel.peerAddress;
    }

    get netAddress() {
        return this._channel.netAddress;
    }

    equals(o) {
        return o instanceof Peer
            && this._channel.equals(o.channel);
    }

    hashCode() {
        return this._channel.hashCode();
    }

    toString() {
        return `Peer{version=${this._version}, startHeight=${this._startHeight}, `
            + `peerAddress=${this.peerAddress}, netAddress=${this.netAddress}}`;
    }
}
Class.register(Peer);

class Miner extends Observable {
    constructor(blockchain, mempool, minerAddress) {
        super();
        this._blockchain = blockchain;
        this._mempool = mempool;
        this._address = minerAddress;

        // Number of hashes computed since the last hashrate update.
        this._hashCount = 0;

        // Timestamp of the last hashrate update.
        this._lastHashrate = 0;

        // Hashrate computation interval handle.
        this._hashrateWorker = null;

        // The current hashrate of this miner.
        this._hashrate = 0;

        // The last hash counts used in the moving average.
        this._lastHashCounts = [];

        // The total hashCount used in the current moving average.
        this._totalHashCount = 0;

        // The time elapsed for the last measurements used in the moving average.
        this._lastElapsed = [];

        // The total time elapsed used in the current moving average.
        this._totalElapsed = 0;

        // Listen to changes in the mempool which evicts invalid transactions
        // after every blockchain head change and then fires 'transactions-ready'
        // when the eviction process finishes. Restart work on the next block
        // with fresh transactions when this fires.
        this._mempool.on('transactions-ready', () => this._startWork());

        // Immediately start processing transactions when they come in.
        this._mempool.on('transaction-added', () => this._startWork());
    }

    startWork() {
        if (this.working) {
            return;
        }

        // Initialize hashrate computation.
        this._hashCount = 0;
        this._lastElapsed = [];
        this._lastHashCounts = [];
        this._totalHashCount = 0;
        this._totalElapsed = 0;
        this._lastHashrate = Date.now();
        this._hashrateWorker = setInterval(() => this._updateHashrate(), 1000);

        // Tell listeners that we've started working.
        this.fire('start', this);

        // Kick off the mining process.
        this._startWork();
    }

    async _startWork() {
        // XXX Needed as long as we cannot unregister from transactions-ready events.
        if (!this.working) {
            return;
        }

        // Construct next block.
        const block = await this._getNextBlock();
        const buffer = block.header.serialize();

        Log.i(Miner, `Starting work on ${block.header}, transactionCount=${block.transactionCount}, hashrate=${this._hashrate} H/s`);

        // Start hashing.
        this._mine(block, buffer);
    }


    async _mine(block, buffer) {
        // Abort mining if the blockchain head changed.
        if (!this._blockchain.headHash.equals(block.prevHash)) {
            return;
        }

        // Abort mining if the user stopped the miner.
        if (!this.working) {
            return;
        }

        // Reset the write position of the buffer before re-using it.
        buffer.writePos = 0;

        // Compute hash and check if it meets the proof of work condition.
        const isPoW = await block.header.verifyProofOfWork(buffer);

        // Keep track of how many hashes we have computed.
        this._hashCount++;

        // Check if we have found a block.
        if (isPoW) {
            // Tell listeners that we've mined a block.
            this.fire('block-mined', block, this);

            // Push block into blockchain.
            this._blockchain.pushBlock(block);
        } else {
            // Increment nonce.
            block.header.nonce++;

            // Continue mining.
            this._mine(block, buffer);
        }
    }

    async _getNextBlock() {
        const body = await this._getNextBody();
        const header = await this._getNextHeader(body);
        return new Block(header, body);
    }

    async _getNextHeader(body) {
        const prevHash = await this._blockchain.headHash;
        const accounts = await this._blockchain.createTemporaryAccounts();
        await accounts.commitBlockBody(body);
        const accountsHash = await accounts.hash();
        const bodyHash = await body.hash();
        const height = this._blockchain.height + 1;
        const timestamp = this._getNextTimestamp();
        const nBits = await this._blockchain.getNextCompactTarget();
        const nonce = Math.round(Math.random() * 100000);
        return new BlockHeader(prevHash, bodyHash, accountsHash, nBits, height, timestamp, nonce);
    }

    async _getNextBody() {
        // Get transactions from mempool (default is maxCount=5000).
        // TODO Completely fill up the block with transactions until the size limit is reached.
        const transactions = await this._mempool.getTransactions();
        return new BlockBody(this._address, transactions);
    }

    _getNextTimestamp() {
        const now = Math.floor(Date.now() / 1000);
        return Math.max(now, this._blockchain.head.timestamp + 1);
    }

    stopWork() {
        // TODO unregister from blockchain head-changed events.
        if (!this.working) {
            return;
        }

        clearInterval(this._hashrateWorker);
        this._hashrateWorker = null;
        this._hashrate = 0;
        this._lastElapsed = [];
        this._lastHashCounts = [];
        this._totalHashCount = 0;
        this._totalElapsed = 0;

        // Tell listeners that we've stopped working.
        this.fire('stop', this);

        Log.i(Miner, 'Stopped work');
    }

    _updateHashrate() {
        const elapsed = (Date.now() - this._lastHashrate) / 1000;
        const hashCount = this._hashCount;
        // Enable next measurement.
        this._hashCount = 0;
        this._lastHashrate = Date.now();

        // Update stored information on moving average.
        this._lastElapsed.push(elapsed);
        this._lastHashCounts.push(hashCount);
        this._totalElapsed += elapsed;
        this._totalHashCount += hashCount;

        if (this._lastElapsed.length > Miner.MOVING_AVERAGE_MAX_SIZE) {
            const oldestElapsed = this._lastElapsed.shift();
            const oldestHashCount = this._lastHashCounts.shift();
            this._totalElapsed -= oldestElapsed;
            this._totalHashCount -= oldestHashCount;
        }

        this._hashrate = Math.round(this._totalHashCount / this._totalElapsed);

        // Tell listeners about our new hashrate.
        this.fire('hashrate-changed', this._hashrate, this);
    }

    get address() {
        return this._address;
    }

    get working() {
        return !!this._hashrateWorker;
    }

    get hashrate() {
        return this._hashrate;
    }
}
Miner.MOVING_AVERAGE_MAX_SIZE = 10;
Class.register(Miner);

class WalletStore extends TypedDB {
    constructor() {
        super('wallet', KeyPair);
    }

    async get(key) {
        return this.getObject(key);
    }

    async put(key, value) {
        return this.putObject(key, value);
    }
}
Class.register(WalletStore);

// TODO V2: Store private key encrypted
class Wallet {
    static async getPersistent() {
        const db = new WalletStore();
        let keys = await db.get('keys');
        if (!keys) {
            keys = await KeyPair.generate();
            await db.put('keys', keys);
        }
        return new Wallet(keys);
    }

    static async createVolatile() {
        return new Wallet(await KeyPair.generate());
    }

    static load(hexBuf) {
        const hexMatch = hexBuf.match(/[0-9A-Fa-f]*/);
        if (hexBuf.length / 2 !== Crypto.privateKeySize || hexMatch[0] !== hexBuf) {
            throw Wallet.ERR_INVALID_WALLET_SEED;
        }

        return new Wallet(KeyPair.fromHex(hexBuf));
    }

    constructor(keyPair) {
        this._keyPair = keyPair;
        return this._init();
    }

    async _init() {
        this._address = await this._keyPair.publicKey.toAddress();
        return this;
    }

    createTransaction(recipientAddr, value, fee, nonce) {
        const transaction = new Transaction(this._keyPair.publicKey, recipientAddr, value, fee, nonce);
        return this._signTransaction(transaction);
    }

    async _signTransaction(transaction) {
        transaction.signature = await Signature.create(this._keyPair.privateKey, transaction.serializeContent());
        return transaction;
    }

    get address() {
        return this._address;
    }

    get publicKey() {
        return this._keyPair.publicKey;
    }

    get keyPair() {
        return this._keyPair;
    }

    dump() {
        return this._keyPair.toHex();
    }
}

Wallet.ERR_INVALID_WALLET_SEED = -100;

Class.register(Wallet);

class Core {
    constructor(options) {
        return this._init(options);
    }

    async _init({ walletSeed }) {
        // Model
        this.accounts = await Accounts.getPersistent();
        this.blockchain = await Blockchain.getPersistent(this.accounts);
        this.mempool = new Mempool(this.blockchain, this.accounts);

        // Network
        this.network = await new Network(this.blockchain);

        // Consensus
        this.consensus = new Consensus(this.blockchain, this.mempool, this.network);

        // Wallet
        if (walletSeed) {
            this.wallet = await Wallet.load(walletSeed);
        } else {
            this.wallet = await Wallet.getPersistent();
        }

        // Miner
        this.miner = new Miner(this.blockchain, this.mempool, this.wallet.address);

        Object.freeze(this);
        return this;
    }
}
Class.register(Core);

    exports._loaded = true;
    if (typeof Nimiq._onload === 'function') Nimiq._onload();
    return exports;
})(Nimiq);

//# sourceMappingURL=web-crypto.js.map