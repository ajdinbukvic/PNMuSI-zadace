import { bisekcija } from "./bisekcija.js";

const funkcija1 = (x) => x * x - 2;
const funkcija2 = (x) =>
  Math.pow(Math.E, x) + Math.pow(2, -x) + 2 * Math.cos(x) - 6;

const donjaGranica = document.getElementById("donjaGranica");
const gornjaGranica = document.getElementById("gornjaGranica");
const tacnost = document.getElementById("tacnost");
const maxIteracija = document.getElementById("maxIteracija");
const automatskoPopunjavanje = document.getElementById(
  "automatskoPopunjavanje"
);
const jednacina = document.getElementsByName("jednacina");
const rijesiBtn = document.getElementById("rijesi");
const greska = document.getElementById("greska");
const rjesenje = document.getElementById("rjesenje");
const tabela = document.getElementById("tabela");

const parametri = [
  { donjaGranica: 1, gornjaGranica: 2, tacnost: 1e-4 },
  { donjaGranica: -5, gornjaGranica: 0, tacnost: 5e-5 },
];

const popuniParametre = (jednacina) => {
  if (jednacina === 1) {
    donjaGranica.value = parametri[0].donjaGranica;
    gornjaGranica.value = parametri[0].gornjaGranica;
    tacnost.value = parametri[0].tacnost;
  } else {
    donjaGranica.value = parametri[1].donjaGranica;
    gornjaGranica.value = parametri[1].gornjaGranica;
    tacnost.value = parametri[1].tacnost;
  }
};

const obrisiParametre = () => {
  donjaGranica.value = "";
  gornjaGranica.value = "";
  tacnost.value = "";
};

const promijeniParametre = (e) => {
  if (e.currentTarget.checked) {
    if (jednacina[0].checked) popuniParametre(1);
    else if (jednacina[1].checked) popuniParametre(2);
  } else obrisiParametre();
};

automatskoPopunjavanje.addEventListener("change", promijeniParametre);

const promijeniJednacinu = (e) => {
  const jednacina = e.target;
  switch (jednacina.id) {
    case "jednacina1":
      if (automatskoPopunjavanje.checked) popuniParametre(1);
      break;
    case "jednacina2":
      if (automatskoPopunjavanje.checked) popuniParametre(2);
      break;
  }
};

document.body.addEventListener("change", promijeniJednacinu);

const popuniTabelu = (podaci) => {
  if (!podaci) return;
  tabela.innerHTML = "";
  tabela.innerHTML = `<thead>
                        <td>Broj iteracije</td>
                        <td>Donja granica</td>
                        <td>Gornja granica</td>
                        <td>Sredina podsegmenta</td>
                        <td>Vrijednost funkcije</td>
                        <td>Trenutna greška</td>
                      </thead>`;
  podaci.forEach((p) => {
    tabela.innerHTML += `<tr>
                            <td>${p.brIteracije}</td>
                            <td>${p.donjaGranica}</td>
                            <td>${p.gornjaGranica}</td>
                            <td>${p.srVrijednost}</td>
                            <td>${p.rezultat}</td>
                            <td>${p.razlika}</td>
                        </tr>`;
  });
};

const rijesi = () => {
  greska.innerHTML = "";
  rjesenje.innerHTML = "";
  tabela.innerHTML = "";
  if (!jednacina[0].checked && !jednacina[1].checked) {
    alert("Izaberite jednu od dvije ponudjenje jednacine.");
    return;
  }
  if (!donjaGranica.value || !gornjaGranica.value || !tacnost.value) {
    alert("Unesite sva potrebna polja.");
    return;
  }
  const funkcija = jednacina[0].checked ? funkcija1 : funkcija2;
  try {
    const [rez, podaci] = bisekcija(
      funkcija,
      Number.parseFloat(donjaGranica.value),
      Number.parseFloat(gornjaGranica.value),
      Number.parseFloat(tacnost.value),
      Number.parseInt(maxIteracija)
    );
    rjesenje.innerHTML = `RJEŠENJE: ${rez}`;
    popuniTabelu(podaci);
  } catch (err) {
    greska.innerHTML = `GREŠKA: ${err.message}`;
  }
};

rijesiBtn.addEventListener("click", rijesi);
