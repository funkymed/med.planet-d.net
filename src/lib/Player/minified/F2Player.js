/*
  Flod JS 2.1
  2012/04/30
  Christian Corti
  Neoart Costa Rica

  Last Update: Flod JS 2.0 - 2012/03/05

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
  OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
  LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR
  IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

  This work is licensed under the Creative Commons Attribution-Noncommercial-Share Alike 3.0 Unported License.
  To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/3.0/ or send a letter to
  Creative Commons, 171 Second Street, Suite 300, San Francisco, California, 94105, USA.
*/
(function(){function y(m){m=Object.create(null,{index:{value:m,writable:!0},next:{value:null,writable:!0},flags:{value:0,writable:!0},delay:{value:0,writable:!0},channel:{value:null,writable:!0},patternLoop:{value:0,writable:!0},patternLoopRow:{value:0,writable:!0},playing:{value:null,writable:!0},note:{value:0,writable:!0},keyoff:{value:0,writable:!0},period:{value:0,writable:!0},finetune:{value:0,writable:!0},arpDelta:{value:0,writable:!0},vibDelta:{value:0,writable:!0},instrument:{value:null,writable:!0},
autoVibratoPos:{value:0,writable:!0},autoSweep:{value:0,writable:!0},autoSweepPos:{value:0,writable:!0},sample:{value:null,writable:!0},sampleOffset:{value:0,writable:!0},volume:{value:0,writable:!0},volEnabled:{value:0,writable:!0},volEnvelope:{value:null,writable:!0},volDelta:{value:0,writable:!0},volSlide:{value:0,writable:!0},volSlideMaster:{value:0,writable:!0},fineSlideU:{value:0,writable:!0},fineSlideD:{value:0,writable:!0},fadeEnabled:{value:0,writable:!0},fadeDelta:{value:0,writable:!0},
fadeVolume:{value:0,writable:!0},panning:{value:0,writable:!0},panEnabled:{value:0,writable:!0},panEnvelope:{value:null,writable:!0},panSlide:{value:0,writable:!0},portaU:{value:0,writable:!0},portaD:{value:0,writable:!0},finePortaU:{value:0,writable:!0},finePortaD:{value:0,writable:!0},xtraPortaU:{value:0,writable:!0},xtraPortaD:{value:0,writable:!0},portaPeriod:{value:0,writable:!0},portaSpeed:{value:0,writable:!0},glissando:{value:0,writable:!0},glissPeriod:{value:0,writable:!0},vibratoPos:{value:0,
writable:!0},vibratoSpeed:{value:0,writable:!0},vibratoDepth:{value:0,writable:!0},vibratoReset:{value:0,writable:!0},tremoloPos:{value:0,writable:!0},tremoloSpeed:{value:0,writable:!0},tremoloDepth:{value:0,writable:!0},waveControl:{value:0,writable:!0},tremorPos:{value:0,writable:!0},tremorOn:{value:0,writable:!0},tremorOff:{value:0,writable:!0},tremorVolume:{value:0,writable:!0},retrigx:{value:0,writable:!0},retrigy:{value:0,writable:!0},reset:{value:function(){this.volume=this.sample.volume;this.panning=
this.sample.panning;this.finetune=this.sample.finetune>>3<<2;this.fadeDelta=this.fadeEnabled=this.volDelta=this.keyoff=0;this.fadeVolume=65536;this.autoVibratoPos=0;this.autoSweep=1;this.vibratoReset=this.vibDelta=this.autoSweepPos=0;4>(this.waveControl&15)&&(this.vibratoPos=0);4>this.waveControl>>4&&(this.tremoloPos=0)}},autoVibrato:{value:function(){var a;this.autoVibratoPos=this.autoVibratoPos+this.playing.vibratoSpeed&255;switch(this.playing.vibratoType){case 0:a=z[this.autoVibratoPos];break;
case 1:a=128>this.autoVibratoPos?-64:64;break;case 2:a=(64+(this.autoVibratoPos>>1)&127)-64;break;case 3:a=(64-(this.autoVibratoPos>>1)&127)-64}a*=this.playing.vibratoDepth;this.autoSweep&&(this.playing.vibratoSweep?this.autoSweepPos>this.playing.vibratoSweep?(this.autoSweepPos&2&&(a*=this.autoSweepPos/this.playing.vibratoSweep),this.autoSweep=0):a*=++this.autoSweepPos/this.playing.vibratoSweep:this.autoSweep=0);this.flags|=j;return a>>6}},tonePortamento:{value:function(){this.glissPeriod||(this.glissPeriod=
this.period);this.period<this.portaPeriod?(this.glissPeriod+=this.portaSpeed<<2,this.period=this.glissando?Math.round(this.glissPeriod/64)<<6:this.glissPeriod,this.period>=this.portaPeriod&&(this.period=this.portaPeriod,this.glissPeriod=this.portaPeriod=0)):this.period>this.portaPeriod&&(this.glissPeriod-=this.portaSpeed<<2,this.period=this.glissando?Math.round(this.glissPeriod/64)<<6:this.glissPeriod,this.period<=this.portaPeriod&&(this.period=this.portaPeriod,this.glissPeriod=this.portaPeriod=0));
this.flags|=j}},tremolo:{value:function(){var a=255,e=this.tremoloPos&31;switch(this.waveControl>>4&3){case 0:a=s[e];break;case 1:a=e<<3}this.volDelta=a*this.tremoloDepth>>6;31<this.tremoloPos&&(this.volDelta=-this.volDelta);this.tremoloPos=this.tremoloPos+this.tremoloSpeed&63;this.flags|=i}},tremor:{value:function(){this.tremorPos==this.tremorOn?(this.tremorVolume=this.volume,this.volume=0):(this.tremorPos=0,this.volume=this.tremorVolume);this.flags|=i;this.tremorPos++}},vibrato:{value:function(){var a=
255,e=this.vibratoPos&31;switch(this.waveControl&3){case 0:a=s[e];break;case 1:a=e<<3,31<this.vibratoPos&&(a=255-a)}this.vibDelta=a*this.vibratoDepth>>7;31<this.vibratoPos&&(this.vibDelta=-this.vibDelta);this.vibratoPos=this.vibratoPos+this.vibratoSpeed&63;this.flags|=j}}});m.volEnvelope=t();m.panEnvelope=t();return Object.seal(m)}function o(){return Object.create(null,{points:{value:[],writable:!0},total:{value:0,writable:!0},sustain:{value:0,writable:!0},loopStart:{value:0,writable:!0},loopEnd:{value:0,
writable:!0},flags:{value:0,writable:!0}})}function t(){return Object.create(null,{value:{value:0,writable:!0},position:{value:0,writable:!0},frame:{value:0,writable:!0},delta:{value:0,writable:!0},fraction:{value:0,writable:!0},stopped:{value:0,writable:!0},reset:{value:function(){this.stopped=this.fraction=this.delta=this.frame=this.position=this.value=0}}})}function u(){var i=Object.create(null,{name:{value:"",writable:!0},samples:{value:[],writable:!0},noteSamples:{value:null,writable:!0},fadeout:{value:0,
writable:!0},volData:{value:null,writable:!0},volEnabled:{value:0,writable:!0},panData:{value:null,writable:!0},panEnabled:{value:0,writable:!0},vibratoType:{value:0,writable:!0},vibratoSweep:{value:0,writable:!0},vibratoSpeed:{value:0,writable:!0},vibratoDepth:{value:0,writable:!0}});i.noteSamples=new Uint8Array(96);i.volData=o();i.panData=o();return Object.seal(i)}function v(i,a){var e=Object.create(null,{rows:{value:[],writable:!0},length:{value:0,writable:!0},size:{value:0,writable:!0}});e.rows.length=
e.size=i*a;e.length=i;return Object.seal(e)}function p(i,a){var e=Object.create(null,{frame:{value:0,writable:!0},value:{value:0,writable:!0}});e.frame=i||0;e.value=a||0;return Object.seal(e)}function q(){return Object.create(null,{note:{value:0,writable:!0},instrument:{value:0,writable:!0},volume:{value:0,writable:!0},effect:{value:0,writable:!0},param:{value:0,writable:!0}})}function w(){var i=SBSample();Object.defineProperties(i,{finetune:{value:0,writable:!0},panning:{value:0,writable:!0},relative:{value:0,
writable:!0}});return Object.seal(i)}var j=1,i=2,z=[0,-2,-3,-5,-6,-8,-9,-11,-12,-14,-16,-17,-19,-20,-22,-23,-24,-26,-27,-29,-30,-32,-33,-34,-36,-37,-38,-39,-41,-42,-43,-44,-45,-46,-47,-48,-49,-50,-51,-52,-53,-54,-55,-56,-56,-57,-58,-59,-59,-60,-60,-61,-61,-62,-62,-62,-63,-63,-63,-64,-64,-64,-64,-64,-64,-64,-64,-64,-64,-64,-63,-63,-63,-62,-62,-62,-61,-61,-60,-60,-59,-59,-58,-57,-56,-56,-55,-54,-53,-52,-51,-50,-49,-48,-47,-46,-45,-44,-43,-42,-41,-39,-38,-37,-36,-34,-33,-32,-30,-29,-27,-26,-24,-23,-22,
-20,-19,-17,-16,-14,-12,-11,-9,-8,-6,-5,-3,-2,0,2,3,5,6,8,9,11,12,14,16,17,19,20,22,23,24,26,27,29,30,32,33,34,36,37,38,39,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,56,57,58,59,59,60,60,61,61,62,62,62,63,63,63,64,64,64,64,64,64,64,64,64,64,64,63,63,63,62,62,62,61,61,60,60,59,59,58,57,56,56,55,54,53,52,51,50,49,48,47,46,45,44,43,42,41,39,38,37,36,34,33,32,30,29,27,26,24,23,22,20,19,17,16,14,12,11,9,8,6,5,3,2],s=[0,24,49,74,97,120,141,161,180,197,212,224,235,244,250,253,255,253,250,244,235,224,
212,197,180,161,141,120,97,74,49,24],n=[0,0.04417,0.062489,0.076523,0.088371,0.098821,0.108239,0.116927,0.124977,0.132572,0.139741,0.146576,0.153077,0.159335,0.16535,0.171152,0.176772,0.18221,0.187496,0.19263,0.197643,0.202503,0.207273,0.211951,0.216477,0.220943,0.225348,0.229631,0.233854,0.237985,0.242056,0.246066,0.249985,0.253873,0.25767,0.261437,0.265144,0.268819,0.272404,0.275989,0.279482,0.282976,0.286409,0.289781,0.293153,0.296464,0.299714,0.302965,0.306185,0.309344,0.312473,0.315602,0.318671,
0.321708,0.324746,0.327754,0.3307,0.333647,0.336563,0.339449,0.342305,0.345161,0.347986,0.350781,0.353545,0.356279,0.359013,0.361717,0.364421,0.367094,0.369737,0.37238,0.374992,0.377574,0.380157,0.382708,0.38526,0.387782,0.390303,0.392794,0.395285,0.397746,0.400176,0.402606,0.405037,0.407437,0.409836,0.412206,0.414576,0.416915,0.419254,0.421563,0.423841,0.42618,0.428458,0.430737,0.432985,0.435263,0.437481,0.439729,0.441916,0.444134,0.446321,0.448508,0.450665,0.452852,0.455009,0.457136,0.459262,0.461389,
0.463485,0.465611,0.467708,0.469773,0.471839,0.473935,0.47597,0.478036,0.480072,0.482077,0.484112,0.486117,0.488122,0.490127,0.492101,0.494106,0.496051,0.498025,0.5,0.501944,0.503888,0.505802,0.507746,0.50966,0.511574,0.513488,0.515371,0.517255,0.519138,0.521022,0.522905,0.524758,0.526611,0.528465,0.530318,0.53214,0.533993,0.535816,0.537639,0.539462,0.541254,0.543046,0.544839,0.546631,0.548423,0.550216,0.551978,0.553739,0.555501,0.557263,0.558995,0.560757,0.562489,0.56422,0.565952,0.567683,0.569384,
0.571116,0.572817,0.574518,0.57622,0.57789,0.579592,0.581262,0.582964,0.584634,0.586305,0.587946,0.589617,0.591257,0.592928,0.594568,0.596209,0.597849,0.599459,0.6011,0.60271,0.60435,0.60596,0.60757,0.60915,0.61076,0.61237,0.61395,0.61556,0.617139,0.618719,0.620268,0.621848,0.623428,0.624977,0.626557,0.628106,0.629655,0.631205,0.632754,0.634303,0.635822,0.637372,0.63889,0.64044,0.641959,0.643478,0.644966,0.646485,0.648004,0.649523,0.651012,0.6525,0.653989,0.655477,0.656966,0.658454,0.659943,0.661431,
0.66289,0.664378,0.665836,0.667294,0.668783,0.670241,0.671699,0.673127,0.674585,0.676043,0.677471,0.678929,0.680357,0.681785,0.683213,0.684641,0.686068,0.687496,0.688894,0.690321,0.691749,0.693147,0.694574,0.695972,0.697369,0.698767,0.700164,0.701561,0.702928,0.704326,0.705723,0.70711],x=[0,0.005863,0.013701,0.021569,0.029406,0.037244,0.045082,0.052919,0.060757,0.068625,0.076463,0.0843,0.092138,0.099976,0.107844,0.115681,0.123519,0.131357,0.139194,0.147032,0.1549,0.162738,0.170575,0.178413,0.186251,
0.194119,0.201956,0.209794,0.217632,0.225469,0.233307,0.241175,0.249013,0.25685,0.264688,0.272526,0.280394,0.288231,0.296069,0.303907,0.311744,0.319582,0.32745,0.335288,0.343125,0.350963,0.3588,0.366669,0.374506,0.382344,0.390182,0.398019,0.405857,0.413725,0.421563,0.4294,0.437238,0.445076,0.452944,0.460781,0.468619,0.476457,0.484294,0.492132,0.5],r=[29024,27392,25856,24384,23040,21696,20480,19328,18240,17216,16256,15360,14512,13696,12928,12192,11520,10848,10240,9664,9120,8608,8128,7680,7256,6848,
6464,6096,5760,5424,5120,4832,4560,4304,4064,3840,3628,3424,3232,3048,2880,2712,2560,2416,2280,2152,2032,1920,1814,1712,1616,1524,1440,1356,1280,1208,1140,1076,1016,960,907,856,808,762,720,678,640,604,570,538,508,480,453,428,404,381,360,339,320,302,285,269,254,240,227,214,202,190,180,169,160,151,142,134,127,120,113,107,101,95,90,85,80,75,71,67,63,60,57,53,50,48,45,42,40,38,36,34,32,30,28];window.neoart.F2Player=function(m){m=SBPlayer(m);Object.defineProperties(m,{id:{value:"F2Player"},patterns:{value:[],
writable:!0},instruments:{value:[],writable:!0},voices:{value:[],writable:!0},linear:{value:0,writable:!0},complete:{value:0,writable:!0},order:{value:0,writable:!0},position:{value:0,writable:!0},nextOrder:{value:0,writable:!0},nextPosition:{value:0,writable:!0},pattern:{value:null,writable:!0},patternDelay:{value:0,writable:!0},patternOffset:{value:0,writable:!0},timer:{value:0,writable:!0},initialize:{value:function(){var a=0,e;this.reset();this.timer=this.speed;this.position=this.order=0;this.nextPosition=
this.nextOrder=-1;this.complete=this.patternOffset=this.patternDelay=0;this.master=64;for(this.voices.length=this.channels;a<this.channels;++a)e=y(a),e.channel=this.mixer.channels[a],e.playing=this.instruments[0],e.sample=e.playing.samples[0],this.voices[a]=e,a&&(this.voices[a-1].next=e)}},loader:{value:function(a){var e,d,h,f,c,i,g,b=22,j,k;if(!(360>a.length)){a.position=17;this.title=a.readString(20);a.position++;d=a.readString(20);if("FastTracker v2.00   "==d||"FastTracker v 2.00  "==d)this.version=
1;else if("Sk@le Tracker"==d)this.version=b=2;else if("MadTracker 2.0"==d)this.version=3;else if("MilkyTracker        "==d)this.version=4;else if("DigiBooster Pro 2.18"==d)this.version=5;else if(-1!=d.indexOf("OpenMPT"))this.version=6;else return;a.readUshort();e=a.readUint();this.length=a.readUshort();this.restart=a.readUshort();this.channels=a.readUshort();k=j=a.readUshort();this.instruments=[];this.instruments.length=a.readUshort()+1;this.linear=a.readUshort();this.speed=a.readUshort();this.tempo=
a.readUshort();this.track=new Uint8Array(this.length);for(d=0;d<this.length;++d)h=a.readUbyte(),h>=k&&(j=h+1),this.track[d]=h;this.patterns=[];this.patterns.length=j;if(j!=k){f=v(64,this.channels);h=f.size;for(d=0;d<h;++d)f.rows[d]=q();this.patterns[--j]=f}a.position=g=e+60;i=k;for(d=0;d<i;++d){e=a.readUint();a.position++;f=v(a.readUshort(),this.channels);j=f.size;k=a.readUshort();a.position=g+e;c=a.position+k;if(k)for(h=0;h<j;++h){e=q();k=a.readUbyte();if(k&128){if(k&1&&(e.note=a.readUbyte()),k&
2&&(e.instrument=a.readUbyte()),k&4&&(e.volume=a.readUbyte()),k&8&&(e.effect=a.readUbyte()),k&16)e.param=a.readUbyte()}else e.note=k,e.instrument=a.readUbyte(),e.volume=a.readUbyte(),e.effect=a.readUbyte(),e.param=a.readUbyte();97!=e.note&&96<e.note&&(e.note=0);f.rows[h]=e}else for(h=0;h<j;++h)f.rows[h]=q();this.patterns[d]=f;g=a.position;g!=c&&(g=a.position=c)}c=a.position;i=this.instruments.length;for(d=1;d<i;++d){h=a.readUint();if(a.position+h>=a.length)break;f=u();f.name=a.readString(22);a.position++;
k=a.readUshort();16<k&&(k=16);e=a.readUint();2==b&&64!=e&&(e=64);if(k){f.samples=[];f.samples.length=k;for(h=0;96>h;++h)f.noteSamples[h]=a.readUbyte();for(h=0;12>h;++h)f.volData.points[h]=p(a.readUshort(),a.readUshort());for(h=0;12>h;++h)f.panData.points[h]=p(a.readUshort(),a.readUshort());f.volData.total=a.readUbyte();f.panData.total=a.readUbyte();f.volData.sustain=a.readUbyte();f.volData.loopStart=a.readUbyte();f.volData.loopEnd=a.readUbyte();f.panData.sustain=a.readUbyte();f.panData.loopStart=
a.readUbyte();f.panData.loopEnd=a.readUbyte();f.volData.flags=a.readUbyte();f.panData.flags=a.readUbyte();f.volData.flags&1&&(f.volEnabled=1);f.panData.flags&1&&(f.panEnabled=1);f.vibratoType=a.readUbyte();f.vibratoSweep=a.readUbyte();f.vibratoDepth=a.readUbyte();f.vibratoSpeed=a.readUbyte();f.fadeout=a.readUshort()<<1;a.position+=b;g=a.position;this.instruments[d]=f;for(h=0;h<k;++h)c=w(),c.length=a.readUint(),c.loopStart=a.readUint(),c.loopLen=a.readUint(),c.volume=a.readUbyte(),c.finetune=a.readByte(),
c.loopMode=a.readUbyte(),c.panning=a.readUbyte(),c.relative=a.readByte(),a.position++,c.name=a.readString(22),f.samples[h]=c,a.position=g+=e;for(h=0;h<k;++h)if(c=f.samples[h],c.length)g=a.position+c.length,c.loopMode&16&&(c.bits=16,c.loopMode^=16,c.length>>=1,c.loopStart>>=1,c.loopLen>>=1),c.loopLen||(c.loopMode=0),c.store(a),c.loopMode&&(c.length=c.loopStart+c.loopLen),a.position=g}else a.position=c+h;c=a.position;if(c>=a.length)break}f=u();f.volData=o();f.panData=o();f.samples=[];for(d=0;12>d;++d)f.volData.points[d]=
p(),f.panData.points[d]=p();c=w();c.length=220;c.data=new Float32Array(220);for(d=0;220>d;++d)c.data[d]=0;f.samples[0]=c;this.instruments[0]=f}}},process:{value:function(){var a,e,d,h,f,c,l,g,b=this.voices[0];if(this.tick)for(;b;){c=this.pattern.rows[this.position+b.index];if(b.delay)if((c.param&15)==this.tick)b.flags=b.delay,b.delay=0;else{b=b.next;continue}if(c.volume)switch(e=c.volume>>4,d=c.volume&15,e){case 6:b.volume-=d;0>b.volume&&(b.volume=0);b.flags|=i;break;case 7:b.volume+=d;64<b.volume&&
(b.volume=64);b.flags|=i;break;case 11:b.vibrato();break;case 13:b.panning-=d;0>b.panning&&(b.panning=0);b.flags|=4;break;case 14:b.panning+=d;255<b.panning&&(b.panning=255);b.flags|=4;break;case 15:b.portaPeriod&&b.tonePortamento()}e=c.param>>4;d=c.param&15;switch(c.effect){case 0:if(!c.param)break;g=(this.tick-this.timer)%3;0>g&&(g+=3);2==this.tick&&18==this.timer&&(g=0);g?1==g?this.linear?b.arpDelta=-(d<<6):(g=this.amiga(b.note+d,b.finetune),b.arpDelta=g-b.period):this.linear?b.arpDelta=-(e<<6):
(g=this.amiga(b.note+e,b.finetune),b.arpDelta=g-b.period):b.arpDelta=0;b.flags|=j;break;case 1:b.period-=b.portaU;0>b.period&&(b.period=0);b.flags|=j;break;case 2:b.period+=b.portaD;9212<b.period&&(b.period=9212);b.flags|=j;break;case 3:b.portaPeriod&&b.tonePortamento();break;case 4:e&&(b.vibratoSpeed=e);d&&(b.vibratoDepth=d<<2);b.vibrato();break;case 5:f=1;b.portaPeriod&&b.tonePortamento();break;case 6:f=1;b.vibrato();break;case 7:b.tremolo();break;case 10:f=1;break;case 14:switch(e){case 9:0==this.tick%
d&&(b.volEnvelope.reset(),b.panEnvelope.reset(),b.flags|=i|12);break;case 12:this.tick==d&&(b.volume=0,b.flags|=i)}break;case 17:e=b.volSlideMaster>>4;d=b.volSlideMaster&15;e?(this.master+=e,64<this.master&&(this.master=64),b.flags|=i):d&&(this.master-=d,0>this.master&&(this.master=0),b.flags|=i);break;case 20:this.tick==c.param&&(b.fadeEnabled=1,b.keyoff=1);break;case 24:e=b.panSlide>>4;d=b.panSlide&15;e?(b.panning+=e,255<b.panning&&(b.panning=255),b.flags|=4):d&&(b.panning-=d,0>b.panning&&(b.panning=
0),b.flags|=4);break;case 27:a=this.tick;c.volume||a++;if(a%b.retrigy)break;(!c.volume||80<c.volume)&&b.retrigx&&this.retrig(b);b.flags|=8;break;case 29:b.tremor()}f&&(e=b.volSlide>>4,d=b.volSlide&15,f=0,e?(b.volume+=e,b.flags|=i):d&&(b.volume-=d,b.flags|=i));b=b.next}else{0<=this.nextOrder&&(this.order=this.nextOrder);0<=this.nextPosition&&(this.position=this.nextPosition);this.nextOrder=this.nextPosition=-1;for(this.pattern=this.patterns[this.track[this.order]];b;){c=this.pattern.rows[this.position+
b.index];a=c.volume>>4;f=3==c.effect||5==c.effect||15==a;e=c.param>>4;b.keyoff=0;b.arpDelta&&(b.arpDelta=0,b.flags|=j);if(c.instrument)b.instrument=c.instrument<this.instruments.length?this.instruments[c.instrument]:null,b.volEnvelope.reset(),b.panEnvelope.reset(),b.flags|=i|36;else if(97==c.note||20==c.effect&&!c.param)b.fadeEnabled=1,b.keyoff=1;if(c.note&&97!=c.note)if(b.instrument){if(d=b.instrument,g=c.note-1,l=d.samples[d.noteSamples[g]],g+=l.relative,0<=g&&118>=g)(f||(b.note=g,b.sample=l,c.instrument?
(b.volEnabled=d.volEnabled,b.panEnabled=d.panEnabled,b.flags|=15):b.flags|=j|8),c.instrument?(b.reset(),b.fadeDelta=d.fadeout):b.finetune=l.finetune>>3<<2,14==c.effect&&5==e&&(b.finetune=(c.param&15)-8<<3),g=this.linear?(120-g<<6)-b.finetune:this.amiga(g,b.finetune),f)?b.portaPeriod=g:(b.period=g,b.glissPeriod=0)}else b.volume=0,b.flags=i|32;else b.vibratoReset&&4!=c.effect&&6!=c.effect&&(b.vibDelta=0,b.vibratoReset=0,b.flags|=j);if(c.volume)if(16<=c.volume&&80>=c.volume)b.volume=c.volume-16,b.flags|=
i|32;else switch(d=c.volume&15,a){case 6:b.volume-=d;0>b.volume&&(b.volume=0);b.flags|=i;break;case 7:b.volume+=d;64<b.volume&&(b.volume=64);b.flags|=i;break;case 10:d&&(b.vibratoSpeed=d);break;case 11:d&&(b.vibratoDepth=d<<2);break;case 12:b.panning=d<<4;b.flags|=4;break;case 15:d&&(b.portaSpeed=d<<4)}if(c.effect)switch(d=c.param&15,c.effect){case 1:c.param&&(b.portaU=c.param<<2);break;case 2:c.param&&(b.portaD=c.param<<2);break;case 3:c.param&&15!=a&&(b.portaSpeed=c.param);break;case 4:b.vibratoReset=
1;break;case 5:c.param&&(b.volSlide=c.param);break;case 6:c.param&&(b.volSlide=c.param);b.vibratoReset=1;break;case 7:e&&(b.tremoloSpeed=e);d&&(b.tremoloDepth=d);break;case 8:b.panning=c.param;b.flags|=4;break;case 9:c.param&&(b.sampleOffset=c.param<<8);b.sampleOffset>=b.sample.length&&(b.volume=0,b.sampleOffset=0,b.flags&=~(j|8),b.flags|=i|32);break;case 10:c.param&&(b.volSlide=c.param);break;case 11:this.nextOrder=c.param;this.nextOrder>=this.length?this.complete=1:this.nextPosition=0;h=1;this.patternOffset=
0;break;case 12:b.volume=c.param;b.flags|=i|32;break;case 13:this.nextPosition=(10*e+d)*this.channels;this.patternOffset=0;h||(this.nextOrder=this.order+1,this.nextOrder>=this.length&&(this.complete=1,this.nextPosition=-1));break;case 14:switch(e){case 1:d&&(b.finePortaU=d<<2);b.period-=b.finePortaU;b.flags|=j;break;case 2:d&&(b.finePortaD=d<<2);b.period+=b.finePortaD;b.flags|=j;break;case 3:b.glissando=d;break;case 4:b.waveControl=b.waveControl&240|d;break;case 6:d?(b.patternLoop?b.patternLoop--:
b.patternLoop=d,b.patternLoop&&(this.nextPosition=b.patternLoopRow)):b.patternLoopRow=this.patternOffset=this.position;break;case 7:b.waveControl=b.waveControl&15|d<<4;break;case 10:d&&(b.fineSlideU=d);b.volume+=b.fineSlideU;b.flags|=i;break;case 11:d&&(b.fineSlideD=d);b.volume-=b.fineSlideD;b.flags|=i;break;case 13:b.delay=b.flags;b.flags=0;break;case 14:this.patternDelay=d*this.timer}break;case 15:if(!c.param)break;32>c.param?this.timer=c.param:this.mixer.samplesTick=2.5*this.sampleRate/c.param>>
0;break;case 16:this.master=c.param;64<this.master&&(this.master=64);b.flags|=i;break;case 17:c.param&&(b.volSlideMaster=c.param);break;case 21:if(!b.instrument||!b.instrument.volEnabled)break;d=b.instrument;g=c.param;e=d.volData.total;for(a=0;a<e&&!(g<d.volData.points[a].frame);a++);b.volEnvelope.position=--a;e--;d.volData.flags&4&&a==d.volData.loopEnd&&(a=b.volEnvelope.position=d.volData.loopStart,g=d.volData.points[a].frame,b.volEnvelope.frame=g);a>=e?(b.volEnvelope.value=d.volData.points[e].value,
b.volEnvelope.stopped=1):(b.volEnvelope.stopped=0,b.volEnvelope.frame=g,g>d.volData.points[a].frame&&b.volEnvelope.position++,e=d.volData.points[a],a=d.volData.points[++a],g=a.frame-e.frame,b.volEnvelope.delta=(g?(a.value-e.value<<8)/g>>0:0)||0,b.volEnvelope.fraction=e.value<<8);break;case 24:c.param&&(b.panSlide=c.param);break;case 27:e&&(b.retrigx=e);d&&(b.retrigy=d);if(!c.volume&&b.retrigy){a=this.tick+1;if(a%b.retrigy)break;80<c.volume&&b.retrigx&&this.retrig(b)}break;case 29:c.param&&(b.tremorOn=
++e,b.tremorOff=++d+e);break;case 33:1==e?(d&&(b.xtraPortaU=d),b.period-=b.xtraPortaU,b.flags|=j):2==e&&(d&&(b.xtraPortaD=d),b.period+=b.xtraPortaD,b.flags|=j)}b=b.next}}if(++this.tick>=this.timer+this.patternDelay&&(this.patternDelay=this.tick=0,0>this.nextPosition&&(this.nextPosition=this.position+this.channels,this.nextPosition>=this.pattern.size||this.complete)))this.nextOrder=this.order+1,this.nextPosition=this.patternOffset,this.nextOrder>=this.length&&(this.nextOrder=this.restart,this.mixer.complete=
1)}},fast:{value:function(){for(var a,e,d,h,f,c=this.voices[0],l;c;)a=c.channel,d=c.flags,c.flags=0,d&8&&(a.index=c.sampleOffset,a.pointer=-1,a.dir=0,a.fraction=0,a.sample=c.sample,a.length=c.sample.length,a.enabled=a.sample.data?1:0,c.playing=c.instrument,c.sampleOffset=0),h=c.playing,e=h.vibratoSpeed?c.autoVibrato():0,l=c.volume+c.volDelta,h.volEnabled?(c.volEnabled&&!c.volEnvelope.stopped&&this.envelope(c,c.volEnvelope,h.volData),l=l*c.volEnvelope.value>>6,d|=i,c.fadeEnabled&&(c.fadeVolume-=c.fadeDelta,
0>c.fadeVolume?(l=0,c.fadeVolume=0,c.fadeEnabled=0,c.volEnvelope.value=0,c.volEnvelope.stopped=1,c.panEnvelope.stopped=1):l=l*c.fadeVolume>>16)):c.keyoff&&(l=0,d|=i),f=c.panning,h.panEnabled&&(c.panEnabled&&!c.panEnvelope.stopped&&this.envelope(c,c.panEnvelope,h.panData),f=c.panEnvelope.value<<2,d|=4,0>f?f=0:255<f&&(f=255)),d&i&&(0>l?l=0:64<l&&(l=64),a.volume=x[l*this.master>>6],a.lvol=a.volume*a.lpan,a.rvol=a.volume*a.rpan),d&4&&(a.panning=f,a.lpan=n[256-f],a.rpan=n[f],a.lvol=a.volume*a.lpan,a.rvol=
a.volume*a.rpan),d&j&&(e+=c.period+c.arpDelta+c.vibDelta,a.speed=this.linear?(548077568*Math.pow(2,(4608-e)/768)/this.sampleRate>>0)/65536:(65536*(14317456/e)/this.sampleRate>>0)/65536,a.delta=a.speed>>0,a.speed-=a.delta),c=c.next}},accurate:{value:function(){for(var a,e,d,h,f,c,l,g=this.voices[0];g;){a=g.channel;d=g.flags;g.flags=0;d&8&&(a.sample&&(d|=32,a.mixCounter=220,a.oldSample=null,a.oldPointer=-1,a.enabled&&(a.oldDir=a.dir,a.oldFraction=a.fraction,a.oldSpeed=a.speed,a.oldSample=a.sample,a.oldPointer=
a.pointer,a.oldLength=a.length,a.lmixRampD=a.lvol,a.lmixDeltaD=a.lvol/220,a.rmixRampD=a.rvol,a.rmixDeltaD=a.rvol/220)),a.dir=1,a.fraction=0,a.sample=g.sample,a.pointer=g.sampleOffset,a.length=g.sample.length,a.enabled=a.sample.data?1:0,g.playing=g.instrument,g.sampleOffset=0);h=g.playing;e=h.vibratoSpeed?g.autoVibrato():0;f=g.volume+g.volDelta;h.volEnabled?(g.volEnabled&&!g.volEnvelope.stopped&&this.envelope(g,g.volEnvelope,h.volData),f=f*g.volEnvelope.value>>6,d|=i,g.fadeEnabled&&(g.fadeVolume-=
g.fadeDelta,0>g.fadeVolume?(f=0,g.fadeVolume=0,g.fadeEnabled=0,g.volEnvelope.value=0,g.volEnvelope.stopped=1,g.panEnvelope.stopped=1):f=f*g.fadeVolume>>16)):g.keyoff&&(f=0,d|=i);c=g.panning;h.panEnabled&&(g.panEnabled&&!g.panEnvelope.stopped&&this.envelope(g,g.panEnvelope,h.panData),c=g.panEnvelope.value<<2,d|=4,0>c?c=0:255<c&&(c=255));if(a.enabled){if(d&i&&(0>f?f=0:64<f&&(f=64),f=x[f*this.master>>6],h=f*n[256-c],l=f*n[c],f!=a.volume&&!a.mixCounter?(a.volCounter=d&32?220:this.mixer.samplesTick,a.lvolDelta=
(h-a.lvol)/a.volCounter,a.rvolDelta=(l-a.rvol)/a.volCounter):(a.lvol=h,a.rvol=l),a.volume=f),d&4&&(f=n[256-c],h=n[c],c!=a.panning&&!a.mixCounter&&!a.volCounter?(a.panCounter=this.mixer.samplesTick,a.lpanDelta=(f-a.lpan)/a.panCounter,a.rpanDelta=(h-a.rpan)/a.panCounter):(a.lpan=f,a.rpan=h),a.panning=c),d&j&&(e+=g.period+g.arpDelta+g.vibDelta,a.speed=this.linear?(548077568*Math.pow(2,(4608-e)/768)/this.sampleRate>>0)/65536:(65536*(14317456/e)/this.sampleRate>>0)/65536),a.mixCounter)a.lmixRampU=0,a.lmixDeltaU=
a.lvol/220,a.rmixRampU=0,a.rmixDeltaU=a.rvol/220}else a.volCounter=0,a.panCounter=0;g=g.next}}},envelope:{value:function(a,e,d){var h=e.position,f=d.points[h];if(e.frame==f.frame){d.flags&4&&h==d.loopEnd&&(h=e.position=d.loopStart,f=d.points[h],e.frame=f.frame);if(h==d.total-1){e.value=f.value;e.stopped=1;return}if(d.flags&2&&h==d.sustain&&!a.fadeEnabled){e.value=f.value;return}e.position++;a=d.points[e.position];e.delta=(a.value-f.value<<8)/(a.frame-f.frame)>>0||0;e.fraction=f.value<<8}else e.fraction+=
e.delta;e.value=e.fraction>>8;e.frame++}},amiga:{value:function(a,e){var d=0,h=r[++a];0>e?d=(r[--a]-h)/64:0<e&&(d=(h-r[++a])/64);return h-d*e>>0}},retrig:{value:function(a){switch(a.retrigx){case 1:a.volume--;break;case 2:a.volume++;break;case 3:a.volume-=4;break;case 4:a.volume-=8;break;case 5:a.volume-=16;break;case 6:a.volume=(a.volume<<1)/3;break;case 7:a.volume>>=1;break;case 8:a.volume=a.sample.volume;break;case 9:a.volume++;break;case 10:a.volume+=2;break;case 11:a.volume+=4;break;case 12:a.volume+=
8;break;case 13:a.volume+=16;break;case 14:a.volume=3*a.volume>>1;break;case 15:a.volume<<=1}0>a.volume?a.volume=0:64<a.volume&&(a.volume=64);a.flags|=i}}});return Object.seal(m)}})();