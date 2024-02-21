import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component( {
  selector: 'app-terminos',
  templateUrl: './terminos.component.html'
} )
export class TerminosComponent {
    leyendaDisclaimer: any[];

    constructor( private router: Router ) {
        this.leyendaDisclaimer = [
            {
                label: 'No',
                value: 'No'
            },
            {
                label: 'Si',
                value: 'Si'
            }
        ];
    }

    nextPage() {
        this.router.navigate( [ 'registro/elaboracion' ] );
    }

    prevPage() {
        this.router.navigate( [ 'registro/clientes' ] );
    }
}
