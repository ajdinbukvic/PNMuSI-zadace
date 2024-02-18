import { provjeriPodatkeZaRedPolinoma, odrediIndexe } from "./helper.js";
import { eqcalc } from "../node_modules/jsequation-solver/eq-calc.js";

export const direktnaMetoda = (
  vrijednost,
  pocetnaVrijednost,
  odabraniRed,
  podaciX,
  podaciFX
) => {
  if (!provjeriPodatkeZaRedPolinoma(odabraniRed, podaciX.length)) {
    throw new Error(
      `Nedovoljan broj podataka za ${odabraniRed}. red polinoma.`
    );
  }
  const indexi = odrediIndexe(podaciX, pocetnaVrijednost, odabraniRed);
  const matrica = generisiMatricu(indexi, podaciX, podaciFX);
  const matricaStr = JSON.stringify(matrica);
  const rjesenja = eqcalc(matricaStr).reverse();
  const [interpoliranaVrijednost, polinom] = izracunajInterpoliranuVrijednost(
    vrijednost,
    rjesenja
  );
  return [interpoliranaVrijednost, polinom];
};

const generisiMatricu = (indexi, podaciX, podaciFX) => {
  const x0 = 1;
  const matrix = [];
  for (let i = 0; i < indexi.length; i++) {
    const index = indexi[i];
    const x = podaciX[index];
    const y = podaciFX[index];
    const kolona = [];
    kolona.push(x0);
    for (let j = 1; j < indexi.length; j++) {
      kolona.push(Math.pow(x, j));
    }
    kolona.push(y);
    matrix.push(kolona);
  }
  const obj = {
    size: indexi.length,
    matrix,
  };
  return obj;
};

const izracunajInterpoliranuVrijednost = (vrijednost, rjesenja) => {
  let rezultat = rjesenja[0];
  let polinom = `P(x${rjesenja.length - 1}) = ${rjesenja[0]}`;
  for (let i = 1; i < rjesenja.length; i++) {
    rezultat += rjesenja[i] * Math.pow(vrijednost, i);
    polinom += ` ${rjesenja[i] > 0 ? "+" : "-"} ${Math.abs(rjesenja[i])}x^${i}`;
  }
  return [rezultat, polinom];
};
