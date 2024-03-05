import { Component, OnInit }            from '@angular/core';
import { Router }                       from '@angular/router';

import { General }                      from 'src/app/demo/models/general.model';
import { Ciudad, Estado, Pais }         from 'src/app/demo/models/geolocation.model';
import { Naturaleza }                   from 'src/app/demo/models/naturaleza.model';

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
    ciudadP:            Ciudad;
    estadoP:            Estado;
    paisP:              Pais;
    pais:               Pais[] = [];
    naturaleza:         Naturaleza[] = [];
    general:            General[] = [];
    nuevaInfo:          General = {
                            rucP: '',
                            razonSocialP: '',
                            direccionP: '',
                            ciudadP: 0,
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
        this.generalService.getNaturaleza().subscribe(
            ( data ) => {
                this.naturaleza = data.resultado;
            }
        )
        this.geolocationService.getPais().subscribe(
            ( data ) => {
                this.pais = data;
            }
        )
    }

    nextPage() {
        this.router.navigate( [ 'registro/datos' ] );
    }

    filterCountry( event ) {
        let filtered : any[] = [];
        let query = event.query;

        for( let i = 0; i < this.pais.length; i++ ) {
            let country = this.pais[i];
            if ( country.name.toLowerCase().indexOf( query.toLowerCase() ) == 0) {
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
                        if ( state.name.toLowerCase().indexOf( query.toLowerCase() ) == 0 ) {
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
                        if ( city.name.toLowerCase().indexOf( query.toLowerCase() ) == 0 ) {
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
        if (
            this.nuevaInfo.rucP.trim() !== '' &&
            this.nuevaInfo.razonSocialP.trim() !== '' &&
            this.nuevaInfo.direccionP.trim() !== '' &&
            this.nuevaInfo.ciudadP !== 0 &&
            this.nuevaInfo.paisP !== 0 &&
            this.nuevaInfo.emailP.trim() !== '' &&
            this.nuevaInfo.nomRlp.trim() !== '' &&
            this.nuevaInfo.paginaWp.trim() !== '' &&
            this.nuevaInfo.idNaturaleza !== 0 &&
            this.nuevaInfo.actividadEconomicaP.trim() !== ''
        ) {
            this.general.push( { ...this.nuevaInfo } );

            this.nuevaInfo.rucP = '';
            this.nuevaInfo.razonSocialP = '';
            this.nuevaInfo.direccionP = '';
            this.nuevaInfo.ciudadP = 0;
            this.nuevaInfo.paisP = 0;
            this.nuevaInfo.emailP = '';
            this.nuevaInfo.nomRlp = '';
            this.nuevaInfo.paginaWp = '';
            this.nuevaInfo.idNaturaleza = 0;
            this.nuevaInfo.actividadEconomicaP = '';
        }
    }
}
