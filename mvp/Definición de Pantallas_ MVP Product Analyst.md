# **Canvas de Definición de Pantallas MVP**

Objetivo: Documentar el alcance de interfaz para la primera versión funcional.  
Foco: Solo las pantallas esenciales para que un usuario conecte datos, visualice correlaciones y reciba insights.

## **1\. Login / Autenticación**

**Propósito:** Puerta de entrada segura y profesional.

* **Necesidad:** El usuario necesita acceder a un entorno privado donde se guardarán sus tokens de conexión (API Keys).  
* **Alcance MVP:**  
  * Ingreso mediante Single Sign-On (Google/GitHub) para reducir fricción.  
  * Presentación de la propuesta de valor (branding mínimo) para reforzar confianza al entrar.

## **2\. Setup Wizard (Configuración Inicial)**

**Propósito:** Romper el "Lienzo en Blanco" y poblar el sistema de datos.

* **Necesidad:** Sin datos, la plataforma no sirve. Esta pantalla guía al usuario nuevo a conectar sus fuentes.  
* **Alcance MVP:**  
  * Selección de Fuente de Ejecución (Jira/GitHub).  
  * Selección de Fuente de Datos (Analytics/CSV).  
  * Paso 3: Definición del primer "Producto" (Nombre y Descripción).  
  * Confirmación visual de conexión exitosa.

## **3\. Unified Timeline (Dashboard Principal)**

**Propósito:** La vista central del producto. Visualización pasiva de la correlación.

* **Necesidad:** El usuario debe poder ver en una sola pantalla la línea de tiempo de sus entregas (Deploys) alineada verticalmente con sus resultados (Métricas).  
* **Alcance MVP:**  
  * Encabezado con selector de productos (Dropdown) y Rango de fechas.  
  * Carril superior: Visualización de eventos de ingeniería.  
  * Carril inferior: Gráfico de métricas de negocio (Line Chart con ejes visibles).  
  * Listado lateral o feed de alertas generadas por la IA.

## **4\. Insight Detail (Detalle del Hallazgo)**

**Propósito:** Explicabilidad y confianza en la IA.

* **Necesidad:** Cuando la IA detecta algo, el usuario no confiará ciegamente. Necesita una pantalla donde pueda ver la evidencia del razonamiento.  
* **Alcance MVP:**  
  * Vista (puede ser modal o página) que muestra el resumen del hallazgo.  
  * Desglose de la evidencia: "Qué cambió en el código" vs "Qué pasó en la métrica".  
  * Botones de acción (Validar/Descartar).

## **5\. Manual Input Modal (Ingreso Manual)**

**Propósito:** Cubrir los huecos de información digital uno a uno.

* **Necesidad:** No todo ocurre en Jira o GitHub (ej. una campaña de TV o un cambio de precios). El usuario necesita poder inyectar estos eventos al gráfico rápidamente.  
* **Alcance MVP:**  
  * Formulario simple y rápido accesible desde el Dashboard.  
  * Campos mínimos: Nombre del evento, Fecha/Hora, Tipo.

## **6\. Portfolio Overview (Resumen de Productos)**

**Propósito:** Visión holística de la salud de la empresa con flexibilidad de visualización.

* **Necesidad:** Los líderes (CPO, CTO, VPs) necesitan monitorear múltiples productos simultáneamente. Mientras algunos prefieren visualización gráfica (Grid), otros requieren densidad de datos para comparación rápida (Tabla).  
* **Alcance MVP:**  
  * **Selector de Vistas:** Switch o Toggle para alternar entre "Vista Grid" y "Vista Tabla".  
  * **Vista Grid (Tarjetas):**  
    * Una tarjeta por producto con semáforo de salud y sparklines para tendencia visual.  
  * **Vista Tabla (Executive Mode):**  
    * **Filas:** Productos listados verticalmente.  
    * **Columnas:** Métricas clave lado a lado (ej. Conversión, Churn, CAC).  
    * **Contenido de Celda:** Valor actual \+ Variación (Delta) vs periodo anterior (ej. "2.4% (↑ 5%)").  
    * **Estilo:** Filas con colores intercalados (Zebra striping) para facilitar la lectura horizontal de datos densos.  
  * **Acceso Directo:** Clic en cualquier fila o tarjeta lleva al *Unified Timeline* específico.

## **7\. Importación de Datos (CSV Flow)**

**Propósito:** Puente masivo para datos legacy o externos.

* **Necesidad:** Permitir cargar históricos de marketing, ventas offline o incidentes pasados sin ingresarlos uno por uno.  
* **Flujo de Usuario:**  
  1. **Entry Point:** Botón "Importar" en el Dashboard.  
  2. **Selección:** El usuario define si sube Eventos (Hitos) o Métricas (Series de tiempo).  
  3. **Mapeo:** El sistema intenta emparejar las columnas del CSV con los campos de la DB. El usuario confirma o corrige.  
  4. **Validación:** Vista previa antes de cometer los cambios.

**Mockup Conceptual del Modal:**

\+---------------------------------------------------------------+  
|  Importar Datos                                           \[X\] |  
\+---------------------------------------------------------------+  
|                                                               |  
|  \[ TAB: Cargar Eventos \]   TAB: Cargar Métrica                |  
|                                                               |  
|  1\. Arrastra tu archivo aquí                                  |  
|     \+---------------------------------------------------+     |  
|     |  📄 historial\_releases\_2023.csv  (45KB)      \[x\]  |     |  
|     \+---------------------------------------------------+     |  
|                                                               |  
|  2\. Mapea tus columnas                                        |  
|     El sistema necesita conectar tus datos:                   |  
|                                                               |  
|     Tus Columnas (CSV)          Campos de ProductAI           |  
|     \------------------          \-------------------           |  
|     \[ release\_date   v\]   \---\>  (icon) Fecha del Evento       |  
|     \[ feature\_name   v\]   \---\>  (icon) Título                 |  
|     \[ dev\_team       v\]   \---\>  (icon) Categoría / Tag        |  
|                                                               |  
|  3\. Vista Previa                                              |  
|     \> 2023-10-01  |  Checkout V2  |  Team Alpha               |  
|     \> 2023-10-05  |  Hotfix Login |  SRE Team                 |  
|                                                               |  
\+---------------------------------------------------------------+  
|  \[ Descargar Plantilla \]               \[ Cancelar \] \[ Importar\] |  
\+---------------------------------------------------------------+

