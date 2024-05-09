# Pagô API

Este projeto é uma aplicação back-end desenvolvida utilizando Node.js e Express, é uma API RESTful projetada para gerenciar usuários e carros com operações CRUD.

Visando a qualidade do código o projeto foi feito com **TypeScript**, uma separação de responsabilidades inspirada no **Repository Pattern**, **Tsyringe** para injeção de dependência tornando o código mais desacoplado e **Jest** para testes unitários.


A aplicação e o banco de dados são conteinerizados usando Docker.

## Arquitetura

A arquitetura é organizada em algumas pastas pra facilitar a escalabilidade. A pasta **Controllers** gerencia as requisições e respostas HTTP, delegando a lógica de negócios para os respectivos serviços e utilizando injeção de dependência. Na **Repositories** os repositórios abstraem o acesso a dados e seguem o padrão **Repository** pra manter a lógica de acesso a dados isolada da aplicação. **Routes** define as rotas do Express e por fim a pasta **Services** hospeda os use cases que implementam a lógica de negócios principal, aqui é onde lida com validações e interações com os repositórios. 

## Run

### Use o Docker Compose para iniciar os serviços.
```bash
docker-compose up -d
```

### Execute as migrações do banco de dados.
```bash
docker-compose exec app npx prisma migrate dev --name init
```

### Iniciar o Prisma Studio
O Prisma Studio é uma GUI para observar e manipular os dados do banco. Para iniciar o Prisma Studio execute:
```bash
yarn prisma studio
```
