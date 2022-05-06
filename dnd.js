let ajax_=new XMLHttpRequest();
let config_ppal=[{}];
let archivos=[{}];
let fileint=[{}];
let archivoscargados=[{}];
let queue=[{}];
let container="";
let contppal;
let colaocupada=0;
let vecesasubir=0;
let contarchivos=0;
let archivosubidos=0;
let archivopsubir=1;
let archivoactual;
let archivoactualacargar;
let formData = new FormData();
let ind_min=0;
let ind_max=0;

// Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
	// Great success! All the File APIs are supported.
	var ajx=(function(global,factory){
		let bitget=0;
		let bitpost=0;
		let bitgetjson=0;
		let bitupload=0;
		let bitload=0;
		let protocol='get';
		let errormessage="";
		ajax_.addEventListener("progress", getProgress, false);

		//write code below
		function getSocket(){
			// code for modern browsers
			return ajax_;
		};
		function getProgress(e){
			let percent_complete = (e.loaded / e.total)*100;
			colaocupada=1;
			return percent_complete;
		};
	return{
		getAjax:function(){
			return ajax_;
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
				ajax_.open("GET", url, true);
				ajax_.send(null);
				return this;
			}
	  	},
	  	getPercent:function(){
			return getProgress();
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
		function ExecCola(e){
			let fileint=archivos;
			let indfinal;
			let maxarchivos=fileint.length;
			if(archivosubidos<maxarchivos){
				colaocupada=1;
				formData = new FormData();
				if(fileint[archivosubidos].size!=undefined){
					formData.append('file[' + archivosubidos + ']', fileint[archivosubidos]);
					ajx.post(config_ppal.action, formData)
					.then(function(response){
						rescomp=response;
						archivoactual=rescomp;
						archivoscargados.push(rescomp);
						formData = new FormData();
						fileint=[{}];
						archivosubidos++;
					})
					.catch(function (error) {
						console.log("ERROR AJAX " + error);
					});
				}
			}
			else{
				ajax_.removeEventListener("load", ExecCola, false);
				colaocupada=0;
				archivosubidos=0;
			}
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
					fileint.push(file);
				}
				if(fileint.length>0){
					ind_min=1;
					if(fileint.length>2){
						if(fileint.length>=2 && archivosubidos==0){
							archivosubidos=1;
						}
						ajax_.addEventListener("loadend", ExecCola, false);
					}
					ind_max=fileint.length;
					for (var i=ind_min; i<ind_max; i++) {
						if(fileint[i].size!=undefined){
							formData.append('file[' + i + ']', fileint[i]);
						}
					}
					//subir archivos
					if(ajx!=undefined){
						let veces=fileint.length;
						let contador=fileint.length;
						let contarchivos=fileint.length;
						ajx.post(config_ppal.action, formData)
						.then(function(response){
							rescomp=response;
							archivoactual=rescomp;
							archivoscargados.push(rescomp);
							formData = new FormData();
							fileint=[{}];
							archivosubidos++;
							vecesasubir++;
							if(fileint.length>=2 && archivosubidos==0){
								archivosubidos=0;
							}
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
			getAllFiles:function(){
				return archivos;
			},
			getFilesCargados:function(){
				return archivoscargados;
			},
			getFileActual:function(){
				return archivoactual;
			},
			getFileCargar:function(){
				return fileint[archivosubidos];
			},
			getFilesQueued:function(){
				return fileint;
			}
		}
	}(window));
}
else {
  console.info('The File APIs are not fully supported in this browser.');
}
