export const provjeriPodatkeZaRedPolinoma = (redPolinoma, brPodataka) => {
  if (brPodataka > redPolinoma) return true;
  return false;
};

export const provjeriRazliku = (podaciX) => {
  const razlika = Math.abs(podaciX[0] - podaciX[1]).toFixed(3);
  for (let i = 1; i < podaciX.length - 1; i++) {
    if (Math.abs(podaciX[i] - podaciX[i + 1]).toFixed(3) !== razlika)
      return false;
  }
  return true;
};

export const generisiTabeluGresaka = (
  tabela,
  podaciX,
  podaciFX,
  aproksimiraneVrijednosti,
  greskeAproksimacije
) => {
  tabela.innerHTML = "";
  tabela.innerHTML = `<thead>
                        <td>X</td>
                        <td>Y</td>
                        <td>Y aproksimirano</td>
                        <td>Greška %</td>
                      </thead>`;
  for (let i = 0; i < podaciX.length; i++) {
    tabela.innerHTML += `
      <tr>
        <td>${podaciX[i]}</td>
        <td>${podaciFX[i]}</td>
        <td>${aproksimiraneVrijednosti[i]}</td>
        <td>${greskeAproksimacije[i]}</td>
      </tr>`;
  }
};
