import { provjeriPodatkeZaRedPolinoma, odrediIndexe } from "./helper.js";

export const laGrangeovaMetoda = (
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
  let interpoliranaVrijednost = 0;
  for (let i = 0; i < indexi.length; i++) {
    let l = 1;
    let k = 1;
    const index = indexi[i];
    const x = podaciX[index];
    for (let j = 0; j < indexi.length; j++) {
      const trenutniIndex = indexi[j];
      const trenutniX = podaciX[trenutniIndex];
      if (trenutniX !== x) {
        l *= vrijednost - trenutniX;
        k *= x - trenutniX;
      }
    }
    const rez = l / k;
    const y = podaciFX[index];
    interpoliranaVrijednost += rez * y;
  }
  return interpoliranaVrijednost;
};
