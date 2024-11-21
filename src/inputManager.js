const readLine = require('readline')
const tasksManager = require('./tasksManager')

const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
})

function ManageInput()
{
    tasksManager.ShowTasks()
    rl.question('O que você deseja fazer?\n 1: Adicionar tarefa\n 2: Excluir tarefa\n 3: Confirmar tarefa (Ou desmarcar)\n 4: Sair do programa\n', data => {

        let answer = data.trim().toLowerCase()

        if (answer === null) return
        
        if (answer === '1')
        {
            rl.question('Digite a tarefa: ', data => {
                tasksManager.AddTask(data)
            })
        } else if (answer === '2')
        {
            rl.question('Digite o id da tarefa que deseja apagar: ', data => {
                tasksManager.RemoveTask(data)
            })
        } else if (answer === '3') 
        {
            rl.question('Digite o id da tarefa que deseja marcar como concluída: ', data => {
                tasksManager.ConcludeTask(data)
            })
        } else if (answer === '4')
        {
            console.log('Abortando programa!')
            process.exit()
        } else {
            ManageInput()
        }
    })
}

module.exports = {ManageInput}