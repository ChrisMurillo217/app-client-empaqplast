import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { TrackingService } from './../../service/tracking.service';
import { Pedidos } from './../../models/pedido.model';
import { Items } from './../../models/item.model';
import { ProgressBar } from 'primeng/progressbar';
import { Guia } from '../../models/guia.model';
import { Fabricacion } from '../../models/fabricacion.model';

@Component( {
    templateUrl: './tracking-list.component.html',
    providers: [
        MessageService,
        ConfirmationService
    ]
} )
export class TrackingListComponent implements OnInit {
    cardCode:           string = 'CN0590055328001';
    docNum:             number = 0;
    first:              number = 0;
    i:                  number = 0;
    pedidos:            Pedidos[] = [];
    items:              Items[] = [];
    ofs:                Fabricacion[] = [];
    docDate:            string = '';
    docStatus:          string = '';
    taxDate:            string = '';
    tiempoEntrega:      string = '';
    numeroItem:         number = 0;
    progress:           number = 0;
    progressG:          number = 0;
    progressBarValue:   number = 0;
    mostrarSpinner:     boolean = true;

    @ViewChild( 'filter' ) filter!: ElementRef;
    @ViewChild( 'myProgressBar' ) progressBar!: ProgressBar;

    constructor( private trackingService: TrackingService ) {}

    ngOnInit(): void {
        this.trackingService.getPedidosList( this.cardCode ).subscribe(
            ( data ) => {
                this.pedidos = data;
            },
            ( error ) => {
                console.error( error );
            }
        );
    }

    formatDate( dateString: string ): string {
        const date = new Date( dateString );
        const day = ( date.getDate() + 1 ).toString().padStart( 2, '0' );
        const month = ( date.getMonth() + 1 ).toString().padStart( 2, '0' );
        const year = date.getFullYear().toString();

        return `${ day }/${ month }/${ year }`;
    }

    calcularTiempoEntrega( docDate: Date, taxDate: Date ): string {
        const fechaIngreso = new Date( docDate );
        const fechaEntrega = new Date( taxDate );
        const tiempoMilisegundos = fechaEntrega.getTime() - fechaIngreso.getTime();
        const diasEntrega = tiempoMilisegundos / ( 1000 * 60 * 60 * 24 );
        return `${ Math.floor( diasEntrega ) } días`;
    }

    onPageChange( event: any ) {
        this.first = event.first;
    }

    onGlobalFilter( table: Table, event: Event ) {
        table.filterGlobal( ( event.target as HTMLInputElement ).value, 'contains' );
    }

    itemClick( docNum: number ) {
        this.docNum = docNum;

        this.trackingService.getPedidosByDocNum( this.cardCode, this.docNum ).subscribe(
            ( data ) => {
                this.items = data[0].items;
                this.numeroItem = data[0].items.length;

            },
            ( error ) => {
                console.error( error );
            }
        );
    }

    detailsClick( docNum: number ) {
        this.docNum = docNum;
        this.progressBarValue = 0;

        this.trackingService.getPedidosByDocNum( this.cardCode, this.docNum ).subscribe(
            ( data ) => {
                this.docDate = this.formatDate( data[0].docDate );
                this.docStatus = data[0].docStatus;
                this.taxDate = this.formatDate( data[0].taxDate );
                this.tiempoEntrega = this.calcularTiempoEntrega(
                    data[0].docDate,
                    data[0].taxDate
                );
                this.items = data[0].items;

                const itemCodeMap = {};

                // Recorremos el primer forEach para actualizar itemCodeMap
                this.items.forEach( ( item ) => {
                    if ( item.itemCode in itemCodeMap ) {
                        // Si ya existe, suma la cantidad al valor existente
                        itemCodeMap[ item.itemCode ] += item.quantity; // Cambia esto según tu lógica
                    } else {
                        // Si no existe, agrega una entrada al mapa
                        itemCodeMap[ item.itemCode ] = item.quantity; // Inicializa la cantidad en 1, cámbialo según tu lógica
                    }
                } );

                // Luego, actualizamos this.items con elementos únicos y cantidades sumadas
                this.items = Object.keys( itemCodeMap ).map( ( itemCode ) => {
                    const originalItem = this.items.find((item) => item.itemCode === itemCode);
                    return {
                        docEntry: originalItem.docEntry, // Agrega el valor correcto para docEntry
                        dscription: originalItem.dscription, // Agrega el valor correcto para dscription
                        itemCode: itemCode,
                        quantity: itemCodeMap[ itemCode ],
                    };
                } );

                this.numeroItem = this.items.length;

                this.trackingService.getOF( this.cardCode, this.docNum ).subscribe(
                    ( ofData ) => {
                        let itemQuantities = [];
                        this.trackingService.getGuia( this.cardCode, this.docNum ).subscribe(
                            ( guiaData ) => {
                                for (let i = 0; i < guiaData.length; i++) {
                                    const items = guiaData[i].items;
                                    for (let j = 0; j < guiaData.length; j++) {
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
                                            }
                                        } else {
                                            break;
                                        }
                                    }
                                }

                                const itemsQ = new Set( this.items.map( item => item.itemCode ) );
                                itemQuantities = itemQuantities.filter(item => itemsQ.has(item.itemCode));

                                this.items.forEach( ( item ) => {
                                    itemQuantities.forEach( ( itemG ) => {
                                        const divisor = this.numeroItem * 2;
                                        if (divisor !== 0) {
                                            this.progress = 100 / divisor;
                                        }

                                        if ( ofData.length !== 0 ) {
                                            ofData.forEach( ( ofItem ) => {
                                                if ( itemG.itemCode === ofItem.itemCode && item.itemCode === ofItem.itemCode ) {
                                                    this.progressBarValue = parseFloat( ( this.progressBarValue + this.progress ).toFixed( 2 ) );
                                                }
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
                                console.error(error);
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
}
