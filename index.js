const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs=require("fs");
const filepath = "../PATH/TO/IMAGE.PNG";
const tempPath = "../PATH/TO/IMAGE_AFTER_JIMP_RESIZE.PNG";
const outputPath = "uploadsrezised";
const JIMP_QUALITY = 70;
const RESIZE_WIDTH = 600; //px
const app=express();
app.listen(3000);
let sess;
/******FUNCTIONS*****/
function wait (timeout) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, timeout);
  });
}
/******FIN FUNCTIONS*****/
// enable files upload
app.use(fileUpload({
    createParentPath: true
}));
//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//make uploads directory static
app.use(express.static('uploads'));
app.use('/public', express.static('public'));
app.use('/public/js', express.static('js'));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/", function(req, res) {
	res.sendFile(__dirname + '/index.html')
});

/**serves main page**/
app.post("/apicompressor/subirarchivo", function(req, res) {
    sess=req.session;
    try {
		console.log(req);
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        }
		else {
		    let fileone = req.files.file;
		    fileone.mv('./public/uploads/' + fileone.name);
			let rootorigin = './public/uploads/' + fileone.name;
			let rootdest = './public/uploadsresized/';
			let rootdestfinal = './public/uploadsresized/' + fileone.name;
			let fmime=fileone.mimetype;
			let stats;
		    res.send({
		        status: true,
		        message: 'File is uploaded',
		        data:{
		            name: fileone.name,
		            mimetype: fileone.mimetype,
		            size: fileone.size,
					rutafinal:rootdestfinal
		        }
		    });
			if(fileone.mimetype=="image/jpeg"){
				const files = imagemin([rootorigin], {
					destination: rootdest,
					plugins: [
					  imageminJpegtran({progressive: true})
					]
				},function(){
					console.log("Archivo jpeg creado!");
				});
			}
			else if(fileone.mimetype=="image/png"){
				try{
					const files = imagemin([rootorigin], {
						destination: rootdest,
						plugins: [
						  imageminPngquant(
								{quality: [0.3,0.5]},
							)
						]
					});
				}
				catch(err){
					console.log(error + " " + rootorigin);
				}
			}
			else if(fileone.mimetype=="image/webp"){
				const files = imagemin([rootorigin], {
					destination: rootdest,
					plugins: [
					  imageminWebp({strip: true},{quality: "30-50" })
					]
				});
			}
        }
    }
	catch (err) {
		console.log(err);
        res.status(500).send(err);
    }
});
