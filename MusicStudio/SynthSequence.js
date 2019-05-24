var Synthesizer = function () {
    loadSounds(this, {
        piano: 'epiano.wav',
        brass: 'sbrass.wav',
        pad: 'pad.wav'
    });
    
    this.scale = 0;
    
    this.rootNote = 0;
    
    this.octave = 0;

    this.chordSample = 0;    
    this.seqSel = 0;
    this.major = [0, 2, 4, 5, 7, 9, 11, 12, 14, 16, 17];
	
    this.minor = [0, 2, 3, 5, 7, 8, 10, 12];
	
    this.sequence = [0, 2, 0, 3, 0, 5, 0, 8];

    this.sequence0 = [0, 2, 0, 3, 0, 5, 0, 8];

    this.sequence1 = [0, 2, 0, 3, 0, 5, 0, 8];

    this.sequence2 = [0, 2, 0, 3, 0, 5, 0, 8];

    this.sequence3 = [0, 2, 0, 3, 0, 5, 0, 8];
	
    this.whichSeqence = 1;
    this.whichSeq1 = 1;
    this.whichSeq2 = 1;
    this.whichSeq3 = 1;
    this.whichSeq4 = 1;	
    this.samplerFX = 0;
    this.bassFX = 0;
    this.waveform = 'sine';
    this.waveform2 = 'sine';
    this.bassWave = 'sine';
    this.noteLength = 1;
    this.bassNoteLength = 1;
    this.detune = 0;
    this.filterType = 'lowpass';
    this.cutoff = 18000;
    this.resonance = 1;
    this.bpm = 120;
	
    this.bars = 2;
	
    this.vol = 0.5;

    this.osc2vol = 1;	
    this.melodyVol = 1;
	
    this.harmonyVol = 1;
	
    this.bassVol = 1;
}
    


Synthesizer.prototype.generateSequence = function(){

	for(var i = 0; i < 8; i++) {

			if(this.scale == 0){
			
		    this.sequence[i] = this.major[Math.round(Math.random() * 7)];
			
		}
			
		else if(this.scale == 1){

					    this.sequence[i] = this.minor[Math.round(Math.random() * 7)];
					
}

		}
	
}





