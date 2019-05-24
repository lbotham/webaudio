var RhythmComputer = function() {
  loadSounds(this, {
    kick: 'kick808.wav',
    snare: 'snare808.wav',
    hihat: 'hihat808.wav',
  });
  this.bpm = 120;
  this.bars = 8;
  this.kPattern = 0;
  this.sPattern = 0;
  this.hPattern = 0;
};

RhythmComputer.prototype.play = function(mode) {
  var startTime = context.currentTime;
  var tempo = this.bpm; // BPM
  var eighthNoteTime = (60 / this.bpm) / 2;
  var sixteenthNoteTime = (60 / this.bpm) / 4;
  var tripletNoteTime = (60 / this.bpm) / 3;
  
  if (mode==1){
  	this.bars = 8; 
  }
  else if (mode==0){
  	this.bars = 2;
  }
  
  for (var bar = 0; bar < this.bars; bar++) {
    var time = startTime + bar * 8 * eighthNoteTime;
    
    	//kick
    	if(this.kPattern==0){
    	playSound(this.kick, time);
    	playSound(this.kick, time + 4 * eighthNoteTime);
    	}
    	else if(this.kPattern==1){
    	playSound(this.kick, time);
    	playSound(this.kick, time + 3 * eighthNoteTime);
    	playSound(this.kick, time + 5 * eighthNoteTime);
    	}
    	else if(this.kPattern==2){
    	playSound(this.kick, time + 4 * eighthNoteTime);
    	playSound(this.kick, time + 5 * eighthNoteTime);
    	}
    	else if(this.kPattern==3){
    	playSound(this.kick, time);
    	playSound(this.kick, time + 4 * eighthNoteTime);
    	playSound(this.kick, time + 9 * sixteenthNoteTime);
    	playSound(this.kick, time + 11 * sixteenthNoteTime);
    	}
    	else if(this.kPattern==4){
    	playSound(this.kick, time);
    	playSound(this.kick, time + 1 * sixteenthNoteTime);
    	playSound(this.kick, time + 3 * eighthNoteTime);
    	playSound(this.kick, time + 4 * eighthNoteTime);
    	playSound(this.kick, time + 13 * sixteenthNoteTime);
    	playSound(this.kick, time + 14 * sixteenthNoteTime);
    	}
    	else if(this.kPattern==5){
    	playSound(this.kick, time);
    	playSound(this.kick, time + 1 * sixteenthNoteTime);
    	playSound(this.kick, time + 3 * sixteenthNoteTime);
    	playSound(this.kick, time + 4 * eighthNoteTime);
    	playSound(this.kick, time + 5 * eighthNoteTime);
    	playSound(this.kick, time + 11 * sixteenthNoteTime);
    	}
    	
		//snare
		if(this.sPattern==0){
    	playSound(this.snare, time + 2 * eighthNoteTime);
    	playSound(this.snare, time + 6 * eighthNoteTime);
    	}
    	else if(this.sPattern==1){
    	playSound(this.snare, time + 1 * eighthNoteTime);
    	playSound(this.snare, time + 3 * eighthNoteTime);
    	playSound(this.snare, time + 5 * eighthNoteTime);
    	playSound(this.snare, time + 6 * eighthNoteTime);
    	}
    	else if(this.sPattern==2){
    	playSound(this.snare, time + 2 * eighthNoteTime);
    	playSound(this.snare, time + 3 * eighthNoteTime);
    	playSound(this.snare, time + 4 * eighthNoteTime);
    	playSound(this.snare, time + 6 * eighthNoteTime);
    	playSound(this.snare, time + 7 * eighthNoteTime);
    	}
    	else if(this.sPattern==3){
    	playSound(this.snare, time + 2 * eighthNoteTime);
    	playSound(this.snare, time + 5 * sixteenthNoteTime);
    	playSound(this.snare, time + 7 * sixteenthNoteTime);
    	playSound(this.snare, time + 9 * sixteenthNoteTime);
    	playSound(this.snare, time + 6 * eighthNoteTime);
    	playSound(this.snare, time + 7 * eighthNoteTime);
    	playSound(this.snare, time + 15 * sixteenthNoteTime);
    	}
    	else if(this.sPattern==4){
    	playSound(this.snare, time + 3 * sixteenthNoteTime);
    	playSound(this.snare, time + 5 * sixteenthNoteTime);
    	playSound(this.snare, time + 6 * eighthNoteTime);
    	}
    	else if(this.sPattern==5){
    	playSound(this.snare, time + 3 * tripletNoteTime);
    	playSound(this.snare, time + 4 * tripletNoteTime);
    	playSound(this.snare, time + 5 * tripletNoteTime);
    	playSound(this.snare, time + 9 * tripletNoteTime);
    	playSound(this.snare, time + 10 * tripletNoteTime);
    	playSound(this.snare, time + 11 * tripletNoteTime);
    	}
    	
		//hihat
    	if(this.hPattern==0){
    		for (var i = 0; i < 8; ++i) {
      		playSound(this.hihat, time + i * eighthNoteTime);
    		}
    	}
    	else if(this.hPattern==1){
    	playSound(this.hihat, time + 1 * eighthNoteTime);
		playSound(this.hihat, time + 3 * eighthNoteTime);
		playSound(this.hihat, time + 5 * eighthNoteTime);
		playSound(this.hihat, time + 7 * eighthNoteTime);
    	}
    	else if(this.hPattern==2){
    	playSound(this.hihat, time + 1 * eighthNoteTime);
		playSound(this.hihat, time + 2 * eighthNoteTime);
		playSound(this.hihat, time + 3 * eighthNoteTime);
		playSound(this.hihat, time + 4 * eighthNoteTime);
		playSound(this.hihat, time + 7 * eighthNoteTime);
    	}
    	else if(this.hPattern==3){
    		for (var i = 0; i < 12; ++i) {
      		playSound(this.hihat, time + i * tripletNoteTime);
    		}
    	}
    	else if(this.hPattern==4){
    		for (var i = 0; i < 16; ++i) {
      		playSound(this.hihat, time + i * sixteenthNoteTime);
    		}
    	}
    	else if(this.hPattern==5){
    	playSound(this.hihat, time);
    	playSound(this.hihat, time + 2 * sixteenthNoteTime);
    	playSound(this.hihat, time + 3 * sixteenthNoteTime);
    	playSound(this.hihat, time + 6 * sixteenthNoteTime);
    	playSound(this.hihat, time + 8 * sixteenthNoteTime);
    	playSound(this.hihat, time + 9 * sixteenthNoteTime);
		playSound(this.hihat, time + 11 * sixteenthNoteTime);
		playSound(this.hihat, time + 14 * sixteenthNoteTime);
		playSound(this.hihat, time + 15 * sixteenthNoteTime);
    	}
  }
};

RhythmComputer.prototype.setBPM = function(element) {
		this.bpm =  parseInt(element.value);
};

RhythmComputer.prototype.kickPattern = function(which) {
		this.kPattern = which;
};

RhythmComputer.prototype.snarePattern = function(which) {
		this.sPattern = which;
};

RhythmComputer.prototype.hihatPattern = function(which) {
		this.hPattern = which;
};