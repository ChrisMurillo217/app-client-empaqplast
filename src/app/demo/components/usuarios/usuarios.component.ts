import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from './../../service/auth.service';
import { Usuarios } from './../../models/usuarios.model';
import { InfoUsers } from '../../models/info-users.model';
import { Dates } from '../../models/dates.model';
import { Role } from '../../models/role.model';

@Component({
    templateUrl: './usuarios.component.html',
    providers: [ MessageService ]
})
export class UsuariosComponent implements OnInit {
    loading:                boolean = true;
    usuarios:               Usuarios[] = [];
    userNew:                InfoUsers;
    usuario:                Usuarios;
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
    rol:                    Role

    constructor(
        private authService: AuthService
    ) {}

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
        this.newUser = true;
    }

    editUser( user: Usuarios ) {
        this.usuario = {...user};
        this.editarUser = true;
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
    }
}
