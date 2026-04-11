# Meta Ads Integration con Claude Code

Este proyecto conecta Claude Code con la Meta Marketing API mediante un servidor MCP (Model Context Protocol) para gestionar campañas de Facebook e Instagram Ads.

## Configuración

### Meta Ads MCP

El servidor MCP `meta-ads-mcp` está configurado en `.mcp.json`. Proporciona acceso a la API de Meta Marketing para:

- Consultar cuentas publicitarias
- Ver campañas, ad sets y anuncios
- Obtener métricas e insights de rendimiento
- Crear y modificar campañas
- Gestionar audiencias y creatividades
- Buscar opciones de segmentación (intereses, comportamientos, demografía, ubicaciones)

## Reglas de Seguridad para Gestión de Anuncios

### Límites de gasto
- **NUNCA** crear campañas con un presupuesto diario superior a $50 USD sin confirmación explícita del usuario.
- **NUNCA** crear campañas con un presupuesto total (lifetime) superior a $500 USD sin confirmación explícita.
- Antes de activar cualquier campaña, mostrar al usuario un resumen con: objetivo, presupuesto, audiencia estimada y duración.

### Operaciones destructivas
- **NUNCA** eliminar campañas, ad sets o anuncios sin confirmación del usuario.
- **NUNCA** modificar campañas activas sin mostrar primero los cambios propuestos y obtener aprobación.
- Al pausar o activar campañas, siempre confirmar la acción con el usuario antes de ejecutarla.

### Buenas prácticas
- Siempre listar las cuentas publicitarias disponibles antes de operar, para confirmar con el usuario sobre cuál cuenta trabajar.
- Al crear campañas, usar el estado `PAUSED` por defecto. Solo activar con confirmación explícita.
- Mostrar insights y métricas antes de recomendar cambios en campañas existentes.
- Al crear audiencias o segmentaciones, validar los intereses antes de aplicarlos.

### Flujo recomendado
1. `get_ad_accounts` → Confirmar cuenta publicitaria con el usuario
2. `get_campaigns` → Revisar campañas existentes
3. `get_insights` → Analizar rendimiento actual
4. Proponer cambios → Obtener aprobación del usuario
5. Ejecutar cambios → Confirmar resultado

## Herramientas MCP Disponibles

### Cuentas
- `mcp_meta_ads_get_ad_accounts` - Listar cuentas publicitarias
- `mcp_meta_ads_get_account_info` - Información detallada de cuenta
- `mcp_meta_ads_get_account_pages` - Páginas asociadas

### Campañas
- `mcp_meta_ads_get_campaigns` - Listar campañas
- `mcp_meta_ads_get_campaign_details` - Detalles de campaña
- `mcp_meta_ads_create_campaign` - Crear campaña

### Ad Sets
- `mcp_meta_ads_get_adsets` - Listar ad sets
- `mcp_meta_ads_get_adset_details` - Detalles de ad set
- `mcp_meta_ads_create_adset` - Crear ad set
- `mcp_meta_ads_update_adset` - Modificar ad set

### Anuncios
- `mcp_meta_ads_get_ads` - Listar anuncios
- `mcp_meta_ads_get_ad_details` - Detalles de anuncio
- `mcp_meta_ads_create_ad` - Crear anuncio
- `mcp_meta_ads_update_ad` - Modificar anuncio

### Creatividades
- `mcp_meta_ads_upload_ad_image` - Subir imagen
- `mcp_meta_ads_get_ad_image` - Ver imagen
- `mcp_meta_ads_create_ad_creative` - Crear creatividad
- `mcp_meta_ads_update_ad_creative` - Modificar creatividad
- `mcp_meta_ads_get_ad_creatives` - Ver creatividades de un anuncio

### Segmentación
- `mcp_meta_ads_search_interests` - Buscar intereses
- `mcp_meta_ads_get_interest_suggestions` - Sugerencias de intereses
- `mcp_meta_ads_validate_interests` - Validar intereses
- `mcp_meta_ads_search_behaviors` - Buscar comportamientos
- `mcp_meta_ads_search_demographics` - Buscar demografía
- `mcp_meta_ads_search_geo_locations` - Buscar ubicaciones

### Insights y Análisis
- `mcp_meta_ads_get_insights` - Métricas de rendimiento
- `mcp_meta_ads_create_budget_schedule` - Programar presupuestos

## MarkItDown MCP (Microsoft)

### Configuración

El servidor MCP `markitdown-mcp` está configurado en `.mcp.json`. Utiliza `uvx` para ejecutar el paquete de Microsoft sin necesidad de instalación previa.

### Descripción

MarkItDown es una herramienta de Microsoft que convierte más de 29 formatos de archivo a Markdown, ideal para procesamiento con LLMs y análisis de texto.

### Formatos soportados
- PDF, Word (.docx), PowerPoint (.pptx), Excel (.xlsx)
- HTML, CSV, JSON, XML
- Imágenes (con OCR), Audio (con transcripción)
- ZIP, EPub, Jupyter Notebooks
- RSS feeds, URLs de YouTube, páginas de Wikipedia

### Herramienta MCP Disponible
- `convert_to_markdown(uri)` - Convierte cualquier archivo o URL a Markdown. Acepta URIs con esquemas `http:`, `https:`, `file:` o `data:`
