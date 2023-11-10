import { Component, OnInit }                from '@angular/core';

import { MessageService }                   from 'primeng/api';

import { AuthService }                      from './../../service/auth.service';
import { Usuarios }                         from './../../models/usuarios.model';

@Component({
  templateUrl: './person.component.html',
  providers: [ MessageService ]
})
export class PersonComponent implements OnInit {
    loading:            boolean = true;
    usuarios:           Usuarios[] = [];
    usuario:            Usuarios;
    pedidoDialog:       boolean;
    submitted:          boolean;

    constructor( private authService: AuthService ) {}

    ngOnInit(): void {
        this.authService.getUsuariosList().subscribe(
            ( data ) => {
                this.usuarios = data;

                this.loading = false;
            },
            ( error ) => {
                console.error( error );
            }
        );
    }

    openNew() {
        this.submitted = false;
        this.pedidoDialog = true;
    }

    editUser( user: Usuarios ) {
        this.usuario = {...user};
        this.pedidoDialog = true;
    }

    hideDialog() {
        this.pedidoDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        this.submitted = true;
    }
}
