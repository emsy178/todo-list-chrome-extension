// obtention des elements du Dom
const itemContainerElement = document.getElementById("item-container");
const btnElement = document.getElementById("btn-add");
const toDoInputElement = document.getElementById("to-do");

// Ajout d' un ecouteur d' evenement pour le bouton "add"
btnElement.addEventListener("click", () => {
  if (!toDoInputElement.value) {
    return;
  }
  // recuperer le valeur de l' input 
  const value = toDoInputElement.value;

  chrome.storage.local.get(["task"], (result) => {
    if (!result.task) {
      console.log("La clé 'task' n'existe pas encore dans le stockage local.");
      const arrayTask = [{ task: value, done: false }];
      const task = {
        tasks: arrayTask,
      };
      console.log(task);
      chrome.storage.local.set({ task: task }, () => {
        console.log("la tache vient d' etre cree :) ");
      });
      toDoInputElement.value = "";
      itemContainerElement.innerHTML += ` <div class="item" data-index = "${index}" >
      <span>${value}</span>
      <div class="btn-container">
          <span class="material-symbols-outlined">
              done
          </span>
          <span class="material-symbols-outlined">
              close
          </span>
      </div>
    </div>`;
    } else {
      console.log("voici le console.log de result");
      console.log(result.task);
      let task = result.task.tasks;
      console.log(task);
      task.push({ task: value, done: false });
      const index = task.length - 1;
      task = {
        tasks: task,
      };
      chrome.storage.local.set({ task: task }, () => {
        console.log("la tache vient d' etre mise a jour  :)");
      });
      toDoInputElement.value = "";
      itemContainerElement.innerHTML += ` <div class="item" data-index = "${index}" >
      <span>${value}</span>
      <div class="btn-container">
          <span class="material-symbols-outlined">
              done
          </span>
          <span class="material-symbols-outlined">
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
          <span class="material-symbols-outlined">
              done
          </span>
          <span class="material-symbols-outlined">
              close
          </span>
      </div>
    </div>`;
    }
  });
}
