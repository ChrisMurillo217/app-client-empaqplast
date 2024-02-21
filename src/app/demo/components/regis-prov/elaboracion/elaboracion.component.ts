import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-elaboracion',
  templateUrl: './elaboracion.component.html'
})
export class ElaboracionComponent {

    constructor( private router: Router ) {}

    nextPage() {
        this.router.navigate( [ 'registro/confirmacion' ] );
    }

    prevPage() {
        this.router.navigate( [ 'registro/terminos' ] );
    }
}
