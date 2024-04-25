EMIC:setOutput(TARGET:wwwroot/JS/emic.js)
function arround(op1, op2) {
    const a = parseFloat(op1);
    const b = parseInt(op2);
    const roundedNumber = a.toFixed(b);
    return (roundedNumber).toString();;
  }
EMIC:restoreOutput