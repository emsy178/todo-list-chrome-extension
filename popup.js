const itemContainerElement = document.getElementById("item-container");
console.log("from the options page");
chrome.storage.local.get(["task"], (result) => {
  if (!result.task) {
    itemContainerElement.innerHTML = `<div>
    <p align="center" style="color: white;"> No to do </p>
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
