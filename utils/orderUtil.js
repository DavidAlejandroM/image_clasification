const pUtil = require('./positionUtil');

module.exports = {
    /**/
    orderFotos: function(clases, currentPosition, fotos){
        let fotosOrdenadas = [];
        let esPrimera = false;

        clases.forEach(clase => {
            let foto = fotoSiguiente(clase,currentPosition,fotos);
            console.log('primera foto ************');
            if(foto && !esPrimera){
                fotosOrdenadas.push(foto);
                fotos = deleteFoto(foto,fotos);
                esPrimera = true;
            }
        });
        let count = 0;
        clases.forEach(clase => {
            
            let foto = fotoSiguiente(clase,fotosOrdenadas[fotosOrdenadas.length - 1],fotos);
            console.log(`primera foto ${count}************`);
            
            while(foto){
                
                fotosOrdenadas.push(foto);
                fotos = deleteFoto(foto,fotos);

                foto = fotoSiguiente(clase,fotosOrdenadas[fotosOrdenadas.length - 1],fotos)
            }
            
        });

        if(fotos.length > 0){
            fotosOrdenadas = fotosOrdenadas.concat(fotos);
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
    if(fotos && fotos.length > 0 && fotoOrdenada){
        let lat1 = parseFloat(fotoOrdenada.latitud);
        let lng1 = parseFloat(fotoOrdenada.longitud);
        let lat2 = parseFloat(fotos[0].latitud);
        let lng2 = parseFloat(fotos[0].longitud);

        let distanciaActual = pUtil.getDistanceMts(lat1, lng1, lat2, lng2);
        let distanciaMin = distanciaActual;
        
        fotos.forEach( foto => {
            distanciaActual = pUtil.getDistanceMts(fotoOrdenada.latitud, fotoOrdenada.longitud, foto.latitud, foto.longitud); 
            
            if(foto.clase == clase && distanciaMin >= distanciaActual){
                distanciaMin = distanciaActual;
                primeraFoto = foto;
            }
        });
    }

    return primeraFoto;
}