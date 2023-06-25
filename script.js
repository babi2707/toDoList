import { db, collection, addDoc, onSnapshot, doc, getDoc, updateDoc, deleteDoc } from "./firebase.js";

let items = [];

function getItems() {
  onSnapshot(collection(db, "new-todo"), (snapshot) => {
    items = []; // Clear the items array before populating it
    snapshot.docs.forEach((doc) => {
      items.push({
        id: doc.id,
        ...doc.data()
      });
    });
    generateItems(items);
  });
}

function generateItems(items) {
  let itemsHTML = "";
  let count = 0;

  items.forEach((item) => {
    let date = new Date(item.startDate);
    let dateEnd = new Date(item.endDate);
    itemsHTML += `
        <div class="list" id="lista">
          <div class="row" data-id="${item.id}">
            <div class="col-1" id="item">
              <div class="check">
                <div data-id="${item.id}" class="check-mark ${item.status == "completed" ? "checked" : ""}">
                  <i class="fa-solid fa-check" style="color: #4624df"></i>
                </div>
              </div>
            </div>

            <div class="col-9">
              <div class="texto ${item.status == "completed" ? "checked" : ""}">
                <span><b>Name:</b> ${item.name}</span>
                <span><b>Description:</b> ${item.description}</span>
                <span><b>StartDate:</b>  ${date.toLocaleString("en")}</span>
                <span><b>EndDate:</b> ${dateEnd.toLocaleString("en")}</span>
              </div>
            </div>

            <div class="col-1" id="botoes">
              <div class="buttons">
                <button class="edit-button" data-id="${item.id}"><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="delete-button" data-id="${item.id}"><i class="fa-solid fa-trash"></i></button>
              </div>
            </div>
          </div>
        </div> 
    `;

    if (item.status == "completed") {
      count += 1;
    }
  });


  let qtdItems = items.length;
  let itemsLeft = qtdItems - count;
  let itemsHTMLQtd = `
    <div class="items-left">${itemsLeft} items left</div>
  `;

  document.querySelector(".items").innerHTML = itemsHTML; 
  document.querySelector(".items-left").innerHTML = itemsHTMLQtd;
  createEventListener();
}

function editItem(item) {
  let itemDiv = document.querySelector(`.list [data-id="${item.id}"]`);

  if (itemDiv) {
    let itemHTML = `
      <form id="edit-todo-form" method="post">
        <input type="text" id="todo-name" placeholder="Name" value="${item.name}" required />
        <input type="text" id="todo-description" placeholder="Description" value="${item.description}" required />
        <input type="datetime-local" id="todo-startdatetime" value="${item.startDate}" required />
        <input type="datetime-local" id="todo-enddatetime" value="${item.endDate}" required />
        <button type="submit" class="update btn btn-outline-dark">Update</button>
      </form>
    `;

    itemDiv.innerHTML = itemHTML;

    const updateForm = itemDiv.querySelector("#edit-todo-form");
    updateForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const updatedTodo = {
        name: updateForm.querySelector("#todo-name").value,
        description: updateForm.querySelector("#todo-description").value,
        startDate: updateForm.querySelector("#todo-startdatetime").value,
        endDate: updateForm.querySelector("#todo-enddatetime").value,
      };

      updateItem(item, updatedTodo);
    });

    createEventListener();
  }
}


function newItem(item) {
  let itemDiv = document.querySelector(`.list [data-id="${item.id}"]`);

  if (itemDiv) {
    let itemHTML = `
      <div class="col-1" id="item">
        <div class="check">
          <div data-id="${item.id}" class="check-mark ${item.status == "completed" ? "checked" : ""}">
            <i class="fa-solid fa-check" style="color: #4624df"></i>
          </div>
        </div>
      </div>

      <div class="col-9">
        <div class="texto ${item.status == "completed" ? "checked" : ""}">
          <span><b>Name:</b> ${item.name}</span>
          <span><b>Description:</b> ${item.description}</span>
          <span><b>StartDate:</b>  ${new Date(item.startDate).toLocaleString("en")}</span>
          <span><b>EndDate:</b> ${new Date(item.endDate).toLocaleString("en")}</span>
        </div>
      </div>

      <div class="col-1" id="botoes">
        <div class="buttons">
          <button class="edit-button" data-id="${item.id}"><i class="fa-solid fa-pen-to-square"></i></button>
          <button class="delete-button" data-id="${item.id}"><i class="fa-solid fa-trash"></i></button>
        </div>
      </div>
    `;

    itemDiv.innerHTML = itemHTML;

    createEventListener();
  }
}

