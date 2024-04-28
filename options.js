// obtention des elements du Dom
const itemContainerElement = document.getElementById("item-container");
const btnElement = document.getElementById("btn-add");
const toDoInputElement = document.getElementById("to-do");
const validateBtnElement = document.getElementById("validate")
const deleteBtnElement =  document.getElementById("delete")

// Ajout d' un écouteur d' événement pour le bouton "add"
btnElement.addEventListener("click", () => {
  // Verifier si l' input est vide
  if (!toDoInputElement.value) {
    return;
  }
  // recuperer la valeur de l' input
  const value = toDoInputElement.value;

  chrome.storage.local.get(["task"], (result) => {
    // Verifier si une tâche  a été  créée
    if (!result.task) {
      console.log("La clé 'task' n'existe pas encore dans le stockage local.");
      // Creation  d' un array conntenant un objet qui a son tour contient le nom de la tache et son status
      const arrayTask = [{ task: value, done: false }];

      // creation d' un objet task
      const task = {
        tasks: arrayTask,
      };
      console.log(task);

      // Enregistrer la tâche dans le stockage local de l'extension Chrome
      chrome.storage.local.set({ task: task }, () => {
        console.log("la tache vient d' etre cree :) ");
      });

      // Récupérer l' index du premier element du tableau
      const index = arrayTask.length - 1;
      // Initialiser le champ de l' input to do a vide
      toDoInputElement.value = "";
      // Mettre à jour l' élément conteneur des tâches
      itemContainerElement.innerHTML = ` <div class="item" data-index = "${index}" >
      <span>${value}</span>
      <div class="btn-container">
          <span class="material-symbols-outlined"  id="validate">
              done
          </span>
          <span class="material-symbols-outlined" id="delete">
              close
          </span>
      </div>
    </div>`;
    } else {
      console.log(result.task);
      // Récupérer le tableau contenant les tâches depuis  le chrome.storage
      let task = result.task.tasks;
      console.log(task);

      // Creation d' une nouvelle  tâches
      task.push({ task: value, done: false });

      // Récupérer   l' index du dernier element du tableau
      const index = task.length - 1;
      // Creation d' un objet task
      task = {
        tasks: task,
      };
      // Enregistrer la tâche dans le stockage local de l'extension Chrome
      chrome.storage.local.set({ task: task }, () => {
        console.log("la tache vient d' etre mise a jour  :)");
      });
      // Initialiser le champ de l' input to do a vide
      toDoInputElement.value = "";
      // Mettre à jour l' élément conteneur des tâches
      itemContainerElement.innerHTML += ` <div class="item" data-index = "${index}" >
      <span>${value}</span>
      <div class="btn-container">
          <span class="material-symbols-outlined" id="validate">
              done
          </span>
          <span class="material-symbols-outlined" id="delete">
              close
          </span>
      </div>
    </div>`;
    }
  });
});

displayToDo();

function displayToDo() {
  console.log("from the options page");
  chrome.storage.local.get(["task"], (result) => {
    if (!result.task) {
      itemContainerElement.innerHTML = ` <div>
      <p align="center" style="color: white; font-size: 28px; padding:10px;"> No to do :( !!!  </p>
    </div>`;
      return;
    }

    console.log(result.task);
    console.log(itemContainerElement);

    const tasks = result.task.tasks;
    for (const task in tasks) {
      itemContainerElement.innerHTML += ` <div class="item" data-index = "${task}" >
      <span>${tasks[task].task}</span>
      <div class="btn-container">
          <span class="material-symbols-outlined" id="validate">
              done
          </span>
          <span class="material-symbols-outlined" id="delete">
              close
          </span>
      </div>
    </div>`;
    }
  });
}


console.log(validateBtnElement,"button validate")
console.log(deleteBtnElement)