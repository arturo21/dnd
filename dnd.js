let ajaxsck;
let apisc;
let config_ppal=[{}];
let archivos=[{}];
let archivoscargados=[{}];
let extensiones=[{}];
let queue=[{}];
let container="";
let contppal;
// Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
// Great success! All the File APIs are supported.
	var ajx=(function(global,factory){
		let ajax_=getSocket();
		let bitget=0;
		let bitpost=0;
		let bitgetjson=0;
		let bitupload=0;
		let bitload=0;
		let protocol='get';
		let errormessage="";
		//write code below
		function getSocket(){
			// code for modern browsers
			xmlhttp = new XMLHttpRequest();
			return xmlhttp;
		};
	return{
		getAjax:function(){
			let sockajax=getSocket();
			return sockajax;
	  	},
		load:function(url){
			let options;
			let respjson;
			let objeto;
			let x,y,valor,indice;
			var params = "action=load";
			bitget=0;
			bitpost=0;
			bitgetjson=0;
			bitupload=0;
			bitload=1;
			if(bitload==1){
				console.log("BITLOAD=1");
				ajax_.open("GET", url, true);
				ajax_.send(null);
				return this;
			}
		},
	  	get:function(url){
			let options;
			let respjson;
			let objeto;
			let x,y,valor,indice;
			var params = "action=get";
			bitget=1;
			bitpost=0;
			bitgetjson=0;
			bitupload=0;
			bitload=0;
			if(bitget==1){
				console.log("BITGET=1");
				ajax_.open("GET", url, true);
				ajax_.send(null);
				return this;
			}
	  	},
	  	getJSON:function(url){
			let options;
			let respjson;
			let objeto;
			let x,y,valor,indice;
			var params="action=getjson";
			bitget=0;
			bitpost=0;
			bitgetjson=1;
			bitupload=0;
			bitload=0;
			if(bitgetjson==1){
				console.log("BITJSON=1");
				ajax_.open("GET", url, true);
				ajax_.send(null);
				return this;
			}
	  	},
	  	post:function(url,data){
			let options;
			let respjson;
			let objeto;
			let x,y,valor,indice;
			protocol="post";
			bitget=0;
			bitpost=1;
			bitgetjson=0;
			bitupload=0;
			bitload=0;
			ajax_=getSocket();
			ajax_.open("POST", url, true);
			ajax_.response='json';
			ajax_.send(data);
			return this;
	  	},
	  	upload:function(url,data){
			let options;
			let respjson;
			let objeto;
			let x,y,valor,indice;
			protocol="post";
			bitget=0;
			bitpost=0;
			bitgetjson=0;
			bitupload=1;
			bitload=0;
			ajax_=getSocket();
			ajax_.open("POST", url, true);
			ajax_.response='text';
			ajax_.send(data);
			return this;
	  	},
		then:function(callback){
			ajax_.onreadystatechange = function(){
				if(ajax_.readyState==4){
					if(ajax_.status==200){
						callback(ajax_.response);
						return this;
					}
					else{
						errormessage=ajax_.statusText;
						ajaxapi.catch(errormessage);
						return this;
					}
				}
			};
			return this;
		},
		catch:function(e){
			console.log(e);
		}
	  }
	}(window));

	var gnstore=(function(global,factory){
		//Submodulo Cookies
		return{
			setLocal:function(variable,valorvariable){
				try{
					window.localStorage.setItem(variable, valorvariable);
				}
				catch(e){
					console.log(e);
				}
			},
			getLocal:function(variable){
				if (window.localStorage) {
				  return window.localStorage.getItem(variable);
				}
				else {
				  throw new Error('Tu navegador no soporta LocalStorage!');
				}
			},
			rmLocal:function(variable){
				if (window.localStorage) {
				  window.localStorage.removeItem(variable);
				}
				else {
				  throw new Error('Tu navegador no soporta LocalStorage!');
				}
			},
			setSession:function(variable,valorvariable){
				if (window.sessionStorage) {
					window.sessionStorage.setItem(variable, valorvariable);
				}
				else {
					throw new Error('Tu navegador no soporta SessionStorage!');
				}
			},
			getSession:function(variable){
				if (window.sessionStorage) {
					return window.sessionStorage.getItem(variable);
				}
				else {
					throw new Error('Tu navegador no soporta SessionStorage!');
				}
			},
			rmSession:function(variable){
				if (window.sessionStorage) {
					window.sessionStorage.removeItem(variable);
				}
				else {
					throw new Error('Tu navegador no soporta SessionStorage!');
				}
			}
		}
	}(window));

	var dnd=(function(global,factory){
		function dragEnter(e){
			e.preventDefault();

		};
		function dragOver(e){
			e.preventDefault();

		};
		function dragLeave(e){
			e.preventDefault();

		};
		//subir los archivos del array Archivos
		function execqeue(e){
			e.preventDefault();

		};
		function drop(e){
			e.preventDefault();
			if(config_ppal.container!=undefined || config_ppal.container!=null || config_ppal.container!=''){
     			//var extn = imgPath.substring(imgPath.lastIndexOf('.') + 1).toLowerCase();
				contppal_aux=document.querySelector(config_ppal.container);
				for(var i = 0; i < e.dataTransfer.files.length; i++){
					const file = e.dataTransfer.files[i];
					const reader = new FileReader();
					reader.readAsDataURL(file);
					reader.addEventListener('loadend', () => {
						const img = document.createElement('img');
						img.src = reader.result;
						img.style.height="300";
						img.style.width="300";
						contppal_aux.append(img);
					});
					archivos.push(file);
				}
				if(archivos.length>0){
					//subir archivos
					if(ajx!=undefined){
						let fetchobj=ajx;
						console.log("AJAX HANDLER ");
						console.log(ajx);
						console.log(config_ppal.action);
						console.log(archivos);
						let veces=archivos.length;
						let contador=archivos.length;
						let jsonstr="{archivos:\"" + archivos + "\"}";
						fetchobj.post(config_ppal.action, archivos)
						.then(function (response) {
							rescomp=response.data;
							console.log(rescomp);
						})
						.catch(function (error) {
							console.log("ERROR AJAX " + error);
						});
					}
					else{
						return -2;
					}
				}
				else{
					return -1;
				}
				return archivos;
			}
		};
		return {
			on:function(){
				let control;
				let eventoCall;
				eventoCall=arguments[0];
				callback=arguments[1];
				control=getelem(domel);
				control.addEventListener(eventoCall,callback);
				return this;
			},
			config:function(defaults){
				config_ppal=defaults;

				if(config_ppal.container!=undefined || config_ppal.container!=null || config_ppal.container!=''){
					contppal=document.querySelector(config_ppal.container);
					contppal.addEventListener('dragenter', dragEnter)
					contppal.addEventListener('dragover', dragOver);
					contppal.addEventListener('dragleave', dragLeave);
					contppal.addEventListener('drop', drop);
					contppal.class="dnd-container";
					if(config_ppal.drop!=undefined || config_ppal.drop!=null || config_ppal.drop!=''){
						contppal.addEventListener('drop', config_ppal.drop);
					}
				}
				else{
					console.log("FAVOR Especifique contenedor");
				}
				if(config_ppal.action==undefined || config_ppal.action==null || config_ppal.action==''){
					console.log("FAVOR Especifique Action");
				}
				return this;
			},
			emptyFiles:function(){
				archivos=[{}];
				archivoscargados=[{}];
				return this;
			},
			getFiles:function(){
				return archivoscargados;
			},
			getFilesQueued:function(){
				return archivos;
			}
		}
	}(window));
}
else {
  console.info('The File APIs are not fully supported in this browser.');
}