jest.mock("../../repositories/taskRepository", () => ({
    save: jest.fn(),
    findAll: jest.fn()
}));

const repository = require("../../repositories/taskRepository");
const taskService = require("../../services/taskService");

describe("Task Service", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("deve criar tarefa", () => {

        const tarefa = taskService.addTask("Estudar");

        expect(tarefa.title).toBe("Estudar");

        expect(repository.save)
            .toHaveBeenCalledTimes(1);

        expect(repository.save)
            .toHaveBeenCalledWith(tarefa);

    });

    test("deve lançar erro sem título", () => {

        expect(() => {
            taskService.addTask("");
        }).toThrow("Título obrigatório");

        expect(repository.save)
            .not.toHaveBeenCalled();

    });

    test("deve listar tarefas", () => {

        repository.findAll.mockReturnValue([
            { id: 1, title: "Tarefa 1" },
            { id: 2, title: "Tarefa 2" }
        ]);

        const tarefas = taskService.getTasks();

        expect(tarefas).toHaveLength(2);

        expect(repository.findAll)
            .toHaveBeenCalledTimes(1);

    });

});