import { Component, OnInit }            from '@angular/core';
import { Router }                       from '@angular/router';

import { Clientes }                     from 'src/app/demo/models/proveedores/clientes.model';
import { Ciudad, Estado, Pais }         from 'src/app/demo/models/proveedores/geolocation.model';

import { GeolocationService }           from 'src/app/demo/service/proveedores/geolocation.service';

@Component( {
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
} )
export class ClientesComponent implements OnInit {
    blockSpace:             RegExp = /[^\s]/;
    filteredCountries:      any[];
    filteredStates:         any[];
    filteredCities:         any[];
    paisNombre:             string;
    paisId:                 number;
    estadoNombre:           string;
    estadoId:               number;
    ciudadNombre:           string;
    ciudadId:               number;
    ciudadRefPc:            Ciudad;
    estadoRefPc:            Estado;
    paisRefPc:              Pais;
    pais:                   Pais[] = [];
    clientes:               Clientes[] = [];
    clientesVista:          Clientes[] = [];
    nuevoCliente:           Clientes = {
                                    nomRefPc: '',
                                    contacRefPc: '',
                                    emailRefPc: '',
                                    paisRefPc: 0,
                                    estadoRefPc: 0,
                                    ciudadRefPc: 0
                                };
    nuevoClienteVista:      any = {
                                    nomRefPc: '',
                                    contacRefPc: '',
                                    emailRefPc: '',
                                    paisRefPc: '',
                                    ciudadRefPc: ''
                                };

    constructor(
        private router: Router,
        private geolocationService: GeolocationService
    ) {}

    ngOnInit(): void {
        this.geolocationService.getPais().subscribe(
            ( data ) => {
                this.pais = data;
            }
        )
        const storedData = JSON.parse( localStorage.getItem( 'clienteData' ) );
        if ( storedData ) {
            for (let i = 0; i < storedData.length; i++) {
                this.clientes.push( { ...storedData[i] } );
            }
            const procesarDatosCliente = async ( data ) => {
                for ( let i = 0; i < data.length; i++ ) {
                    const paisData = await obtenerDatosPais( data[i].paisRefPc );
                    const estadoData = await obtenerDatosEstado( data[i].estadoRefPc, paisData.id );
                    const ciudadData = await obtenerDatosCiudad( data[i].ciudadRefPc, estadoData.id );

                    const nuevoClienteVista = {
                        nomRefPc: data[i].nomRefPc,
                        contacRefPc: data[i].contacRefPc,
                        emailRefPc: data[i].emailRefPc,
                        paisRefPc: paisData.name,
                        ciudadRefPc: ciudadData.name
                    };

                    this.clientesVista.push( { ...nuevoClienteVista } );
                }
            };

            const obtenerDatosPais = async ( paisRefPc ) => {
                const data = await this.geolocationService.getPais().toPromise();
                return data.find( pais => pais.id === paisRefPc );
            };

            const obtenerDatosEstado = async ( estadoRefPc, paisId ) => {
                const data = await this.geolocationService.getEstado( paisId ).toPromise();
                return data.find( estado => estado.id === estadoRefPc );
            };

            const obtenerDatosCiudad = async ( ciudadRefPc, estadoId ) => {
                const data = await this.geolocationService.getCiudad( estadoId ).toPromise();
                return data.find( ciudad => ciudad.id === ciudadRefPc );
            };

            procesarDatosCliente( storedData )
                .then().catch( error => console.error( error ) );
        }
    }

    nextPage() {
        this.router.navigate( [ 'registro/terminos' ] );
    }

    prevPage() {
        this.router.navigate( [ 'registro/certificaciones' ] );
    }

    filterCountry( event ) {
        let filtered : any[] = [];
        let query = event.query;

        for( let i = 0; i < this.pais.length; i++ ) {
            let country = this.pais[i];
            if ( country.name.toLowerCase().indexOf( query ) == 0) {
                filtered.push( country );
            }
        }

        this.filteredCountries = filtered;
    }

    filterState( event ) {
        let query = event.query;
        let filtered: any[] = [];

        // Obtener el ID del país seleccionado
        let selectedCountry = this.paisRefPc;

        if ( selectedCountry ) {
            let selectedCountryId = selectedCountry.id
            // Hacer la solicitud de los estados basados en el ID del país
            this.geolocationService.getEstado( selectedCountryId ).subscribe(
                ( data ) => {
                    // Filtrar los estados que coincidan con la consulta
                    for ( let i = 0; i < data.length; i++ ) {
                        let state = data[i];
                        if ( state.name.toLowerCase().indexOf( query ) == 0 ) {
                            filtered.push( state );
                        }
                    }
                    this.filteredStates = filtered;
                },
                ( error ) => {
                    console.error( error );
                }
            );
        }
    }

    filterCity( event ) {
        let query = event.query;
        let filtered: any[] = [];

        // Obtener el ID del estado seleccionado
        let selectedState = this.estadoRefPc;

        if ( selectedState ) {
            let selectedStateId = selectedState.id
            // Hacer la solicitud de las ciudades basadas en el ID del estado
            this.geolocationService.getCiudad( selectedStateId ).subscribe(
                ( data ) => {
                    // Filtrar las ciudades que coincidan con la consulta
                    for ( let i = 0; i < data.length; i++ ) {
                        let city = data[i];
                        if ( city.name.toLowerCase().indexOf( query ) == 0 ) {
                            filtered.push( city );
                        }
                    }
                    this.filteredCities = filtered;
                },
                ( error ) => {
                    console.error( error );
                }
            );
        }
    }

    agregarCampos() {
        // Verificar si los campos están llenos
        if (
            this.nuevoCliente.nomRefPc.trim() !== '' &&
            this.nuevoCliente.contacRefPc.trim() !== '' &&
            this.nuevoCliente.emailRefPc.trim() !== '' &&
            this.paisRefPc.id !== 0 &&
            this.estadoRefPc.id !== 0 &&
            this.ciudadRefPc.id !== 0
        ) {
            this.nuevoCliente.paisRefPc = this.paisRefPc.id;
            this.nuevoCliente.ciudadRefPc = this.ciudadRefPc.id;
            this.nuevoCliente.estadoRefPc = this.estadoRefPc.id;

            this.nuevoClienteVista.nomRefPc = this.nuevoCliente.nomRefPc;
            this.nuevoClienteVista.contacRefPc = this.nuevoCliente.contacRefPc;
            this.nuevoClienteVista.emailRefPc = this.nuevoCliente.emailRefPc;
            this.nuevoClienteVista.paisRefPc = this.paisRefPc.name;
            this.nuevoClienteVista.ciudadRefPc = this.ciudadRefPc.name;

            // Agregar la nueva sucursal al vector
            this.clientes.push( { ...this.nuevoCliente } );
            this.clientesVista.push( { ...this.nuevoClienteVista } );

            localStorage.setItem( 'clienteData', JSON.stringify( this.clientes ) );

            // Vaciar los campos de entrada
            this.nuevoCliente.nomRefPc = '';
            this.nuevoCliente.contacRefPc = '';
            this.nuevoCliente.emailRefPc = '';
            this.nuevoCliente.paisRefPc = 0;
            this.nuevoCliente.estadoRefPc = 0;
            this.nuevoCliente.ciudadRefPc = 0;
        }
    }
}