function updateItem(item, updatedTodo) {
  const itemDiv = document.querySelector(`.list [data-id="${item.id}"]`);

  if (itemDiv) {
    try {
      const itemRef = doc(collection(db, "new-todo"), item.id);

      updateDoc(itemRef, updatedTodo)
        .then(() => {
          // Revert back to displaying the item without the form
          newItem(item);

          // Re-fetch and display the items
          getItems();
        })
        .catch((error) => {
          console.error("Error updating document: ", error);
        });
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  }
}

function createEventListener() {
  let todoCheckMarks = document.querySelectorAll(".list .check-mark");

  todoCheckMarks.forEach((checkMark) => {
    checkMark.addEventListener("click", function() {
      markCompleted(checkMark.dataset.id);
    })
  });

  const editButtons = document.querySelectorAll(".list .edit-button");

  editButtons.forEach((editButton) => {
    editButton.addEventListener("click", function() {
      const itemId = editButton.dataset.id;
      const item = getItemById(itemId, items);

      if (item) {
        editItem(item, items);
      }
    });
  });

  let deleteButtons = document.querySelectorAll(".list .delete-button");

  deleteButtons.forEach((button) => {
    button.addEventListener("click", function() {
      const itemId = button.dataset.id;
      const listItem = button.closest(".list");
      const itemRef = doc(collection(db, "new-todo"), itemId);

      // Remover item do Firestore
      deleteDoc(itemRef)
        .then(() => {
          // Remover item do DOM
          listItem.remove();
        })
        .catch((error) => {
          console.error("Error deleting item: ", error);
        });
    });
  });
}

function getItemById(id, items) {
  for (let i = 0; i < items.length; i++) {
    if (items[i].id === id) {
      return items[i];
    }
  }

  return null;
}

function markCompleted(id) {
  let item = doc(collection(db, "new-todo"), id);

  getDoc(item).then(function(doc) {
    if (doc.exists) {
      let status = doc.data().status;
      if(status == "active") {
        updateDoc(item, {
          status: "completed"
        });
      } else if (status == "completed") {
        updateDoc(item, {
          status: "active"
        });
      }
    }
  })
}

function clearCompletedItems() {
  const checkedItems = document.querySelectorAll(".list .check-mark.checked");
  checkedItems.forEach((item) => {
    const listItem = item.closest(".list");
    const itemId = item.dataset.id;
    const itemRef = doc(collection(db, "new-todo"), itemId);

    // Remover item do Firestore
    deleteDoc(itemRef)
      .then(() => {
        // Remover item do DOM
        listItem.remove();
      })
      .catch((error) => {
        console.error("Error deleting item: ", error);
      });
  });
}

window.onload = () => {
  const addTodoForm = document.getElementById("add-todo-form");

  const itemsClear = document.querySelector(".items-clear");
  itemsClear.addEventListener("click", clearCompletedItems);

  addTodoForm.onsubmit = async (event) => {
    event.preventDefault();

    let todo = {
      name: document.getElementById("todo-name").value,
      description: document.getElementById("todo-description").value,
      startdatetime: document.getElementById("todo-startdatetime").value,
      enddatetime: document.getElementById("todo-enddatetime").value,
    };

    try {

      await addDoc(collection(db, "new-todo"), {
        name: todo.name,
        description: todo.description,
        startDate: todo.startdatetime,
        endDate: todo.enddatetime,
        status: "active",
      });

      // Limpar os valores dos campos de entrada
      document.getElementById("todo-name").value = "";
      document.getElementById("todo-description").value = "";
      document.getElementById("todo-startdatetime").value = "";
      document.getElementById("todo-enddatetime").value = "";
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  getItems(); // Call the function after it is defined
};
