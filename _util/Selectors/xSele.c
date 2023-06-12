#setFile wwwroot/JS/emic.js
function xSele(...args)
{
	for (i = 1; i < args.length; i+= 2)
	{
		if (args[i] == '*' || args[i] == args[0])
		{
			return eval(args[i + 1]);
		}
	}
}
#unSetFile

