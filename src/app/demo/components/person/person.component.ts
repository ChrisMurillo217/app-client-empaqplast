import { Component, OnInit, ViewChild, ElementRef }                 from '@angular/core';

import { MessageService }                                           from 'primeng/api';

import { UsuariosService }                                          from '../../service/usuarios.service';

import { Usuarios }                                                 from './../../models/usuarios.model';
import { Dates }                                                    from '../../models/dates.model';

@Component({
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css'],
  providers: [ MessageService ],
})
export class PersonComponent implements OnInit {
    datos:                  Dates[] = [];
    newPerson:              boolean;
    submitted:              boolean;
    dataLoaded:             boolean = false;
    nombreUsuarioTr:        string = '';
    apellidoUsuarioTr:      string = '';
    direccionUsuarioTr:     string = '';
    emailUsuarioTr:         string = '';
    telefonoUsuarioTr:      string = '';

    @ViewChild( 'filter' ) filter!: ElementRef;

    constructor(
        private usuariosService: UsuariosService
    ) {}

    ngOnInit(): void {
        this.usuariosService.getDatosUsuarios().subscribe(
            ( data ) => {
                this.datos = data;
                this.dataLoaded = true;
            },
            ( error ) => {
                console.error( error );
            }
        );
    }

    openNewDate() {
        this.newPerson = true;
        this.submitted = false;
    }

    editUser( user: Usuarios ) {
        this.newPerson = true;
    }

    hideDialog() {
        this.newPerson = false;
        this.submitted = false;
    }

    savePerson() {
        this.submitted = true

        const newPerson: Dates = {
            nombreUsuarioTr:        this.nombreUsuarioTr,
            apellidoUsuarioTr:      this.apellidoUsuarioTr,
            direccionUsuarioTr:     this.direccionUsuarioTr,
            emailUsuarioTr:         this.emailUsuarioTr,
            telefonoUsuarioTr:      this.telefonoUsuarioTr
        }

        this.usuariosService.newUser( newPerson ).subscribe(
            ( response: any ) => {
                console.log( response );
            },
            ( error: any ) => {
                console.error( 'Error al registrar la persona', error );
            }
        )

        this.newPerson = false;
    }
}
