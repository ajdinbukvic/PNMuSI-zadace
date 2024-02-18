import {
  numerickoDiferenciranjePodaci,
  numerickoDiferenciranjeFunkcija,
} from "./numerickoDiferenciranje.js";
import {
  numerickoIntegriranjePodaci,
  numerickoIntegriranjeFunkcija,
} from "./numerickoIntegriranje.js";

const nacinUnosa = document.getElementsByName("nacinUnosa");
const nacinUnosaForma = document.getElementById("nacinUnosaForma");

const unosTastatura = document.getElementById("unosTastatura");
const citanjeDatoteke = document.getElementById("citanjeDatoteke");
const unosFunkcija = document.getElementById("unosFunkcija");

const automatskoPopunjavanjeContainer = document.getElementById(
  "automatskoPopunjavanjeContainer"
);
const automatskoPopunjavanje = document.getElementById(
  "automatskoPopunjavanje"
);

const brojPodataka = document.getElementById("brojPodataka");
const tabelaPodaci = document.getElementById("tabelaPodaci");
const xInput = document.getElementById("x");
const fxInput = document.getElementById("fx");

const odabirDatoteke = document.getElementById("odabirDatoteke");
const ucitanoPodataka = document.getElementById("ucitanoPodataka");

const unosFunkcije = document.getElementById("unosFunkcije");
const donjaGranica = document.getElementById("donjaGranica");
const gornjaGranica = document.getElementById("gornjaGranica");
const brojPodjela = document.getElementById("brojPodjela");
const brojIntervala = document.getElementById("brojIntervala");
const brojIntervalaContainer = document.getElementById(
  "brojIntervalaContainer"
);

const rjesenje = document.getElementById("rjesenje");
const greska = document.getElementById("greska");
const tabela = document.getElementById("tabela");
const rijesiBtn = document.getElementById("rijesi");
const inputi = document.querySelectorAll("input");
const izborFormule = document.getElementsByName("izborFormule");
const izborFormuleForma = document.getElementById("izborFormuleForma");

const stranica = location.pathname
  .split("/")
  .filter((c) => c.length)
  .pop();

(() => {
  automatskoPopunjavanjeContainer.style.display = "none";
  unosTastatura.style.display = "none";
  citanjeDatoteke.style.display = "none";
  unosFunkcija.style.display = "none";
  if (stranica === "zadatak3_4.html")
    brojIntervalaContainer.style.display = "none";
})();

const generisiHTML = (id) => {
  generisiTabelu(null, 0);
  inputi.forEach((input) => (input.value = ""));
  xInput.value = "x";
  fxInput.value = "fx";
  automatskoPopunjavanje.checked = false;
  if (id == "tastatura") {
    automatskoPopunjavanjeContainer.style.display = "block";
    unosTastatura.style.display = "block";
    citanjeDatoteke.style.display = "none";
    unosFunkcija.style.display = "none";
  } else if (id === "datoteka") {
    citanjeDatoteke.style.display = "block";
    automatskoPopunjavanjeContainer.style.display = "none";
    unosTastatura.style.display = "none";
    unosFunkcija.style.display = "none";
  } else {
    automatskoPopunjavanjeContainer.style.display = "block";
    unosFunkcija.style.display = "block";
    unosTastatura.style.display = "none";
    citanjeDatoteke.style.display = "none";
  }
};

nacinUnosaForma.addEventListener("change", (e) => generisiHTML(e.target.id));

const unosIntervala = (id) => {
  if (stranica === "zadatak3_4.html") {
    if (id == "trapezna") brojIntervalaContainer.style.display = "block";
    else brojIntervalaContainer.style.display = "none";
  }
};

izborFormuleForma.addEventListener("change", (e) => unosIntervala(e.target.id));

