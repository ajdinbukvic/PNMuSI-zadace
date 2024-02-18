import { provjeriPodatkeZaBrojIntervala } from "./helper.js";

export const numerickoIntegriranjePodaci = (
  brojPodataka,
  podaciX,
  podaciFX,
  formula,
  brojIntervala
) => {
  let rezultat;
  if (formula === "trapezna") {
    if (!provjeriPodatkeZaBrojIntervala(brojPodataka, brojIntervala)) {
      throw new Error(
        "Nedovoljan broj podataka za broj intervala ili netačan broj intervala (samo 1,2,4)"
      );
    }
    rezultat = trapeznoPraviloPodaci(
      brojPodataka,
      podaciX,
      podaciFX,
      brojIntervala
    );
  } else {
    throw new Error(
      "Za korištenje ove metode koristiti opciju s unosom funkcije"
    );
  }
  return rezultat;
};

export const numerickoIntegriranjeFunkcija = (
  funkcija,
  donjaGranica,
  gornjaGranica,
  brojPodjela,
  formula,
  brojIntervala
) => {
  let rezultat;
  if (formula === "trapezna") {
    if (!provjeriPodatkeZaBrojIntervala(brojPodjela, brojIntervala)) {
      throw new Error(
        "Nedovoljan broj podataka za broj intervala ili netačan broj intervala (samo 1,2,4)"
      );
    }
    rezultat = trapeznoPraviloFunkcija(
      funkcija,
      donjaGranica,
      gornjaGranica,
      brojPodjela,
      brojIntervala
    );
  } else {
    rezultat = gaussovaKvadraturnaFunkcija(
      funkcija,
      donjaGranica,
      gornjaGranica
    );
  }
  return rezultat;
};

const trapeznoPraviloPodaci = (
  brojPodataka,
  podaciX,
  podaciFX,
  brojIntervala
) => {
  const donjaGranica = podaciX.at(0);
  const gornjaGranica = podaciX.at(brojPodataka - 1);
  const h = (gornjaGranica - donjaGranica) / brojIntervala;
  const hPola = h / 2;
  let suma = podaciFX.at(0) + podaciFX.at(brojPodataka - 1);
  if (brojIntervala === 2) suma += 2 * podaciFX.at((brojPodataka - 1) / 2);
  else if (brojIntervala === 4)
    for (let i = 1; i < brojPodataka - 1; i++) suma += 2 * podaciFX[i];
  return suma * hPola;
};

const trapeznoPraviloFunkcija = (
  funkcija,
  donjaGranica,
  gornjaGranica,
  brojPodjela,
  brojIntervala
) => {
  const podaciX = [];
  const podaciFX = [];
  const interval = (gornjaGranica - donjaGranica) / brojPodjela;
  for (let i = 0; i < brojPodjela; i++) {
    const x = donjaGranica + i * interval;
    podaciX.push(x);
    podaciFX.push(funkcija(x));
  }
  const prviClan = podaciX.at(0);
  const zadnjiClan = podaciX.at(brojPodjela - 1);
  const h = (zadnjiClan - prviClan) / brojIntervala;
  const hPola = h / 2;
  let suma = podaciFX.at(0) + podaciFX.at(brojPodjela - 1);
  if (brojIntervala === 2) suma += 2 * podaciFX.at((brojPodjela - 1) / 2);
  else if (brojIntervala === 4)
    for (let i = 1; i < brojPodjela - 1; i++) suma += 2 * podaciFX[i];
  return suma * hPola;
};

const gaussovaKvadraturnaFunkcija = (funkcija, donjaGranica, gornjaGranica) => {
  const t = 1 / Math.sqrt(3);
  const h = (gornjaGranica - donjaGranica) / 2;
  const intervali = [
    [donjaGranica, donjaGranica + h],
    [donjaGranica + h, gornjaGranica],
  ];
  let suma = 0;
  for (let i = 0; i < intervali.length; i++) {
    const m = (intervali[i][1] - intervali[i][0]) / 2;
    const c = (intervali[i][1] + intervali[i][0]) / 2;
    const x1 = m * t * -1 + c;
    const x2 = m * t + c;
    const y1 = funkcija(x1);
    const y2 = funkcija(x2);
    suma += m * (y1 + y2);
  }
  return suma;
};
