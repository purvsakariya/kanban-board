let taskData = {};
const mainElement = document.querySelector('main')
const sections = document.querySelector('.sections')
const AddNewTaskBtn = document.querySelector('.rightNavBtn')
const AddTaskPopUp = document.querySelector('.fAddTaskPopUp')
const newTaskSubmitBtn = document.querySelector('#newTaskSubmitBtn')
const toDoSec = document.querySelector('.to-doSec')
const inProgressSec = document.querySelector('.inProgressSec')
const doneSec = document.querySelector('.doneSec')
let deleteBtns = sections.querySelectorAll("button")
let tasks = document.getElementsByClassName('task')
const bgpopUp = document.querySelector('.bgPopUp')

if (localStorage.getItem("Tasks")) {
    let data = JSON.parse(localStorage.getItem("Tasks"))
    for (const col in data) {
        let column = document.querySelector(`#${col}`)

        data[col].forEach(task => {
            let divElement = document.createElement("div")
            divElement.classList.add('fTo-doTask')
            divElement.classList.add('task')
            divElement.draggable = true
            divElement.innerHTML = `
                    <h3>${task.title}</h3>
                    <p>${task.desc}</p>
                    <button>Delete</button>
        `
            column.appendChild(divElement)
        })
    }
}

//Delete Task
sections.addEventListener("click",(e)=>{
    if(e.target.tagName === "BUTTON"){
        e.target.parentNode.remove()
        taskCount()
    }
})

function AddNewTask() {
    AddNewTaskBtn.addEventListener("click", e => {
        console.log("clicked");
        AddTaskPopUp.classList.add('addTaskPopUp')
        AddTaskPopUp.classList.remove('fAddTaskPopUp')
        bgpopUp.style.zIndex = "2"
    })
    bgpopUp.addEventListener("click", () => {
        AddTaskPopUp.classList.remove('addTaskPopUp')
        AddTaskPopUp.classList.add('fAddTaskPopUp')
        bgpopUp.style.zIndex = "0"
    })
    newTaskSubmitBtn.addEventListener("click", e => {
        AddTaskPopUp.classList.remove('addTaskPopUp')
        AddTaskPopUp.classList.add('fAddTaskPopUp')
        bgpopUp.style.zIndex = "0"
        let taskTatle = document.querySelector('#fnewTaskTitle').value
        let taskDesc = document.querySelector('#snewTaskTitle').value
        let divElement = document.createElement("div")
        divElement.classList.add('fTo-doTask')
        divElement.classList.add('task')
        divElement.draggable = true
        divElement.innerHTML = `
                    <h3>${taskTatle}</h3>
                    <p>${taskDesc}</p>
                    <button>Delete</button>
        `
        toDoSec.appendChild(divElement)
        document.querySelector('#fnewTaskTitle').value = "";
        document.querySelector('#snewTaskTitle').value = "";
        drag_drop()
        taskCount();
    })
}

function drag_drop() {
    let selectTask = null;
    for (const task of tasks) {
        task.addEventListener("drag", e => {
            selectTask = e.target;
        })
    }

    function drag_dropAffect(section) {
        section.addEventListener("dragenter", e => {
            e.preventDefault()
            section.classList.add('hover-over')
        })
        section.addEventListener("dragleave", e => {
            e.preventDefault()
            section.classList.remove('hover-over')
        })
        section.addEventListener("dragover", e => {
            e.preventDefault()
        })
        section.addEventListener("drop", e => {
            section.appendChild(selectTask)
            section.classList.remove('hover-over')
            selectTask = null;
            taskCount()
        })
    }
    drag_dropAffect(toDoSec)
    drag_dropAffect(inProgressSec)
    drag_dropAffect(doneSec)
}

function taskCount() {
    [toDoSec, inProgressSec, doneSec].forEach(col => {
        const tasks = col.querySelectorAll('.task')
        const count = col.querySelector(".count")

        taskData[col.id] = Array.from(tasks).map(t => {
            return {
                title: t.firstElementChild.innerText,
                desc: t.firstElementChild.nextElementSibling.innerText,
            }
        })

        localStorage.setItem("Tasks", JSON.stringify(taskData))

        count.innerHTML = tasks.length
    })
}

AddNewTask();
drag_drop();
taskCount()