import { metodaNajmanjihKvadrata } from "./metodaNajmanjihKvadrata.js";
import { mnkEksponencijalnomFunkcijom } from "./mnkEksponencijalnomFunkcijom.js";
import { generisiTabeluGresaka } from "./helper.js";

const stranica = location.pathname
  .split("/")
  .filter((c) => c.length)
  .pop();

const automatskoPopunjavanje = document.getElementById(
  "automatskoPopunjavanje"
);
const brojPodataka = document.getElementById("brojPodataka");
const redPolinoma = document.getElementById("redPolinoma");
const greska = document.getElementById("greska");
const rjesenje = document.getElementById("rjesenje");
const tabela = document.getElementById("tabela");
const tabelaPodaci = document.getElementById("tabelaPodaci");
const rijesiBtn = document.getElementById("rijesi");

const parametri = {
  prvi: {
    brojPodataka: 8,
    redPolinoma: 1,
    podaci: [
      [300, 400, 500, 600, 700, 800, 900, 1000],
      [1.0045, 1.0134, 1.0296, 1.0507, 1.0743, 1.0984, 1.1212, 1.141],
    ],
  },
  drugi: {
    brojPodataka: 5,
    podaci: [
      [0, 1, 2, 3, 4],
      [3, 6, 12, 24, 48],
    ],
  },
};

const popuniParametre = () => {
  let zadatak = "";
  if (stranica === "zadatak1.html") zadatak = "prvi";
  else if (stranica === "zadatak2.html") zadatak = "drugi";
  brojPodataka.value = parametri[zadatak].brojPodataka;
  if (redPolinoma) redPolinoma.value = parametri[zadatak].redPolinoma;
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
  if (redPolinoma) redPolinoma.value = "";
  brojPodataka.value = "";
  tabelaPodaci.innerHTML = "";
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

const rijesi = () => {
  greska.innerHTML = "";
  rjesenje.innerHTML = "";
  tabela.innerHTML = "";
  if (
    Number.parseInt(redPolinoma?.value) <= 0 ||
    Number.parseInt(redPolinoma?.value) > 3
  ) {
    alert("Red polinoma ne moze biti manji ili jednak nuli niti veći od tri.");
    return;
  }
  if (!brojPodataka.value || Number.parseInt(brojPodataka.value) <= 0) {
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
  let koeficijenti, aproksimiraneVrijednosti, greskeAproksimacije, podaciFXln;
  try {
    if (stranica === "zadatak1.html") {
      [koeficijenti, aproksimiraneVrijednosti, greskeAproksimacije] =
        metodaNajmanjihKvadrata(
          podaciX,
          podaciFX,
          Number.parseInt(redPolinoma.value)
        );
      rjesenje.innerHTML = `KOEFICIJENTI POLINOMA: ${koeficijenti}`;
    } else if (stranica === "zadatak2.html") {
      [
        koeficijenti,
        aproksimiraneVrijednosti,
        greskeAproksimacije,
        podaciFXln,
      ] = mnkEksponencijalnomFunkcijom(podaciX, podaciFX);
      rjesenje.innerHTML = `APROKSIMIRANA FUNKCIJA: ${koeficijenti}`;
    }
    generisiTabeluGresaka(
      tabela,
      podaciX,
      podaciFXln ? podaciFXln : podaciFX,
      aproksimiraneVrijednosti,
      greskeAproksimacije
    );
  } catch (err) {
    greska.innerHTML = `GREŠKA: ${err.message}`;
  }
};

rijesiBtn.addEventListener("click", rijesi);
