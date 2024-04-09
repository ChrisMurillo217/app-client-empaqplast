import { Component, OnInit }            from '@angular/core';
import { Router }                       from '@angular/router';

import { MessageService }               from 'primeng/api';

import { Certificaciones }              from 'src/app/demo/models/proveedores/certificaciones.model';
import { Clientes }                     from 'src/app/demo/models/proveedores/clientes.model';
import { Contacto }                     from 'src/app/demo/models/proveedores/contacto.model';
import { Sucursal }                     from 'src/app/demo/models/proveedores/sucursal.model';
import { Ciudad, Estado, Pais }         from 'src/app/demo/models/proveedores/geolocation.model';
import {
    Datos,
    Elaboracion,
    General,
    Informacion
}                                       from 'src/app/demo/models/proveedores/general.model';

import { GeneralService }               from 'src/app/demo/service/proveedores/general.service';
import { GeolocationService }           from 'src/app/demo/service/proveedores/geolocation.service';
import { SucursalesService }            from 'src/app/demo/service/proveedores/sucursales.service';
import { ContactoService }              from 'src/app/demo/service/proveedores/contacto.service';
import { CertificacionesService }       from 'src/app/demo/service/proveedores/certificaciones.service';
import { ClienteService }               from 'src/app/demo/service/proveedores/cliente.service';

@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.component.html'
})
export class ConfirmacionComponent implements OnInit {
    generalData:            Informacion;
    datosData:              Datos;
    terminosData:           number;
    elaboracionData:        Elaboracion;
    sucursalesData:         Sucursal[] = [];
    contactoData:           Contacto[] = [];
    certificacionData:      Certificaciones[] = [];
    clienteData:            Clientes[] = [];
    clientesVista:          Clientes[] = [];
    saveGeneralData:        General;
    ciudadRefPc:            Ciudad;
    estadoRefPc:            Estado;
    paisRefPc:              Pais;
    idProveedor:            number;
    paisNombre:             string;
    paisId:                 number;
    estadoNombre:           string;
    estadoId:               number;
    ciudadNombre:           string;
    ciudadId:               number;
    naturalezaNombre:       string;
    registroIp:             string;

    constructor(
        private router: Router,
        private geolocationService: GeolocationService,
        private generalService: GeneralService,
        private sucursalesService: SucursalesService,
        private contactoService: ContactoService,
        private certificacionesService: CertificacionesService,
        private clienteService: ClienteService,
        private messageService: MessageService,
    ) {}

