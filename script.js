console.log("script start");
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

function AddNewTask() {
    AddNewTaskBtn.addEventListener("click", e => {
        console.log("clicked");
        AddTaskPopUp.classList.add('addTaskPopUp')
        AddTaskPopUp.classList.remove('fAddTaskPopUp')
        mainElement.style.opacity = "0.2"
    })
    newTaskSubmitBtn.addEventListener("click", e => {
        AddTaskPopUp.classList.remove('addTaskPopUp')
        AddTaskPopUp.classList.add('fAddTaskPopUp')
        mainElement.style.opacity = "1"
        let fInputValue = document.querySelector('#fnewTaskTitle').value
        let sInputValue = document.querySelector('#snewTaskTitle').value
        let divElement = document.createElement("div")
        divElement.classList.add('fTo-doTask')
        divElement.classList.add('task')
        divElement.draggable = true
        divElement.innerHTML = `
                    <h3>${fInputValue}</h3>
                    <p>${sInputValue}</p>
                    <button>Delete</button>
        `
        toDoSec.appendChild(divElement)
        fInputValue = null;
        sInputValue = null;

        //Delete Task
        let deleteBtns = sections.querySelectorAll("button")
        deleteBtns.forEach(e => {
            e.addEventListener("click", () => {
                e.parentNode.remove()
            })
        })
        drag_drop()
        taskCount();
    })
}

function drag_drop() {
    let tasks = document.querySelectorAll('.task')
    let selectTask = null;
    for (const task of tasks) {
        task.addEventListener("drag", e => {
            selectTask = e.target;
            taskCount();
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
            taskCount()
            selectTask = null;
        })
    }
    drag_dropAffect(toDoSec)
    drag_dropAffect(inProgressSec)
    drag_dropAffect(doneSec)
}

function taskCount() {
    let tasktodoSec = toDoSec.querySelectorAll('.task')
    let taskInprSec = inProgressSec.querySelectorAll('.task')
    let taskdoneSec = doneSec.querySelectorAll('.task')
    let taskCountTodoSec = toDoSec.querySelector('.to-doTC')
    let taskCountInPrSec = inProgressSec.querySelector('.inProgressTC')
    let taskCountDoneSec = doneSec.querySelector('.doneTC')
    for (let i = 0; i <= tasktodoSec.length; i++) {
        taskCountTodoSec.innerHTML = i
    }
    for (let i = 0; i <= taskInprSec.length; i++) {
        taskCountInPrSec.innerHTML = i
    }
    for (let i = 0; i <= taskdoneSec.length; i++) {
        taskCountDoneSec.innerHTML = i
    }
}

function main() {
    AddNewTask();
    drag_drop();
    taskCount();
}

main()
