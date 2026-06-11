const tasks = [];

function save(task) {
    tasks.push(task);
}

function findAll() {
    return tasks;
}

module.exports = {
    save,
    findAll
};