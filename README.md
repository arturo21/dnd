# dnd
API para crear una dropzone y subir archivos mediante drag and drop

```javascript
	dnd.config({
		container:"#dndzone",
		action:'/apicompressor/subirarchivo',
		drop:function(e){
			console.log(e);
		}
	})
```
