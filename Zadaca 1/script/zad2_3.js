import { newton, modificiraniNewton } from "./newtonModificiraniNewton.js";

const funkcija1 = (x) => x * x - 2;
const funkcija2 = (x) => x * x * x - x * x + 2;

const aproksimacija = document.getElementById("aproksimacija");
const donjaGranica = document.getElementById("donjaGranica");
const gornjaGranica = document.getElementById("gornjaGranica");
const metoda = document.getElementsByName("izborMetode");
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
  { aproksimacija: 3, tacnost: 1e-4, donjaGranica: -1, gornjaGranica: 1 },
  { aproksimacija: 1, tacnost: 1e-8, donjaGranica: -5, gornjaGranica: 5 },
];

const popuniParametre = (jednacina) => {
  if (jednacina === 1) {
    aproksimacija.value = parametri[0].aproksimacija;
    donjaGranica.value = parametri[0].donjaGranica;
    gornjaGranica.value = parametri[0].gornjaGranica;
    tacnost.value = parametri[0].tacnost;
  } else {
    aproksimacija.value = parametri[1].aproksimacija;
    donjaGranica.value = parametri[1].donjaGranica;
    gornjaGranica.value = parametri[1].gornjaGranica;
    tacnost.value = parametri[1].tacnost;
  }
};

const obrisiParametre = () => {
  aproksimacija.value = "";
  tacnost.value = "";
  donjaGranica.value = "";
  gornjaGranica.value = "";
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

const promijeniMetodu = (e) => {
  const metoda = e.target;
  switch (metoda.id) {
    case "newton":
      document.getElementById("aproksimacija").style.display = "block";
      document.getElementById("gornjaGranica").style.display = "none";
      document.getElementById("donjaGranica").style.display = "none";
      document.getElementById("aproksimacijaLabel").style.display = "block";
      document.getElementById("gornjaGranicaLabel").style.display = "none";
      document.getElementById("donjaGranicaLabel").style.display = "none";
      break;
    case "modificiraniNewton":
      document.getElementById("aproksimacija").style.display = "none";
      document.getElementById("gornjaGranica").style.display = "block";
      document.getElementById("donjaGranica").style.display = "block";
      document.getElementById("aproksimacijaLabel").style.display = "none";
      document.getElementById("gornjaGranicaLabel").style.display = "block";
      document.getElementById("donjaGranicaLabel").style.display = "block";
      break;
  }
};

document
  .querySelectorAll("input[type=radio][name=izborMetode]")
  .forEach((input) => {
    input.addEventListener("change", promijeniMetodu);
  });

const popuniTabelu = (podaci) => {
  if (!podaci) return;
  tabela.innerHTML = "";
  tabela.innerHTML = `<thead>
                        <td>Broj iteracije</td>
                        <td>Trenutna aproksimacija</td>
                        <td>Vrijednost funkcije</td>
                        <td>Vrijednost prvog izvoda</td>
                        <td>Trenutna greška</td>
                      </thead>`;
  podaci.forEach((p) => {
    tabela.innerHTML += `<tr>
                            <td>${p.brIteracije}</td>
                            <td>${p.aproksimacija}</td>
                            <td>${p.rezultat}</td>
                            <td>${p.prviIzvod}</td>
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
  if (!metoda[0].checked && !metoda[1].checked) {
    alert("Izaberite jednu od dvije ponudjenje metode.");
    return;
  }
  if (!tacnost.value) {
    alert("Unesite sva potrebna polja.");
    return;
  }
  const funkcija = jednacina[0].checked ? funkcija1 : funkcija2;
  let rez, podaci;
  try {
    if (metoda[0].checked) {
      [rez, podaci] = newton(
        funkcija,
        Number.parseFloat(aproksimacija.value),
        Number.parseFloat(tacnost.value),
        Number.parseInt(maxIteracija)
      );
    } else {
      [rez, podaci] = modificiraniNewton(
        funkcija,
        Number.parseFloat(donjaGranica.value),
        Number.parseFloat(gornjaGranica.value),
        Number.parseFloat(tacnost.value),
        Number.parseInt(maxIteracija)
      );
    }
    rjesenje.innerHTML = `RJEŠENJE: ${rez}`;
    popuniTabelu(podaci);
  } catch (err) {
    greska.innerHTML = `GREŠKA: ${err.message}`;
  }
};

rijesiBtn.addEventListener("click", rijesi);
