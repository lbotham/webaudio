var DrumSample = function() {
  loadSounds(this, {
    padz: 'kick1.wav',
	padx: 'kick2.wav',
	padc: '808.wav',
	padv: 'fx1.wav',		
	pada: 'snr3.wav',
	pads: 'hat1.wav',
	padd: 'snr2.wav',
	padf: 'snr1.wav',	
	padq: 'tamb.wav',
	padw: 'hat3.wav',
	pade: 'hat2.wav',
	padr: 'tom1.wav',
	pad1: 'wood.wav',
	pad2: 'clav.wav',
	pad3: 'cym1.wav',
	pad4: 'vox1.wav'
  });
  
	this.sample = 1;
	this.volume = 1;
	
	this.pitch1 = 0;
	this.vol1 = 0.5;
	this.pitch2 = 0;
	this.vol2 = 0.5;
	this.pitch3 = 0;
	this.vol3 = 0.5;
	this.pitch4 = 0;
	this.vol4 = 0.5;
	
	this.pitch5 = 0;
	this.vol5 = 0.5;
	this.pitch6 = 0;
	this.vol6 = 0.5;
	this.pitch7 = 0;
	this.vol7 = 0.5;
	this.pitch8 = 0;
	this.vol8 = 0.5;
	
	this.pitch9 = 0;
	this.vol9 = 0.5;
	this.pitch10 = 0;
	this.vol10 = 0.5;
	this.pitch11 = 0;
	this.vol11 = 0.5;
	this.pitch12 = 0;
	this.vol12 = 0.5;
	
	this.pitch13 = 0;
	this.vol13 = 0.5;
	this.pitch14 = 0;
	this.vol14 = 0.5;
	this.pitch15 = 0;
	this.vol15 = 0.5;
	this.pitch16 = 0;
	this.vol16 = 0.5;
}

DrumSample.prototype.play = function(pad) {

	function createSource(buffer) {
		var source = context.createBufferSource();
		var gainNode = context.createGain();
    	source.buffer = buffer;
    	// Connect source to gain.
    	source.connect(gainNode);
    	// Connect gain to destination.
    	gainNode.connect(context.destination);
    	
    	return {
      	source: source,
      	gainNode: gainNode
      	};
	}
	
	if(pad==1){
		this.wood = createSource(this.pad1);
		this.wood.gainNode.gain.value = this.vol1;
		this.wood.source.playbackRate.value = 2*Math.pow(2, (this.pitch1/12));
		this.wood.source.start(0);
	}
	if(pad==2){
		this.clav = createSource(this.pad2);
		this.clav.gainNode.gain.value = this.vol2;
		this.clav.source.playbackRate.value = 2*Math.pow(2, (this.pitch2/12));
		this.clav.source.start(0);
	}
	if(pad==3){
		this.cym1 = createSource(this.pad3);
		this.cym1.gainNode.gain.value = this.vol3;
		this.cym1.source.playbackRate.value = 2*Math.pow(2, (this.pitch3/12));
		this.cym1.source.start(0);
	}
	if(pad==4){
		this.vox1 = createSource(this.pad4);
		this.vox1.gainNode.gain.value = this.vol4;
		this.vox1.source.playbackRate.value = 2*Math.pow(2, (this.pitch4/12));
		this.vox1.source.start(0);
	}
	
	if(pad==5){
		this.tamb = createSource(this.padq);
		this.tamb.gainNode.gain.value = this.vol5;
		this.tamb.source.playbackRate.value = 2*Math.pow(2, (this.pitch5/12));
		this.tamb.source.start(0);
	}
	if(pad==6){
		this.hat3 = createSource(this.padw);
		this.hat3.gainNode.gain.value = this.vol6;
		this.hat3.source.playbackRate.value = 2*Math.pow(2, (this.pitch6/12));
		this.hat3.source.start(0);
	}
	if(pad==7){
		this.hat2 = createSource(this.pade);
		this.hat2.gainNode.gain.value = this.vol7;
		this.hat2.source.playbackRate.value = 2*Math.pow(2, (this.pitch7/12));
		this.hat2.source.start(0);
	}
	if(pad==8){
		this.tom1 = createSource(this.padr);
		this.tom1.gainNode.gain.value = this.vol8;
		this.tom1.source.playbackRate.value = 2*Math.pow(2, (this.pitch8/12));
		this.tom1.source.start(0);
	}
	
	if(pad==9){
		this.snr3 = createSource(this.pada);
		this.snr3.gainNode.gain.value = this.vol9;
		this.snr3.source.playbackRate.value = 2*Math.pow(2, (this.pitch9/12));
		this.snr3.source.start(0);
	}
	if(pad==10){
		this.hat1 = createSource(this.pads);
		this.hat1.gainNode.gain.value = this.vol10;
		this.hat1.source.playbackRate.value = 2*Math.pow(2, (this.pitch10/12));
		this.hat1.source.start(0);
	}
	if(pad==11){
		this.snr2 = createSource(this.padd);
		this.snr2.gainNode.gain.value = this.vol11;
		this.snr2.source.playbackRate.value = 2*Math.pow(2, (this.pitch11/12));
		this.snr2.source.start(0);
	}
	if(pad==12){
		this.snr1 = createSource(this.padf);
		this.snr1.gainNode.gain.value = this.vol12;
		this.snr1.source.playbackRate.value = 2*Math.pow(2, (this.pitch12/12));
		this.snr1.source.start(0);
	}
	
	if(pad==13){
		this.kick1 = createSource(this.padz);
		this.kick1.gainNode.gain.value = this.vol13;
		this.kick1.source.playbackRate.value = 2*Math.pow(2, (this.pitch13/12));
		this.kick1.source.start(0);
	}
	if(pad==14){
		this.kick2 = createSource(this.padx);
		this.kick2.gainNode.gain.value = this.vol14;
		this.kick2.source.playbackRate.value = 2*Math.pow(2, (this.pitch14/12));
		this.kick2.source.start(0);
	}
	if(pad==15){
		this.tr808 = createSource(this.padc);
		this.tr808.gainNode.gain.value = this.vol15;
		this.tr808.source.playbackRate.value = 2*Math.pow(2, (this.pitch15/12));
		this.tr808.source.start(0);
	}
	if(pad==16){
		this.fx1 = createSource(this.padv);
		this.fx1.gainNode.gain.value = this.vol16;
		this.fx1.source.playbackRate.value = 2*Math.pow(2, (this.pitch16/12));
		this.fx1.source.start(0);
	}
};

