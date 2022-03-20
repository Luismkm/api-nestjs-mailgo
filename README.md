<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## Descrição

API desenvolvido em NestJs, possui integração com RabbitMQ usando Docker.

## Rodar o projeto

Executar ```docker-compose up``` - Levanta todos os containers, inclusive o RabbitMQ.<br/>
Acesse [http://localhost:15672/](http://localhost:15672/) e faça login com admin/admin<br/>
Em exchanges é necessário dar ```bind``` na queue ```mail``` com routing key ```routermail```.

## Principais tecnologias utilizadas

- NestJs
- RabbitMQ
- Docker
- JWT
- Prisma
- Postgres