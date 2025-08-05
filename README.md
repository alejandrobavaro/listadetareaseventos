# Documentación del Proyecto: Organizador de Boda

## 📌 Descripción General
Aplicación web para la organización integral de una boda, con funcionalidades para:
- Gestión de tareas (asignación, seguimiento y completado)
- Visualización del itinerario detallado
- Contacto con los organizadores
- Información importante para los invitados

## 🛠 Tecnologías Utilizadas

### Frontend
- **React** (v18+)
- **React Router** (v6+)
- **Bootstrap** (v5+)
- **SCSS** para estilos
- **Framer Motion** para animaciones
- **DnD Kit** para arrastrar y soltar tareas
- **React Icons** (Bootstrap Icons)

### Estructura del Proyecto
```
src/
├── assets/
│   └── scss/
│       ├── _01-General/          # Estilos globales
│       │   ├── _App.scss
│       │   ├── _SweetAlert.scss
│       │   └── _Toastify.scss
│       ├── _03-Componentes/      # Estilos por componente
│       │   ├── _Footer.scss
│       │   ├── _Header.scss
│       │   ├── _PInvitadosItinerario.scss
│       │   └── _POrgTareasBoda.scss
│       └── estilo.scss           # Archivo principal SCSS
├── componentes/
│   ├── Footer.jsx                # Pie de página
│   ├── Header.jsx                # Navegación principal
│   ├── PInvitadosItinerario.jsx  # Itinerario interactivo
│   └── POrgTareasBoda.jsx        # Gestor de tareas principal
├── App.jsx                       # Configuración de rutas
└── main.jsx                      # Punto de entrada
```

## ✨ Componentes Principales

### 1. `POrgTareasBoda.jsx`
**Funcionalidades:**
- ✅ Gestión completa de tareas organizadas por categorías
- 🎯 Asignación de tareas a los novios (Alejandro/Fabiola/Ambos)
- 📅 Fechas límite con alertas visuales
- 🔍 Sistema de filtrado avanzado (completadas/pendientes, asignación)
- ✨ Animaciones al completar tareas
- 📊 Estadísticas de progreso
- 🖱️ Arrastrar y soltar para reorganizar
- 💾 Persistencia en localStorage

**Tecnologías clave:**
- `@dnd-kit/core` y `@dnd-kit/sortable` para el drag and drop
- `framer-motion` para animaciones
- SCSS modular para estilos

### 2. `PInvitadosItinerario.jsx`
**Funcionalidades:**
- 🕒 Línea de tiempo interactiva de la boda
- ✈️ Efecto visual de avión animado
- 📸 Galería de imágenes por evento
- ℹ️ Detalles expandibles de cada actividad
- ⏳ Cuenta regresiva para la boda
- 📱 Diseño responsive

### 3. `Header.jsx`
- Barra de navegación responsive
- Menú hamburguesa para móviles
- Iconos intuitivos para cada sección
- Efectos visuales al interactuar

### 4. `Footer.jsx`
- Información de contacto
- Enlaces rápidos
- Créditos de desarrollo

## 🚀 Instalación y Uso

1. **Requisitos previos:**
   - Node.js (v16+)
   - npm (v8+)

2. **Instalación:**
   ```bash
   git clone [repo-url]
   cd wedding-organizer
   npm install
   ```

3. **Ejecución:**
   ```bash
   npm run dev
   ```

4. **Producción:**
   ```bash
   npm run build
   ```

## 🌟 Características Destacadas

### Para los Novios
- **Organización total**: Control de todas las tareas pendientes
- **Responsabilidades claras**: Asignación específica por persona
- **Progreso visual**: Gráficos de avance general
- **Recordatorios**: Alertas para tareas urgentes

### Para los Invitados
- **Información completa**: Todo sobre los eventos de la boda
- **Detalles prácticos**: Horarios, ubicaciones, actividades
- **Experiencia interactiva**: Línea de tiempo con fotos

## 🎨 Estilos y Diseño
- **Sistema de diseño modular** con SCSS
- **Variables globales** para colores y tipografía
- **Animaciones sutiles** para mejor UX
- **Totalmente responsive** (móvil, tablet, desktop)

## 📝 Guía de Estilos

### Variables SCSS Principales
```scss
// Colores
$primary: #8e44ad;
$secondary: #f39c12;
$light: #f8f9fa;
$dark: #343a40;

// Tipografía
$font-family-base: 'Open Sans', sans-serif;
$font-family-headings: 'Playfair Display', serif;

// Breakpoints
$breakpoint-sm: 576px;
$breakpoint-md: 768px;
$breakpoint-lg: 992px;
```

### Convención de Nombres
- `component-name` para contenedores principales
- `component-name__element` para elementos hijos
- `component-name--modifier` para variantes
- `is-active`, `has-error` para estados

## 📈 Roadmap Futuro
- [ ] Integración con calendario (Google Calendar)
- [ ] Sistema de RSVP digital
- [ ] Mapa interactivo de ubicaciones
- [ ] Galería de fotos compartida
- [ ] Chat para coordinación con proveedores

## 🤝 Contribución
1. Haz fork del proyecto
2. Crea tu rama (`git checkout -b feature/AmazingFeature`)
3. Haz commit de tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Haz push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

