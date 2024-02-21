import { Component }                from '@angular/core';
import { Router }                   from '@angular/router';
import { Clientes } from 'src/app/demo/models/clientes.model';

@Component( {
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
} )
export class ClientesComponent {
    clientes:               Clientes[] = [];
    nuevoCliente:           Clientes = {
                                    nomRefPC: '',
                                    contacRefPC: '',
                                    emailRefPC: '',
                                    paisRefPC: '',
                                    ciudadRefPC: ''
                                };

    constructor( private router: Router ){}

    nextPage() {
        this.router.navigate( [ 'registro/terminos' ] );
    }

    prevPage() {
        this.router.navigate( [ 'registro/certificaciones' ] );
    }

    agregarCampos() {
        // Verificar si los campos están llenos
        if (
            this.nuevoCliente.nomRefPC.trim() !== '' &&
            this.nuevoCliente.contacRefPC.trim() !== '' &&
            this.nuevoCliente.emailRefPC.trim() !== '' &&
            this.nuevoCliente.paisRefPC.trim() !== '' &&
            this.nuevoCliente.ciudadRefPC.trim() !== ''
        ) {
            // Agregar la nueva sucursal al vector
            this.clientes.push( { ...this.nuevoCliente } );

            // Vaciar los campos de entrada
            this.nuevoCliente.nomRefPC = '';
            this.nuevoCliente.contacRefPC = '';
            this.nuevoCliente.emailRefPC = '';
            this.nuevoCliente.paisRefPC = '';
            this.nuevoCliente.ciudadRefPC = '';
        }
    }
}