const parametri = {
  prviDrugi: {
    tastatura: {
      brojPodataka: 3,
      xPodaci: [3.4, 3.5, 3.6],
      fxPodaci: [0.294118, 0.285714, 0.277778],
    },
    funkcija: {
      primjerFunkcije: (x) => Math.exp(x) * Math.log(x),
      primjerFunkcijeStr: "y=e^x*ln(x)",
      donjaGranica: 1,
      gornjaGranica: 5,
      brojPodjela: 100,
    },
  },
  treciCetvrti: {
    tastatura: {
      brojPodataka: 5,
      xPodaci: [3.1, 3.3, 3.5, 3.7, 3.9],
      fxPodaci: [0.32258065, 0.3030303, 0.28571429, 0.27027027, 0.25641026],
      brojIntervala: 4,
    },
    // funkcija: {
    //   primjerFunkcije: (x) => 1 / x,
    //   primjerFunkcijeStr: "y=1/x",
    //   donjaGranica: 3.1,
    //   gornjaGranica: 3.9,
    //   brojPodjela: 5,
    //   brojIntervala: 2,
    // },
    funkcija: {
      primjerFunkcije: (x) => 1 / (x + Math.log(x)),
      primjerFunkcijeStr: "y=1/(x+ln(x))",
      donjaGranica: 1,
      gornjaGranica: 4,
      brojPodjela: 5,
      brojIntervala: 2,
    },
  },
};

const popuniParametre = () => {
  let zadatak = "";
  if (stranica === "zadatak1_2.html") zadatak = "prviDrugi";
  else if (stranica === "zadatak3_4.html") zadatak = "treciCetvrti";
  if (nacinUnosa[0].checked) {
    brojPodataka.value = parametri[zadatak].tastatura.brojPodataka;
    generisiTabelu(null, brojPodataka.value);
    for (let i = 0; i < brojPodataka.value; i++) {
      document.getElementById(`x-${i}`).value = Number.parseFloat(
        parametri[zadatak].tastatura.xPodaci[i]
      );
      document.getElementById(`fx-${i}`).value = Number.parseFloat(
        parametri[zadatak].tastatura.fxPodaci[i]
      );
    }
    if (zadatak === "treciCetvrti")
      brojIntervala.value = parametri[zadatak].tastatura.brojIntervala;
  } else if (nacinUnosa[2].checked) {
    unosFunkcije.value = parametri[zadatak].funkcija.primjerFunkcijeStr;
    donjaGranica.value = parametri[zadatak].funkcija.donjaGranica;
    gornjaGranica.value = parametri[zadatak].funkcija.gornjaGranica;
    brojPodjela.value = parametri[zadatak].funkcija.brojPodjela;
    if (zadatak === "treciCetvrti")
      brojIntervala.value = parametri[zadatak].funkcija.brojIntervala;
  }
};

const obrisiParametre = () => {
  for (let i = 0; i < brojPodataka.value; i++) {
    document.getElementById(`x-${i}`).value = "";
    document.getElementById(`fx-${i}`).value = "";
  }
  brojPodataka.value = "";
  tabelaPodaci.innerHTML = "";
  unosFunkcije.value = "";
  donjaGranica.value = "";
  gornjaGranica.value = "";
  brojPodjela.value = "";
  if (stranica === "zadatak3_4.html") brojIntervala.value = "";
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

const podaciX = [];
const podaciFX = [];

const ucitajPodatke = (e) => {
  const file = e.target.files[0];
  podaciX.length = 0;
  podaciFX.length = 0;
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const arrayBuffer = e.target.result;
      const uint8Array = new Uint8Array(arrayBuffer);
      const textData = new TextDecoder("utf-8").decode(uint8Array);
      const lines = textData.split("\n");
      const filteredLines = lines.filter((line) => line.trim() !== "");
      filteredLines.forEach((line) => {
        const values = line.split("\t");
        podaciX.push(parseFloat(values[0]));
        podaciFX.push(parseFloat(values[1]));
      });
      brojPodataka.value = ucitanoPodataka.value = filteredLines.length;
    };
    reader.readAsArrayBuffer(file);
  }
};

odabirDatoteke.addEventListener("change", ucitajPodatke);