    ngOnInit(): void {
        this.generalService.getLastReg().subscribe(
            ( data ) => {
                this.idProveedor = data.ultimoNumeroRegistro;
            }
        )
        this.generalService.getIPAddress().subscribe(
            ( res: any ) => {
                const IP = res.ip;
                this.registroIp = IP;
            }
        );
        const generalData           = localStorage.getItem( 'generalData' );
        const datosData             = localStorage.getItem( 'datosData' );
        const sucursalesData        = localStorage.getItem( 'sucursalesData' );
        const contactoData          = localStorage.getItem( 'contactoData' );
        const certificacionData     = localStorage.getItem( 'certificacionData' );
        const clienteData = JSON.parse( localStorage.getItem( 'clienteData' ) );
        const terminosData          = localStorage.getItem( 'terminosData' );
        const elaboracionData       = localStorage.getItem( 'elaboracionData' );
        if ( generalData ) {
            this.generalData = JSON.parse( generalData );
            this.geolocationService.getPais().subscribe(
                ( data ) => {
                    for (let i = 0; i < data.length; i++) {
                        if ( data[i].id === this.generalData.paisP) {
                            this.paisNombre = data[i].name;
                            this.paisId = data[i].id;
                        }
                    }
                    this.geolocationService.getEstado( this.paisId ).subscribe(
                        ( data ) => {
                            for (let i = 0; i < data.length; i++) {
                                if ( data[i].id === this.generalData.estadoP ) {
                                    this.estadoId = data[i].id;
                                }
                            }
                            this.geolocationService.getCiudad( this.estadoId ).subscribe(
                                ( data ) => {
                                    for ( let i = 0; i < data.length; i++ ) {
                                        if ( data[i].id === this.generalData.ciudadP ) {
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
            this.generalService.getNaturaleza().subscribe(
                ( data ) => {
                    for ( let i = 0; i < data.resultado.length; i++ ) {
                        if ( data.resultado[i].idNaturaleza === this.generalData.idNaturaleza ) {
                            this.naturalezaNombre = data.resultado[i].nombreNaturaleza
                        }
                    }
                }
            )
        }
        if ( datosData ) {
            this.datosData = JSON.parse( datosData );
            this.geolocationService.getPais().subscribe(
                ( data ) => {
                    for (let i = 0; i < data.length; i++) {
                        if ( data[i].id === this.datosData.paisBp) {
                            this.paisNombre = data[i].name;
                            this.paisId = data[i].id;
                        }
                    }
                    this.geolocationService.getEstado( this.paisId ).subscribe(
                        ( data ) => {
                            for (let i = 0; i < data.length; i++) {
                                if ( data[i].id === this.datosData.estadoBp ) {
                                    this.estadoId = data[i].id;
                                }
                            }
                            this.geolocationService.getCiudad( this.estadoId ).subscribe(
                                ( data ) => {
                                    for ( let i = 0; i < data.length; i++ ) {
                                        if ( data[i].id === this.datosData.ciudadBp ) {
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
            this.clienteData = clienteData;
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

            procesarDatosCliente( clienteData )
                .then().catch( error => console.error( error ) );
        }
        if ( terminosData ) {
            this.terminosData = JSON.parse( terminosData );
        }
        if ( elaboracionData ) {
            this.elaboracionData = JSON.parse( elaboracionData );
        }
    }

    finalizar() {
        for (let i = 0; i < this.sucursalesData.length; i++) {
            this.sucursalesData[i].idProveedor = this.idProveedor;
        }
        for (let i = 0; i < this.contactoData.length; i++) {
            this.contactoData[i].idProveedor = this.idProveedor;
        }
        for (let i = 0; i < this.certificacionData.length; i++) {
            this.certificacionData[i].idProveedor = this.idProveedor;
        }
        for (let i = 0; i < this.clienteData.length; i++) {
            this.clienteData[i].idProveedor = this.idProveedor;
        }
        this.saveGeneralData = {
            fechaRp: new Date(),
            rucP: this.generalData.rucP,
            razonSocialP: this.generalData.razonSocialP,
            direccionP: this.generalData.direccionP,
            ciudadP: this.generalData.ciudadP,
            paisP: this.generalData.paisP,
            emailP: this.generalData.emailP,
            nomRlp: this.generalData.nomRlp,
            paginaWp: this.generalData.paginaWp,
            idNaturaleza: this.generalData.idNaturaleza,
            actividadEconomicaP: this.generalData.actividadEconomicaP,
            nombrePagoBp: this.datosData.nombrePagoBp,
            direccionBp: this.datosData.direccionBp,
            numeroBp: this.datosData.numeroBp,
            codigoAbabp: this.datosData.codigoAbabp,
            ciudadBp: this.datosData.ciudadBp,
            paisBp: this.datosData.paisBp,
            tipoCbp: this.datosData.tipoCbp,
            codigoSwiftBp: this.datosData.codigoSwiftBp,
            nombreEmpP: this.elaboracionData.nombreEmpP,
            cargoEmpP: this.elaboracionData.cargoEmpP,
            fechaEmpP: new Date(),
            aceptacionLeyenda: this.terminosData,
            registroIp: this.registroIp
        }


        this.generalService.setGeneral( this.saveGeneralData ).subscribe(
            ( response ) => {
                console.log( response );
                this.messageService.add( {
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Tu información a sido guardada con exito.'
                } );
            },
            ( error ) => {
                this.messageService.add( {
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Error al guardar datos generales.' + error
                } );
            }
        );
        this.sucursalesService.setSucursales( this.sucursalesData ).subscribe(
            ( response ) => {
                console.log( response );
            },
            ( error ) => {
                this.messageService.add( {
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Error al guardar las sucursales.' + error
                } );
            }
        );
        this.contactoService.setContacto( this.contactoData ).subscribe(
            ( response ) => {
                console.log( response );
            },
            ( error ) => {
                this.messageService.add( {
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Error al guardar los contactos.' + error
                } );
            }
        );
        this.certificacionesService.setCertificaciones( this.certificacionData ).subscribe(
            ( response ) => {
                console.log( response );
            },
            ( error ) => {
                this.messageService.add( {
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Error al guardar los certificados.' + error
                } );
            }
        );
        this.clienteService.setCliente( this.clienteData ).subscribe(
            ( response ) => {
                console.log( response );
            },
            ( error ) => {
                this.messageService.add( {
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Error al guardar los clientes.' + error
                } );
            }
        );
        localStorage.clear();
        this.router.navigate( [ 'registro/general' ] );
    }

    prevPage() {
        this.router.navigate( [ 'registro/elaboracion' ] );
    }

}
