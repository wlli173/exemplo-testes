const repository = require("../repositories/taskRepository");

let nextId = 1;

function addTask(title) {
    if (typeof title !== "string") {
        throw new Error("Titulo deve ser uma string");
    }

    if (!title) {
        throw new Error("Titulo obrigatorio");
    }

    if (title.length < 3) {
        throw new Error("Titulo muito curto");
    }

    if (title.length > 100) {
        throw new Error("Titulo muito longo");
    }

    const task = {
        id: nextId++,
        title,
    };

    repository.save(task);

    return task;
}

function getTasks() {
    return repository.findAll();
}

// Nova função deleteTask que deleta uma tarefa pelo id
function deleteTask(id) {
    const deleted = repository.delete(id);

    if (!deleted) {
        throw new Error("Tarefa nao encontrada");
    }
}

module.exports = {
    addTask,
    getTasks,
    deleteTask,
};
