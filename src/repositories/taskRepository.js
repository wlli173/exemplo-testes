const tasks = [];

function save(task) {
    tasks.push(task);
}

function findAll() {
    return tasks;
}

function deleteById(id) {
    const index = tasks.findIndex((task) => task.id === id);

    if (index === -1) {
        return false;
    }

    tasks.splice(index, 1);
    return true;
}

module.exports = {
    save,
    findAll,
    delete: deleteById,
};
