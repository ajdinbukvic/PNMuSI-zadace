import { provjeriRazliku } from "./helper.js";
import { metodaNajmanjihKvadrata } from "./metodaNajmanjihKvadrata.js";

export const mnkEksponencijalnomFunkcijom = (podaciX, podaciFX) => {
  if (!provjeriRazliku(podaciX)) {
    throw new Error(`Razmak između svih X podataka mora biti jednak.`);
  }
  if (podaciFX.includes(0)) {
    throw new Error(`U Y podacima ne smije postojati vrijednost nula.`);
  }
  const podaciFXln = izracunajVrijednostiLn(podaciFX);
  const [_, aproksimiraneVrijednosti, greskeAproksimacije, rjesenja] =
    metodaNajmanjihKvadrata(podaciX, podaciFXln, 1);
  const funkcija = `y = ${Math.pow(Math.E, rjesenja[0])} * ${Math.pow(
    Math.E,
    rjesenja[1]
  )}^x`;
  return [funkcija, aproksimiraneVrijednosti, greskeAproksimacije, podaciFXln];
};

const izracunajVrijednostiLn = (podaciFX) => {
  const podaciLn = [];
  for (let i = 0; i < podaciFX.length; i++) {
    const lnY = Math.log(podaciFX[i]);
    podaciLn.push(lnY.toFixed(4));
  }
  return podaciLn;
};
