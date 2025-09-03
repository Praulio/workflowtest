# CLAUDE-WORKFLOW.md - Sistema Completo de Desarrollo GitHub-First

## 📋 WORKFLOW PERMANENTE - Desarrollo GitHub-First

### 🚀 FASE 0: PLANIFICACIÓN CON BMAD (Antes de crear issues)

**Flujo de Planificación Completo:**

1. **GUÍA RÁPIDA**: Ejecuta `/bmad-guide` para ver opciones según tu contexto
2. **PLANIFICA**: Usa comandos BMAD para crear PRD completo con epics y stories
3. **CONVIERTE**: Usa `/gitcreate` para transformar epics en issues de GitHub
4. **EJECUTA**: Usa `/issue [número]` para trabajar cada issue (workflow existente)

**Comandos BMAD Esenciales:**
- `*analyst create comprehensive project brief` - Para proyectos nuevos
- `*analyst document-project` - Para analizar código existente
- `*pm define features and user stories` - Crear epics y stories
- `*architect design system architecture` - Definir arquitectura técnica
- `*po shard-doc docs/prd.md prd` - Fragmentar PRD en epics manejables

**Comandos de Integración:**
- `/bmad-guide` - Guía interactiva según contexto
- `/gitcreate [epic]` - Convierte epic en issues de GitHub

### 🎯 Filosofía Principal

Cada característica comienza con un issue de GitHub. El trabajo es atómico, testeable y fusionable. El contexto se mantiene limpio. Las pruebas son automatizadas y predecibles.

### ⚙️ Configuración de Rama de Trabajo

**RAMA CONFIGURADA**: main  
**FLUJO**: issue → feature-branch → PR → main

> Esta configuración se estableció durante el setup inicial. Todos los comandos del workflow usarán esta rama como base.

### 📍 El Workflow Completo

#### 1. CREAR ISSUE
```bash
gh issue create --title "Título descriptivo" --body "Descripción del problema"
```

#### 2. PROCESAR ISSUE
Usa el comando `/issue [número]` para:
- Leer detalles del issue
- Buscar contexto (context/SYSTEM-STATE, context/CHANGELOG, código base)
- Pensar con mayor profundidad para dividir en tareas
- Documentar plan en context/WORK-IN-PROGRESS.md
- **SIEMPRE crear una nueva rama**: `git checkout -b issue-[número]-[descripción]` (desde main)
- Implementar en pasos pequeños y testeados
- **PROBAR CON PUPPETEER** (ver Estrategia de Testing abajo)
- Crear PR cuando esté completo
- **AUTOMÁTICAMENTE proveer guía de VERIFICACIÓN DEL USUARIO** (ver plantilla abajo)

#### 3. TESTING AUTOMATIZADO CON PUPPETEER

##### Proceso de Decisión para Testing
```
SI la aplicación tiene autenticación:
  → Crear ruta de test en app/test/[característica]/page.tsx
  → Probar sin autenticación
  → Limpiar archivos de test antes del PR
SI NO:
  → Probar directamente en rutas principales
  → Usar Puppeteer para interacciones
  → Validar comportamiento
```

##### Implementación de Ruta de Test
```typescript
// Para rutas protegidas, crear: app/test/[característica]/page.tsx
"use client";
import ComponenteCaracterística from "@/app/dashboard/_components/característica";

export default function TestCaracterística() {
  return (
    <div className="test-wrapper">
      <ComponenteCaracterística />
    </div>
  );
}
```

##### Comandos de Testing con Puppeteer
```javascript
// Navegar y probar
puppeteer_navigate({ url: "http://localhost:3000/test/sidebar" });
puppeteer_screenshot({ name: "móvil", width: 375, height: 667 });
puppeteer_click({ selector: "button[aria-label='Menú']" });
puppeteer_screenshot({ name: "móvil-abierto", width: 375, height: 667 });
```

##### CRÍTICO: Limpiar Archivos de Test
```bash
# Antes de crear PR, SIEMPRE eliminar archivos de test:
rm -rf app/test app/api/test
git add -A && git commit -m "limpieza: Eliminar archivos de test"
```

#### 4. VERIFICACIÓN DEL USUARIO (Automático después de crear PR)
**IMPORTANTE**: Claude DEBE automáticamente proveer esta guía después de crear el PR.
El usuario NO debería necesitar pedirla. Esta guía incluye:
- Instrucciones detalladas de testing para el usuario
- Exactamente dónde ver los cambios
- Instrucciones paso a paso para probar
- Esperar confirmación del usuario antes de proceder

