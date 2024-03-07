import { Component, OnInit }            from '@angular/core';
import { Router }                       from '@angular/router';

import { Certificaciones }              from 'src/app/demo/models/certificaciones.model';
import { Clientes }                     from 'src/app/demo/models/clientes.model';
import { Contacto }                     from 'src/app/demo/models/contacto.model';
import { General }                      from 'src/app/demo/models/general.model';
import { Sucursal }                     from 'src/app/demo/models/sucursal.model';

import { GeneralService }               from 'src/app/demo/service/proveedores/general.service';
import { GeolocationService }           from 'src/app/demo/service/proveedores/geolocation.service';

@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.component.html'
})
export class ConfirmacionComponent implements OnInit {
    generalData:            General;
    datosData:              General;
    terminosData:           General;
    elaboracionData:        General;
    sucursalesData:         Sucursal;
    contactoData:           Contacto;
    certificacionData:      Certificaciones;
    clienteData:            Clientes;
    paisNombre:             string;
    paisId:                 number;
    estadoId:               number;
    ciudadNombre:           string;
    naturalezaNombre:       string;

    constructor(
        private router: Router,
        private generalService: GeneralService,
        private geolocationService: GeolocationService
    ) {}

    ngOnInit(): void {
        const generalData           = localStorage.getItem( 'generalData' );
        const datosData             = localStorage.getItem( 'datosData' );
        const sucursalesData        = localStorage.getItem( 'sucursalesData' );
        const contactoData          = localStorage.getItem( 'contactoData' );
        const certificacionData     = localStorage.getItem( 'certificacionData' );
        const clienteData           = localStorage.getItem( 'clienteData' );
        const terminosData          = localStorage.getItem( 'terminosData' );
        const elaboracionData       = localStorage.getItem( 'elaboracionData' );
        if ( generalData ) {
            this.generalData = JSON.parse( generalData );
        }
        if ( datosData ) {
            this.datosData = JSON.parse( datosData );
        }
        if ( sucursalesData ) {
            this.sucursalesData = JSON.parse( sucursalesData );
        }
        if ( contactoData ) {
            this.contactoData = JSON.parse( contactoData );
        }
        if ( certificacionData ) {
            this.certificacionData = JSON.parse( certificacionData );
        }
        if ( clienteData ) {
            this.clienteData = JSON.parse( clienteData );
        }
        if ( terminosData ) {
            this.terminosData = JSON.parse( terminosData );
            console.log(this.terminosData);
        }
        if ( elaboracionData ) {
            this.elaboracionData = JSON.parse( elaboracionData );
        }

        this.generalService.getNaturaleza().subscribe(
            ( data ) => {
                for ( let i = 0; i < data.resultado.length; i++ ) {
                    if ( data.resultado[i].idNaturaleza === this.generalData[0].idNaturaleza ) {
                        this.naturalezaNombre = data.resultado[i].nombreNaturaleza
                    }
                }
            }
        )
        this.geolocationService.getPais().subscribe(
            ( data ) => {
                for (let i = 0; i < data.length; i++) {
                    if ( data[i].id === this.generalData[0].paisP) {
                        this.paisNombre = data[i].name;
                        this.paisId = data[i].id;
                    }                    
                }
                this.geolocationService.getEstado( this.paisId ).subscribe(
                    ( data ) => {
                        for (let i = 0; i < data.length; i++) {
                            if ( data[i].id === this.generalData[0].estadoP ) {
                                this.estadoId = data[i].id;
                            }                    
                        }
                        this.geolocationService.getCiudad( this.estadoId ).subscribe(
                            ( data ) => {
                                for ( let i = 0; i < data.length; i++ ) {
                                    if ( data[i].id === this.generalData[0].ciudadP ) {
                                        this.ciudadNombre = data[i].name;
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
    }

    finalizar() {
        this.router.navigate( [ 'registro/confirmacion' ] );
    }

    prevPage() {
        this.router.navigate( [ 'registro/elaboracion' ] );
    }

}
