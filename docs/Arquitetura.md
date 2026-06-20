# Decisões Técnicas

## 1. Arquitetura SPA

O projeto foi desenvolvido como uma Single Page Application (SPA) devido à sua natureza simples e ao número reduzido de arquivos no projeto (Que priorizo muito).
A navegação foi implementada utilizando Hash Routing ("#") pela sua praticidade.

## 2. Integração Frontend e Backend

Como o frontend já estava estruturado em Vanilla JS, decidi fazer do PHP uma API responsável exclusivamente pela comunicação com o banco de dados.
As operações são realizadas através de requisições HTTP que usam da API `fetch()` do JS e recebem dados JSON.

## 3. Organização do Projeto

O código foi modularizado para separar responsabilidades.

* Frontend: interface, rotas e lógica de navegação.
* Backend: API PHP para operações CRUD.
* Banco de Dados: scripts de criação e população inicial.

## 3.5 Organização JS

Conforme fui desenvolvendo o projeto, percebi que o arquivo principal JS estava com muitas funções de diferentes lugares
Separei o JS no app.js que seria o principal, e o resto em modulos para diferentes features.

## 4. Migração para Banco de Dados

Inicialmente os produtos eram armazenados em um arquivo JavaScript (`productsData.js`).
Com a introdução do MySQL na segunda parte do trabalho, os dados passaram a ser persistidos em banco através de uma tabela de produtos e um script de seed.

## 5. Ambiente de Desenvolvimento

O Five Server foi utilizado inicialmente durante o desenvolvimento da SPA.
Posteriormente o ambiente foi migrado para XAMPP já que eu precisava executar partes do PHP relacionadas a integração com banco de dados, que aparentemente ele não suportava.

## 6. Estrutura do Backend

A camada backend segue uma abordagem simples de API.

* `db.php`: responsável pela conexão com o banco de dados usando PDO.
* Arquivos em `/api`: operações CRUD.
* Pasta `/database`: schema e seed do banco de dados.

Todos os endpoints tem a conexão centralizada feita no arquivo `db.php`.
