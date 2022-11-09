class Base {
    constructor(nombre, minutos) {
        this.nombre = nombre;
        this.minutos = minutos;
        this.sig = null;
        this.ant = null;
    }
}

//lista circular
class rutasDeTrasporte {
    constructor() {
        this.primero = null;
    }

    agregar(nuevo) {
        if (this.primero == null) {
            this.primero = nuevo;
            nuevo.sig = this.primero;
            nuevo.ant = this.primero;
        } else {
            nuevo.sig = this.primero;
            nuevo.ant = this.primero.ant;
            this.primero.ant = nuevo;
            nuevo.ant.sig = nuevo;
        }
    }

    buscar(nombre) {
        let str = "No se encontro el dato";
        let aux = this.primero;
        if (this.primero == null) {
            str = `No hay datos en la lista`;
        } else {
            do {
                if (aux.nombre == nombre) {
                    this.primero = aux;
                    str = `Nombre: ${aux.nombre} Minutos: ${aux.minutos} \n`;
                }
                aux = aux.sig;
            } while (aux != this.primero);
        }
        return str;
    }

    eliminar(nombre) {
        let str = "No se encontro el dato";
        let aux = this.primero;
        if (this.primero == null) {
            str = `No hay datos en la lista`;
        } else {
            do {
                if (aux.nombre == nombre) {
                    if (aux == this.primero) {
                        this.primero = aux.sig;
                        aux.sig.ant = aux.ant;
                        aux.ant.sig = aux.sig;
                    } else {
                        aux.ant.sig = aux.sig;
                        aux.sig.ant = aux.ant;
                    }
                    str = `Se ha eliminado el dato`;
                }
                aux = aux.sig;
            } while (aux != this.primero);
        }
        return str;
    }

    listar() {
        let str = "";
        let aux = this.primero;
        if (this.primero == null) {
            return null
        } else {
            do {
                str += `Nombre: ${aux.nombre} Minutos: ${aux.minutos} \n`;
                aux = aux.sig;
            } while (aux != this.primero);
        }
        return str;
    }

    recorrido(baseInicio, horaInicio, minutoInicio, horaFin, minutoFin) {
        let str = "";
        let inicio = new Date();
        inicio.setHours(horaInicio);
        inicio.setMinutes(minutoInicio);

        let fin = new Date();
        fin.setHours(horaFin);
        fin.setMinutes(minutoFin);

        this.buscar(baseInicio);
        str = `Hora de inicio: ${inicio.getHours()}:${inicio.getMinutes()}\nHora de finalización: ${fin.getHours()}:${fin.getMinutes()} \n`;

        if (this.primero == null) {
            return false;
        }

        let aux = this.primero;
        do {
            str += `Base ${aux.nombre} - ${inicio.getHours()}:${inicio.getMinutes()}\n`;
            inicio.setMinutes(inicio.getMinutes() + this.primero.minutos);
            aux = aux.sig;
        } while (inicio.getHours() < fin.getHours() || (inicio.getHours() == fin.getHours() &&
        inicio.getMinutes() <= fin.getMinutes()));

        return str;

    }
}


let rutas = new rutasDeTrasporte();
let base1 = new Base("base1", 10);
rutas.agregar(base1);
base1 = new Base("base2", 20);
rutas.agregar(base1);
base1 = new Base("base3", 30);
rutas.agregar(base1);

console.log(rutas.listar());

console.log(rutas.buscar("base2"));

//console.log(rutas.eliminar("base2"));
console.log(rutas.listar());

console.log(rutas.recorrido("base2", 8, 0, 11, 0));