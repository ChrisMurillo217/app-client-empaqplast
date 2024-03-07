import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/demo/service/proveedores/general.service';

@Component( {
  selector: 'app-terminos',
  templateUrl: './terminos.component.html'
} )
export class TerminosComponent {
    terminos                : string;
    leyendaDisclaimer       : any[];

    constructor(
        private router: Router,
        private generalService: GeneralService
    ) {
        this.leyendaDisclaimer = [
            {
                label: 'Si',
                value: '1'
            },
            {
                label: 'No',
                value: '0'
            }
        ];
    }

    ngOnInit(): void {
        this.generalService.getTerminos().subscribe(
            ( data ) => {
                this.terminos = data;
            }
        )
    }

    nextPage() {
        localStorage.setItem( 'terminosData', JSON.stringify( this.leyendaDisclaimer ) );
        this.router.navigate( [ 'registro/elaboracion' ] );
    }

    prevPage() {
        this.router.navigate( [ 'registro/clientes' ] );
    }
}
