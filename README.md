# dnd
API para crear una dropzone y subir archivos mediante drag and drop

## Client

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

## Si quieres habilitar el escoger archivos mediante el botón del control File, escribe el argumento filefield con el id o query del control file tal que así:

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
