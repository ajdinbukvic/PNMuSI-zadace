import { spremiPodatke } from "./helper.js";

export const numerickoDiferenciranjePodaci = (
  brojPodataka,
  podaciX,
  podaciFX,
  formula
) => {
  const izvodi = [];
  let izvod;
  if (formula === "unaprijed") {
    izvod = (i) => {
      if (i === brojPodataka - 1) return "OGRANICENJE";
      return (podaciFX[i + 1] - podaciFX[i]) / (podaciX[i + 1] - podaciX[i]);
    };
  } else if (formula === "unazad") {
    izvod = (i) => {
      if (i === 0) return "OGRANICENJE";
      return (podaciFX[i] - podaciFX[i - 1]) / (podaciX[i] - podaciX[i - 1]);
    };
  } else {
    izvod = (i) => {
      if (i === 0 || i === brojPodataka - 1) return "OGRANICENJE";
      return (
        (podaciFX[i + 1] - podaciFX[i - 1]) / (podaciX[i + 1] - podaciX[i - 1])
      );
    };
  }
  for (let i = 0; i < brojPodataka; i++) {
    izvodi.push(izvod(i));
  }
  spremiPodatke(podaciX, podaciFX, izvodi, "grupaA_diferenciranje_podaci.txt");
};

export const numerickoDiferenciranjeFunkcija = (
  funkcija,
  donjaGranica,
  gornjaGranica,
  brojPodjela,
  formula
) => {
  const h = (gornjaGranica - donjaGranica) / brojPodjela;
  const podaciX = [];
  const podaciFX = [];
  const izvodi = [];
  let izvod;
  if (formula === "unaprijed") {
    izvod = (x) => {
      return (funkcija(x + h) - funkcija(x)) / h;
    };
  } else if (formula === "unazad") {
    izvod = (x) => {
      return (funkcija(x) - funkcija(x - h)) / h;
    };
  } else {
    izvod = (x) => {
      return (funkcija(x + h) - funkcija(x - h)) / (2 * h);
    };
  }
  for (let i = 0; i < brojPodjela; i++) {
    const x = donjaGranica + i * h;
    podaciX.push(x);
    podaciFX.push(funkcija(x));
    izvodi.push(izvod(x));
  }
  spremiPodatke(
    podaciX,
    podaciFX,
    izvodi,
    "grupaA_diferenciranje_funkcija.txt"
  );
};
