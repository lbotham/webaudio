var Synthesizer = function () {
    loadSounds(this, {
        piano: 'epiano.wav',
        bass: 'sbass.wav',
    });
    
    this.scale = 0;
    
    this.rootNote = 0;
    
    this.octave = 0;
    
    this.chord = [0, 0, 0];
    
    this.chordSel = [0, 3, 5]
	
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
    this.waveform = 'sine';
    this.noteLength = 1;
    this.detune = 0;
    this.filterType = 'lowpass';
    this.cutoff = 18000;
    this.bpm = 120;
	
    this.bars = 2;
	
    this.vol = 0.5;
	
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

    function createSource(buffer) {

            var source = context.createBufferSource();
        
            var gainNode = context.createGain();
        
            source.buffer = buffer;
        
            source.connect(gainNode);
        
            gainNode.connect(context.destination);
        
            return {
            
            source: source,
            
            gainNode: gainNode
        
            };
    
            }
   
           
           if (mode==1){
           	this.bars = 8; 
           }
           
        console.log(this.bars);
        
        
    function playOscillator(startTime, endTime, frequency, vol, wave, filterType, cutoff) {
    		oscillator = context.createOscillator();
    		var gainNode = context.createGain();
    		var filter = context.createBiquadFilter();
    		filter.type = filterType;
    		filter.frequency.value = cutoff;
    		gainNode.gain.value = vol;
    		oscillator.type = wave;
    		oscillator.frequency.value = frequency;
    		oscillator.start(startTime);
    		oscillator.stop(endTime);
    		oscillator.connect(filter);
    		filter.connect(gainNode);
    		gainNode.connect(context.destination);
			}

    var eighthNoteTime = (60 / this.bpm) / 2;
	
    var startTime = context.currentTime;

	
    
    for (var bar = 0; bar < this.bars; bar++) {
		
		if (mode==1){
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
	    
        
        function createOscillator(){
        	
			return {
			oscillator: oscillator,
			gainNode:gainNode
			};
			}
        
        for (var i = 0; i < 8; ++i) {
	        
			playOscillator(time+i*eighthNoteTime, 
			(time+i*eighthNoteTime) + (0.5*this.noteLength), 
			261.6 * Math.pow(2, ((this.rootNote + this.octave + this.sequence[i]) / 12)),
			this.melodyVol * this.vol,
			this.waveform,
			this.filterType,
			this.cutoff 
			);
			
	        //play chord
	        if (i == 0) {
                this.chord = createSource(this.piano);
                this.chord2 = createSource(this.piano);
                this.chord3 = createSource(this.piano);
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
	        //play bass
	        if (i == 0 || i == 2 || i == 4 || i == 6) {
	            this.harm = createSource(this.bass);
	            
	            this.harm.gainNode.gain.value = this.vol * this.bassVol;
	            
	            this.harm.source.playbackRate.value = Math.pow(2, ((this.rootNote + this.sequence[0]) / 12));
	            
	            this.harm.source.start(time + i * eighthNoteTime);
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


Synthesizer.prototype.setRoot = function (element)
{
    this.rootNote = parseInt(element.value);
};


Synthesizer.prototype.setOctave = function (element)
{
    this.octave = parseInt(element.value);
};


Synthesizer.prototype.setScale = function (which)
{
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
Synthesizer.prototype.changeType = function(val){
	this.waveform = val;
};
Synthesizer.prototype.setFilter = function(val){
	this.filterType = val;
};
Synthesizer.prototype.setCutoff = function (element)
{

    this.cutoff = parseFloat(element.value);

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