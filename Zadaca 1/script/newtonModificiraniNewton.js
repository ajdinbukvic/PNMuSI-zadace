export const newton = (funkcija, aproksimacija, tacnost, maxIteracija) => {
  if (!aproksimacija) return [0, null];
  let x = aproksimacija;
  let y = funkcija(x);
  let yIzvod = prviIzvod(funkcija)(x);
  let trenutnaIteracija = 0;
  let prethodniX = 0;
  let razlika = Math.abs(x - prethodniX);
  let podaci = [];
  while (razlika > tacnost) {
    if (trenutnaIteracija === maxIteracija) {
      throw new Error("Dostignut je maksimalni broj dozvoljenih iteracija.");
    }
    trenutnaIteracija++;
    podaci.push(new Tabela(trenutnaIteracija, x, y, yIzvod, razlika));
    prethodniX = x;
    x -= y / yIzvod;
    y = funkcija(x);
    yIzvod = prviIzvod(funkcija)(x);
    razlika = Math.abs(x - prethodniX);
  }
  podaci = [...podaci, new Tabela(++trenutnaIteracija, x, y, yIzvod, razlika)];
  return [x, podaci];
};

export const modificiraniNewton = (
  funkcija,
  donjaGranica,
  gornjaGranica,
  tacnost,
  maxIteracija
) => {
  if (donjaGranica > gornjaGranica)
    [donjaGranica, gornjaGranica] = [gornjaGranica, donjaGranica];
  let x,
    y,
    yIzvod,
    trenutnaIteracija,
    prethodniX,
    razlika,
    podaci = [];
  for (let i = donjaGranica; i <= gornjaGranica; i++) {
    x = i;
    yIzvod = prviIzvod(funkcija)(x);
    trenutnaIteracija = 0;
    prethodniX = 0;
    razlika = Math.abs(x - prethodniX);
    podaci = [];
    while (razlika > tacnost) {
      if (trenutnaIteracija === maxIteracija) {
        throw new Error("Dostignut je maksimalni broj dozvoljenih iteracija.");
      }
      trenutnaIteracija++;
      console.log("prvi:" + x);
      podaci.push(new Tabela(trenutnaIteracija, x, y, yIzvod, razlika));
      console.log("drugi:" + x);
      y = funkcija(x);
      if (y === 0) return [x, podaci];
      prethodniX = x;
      x -= y / yIzvod;
      yIzvod = prviIzvod(funkcija)(x);
      razlika = Math.abs(x - prethodniX);
    }
  }
  podaci = [...podaci, new Tabela(++trenutnaIteracija, x, y, yIzvod, razlika)];
  return [x, podaci];
};

const prviIzvod =
  (funkcija, h = 1e-8) =>
  (x) =>
    (funkcija(x + h) - funkcija(x)) / h;

class Tabela {
  constructor(brIteracije, aproksimacija, rezultat, prviIzvod, razlika) {
    this.brIteracije = brIteracije;
    this.aproksimacija = aproksimacija;
    this.rezultat = rezultat;
    this.prviIzvod = prviIzvod;
    this.razlika = razlika;
  }
}
