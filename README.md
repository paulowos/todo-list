# Simple Note

### Simple note é um projeto full-stack de uma lista de tarefas (To-Do List)

<details>
<summary>Preview</summary>

- <details>
  <summary>Light Mode</summary>

  ![página de login](https://i.imgur.com/lzOWWUF.png)

  ![página principal](https://i.imgur.com/7JKlBcX.png)

  ![página de perfil](https://i.imgur.com/JDvKbXA.png)

  </details>

- <details>
  <summary>Dark Mode</summary>

  ![página de login](https://i.imgur.com/VnFtRW5.png)

  ![página principal](https://i.imgur.com/TFYn2QB.png)

  ![página de perfil](https://i.imgur.com/SFKv5nl.png)

  </details>

  </details>

---

<details>
<summary>Principais Ferramentas Utilizadas</summary><br>

- Docker
- Node
- React
- MySQL
- ExpressJS
- Tailwind CSS
- DaisyUI
- Mocha
- Chai
- Sinon
- Vitest
- React Testing Library
</details>

## Orientações

<details>
<summary> Como iniciar o projeto</summary><br>

> Na raiz do projeto já se encontra um arquivo docker-compose

> ⚠️ Antes de iniciar o projeto troque o nome do arquivo 'exemple.env' para '.env'\
> As configurações padrões para iniciar o projeto já estão definidas

```bash
# Na raiz do projeto, inicie os containers
docker compose up -d
```

</details>

<details>
<summary>Como testar o projeto</summary>

### Back-end

```bash
# Na raiz do projeto execute
docker exec -it backendSN bash
npm run lint # roda a verificação do linter
npm test # roda todos os testes
npm run coverage # roda a verificação de cobertura dos teste
exit # para sair do terminal do container
```

### Front-end

```bash
# Na raiz do projeto execute
docker exec -it frontendSN bash
npm run lint # roda a verificação do linter
npm test # roda todos os testes
npm run coverage # roda a verificação de cobertura dos teste
exit # para sair do terminal do container
```

</details>
