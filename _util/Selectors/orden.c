#setFile wwwroot/JS/emic.js
function orden(x, y, z1, z2, z3) {
    // Comparar x e y para determinar qué mensaje imprimir
    if (x > y) {
        return eval(z2); // Evaluar y devolver z2 si x es mayor que y
    }
    else if (x < y) {
        return eval(z3); // Evaluar y devolver z3 si x es menor que y
    }
    else {
        return eval(z1); // Evaluar y devolver z1 si x es igual a y
    }
}
#unSetFile