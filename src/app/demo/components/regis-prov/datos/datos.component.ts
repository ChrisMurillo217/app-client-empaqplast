import { Component }                from '@angular/core';
import { Router }                   from '@angular/router';
import { Datos } from 'src/app/demo/models/datos.model';

@Component( {
  selector: 'app-datos',
  templateUrl: './datos.component.html'
} )
export class DatosComponent {
    blockSpace:         RegExp = /[^\s]/;
    datosFin:           Datos[] = [];
    nuevoDatoFin:       Datos = {
                            nombrePagoBP: '',
                            direccionBP: '',
                            numeroBP: '',
                            codigoABABP: '',
                            ciudadBP: '',
                            paisBP: '',
                            tipoCBP: '',
                            codigoSwiftBP: ''
                        }

    constructor( private router: Router ){}

    nextPage() {
        this.router.navigate( [ 'registro/sucursales' ] );
    }

    prevPage() {
        this.router.navigate( [ 'registro/general' ] );
    }

    agregarCampos() {
        if (
            this.nuevoDatoFin.nombrePagoBP.trim() !== '' &&
            this.nuevoDatoFin.direccionBP.trim() !== '' &&
            this.nuevoDatoFin.numeroBP.trim() !== '' &&
            this.nuevoDatoFin.codigoABABP.trim() !== '' &&
            this.nuevoDatoFin.ciudadBP.trim() !== '' &&
            this.nuevoDatoFin.paisBP.trim() !== '' &&
            this.nuevoDatoFin.tipoCBP.trim() !== '' &&
            this.nuevoDatoFin.codigoSwiftBP.trim() !== ''
        ) {
            this.datosFin.push( { ...this.nuevoDatoFin } );

            this.nuevoDatoFin.nombrePagoBP = '';
            this.nuevoDatoFin.direccionBP = '';
            this.nuevoDatoFin.numeroBP = '';
            this.nuevoDatoFin.codigoABABP = '';
            this.nuevoDatoFin.ciudadBP = '';
            this.nuevoDatoFin.paisBP = '';
            this.nuevoDatoFin.tipoCBP = '';
            this.nuevoDatoFin.codigoSwiftBP = '';
        }
    }
}
