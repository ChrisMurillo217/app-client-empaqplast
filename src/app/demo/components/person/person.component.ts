import { Component, OnInit, ViewChild, ElementRef }                 from '@angular/core';

import { MessageService }                                           from 'primeng/api';

import { UsuariosService }                                          from '../../service/usuarios.service';

import { Usuarios }                                                 from '../../models/admin/usuarios.model';
import { Person }                                                    from '../../models/admin/person.model';

@Component({
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css'],
  providers: [ MessageService ],
})
export class PersonComponent implements OnInit {
    datos:                  Person[] = [];
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
        this.usuariosService.getDatosUsuarios().subscribe( // Llama al metodo de getDatosUsuarios del UsuarioService para obtener la lista de personas creadas
            ( data ) => {
                this.datos = data; // Guarda la información en la variable de datos
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

    savePerson() { // En este metodo se esta generando la lógica para almacenar en la base de datos una nueva persona
        this.submitted = true

        const newPerson: Person = {
            nombreUsuarioTr:        this.nombreUsuarioTr,
            apellidoUsuarioTr:      this.apellidoUsuarioTr,
            direccionUsuarioTr:     this.direccionUsuarioTr,
            emailUsuarioTr:         this.emailUsuarioTr,
            telefonoUsuarioTr:      this.telefonoUsuarioTr
        }
        
        this.usuariosService.newPerson( newPerson ).subscribe( // Aquí se esta enviando el objeto newPerson de tipo Dates al metodo newUser para guardar en la BD
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
