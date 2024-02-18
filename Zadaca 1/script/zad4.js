import { bisekcija } from "./bisekcija.js";
import { newton, modificiraniNewton } from "./newtonModificiraniNewton.js";

const t = Number.parseFloat(document.getElementById("t").value);
const VMax = Number.parseFloat(document.getElementById("Vmax").value);
const K = Number.parseFloat(document.getElementById("K").value);
const S0 = Number.parseFloat(document.getElementById("S0").value);

const funkcija = (S) => K * Math.log(S / S0) - (S0 - S) + VMax * t;

const rijesiBtn = document.getElementById("rijesi");
const metoda = document.getElementsByName("izborMetode");
const tacnost = document.getElementById("tacnost");
const greska = document.getElementById("greska");
const rjesenje = document.getElementById("rjesenje");
const tabela = document.getElementById("tabela");

const popuniTabelu = (podaci) => {
  if (!podaci) return;
  tabela.innerHTML = "";
  if (metoda[0].checked) {
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
  } else {
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
  let rez, podaci;
  try {
    if (metoda[0].checked) {
      [rez, podaci] = bisekcija(
        funkcija,
        Number.parseFloat(0),
        Number.parseFloat(1),
        Number.parseFloat(tacnost.value),
        Number.parseInt(1000)
      );
    } else if (metoda[1].checked) {
      [rez, podaci] = newton(
        funkcija,
        Number.parseFloat(3),
        Number.parseFloat(tacnost.value),
        Number.parseInt(500)
      );
    } else {
      [rez, podaci] = modificiraniNewton(
        funkcija,
        Number.parseFloat(1),
        Number.parseFloat(5),
        Number.parseFloat(tacnost.value),
        Number.parseInt(500)
      );
    }
    rjesenje.innerHTML = `RJEŠENJE: ${rez}`;
    popuniTabelu(podaci);
  } catch (err) {
    greska.innerHTML = `GREŠKA: ${err.message}`;
  }
};

rijesiBtn.addEventListener("click", rijesi);
