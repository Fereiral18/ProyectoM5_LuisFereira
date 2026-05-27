# 🛒 Ecommerce App

Aplicación ecommerce moderna desarrollada con **React + TypeScript**, utilizando **Firebase** para autenticación y servicios backend, y **AWS S3** para almacenamiento de archivos e imágenes.

---

# 🚀 Tecnologías Utilizadas

## Frontend

- React 19
- TypeScript
- React Router DOM
- Vite

## Backend & Servicios

- Firebase Authentication
- Firebase Firestore
- Firebase Functions
- Firebase Admin SDK

## Cloud & Storage

- AWS S3
- AWS SDK v3
- S3 Presigned URLs

## Herramientas de Desarrollo

- ESLint
- Babel
- TypeScript ESLint
- Vercel Node Runtime
- dotenv

---

# 📦 Dependencias Principales

## Producción

```json
"dependencies": {
  "@aws-sdk/client-s3": "^3.1054.0",
  "@aws-sdk/s3-request-presigner": "^3.1054.0",
  "@vercel/node": "^5.8.5",
  "dotenv": "^17.4.2",
  "firebase": "^12.13.0",
  "firebase-admin": "^13.10.0",
  "firebase-functions": "^7.2.5",
  "react": "^19.2.6",
  "react-dom": "^19.2.6",
  "react-router-dom": "^6.30.3"
}
```

## Desarrollo

```json
"devDependencies": {
  "@babel/core": "^7.29.0",
  "@eslint/js": "^10.0.1",
  "@rolldown/plugin-babel": "^0.2.3",
  "@types/babel__core": "^7.20.5",
  "@types/node": "^24.12.4",
  "@types/react": "^19.2.14",
  "@types/react-dom": "^19.2.3",
  "@vitejs/plugin-react": "^6.0.1",
  "babel-plugin-react-compiler": "^1.0.0",
  "eslint": "^10.3.0",
  "eslint-plugin-react-hooks": "^7.1.1",
  "eslint-plugin-react-refresh": "^0.5.2",
  "globals": "^17.6.0",
  "ts-node": "^10.9.2",
  "typescript": "~6.0.2",
  "typescript-eslint": "^8.59.2",
  "vite": "^8.0.12"
}
```

---

# 📁 Estructura del Proyecto

```bash
src
├── App.tsx
├── components
│   ├── admin
│   │   ├── AdminHeader.tsx
│   │   ├── AdminLayout.tsx
│   │   └── style.css
│   ├── CartModal.tsx
│   ├── CartWidget.tsx
│   ├── form
│   │   ├── AuthCard.tsx
│   │   └── style.css
│   ├── Header.tsx
│   ├── ListProducts
│   │   ├── ListProducts.tsx
│   │   └── style.css
│   ├── ShopLayout.tsx
│   └── styles.css
├── config
├── context
│   ├── auth.context.ts
│   ├── cart.context.ts
│   ├── cart.reducer.ts
│   └── products.context.ts
├── hooks
│   ├── useAnalitycs.ts
│   ├── useAuth.ts
│   ├── useAuthValidation.ts
│   ├── useCart.ts
│   ├── useDebaunce.ts
│   ├── useOrder.ts
│   └── useProducts.ts
├── lib
│   └── firebase.ts
├── main.tsx
├── pages
│   ├── admin
│   │   ├── adminPage
│   │   │   ├── AdminPage.tsx
│   │   │   └── style.css
│   │   ├── adminProductPage
│   │   │   ├── AdminProductPage.tsx
│   │   │   └── style.css
│   │   ├── EditProductPage
│   │   │   ├── EditProductPage.tsx
│   │   │   └── style.css
│   │   └── ProductsFormPage
│   │       ├── ProductFormPage.tsx
│   │       └── style.css
│   ├── Home
│   │   ├── HomePage.tsx
│   │   └── style.css
│   ├── login
│   │   └── LoginPage.tsx
│   ├── Products
│   │   ├── CardProducts.tsx
│   │   ├── ProductPage.tsx
│   │   └── style.css
│   └── Register
│       └── RegisterPage.tsx
├── providers
│   ├── AuthProviders.tsx
│   ├── CartProvider.tsx
│   ├── OrderProvider.tsx
│   ├── ProductsProvider.tsx
│   └── ProviderApp.tsx
├── routes
│   ├── AppRouters.tsx
│   ├── PrivatesRoutes.tsx
│   └── PrivatesRoute.tsx
├── services
│   ├── admin.service.ts
│   ├── auth.service.ts
│   ├── checkout.service.ts
│   ├── orders.service.ts
│   ├── product.service.ts
│   └── upload.service.ts
├── style.css
├── types
│   ├── authErrors.type.ts
│   ├── auth.type.ts
│   ├── cart.type.ts
│   ├── ordersStatus.type.ts
│   ├── order.type.ts
│   ├── products.type.ts
│   └── protected.type.ts
└── utils
    ├── calculatedTotals.ts
    ├── getReservedStock.ts
    ├── groupByDate.ts
    └── topProducts.ts

```

---

# ⚙️ Instalación

## 1. Clonar el repositorio

```bash
git clone https://github.com/tuusuario/ecommerce-app.git
```

## 2. Entrar al proyecto

```bash
cd ecommerce-app
```

## 3. Instalar dependencias

```bash
npm install
```

---

# 🔥 Configuración Firebase

Crear un archivo `.env` en la raíz del proyecto:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

---

# ☁️ Configuración AWS S3

Agregar las variables AWS:

```env
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=your_region
AWS_BUCKET_NAME=your_bucket_name
```

---

# ▶️ Scripts Disponibles

## Desarrollo

```bash
npm run dev
```

## Build Producción

```bash
npm run build
```

## Preview

```bash
npm run preview
```

## Linter

```bash
npm run lint
```

---

# 🔐 Funcionalidades

- Registro e inicio de sesión
- Autenticación con Firebase
- CRUD de productos
- Carrito de compras
- Checkout
- Upload de imágenes a AWS S3
- Gestión de usuarios
- Rutas protegidas
- Persistencia de sesión
- Responsive Design

---

# 🌐 Deploy

El proyecto puede desplegarse fácilmente en:

- Vercel: https://proyecto-m5-luis-fereira.vercel.app/
- Firebase Hosting
- AWS Amplify

---

# 📸 Capturas

```txt
Aquí puedes agregar screenshots del proyecto
```

---

# 🧪 Buenas Prácticas

- Arquitectura escalable
- Componentes reutilizables
- Separación de responsabilidades
- Uso de TypeScript para tipado fuerte
- Variables de entorno seguras
- Código modular

---

# 👨‍💻 Autor

Desarrollado por Luis Ferreira 🚀

---

# 📄 Licencia

Este proyecto está bajo la licencia MIT.