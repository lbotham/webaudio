//load sample
function Sampler(context){
	var ctx = this;
		var loader = new BufferLoader(context, 
		['epiano.wav'], onLoaded);

	function onLoaded(buffers) {
		ctx.buffers = buffers;
	};
	loader.load();
	
	var scale=1;
	var major = [1, 3, 5, 6, 8, 10, 12, 13]
	var minor = [1, 3, 4, 6, 8, 9, 11, 13]
	var bpm = 120;
	var rootNote = 1;
}


//playback sequence
Sampler.prototype.play = function() {
	
	if (scale == 1)
	{
		pitch = minor;
	}
	
	if (scale == 2)
	{
		pitch = minor; 
	}
	for(i=0; i<8; i++) 
	{
	setTimeout(playNote, i*(60000/bpm))
	}
}

function playNote() {
	source = this.makeSource(this.buffers[0]);
  	source.playbackRate.value = 1+1/12*(rootNote+pitch[Math.floor((Math.random()*7)+1)]);
  	source.start(0);
}

//make source
Sampler.prototype.makeSource = function(buffer) {
	var source = context.createBufferSource();
  	var gain = context.createGain();
  	gain.gain.value = 0.2;
  	source.buffer = buffer;
 	source.connect(gain);
 	return source;
}

Sampler.prototype.setRoot = function(element) {
	rootNote = element.value;
}

Sampler.prototype.changeScale = function(element)
{
	scale = element.value;
	
}

Sampler.prototype.setBPM=function(element) {
	bpm = element.value;
}