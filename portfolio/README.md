# Gabriel Bayer — portfolio

Nueva versión editorial del portfolio, construida con Astro, React y CSS. La aplicación vive en esta carpeta para conservar intactos `../index.html`, `../main.js`, `../css/` y `../assets/`.

## Desarrollo local

Requiere Node.js compatible con Astro (Node 22.23.4+ o una versión LTS posterior compatible; validado con Node 24).

```sh
cd portfolio
npm ci
npm run dev
```

Abrir `http://localhost:4321/` (inglés) o `http://localhost:4321/es/` (español). La aplicación escucha solo en la interfaz local. El selector de idioma conserva el ancla de sección.

```sh
npm run check
npm run build
npm run preview
```

`build` genera el sitio estático en `dist/`. `preview` permite revisar ese resultado localmente.

## Organización

- `src/pages/`: rutas estáticas en ambos idiomas.
- `src/components/`: layout editorial, secciones y componentes Astro.
- `src/components/ProjectCard.astro`: marco estático de cada ficha técnica, índice, título y categoría.
- `src/components/interactive/ProjectViews.tsx`: isla React reutilizable por proyecto. Alterna PROJECT VIEW / SYSTEM VIEW con fade y desplazamiento breve; estado independiente, semántica de tabs, flechas de teclado, Home y End. Se hidrata al entrar en pantalla.
- `src/components/interactive/ContactActions.tsx`: isla React de contacto. Copia el email y anuncia el resultado; el enlace `mailto:` funciona sin JavaScript.
- `src/data/projects.ts`: único listado de proyectos. CareConnect es el destacado, con stack frontend/backend, rol de backend, arquitectura y base de datos, y System View proporcionados por Gabriel. Bayer Scan está marcado como experimental / en desarrollo e incluye Python, Bash, Nmap, Rich y Linux; su workflow y sus cuatro modos actuales también fueron proporcionados por Gabriel. No se inventaron métricas ni despliegues.
- `src/data/site.ts`: nombre y enlaces de contacto.
- `src/data/capabilities.ts`: capacidades y herramientas.
- `src/i18n/`: textos de interfaz en inglés y español.
- `src/styles/`: tokens y CSS responsive. `projects.css` contiene el sistema visual de las fichas, separado del layout general.

PROJECT VIEW usa capturas reales guardadas localmente en `public/projects/`. `careconnect-app.jpg` se capturó desde la demo pública `https://cc-frontend-gold.vercel.app/`; `bayer-scan-terminal.png` es el archivo original de `https://github.com/GT-Bayer/bayer-scan/blob/main/screenshots/screenshot1.png`. Cada captura incluye su fuente y un enlace para verla completa. Los frames no usan iframes ni necesitan cargar imágenes de terceros al visitar el portfolio.

CareConnect tiene estado Live, rol Backend / Architecture / Database y botones separados para demo, frontend y backend. Su descripción refleja el marketplace de cuidadores visible en la demo. Bayer Scan conserva Experimental / In Development y sus cuatro modos: Fast Scan, Version Detection, Aggressive Scan y Host Discovery.

SYSTEM VIEW muestra los flujos proporcionados por Gabriel, separados de las capturas. CareConnect: React/Vite → HTTP/JSON → REST Controllers → Service Layer → JPA Repositories → MySQL/Flyway. Bayer Scan: Target → Scan Mode → Nmap → Python subprocess → Rich terminal output → Timestamped log. Las fuentes se sirven localmente desde los paquetes Fontsource.

## Contacto

Email directo y copia al portapapeles, con manejo de errores. No hay formulario de envío ficticio, backend ni credenciales. La copia requiere contexto seguro (HTTPS o localhost) y permiso del navegador; si falla, el email queda visible y el enlace de correo sigue funcionando.

## Preservación y publicación

La versión anterior sigue en la raíz. No se configuró un despliegue ni se reemplazó el sitio publicado. Para publicar en un subdirectorio habrá que configurar `base` en `astro.config.mjs` y confirmar el dominio para canonical, alternates y metadata social. Los enlaces internos y recursos propios respetan `BASE_URL`.

La navegación móvil usa `details`. Las fichas se renderizan en servidor en PROJECT VIEW: contenido, capturas, stack y enlaces funcionan sin JavaScript; un `noscript` con `details` permite consultar también el flujo técnico. El script de navegación agrega cierre con Escape, cierre al elegir sección, conservación del ancla al cambiar idioma y seguimiento de sección en escritorio.

## Verificación realizada

- `npm run check`: sin errores, advertencias ni sugerencias.
- `npm run build`: dos páginas estáticas generadas correctamente.
- Preview de producción: HTTP 200 en `/`, `/es/` y la hoja de estilos compilada; dos proyectos en cada idioma.
- Navegador: tabs independientes por proyecto, visibilidad de los paneles, navegación por flechas/Home/End, carga de capturas reales, cambio de idioma conservando sección, salto al contenido con teclado y copia del email.
- Responsive: revisión visual y sin desborde horizontal a 320, 390, 768 y 1280 píxeles de viewport.
- Menú móvil: abre, cierra al elegir sección y cierra con Escape devolviendo el foco al control.
- Consola de producción: sin errores ni advertencias durante el recorrido comprobado.
- Segunda pasada: no se ejecutaron comandos de Git. No se hicieron commits ni push.

Las capturas de revisión del portfolio se guardan en `verification/`, que está excluida del control de versiones. Las capturas de las aplicaciones usadas como contenido están en `public/projects/`. Los dos repositorios de CareConnect y su demo fueron proporcionados por Gabriel. No se publicó una nueva versión.