const validirajUnose = (odabraniNacinUnosa) => {
  if (odabraniNacinUnosa === "tastatura") {
    podaciX.length = 0;
    podaciFX.length = 0;
    if (!brojPodataka.value || Number.parseInt(brojPodataka.value) <= 0)
      return false;
    for (let i = 0; i < brojPodataka.value; i++) {
      if (
        !document.getElementById(`x-${i}`).value ||
        !document.getElementById(`fx-${i}`).value
      ) {
        return false;
      }
      podaciX.push(Number.parseFloat(document.getElementById(`x-${i}`).value));
      podaciFX.push(
        Number.parseFloat(document.getElementById(`fx-${i}`).value)
      );
    }
  } else if (odabraniNacinUnosa === "datoteka") {
    if (!odabirDatoteke.files.length) return false;
  } else {
    if (
      !unosFunkcije.value ||
      !donjaGranica.value ||
      !gornjaGranica.value ||
      !brojPodjela.value ||
      Number.parseInt(brojPodjela.value) < 1
    )
      return false;
    if (
      Number.parseFloat(donjaGranica.value) >
      Number.parseFloat(gornjaGranica.value)
    )
      return false;
  }
  if (stranica === "zadatak3_4.html" && izborFormule[0].checked) {
    if (!brojIntervala.value || Number.parseInt(brojIntervala.value) <= 0)
      return false;
  }
  return true;
};

const rijesi = () => {
  greska.innerHTML = "";
  rjesenje.innerHTML = "";
  tabela.innerHTML = "";
  if (
    !nacinUnosa[0].checked &&
    !nacinUnosa[1].checked &&
    !nacinUnosa[2].checked
  ) {
    alert("Izaberite jedan od ponudjenih nacina unosa.");
    return;
  }
  const odabranaFormula = Array.from(izborFormule).some(
    (formula) => formula.checked
  );
  if (!odabranaFormula) {
    alert("Izaberite jednu od ponudjenih formula.");
    return;
  }
  const odabraniNacinUnosa = document.querySelector(
    'input[name="nacinUnosa"]:checked'
  ).id;
  const formula = document.querySelector(
    'input[name="izborFormule"]:checked'
  ).id;
  if (!validirajUnose(odabraniNacinUnosa)) {
    alert("Molimo popunite sve potrebne podatke u validnom formatu.");
    return;
  }
  let rez;
  try {
    if (stranica === "zadatak1_2.html") {
      if (
        odabraniNacinUnosa === "tastatura" ||
        odabraniNacinUnosa === "datoteka"
      ) {
        numerickoDiferenciranjePodaci(
          Number.parseInt(brojPodataka.value),
          podaciX,
          podaciFX,
          formula
        );
      } else {
        numerickoDiferenciranjeFunkcija(
          parametri["prviDrugi"].funkcija.primjerFunkcije,
          Number.parseFloat(donjaGranica.value),
          Number.parseFloat(gornjaGranica.value),
          Number.parseInt(brojPodjela.value),
          formula
        );
      }
    } else if (stranica === "zadatak3_4.html") {
      if (
        odabraniNacinUnosa === "tastatura" ||
        odabraniNacinUnosa === "datoteka"
      ) {
        rez = numerickoIntegriranjePodaci(
          Number.parseInt(brojPodataka.value),
          podaciX,
          podaciFX,
          formula,
          izborFormule[0].checked ? Number.parseInt(brojIntervala.value) : null
        );
      } else {
        rez = numerickoIntegriranjeFunkcija(
          parametri["treciCetvrti"].funkcija.primjerFunkcije,
          Number.parseFloat(donjaGranica.value),
          Number.parseFloat(gornjaGranica.value),
          izborFormule[0].checked ? Number.parseInt(brojPodjela.value) : null,
          formula,
          izborFormule[0].checked ? Number.parseInt(brojIntervala.value) : null
        );
      }
      rjesenje.innerHTML = `INTEGRAL: ${rez}`;
    }
  } catch (err) {
    greska.innerHTML = `GREŠKA: ${err.message}`;
  }
};

rijesiBtn.addEventListener("click", rijesi);
