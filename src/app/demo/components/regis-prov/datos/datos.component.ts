import { Component, OnInit }            from '@angular/core';
import { Router }                       from '@angular/router';

import { Datos }                        from 'src/app/demo/models/proveedores/general.model';
import { Ciudad, Estado, Pais }         from 'src/app/demo/models/proveedores/geolocation.model';

import { GeolocationService }           from 'src/app/demo/service/proveedores/geolocation.service';

@Component( {
  selector: 'app-datos',
  templateUrl: './datos.component.html'
} )
export class DatosComponent implements OnInit {
    blockSpace:         RegExp = /[^\s]/;
    filteredCountries:  any[];
    filteredStates:     any[];
    filteredCities:     any[];
    paisNombre:         string;
    paisId:             number;
    estadoNombre:       string;
    estadoId:           number;
    ciudadNombre:       string;
    ciudadId:           number;
    ciudadBp:           Ciudad;
    estadoBp:           Estado;
    paisBp:             Pais;
    pais:               Pais[] = [];
    datosFin:           Datos;
    nuevoDatoFin:       Datos = {
                            nombrePagoBp: '',
                            direccionBp: '',
                            numeroBp: '',
                            codigoAbabp: '',
                            ciudadBp: 0,
                            estadoBp: 0,
                            paisBp: 0,
                            tipoCbp: '',
                            codigoSwiftBp: ''
                        }

    constructor(
        private router: Router,
        private geolocationService: GeolocationService
    ) {}

    ngOnInit(): void {
        // Obtener datos del localStorage si existen
        const storedData = JSON.parse( localStorage.getItem( 'datosData' ) );
        if ( storedData ) {
            this.datosFin = storedData;
            const lastInfo = this.datosFin; // Obtener la última información almacenada
            // Llenar los campos del formulario con la última información almacenada
            this.geolocationService.getPais().subscribe(
                ( data ) => {
                    for ( let i = 0; i < data.length; i++ ) {
                        if ( data[i].id === this.datosFin.paisBp ) {
                            this.paisId = data[i].id;
                            this.paisNombre = data[i].name;
                            this.paisBp = {
                                id: this.paisId,
                                name: this.paisNombre
                            }
                        }
                    }
                    this.geolocationService.getEstado( this.paisId ).subscribe(
                        ( data ) => {
                            for ( let i = 0; i < data.length; i++ ) {
                                if ( data[i].id === this.datosFin.estadoBp ) {
                                    this.estadoId = data[i].id;
                                    this.estadoNombre = data[i].name;
                                    this.estadoBp = {
                                        id: this.estadoId,
                                        idCountry: this.paisId,
                                        name: this.estadoNombre
                                    }
                                }
                            }
                            this.geolocationService.getCiudad( this.estadoId ).subscribe(
                                ( data ) => {
                                    for ( let i = 0; i < data.length; i++ ) {
                                        if ( data[i].id === this.datosFin.ciudadBp ) {
                                            this.ciudadId = data[i].id;
                                            this.ciudadNombre = data[i].name;
                                            this.ciudadBp = {
                                                id: this.ciudadId,
                                                idState: this.estadoId,
                                                name: this.ciudadNombre
                                            }
                                        }
                                    }
                                },
                                ( error ) => {
                                    console.error( error );
                                }
                            );
                        },
                        ( error ) => {
                            console.error( error );
                        }
                    )
                },
                ( error ) => {
                    console.error( error );
                }
            )
            this.nuevoDatoFin = {
                nombrePagoBp: lastInfo.nombrePagoBp || '',
                direccionBp: lastInfo.direccionBp || '',
                numeroBp: lastInfo.numeroBp || '',
                ciudadBp: lastInfo.ciudadBp || 0,
                estadoBp: lastInfo.estadoBp || 0,
                paisBp: lastInfo.paisBp || 0,
                codigoAbabp: lastInfo.codigoAbabp || '',
                tipoCbp: lastInfo.tipoCbp || '',
                codigoSwiftBp: lastInfo.codigoSwiftBp || ''
            };
        }

        this.geolocationService.getPais().subscribe(
            ( data ) => {
                this.pais = data;
            }
        )
    }

    nextPage() {
        if (
            this.nuevoDatoFin.nombrePagoBp.trim() !== '' &&
            this.nuevoDatoFin.direccionBp.trim() !== '' &&
            this.nuevoDatoFin.numeroBp.trim() !== '' &&
            this.nuevoDatoFin.codigoAbabp.trim() !== '' &&
            this.ciudadBp.id !== 0 &&
            this.estadoBp.id !== 0 &&
            this.paisBp.id !== 0 &&
            this.nuevoDatoFin.tipoCbp.trim() !== '' &&
            this.nuevoDatoFin.codigoSwiftBp.trim() !== ''
        ) {
            this.nuevoDatoFin.paisBp = this.paisBp.id;
            this.nuevoDatoFin.ciudadBp = this.ciudadBp.id;
            this.nuevoDatoFin.estadoBp = this.estadoBp.id;

            this.datosFin= {
                nombrePagoBp: this.nuevoDatoFin.nombrePagoBp || '',
                direccionBp: this.nuevoDatoFin.direccionBp || '',
                numeroBp: this.nuevoDatoFin.numeroBp || '',
                ciudadBp: this.nuevoDatoFin.ciudadBp || 0,
                estadoBp: this.nuevoDatoFin.estadoBp || 0,
                paisBp: this.nuevoDatoFin.paisBp || 0,
                codigoAbabp: this.nuevoDatoFin.codigoAbabp || '',
                tipoCbp: this.nuevoDatoFin.tipoCbp || '',
                codigoSwiftBp: this.nuevoDatoFin.codigoSwiftBp || ''
            };

            localStorage.setItem( 'datosData', JSON.stringify( this.datosFin ) );

            this.nuevoDatoFin.nombrePagoBp = '';
            this.nuevoDatoFin.direccionBp = '';
            this.nuevoDatoFin.numeroBp = '';
            this.nuevoDatoFin.codigoAbabp = '';
            this.nuevoDatoFin.ciudadBp = 0;
            this.nuevoDatoFin.estadoBp = 0;
            this.nuevoDatoFin.paisBp = 0;
            this.nuevoDatoFin.tipoCbp = '';
            this.nuevoDatoFin.codigoSwiftBp = '';

            this.router.navigate( [ 'registro/sucursales' ] );
        }
    }

    prevPage() {
        this.router.navigate( [ 'registro/general' ] );
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
        let selectedCountry = this.paisBp;

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
        let selectedState = this.estadoBp;

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
}
