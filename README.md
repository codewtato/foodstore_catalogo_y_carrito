# Proyecto FoodStore

## Descripción breve del proyecto

Este es un proyecto de demostración desarrollado con **Vite** y **TypeScript**. Consiste en una tienda interactiva (FoodStore) que integra un catálogo de productos y un carrito de compras funcional, permitiendo gestionar la selección de artículos de manera dinámica en el lado del cliente (Frontend).

---

## Instrucciones para ejecutarlo

El proyecto utiliza `pnpm` como gestor de paquetes. Sigue estos pasos para levantarlo en tu entorno local:

### 1. Instalar pnpm (Opcional)
Si aún no tienes `pnpm` instalado en tu sistema, puedes hacerlo a través de `npm` (incluido con Node.js):
```bash
npm install -g pnpm
```

### 2. Instalar Dependencias
Abre una terminal en la raíz del proyecto y ejecuta el siguiente comando para descargar los paquetes necesarios:
```bash
pnpm install
```

### 3. Levantar el Proyecto
Inicia el servidor de desarrollo local ejecutando:
```bash
pnpm dev
```
La aplicación estará disponible en la URL que aparezca en tu terminal (generalmente `http://localhost:5173`).

---

## Estructura del Proyecto

```text
/
├── public/                   # Archivos estáticos públicos
├── src/
│   ├── data/                 # Datos mockeados de productos
│   ├── img/                  # Imágenes y recursos gráficos
│   ├── pages/
│   │   └── store/            # Lógica y vistas de la tienda
│   │       ├── cart/         # Módulo del carrito de compras
│   │       └── home/         # Módulo principal del catálogo
│   ├── types/                # Definición de interfaces y tipos TypeScript
│   ├── style.css             # Estilos globales
│   └── vite-env.d.ts         # Tipos globales de Vite
├── package.json              # Dependencias y scripts
├── vite.config.ts            # Configuración de Vite
└── README.md                 # Este archivo
```

## Link al video de YouTube

```text
https://youtu.be/1jd7qIaboiU?si=gd6SViJwnt8i9kW3

```