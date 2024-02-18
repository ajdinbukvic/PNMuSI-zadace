export const provjeriPodatkeZaRedPolinoma = (redPolinoma, brPodataka) => {
  if (brPodataka > redPolinoma) return true;
  return false;
};

export const izracunajPocetnuVrijednost = (podaciX, vrijednost) => {
  return podaciX.reduce((a, b) => {
    let aDiff = Math.abs(a - vrijednost);
    let bDiff = Math.abs(b - vrijednost);
    if (aDiff === bDiff) {
      return a > b ? a : b;
    } else {
      return bDiff < aDiff ? b : a;
    }
  });
};

export const odrediIndexe = (podaciX, pocetnaVrijednost, redPolinoma) => {
  const indexPocetneVrijednosti = podaciX.indexOf(pocetnaVrijednost);
  const indexi = [];
  let prethodniIndex = indexPocetneVrijednosti - 1;
  let sljedeciIndex = indexPocetneVrijednosti + 1;
  indexi.push(indexPocetneVrijednosti);
  let veci = true;
  while (indexi.length <= redPolinoma) {
    if (veci) {
      if (podaciX[sljedeciIndex] !== undefined) {
        indexi.push(sljedeciIndex);
        sljedeciIndex += 1;
      }
    } else {
      if (podaciX[prethodniIndex] !== undefined) {
        indexi.push(prethodniIndex);
        prethodniIndex -= 1;
      }
    }
    veci = !veci;
  }
  return indexi;
};
