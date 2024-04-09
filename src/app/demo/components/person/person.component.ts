import { Component, OnInit, ViewChild, ElementRef }                 from '@angular/core';

import { MessageService }                                           from 'primeng/api';

import { UsuariosService }                                          from '../../service/usuarios.service';

import { Usuarios }                                                 from '../../models/admin/usuarios.model';
import { Person, Socios, Tipos }                                    from '../../models/admin/person.model';

@Component( {
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css'],
  providers: [ MessageService ],
} )
export class PersonComponent implements OnInit {
    datos:                  Person[] = [];
    tipos:                  Tipos[] = [];
    socios:                 Socios[] = [];
    newPerson:              boolean;
    submitted:              boolean;
    dataLoaded:             boolean = false;
    nombreUsuarioTr:        string = '';
    apellidoUsuarioTr:      string = '';
    direccionUsuarioTr:     string = '';
    emailUsuarioTr:         string = '';
    telefonoUsuarioTr:      string = '';
    cardCode:               string = '';
    seriesNameSucursal:     string = '';
    cardName:               string = '';
    tipoUsuario:            number = 0;
    userType:               number = 0;
    filteredSocios:         any[] = [];
    sucursales:             any[] = [
        { key: 'UIO', name: 'Quito' },
        { key: 'GYE', name: 'Guayaquil' }
    ];

    @ViewChild( 'filter' ) filter!: ElementRef;

    constructor(
        private usuariosService: UsuariosService,
        private messageService: MessageService
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
        this.usuariosService.getTiposUsuarios().subscribe(
            ( data ) => {
                this.tipos = data;
            },
            ( error ) => {
                console.error( error );
            }
        )
        this.submitted = false;
    }

    handleTipoUsuario(event: any) {
        let type = '';
        switch ( event ) {
            case 1:
                type = 'C'
                break;
            case 2:
                type = 'S'
                break;
            case 3:
                this.cardCode = 'CN1791240111001';
                this.cardName = 'Empaqplast S.A.';
                break;
            default:
                break;
        }
        this.usuariosService.getClienteOProveedor( type ).subscribe(
            ( data ) => {
                this.socios = data;
            },
            ( error ) => {
                console.error( error );
            }
        )
    }

    filterSocio( event ) {
        let filtered : any[] = [];
        let query = event.query;

        for( let i = 0; i < this.socios.length; i++ ) {
            let socio = this.socios[i];
            if ( socio.cardName.toLowerCase().indexOf( query ) == 0) {
                filtered.push( socio );
            }
        }

        this.filteredSocios = filtered;
    }

    filterSocioCode( event ) {
        this.cardCode = event.cardCode;

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
            telefonoUsuarioTr:      this.telefonoUsuarioTr,
            cardCode:               this.cardCode,
            seriesNameSucursal:     this.seriesNameSucursal,
            cardName:               this.cardName,
            tipoUsuario:            this.tipoUsuario
        }

        this.usuariosService.newPerson( newPerson ).subscribe( // Aquí se esta enviando el objeto newPerson de tipo Dates al metodo newUser para guardar en la BD
            ( response: any ) => {
                this.messageService.add(
                    {
                        severity:'success',
                        summary: response.response,
                        detail: 'El registro de ' + this.nombreUsuarioTr + this.apellidoUsuarioTr + ' fue realizado.'
                    }
                );
            },
            ( error: any ) => {
                this.messageService.add(
                    {
                        severity:'error',
                        summary: error.error,
                        detail: 'No se pudo registrar a la persona.'
                    }
                );
            }
        )

        this.usuariosService.getDatosUsuarios().subscribe( // Llama al metodo de getDatosUsuarios del UsuarioService para obtener la lista de personas creadas
            ( data ) => {
                this.datos = data; // Guarda la información en la variable de datos
                this.dataLoaded = true;
            },
            ( error ) => {
                console.error( error );
            }
        );

        this.newPerson = false;
    }
}