#### 5. REVISAR PR
Usa el comando `/review_pr [número]` para:
- Revisar código estilo Sandy Metz (simplicidad, claridad, DRY)
- Comentar directamente en GitHub
- Aprobar o solicitar cambios

#### 6. LIMPIEZA
Después de que el PR sea fusionado y el usuario confirme:
Usa el comando `/cleanup` que:
- **Verificaciones de seguridad primero** (cambios sin commit, commits sin push)
- **Protección del CHANGELOG** (verificar que las entradas se preserven)
- Cambiar a rama main y traer últimos cambios
- Eliminar cualquier archivo de test creado
- Agregar entrada a context/CHANGELOG-[YYYY-MM].md
- Actualizar context/SYSTEM-STATE.md si hay cambios arquitectónicos
- Eliminar context/WORK-IN-PROGRESS.md completamente
- Eliminar rama de característica local y remotamente (de forma segura)
- Verificar que el repositorio esté limpio para el siguiente issue
- Luego ejecutar `/clear` en Claude para reiniciar el contexto

### 📁 Sistema de Gestión de Contexto

#### context/SYSTEM-STATE.md (100 líneas máximo)
- Solo arquitectura de alto nivel
- Características y configuraciones principales
- Métricas de rendimiento
- **Actualizado**: Solo para cambios arquitectónicos

#### context/WORK-IN-PROGRESS.md (50 líneas máximo)
- Issue actual en el que se está trabajando
- Lista de tareas y progreso
- **Eliminado**: Después de cada fusión de PR

#### context/CHANGELOG-[YYYY-MM].md
**NUEVO FORMATO CON TRACKING DE EPICS:**

```markdown
# CHANGELOG - 2025-01

## 📊 EPICS TRACKING

### Epic 1: Foundation Setup
- **Estado**: ✅ Issues creados
- **Fecha**: 2025-01-30
- **Issues**: #1, #2, #3, #4, #5
- **Progreso**: 3/5 completados
- **PRs**: #6 (merged), #7 (merged), #8 (pending)

### Epic 2: Authentication  
- **Estado**: ⏳ Pendiente

### Epic 3: Core Features
- **Estado**: ⏳ Pendiente

---

## 📝 HISTORIAL DE CAMBIOS

## 2025-01-30 - Epic 1 iniciado
- Issues #1-#5 creados desde epic-1.md
- Sprint modular: foundation

## 2025-01-30 - PR #6: Setup inicial
- Configuración Next.js + TypeScript
- Estructura de carpetas
```

- **Sección EPICS TRACKING**: Estado de todos los epics del proyecto
- **Sección HISTORIAL**: Entradas cronológicas de cambios
- **Archivado**: Después de 3 meses
- **PROTEGIDO**: Usa estrategia `merge=union` para prevenir pérdida de datos

### 🛠️ Comandos del Proyecto

#### Desarrollo
```bash
npm run dev         # Iniciar servidor de desarrollo
npm run build       # Construcción de producción
npm run lint        # Ejecutar ESLint
npm run analyze     # Análisis del tamaño del bundle
```

#### Testing
```bash
npm run test        # Ejecutar tests unitarios con Vitest
npm run test:ui     # Abrir UI de Vitest
npm run test:run    # Ejecutar tests una vez (para CI)
npm run test:coverage # Generar reporte de cobertura
```

#### Operaciones Git
```bash
gh issue list       # Ver issues abiertos
gh pr list          # Ver PRs abiertos
gh pr checks        # Verificar estado de CI
```

### 📝 Estándares de Código

#### TypeScript
- Modo estricto habilitado
- Tipos de retorno explícitos para funciones
- Interfaces sobre tipos cuando sea posible
- Zod para validación en tiempo de ejecución

#### React/Next.js
- Componentes de servidor por defecto
- Componentes de cliente solo cuando sea necesario
- Usar patrones del app router
- Optimizar con React.memo con moderación

#### Base de Datos
- Uso de ORM con tipos seguros
- Migraciones rastreadas en git
- Sin SQL crudo sin justificación fuerte

#### Estilos
- Utilidades de Tailwind CSS primero
- Variantes de componentes con CVA
- Radix UI para componentes complejos
- Variables de tema en CSS

