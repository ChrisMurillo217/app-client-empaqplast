import { Component }            from '@angular/core';
import { Router }               from '@angular/router';

import { Sucursal }             from '../../../models/sucursal.model';

@Component({
  selector: 'app-sucursales',
  templateUrl: './sucursales.component.html'
})
export class SucursalesComponent {
    agregarSucursales:  string = '';
    sucursales:         Sucursal[] = [];
    nuevaSucursal:      Sucursal = { nombreSucP: '', dirSucP: '' };

    constructor( private router: Router ){}

    nextPage() {
        this.router.navigate( [ 'registro/contacto' ] );
    }

    prevPage() {
        this.router.navigate( [ 'registro/datos' ] );
    }

    agregarCampos() {
        // Verificar si los campos están llenos
        if (
            this.nuevaSucursal.nombreSucP.trim() !== '' &&
            this.nuevaSucursal.dirSucP.trim() !== ''
        ) {
            // Agregar la nueva sucursal al vector
            this.sucursales.push( { ...this.nuevaSucursal } );

            localStorage.setItem( 'sucursalesData', JSON.stringify( this.sucursales ) );

            // Vaciar los campos de entrada
            this.nuevaSucursal.nombreSucP = '';
            this.nuevaSucursal.dirSucP = '';
        }
    }
}
