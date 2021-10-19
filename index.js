const readline = require('readline')


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})


// Tarea: valor booleano y description
let taskList = []

function addTask(taskList, taskDescription) {
  taskList.push({done: false, description: taskDescription})
}

function printTaskList(taskList) {
    // [] Sacar la basura
    // [x] Lavar los platos
  for (let i = 0; i < taskList.length; ++i) {
      if (taskList[i].done) {
        // tarea realizada
        console.log((i + 1)+ '. [ x ] ' + taskList[i].description)

      }else{
        // tarea no realizada
        console.log((i + 1)+ '. [  ] ' + taskList[i].description)
      }
  }

}



// Primer modo: lectura de tareas necesarias 
function mod1(taskList) {
  rl.question('Introduce una nueva tarea ( fin si terminas )',(taskDesc) =>{
    
    switch (taskDesc) {
      case 'fin':
        console.log('No se introducen ya mas tareas')
        mod2(taskList)
        break
      case 'exit':
        rl.close()
        break
      default:
        addTask(taskList, taskDesc)
        console.log("La lista de tareas actual es: ")
        printTaskList(taskList)
        mod1(taskList)
        break
    }
  })
}

function markTaskAsDone(taskList, index) {
  if(index >=0 && index < taskList.length){
    taskList[index].done = true;
  }else{
    console.log('Invalid task number')
  }
}

function checkAllDone(taskList) {
    for (const task of taskList) {
        if (!task.done) return false;
    }
    return true;
}

function mod2(taskList) {
  printTaskList(taskList)
  rl.question('Que tarea haz realizado ? ( 1 - N )',(taskNumber) =>{
    
    switch (taskNumber) {
      case 'fin':
      case 'exit':
        console.log('Bye bye')
        rl.close()
        break
      default:
        markTaskAsDone(taskList, taskNumber - 1)
        // comprobar si estan todas las tareas hechas y cerrar el programa
        if (checkAllDone(taskList)) {
          console.log('Muy bien ! Has completado todo el trabajo ');
          rl.close()
        }else{
          mod2(taskList)
        }
        break
    }
  })
}

mod1(taskList)

//  Segundo modo: Marcar las tareas realizadas