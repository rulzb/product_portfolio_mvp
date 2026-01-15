# **Especificaciones de Diseño Visual y Componentes UI**

**Estilo General:** Minimalismo Industrial.

* **Tipografía:** Sans-serif (Inter o SF Pro). Títulos en negrita suave, cuerpos en gris oscuro.  
* **Bordes:** Finos (1px), color gris claro (\#E5E7EB).  
* **Sombras:** Muy sutiles, solo para elementos flotantes (Modales, Popovers).  
* **Esquinas:** Ligeramente redondeadas (rounded-lg o rounded-xl).

## **1\. Pantalla: Login / Autenticación**

**Layout:** Split Screen (Pantalla dividida 50/50).

### **Panel Izquierdo (Interacción)**

* **Contenedor:** Centrado vertical y horizontalmente. Padding amplio.  
* **Componentes:**  
  * **Logo:** Icono simple \+ Nombre del producto (arriba a la izquierda).  
  * **H1 (Título):** "Bienvenido de nuevo".  
  * **Subtítulo:** Texto gris: "Ingresa para ver tus correlaciones."  
  * **Botones SSO (Stack Vertical):**  
    * Botón "Continuar con Google" (Icono G \+ Texto, borde gris, fondo blanco).  
    * Botón "Continuar con GitHub" (Icono GH \+ Texto, fondo negro, texto blanco).  
  * **Separador:** Línea horizontal con texto "O ingresa con email" en medio.  
  * **Input Email \+ Botón Arrow:** Un solo campo unificado para Magic Link.

### **Panel Derecho (Visual Hook)**

* **Fondo:** Color solido suave (Gris muy claro o un gradiente sutil casi imperceptible).  
* **Componente Hero:** Una abstracción del dashboard. Una tarjeta flotante mostrando un gráfico de línea con un punto de "Insight" resaltado. Sin texto real, solo formas (skeletons) para evocar la funcionalidad.

## **2\. Pantalla: Setup Wizard (Onboarding)**

**Layout:** Single Column Focus (Columna central estrecha, máx 600px).

### **Estructura**

* **Stepper (Progreso):** Indicador visual arriba (Paso 1 de 3). Puntos simples conectados por líneas.

### **Paso 1: Conectar Ejecución (Source)**

* **Grid de Tarjetas (2 columnas):**  
  * **Card Component:** Icono de la herramienta (Jira/GitHub) centrado.  
  * **Estado:** Borde gris por defecto. Al seleccionar \-\> Borde Azul \+ Check en la esquina.  
* **Input API Key (Condicional):** Aparece debajo si se selecciona la herramienta. Campo tipo password con botón de "ojo" para revelar.

### **Paso 2: Conectar Datos (Outcome)**

* **Grid de Tarjetas:** Similar al anterior (Amplitude, GA4, Custom JSON).  
* **Opción Manual:** Enlace de texto simple abajo: "No tengo datos conectados aún, prefiero subir CSV".

### **Footer de Navegación**

* **Botones:** "Atrás" (Ghost button) y "Continuar" (Solid primary button).

## **3\. Pantalla: Unified Timeline (Dashboard Principal)**

**Layout:** Dashboard Grid (Header fijo \+ Sidebar colapsable o fija a la derecha).

### **Header (Barra Superior)**

* **Breadcrumbs:** Organización / Proyecto Actual.  
* **Date Range Picker:** Botón con icono de calendario. Texto: "Últimos 7 días".  
* **Actions:** Botón secundario "Configuración" (Icono engranaje) y Botón Primario pequeño "+ Evento" (Abre el modal).

### **Zona Central (El Gráfico Sincronizado)**

* **Eje X Compartido:** Una línea de tiempo en la parte inferior.  
* **Swimlane Superior (Ejecución):**  
  * Altura fija (ej. 100px).  
  * **Componente "Event Maker":** Iconos pequeños (círculos de 24px) posicionados en la línea de tiempo.  
    * *Icono Cohete:* Deploys.  
    * *Icono Bug:* Incidentes.  
  * **Hover Card:** Al pasar el mouse sobre un icono, aparece una tarjeta negra pequeña con detalles: "v2.1 \- 3 Commits".  
* **Chart Inferior (Resultados):**  
  * Gráfico de Área (Area Chart) con degradado suave.  
  * **Cursor Sincronizado:** Una línea vertical punteada que atraviesa AMBOS carriles (Swimlane y Chart) al mover el mouse, para ver la alineación exacta.

### **Sidebar Derecha (Feed de IA)**

* **Título:** "AI Insights" (con un badge de contador).  
* **Cards de Alerta:**  
  * Estilo: Tarjetas con borde izquierdo de color según severidad.  
  * *Rojo:* Caída crítica.  
  * *Amarillo:* Anomalía leve.  
  * *Azul:* Información/Release.  
  * **Contenido:** Título corto ("Caída en conversión") \+ Timestamp ("Hace 2h").

## **4\. Pantalla: Insight Detail (Overlay)**

**Layout:** Side Sheet o Modal (Panel deslizante desde la derecha, ocupando 40% de la pantalla). Fondo oscurecido.

### **Header del Modal**

* **Severity Badge:** "Impacto Alto" (Rojo).  
* **Título Grande:** Generado por IA (ej. "Deploy v2.1 coincide con caída de usuarios").  
* **Botón Cerrar:** Icono X en la esquina superior derecha.

### **Cuerpo (Evidencia)**

* **Sección Contexto:** Texto explicativo corto ("Detectamos un patrón inusual...").  
* **Bloque de Comparación (Split View):**  
  * **Izquierda (Causa):** Lista de items compacta.  
    * *Commit Item:* Hash corto (a1b2c), Avatar del autor, Mensaje del commit.  
  * **Derecha (Efecto):**  
    * *Micro-Chart:* Un recorte del gráfico principal mostrando solo el momento del incidente (zoom in).  
    * *Stat:* Delta en grande ("-15%").

### **Footer (Acciones)**

* **Feedback Loop:** Pregunta "¿Es correcta esta correlación?".  
* **Botones:** "Sí, confirmar causa" (Verde suave), "No, descartar" (Gris).

## **5\. Pantalla: Manual Input Modal**

**Layout:** Center Modal (Pequeño, centrado).

### **Estructura**

* **Título:** "Registrar Evento Externo".  
* **Formulario (Vertical Stack):**  
  * **Label:** "Nombre del Evento". **Input:** Texto simple.  
  * **Label:** "Categoría". **Select/Dropdown:** Opciones con iconos de colores (Marketing 🟣, Incidente 🔴, Infraestructura 🔵).  
  * **Label:** "¿Cuándo ocurrió?". **Date/Time Picker:** Input doble.  
  * **Label:** "Descripción (Opcional)". **Textarea:** Altura pequeña.  
* **Footer:**  
  * Botón "Cancelar" (Ghost).  
  * Botón "Guardar Evento" (Primary / Negro).

## **6\. Pantalla: Portfolio Overview (Resumen de Productos)**

**Layout:** Responsive Container con dos modos de visualización: Grid (Tarjetas) o Table (Lista densa).

### **Header de Vista**

* **Título:** "Portfolio Overview".  
* **Controles (Toolbar):**  
  * **View Switcher:** Toggle segmentado o botones de icono (Grid vs List/Table). Estado activo resaltado con fondo gris suave y borde.  
  * **Filtro:** Dropdown simple ("Todos los equipos", "Mis Favoritos").  
  * **Action:** Botón secundario "+ Nuevo Producto".

### **A. Modo Grid (Product Cards)**

* **Contenedor:** Grilla responsiva (1 col móvil \-\> 3 cols desktop).  
* **Componente Tarjeta:**  
  * **Contenedor:** Fondo blanco, borde gris fino (border-gray-200). Hover: Sombra suave (shadow-sm) y borde ligeramente más oscuro (border-gray-300). Cursor pointer (lleva al Timeline).  
  * **Header:** Icono/Logo (32px) \+ Título (Negrita) \+ Status Badge (Punto de color).  
  * **Body:** Sparkline SVG simple (color coincide con status).  
  * **Footer:** KPI Principal (Label \+ Valor grande \+ Delta).

### **B. Modo Tabla (Executive View)**

* **Estilo General:** Tabla de ancho completo. Bordes horizontales finos.  
* **Cabecera (Thead):** Fondo blanco o gris muy claro. Texto gris (text-gray-500), pequeño, mayúsculas (uppercase), peso medio (font-medium). Columnas sugeridas: "Producto", "Salud", "Conversión", "Churn", "Tendencia (7d)".  
* **Filas (Tbody):**  
  * **Zebra Striping:** Filas pares con fondo blanco, filas impares con fondo gris muy suave (bg-gray-50) para guiar la lectura.  
  * **Interacción:** Hover sobre fila oscurece ligeramente (hover:bg-gray-100). Cursor pointer.  
  * **Celdas Clave:**  
    * **Producto:** Icono pequeño \+ Nombre en negrita.  
    * **Salud:** Badge tipo píldora (bg-green-100 text-green-800 para "Estable").  
    * **Métricas (Conversión/Churn):** Valor principal oscuro (ej. "2.4%") \+ Delta pequeño con color semántico (ej. "↑ 5%").

## **7\. Pantalla: Modal de Importación CSV**

**Layout:** Large Modal (Ancho mediano, centrado).

### **Estado 1: Selección y Carga (Dropzone)**

* **Cabecera:** Título "Importar Datos Externos".  
* **Selector de Contexto (Tabs):**  
  * Tab "Eventos" (Activo por defecto): Icono Calendario \+ Texto.  
  * Tab "Métricas": Icono Gráfico \+ Texto.  
* **Zona Central (Dropzone):**  
  * Área rectangular grande con borde punteado (border-dashed).  
  * Contenido: Icono nube \+ "Arrastra tu archivo CSV aquí".  
  * Botón secundario pequeño: "Descargar plantilla".

### **Estado 2: El Mapeador (Mapper)**

* **Fila de Archivo:** Icono de documento \+ Nombre del archivo \+ Botón "X" para eliminar.  
* **Grid de Mapeo (2 columnas):**  
  * *Columna Izquierda (Tu Archivo):* Lista de nombres de columnas detectados en el CSV (texto gris).  
  * *Columna Derecha (ProductAI):* Selects/Dropdowns alineados con la izquierda. Opciones: "Fecha", "Título", "Categoría".  
* **Configuración Global:**  
  * Checkbox/Select: "Asignar categoría por defecto a todo el lote".

### **Estado 3: Validación (Feedback)**

* **Resumen:** Texto de estado (ej. "45 filas listas para importar").  
* **Alertas:** Caja de alerta amarilla si hay errores de formato en filas específicas.  
* **Footer:** Botón cambia a "Procesando..." (estado de carga) y luego cierra.