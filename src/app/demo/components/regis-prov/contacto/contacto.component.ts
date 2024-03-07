import { Component }                from '@angular/core';
import { Router }                   from '@angular/router';
import { Contacto }                 from 'src/app/demo/models/contacto.model';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html'
})
export class ContactoComponent {
    blockSpace:         RegExp = /[^\s]/;
    contactos:          Contacto[] = [];
    nuevoContacto:      Contacto = {
                            nombrePc: '',
                            cargoPc: '',
                            celPc: '',
                            telPc: '',
                            dirPc: '',
                            emailPc: ''
                        };

    constructor( private router: Router ){}

    nextPage() {
        this.router.navigate( [ 'registro/certificaciones' ] );
    }

    prevPage() {
        this.router.navigate( [ 'registro/sucursales' ] );
    }

    agregarCampos() {
        // Verificar si los campos están llenos
        if (
            this.nuevoContacto.nombrePc.trim() !== '' &&
            this.nuevoContacto.cargoPc.trim() !== '' &&
            this.nuevoContacto.celPc.trim() !== '' &&
            this.nuevoContacto.telPc.trim() !== '' &&
            this.nuevoContacto.dirPc.trim() !== '' &&
            this.nuevoContacto.emailPc.trim() !== ''
        ) {
            // Agregar la nueva sucursal al vector
            this.contactos.push( { ...this.nuevoContacto } );

            localStorage.setItem( 'contactoData', JSON.stringify( this.contactos ) );

            // Vaciar los campos de entrada
            this.nuevoContacto.nombrePc = '';
            this.nuevoContacto.cargoPc = '';
            this.nuevoContacto.celPc = '';
            this.nuevoContacto.telPc = '';
            this.nuevoContacto.dirPc = '';
            this.nuevoContacto.emailPc = '';
        }
    }
}
