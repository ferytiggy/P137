objects=[];
status="";

function setup(){
    canvas=createCanvas(480,380);
    canvas.center();
     video=createCapture(VIDEO);
     video.size(480,380);
     video.hide();
}

function start(){
    CoCossd=ml5.objectDetector("cocossd",modelloaded);
    
}

function modelloaded(){
 console.log("Modelo Cargado :D:D:D:D")
 status=true;
 document.getElementById("Estatus").innerHTML="Estatus: Modelo Cargado:D:D:D";
 objeto=document.getElementById("input").value;
}

function gotresult(error,results){
    if (error) {
        console.log(error);
    }else{
        console.log(results);
        objects=results;
    }
}

function draw(){
    image(video,0,0,480,380);
    if (status!="") {
        CoCossd.detect(video,gotresult);
        for (i=0; i<objects.length; i++){
            document.getElementById("Estatus").innerHTML="Estatus: Objeto Detectado:D:D";
            fill("lime");
            porcentaje=Math.floor(objects[i].confidence*100);
            nombreobjeto=objects[i].label;
            coordenadax=objects[i].x
            coordenaday=objects[i].y
            alto=objects[i].heigth;
            ancho=objects[i].width;
            text(nombreobjeto + "" + porcentaje + "%",coordenadax, coordenaday);
            nofill();
            stroke("lime");
            rect(coordenadax,coordenaday,ancho,alto);
            if (objeto==objects[i].label) {
                video.stop();
                CoCossd.detect(gotresult)
                 document.getElementById("Estatus").innerHTML="Estatus: Objeto Detectado:D:D" + "" + objeto ;
                 synth = window.speechSynthesis; 
                 utterThis = new SpeechSynthesisUtterance(objeto + "encontrado");
                  synth.speak(utterThis);

            }else{
                document.getElementById("Estatus").innerHTML="Estatus:" + objeto + " Objeto no enconctrado";
            }
        }
    }

}