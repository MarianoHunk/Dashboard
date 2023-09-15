#setFile wwwroot/JS/emic.js
/* function xSele(...args)
{
	for (i = 1; i < args.length; i+= 2)
	{
		if (args[i] == '*' || args[i] == args[0])
		{
			return eval(args[i + 1]);
		}
	}
} */

function xSele(...args) {
  // Inicializamos una variable para almacenar el resultado
  let result;

  // Iteramos a través de los argumentos empezando desde el segundo (índice 1)
  for (let i = 1; i < args.length; i += 2) {
    // Convertimos args[i] y args[0] a cadenas (strings)
    const arg1 = String(args[i]);
    const arg2 = String(args[0]);

    // Comparamos las cadenas
    if (arg1 === '*' || arg1 === arg2) {
      // Utilizamos eval solo si es necesario, de lo contrario, podríamos simplemente retornar args[i + 1]
      result = eval(args[i + 1]);
      break; // Salimos del bucle una vez que encontramos una coincidencia
    }
  }

  return result; // Retornamos el resultado
}

#unSetFile

