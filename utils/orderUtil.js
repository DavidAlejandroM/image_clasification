const pUtil = require('./positionUtil');

module.exports = {
    /**/
    orderFotos: function(clases, currentPosition, fotos){
        let fotosOrdenadas = [];
        let esPrimera = false;

        clases.forEach(clase => {

            let foto = fotoSiguiente(clase,currentPosition,fotos);
            //console.log('primera foto ************',currentPosition);
            
            if(foto && !esPrimera){
                fotosOrdenadas.push(foto);
                fotos = deleteFoto(foto,fotos);
                esPrimera = true;
            }
        });
        let count = 0;
        clases.forEach(clase => {
            //console.log(clase)
            let foto = fotoSiguiente(clase,fotosOrdenadas[fotosOrdenadas.length - 1],fotos);
            //console.log(`primera foto ${count}************`);
            
            while(foto){
                
                fotosOrdenadas.push(foto);
                fotos = deleteFoto(foto,fotos);

                foto = fotoSiguiente(clase,fotosOrdenadas[fotosOrdenadas.length - 1],fotos)
            }
            
        });

        //console.log(fotosOrdenadas[fotosOrdenadas.length - 1], fotos.length)
        while(fotos.length > 0){
            let foto = fotoSiguiente('noclass',fotosOrdenadas[fotosOrdenadas.length - 1],fotos);
            //console.log(foto)
            fotosOrdenadas.push(foto);
            fotos = deleteFoto(foto,fotos);    
        }

        return fotosOrdenadas;
    }
};

function deleteFoto(foto, fotos){
    let fotosAux = [];
    fotos.forEach(f => {
        if(f.id != foto.id){
            fotosAux.push(f);
        }
    });
    return fotosAux;
}

function fotoSiguiente(clase, fotoOrdenada,fotos){
    let primeraFoto;
    if(clase==='noclass'){
        //console.log(fotoOrdenada)
    }
    if(fotos && fotos.length > 0 && fotoOrdenada){
        let lat1 = parseFloat(fotoOrdenada.latitud);
        let lng1 = parseFloat(fotoOrdenada.longitud);
        let lat2 = parseFloat(fotos[0].latitud);
        let lng2 = parseFloat(fotos[0].longitud);

        console.log('lat1:', lat1,' lng1:', lng1, ' lat2:', lat2, ' lng2:', lng2);

        let distanciaActual = 15000e6;
        let distanciaMin = distanciaActual;
        
        fotos.forEach( foto => {
            distanciaActual = pUtil.getDistanceMts(fotoOrdenada.latitud, fotoOrdenada.longitud, foto.latitud, foto.longitud); 
            
            if(foto.clase == clase && distanciaMin >= distanciaActual){
                distanciaMin = distanciaActual;
                console.log(distanciaMin, lat1);
                primeraFoto = foto;
            }
            else if(clase == 'noclass' && distanciaMin >= distanciaActual){
                distanciaMin = distanciaActual;
                console.log(distanciaMin, lat1);
                primeraFoto = foto;
            }
        });
    }

    return primeraFoto;
}