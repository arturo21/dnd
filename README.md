# 🚀 dnd.js — Drag & Drop Upload API

**Una API ligera y poderosa para crear zonas de arrastre (dropzones) y subir archivos mediante drag & drop.**  
Integración directa con [`general.js`](https://cdn.underdevelopment.work/generaljs/general.min.js)

<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.0-blue.svg" alt="Versión">
  <img src="https://img.shields.io/badge/license-MIT-green.svg" alt="Licencia">
  <img src="https://img.shields.io/badge/drag--and--drop-enabled-orange.svg" alt="Drag and Drop">
</p>

---
## ✨ Características

| Característica                         | Descripción                                                                 |
|----------------------------------------|------------------------------------------------------------------------------|
| ✅ Configuración declarativa           | Define la zona de drop y comportamiento con `dnd.config()`                  |
| 🎯 Compatible con formularios HTML     | Se integra fácilmente con formularios estándar para subida de archivos      |
| 📁 Soporte para múltiples archivos     | Permite subir varios archivos simultáneamente                               |
| 🔄 Callback personalizado en `drop`    | Ejecuta funciones cuando se suelta un archivo en la zona                    |
| 🧩 Integración con `general.js`        | Aprovecha utilidades y compatibilidad con la librería base                  |
| 🧠 Selección manual vía `filefield`    | Permite seleccionar archivos desde un input file además del drag & drop     |

---
## 🧠 Métodos disponibles en DND

| Método                    | Descripción                                                                 |
|---------------------------|------------------------------------------------------------------------------|
| `config(defaults)`        | Inicializa la configuración principal: contenedor, acción, filefield, etc. |
| `emptyFiles()`            | Limpia los arrays de archivos cargados y pendientes                        |
| `getAllFiles()`           | Devuelve todos los archivos detectados (drag & drop o selección manual)    |
| `getFilesCargados()`      | Devuelve los archivos que ya fueron subidos exitosamente                   |
| `getFileActual()`         | Devuelve el último archivo procesado                                       |
| `getFileCargar()`         | Devuelve el archivo que está por subirse en la cola                        |
| `getFilesQueued()`        | Devuelve el array de archivos en cola para subir                           |
| `gettingFilePerFile(cb)`  | Ejecuta un callback por cada archivo subido (evento `loadend`)             |

---
## 🔧 Eventos internos y funciones clave en DND

| Función / Evento       | Descripción                                                                 |
|------------------------|------------------------------------------------------------------------------|
| `dragEnter(e)`         | Previene el comportamiento por defecto al entrar un archivo en la zona      |
| `dragOver(e)`          | Previene el comportamiento por defecto mientras se arrastra sobre la zona   |
| `dragLeave(e)`         | Previene el comportamiento por defecto al salir del área de drop            |
| `drop(e)`              | Maneja el evento de soltar archivos, renderiza previews y prepara subida    |
| `changegetfiles(e)`    | Captura archivos seleccionados manualmente desde un input file              |
| `ExecCola(e)`          | Ejecuta la subida secuencial de archivos en cola usando `ajx.post()`        |

---
## ⚙️ Parámetros de configuración en dnd.config()

| Parámetro     | Tipo       | Descripción                                                                 | Ejemplo de valor                          |
|---------------|------------|------------------------------------------------------------------------------|-------------------------------------------|
| `container`   | `string`   | Selector CSS del contenedor donde se habilita la zona de drop               | `"#dndzone"`                               |
| `action`      | `string`   | URL del endpoint al que se enviarán los archivos                            | `"/apicompressor/subirarchivo"`           |
| `drop`        | `function` | Callback que se ejecuta cuando se suelta un archivo                         | `function(e) { console.log(e); }`         |
| `filefield`   | `string`   | Selector CSS del input file para habilitar selección manual de archivos     | `"#formulario input[type='file']"`        |
---
## 📦 Changelog

| Versión | Fecha        | Cambios realizados                                                                 |
|---------|--------------|------------------------------------------------------------------------------------|
| `v1.1.0`| 2025-10-05    | Se agrega soporte para subida secuencial (`ExecCola`) y mejora en manejo de múltiples archivos |
| `v1.0.9`| 2025-09-28    | Se integra `filefield` para selección manual de archivos desde input file         |
| `v1.0.8`| 2025-09-20    | Se refactoriza `drop()` para renderizar previews con `FileReader`                |
| `v1.0.7`| 2025-09-12    | Se agrega `getFilesQueued()` y `getFileCargar()` para inspección de la cola      |
| `v1.0.6`| 2025-09-05    | Se implementa `emptyFiles()` y `getFilesCargados()` para control de estado       |
| `v1.0.5`| 2025-08-30    | Se publica versión inicial con `config()`, `drop()`, y renderizado básico        |
---

## 📦 Instalación

### Desde NPM
```bash
npm i gnrl.js
```

## Importar general.js desde CDN
```html
	<script src="https://cdn.underdevelopment.work/generaljs/general.min.js">
```

## Cliente

```javascript
	dnd.config({
		container:"#dndzone",
		action:'/apicompressor/subirarchivo',
		drop:function(e){
			console.log(e);
		}
	})
```

```html
	<form action="/apicompressor/subirarchivo" class="dropzone" id="my-awesome-dropzone" enctype="multipart/form-data"></form>
```

## Tip
Si quieres habilitar el escoger archivos mediante el botón del control File, escribe el argumento filefield con el id o query del control file tal que así:

```javascript
	dnd.config({
		container:"#dndzone",
		action:'/apicompressor/subirarchivo',
		filefield:"#draggablezone>form>div>label>input",
		drop:function(e){
			console.log(e);
		}
	})
```

## Server

```javascript
		if(!req.files) {
		    res.send({
		        status: false,
		        message: 'No file uploaded'
		    });
		}
		else {
			for(x in archivos){
				let fileone = archivos[x];
		...
```