Synthesizer.prototype.play = function(mode)
{

    function createSource(buffer, fx) {
    	
var convolution = (function() {
    		var convolver = context.createConvolver();
    		noiseBuffer = context.createBuffer(2, 0.5 * context.sampleRate, context.sampleRate);
        	left = noiseBuffer.getChannelData(0);
        	right = noiseBuffer.getChannelData(1);
    		for (var i = 0; i < noiseBuffer.length; i++) {
        		left[i] = Math.random() * 2 - 1;
        		right[i] = Math.random() * 2 - 1;
    		}
    		convolver.buffer = noiseBuffer;
    		return convolver;
		})();
		
            var source = context.createBufferSource();
        
            var gainNode = context.createGain();
        
            source.buffer = buffer;
        
            source.connect(gainNode);
        
            if(fx == 1){
            	gainNode.connect(convolution);
            	convolution.connect(context.destination);
            }
            else if(fx == 0){
            gainNode.connect(context.destination);
        
            }
            return {
            
            source: source,
            
            gainNode: gainNode
        
            };
    
            }
   

    function playOscillator(startTime, endTime, frequency, vol, wave, filterType, cutoff, wave2, detune, vol2, res) {
    		oscillator = context.createOscillator();
    		oscillator2 = context.createOscillator();
    		var gainNode = context.createGain();
    		var gainNode2 = context.createGain();
    		var filter = context.createBiquadFilter();
    		filter.type = filterType;
    		filter.frequency.value = cutoff;
    		filter.Q.value = res;
    		gainNode.gain.value = vol;
    		gainNode2.gain.value = vol2;
    		oscillator2.type = wave2;
    		oscillator.type = wave;
    		oscillator.frequency.value = frequency;
    		oscillator2.frequency.value = frequency;
    		oscillator2.detune.value = detune;
    		oscillator2.start(startTime);
    		oscillator.start(startTime);
    		oscillator.stop(endTime);
    		oscillator2.stop(endTime);
    		oscillator.connect(filter);
    		oscillator2.connect(gainNode2);
    		gainNode2.connect(filter);
    		filter.connect(gainNode);
    		gainNode.connect(context.destination);
			}

	function playBass(startTime, endTime, frequency, wave, vol, fx){
		
		var crusher = (function() 
		{
    	var bufferSize = 4096;
    	var node = context.createScriptProcessor(bufferSize, 1, 1);
    	var nobits = 4; // between 1 and 16
    	var normfreq = 0.1; // between 0.0 and 1.0
    	var step = Math.pow(1/2, nobits);
    	var phaser = 0;
    	var last = 0;
    	node.onaudioprocess = function(e) {
        	var input = e.inputBuffer.getChannelData(0);
        	var output = e.outputBuffer.getChannelData(0);
        	for (var i = 0; i < bufferSize; i++) {
            	phaser += normfreq;
            	if (phaser >= 1.0) {
                	phaser -= 1.0;
                	last = step * Math.floor(input[i] / step + 0.5);
            	}
            	output[i] = last;
        	}
    	};
    	return node;
	})();
		
		bassOsc = context.createOscillator();
		var gainNode = context.createGain();
		gainNode.gain.value = vol;
		bassOsc.type = wave;
		bassOsc.frequency.value = frequency;
		bassOsc.start(startTime);
		bassOsc.stop(endTime);
		bassOsc.connect(gainNode);
		
		if(fx == 0){
			gainNode.connect(context.destination);
		}
		else if (fx == 1){
			gainNode.connect(crusher);
			crusher.connect(context.destination);
		}
	}
	
	if (mode==1){ //set length for arranger mode and preview mode
        this.bars = 8; 
    }
    else if (mode==0){
        this.bars = 2;
    }

    var eighthNoteTime = (60 / this.bpm) / 2;
	
    var startTime = context.currentTime;

	
    
    for (var bar = 0; bar < this.bars; bar++) {
		
		if (mode==1){ //play the arrangement in order
           		if(bar<2){
           			this.whichSequence = this.whichSeq1;
           		}
           		if(bar>=2 && bar<4){
           			this.whichSequence = this.whichSeq2;
           		}
           		if(bar>=4 && bar<6){
           			this.whichSequence = this.whichSeq3;
           		}
           		if(bar>=6 && bar<8){
           			this.whichSequence = this.whichSeq4;
           		} 
           		
           		for(var i = 0; i < 8; i++) {

					if(this.whichSequence == 1){
						this.sequence[i] = this.sequence0[i];
					}
					if(this.whichSequence == 2){
						this.sequence[i] = this.sequence1[i];
					}
					if(this.whichSequence == 3){
						this.sequence[i] = this.sequence2[i];
					}
					if(this.whichSequence == 4){
						this.sequence[i] = this.sequence3[i];
					}
				}
           
           }
		
		var time = startTime + bar * 8 * eighthNoteTime;
        //play sequence
	    
         
        for (var i = 0; i < 8; ++i) {
	        
	        //play melody on the eight beat
			playOscillator(time+i*eighthNoteTime,
			(time+i*eighthNoteTime) + (0.5*this.noteLength), 
			261.6 * Math.pow(2, ((this.rootNote + this.octave + this.sequence[i]) / 12)),
			this.melodyVol * this.vol,
			this.waveform,
			this.filterType,
			this.cutoff, 
			this.waveform2,
			this.detune,
			this.osc2vol * this.melodyVol * this.vol,
			this.resonance
			);
			
	        //play chord on first beat of the bar
	        if (i == 0) { 
                if(this.chordSample==0){
                	this.chord = createSource(this.piano, this.samplerFX);
                	this.chord2 = createSource(this.piano, this.samplerFX);
                	this.chord3 = createSource(this.piano, this.samplerFX);
                }
                else if(this.chordSample==1){
                	this.chord = createSource(this.brass, this.samplerFX);
                	this.chord2 = createSource(this.brass, this.samplerFX);
                	this.chord3 = createSource(this.brass, this.samplerFX);
                }
                else if(this.chordSample==2){
                	this.chord = createSource(this.pad, this.samplerFX);
                	this.chord2 = createSource(this.pad, this.samplerFX);
                	this.chord3 = createSource(this.pad, this.samplerFX);
                }
                
                this.chord.gainNode.gain.value = this.vol * this.harmonyVol;
                this.chord2.gainNode.gain.value = this.vol * this.harmonyVol;
                this.chord3.gainNode.gain.value = this.vol * this.harmonyVol;
                this.chord.source.playbackRate.value = Math.pow(2, ((this.rootNote + this.sequence[i]) / 12));
                this.chord3.source.playbackRate.value = Math.pow(2, ((this.rootNote + this.sequence[i] + 7) / 12));
                //major chord
                if ((this.scale == 0 && (this.sequence[i] == 0 || this.sequence[i] == 3 || this.sequence[i] == 4)) || (this.scale == 1 && (this.sequence[i] == 5 || this.sequence[i] == 6))) {
	                this.chord2.source.playbackRate.value = Math.pow(2, ((this.rootNote + this.sequence[i] + 4) / 12));
                }
                //minor chord
                else if ((this.scale == 0 && (this.sequence[i] == 1 || this.sequence[i] == 2 || this.sequence[i] == 5 || this.sequence[i] == 6)) ||(this.scale == 1 && (this.sequence[i] == 0 || this.sequence[i] == 1 || this.sequence[i] == 3 || this.sequence[i] == 4))) {
                    this.chord2.source.playbackRate.value = Math.pow(2, ((this.rootNote + this.sequence[i] + 3) / 12));
                }
                this.chord.source.start(time);
                this.chord2.source.start(time);
                this.chord3.source.start(time);
	        }
	        //play bass on the quarter note
	        if (i == 0 || i == 2 || i == 4 || i == 6) {
	            playBass(
	            (time+i*eighthNoteTime), 
				(time+i*eighthNoteTime) + (0.5* this.bassNoteLength), 
				261.6 * Math.pow(2, ((this.rootNote + -24 + this.sequence[0]) / 12)),
				this.bassWave,
				this.bassVol * this.vol,
				this.bassFX
				);
	        }
	        }
	        }

};

