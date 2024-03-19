import { Component, OnInit }            from '@angular/core';
import { Router }                       from '@angular/router';

import { Informacion }                  from 'src/app/demo/models/proveedores/general.model';
import { Ciudad, Estado, Pais }         from 'src/app/demo/models/proveedores/geolocation.model';
import { Naturaleza }                   from 'src/app/demo/models/proveedores/naturaleza.model';

import { GeneralService }               from 'src/app/demo/service/proveedores/general.service';
import { GeolocationService }           from 'src/app/demo/service/proveedores/geolocation.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html'
})
export class GeneralComponent implements OnInit {
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
    ciudadP:            Ciudad;
    estadoP:            Estado;
    paisP:              Pais;
    pais:               Pais[] = [];
    naturaleza:         Naturaleza[] = [];
    general:            Informacion;
    nuevaInfo:          Informacion = {
                            rucP: '',
                            razonSocialP: '',
                            direccionP: '',
                            ciudadP: 0,
                            estadoP: 0,
                            paisP: 0,
                            emailP: '',
                            nomRlp: '',
                            paginaWp: '',
                            idNaturaleza: 0,
                            actividadEconomicaP: ''
                        }

    constructor(
        private router: Router,
        private generalService: GeneralService,
        private geolocationService: GeolocationService
    ) {}

    ngOnInit(): void {
        // Obtener datos del localStorage si existen
        const storedData = JSON.parse( localStorage.getItem( 'generalData' ) );
        if ( storedData ) {
            this.general = storedData;
            const lastInfo = this.general;
            // Llenar los campos del formulario con la última información almacenada
            this.geolocationService.getPais().subscribe(
                ( data ) => {
                    for ( let i = 0; i < data.length; i++ ) {
                        if ( data[i].id === this.general.paisP ) {
                            this.paisId = data[i].id;
                            this.paisNombre = data[i].name;
                            this.paisP = {
                                id: this.paisId,
                                name: this.paisNombre
                            }
                        }
                    }
                    this.geolocationService.getEstado( this.paisId ).subscribe(
                        ( data ) => {
                            for ( let i = 0; i < data.length; i++ ) {
                                if ( data[i].id === this.general.estadoP ) {
                                    this.estadoId = data[i].id;
                                    this.estadoNombre = data[i].name;
                                    this.estadoP = {
                                        id: this.estadoId,
                                        idCountry: this.paisId,
                                        name: this.estadoNombre
                                    }
                                }
                            }
                            this.geolocationService.getCiudad( this.estadoId ).subscribe(
                                ( data ) => {
                                    for ( let i = 0; i < data.length; i++ ) {
                                        if ( data[i].id === this.general.ciudadP ) {
                                            this.ciudadId = data[i].id;
                                            this.ciudadNombre = data[i].name;
                                            this.ciudadP = {
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
            this.nuevaInfo = {
                rucP: lastInfo.rucP || '',
                razonSocialP: lastInfo.razonSocialP || '',
                direccionP: lastInfo.direccionP || '',
                ciudadP: lastInfo.ciudadP || 0,
                estadoP: lastInfo.estadoP || 0,
                paisP: lastInfo.paisP || 0,
                emailP: lastInfo.emailP || '',
                nomRlp: lastInfo.nomRlp || '',
                paginaWp: lastInfo.paginaWp || '',
                idNaturaleza: lastInfo.idNaturaleza || 0,
                actividadEconomicaP: lastInfo.actividadEconomicaP || ''
            };
        }

        // Llamar a los métodos para obtener los datos necesarios (si es necesario)
        this.generalService.getNaturaleza().subscribe(
            ( data ) => {
                this.naturaleza = data.resultado;
            },
            ( error ) => {
                console.error( error );
            }
        );
        this.geolocationService.getPais().subscribe(
            ( data ) => {
                this.pais = data;
            },
            ( error ) => {
                console.error( error );
            }
        );
    }

    nextPage() {
        if (
            this.nuevaInfo.rucP.trim() !== '' &&
            this.nuevaInfo.razonSocialP.trim() !== '' &&
            this.nuevaInfo.direccionP.trim() !== '' &&
            this.ciudadP.id !== 0 &&
            this.estadoP.id !== 0 &&
            this.paisP.id !== 0 &&
            this.nuevaInfo.emailP.trim() !== '' &&
            this.nuevaInfo.nomRlp.trim() !== '' &&
            this.nuevaInfo.paginaWp.trim() !== '' &&
            this.nuevaInfo.idNaturaleza !== 0 &&
            this.nuevaInfo.actividadEconomicaP.trim() !== ''
        ) {
            this.nuevaInfo.paisP = this.paisP.id;
            this.nuevaInfo.ciudadP = this.ciudadP.id;
            this.nuevaInfo.estadoP = this.estadoP.id;

            this.general = {
                rucP: this.nuevaInfo.rucP,
                razonSocialP: this.nuevaInfo.razonSocialP,
                direccionP: this.nuevaInfo.direccionP,
                ciudadP: this.nuevaInfo.ciudadP,
                estadoP: this.nuevaInfo.estadoP,
                paisP: this.nuevaInfo.paisP,
                emailP: this.nuevaInfo.emailP,
                nomRlp: this.nuevaInfo.nomRlp,
                paginaWp: this.nuevaInfo.paginaWp,
                idNaturaleza: this.nuevaInfo.idNaturaleza,
                actividadEconomicaP: this.nuevaInfo.actividadEconomicaP
            };

            localStorage.setItem( 'generalData', JSON.stringify( this.general ) );

            this.nuevaInfo.rucP = '';
            this.nuevaInfo.razonSocialP = '';
            this.nuevaInfo.direccionP = '';
            this.nuevaInfo.ciudadP = 0;
            this.nuevaInfo.estadoP = 0;
            this.nuevaInfo.paisP = 0;
            this.nuevaInfo.emailP = '';
            this.nuevaInfo.nomRlp = '';
            this.nuevaInfo.paginaWp = '';
            this.nuevaInfo.idNaturaleza = 0;
            this.nuevaInfo.actividadEconomicaP = '';
        }

        this.router.navigate( [ 'registro/datos' ] );
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
        let selectedCountry = this.paisP;

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
        let selectedState = this.estadoP;

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
