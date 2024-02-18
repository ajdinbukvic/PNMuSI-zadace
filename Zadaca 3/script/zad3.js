import { metodaNajmanjihKvadrata } from "./metodaNajmanjihKvadrata.js";
import { mnkEksponencijalnomFunkcijom } from "./mnkEksponencijalnomFunkcijom.js";
import { generisiTabeluGresaka } from "./helper.js";

const metoda = document.getElementsByName("izborMetode");
const greska = document.getElementById("greska");
const rjesenje = document.getElementById("rjesenje");
const tabela = document.getElementById("tabela");
const rijesiBtn = document.getElementById("rijesi");

const parametri = {
  podaciX: [1.52, 3.05, 4.58, 6.11, 7.64, 9.17],
  podaciY: [0.86, 0.73, 0.62, 0.53, 0.44, 0.37],
};

const rijesi = () => {
  greska.innerHTML = "";
  rjesenje.innerHTML = "";
  tabela.innerHTML = "";
  if (!metoda[0].checked && !metoda[1].checked) {
    alert("Izaberite jednu od dvije ponudjenje metode.");
    return;
  }
  let koeficijenti, aproksimiraneVrijednosti, greskeAproksimacije, podaciFXln;
  try {
    if (metoda[0].checked) {
      [koeficijenti, aproksimiraneVrijednosti, greskeAproksimacije] =
        metodaNajmanjihKvadrata(parametri.podaciX, parametri.podaciY, 2);
      rjesenje.innerHTML = `KOEFICIJENTI POLINOMA: ${koeficijenti}`;
    } else if (metoda[1].checked) {
      [
        koeficijenti,
        aproksimiraneVrijednosti,
        greskeAproksimacije,
        podaciFXln,
      ] = mnkEksponencijalnomFunkcijom(parametri.podaciX, parametri.podaciY);
      rjesenje.innerHTML = `APROKSIMIRANA FUNKCIJA: ${koeficijenti}`;
    }
    generisiTabeluGresaka(
      tabela,
      parametri.podaciX,
      podaciFXln ? podaciFXln : parametri.podaciY,
      aproksimiraneVrijednosti,
      greskeAproksimacije
    );
  } catch (err) {
    greska.innerHTML = `GREŠKA: ${err.message}`;
  }
};

rijesiBtn.addEventListener("click", rijesi);
