import { Component, OnInit, ViewChild, ElementRef }                 from '@angular/core';

import { MessageService }                                           from 'primeng/api';

import { AuthService }                                              from './../../service/auth.service';
import { UsuariosService }                                          from '../../service/usuarios.service';

import { Usuarios }                                                 from './../../models/usuarios.model';
import { InfoUsers }                                                from '../../models/info-users.model';
import { Dates }                                                    from '../../models/dates.model';
import { Role }                                                     from '../../models/role.model';

@Component({
    templateUrl: './usuarios.component.html',
    providers: [ MessageService ],
    styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
    dates:                  Dates[] = [];
    usuarios:               Usuarios[] = [];
    usuario:                Usuarios;
    loading:                boolean = true;
    newUser:                boolean;
    editarUser:             boolean;
    submitted:              boolean;
    idDatosU:               number;
    idRol:                  number;
    nombreUsuarioTrL:       string;
    contrasenaUsuarioTrL:   string;
    cardCode:               string;
    cardName:               string;
    seriesNameSucursal:     string;
    datos:                  Dates;
    rol:                    Role;
    dataLoaded:             boolean = false;
    clonedUsers:         { [s: string]: Usuarios; } = {};

    @ViewChild( 'filter' ) filter!: ElementRef;

    constructor(
        private authService: AuthService,
        private usuariosService: UsuariosService
    ) {}

    ngOnInit(): void {
        this.authService.getUsuariosList().subscribe(
            ( data ) => {
                this.usuarios = data;
                this.loading = false;
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
                console.log(this.dates);
            },
            ( error ) => {
                console.error( error );
            }
        );
        this.submitted = false;
    }

    editUser( user: Usuarios ) {
        this.usuario = {...user};
        this.editarUser = true;
        this.clonedUsers[user.datosLogin.nombreUsuarioTrL] = {...user};
    }

    hideDialog() {
        this.newUser = false;
        this.submitted = false;
    }

    saveProduct() {
        this.submitted = true;

        const nuevoUsuario: InfoUsers = {
            idDatosU: this.idDatosU,
            idRol: this.idRol,
            nombreUsuarioTrL: this.nombreUsuarioTrL,
            contrasenaUsuarioTrL: this.contrasenaUsuarioTrL,
            cardCode: this.cardCode,
            cardName: this.cardName,
            seriesNameSucursal: this.seriesNameSucursal,
            datos: this.datos,
            rol: this.rol
        }

        this.usuariosService.newUser( nuevoUsuario ).subscribe(
            ( response ) => {
                console.log('Usuario creado con éxito:', response);
            },
            ( error ) => {
                console.error('Error al crear el usuario:', error);
            }
        );

        this.newUser = false;
    }
}
