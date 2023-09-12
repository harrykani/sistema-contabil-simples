# Sistema Contábil Simples
Esta APIRest foi desenvolvida durante o desafio do módulo 3 do curso de Desenvolvimento Back-End da Cubos Academy. Este projeto utiliza as tecnologias Node.js, Express, PostgreSQL, Jest.
API estruturada e desenvolvida em conjunto com o colaborador [Daniel Justo](https://github.com/danjusto).

---

## Preparações
- Para rodar a aplicação, entre no diretório da mesma e digite o seguinte comando no seu terminal.
```cmd
$ npm install 
```
- Renomeie o arquivo .env.example para .env e configure as variáveis de ambiente.
Lembre-se de realizar a conexão com um banco de dados **PostgreSQL**.

---

## **Visão Geral**
-   Cadastrar Usuário
-   Fazer Login
-   Detalhar Perfil do Usuário Logado
-   Editar Perfil do Usuário Logado
-   Listar categorias
-   Listar transações (Com filtro opcional de categoria)
-   Detalhar transação
-   Cadastrar transação
-   Editar transação
-   Remover transação
-   Obter extrato de transações
---
## **Endpoints**
### **Cadastrar Usuário**
#### `POST` `/usuario`
Essa é a rota que será utilizada para se cadastrar no sistema.
<details>
    <summary>
        <b>Requisição</b>
    </summary>

-    
    Sem parâmetros de rota ou de query.  
    O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

    -   nome
    -   email
    -   senha

```javascript
// POST /usuario
{
    "nome": "José",
    "email": "jose@email.com",
    "senha": "123456"
}
```
</details>
<details>
    <summary>
        <b>Resposta</b>
    </summary>

```javascript
// Sucesso -> HTTP Status 201 
{
    "id": 1,
    "nome": "José",
    "email": "jose@email.com"
}
```

```javascript
// Erro Esperado -> HTTP Status 400
{
    "mensagem": "Já existe usuário cadastrado com o e-mail informado."
}
```
</details>

---

### **Login do usuário**
#### `POST` `/login`
Essa é a que permite realizar o login no sistema.
<details>
    <summary>
        <b>Requisição</b>
    </summary>

-    
    Sem parâmetros de rota ou de query.  
    O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

    -   email
    -   senha
```javascript
// POST /login
{
    "email": "jose@email.com",
    "senha": "123456"
}
```
</details>
<details>
    <summary>
        <b>Resposta</b>
    </summary>

```javascript
// Sucesso -> HTTP Status 200
{
    "usuario": {
        "id": 1,
        "nome": "José",
        "email": "jose@email.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjIzMjQ5NjIxLCJleHAiOjE2MjMyNzg0MjF9.KLR9t7m_JQJfpuRv9_8H2-XJ92TSjKhGPxJXVfX6wBI"
}
```
```javascript
// Erro esperado -> HTTP Status 401
{
    "mensagem": "Usuário e/ou senha inválido(s)."
}
```
</details>

---

### **Detalhar usuário**
#### `GET` `/usuario`
Essa é a rota que permite obter os dados do seu próprio perfil.  
<details>
    <summary>
        <b>Requisição</b>
    </summary>

-   **Requisição**  
    Sem parâmetros de rota ou de query.  
    Não deverá possuir conteúdo no corpo da requisição.
```javascript
// GET /usuario
// Sem conteúdo no corpo (body) da requisição
```
</details>
<details>
    <summary>
        <b>Resposta</b>
    </summary>

```javascript
// Sucesso ->  HTTP Status 200
{
    "id": 1,
    "nome": "José",
    "email": "jose@email.com"
}
```

```javascript
// Erro esperado -> HTTP Status 400
{
    "mensagem": "Para acessar este recurso um token de autenticação válido deve ser enviado."
}
```
</details>

---

### **Atualizar usuário**
#### `PUT` `/usuario`
Essa é a rota que será chamada quando quiser realizar alterações no seu próprio usuário. 
<details>
    <summary>
        <b>Requisição</b>
    </summary>

-   **Requisição**  
    Sem parâmetros de rota ou de query.  
    O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

    -   nome
    -   email
    -   senha
```javascript
// PUT /usuario
{
    "nome": "José de Abreu",
    "email": "jose_abreu@email.com",
    "senha": "j4321"
}
```
</details>
<details>
    <summary>
        <b>Resposta</b>
    </summary>

```javascript
// Sucesso -> HTTP 204
// Sem conteúdo no corpo (body) da resposta
```
```javascript
// Erro esperado -> HTTP Status 400
{
    "mensagem": "O e-mail informado já está sendo utilizado por outro usuário."
}
```
</details>

---

### **Listar categorias**
#### `GET` `/categoria`
Essa é a rota que será chamada para listar todas as categorias cadastradas.
<details>
    <summary>
        <b>Requisição</b>
    </summary>

-   **Requisição**  
    Sem parâmetros de rota ou de query.  
    Não deverá possuir conteúdo no corpo da requisição.
```javascript
// GET /categoria
// Sem conteúdo no corpo (body) da requisição
```
</details>
<details>
    <summary>
        <b>Resposta</b>
    </summary>

```javascript
// Sucesso -> HTTP Status 200
[
    {
        id: 1,
        descricao: "Roupas",
    },
    {
        id: 2,
        descricao: "Mercado",
    }
]
```

```javascript
// Erro esperado -> HTTP Status 200 
[]
// Nenhuma categoria cadastrada
```
</details>

---

### **Listar transações do usuário**
#### `GET` `/transacao`
Essa é a rota que será chamada quando quiser listar todas as suas transações cadastradas.
<details>
    <summary>
        <b>Requisição</b>
    </summary>

-   **Requisição**  
    Sem parâmetros de rota ou de query.       
    Não deverá possuir conteúdo no corpo da requisição.            
    Parâmetro opcional do tipo query **filtro**.
```javascript
// GET /transacao
// GET /transacao?filtro[]=roupas&filtro[]=salários
// Sem conteúdo no corpo (body) da requisição
```    
</details>
<details>
    <summary>
        <b>Resposta</b>
    </summary>

```javascript
// GET /transacao
// Sucesso -> HTTP Status 200
[
    {
        id: 1,
        tipo: "saida",
        descricao: "Sapato amarelo",
        valor: 15800,
        data: "2022-03-23T15:35:00.000Z",
        usuario_id: 5,
        categoria_id: 4,
        categoria_nome: "Roupas",
    },
    {
        id: 3,
        tipo: "entrada",
        descricao: "Salário",
        valor: 300000,
        data: "2022-03-24T15:30:00.000Z",
        usuario_id: 5,
        categoria_id: 6,
        categoria_nome: "Salários",
    }
]
```
```javascript
// GET /transacao?filtro[]=roupas&filtro[]=salários
// Sucesso -> HTTP Status 200
[
    {
        id: 1,
        tipo: "saida",
        descricao: "Sapato amarelo",
        valor: 15800,
        data: "2022-03-23T15:35:00.000Z",
        usuario_id: 5,
        categoria_id: 4,
        categoria_nome: "Roupas",
    },
    {
        id: 3,
        tipo: "entrada",
        descricao: "Salário",
        valor: 300000,
        data: "2022-03-24T15:30:00.000Z",
        usuario_id: 5,
        categoria_id: 6,
        categoria_nome: "Salários",
    }
]
```
```javascript
// Erro esperado -> HTTP Status 200 
[]
// Nenhuma transação cadastrada
```
</details>

---

### **Detalhar uma transação do usuário**
#### `GET` `/transacao/:id`
Essa é a rota que será chamada quando quiser obter uma das suas transações cadastradas.
<details>
    <summary>
        <b>Requisição</b>
    </summary>

-   **Requisição**  
    Sem parâmetros de rota ou de query.  
    Não deverá possuir conteúdo no corpo da requisição.
```javascript
// GET url/transacao/2
```
</details>
<details>
    <summary>
        <b>Resposta</b>
    </summary>

```javascript
// Sucesso -> HTTP Status 200
{
    id: 2,
    tipo: "saida",
    descricao: "Sapato amarelo",
    valor: 15800,
    data: "2022-03-23T15:35:00.000Z",
    usuario_id: 5,
    categoria_id: 4,
    categoria_nome: "Roupas",
},
    
```
```javascript
// Erro esperado -> HTTP Status 404
{
    "mensagem": "Transação não encontrada."
}
```
</details>

---

### **Cadastrar transação para o usuário**
#### `POST` `/transacao`
Essa é a rota que será utilizada para cadastrar uma transação associada ao usuário.
<details>
    <summary>
        <b>Requisição</b>
    </summary>

-   **Requisição**  
    Sem parâmetros de rota ou de query.  
    O corpo (body) da requisição deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

    -   descricao
    -   valor
    -   data
    -   categoria_id
    -   tipo (campo que será informado se a transação corresponde a uma saída ou entrada de valores)
```javascript
// POST /transacao
{
    "tipo": "entrada",
    "descricao": "Salário",
    "valor": 300000,
    "data": "2022-03-24T15:30:00.000Z",
    "categoria_id": 6
}
```
</details>
<details>
    <summary>
        <b>Resposta</b>
    </summary>

```javascript
// Sucesso -> HTTP Status 201
{
    "id": 3,
    "tipo": "entrada",
    "descricao": "Salário",
    "valor": 300000,
    "data": "2022-03-24T15:30:00.000Z",
    "usuario_id": 5,
    "categoria_id": 6,
    "categoria_nome": "Salários",
}
    
```
```javascript
// Erro esperado -> HTTP Status 400
{
    "mensagem": "Todos os campos obrigatórios devem ser informados."
}
```
</details>

---

### **Atualizar transação do usuário**
#### `PUT` `/transacao/:id`
Essa é a rota que será chamada quando o usuario quiser atualizar uma das suas transações cadastradas.
<details>
    <summary>
        <b>Requisição</b>
    </summary>

-   **Requisição**  
    Deverá ser enviado o ID da transação no parâmetro de rota do endpoint.  
    O corpo (body) da requisição deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

    -   descricao
    -   valor
    -   data
    -   categoria_id
    -   tipo (campo que será informado se a transação corresponde a uma saída ou entrada de valores)
```javascript
// PUT /transacao/2
{
	"descricao": "Sapato amarelo",
	"valor": 15800,
	"data": "2022-03-23 12:35:00",
	"categoria_id": 4,
	"tipo": "saida"
}
```
</details>
<details>
    <summary>
        <b>Resposta</b>
    </summary>

```javascript
// Sucesso -> HTTP Status 204
// Sem conteúdo no corpo (body) da resposta
```
```javascript
// Erro esperado -> HTTP Status 400
{
    "mensagem": "Todos os campos obrigatórios devem ser informados."
}
```
</details>

---

### **Excluir transação do usuário**
#### `DELETE` `/transacao/:id`
Essa é a rota que será chamada quando o usuario quiser excluir uma das suas transações cadastradas.
<details>
    <summary>
        <b>Requisição</b>
    </summary>

-   **Requisição**  
    Deverá ser enviado o ID da transação no parâmetro de rota do endpoint.  
    O corpo (body) da requisição não deverá possuir nenhum conteúdo.
```javascript
// DELETE /transacao/2
// Sem conteúdo no corpo (body) da requisição
```
</details>
<details>
    <summary>
        <b>Resposta</b>
    </summary>

```javascript
// Sucesso -> HTTP Status 204
// Sem conteúdo no corpo (body) da resposta
```
```javascript
// Erro esperado -> HTTP Status 404
{
    "mensagem": "Transação não encontrada."
}
```
</details>

---

### **Obter extrato de transações**
#### `GET` `/transacao/extrato`
ssa é a rota que será chamada quando o usuario quiser obter o extrato de todas as suas transações cadastradas.
<details>
    <summary>
        <b>Requisição</b>
    </summary>

-   **Requisição**  
    Sem parâmetros de rota ou de query.  
    O corpo (body) da requisição não deverá possuir nenhum conteúdo.
```javascript
// GET /transacao/extrato
// Sem conteúdo no corpo (body) da requisição
```
</details>
<details>
    <summary>
        <b>Resposta</b>
    </summary>

```javascript
// Sucesso -> HTTP Status 200
{
	"entrada": 300000,
	"saida": 15800
}
```
</details>

---
