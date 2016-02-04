

State.modify('audioTrack', (state = false) => {
	let audio;
  	switch(Action.type()) {
	    case 'AUDIO_TRACK_SELECTED':
	    	let audio = Action.audio;
	    	if (audio && audio.parent === Action.track.id) {
	    		if (audio.ended || audio.paused) {
	    			audio.play();
	    		} else {
	    			audio.pause();
	    		}
	    	} else if (audio && audio.parent !== Action.track.id) {
	    		audio.pause();
	    		audio = new Audio(Action.track.preview_url);
	    		audio.play();
	    	} 
	    	else {
		    	audio = new Audio(Action.track.preview_url);
	    		audio.parent = Action.track.id;
	    		audio.play();
	    	}
	      	return audio;
	      	break;
	    case 'AUDIO_TRACK_PAUSED':
	    	Action.data.pause();
	      	return Action.data;
	      	break;
	    case 'AUDIO_TRACK_STOPPED':
	      	return false;
	      	break; 
  	}
});


State.modify('playState', (state= false) => {
	switch(Action.type()) {
		case 'PLAY_STATE_CHANGED':
			let audio = Action.audio;
			if (audio.ended || audio.paused) {
				return {id: audio.parent, playing: false};
			}
			else {
				return {id: audio.parent, playing: true};
			}
			break;
	}
});