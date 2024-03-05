import { Component, OnInit }            from '@angular/core';
import { Router }                       from '@angular/router';

import { Clientes }                     from 'src/app/demo/models/clientes.model';
import { Ciudad, Estado, Pais }         from 'src/app/demo/models/geolocation.model';

import { GeolocationService }           from 'src/app/demo/service/proveedores/geolocation.service';

@Component( {
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
} )
export class ClientesComponent implements OnInit {
    filteredCountries:      any[];
    filteredStates:         any[];
    filteredCities:         any[];
    ciudadRefPC:            Ciudad;
    estadoRefPC:            Estado;
    paisRefPC:              Pais;
    pais:                   Pais[] = [];
    clientes:               Clientes[] = [];
    nuevoCliente:           Clientes = {
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
        let selectedCountry = this.paisRefPC;

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
        let selectedState = this.estadoRefPC;     

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
        // Verificar si los campos están llenos
        if (
            this.nuevoCliente.nomRefPc.trim() !== '' &&
            this.nuevoCliente.contacRefPc.trim() !== '' &&
            this.nuevoCliente.emailRefPc.trim() !== '' &&
            this.nuevoCliente.paisRefPc.trim() !== '' &&
            this.nuevoCliente.ciudadRefPc.trim() !== ''
        ) {
            // Agregar la nueva sucursal al vector
            this.clientes.push( { ...this.nuevoCliente } );

            // Vaciar los campos de entrada
            this.nuevoCliente.nomRefPc = '';
            this.nuevoCliente.contacRefPc = '';
            this.nuevoCliente.emailRefPc = '';
            this.nuevoCliente.paisRefPc = '';
            this.nuevoCliente.ciudadRefPc = '';
        }
    }
}
