function replaceTableMQTT(tableId, value) {
  var tName = tableId;
  var column, row;

  // Expresión regular para validar y extraer el nombre de la tabla y el identificador de la celda
  const pattern = /\/upload\/([^\/]+)(\/[a-zA-Z]{0,2}\d+)$/i;
  const match = tableId.match(pattern);
  console.log(match);

  // Si el ID de la tabla coincide con el patrón
  if (match) {
    // Asignar tName al primer grupo capturado por la expresión regular, que corresponde al nombre de la tabla
    tName = match[1];
    console.log(tName);

    // Asignar identifier al segundo grupo capturado por la expresión regular, que corresponde al identificador de la celda
    const identifier = match[2].substring(1);  // Se elimina el primer carácter, que es una barra (/)
    console.log(identifier);

    // Expresión regular para extraer fila y fila del identificador
    const coordinatePattern = /([a-zA-Z]+)(\d+)/i;
    const [, row, columnStr] = coordinatePattern.exec(identifier) || [];
    

 // Mapeo de letras a números para las filas
    const rowMapping = {
      a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h: 7, 
          i: 8, j: 9, k: 10, l: 11, m: 12, n: 13, o: 14, p: 15, q: 16, r: 17, 
          s: 18, t: 19, u: 20, v: 21, w: 22, x: 23, y: 24, z: 25,
          aa: 26, ab: 27, ac: 28, ad: 29, ae: 30, af: 31, ag: 32, ah: 33, ai: 34, aj: 35,
          ak: 36, al: 37, am: 38, an: 39, ao: 40, ap: 41, aq: 42, ar: 43, as: 44, at: 45,
          au: 46, av: 47, aw: 48, ax: 49, ay: 50, az: 51, ba: 52, bb: 53, bc: 54, bd: 55,
          be: 56, bf: 57, bg: 58, bh: 59, bi: 60, bj: 61, bk: 62, bl: 63, bm: 64, bn: 65,
          bo: 66, bp: 67, bq: 68, br: 69, bs: 70, bt: 71, bu: 72, bv: 73, bw: 74, bx: 75,
          by: 76, bz: 77, ca: 78, cb: 79, cc: 80, cd: 81, ce: 82, cf: 83, cg: 84, ch: 85,
          ci: 86, cj: 87, ck: 88, cl: 89, cm: 90, cn: 91, co: 92, cp: 93, cq: 94, cr: 95,
          cs: 96, ct: 97, cu: 98, cv: 99, cw: 100, cx: 101, cy: 102, cz: 103, da: 104, db: 105,
          dc: 106, dd: 107, de: 108, df: 109, dg: 110, dh: 111, di: 112, dj: 113, dk: 114, dl: 115,
          dm: 116, dn: 117, do: 118, dp: 119, dq: 120, dr: 121, ds: 122, dt: 123, du: 124, dv: 125,
          dw: 126, dx: 127, dy: 128, dz: 129, ea: 130, eb: 131, ec: 132, ed: 133, ee: 134, ef: 135,
          eg: 136, eh: 137, ei: 138, ej: 139, ek: 140, el: 141, em: 142, en: 143, eo: 144, ep: 145,
          eq: 146, er: 147, es: 148, et: 149, eu: 150
    };

    // Asignar los números de fila y fila
    const rowNumber = rowMapping[row.toLowerCase()];
    column = parseInt(columnStr, 10);
    row = rowNumber;
  }

  // Intenta obtener el elemento de la tabla por su 'id'
  const table = document.getElementById(tName);

  // Verifica si el elemento con 'id' 'tName' existe
  if (table) {
    // Si la tabla existe, la manipula de acuerdo con los valores de 'value'
    if ('valCelCol' in table) {
      table.valCelCol = `${row},${column},${value}`;
    }
  }
  // Si la tabla no se encontró, puedes agregar un mensaje o una acción aquí
}
