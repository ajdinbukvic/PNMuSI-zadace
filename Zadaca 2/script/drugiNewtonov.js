import { provjeriPodatkeZaRedPolinoma } from "./helper.js";

export const drugiNewtonov = (
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
  const h = Number.parseFloat(Math.abs(podaciX[0] - podaciX[1]).toFixed(2));
  let s = Number.parseFloat(((vrijednost - pocetnaVrijednost) / h).toFixed(2));
  const indexPocetneVrijednosti = podaciX.indexOf(pocetnaVrijednost);
  const tabela = generisiTabeluPodijeljenihRazlika(podaciFX, odabraniRed);
  let interpoliranaVrijednost = podaciFX[indexPocetneVrijednosti];
  for (let i = 1; i <= odabraniRed; i++) {
    if (tabela[i][indexPocetneVrijednosti - i] === undefined) {
      throw new Error(
        `Nedovoljno podataka u tabeli podijeljenih razlika za ${odabraniRed}. red polinoma i traženu vrijednost.`
      );
    }
    interpoliranaVrijednost +=
      (s / faktorijel(i)) * tabela[i][indexPocetneVrijednosti - i];
    s *= s + i;
  }
  return [interpoliranaVrijednost, tabela];
};

const izracunajPodatke = (podaciFX) => {
  const temp = [];
  for (let i = 0; i < podaciFX.length - 1; i++) {
    temp.push(Number.parseFloat((podaciFX[i + 1] - podaciFX[i]).toFixed(6)));
  }
  return temp;
};

const generisiTabeluPodijeljenihRazlika = (podaciFX, redPolinoma) => {
  const tabela = [];
  tabela.push(podaciFX);
  let podaci = izracunajPodatke(podaciFX);
  for (let i = 0; i < redPolinoma; i++) {
    tabela.push(podaci);
    podaci = izracunajPodatke(podaci);
  }
  return tabela;
};

const faktorijel = (broj) => {
  if (broj < 0) {
    return "Broj mora biti pozitivan";
  }
  if (broj == 0 || broj == 1) {
    return 1;
  } else {
    return broj * faktorijel(broj - 1);
  }
};
