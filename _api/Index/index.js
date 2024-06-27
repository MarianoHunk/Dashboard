//import script from './script.js';
globalThis.script = await import('./script.js');

EMIC:ifdef(usedEvent.onInit)
globalThis.script.onInit();
EMIC:endif