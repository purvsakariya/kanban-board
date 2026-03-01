console.log("script start");
const AddNewTaskBtn = document.querySelector('.rightNavBtn')
const AddTaskPopUp = document.querySelector('.addTaskPopUp')

function AddNewTask(){
    AddNewTaskBtn.addEventListener("click",e=>{
        console.log("clicked");
        AddTaskPopUp.style.opacity = "1"
    })
}

function main(){
    AddNewTask();
}

main()