import { Component, OnInit }            from '@angular/core';
import { Router }                       from '@angular/router';

import { General }                      from 'src/app/demo/models/general.model';
import { Ciudad, Estado, Pais }         from 'src/app/demo/models/geolocation.model';

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
    ciudadBp:           Ciudad;
    estadoBp:           Estado;
    paisBp:             Pais;
    pais:               Pais[] = [];
    datosFin:           General[] = [];
    nuevoDatoFin:       General = {
                            nombrePagoBp: '',
                            direccionBp: '',
                            numeroBp: '',
                            codigoAbabp: '',
                            ciudadBp: 0,
                            paisBp: 0,
                            tipoCbp: '',
                            codigoSwiftBp: ''
                        }

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
    }

    nextPage() {
        this.router.navigate( [ 'registro/sucursales' ] );
    }

    prevPage() {
        this.router.navigate( [ 'registro/general' ] );
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
        let selectedCountry = this.paisBp;

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
        let selectedState = this.estadoBp;     

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
            this.nuevoDatoFin.nombrePagoBp.trim() !== '' &&
            this.nuevoDatoFin.direccionBp.trim() !== '' &&
            this.nuevoDatoFin.numeroBp.trim() !== '' &&
            this.nuevoDatoFin.codigoAbabp.trim() !== '' &&
            this.nuevoDatoFin.ciudadBp !== 0 &&
            this.nuevoDatoFin.paisBp !== 0 &&
            this.nuevoDatoFin.tipoCbp.trim() !== '' &&
            this.nuevoDatoFin.codigoSwiftBp.trim() !== ''
        ) {
            this.datosFin.push( { ...this.nuevoDatoFin } );

            this.nuevoDatoFin.nombrePagoBp = '';
            this.nuevoDatoFin.direccionBp = '';
            this.nuevoDatoFin.numeroBp = '';
            this.nuevoDatoFin.codigoAbabp = '';
            this.nuevoDatoFin.ciudadBp = 0;
            this.nuevoDatoFin.paisBp = 0;
            this.nuevoDatoFin.tipoCbp = '';
            this.nuevoDatoFin.codigoSwiftBp = '';
        }
    }
}
