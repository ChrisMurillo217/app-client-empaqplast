import { Component, OnInit, ViewChild, ElementRef }                from '@angular/core';

import { MessageService }                                           from 'primeng/api';

import { UsuariosService }                                          from '../../service/usuarios.service';

import { Usuarios }                                                 from '../../models/admin/usuarios.model';
import { Role }                                                    from '../../models/admin/role.model';

@Component({
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css'],
  providers: [ MessageService ]
})
export class RolComponent implements OnInit {
    roles:                  Role[] = [];
    newPerson:              boolean;
    submitted:              boolean;
    dataLoaded:             boolean = false;
    nombreRol:              string = '';
    descripcionRol:         string = '';

    @ViewChild( 'filter' ) filter!: ElementRef;

    constructor(
        private usuariosService: UsuariosService
    ) {}

    ngOnInit(): void {
        this.usuariosService.getRoles().subscribe(
            ( data ) => {
                this.roles = data;
                this.dataLoaded = true;
            },
            ( error ) => {
                console.error( error );
            }
        );
    }

    openNewRole() {
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

        const newRole: Role = {
            nombreRol:              this.nombreRol,
            descripcionRol:         this.descripcionRol,
        }

        // this.usuariosService.newUser( newPerson ).subscribe(
        //     ( response: any ) => {
        //         console.log( response );
        //     },
        //     ( error: any ) => {
        //         console.error( 'Error al registrar la persona', error );
        //     }
        // )

        this.newPerson = false;
    }
}
