export class Foto {
    nombre: string;
    latitud: number;
    longitud: number;
    altitud: number;

    constructor(nombre:string, latitud:number, longitud:number, altitud:number){
        this.nombre = nombre;
        this.latitud = latitud;
        this.longitud = longitud;
        this.altitud = altitud;
    }

    getLocation(){
        return {
            latitud: this.latitud,
            longitud: this.longitud,
            altitud: this.altitud
        }
    }
}