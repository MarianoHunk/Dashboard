EMIC:setOutput(TARGET:wwwroot/JS/timer.{name}..js)
//
EMIC:ifdef(usedFunction.timer.{name}..setTimer)
export function setTimer(timeInMs,reload){

	var myTime
	if (timeInMs == 0){
		clearTimeout(myTime);
	}
	else{
		EMIC:ifdef(usedEvent.etOut.{name}.)
		if (reload == 'T')
			myTime = window.setTimeout(globalThis.script.etOut.{name}., timeInMs);
		if (reload == 'A')
			myTime = window.setInterval(globalThis.script.etOut.{name}., timeInMs);
		EMIC:endif
	}
	

}
EMIC:endif


EMIC:restoreOutput