DrumSample.prototype.selectSample = function(element){
	this.sample = parseInt(element.value);
}

DrumSample.prototype.setPitch = function(element){
	if (this.sample == 1){
		this.pitch1 = parseInt(element.value);
	}
	else if (this.sample == 2){
		this.pitch2 = parseInt(element.value);
	}
	else if (this.sample == 3){
		this.pitch3 = parseInt(element.value);
	}
	else if (this.sample == 4){
		this.pitch4 = parseInt(element.value);
	}
	
	else if (this.sample == 5){
		this.pitch5 = parseInt(element.value);
	}
	else if (this.sample == 6){
		this.pitch6 = parseInt(element.value);
	}
	else if (this.sample == 7){
		this.pitch7 = parseInt(element.value);
	}
	else if (this.sample == 8){
		this.pitch8 = parseInt(element.value);
	}
	
	else if (this.sample == 9){
		this.pitch9 = parseInt(element.value);
	}
	else if (this.sample == 10){
		this.pitch10 = parseInt(element.value);
	}
	else if (this.sample == 12){
		this.pitch11 = parseInt(element.value);
	}
	else if (this.sample == 12){
		this.pitch12 = parseInt(element.value);
	}
	
	else if (this.sample == 13){
		this.pitch13 = parseInt(element.value);
	}
	else if (this.sample == 14){
		this.pitch14 = parseInt(element.value);
	}
	else if (this.sample == 15){
		this.pitch15 = parseInt(element.value);
	}
	else if (this.sample == 16){
		this.pitch16 = parseInt(element.value);
	}
}

DrumSample.prototype.setVol = function(element){
	if (this.sample == 1){
		this.vol1 = parseFloat(element.value);
		console.log(this.vol1);
	}
	else if (this.sample == 2){
		this.vol2 = parseFloat(element.value);
	}
	else if (this.sample == 3){
		this.vol3 = parseFloat(element.value);
	}
	else if (this.sample == 4){
		this.vol4 = parseFloat(element.value);
	}
	
	else if (this.sample == 5){
		this.vol5 = parseFloat(element.value);
	}
	else if (this.sample == 6){
		this.vol6 = parseFloat(element.value);
	}
	else if (this.sample == 7){
		this.vol7 = parseFloat(element.value);
	}
	else if (this.sample == 8){
		this.vol8 = parseFloat(element.value);
	}
	
	else if (this.sample == 9){
		this.vol9 = parseFloat(element.value);
	}
	else if (this.sample == 10){
		this.vol10 = parseFloat(element.value);
	}
	else if (this.sample == 12){
		this.vol11 = parseFloat(element.value);
	}
	else if (this.sample == 12){
		this.vol12 = parseFloat(element.value);
	}
	
	else if (this.sample == 13){
		this.vol13 = parseFloat(element.value);
	}
	else if (this.sample == 14){
		this.vol14 = parseFloat(element.value);
	}
	else if (this.sample == 15){
		this.vol15 = parseFloat(element.value);
	}
	else if (this.sample == 16){
		this.vol16 = parseFloat(element.value);
	}
}