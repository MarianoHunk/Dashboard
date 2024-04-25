EMIC:setOutput(TARGET:wwwroot/JS/emic.js)
function resolventX2(op1, op2, op3) {
    // Convertir los parámetros a valores flotantes
    const a = parseFloat(op1);
    const b = parseFloat(op2);
    const c = parseFloat(op3);
  
    const discriminante = b * b - 4 * a * c;
  
    if (discriminante < 0) {
      return NaN; // La raíz no es un número real
    } else {
      return (-b - Math.sqrt(discriminante)) / (2 * a).toString();
    }
  }

EMIC:restoreOutput