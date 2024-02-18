import { direktnaMetoda } from "./direktnaMetoda.js";
import { laGrangeovaMetoda } from "./laGrangeovaMetoda.js";
import { drugiNewtonov } from "./drugiNewtonov.js";
import { izracunajPocetnuVrijednost } from "./helper.js";

const stranica = location.pathname
  .split("/")
  .filter((c) => c.length)
  .pop();

const automatskoPopunjavanje = document.getElementById(
  "automatskoPopunjavanje"
);
const brojPodataka = document.getElementById("brojPodataka");
const redPolinoma = document.getElementById("redPolinoma");
const vrijednost = document.getElementById("vrijednost");
const greska = document.getElementById("greska");
const rjesenje = document.getElementById("rjesenje");
const tabela = document.getElementById("tabela");
const tabelaPodaci = document.getElementById("tabelaPodaci");
const rijesiBtn = document.getElementById("rijesi");
let pocetnaVrijednost = 0;

const parametri = {
  prvi: {
    brojPodataka: 4,
    vrijednost: 3.44,
    pocetnaVrijednost: 3.4,
    redPolinoma: 3,
    podaci: [
      [3.35, 3.4, 3.5, 3.6],
      [0.298507, 0.294118, 0.285714, 0.277778],
    ],
  },
  drugi: {
    brojPodataka: 4,
    vrijednost: 3.44,
    pocetnaVrijednost: 3.4,
    redPolinoma: 2,
    podaci: [
      [3.35, 3.4, 3.5, 3.6],
      [0.298507, 0.294118, 0.285714, 0.277778],
    ],
  },
  treci: {
    brojPodataka: 9,
    vrijednost: 3.44,
    pocetnaVrijednost: 3.5,
    redPolinoma: 4,
    podaci: [
      [3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9],
      [
        0.322581, 0.3125, 0.30303, 0.294118, 0.285714, 0.277778, 0.27027,
        0.263158, 0.25641,
      ],
    ],
  },
};

const popuniParametre = () => {
  let zadatak = "";
  if (stranica === "zadatak1.html") zadatak = "prvi";
  else if (stranica === "zadatak2.html") zadatak = "drugi";
  else if (stranica === "zadatak3.html") zadatak = "treci";
  brojPodataka.value = parametri[zadatak].brojPodataka;
  vrijednost.value = parametri[zadatak].vrijednost;
  redPolinoma.value = parametri[zadatak].redPolinoma;
  pocetnaVrijednost = parametri[zadatak].pocetnaVrijednost;
  generisiTabelu(null, parametri[zadatak].brojPodataka);
  for (let i = 0; i < brojPodataka.value; i++) {
    document.getElementById(`x-${i}`).value = Number.parseFloat(
      parametri[zadatak].podaci[0][i]
    );
    document.getElementById(`fx-${i}`).value = Number.parseFloat(
      parametri[zadatak].podaci[1][i]
    );
  }
};

const obrisiParametre = () => {
  for (let i = 0; i < brojPodataka.value; i++) {
    document.getElementById(`x-${i}`).value = "";
    document.getElementById(`fx-${i}`).value = "";
  }
  brojPodataka.value = "";
  vrijednost.value = "";
  redPolinoma.value = "";
  tabelaPodaci.innerHTML = "";
  pocetnaVrijednost = 0;
};

const promijeniParametre = (e) => {
  if (e.currentTarget.checked) popuniParametre();
  else obrisiParametre();
};

automatskoPopunjavanje.addEventListener("change", promijeniParametre);

const generisiTabelu = (e, br) => {
  let brPodataka;
  if (!e) brPodataka = br;
  else brPodataka = e.target.value;
  tabelaPodaci.innerHTML = "";
  for (let i = 0; i < brPodataka; i++) {
    tabelaPodaci.innerHTML += `
      <div class="input-group mb-3 mt-3">
        <input
          type="number"
          class="form-control"
          placeholder=""
          aria-label=""
          aria-describedby="basic-addon1"
          value=""
          id="x-${i}"
        />
        <input
          type="number"
          class="form-control"
          placeholder=""
          aria-label=""
          aria-describedby="basic-addon1"
          value=""
          id="fx-${i}"
        />
    </div>`;
  }
};

brojPodataka.addEventListener("input", generisiTabelu);

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
  if (Number.parseInt(redPolinoma.value) <= 0) {
    alert("Red polinoma ne moze biti manji ili jednak nuli.");
    return;
  }
  if (
    !vrijednost.value ||
    !brojPodataka.value ||
    Number.parseInt(brojPodataka.value) <= 0
  ) {
    alert("Molimo popunite sve potrebne podatke u validnom formatu.");
    return;
  }
  const podaciX = [];
  const podaciFX = [];
  for (let i = 0; i < brojPodataka.value; i++) {
    if (
      !document.getElementById(`x-${i}`).value ||
      !document.getElementById(`fx-${i}`).value
    ) {
      alert("Molimo popunite sve parove vrijednosti x i f(x).");
      return;
    }
    podaciX.push(Number.parseFloat(document.getElementById(`x-${i}`).value));
    podaciFX.push(Number.parseFloat(document.getElementById(`fx-${i}`).value));
  }
  if (!pocetnaVrijednost)
    pocetnaVrijednost = izracunajPocetnuVrijednost(
      podaciX,
      Number.parseFloat(vrijednost.value)
    );
  let interpoliranaVrijednost, polinom, tabelaPodijeljenihRazlika;
  try {
    if (stranica === "zadatak1.html") {
      [interpoliranaVrijednost, polinom] = direktnaMetoda(
        Number.parseFloat(vrijednost.value),
        Number.parseFloat(pocetnaVrijednost),
        Number.parseInt(redPolinoma.value),
        podaciX,
        podaciFX
      );
      rjesenje.innerHTML = `INTERPOLIRANA VRIJEDNOST: ${interpoliranaVrijednost} <br> POLINOM: ${polinom}`;
    } else if (stranica === "zadatak2.html") {
      interpoliranaVrijednost = laGrangeovaMetoda(
        Number.parseFloat(vrijednost.value),
        Number.parseFloat(pocetnaVrijednost),
        Number.parseInt(redPolinoma.value),
        podaciX,
        podaciFX
      );
      rjesenje.innerHTML = `INTERPOLIRANA VRIJEDNOST: ${interpoliranaVrijednost}`;
    } else if (stranica === "zadatak3.html") {
      [interpoliranaVrijednost, tabelaPodijeljenihRazlika] = drugiNewtonov(
        Number.parseFloat(vrijednost.value),
        Number.parseFloat(pocetnaVrijednost),
        Number.parseInt(redPolinoma.value),
        podaciX,
        podaciFX
      );
      rjesenje.innerHTML = `INTERPOLIRANA VRIJEDNOST: ${interpoliranaVrijednost}`;
      popuniTabelu(tabelaPodijeljenihRazlika, podaciX);
    }
  } catch (err) {
    greska.innerHTML = `GREŠKA: ${err.message}`;
  } finally {
    if (!automatskoPopunjavanje.checked) pocetnaVrijednost = 0;
  }
};

rijesiBtn.addEventListener("click", rijesi);
