# 📇 Aplicación de Gestión de Contactos

Una aplicación web moderna para gestionar contactos con operaciones CRUD completas, filtros avanzados y búsqueda en tiempo real.

![Next.js](https://img.shields.io/badge/Next.js-16.0.7-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Características

- ✅ **CRUD Completo**: Crear, leer, actualizar y eliminar contactos
- 🔍 **Búsqueda en tiempo real**: Filtra por nombre o correo electrónico
- 🏷️ **Filtros por estado**: Organiza contactos por Prospecto, Activo o Inactivo
- 📊 **Contador de resultados**: Visualiza cuántos contactos coinciden con tus filtros
- 🎨 **Interfaz moderna**: Diseño responsivo con Tailwind CSS
- ⚡ **Optimizado**: Uso de React hooks y memoización para mejor rendimiento
- 🔄 **Actualizaciones en tiempo real**: Cambios reflejados instantáneamente

## 🛠️ Tecnologías Utilizadas

### Frontend
- **[Next.js 16.0.7](https://nextjs.org/)** - Framework de React con App Router
- **[React 19](https://react.dev/)** - Biblioteca de UI
- **[TypeScript](https://www.typescriptlang.org/)** - Tipado estático
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework de CSS utility-first

### Backend
- **[Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)** - Endpoints RESTful
- **[Prisma ORM](https://www.prisma.io/)** - ORM para base de datos
- **Base de datos** - Compatible con PostgreSQL, MySQL, SQLite, etc.

### Herramientas de Desarrollo
- **[Turbopack](https://turbo.build/)** - Empaquetador ultrarrápido
- **ESLint** - Linter de código
- **Context API** - Gestión de estado global

## 📋 Prerequisitos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 18.0 o superior)
- **npm** o **yarn** o **pnpm**
- **Base de datos** (PostgreSQL, MySQL, SQLite, etc.)

## 🚀 Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/tu-repo.git
cd tu-repo
```

### 2. Instalar dependencias

```bash
npm install
# o
yarn install
# o
pnpm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# URL de conexión a la base de datos
# Ejemplo para PostgreSQL:
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/nombre_db?schema=public"

# Ejemplo para MySQL:
# DATABASE_URL="mysql://usuario:contraseña@localhost:3306/nombre_db"

# Ejemplo para SQLite (desarrollo):
# DATABASE_URL="file:./dev.db"
```

### 4. Configurar Prisma y la base de datos

Genera el cliente de Prisma:

```bash
npx prisma generate
```

Ejecuta las migraciones para crear las tablas:

```bash
npx prisma migrate dev --name init
```

*(Opcional)* Abre Prisma Studio para visualizar tu base de datos:

```bash
npx prisma studio
```

### 5. Ejecutar el proyecto en modo desarrollo

```bash
npm run dev
# o
yarn dev
# o
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

## 📁 Estructura del Proyecto

```
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── contactos/
│   │   │       ├── route.ts          # GET (listar) y POST (crear)
│   │   │       └── [id]/
│   │   │           └── route.ts      # GET, PUT, DELETE por ID
│   │   ├── layout.tsx
│   │   └── page.tsx                  # Página principal
│   ├── components/
│   │   └── contactoForm.tsx          # Formulario de contacto
│   ├── context/
│   │   └── contactoContext.tsx       # Context API para estado global
│   ├── lib/
│   │   └── prisma.ts                 # Instancia de Prisma Client
│   └── generated/
│       └── prisma/                   # Cliente generado por Prisma
├── prisma/
│   └── schema.prisma                 # Esquema de la base de datos
├── .env                              # Variables de entorno
└── package.json
```

## 🗄️ Esquema de Base de Datos

```prisma
model Contactos {
  id       BigInt  @id @default(autoincrement())
  nombre   String
  correo   String
  telefono String
  estado   String  // "prospecto" | "activo" | "inactivo"
}
```

## 🎯 Uso de la Aplicación

### Crear un contacto
1. Completa el formulario "Nuevo Contacto"
2. Ingresa nombre, correo, teléfono y selecciona un estado
3. Haz clic en "Guardar"

### Buscar contactos
- Usa la barra de búsqueda para filtrar por nombre o correo
- Los resultados se actualizan en tiempo real

### Filtrar por estado
- Haz clic en los botones: Todos, Prospecto, Activo o Inactivo
- El contador muestra cuántos contactos hay en cada categoría

### Editar un contacto
1. Haz clic en el botón "Editar" del contacto deseado
2. Modifica los campos en el formulario
3. Haz clic en "Actualizar"

### Eliminar un contacto
1. Haz clic en el botón "Eliminar"
2. Confirma la acción en el diálogo

### Limpiar filtros
- Haz clic en "Limpiar filtros" para resetear la búsqueda y filtros

## 🔌 API Endpoints

### Contactos

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/contactos` | Obtener todos los contactos |
| POST | `/api/contactos` | Crear un nuevo contacto |
| GET | `/api/contactos/[id]` | Obtener un contacto por ID |
| PUT | `/api/contactos/[id]` | Actualizar un contacto |
| DELETE | `/api/contactos/[id]` | Eliminar un contacto |

### Ejemplo de petición POST

```json
{
  "nombre": "Juan Pérez",
  "correo": "juan@example.com",
  "telefono": "555-1234",
  "estado": "prospecto"
}
```

## 🏗️ Build para Producción

```bash
# Construir la aplicación
npm run build

# Ejecutar en producción
npm start
```

## 🐛 Solución de Problemas

### Error con BigInt en JSON
Si experimentas errores con la serialización de BigInt, asegúrate de que todos los endpoints conviertan el `id` a string:

```typescript
const safeContacto = {
    ...contacto,
    id: contacto.id.toString(),
};
```

### Error de conexión a la base de datos
- Verifica que tu `DATABASE_URL` en `.env` sea correcta
- Asegúrate de que la base de datos esté corriendo
- Ejecuta `npx prisma migrate dev` para aplicar migraciones

### Cambios en el esquema de Prisma
Después de modificar `schema.prisma`:

```bash
npx prisma generate
npx prisma migrate dev --name descripcion_cambio
```

