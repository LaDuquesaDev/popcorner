# 🎬 Popcorner App

Una experiencia móvil para los amantes del cine.

Explora películas, descubre detalles y crea tu propia lista de películas por ver, todo con un enfoque en calidad de código, arquitectura escalable y una experiencia de usuario única.

---

## 🚀 Objetivo del Proyecto

Esta aplicación móvil fue desarrollada utilizando **React Native CLI**, **TypeScript** y librerías modernas como **React Navigation**, **Zustand** y **TanStack Query**.

Su propósito es consumir eficientemente la API pública de **The Movie DB**, permitiendo explorar películas mediante scroll infinito, visualizar detalles, aplicar filtros avanzados por letra y gestionar una lista personalizada de "películas por ver" (watchlist).

---

## ✅ Requisitos del Sistema

Antes de ejecutar el proyecto, asegúrate de tener lo siguiente instalado en tu entorno de desarrollo:

### Sistema operativo:
- macOS (por requerimientos de ejecución en iOS)

### Dependencias básicas:
- [Node.js](https://nodejs.org/en/) (versión recomendada: ≥ 18.x)
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/) o [npm](https://www.npmjs.com/) 
- [Xcode](https://developer.apple.com/xcode/) (con Xcode Command Line Tools instalados)
- [CocoaPods](https://guides.cocoapods.org/using/getting-started.html) (`brew install cocoapods`)
- React Native CLI (no Expo)

> ⚠️ Si no tienes el entorno de desarrollo de React Native configurado para iOS, sigue la [guía oficial](https://reactnative.dev/docs/environment-setup) (modo React Native CLI).

---

## 📦 Instalación paso a paso

Sigue estos pasos para ejecutar **Popcorner App** en un entorno local iOS:

### 1. Clona el repositorio

```bash
git clone https://github.com/tu-usuario/popcorner.git
cd popcorner
```

### 2. Instala las dependencias del proyecto
```bash
yarn install
# o
npm install
```

### 3. Instala dependencias nativas con CocoaPods
```bash
cd ios
pod install
cd ..
```

---

## ▶️ Ejecución del proyecto en iOS

Asegúrate de tener Xcode abierto al menos una vez, con una versión de simulador instalada.

Ejecutar en el simulador iOS
```bash
npx react-native run-ios
```

Esto abrirá el simulador de iOS y compilará la app. La primera vez puede tardar algunos minutos.

---

## 🛠️ Variables de entorno

Este proyecto utiliza la API de The Movie DB, por lo tanto, necesitarás una clave personal.

### 1. Crea un archivo .env en la raíz del proyecto:
```bash
TMDB_API_KEY=tu_api_key_aqui
```

### 2. Puedes obtener tu API key registrándote en:
https://www.themoviedb.org/settings/api

> ⚠️ Asegúrate de no hacer commit de tu archivo .env.

---

## 🧪 Funcionalidades principales implementadas

- Listado de películas con scroll infinito.
- Vista detallada con géneros, actores y descripción.
- Filtro por letra con validaciones avanzadas (géneros + reparto balanceado).
- Watchlist persistente usando Zustand.
- Navegación fluida entre pantallas con React Navigation.
- Manejo eficiente de datos con TanStack Query.

---

## 📂 Estructura del proyecto
```bash
src/
│
├── components/       # Componentes reutilizables
├── constants/        # Constantes para usar de manera global
├── hooks/            # Custom hooks (ej: useMovies)
├── navigation/       # Configuración de React Navigation
├── screens/          # Pantallas principales
├── services/         # Llamadas a servicios externos (TMDB)
├── store/            # Zustand store (estado global)
├── types/            # Tipado global con TypeScript
├── utils/            # Utilidades y helpers
```

---

## 💡 Notas adicionales

- La aplicación está configurada exclusivamente para iOS en esta versión. Para Android sería necesario realizar ajustes adicionales.
- Se realizó una configuración responsive para que la interfaz se adapte de forma óptima a distintos tamaños de pantalla, garantizando una experiencia de usuario coherente en cualquier dispositivo iOS.
- Se realizaron commits frecuentes durante el desarrollo para reflejar el proceso y decisiones técnicas.
- Se priorizó la legibilidad, buenas prácticas de arquitectura y mantenibilidad del código.

---

## 🧠 Reflexión final

Más que solo cumplir con un set de tareas, este proyecto busca reflejar una manera de pensar enfocada en la escalabilidad, claridad y empatía por la experiencia del usuario y del desarrollador que mantendrá el código mañana.

Gracias por tu tiempo explorando Popcorner App 🎬✨
