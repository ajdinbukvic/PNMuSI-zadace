export const spremiPodatke = (podaciX, podaciFX, izvodi, nazivDatoteke) => {
  let sadrzaj = "";
  for (let i = 0; i < podaciX.length; i++) {
    sadrzaj += `(${i + 1}.) ${podaciX[i]} ${podaciFX[i]} ${izvodi[i]}\n`;
  }
  const blob = new Blob([sadrzaj], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = nazivDatoteke;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const provjeriPodatkeZaBrojIntervala = (brojPodataka, brojIntervala) => {
  if (![1, 2, 4].includes(brojIntervala)) return false;
  if (brojIntervala === 1 && brojPodataka >= 2) return true;
  else if (brojIntervala === 2 && brojPodataka >= 3) return true;
  else if (brojIntervala === 4 && brojPodataka >= 4) return true;
  return false;
};
