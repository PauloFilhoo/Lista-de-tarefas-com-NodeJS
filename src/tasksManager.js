const path = './tarefas.json'
const fs = require('fs')
const inputManager = require('./inputManager')


function AddTask(desc)
{
    const tarefas = LoadTasks()
    
    tarefas.ultimoId += 1
    const novaTarefa = {
        id: tarefas.ultimoId,
        desc,
        concluida: false
    }

    tarefas.tarefas.push(novaTarefa)
    SaveTask(tarefas)

    console.log('Tarefa adicionada com sucesso: ', novaTarefa)
}

function SaveTask(tarefas)
{
    try {
        fs.writeFileSync(path, JSON.stringify(tarefas, null, 2), 'utf8'); // Escreve os dados no arquivo
        console.log('Dados salvos com sucesso!');
    } catch (error) {
        console.error('Erro ao salvar os dados:', error);
    }}

function RemoveTask(id)
{
    let idValue = Number(id)

    const bancoTarefas = LoadTasks()

    const tarefaExistente = bancoTarefas.tarefas.filter(tarefa => tarefa.id === idValue)

    if (!tarefaExistente)
    {
        console.log(`Tarefa com o ID:${id} não encontrada.`)
        return
    }

    // Filtra as tarefas, removendo a tarefa com o id especificado
    const tarefasFiltradas = bancoTarefas.tarefas.filter(tarefa => tarefa.id !== idValue)

    bancoTarefas.tarefas = tarefasFiltradas
    SaveTask(bancoTarefas)
    console.log(`A tarefa com ID:${id} foi removida.`)
}

function ConcludeTask(id)
{
    let idValue = Number(id)

    const bancoTarefas = LoadTasks()

    const tarefaExistente = bancoTarefas.tarefas.filter(tarefa => tarefa.id === idValue)

    // if (tarefaExistente)
    // {
    //     tarefaExistente.concluida = true
    //     console.log(`A tarefa de id: ${idValue} foi concluída.`)
    //     SaveTask(bancoTarefas)
    // } else {
    //     console.log(`ID:${idValue} inválido! Tente novamente`)
    // }
    bancoTarefas.tarefas.forEach(e => {
        if (e.id === idValue)
        {
            e.concluida = !e.concluida
            SaveTask(bancoTarefas)
        } else {
            console.log('Tarefa não existente ou id inválido!')
        }
    })
}

function ShowTasks()
{
    const bancoTarefas = LoadTasks()

    console.log('Lista de tarefas:')
    console.log('---------------------------')
    bancoTarefas.tarefas.forEach(element => {
        console.log(`- ${element.id} ${element.desc} (${element.concluida ? 'Feita' : 'Não feita'})`)
    });
    console.log('---------------------------')
}

function LoadTasks()
{
    try {
        const data = fs.readFileSync(path, 'utf-8')
        return JSON.parse(data)
    } catch (error) {
        return { ultimoId: 0, tarefas: [] }
    }
}

module.exports = {AddTask, RemoveTask, ConcludeTask, LoadTasks, ShowTasks}