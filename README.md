# Todo-listo - Backend API

API REST con NestJS para gestión de tareas con autenticación JWT.

## Tecnologías

- NestJS
- TypeORM + SQLite
- JWT + Passport
- Swagger

## Instalación
```bash
npm install
npm run start:dev
```

El servidor corre en `http://localhost:3000`

## Endpoints

### Auth

**POST** `/auth/register`
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

**POST** `/auth/login`
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Tasks (requiere token)

**POST** `/tasks`
```json
{
  "title": "Nueva tarea",
  "description": "Descripción",
  "completed": false
}
```

**GET** `/tasks` - Obtener todas mis tareas

**GET** `/tasks/:id` - Obtener tarea por ID

**PUT** `/tasks/:id` - Actualizar tarea

**DELETE** `/tasks/:id` - Eliminar tarea

## Uso

Todas las peticiones de tareas requieren el header:
```
Authorization: Bearer <token>
```

## Documentación

Swagger UI disponible en: `http://localhost:3000/api`