console.log("script start");
const mainElement = document.querySelector('main')
const sections = document.querySelector('.sections')
const AddNewTaskBtn = document.querySelector('.rightNavBtn')
const AddTaskPopUp = document.querySelector('.addTaskPopUp')
const newTaskSubmitBtn = document.querySelector('#newTaskSubmitBtn')
const toDoSec = document.querySelector('.to-doSec')
let deleteBtns = sections.querySelectorAll("button")

function AddNewTask(){
    AddNewTaskBtn.addEventListener("click",e=>{
        console.log("clicked");
        AddTaskPopUp.style.opacity = "1"
        mainElement.style.opacity = "0.2"
    })
    newTaskSubmitBtn.addEventListener("click",e=>{
        AddTaskPopUp.style.opacity = "0"
        mainElement.style.opacity = "1"
        let fInputValue = document.querySelector('#fnewTaskTitle').value
        let sInputValue = document.querySelector('#snewTaskTitle').value
        let divElement = document.createElement("div")
        divElement.classList.add('fTo-doTask')
        divElement.innerHTML = `
                    <h3>${fInputValue}</h3>
                    <p>${sInputValue}</p>
                    <button>Delete</button>
        `
        toDoSec.appendChild(divElement)
            
        //Delete Task
        let deleteBtns = sections.querySelectorAll("button")
        deleteBtns.forEach(e=>{
            e.addEventListener("click",()=>{
                e.parentNode.remove()
            })
        })
    })
}

function main(){
    AddNewTask();
}

main()