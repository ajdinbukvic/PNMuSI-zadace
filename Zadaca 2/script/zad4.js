import { direktnaMetoda } from "./direktnaMetoda.js";
import { laGrangeovaMetoda } from "./laGrangeovaMetoda.js";
import { drugiNewtonov } from "./drugiNewtonov.js";
import { izracunajPocetnuVrijednost } from "./helper.js";

const redPolinoma = document.getElementsByName("izborReda");
const metoda = document.getElementsByName("izborMetode");
const vrijednost = document.getElementById("vrijednost");
const greska = document.getElementById("greska");
const rjesenje = document.getElementById("rjesenje");
const tabela = document.getElementById("tabela");
const rijesiBtn = document.getElementById("rijesi");

const parametri = {
  podaciX: [0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30],
  podaciH: [0, 1, 3, 4, 5, 6, 4, 6, 3, 2, 0],
};

const popuniTabelu = (tabelaPodijeljenihRazlika, podaciX) => {
  if (!tabelaPodijeljenihRazlika) return;
  tabela.innerHTML = "";
  tabela.innerHTML = `<thead>
                        <td>x-i</td>
                        <td>f-i(0)</td>
                        <td>f-i(1)</td>
                        <td>f-i(2)</td>
                        <td>f-i(3)</td>
                        <td>f-i(4)</td>
                      </thead>`;
  for (let i = 0; i < podaciX.length; i++) {
    tabela.innerHTML += `<tr><td>${podaciX[i]}</td></td><td></td><td></td><td></td><td></td><td></td></tr>`;
    tabela.innerHTML += `<tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>`;
  }
  let brojac = 1;
  for (let i = 0; i < tabelaPodijeljenihRazlika.length; i++) {
    const niz = tabelaPodijeljenihRazlika[i];
    for (let j = 0; j < niz.length; j++) {
      tabela.rows[brojac].cells[i + 1].innerHTML = niz[j];
      brojac += 2;
    }
    brojac = i + 2;
  }
};

const rijesi = () => {
  greska.innerHTML = "";
  rjesenje.innerHTML = "";
  tabela.innerHTML = "";
  if (!metoda[0].checked && !metoda[1].checked && !metoda[2].checked) {
    alert("Izaberite jednu od tri ponudjenje metode.");
    return;
  }
  if (
    !redPolinoma[0].checked &&
    !redPolinoma[1].checked &&
    !redPolinoma[2].checked
  ) {
    alert("Izaberite jedan od tri ponudjenja reda polinoma.");
    return;
  }
  const odabraniRed = document.querySelector(
    'input[name="izborReda"]:checked'
  ).id;
  const red = Number.parseInt(odabraniRed.split("-")[1]);
  const pocetnaVrijednost = izracunajPocetnuVrijednost(
    parametri.podaciX,
    Number.parseFloat(vrijednost.value)
  );
  let interpoliranaVrijednost, polinom, tabelaPodijeljenihRazlika;
  try {
    if (metoda[0].checked) {
      [interpoliranaVrijednost, polinom] = direktnaMetoda(
        Number.parseFloat(vrijednost.value),
        Number.parseFloat(pocetnaVrijednost),
        red,
        parametri.podaciX,
        parametri.podaciH
      );
      rjesenje.innerHTML = `INTERPOLIRANA VRIJEDNOST: ${interpoliranaVrijednost} <br> POLINOM: ${polinom}`;
    } else if (metoda[1].checked) {
      interpoliranaVrijednost = laGrangeovaMetoda(
        Number.parseFloat(vrijednost.value),
        Number.parseFloat(pocetnaVrijednost),
        red,
        parametri.podaciX,
        parametri.podaciH
      );
      rjesenje.innerHTML = `INTERPOLIRANA VRIJEDNOST: ${interpoliranaVrijednost}`;
    } else if (metoda[2].checked) {
      [interpoliranaVrijednost, tabelaPodijeljenihRazlika] = drugiNewtonov(
        Number.parseFloat(vrijednost.value),
        Number.parseFloat(pocetnaVrijednost),
        red,
        parametri.podaciX,
        parametri.podaciH
      );
      rjesenje.innerHTML = `INTERPOLIRANA VRIJEDNOST: ${interpoliranaVrijednost}`;
      popuniTabelu(tabelaPodijeljenihRazlika, parametri.podaciX);
    }
  } catch (err) {
    greska.innerHTML = `GREŠKA: ${err.message}`;
  }
};

rijesiBtn.addEventListener("click", rijesi);