### ✅ Lista de Verificación de Sesión

#### Comenzando el Trabajo
- [ ] Leer context/SYSTEM-STATE.md para contexto de arquitectura
- [ ] Revisar context/WORK-IN-PROGRESS.md para trabajo en curso
- [ ] Usar `/issue [número]` para comenzar nueva característica
- [ ] Crear plan y esperar aprobación

#### Durante el Desarrollo
- [ ] Actualizar progreso en context/WORK-IN-PROGRESS.md
- [ ] Hacer cambios atómicos y simples
- [ ] Ejecutar tests antes de hacer commit
- [ ] Crear commits descriptivos
- [ ] Crear PR cuando esté completo
- [ ] **AUTOMÁTICAMENTE proveer GUÍA DE VERIFICACIÓN DEL USUARIO**

#### Antes de Fusionar PR
- [ ] Asegurar que se proveyó guía de verificación del usuario
- [ ] Esperar a que el usuario pruebe los cambios
- [ ] Esperar confirmación del usuario
- [ ] Eliminar archivos de test si se crearon

#### Después de Fusionar PR
- [ ] Ejecutar comando `/cleanup` (maneja toda la limpieza)
- [ ] Verificar en main con últimos cambios
- [ ] Limpiar contexto de Claude con `/clear`
- [ ] Listo para el siguiente issue

### 📋 Plantilla de GUÍA DE VERIFICACIÓN DEL USUARIO

Al presentar cambios al usuario, SIEMPRE incluir:

#### 🎯 Qué Cambió
- Puntos claros de lo que se implementó
- Elementos visuales agregados/modificados
- Mejoras de rendimiento

#### 📍 Dónde Ver los Cambios
```
URLs exactas:
- Desarrollo: http://localhost:3000/ruta/a/característica
- Página de test: http://localhost:3000/test/demo (si se creó)
```

#### 🔍 Cómo Probar

**Prueba Rápida**
1. Iniciar servidor de desarrollo: `npm run dev`
2. Navegar a: [URL específica]
3. Buscar: [cambios visuales específicos]

**Prueba Detallada (Red Lenta)**
1. Abrir DevTools: `F12` o `Ctrl+Shift+I` (Windows) / `Cmd+Option+I` (Mac)
2. Ir a pestaña "Network"
3. Cambiar "No throttling" → "Slow 3G"
4. Recargar página (F5)
5. Verificar estados de carga y transiciones

#### ✅ Lista de Verificación
- [ ] La característica funciona como se describe
- [ ] Sin errores en consola
- [ ] Responsivo en móvil
- [ ] Funciona con todos los temas
- [ ] Rendimiento aceptable

### 🚩 Recordatorios Importantes

#### HACER
✅ Crear issues atómicos de un solo propósito
✅ Escribir tests para nuevas características
✅ Mantener cambios pequeños y revisables
✅ Documentar decisiones arquitectónicas
✅ Limpiar contexto después de cada PR
✅ **SIEMPRE verificar cambios sin fusionar antes de eliminar ramas**

#### NO HACER
❌ Trabajar sin número de issue
❌ Saltarse tests "para ahorrar tiempo"
❌ Hacer refactorizaciones masivas
❌ Mantener contexto obsoleto
❌ Fusionar sin revisión
❌ **Eliminar ramas sin verificar cambios sin fusionar**

### 🎯 Referencia de Comandos Comunes

```bash
# GitHub CLI
gh issue create --title "Título" --body "Descripción"
gh issue list
gh issue view [número]
gh pr create --title "Título" --body "Descripción"
gh pr list
gh pr view [número]
gh pr checks

# Workflow de Git
git checkout -b issue-[número]-descripción
git add -A
git commit -m "tipo: descripción"
git push -u origin nombre-rama
git checkout main
git pull origin main
git branch -d rama-característica

# Testing
npm run test
npm run lint
npm run build

# Comandos de Claude
/issue [número]      # Comenzar a trabajar en un issue
/cleanup            # Limpieza post-fusión
/review_pr [número] # Revisar un PR
/clear              # Limpiar contexto de Claude
```

---

**Este workflow ahora es completamente autosuficiente. Después de la configuración inicial, los comandos estarán disponibles globalmente en ~/.claude/commands/ para todos los repositorios.**