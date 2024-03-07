import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { General } from 'src/app/demo/models/general.model';

@Component({
  selector: 'app-elaboracion',
  templateUrl: './elaboracion.component.html'
})
export class ElaboracionComponent {
    elaboracion:            General[] = [];
    nuevaElab:              General = { nombreEmpP: '', cargoEmpP: '' };

    constructor( private router: Router ) {}

    nextPage() {
        if ( this.nuevaElab.nombreEmpP.trim() !== '' && this.nuevaElab.cargoEmpP.trim() !== '' ) {
            this.elaboracion.push( { ...this.nuevaElab } );
            
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
