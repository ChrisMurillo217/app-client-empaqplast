import { Component, OnInit }    from '@angular/core';
import { Router }               from '@angular/router';

import { Sucursal }             from '../../../models/proveedores/sucursal.model';

@Component({
  selector: 'app-sucursales',
  templateUrl: './sucursales.component.html'
})
export class SucursalesComponent implements OnInit {
    agregarSucursales:  string = '';
    sucursales:         Sucursal[] = [];
    nuevaSucursal:      Sucursal = { nombreSucP: '', dirSucP: '' };

    constructor( private router: Router ){}

    ngOnInit(): void {
        const storedData = JSON.parse( localStorage.getItem( 'sucursalesData' ) );
        const sucData = JSON.parse( localStorage.getItem( 'agregarSucursales' ) );
        if ( storedData ) {
            this.sucursales = storedData;
        }
        if ( sucData ) {
            this.agregarSucursales = sucData;
        }
    }

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

            localStorage.setItem( 'agregarSucursales', JSON.stringify( this.agregarSucursales ) );
            localStorage.setItem( 'sucursalesData', JSON.stringify( this.sucursales ) );

            // Vaciar los campos de entrada
            this.nuevaSucursal.nombreSucP = '';
            this.nuevaSucursal.dirSucP = '';
        }
    }
}
