import { Component }                from '@angular/core';
import { Router }                   from '@angular/router';
import { Contacto }                 from 'src/app/demo/models/contacto.model';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html'
})
export class ContactoComponent {
    contactos:          Contacto[] = [];
    nuevoContacto:      Contacto = {
                            nombre: '',
                            cargo: '',
                            celular: '',
                            telefono: '',
                            mail: ''
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
            this.nuevoContacto.nombre.trim() !== '' &&
            this.nuevoContacto.cargo.trim() !== '' &&
            this.nuevoContacto.celular.trim() !== '' &&
            this.nuevoContacto.telefono.trim() !== '' &&
            this.nuevoContacto.mail.trim() !== ''
        ) {
            // Agregar la nueva sucursal al vector
            this.contactos.push( { ...this.nuevoContacto } );

            // Vaciar los campos de entrada
            this.nuevoContacto.nombre = '';
            this.nuevoContacto.cargo = '';
            this.nuevoContacto.celular = '';
            this.nuevoContacto.telefono = '';
            this.nuevoContacto.mail = '';
        }
    }
}
