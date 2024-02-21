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
    nuevaSucursal:      Sucursal = { nombre: '', direccion: '' };

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
            this.nuevaSucursal.nombre.trim() !== '' &&
            this.nuevaSucursal.direccion.trim() !== ''
        ) {
            // Agregar la nueva sucursal al vector
            this.sucursales.push( { ...this.nuevaSucursal } );

            // Vaciar los campos de entrada
            this.nuevaSucursal.nombre = '';
            this.nuevaSucursal.direccion = '';
        }
    }
}
