const repository = require("../repositories/taskRepository");

function addTask(title) {

    if (!title) {
        throw new Error("Título obrigatório");
    }

    if (typeof title !== 'string') {
        throw new Error("Título deve ser uma string");
    }

    const task = {
        id: Date.now(),
        title
    };

    repository.save(task);

    return task;
}

function getTasks() {
    return repository.findAll();
}

module.exports = {
    addTask,
    getTasks
};