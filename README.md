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


### Use the Source...

### The Source be with you...

## Si deseas colaborar, haz clic en el enlace abajo:
## if do you like to to collab, you can do it by clicking the link below:
## --Paypal-- 
[![paypal-btn-image-pay](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/paypalme/avsolucionesweb)
