import { Component, OnInit }        from '@angular/core';
import { Router }                   from '@angular/router';

import { Elaboracion }              from 'src/app/demo/models/proveedores/general.model';

@Component({
  selector: 'app-elaboracion',
  templateUrl: './elaboracion.component.html'
})
export class ElaboracionComponent implements OnInit {
    elaboracion:            Elaboracion;
    nuevaElab:              Elaboracion = { nombreEmpP: '', cargoEmpP: '' };

    constructor( private router: Router ) {}

    ngOnInit(): void {
        // Obtener datos del localStorage si existen
        const storedData = JSON.parse( localStorage.getItem( 'elaboracionData' ) );
        if ( storedData ) {
            this.elaboracion = storedData;
            const lastInfo = this.elaboracion;
            this.nuevaElab = {
                nombreEmpP: lastInfo.nombreEmpP || '',
                cargoEmpP: lastInfo.cargoEmpP || ''
            }
        }
    }

    nextPage() {
        if ( this.nuevaElab.nombreEmpP.trim() !== '' && this.nuevaElab.cargoEmpP.trim() !== '' ) {
            this.elaboracion = {
                nombreEmpP: this.nuevaElab.nombreEmpP,
                cargoEmpP: this.nuevaElab.cargoEmpP
            };

            localStorage.setItem( 'elaboracionData', JSON.stringify( this.elaboracion ) );

            this.nuevaElab.nombreEmpP = '';
            this.nuevaElab.cargoEmpP = '';
        }

        this.router.navigate( [ 'registro/confirmacion' ] );
    }

    prevPage() {
        this.router.navigate( [ 'registro/terminos' ] );
    }
}
