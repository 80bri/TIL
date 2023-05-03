import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://things-i-love-app-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const Til = ref(database, "Til");

const typeEv = document.getElementById("text-bar");
const btnEv = document.getElementById("btn");
const TilEl = document.getElementById("tilev");

btnEv.addEventListener("click", function () {
  let typeEvValue = typeEv.value;

  push(Til, typeEvValue);
  cleartypeEv();
});

function cleartypeEv() {
  typeEv.value = "";
}

onValue(Til, function (snapshot) {
  

  if (snapshot.exists()) {
    let arrayVersion = Object.entries(snapshot.val());
    TilEl.innerHTML = "";

    for (let i = 0; i < arrayVersion.length; i++) {
      let currentItem = arrayVersion[i];

      addDomEl(currentItem);
    } 
    
  }
  else {TilEl.innerHTML = ""}
});





function addDomEl(item) {
  //TilEl.innerHTML += `<li>${typeEvValue}</li>`;

  let itemID = item[0];
  let itemValue = item[1];

  let newEl = document.createElement("li");
  newEl.textContent = itemValue;

  newEl.addEventListener("click", function () {
    let exactLocation = ref(database, `Til/${itemID}`)
    remove(exactLocation)
  });

  TilEl.append(newEl);
}
