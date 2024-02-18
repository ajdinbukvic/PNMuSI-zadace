import { provjeriPodatkeZaRedPolinoma, provjeriRazliku } from "./helper.js";
import { eqcalc } from "../node_modules/jsequation-solver/eq-calc.js";

export const metodaNajmanjihKvadrata = (podaciX, podaciFX, redPolinoma) => {
  if (!provjeriPodatkeZaRedPolinoma(redPolinoma, podaciX.length)) {
    throw new Error(
      `Nedovoljan broj podataka za ${redPolinoma}. red polinoma.`
    );
  }
  if (!provjeriRazliku(podaciX)) {
    throw new Error(`Razmak između svih X podataka mora biti jednak.`);
  }
  const brJednacina = redPolinoma + 1;
  const matrica = generisiMatricu(brJednacina, podaciX, podaciFX);
  const matricaStr = JSON.stringify(matrica);
  const rjesenja = eqcalc(matricaStr).reverse();
  const polinom = ispisKoeficijenata(rjesenja);
  const [aproksimiraneVrijednosti, greskeAproksimacije] =
    izracunajAproksimiraneVrijednosti(podaciX, podaciFX, rjesenja);
  return [polinom, aproksimiraneVrijednosti, greskeAproksimacije, rjesenja];
};

const generisiMatricu = (brJednacina, podaciX, podaciFX) => {
  const matrix = [];
  for (let i = 0; i < brJednacina; i++) {
    const kolona = [];
    for (let j = 0; j < brJednacina; j++) {
      if (i === 0 && j === 0) kolona.push(podaciX.length);
      else kolona.push(saberiStepenuj(podaciX, j + i));
    }
    if (i === 0) kolona.push(saberiStepenuj(podaciFX, i + 1));
    else kolona.push(saberiStepenuj(podaciX, i, podaciFX));
    matrix.push(kolona);
  }
  const obj = {
    size: brJednacina,
    matrix,
  };
  return obj;
};

const saberiStepenuj = (podaci, stepen, podaciFX = null) => {
  return podaci.reduce((acc, curr, index) => {
    const stepenovaniElement = Math.pow(curr, stepen);
    let rezultat;
    if (podaciFX) rezultat = stepenovaniElement * podaciFX[index];
    else rezultat = stepenovaniElement;
    return acc + rezultat;
  }, 0);
};

const ispisKoeficijenata = (rjesenja) => {
  let polinom = `Cp = ${rjesenja[0]}`;
  for (let i = 1; i < rjesenja.length; i++) {
    polinom += ` ${rjesenja[i] > 0 ? "+" : "-"} ${Math.abs(rjesenja[i])}T^${i}`;
  }
  return polinom;
};

const izracunajAproksimiraneVrijednosti = (podaciX, podaciFX, rjesenja) => {
  const aproksimiraneVrijednosti = [];
  const greskeAproksimacije = [];
  for (let i = 0; i < podaciX.length; i++) {
    let aproksimiranaVrijednost = 0;
    for (let j = 0; j < rjesenja.length; j++) {
      if (j === 0) aproksimiranaVrijednost += rjesenja[j];
      else aproksimiranaVrijednost += Math.pow(rjesenja[j], j) * podaciX[i];
    }
    const y = podaciFX[i];
    const greskaAproksimacije = ((aproksimiranaVrijednost - y) * 100).toFixed(
      3
    );
    aproksimiraneVrijednosti.push(aproksimiranaVrijednost);
    greskeAproksimacije.push(greskaAproksimacije);
  }
  return [aproksimiraneVrijednosti, greskeAproksimacije];
};
