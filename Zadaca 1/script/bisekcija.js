export const bisekcija = (
  funkcija,
  donjaGranica,
  gornjaGranica,
  tacnost,
  maxIteracija
) => {
  if (donjaGranica > gornjaGranica)
    throw new Error("Donja granica intervala mora biti manja od gornje.");
  const y1 = funkcija(donjaGranica);
  if (y1 === 0) return [y1, null];
  const y2 = funkcija(gornjaGranica);
  if (y2 === 0) return [y2, null];
  if (y1 * y2 > 0) {
    throw new Error(
      "Promjene granice intervala moraju imati razlicit predznak."
    );
  }
  let razlika = Math.abs(donjaGranica - gornjaGranica);
  let trenutnaIteracija = 0;
  let rezultat, srVrijednost;
  let podaci = [];
  while (razlika > tacnost) {
    if (trenutnaIteracija === maxIteracija) {
      throw new Error("Dostignut je maksimalni broj dozvoljenih iteracija.");
    }
    srVrijednost = (donjaGranica + gornjaGranica) / 2;
    rezultat = funkcija(srVrijednost);
    trenutnaIteracija++;
    podaci.push(
      new Tabela(
        trenutnaIteracija,
        donjaGranica,
        gornjaGranica,
        srVrijednost,
        rezultat,
        razlika
      )
    );
    if (rezultat === 0) return [srVrijednost, podaci];
    else if (funkcija(donjaGranica) * rezultat < 0)
      gornjaGranica = srVrijednost;
    else if (funkcija(gornjaGranica) * rezultat < 0)
      donjaGranica = srVrijednost;
    razlika = Math.abs(donjaGranica - gornjaGranica);
  }
  podaci = [
    ...podaci,
    new Tabela(
      ++trenutnaIteracija,
      donjaGranica,
      gornjaGranica,
      srVrijednost,
      rezultat,
      razlika
    ),
  ];
  return [srVrijednost, podaci];
};

class Tabela {
  constructor(
    brIteracije,
    donjaGranica,
    gornjaGranica,
    srVrijednost,
    rezultat,
    razlika
  ) {
    (this.brIteracije = brIteracije),
      (this.donjaGranica = donjaGranica),
      (this.gornjaGranica = gornjaGranica);
    this.srVrijednost = srVrijednost;
    this.rezultat = rezultat;
    this.razlika = razlika;
  }
}
