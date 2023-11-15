import { Component, OnInit, ViewChild, ElementRef }                 from '@angular/core';

import { MessageService }                                           from 'primeng/api';

import { AuthService }                                              from './../../service/auth.service';
import { UsuariosService }                                          from '../../service/usuarios.service';

import { Usuarios }                                                 from './../../models/usuarios.model';
import { InfoUsers }                                                from '../../models/info-users.model';
import { Dates }                                                    from '../../models/dates.model';

@Component({
    templateUrl: './usuarios.component.html',
    styleUrls: ['./usuarios.component.css'],
    providers: [ MessageService ],
})
export class UsuariosComponent implements OnInit {
    dates:                  Dates[] = [];
    usuarios:               Usuarios[] = [];
    newUser:                boolean;
    editarUser:             boolean;
    submitted:              boolean;
    selectedPerson:         any = {};
    idDatosU:               number;
    idRol:                  number;
    nombreUsuarioTrL:       string;
    contrasenaUsuarioTrL:   string;
    cardCode:               string;
    cardName:               string;
    seriesNameSucursal:     string;
    dataLoaded:             boolean = false;
    filteredPerson:         any[] = [];
    sucursales:             any[] = [
        {
            key: 'UIO',
            name: 'Quito'
        },
        {
            key: 'GYE',
            name: 'Guayaquil'
        }
    ]

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
        this.submitted = false;
    }

    filterPerson( event: any ) {
        const query = event.query.toLowerCase();

        this.filteredPerson = this.dates.filter(
            ( user: any ) => {
                return user.label.toLowerCase().includes( query )
            }
        );
        console.log(this.filteredPerson);

    }

    onPersonSelect( event: any ) {
        if ( event.value ) {
            const personaSeleccionada: Dates = event.value;
            console.log(personaSeleccionada);

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

        const nuevoUsuario: InfoUsers = {
            idDatosU: this.idDatosU,
            idRol: this.idRol,
            nombreUsuarioTrL: this.nombreUsuarioTrL,
            contrasenaUsuarioTrL: this.contrasenaUsuarioTrL,
            cardCode: this.cardCode,
            cardName: this.cardName,
            seriesNameSucursal: this.seriesNameSucursal,
        }

        // this.usuariosService.newUser( nuevoUsuario ).subscribe(
        //     ( response ) => {
        //         console.log('Usuario creado con éxito:', response);
        //     },
        //     ( error ) => {
        //         console.error('Error al crear el usuario:', error);
        //     }
        // );

        this.newUser = false;
    }
}
