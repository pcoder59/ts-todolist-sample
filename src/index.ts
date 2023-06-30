/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

/*import confetti from 'canvas-confetti';

confetti.create(document.getElementById('canvas') as HTMLCanvasElement, {
  resize: true,
  useWorker: true,
})({ particleCount: 200, spread: 200 });*/

import { v4 as uuidV4 } from "uuid";

/*console.log("Hi");

console.log(uuidV4());*/

type Task = {
  id: string, 
  title: string, 
  completed: boolean, 
  createdAt: Date
}

const list = document.querySelector<HTMLUListElement>("#list");
const form = document.getElementById("new-task-form") as HTMLFormElement | null;
const input = document.querySelector<HTMLInputElement>("#new-task-title");
const tasks: Task[] = loadTasks();
tasks.forEach(addListItem);

form?.addEventListener("submit", e => {
  e.preventDefault();

  if(input?.value == "" || input?.value == null){
    alert("Please Enter a Task Title!");
  } else {
    const newTask: Task = {
      id: uuidV4(),
      title: input.value,
      completed: false,
      createdAt: new Date()
    }
    tasks.push(newTask);
  
    addListItem(newTask);
    input.value = "";
  }
});

function addListItem(task: Task): boolean {
  if(list) {
    const item = document.createElement("li");
    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    const deletButton = document.createElement("button");
    deletButton.innerHTML = "DELETE";
    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;
      saveTasks();
    });
    deletButton.addEventListener("click", () => {
      const index = tasks.indexOf(task);
      if (index > -1) {
        tasks.splice(index, 1);
      }
      saveTasks();
      list.removeChild(item);
    });
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    label.append(checkbox, task.title, deletButton);
    item.append(label);
    list.append(item);
    saveTasks();
    return true;
  } else {
    alert("Error 100: Cannot Get List from HTML!");
    return false;
  }
}

function saveTasks() {
  localStorage.setItem("TASKS", JSON.stringify(tasks));
}

function loadTasks(): Task[] {
  const taskJSON = localStorage.getItem("TASKS");
  if(taskJSON == null) {
    return [];
  } else {
    return JSON.parse(taskJSON);
  }
}