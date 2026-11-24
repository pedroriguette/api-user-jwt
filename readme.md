## Api com autenticação e autorização

### Api Restful que retorna, cadastra, atualiza e deleta usuários caso eles estejam autenticados e sejam administradores.

## Funcionalidades:

- Apenas Admin pode criar, atualizar e deletar usuários.
- Gerar token JWT para autenticação.
- Validar token JWT para autorização.
- Validar se o usuário é admin para permitir a criação, atualização e deleção de usuários.
- Usar bcryptjs para criptografar a senha do usuário.
- Usa postgreSQL para armazenar os dados dos usuários (sem ORM).
- Swagger para documentação da API.

## Dependências:

- bcryptjs
- express
- jsonwebtoken
- uuid
- dotenv
- postgres
- swagger

## Instalacão de dependências:

```bash
npm install
```

## Crie um usuario admin para usar os endpoints:

```bash
npm run createsuperuser
```

## Documentação no postman:
[Documentação api-user-jwt](https://documenter.getpostman.com/view/32095562/2sBYPv2rs9)
