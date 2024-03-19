import { Component, OnInit, ViewChild, ElementRef }                 from '@angular/core';

import { MessageService }                                           from 'primeng/api';

import { AuthService }                                              from './../../service/auth.service';
import { UsuariosService }                                          from '../../service/usuarios.service';

import { Usuarios }                                                 from '../../models/admin/usuarios.model';
import { InfoUsers }                                                from '../../models/admin/info-users.model';
import { Person }                                                   from '../../models/admin/person.model';
import { Role }                                                     from '../../models/admin/role.model';

@Component({
    templateUrl: './usuarios.component.html',
    styleUrls: ['./usuarios.component.css'],
    providers: [ MessageService ],
})
export class UsuariosComponent implements OnInit {
    dates:                  Person[] = [];
    rol:                    Role[] = [];
    usuarios:               Usuarios[] = [];
    newUser:                boolean;
    editarUser:             boolean;
    submitted:              boolean;
    selectedPerson:         any = {};
    dataLoaded:             boolean = false;
    filteredPerson:         any[] = [];
    sucursales:             any[] = [
        { key: 'UIO', name: 'Quito' },
        { key: 'GYE', name: 'Guayaquil' }
    ]
    user:                   InfoUsers;
    nuevoUsuario:           InfoUsers = {
                                idDatosU : 0,
                                nombreUsuarioTrL : '',
                                contrasenaUsuarioTrL : '',
                                idRol : 0,
                                cardCode : '',
                                cardName : '',
                                seriesNameSucursal : ''
                            }

    @ViewChild( 'filter' ) filter!: ElementRef;

    constructor(
        private authService: AuthService,
        private usuariosService: UsuariosService
    ) {}

    ngOnInit(): void {
        this.authService.getUsuariosList().subscribe(
            ( data ) => {
                this.usuarios = data;
                this.dataLoaded = true;
            },
            ( error ) => {
                console.error( error );
            }
        );
    }

    openNew() {
        this.newUser = true;
        this.usuariosService.getDatosUsuarios().subscribe(
            ( data ) => {
                this.dates = data;
            },
            ( error ) => {
                console.error( error );
            }
        );
        this.usuariosService.getRoles().subscribe(
            ( data ) => {
                this.rol = data;
            },
            ( error ) => {
                console.error( error );
            }
        );
        this.submitted = false;
    }

    filterPerson( event: any ) {
        let filtered: any[] = []
        let query = event.query.toLowerCase();

        for( let i = 0; i < this.dates.length; i++ ) {
            let user = this.dates[i];
            if ( user.nombreUsuarioTr.toLowerCase().indexOf( query.toLowerCase() ) == 0 ) {
                filtered.push( user );
            }
        }

        this.filteredPerson = filtered;
    }

    onPersonSelect( event: any ) {
        if ( event ) {
            this.selectedPerson = event;
        }
    }

    editUser( user: Usuarios ) {
        this.editarUser = true;
    }

    hideDialog() {
        this.newUser = false;
        this.submitted = false;
    }

    saveProduct() {
        this.submitted = true;
        this.nuevoUsuario.idDatosU = this.selectedPerson.idDatosU;
        this.nuevoUsuario.nombreUsuarioTrL = this.selectedPerson.emailUsuarioTr;

        this.user = {
            idDatosU: this.nuevoUsuario.idDatosU,
            nombreUsuarioTrL: this.nuevoUsuario.nombreUsuarioTrL,
            contrasenaUsuarioTrL: this.nuevoUsuario.contrasenaUsuarioTrL,
            idRol: this.nuevoUsuario.idRol,
            cardCode: this.nuevoUsuario.cardCode,
            seriesNameSucursal: this.nuevoUsuario.seriesNameSucursal,
            cardName: this.nuevoUsuario.cardName,
        }

        this.usuariosService.newUser( this.user ).subscribe(
            ( response ) => {
                console.log( response );
            },
            ( error ) => {
                console.error( 'Error al crear el usuario:', error );
            }
        );

        this.newUser = false;
    }
}
