// mock do repositório de tarefas para isolar os testes do serviço de tarefas reais da aplicação
jest.mock("../../src/repositories/taskRepository", () => ({
    save: jest.fn(),
    findAll: jest.fn(),
    delete: jest.fn(),
}));

const repository = require("../../src/repositories/taskRepository");
const taskService = require("../../src/services/taskService");

// Serviço de tarefas (taskService) é testado isoladamente, sem depender do repositório real
describe("Task Service", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // Testes para a função addTask
    test('addTask("Estudar") retorna objeto com propriedades id e title', () => {
        const task = taskService.addTask("Estudar");

        expect(task).toHaveProperty("id");
        expect(task).toHaveProperty("title");
        expect(task.title).toBe("Estudar");
    });

    // Testes para a função addTask com títulos inválidos
    test('addTask("") lança erro "Titulo obrigatorio"', () => {
        expect(() => taskService.addTask("")).toThrow("Titulo obrigatorio");
        expect(repository.save).not.toHaveBeenCalled();
    });
    
    // Testes para a função addTask com títulos inválidos
    test("addTask(42) lança erro quando title é um número", () => {
        expect(() => taskService.addTask(42)).toThrow();
        expect(repository.save).not.toHaveBeenCalled();
    });

    // Testes para a função addTask verificando se repository.save é chamado corretamente
    test("addTask chama repository.save exatamente uma vez ao criar tarefa válida", () => {
        const task = taskService.addTask("Estudar");

        expect(repository.save).toHaveBeenCalledTimes(1);
        expect(repository.save).toHaveBeenCalledWith(task);
    });

    // Testes para a função getTasks
    test("getTasks retorna o valor que repository.findAll retorna", () => {
        const mockTasks = [
            { id: 1, title: "Tarefa 1" },
            { id: 2, title: "Tarefa 2" },
        ];
        repository.findAll.mockReturnValue(mockTasks);

        const tasks = taskService.getTasks();

        expect(tasks).toBe(mockTasks);
        expect(repository.findAll).toHaveBeenCalledTimes(1);
    });

    // Testes para a função addTask com títulos inválidos
    test('título com menos de 3 caracteres lança erro "Titulo muito curto"', () => {
        expect(() => taskService.addTask("ab")).toThrow("Titulo muito curto");
        expect(repository.save).not.toHaveBeenCalled();
    });

    // Testes para a função addTask com títulos inválidos
    test('título com mais de 100 caracteres lança erro "Titulo muito longo"', () => {
        const longTitle = "a".repeat(101);

        expect(() => taskService.addTask(longTitle)).toThrow("Titulo muito longo");
        expect(repository.save).not.toHaveBeenCalled();
    });

    // Testes para a função deleteTask
    test("deleteTask chama repository.delete com o id correto", () => {
        repository.delete.mockReturnValue(true);

        taskService.deleteTask(42);

        expect(repository.delete).toHaveBeenCalledTimes(1);
        expect(repository.delete).toHaveBeenCalledWith(42);
    });

    // Testes para a função deleteTask quando o id não existe
    test("deleteTask lança erro quando o id não existe", () => {
        repository.delete.mockReturnValue(false);

        expect(() => taskService.deleteTask(999)).toThrow();
        expect(repository.delete).toHaveBeenCalledWith(999);
    });

    // Teste para verificar se o id gerado por addTask é único entre duas chamadas consecutivas
    test("id gerado por addTask é único entre duas chamadas consecutivas", () => {
        const task1 = taskService.addTask("Primeira tarefa");
        const task2 = taskService.addTask("Segunda tarefa");

        expect(task1.id).not.toBe(task2.id);
    });

    // Teste para verificar se addTask lança erro quando title é null, undefined, número, array ou objeto
    test.each([
        ["null", null],
        ["undefined", undefined],
        ["número", 42],
        ["array", ["tarefa"]],
        ["objeto", { title: "tarefa" }],
    ])("addTask rejeita title inválido: %s", (_label, invalidTitle) => {
        expect(() => taskService.addTask(invalidTitle)).toThrow();
        expect(repository.save).not.toHaveBeenCalled();
    });

    
});
