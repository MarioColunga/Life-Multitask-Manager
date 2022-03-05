todoMain();

async function todoMain() {
  const DEFAULT_OPTION = "All categories";
  const titleTask = document.getElementById("titleTask");
  const categoryList = document.getElementById("categoryList");
  const projectDescription = document.getElementById("description");
  const startDate = document.getElementById("startDate");
  const startTime = document.getElementById("startTime");
  const addTaskBtn = document.getElementById("addTaskBtn");
  const sortTaskBtn = document.getElementById("sortTaskBtn");
  const saveChangesBtn = document.getElementById("saveChangesBtn");

  let selectElem,
    todoList = [],
    calendar,
    todoTable,
    draggingElement,
    currentPage = 1,
    itemsPerPage = 5,
    totalPages = 0,
    itemsPerPageSelectElem,
    paginationCtnr,
    todoModalCloseBtn;

  getElements();
  addListeners();
  initCalendar();
  await load();
  renderRows(todoList);
  updateSelectOptions();

  function getElements() {
    selectElem = document.getElementById("categoryFilter");
    todoTable = document.getElementById("todoTable");
    itemsPerPageSelectElem = document.getElementById("itemsPerPageSelectElem");
    paginationCtnr = document.querySelector(".pagination-pages");
    todoModalCloseBtn = document.getElementById("todo-modal-close-btn");
  }

  function addListeners() {
    addTaskBtn.addEventListener("click", addNewTask, false);
    sortTaskBtn.addEventListener("click", sortEntry, false);
    selectElem.addEventListener("change", multipleFilter, false);

    todoModalCloseBtn.addEventListener("click", closeEditModalBox, false);

    saveChangesBtn.addEventListener("click", saveChanges, false);

    todoTable.addEventListener("dragstart", onDragstart, false);
    todoTable.addEventListener("drop", onDrop, false);
    todoTable.addEventListener("dragover", onDragover, false);

    paginationCtnr.addEventListener("click", onPaginationBtnsClick, false);

    itemsPerPageSelectElem.addEventListener(
      "change",
      selectItemsPerPage,
      false
    );
  }

  //Function to add new task in the calendar and send it to the DB
  async function addNewTask() {
    const payload = {
      name: titleTask.value,
      time: startTime.value,
      deadLine: startDate.value,
      category: categoryList.value,
      description: projectDescription.value,
      userId: sessionStorage.getItem("user_id"),
    };

    titleTask.value = "";
    startDate.value = "";
    startTime.value = "";
    projectDescription.value = "";
    categoryList.selectedIndex = 0;

    renderRow(payload);

    const { dataValues } = await (
      await fetch("/api/projects", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      })
    ).json();

    addEvent(dataValues);
  }

  function updateSelectOptions() {
    let options = [];

    todoList.forEach((obj) => {
      options.push(obj.category);
    });

    let optionsSet = new Set(options);

    // empty the select options
    selectElem.innerHTML = "";

    let newOptionElem = document.createElement("option");
    newOptionElem.value = DEFAULT_OPTION;
    newOptionElem.innerText = DEFAULT_OPTION;
    selectElem.appendChild(newOptionElem);

    for (let option of optionsSet) {
      let newOptionElem = document.createElement("option");
      newOptionElem.value = option;
      newOptionElem.innerText = option;
      selectElem.appendChild(newOptionElem);
    }
  }

  function save() {
    let stringified = JSON.stringify(todoList);
    localStorage.setItem("todoList", stringified);
  }

  async function load() {
    const projects = await (
      await fetch("/api/projects", {
        method: "GET",
      })
    ).json();

    todoList = projects;
    // let retrieved = localStorage.getItem("todoList");
    // todoList = JSON.parse(retrieved);
    // if (todoList == null) todoList = [];

    itemsPerPageSelectElem.value = itemsPerPage;
  }

  function renderRows(arr) {
    renderPageNumbers(arr);
    currentPage = currentPage > totalPages ? totalPages : currentPage;

    arr.forEach(addEvent);

    let slicedArr = arr.slice(
      itemsPerPage * (currentPage - 1),
      itemsPerPage * currentPage
    );
    slicedArr.forEach((todoObj) => {
      renderRow(todoObj);
    });
  }

  function renderRow({ id, name, time, deadLine, category }) {
    // add a new row
    let trElem = document.createElement("tr");
    const [parsedDate] = deadLine.split("T");
    todoTable.appendChild(trElem);
    trElem.draggable = "true";
    trElem.dataset.id = id;

    // date cell
    let dateElem = document.createElement("td");
    dateElem.innerText = parsedDate;
    trElem.appendChild(dateElem);

    // time cell
    let timeElem = document.createElement("td");
    timeElem.innerText = time;
    trElem.appendChild(timeElem);

    // to-do cell
    let tdElem2 = document.createElement("td");
    tdElem2.innerText = name;
    trElem.appendChild(tdElem2);

    // category cell
    let tdElem3 = document.createElement("td");
    tdElem3.innerText = category;
    tdElem3.className = "categoryCell";
    trElem.appendChild(tdElem3);

    // edit cell
    let editSpan = document.createElement("button");
    editSpan.innerText = "edit";
    editSpan.className = "modifyTask btn-info btn-sm";
    editSpan.addEventListener("click", toEditItem, false);
    editSpan.dataset.id = id;

    let editTd = document.createElement("td");
    editTd.appendChild(editSpan);
    trElem.appendChild(editTd);

    // delete cell
    let spanElem = document.createElement("button");
    spanElem.innerText = "delete";
    spanElem.className = "modifyTask btn-sm btn-danger";
    spanElem.addEventListener("click", deleteItem, false);
    spanElem.dataset.id = id;

    let tdElem4 = document.createElement("td");
    tdElem4.appendChild(spanElem);
    trElem.appendChild(tdElem4);

    dateElem.dataset.type = "date";
    timeElem.dataset.type = "time";
    tdElem2.dataset.type = "todo";
    tdElem3.dataset.type = "category";

    dateElem.dataset.id = id;
    timeElem.dataset.id = id;
    tdElem2.dataset.id = id;
    tdElem3.dataset.id = id;

    async function deleteItem() {
      // remove from calendar
      let calendarEvent = calendar.getEventById(id);
      if (calendarEvent !== null) calendarEvent.remove();

      trElem.remove();

      await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      });
    }
  }

  function sortEntry() {
    todoList.sort((a, b) => {
      let aDate = Date.parse(a.date);
      let bDate = Date.parse(b.date);
      return aDate - bDate;
    });

    save();

    clearTable();

    renderRows(todoList);
  }

  function initCalendar() {
    var calendarEl = document.getElementById("calendar");

    calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: "dayGridMonth",
      initialDate: new Date(), //'2020-07-07',
      headerToolbar: {
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay",
      },
      events: [],
      eventClick: function (info) {
        console.log("infos: ", info.event.id);
        toEditItem(info.event);
      },
      eventBackgroundColor: "#a11e12",
      eventBorderColor: "#ed6a5e",
      editable: true,
      eventDrop: function (info) {
        console.log("info: ", info);
        calendarEventDragged(info.event);
      },
      eventTimeFormat: {
        hour: "numeric",
        minute: "2-digit",
        omitZeroMinute: false,
        hour12: false,
      },
    });

    calendar.render();
  }

  function addEvent({ id, name, deadLine, time }) {
    const [parsedDate] = deadLine.split("T");

    calendar.addEvent({
      id,
      title: name,
      start: time === "" ? parsedDate : `${parsedDate}T${time}`,
    });
  }

  function clearTable() {
    // Empty the table, keeping the first row
    let trElems = todoTable.getElementsByTagName("tr");
    for (let i = trElems.length - 1; i > 0; i--) {
      trElems[i].remove();
    }

    calendar.getEvents().forEach((event) => event.remove());
  }

  function multipleFilter() {
    clearTable();

    let selection = selectElem.value;

    if (selection == DEFAULT_OPTION) {
      renderRows(todoList);
    } else {
      let filteredCategoryArray = todoList.filter(
        (obj) => obj.category == selection
      );
      renderRows(filteredCategoryArray);
    }
  }

  function formatDate(date) {
    let dateObj = new Date(date);
    console.log(dateObj);
    let formattedDate = dateObj.toLocaleString("en-GB", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    return formattedDate;
  }

  function showEditModalBox() {
    document.getElementById("todo-overlay").classList.add("slidedIntoView");
  }

  function closeEditModalBox() {
    document.getElementById("todo-overlay").classList.remove("slidedIntoView");
  }

  async function saveChanges(event) {
    closeEditModalBox();

    const id = event.target.dataset.id;
    const name = document.getElementById("todo-edit-todo").value;
    const description = document.getElementById("edit-description").value;
    const category = document.getElementById("todo-edit-category").value;
    const deadLine = document.getElementById("todo-edit-date").value;
    const time = document.getElementById("todo-edit-time").value;

    await fetch(`/api/projects/${id}`, {
      method: "PUT",
      body: JSON.stringify({ name, description, category, deadLine, time }),
      headers: { "Content-Type": "application/json" },
    });

    // remove from calendar
    calendar.getEventById(id).remove();

    const projects = await (
      await fetch("/api/projects", {
        method: "GET",
      })
    ).json();
    renderRows(projects);
  }

  function toEditItem(event) {
    showEditModalBox();

    let id;

    if (event.target)
      // mouse event
      id = event.target.dataset.id;
    // calendar event
    else id = event.id;

    preFillEditForm(id);
  }

  async function preFillEditForm(id) {
    // let result = todoList.find((todoObj) => todoObj.id == id);
    // let { todo, category, date, time } = result;

    const { name, time, deadLine, category, description } = await (
      await fetch(`/api/projects/${id}`, {
        method: "GET",
      })
    ).json();

    const [parsedDate] = deadLine.split("T");
    document.getElementById(
      "readActivities"
    ).href = `/projectActivitiesTableRender/${id}/${sessionStorage.getItem(
      "user_id"
    )}`;
    document.getElementById(
      "addActivities"
    ).href = `/activitieFormRender/${id}/${sessionStorage.getItem("user_id")}`;
    document.getElementById("todo-edit-todo").value = name;
    document.getElementById("todo-edit-category").value = category;
    document.getElementById("todo-edit-date").value = parsedDate;
    document.getElementById("edit-description").value = description;
    document.getElementById("todo-edit-time").value = time;

    saveChangesBtn.dataset.id = id;
  }

  function onDragstart(event) {
    draggingElement = event.target; //trElem
  }

  function onDrop(event) {
    /* Handling visual drag and drop of the rows */

    if (event.target.matches("table")) return;

    let beforeTarget = event.target;

    while (!beforeTarget.matches("tr")) beforeTarget = beforeTarget.parentNode;

    if (beforeTarget.matches(":first-child")) return;

    // visualise the drag and drop
    todoTable.insertBefore(draggingElement, beforeTarget);

    /* Handling the array */

    let tempIndex;

    // find the index of one to be taken out
    todoList.forEach((todoObj, index) => {
      if (todoObj.id == draggingElement.dataset.id) tempIndex = index;
    });

    // pop the element
    let [toInsertObj] = todoList.splice(tempIndex, 1);

    // find the index of one to be inserted before

    todoList.forEach((todoObj, index) => {
      if (todoObj.id == beforeTarget.dataset.id) tempIndex = index;
    });

    // insert the temp
    todoList.splice(tempIndex, 0, toInsertObj);

    // update storage
    save();
  }

  function onDragover(event) {
    event.preventDefault();
  }

  function calendarEventDragged(event) {
    console.log("e: ", event);
    console.log("even: ", event.id);
    // let id = event.id;
    // let dateObj = new Date(event.start);
    // let year = dateObj.getFullYear();
    // let month = dateObj.getMonth() + 1;
    // let date = dateObj.getDate();
    // let hour = dateObj.getHours();
    // let minute = dateObj.getMinutes();

    // let paddedMonth = month.toString();
    // if (paddedMonth.length < 2) {
    //   paddedMonth = "0" + paddedMonth;
    // }

    // let paddedDate = date.toString();
    // if (paddedDate.length < 2) {
    //   paddedDate = "0" + paddedDate;
    // }

    // let toStoreDate = `${year}-${paddedMonth}-${paddedDate}`;
    // console.log(toStoreDate);

    // todoList.forEach((todoObj) => {
    //   if (todoObj.id == id) {
    //     todoObj.date = toStoreDate;
    //     if (hour !== 0)
    //       todoObj.time = `${hour.toString().padStart(2, "0")}:${minute
    //         .toString()
    //         .padStart(2, "0")}`;
    //   }
    // });

    // save();

    // multipleFilter();
  }

  function onPaginationBtnsClick(event) {
    switch (event.target.dataset.pagination) {
      case "pageNumber":
        currentPage = Number(event.target.innerText);
        break;
      case "previousPage":
        currentPage = currentPage == 1 ? currentPage : currentPage - 1;
        break;
      case "nextPage":
        currentPage = currentPage == totalPages ? currentPage : currentPage + 1;
        break;
      case "firstPage":
        currentPage = 1;
        break;
      case "lastPage":
        currentPage = totalPages;
        break;
      default:
    }
    multipleFilter();
  }

  function renderPageNumbers(arr) {
    let numberOfItems = arr.length;
    totalPages = Math.ceil(numberOfItems / itemsPerPage);

    let pageNumberDiv = document.querySelector(".pagination-pages");

    pageNumberDiv.innerHTML = `
      <span class="chevron" data-pagination="firstPage">First</span>`;

    if (currentPage != 1)
      pageNumberDiv.innerHTML += `
      <span class="chevron" data-pagination="previousPage">&laquo;</span>`;

    if (totalPages > 0) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumberDiv.innerHTML += `
      <span class="chevron" data-pagination="pageNumber">${i}</span>`;
      }
    }

    if (currentPage != totalPages)
      pageNumberDiv.innerHTML += `
      <span class="chevron" data-pagination="nextPage">&raquo;</span>`;

    pageNumberDiv.innerHTML += `
      <span class="chevron" data-pagination="lastPage">Last</span>`;
  }

  function selectItemsPerPage(event) {
    itemsPerPage = Number(event.target.value);
    localStorage.setItem("todo-itemsPerPage", itemsPerPage);
    multipleFilter();
  }
}
