import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.component.html'
})
export class ConfirmacionComponent {

    constructor( private router: Router ) {}

    finalizar() {
        this.router.navigate( [ 'registro/confirmacion' ] );
    }

    prevPage() {
        this.router.navigate( [ 'registro/elaboracion' ] );
    }

}
