<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## Descrição

<p>API REST desenvolvido com NestJs.Sua principal funcionalidade e automatizar envios de e-mails marketing com geração de token para realização de unsubscribe.</p>

<p>Os destinatários são importados através de uma base de dados em CSV.
<br />
** Obs: O arquivo CSV precisa seguir o formato de colunas igual o CSV do repositório.
<br />
Caso seja alterado, a lógica de leitura do CSV deve ser alterada. **
</p>

## Requisito

- Docker

## Rodar o projeto

```bash
# clone
$ git clone https://github.com/Luismkm/api-nestjs-mailgo.git

# executar no diretório raiz
$ docker-compose up

```

Executar ```docker-compose up``` - Levanta todos os containers, inclusive o RabbitMQ.<br/>
Acesse [http://localhost:15672/](http://localhost:15672/) e faça login no RabbitMQ com admin/admin.<br/>
Em exchanges é necessário dar ```bind``` na queue ```mail``` com routing key ```routermail```.

## Principais tecnologias utilizadas

- NestJs
- RabbitMQ
- Docker
- JWT
- Prisma
- Postgres

---

<p align="center" style="padding-top: 15px;">Feito com 💜 by <strong><a href="https://www.linkedin.com/in/luismkm/" target="_blank">Luis Moraes</a></strong> </p>