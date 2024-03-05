import { Component }                from '@angular/core';
import { Router }                   from '@angular/router';
import { General }                  from 'src/app/demo/models/general.model';

@Component( {
  selector: 'app-datos',
  templateUrl: './datos.component.html'
} )
export class DatosComponent {
    blockSpace:         RegExp = /[^\s]/;
    datosFin:           General[] = [];
    nuevoDatoFin:       General = {
                            nombrePagoBp: '',
                            direccionBp: '',
                            numeroBp: '',
                            codigoAbabp: '',
                            ciudadBp: 0,
                            paisBp: 0,
                            tipoCbp: '',
                            codigoSwiftBp: ''
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
            this.nuevoDatoFin.nombrePagoBp.trim() !== '' &&
            this.nuevoDatoFin.direccionBp.trim() !== '' &&
            this.nuevoDatoFin.numeroBp.trim() !== '' &&
            this.nuevoDatoFin.codigoAbabp.trim() !== '' &&
            this.nuevoDatoFin.ciudadBp !== 0 &&
            this.nuevoDatoFin.paisBp !== 0 &&
            this.nuevoDatoFin.tipoCbp.trim() !== '' &&
            this.nuevoDatoFin.codigoSwiftBp.trim() !== ''
        ) {
            this.datosFin.push( { ...this.nuevoDatoFin } );

            this.nuevoDatoFin.nombrePagoBp = '';
            this.nuevoDatoFin.direccionBp = '';
            this.nuevoDatoFin.numeroBp = '';
            this.nuevoDatoFin.codigoAbabp = '';
            this.nuevoDatoFin.ciudadBp = 0;
            this.nuevoDatoFin.paisBp = 0;
            this.nuevoDatoFin.tipoCbp = '';
            this.nuevoDatoFin.codigoSwiftBp = '';
        }
    }
}
