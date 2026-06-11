## Lista de Exercícios — Testes Automatizados

### Testes Unitários

1. Verifique que `addTask("Estudar")` retorna um objeto com as propriedades `id` e `title`.
2. Verifique que `addTask` lança erro `"Titulo obrigatorio"` quando chamada com string vazia `""`.
3. Verifique que `addTask` lança erro quando `title` é um número (ex: `addTask(42)`).
4. Verifique que `addTask` chama `repository.save` exatamente uma vez ao criar uma tarefa válida.
5. Verifique que `getTasks` retorna o valor que `repository.findAll` retorna (use `mockReturnValue`).
6. Adicione validação no service: títulos com menos de 3 caracteres devem lançar erro `"Titulo muito curto"`. Crie o teste antes de implementar (TDD).
7. Adicione validação: títulos com mais de 100 caracteres devem lançar erro `"Titulo muito longo"`. Cubra com teste unitário.
8. Implemente `deleteTask(id)` no service. Crie testes que verificam: (a) que `repository.delete` é chamado com o id correto; (b) que lança erro quando o id não existe.
9. Use `test.each` para testar múltiplos valores inválidos de `title` em um único bloco — inclua `null`, `undefined`, número, array e objeto.
10. Verifique que o `id` gerado por `addTask` é único entre duas chamadas consecutivas.

### Testes de Integração

1. Verifique que `GET /tasks` retorna status `200` e um array JSON.
2. Verifique que `POST /tasks` com `title` válido retorna status `201` e um objeto com `id` e `title`.
3. Verifique que `POST /tasks` sem `title` retorna status `400` e `{ error: "Titulo obrigatorio" }`.
4. Verifique que `POST /tasks` com `title` sendo um número retorna status `400`.
5. Verifique que após um `POST` bem-sucedido, o `GET /tasks` passa a incluir a tarefa criada.
6. Implemente e teste `DELETE /tasks/:id` — verifique status `204` para id válido e `404` para id inexistente.
7. Verifique que `POST /tasks` com título menor que 3 caracteres retorna status `400` e a mensagem de erro correta.
8. Adicione e teste uma rota `GET /tasks/:id` que retorna uma tarefa específica ou `404` se não encontrada.
9. Crie um `describe` separado com `beforeEach` que reseta o estado do repositório antes de cada teste — elimine dependências entre testes.
10. Use `test.each` para testar múltiplos payloads inválidos no `POST /tasks` em um único bloco de testes.

### Testes E2E

1. Verifique que a página contém o texto "Lista de Tarefas" em um `h1`.
2. Verifique que o campo `#title` está vazio e o botão "Adicionar" está visível ao carregar a página.
3. Adicione uma tarefa e verifique que ela aparece na lista.
4. Verifique que o campo `#title` fica vazio após adicionar uma tarefa.
5. Adicione 3 tarefas em sequência e verifique que a lista contém exatamente 3 itens `li`.
6. Verifique a ordem de inserção: adicione "Tarefa A" e "Tarefa B" e confirme que aparecem nessa ordem na lista.
7. Adicione uma tarefa, recarregue a página com `page.reload()` e verifique que ela ainda aparece na lista.
8. Adicione uma tarefa com caracteres especiais (`"Reunião às 18h & revisão"`) e verifique que é exibida corretamente.
9. **Primeiro implemente no frontend:** adicione suporte a pressionar `Enter` para submeter. Depois crie o teste E2E que valida esse comportamento usando `page.keyboard.press('Enter')`.
10. Configure o `playwright.config.js` para rodar os testes nos projetos `chromium`, `firefox` e `webkit`. Verifique que todos passam.

**Desafio extra (opcional):**

11. Use `page.route('/tasks', ...)` para interceptar o `GET /tasks` e retornar dados mockados. Verifique que o frontend renderiza corretamente sem depender do servidor.
12. Use `page.route('/tasks', route => route.abort())` para simular falha de rede. Implemente tratamento de erro no frontend e valide com Playwright que uma mensagem de erro é exibida.
13. Crie um teste com viewport mobile (375×667) e verifique que campo, botão e lista continuam funcionais.
14. Use `page.waitForResponse()` para medir o tempo do `POST /tasks` e verifique que a resposta chega em menos de 500ms.
15. Após adicionar uma tarefa, capture um screenshot com `page.screenshot()` e salve em `test-results/evidencias/` como prova de execução.

> **Desafio final:** Implemente a funcionalidade de exclusão de tarefas no frontend e no backend, e cubra o fluxo completo com pelo menos um teste de cada tipo: unitário (service), integração (rota `DELETE`) e E2E (clicar no botão de remover e verificar que o item some da lista).
