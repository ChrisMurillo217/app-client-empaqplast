import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Table }                                    from 'primeng/table';
import { ProgressBar }                              from 'primeng/progressbar';
import { DynamicDialogRef }                         from 'primeng/dynamicdialog';
import { DynamicDialogConfig }                        from 'primeng/dynamicdialog';

import { TrackingService }                          from './../../../service/tracking.service';
import { TokenService }                             from './../../../service/token.service';

import { Pedidos }                                  from './../../../models/pedido.model';
import { Items }                                    from './../../../models/item.model';
import { Fabricacion }                              from './../../../models/fabricacion.model';
import { Usuarios }                                 from './../../../models/usuarios.model';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent implements OnInit {
    userData:           Usuarios[] = [];
    cardCode:           string = '';
    docNum:             number = 0;
    progressBarValue:   number = 0;
    docDate:            string = '';
    docStatus:          string = '';
    docDueDate:         string = '';
    tiempoEntrega:      string = '';
    items:              Items[] = [];
    itemsT:             Items[] = [];
    itemsC:             string[] = [];
    numeroItem:         number = 0;
    progress:           number = 0;
    progressG:          number = 0;
    mostrarSpinner:     boolean = true;
    guiaLoaded:         boolean = false;

    constructor(
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig,
        private trackingService: TrackingService,
        private tokenService: TokenService
    ) {}

    ngOnInit(): void {
        this.docNum = this.config.data.docNum;

        this.tokenService.getUserData().subscribe(
            ( data ) => {
                this.userData = data;
                this.cardCode = this.userData[0].datosLogin.cardCode;
            }
        );
        this.progressBarValue = 0;

        this.trackingService.getPedidosByDocNum( this.cardCode, this.docNum ).subscribe(
            ( data ) => {
                this.docDate = this.formatDate( data[0].docDate );
                this.docStatus = data[0].docStatus;
                this.docDueDate = this.formatDate( data[0].docDueDate );
                this.tiempoEntrega = this.calcularTiempoEntrega(
                    data[0].docDate,
                    data[0].docDueDate
                );
                this.items = data[0].items;

                const itemCodeMap = {};

                // Recorremos el primer forEach para actualizar itemCodeMap
                this.items.forEach( ( item ) => {
                    if ( item.itemCode in itemCodeMap ) {
                        // Si ya existe, suma la cantidad al valor existente
                        itemCodeMap[item.itemCode] += item.quantity; // Cambia esto según tu lógica
                    } else {
                        // Si no existe, agrega una entrada al mapa
                        itemCodeMap[item.itemCode] = item.quantity; // Inicializa la cantidad en 1, cámbialo según tu lógica
                    }
                } );

                // Luego, actualizamos this.items con elementos únicos y cantidades sumadas
                this.items = Object.keys( itemCodeMap ).map( ( itemCode ) => {
                    const originalItem = this.items.find( ( item ) => item.itemCode === itemCode );
                    return {
                        docEntry: originalItem.docEntry, // Agrega el valor correcto para docEntry
                        dscription: originalItem.dscription, // Agrega el valor correcto para dscription
                        itemCode: itemCode,
                        quantity: itemCodeMap[itemCode],
                    };
                } );

                this.numeroItem = this.items.length;

                this.trackingService.getOF( this.cardCode, this.docNum ).subscribe(
                    ( ofData ) => {
                        let itemQuantities = [];

                        this.items.forEach( ( item ) => {
                            const divisor = this.numeroItem * 2;
                            if (divisor !== 0) {
                                this.progress = 100 / divisor;
                            }

                            if ( ofData.length !== 0 ) {
                                ofData.forEach( ( ofItem ) => {
                                    if ( item.itemCode === ofItem.itemCode ) {
                                        this.progressBarValue = parseFloat( ( this.progressBarValue + this.progress ).toFixed( 2 ) );
                                    }
                                } );
                            }
                        } );

                        this.trackingService.getGuia( this.cardCode, this.docNum ).subscribe(
                            ( guiaData ) => {
                                this.guiaLoaded = true;
                                for ( let i = 0; i < guiaData.length; i++ ) {
                                    const items = guiaData[i].items;
                                    for ( let j = 0; j < guiaData.length; j++ ) {
                                        const itemG = items[j];
                                        if ( itemG && itemG.itemCode !== null ) {
                                            // Verificar si el elemento ya está en el array itemQuantities
                                            const existingItem = itemQuantities.find( ( item ) => item.itemCode === itemG.itemCode );
                                            if ( existingItem ) {
                                                // Si ya existe, aumenta la cantidad
                                                existingItem.quantity += itemG.quantity;
                                            } else {
                                                // Si no existe, crea un nuevo objeto y agrégalo al array
                                                itemQuantities.push( {
                                                    itemCode: itemG.itemCode,
                                                    quantity: itemG.quantity,
                                                } );
                                                console.log(itemQuantities);
                                            }
                                        } else {
                                            break;
                                        }
                                    }
                                }

                                const itemsQ = new Set( this.items.map( item => item.itemCode ) );
                                itemQuantities = itemQuantities.filter( item => itemsQ.has( item.itemCode ) );

                                this.items.forEach( ( item ) => {
                                    itemQuantities.forEach( ( itemG ) => {
                                        this.itemsT = this.items;
                                        this.itemsC = itemQuantities;
                                        const divisor = this.numeroItem * 2;
                                        if ( divisor !== 0 ) {
                                            this.progress = 100 / divisor;
                                        }

                                        if ( ofData.length !== 0 ) {
                                            ofData.forEach( ( ofItem ) => {
                                                if ( itemG.itemCode === item.itemCode ) {
                                                    if ( itemG.itemCode === ofItem.itemCode ) {
                                                        if ( itemG.quantity >= item.quantity ) {
                                                            this.progressBarValue = parseFloat( ( this.progressBarValue + this.progress ).toFixed( 2 ) );
                                                        } else {
                                                            const cant = ( itemG.quantity * 100 ) / item.quantity;
                                                            this.progressG = ( cant * this.progress ) / 100;
                                                            this.progressBarValue = parseFloat( ( this.progressBarValue + this.progressG ).toFixed( 2 ) );
                                                        }
                                                    } else {
                                                        this.progress *= 2;
                                                        if ( itemG.quantity >= item.quantity ) {
                                                            this.progressBarValue = parseFloat( ( this.progressBarValue + this.progress ).toFixed( 2 ) );
                                                        } else {
                                                            const cant = ( itemG.quantity * 100 ) / item.quantity;
                                                            this.progressG = ( cant * this.progress ) / 100;
                                                            this.progressBarValue = parseFloat( ( this.progressBarValue + this.progressG ).toFixed( 2 ) );
                                                        }
                                                    }
                                                }
                                            } )
                                        } else {
                                            if ( itemG.itemCode === item.itemCode ) {
                                                this.progress *= 2;
                                                if ( itemG.quantity >= item.quantity ) {
                                                    this.progressBarValue = parseFloat( ( this.progressBarValue + this.progress ).toFixed( 2 ) );
                                                } else {
                                                    const cant = ( itemG.quantity * 100 ) / item.quantity;
                                                    this.progressG = ( cant * this.progress ) / 100;
                                                    this.progressBarValue = parseFloat( ( this.progressBarValue + this.progressG ).toFixed( 2 ) );
                                                }
                                            }
                                        }
                                    } );
                                } );
                            },
                            ( error ) => {
                                console.error( error );
                            }
                        );
                    },
                    ( error ) => {
                        console.error( error );
                    }
                );
            },
            ( error ) => {
                console.error( error );
            }
        );

        if ( this.progressBarValue === 100 ) {
            this.mostrarSpinner = false;
        }
    }

    formatDate( dateString: string ): string {
        const date = new Date( dateString );
        const day = ( date.getDate() ).toString().padStart( 2, '0' );
        const month = ( date.getMonth() + 1 ).toString().padStart( 2, '0' );
        const year = date.getFullYear().toString();

        return `${ day }/${ month }/${ year }`;
    }

    calcularTiempoEntrega( docDate: Date, docDueDate: Date ): string {
        const fechaIngreso = new Date( docDate );
        const fechaEntrega = new Date( docDueDate );
        const tiempoMilisegundos = fechaEntrega.getTime() - fechaIngreso.getTime();
        const diasEntrega = tiempoMilisegundos / ( 1000 * 60 * 60 * 24 );
        return `${ Math.floor( diasEntrega ) } días`;
    }
}
