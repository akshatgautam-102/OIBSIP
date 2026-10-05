const taskInput = document.querySelector("#taskinput");
const addButton = document.querySelector("#add-button");
const pendingList = document.querySelector("#pendingList");
const completedList = document.querySelector("#completedList");
const pendingCount = document.querySelector("#pendingcount");
const completedCount = document.querySelector("#completedCount");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

addButton.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (!text) return;
  tasks.push({ id: Date.now(), text: text, completed: false, addedAt: new Date().toLocaleString() });
  taskInput.value = "";
  save();render();
});


function render() {
  pendingList.innerHTML = "";
  completedList.innerHTML = " ";

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.innerHTML = `
    <input type="checkbox" ${task.completed ? "checked" : ""}>
    <span class="task-text">${task.text}</span>
    <small>${task.addedAt}</small>
    <button class="edit-btn">Edit</button>
    <button class="del-btn">Delete</button>
    `;

    const checkbox = li.querySelector("input");
    const delBtn = li.querySelector(".del-btn");
    const editBtn = li.querySelector(".edit-btn");
    const textSpan = li.querySelector(".task-text");

    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;
      save();
      render();
    });

    delBtn.addEventListener("click", () => {
      tasks = tasks.filter(t => t.id !== task.id);
      save();
      render();
    });

    editBtn.addEventListener("click", () => {
      const input = document.createElement("input");
      input.value = task.text;
      textSpan.replaceWith(input);
      input.focus();
      input.addEventListener("blur", () => {
        if(input.value.trim()) task.text = input.value.trim();
        save();
        render();
      });
    });
    if (task.completed) {
      completedList.appendChild(li);
    } else {
      pendingList.appendChild(li);
    }
  });

  pendingCount.textContent = `${tasks.filter(t => !t.completed).length} pending`;
  completedCount.textContent = `${tasks.filter(t => t.completed).length} completed`;
}

render();