Synthesizer.prototype.setBars = function(element)
{
    
	this.bars = parseInt(element.value);

};


Synthesizer.prototype.setBPM = function (element)
{

    this.bpm = parseInt(element.value);

};


Synthesizer.prototype.setRoot = function (element){
    this.rootNote = parseInt(element.value);
};


Synthesizer.prototype.setChordSample = function (which){
	this.chordSample = which
};
Synthesizer.prototype.setOctave = function (element){
    this.octave = parseInt(element.value);
};


Synthesizer.prototype.setScale = function (which){
    this.scale = which;
};


Synthesizer.prototype.setMelodyVol = function (element) {
    this.melodyVol = parseFloat(element.value);
};


Synthesizer.prototype.setHarmonyVol = function (element) {
    this.harmonyVol = parseFloat(element.value);
};


Synthesizer.prototype.setBassVol = function (element) {
    this.bassVol = parseFloat(element.value);
};


Synthesizer.prototype.setVol = function (element)
{

    this.vol = parseFloat(element.value);

};
Synthesizer.prototype.setNoteLength = function (element){
	this.noteLength = parseFloat(element.value);
};
Synthesizer.prototype.setBassNoteLength = function (element){
	this.bassNoteLength = parseFloat(element.value);
};
Synthesizer.prototype.changeType = function(val){
	this.waveform = val;
};
Synthesizer.prototype.changeType2 = function(val){
	this.waveform2 = val;
};
Synthesizer.prototype.changeType3 = function(val){
	this.bassWave = val;
};
Synthesizer.prototype.setDetune = function(element){
	this.detune = parseInt(element.value);
};


Synthesizer.prototype.setOsc2vol = function (element) {
    this.osc2vol = parseFloat(element.value);
};
Synthesizer.prototype.setFilter = function(val){
	this.filterType = val;
};
Synthesizer.prototype.setCutoff = function (element)
{

    this.cutoff = parseFloat(element.value);

};
Synthesizer.prototype.setQ = function (element)
{

    this.resonance = parseFloat(element.value);

};
Synthesizer.prototype.setFX = function(which){
	this.samplerFX = which;
};
Synthesizer.prototype.setFX2 = function(which){
	this.bassFX = which;
};
Synthesizer.prototype.saveSeq = function (){
	
	for(var i = 0; i < 8; i++) {

		if(this.seqSel == 1){
			this.sequence0[i] = this.sequence[i];
		}
		if(this.seqSel == 2){
			this.sequence1[i] = this.sequence[i];
		}
		if(this.seqSel == 3){
			this.sequence2[i] = this.sequence[i];
		}
		if(this.seqSel == 4){
			this.sequence3[i] = this.sequence[i];
		}
	}
};
Synthesizer.prototype.setSaveSeq = function(element){
	this.seqSel = parseInt(element.value);
};
Synthesizer.prototype.setSeq1 = function(element){
		this.whichSeq1 = parseInt(element.value);
};
Synthesizer.prototype.setSeq2 = function(element){
		this.whichSeq2 = parseInt(element.value);
};
Synthesizer.prototype.setSeq3 = function(element){
		this.whichSeq3 = parseInt(element.value);
};
Synthesizer.prototype.setSeq4 = function(element){
		this.whichSeq4 = parseInt(element.value);
};