import { Component, OnInit }                        from '@angular/core';

import { DynamicDialogRef }                         from 'primeng/dynamicdialog';
import { DynamicDialogConfig }                      from 'primeng/dynamicdialog';

import { TrackingService }                          from './../../../service/tracking.service';
import { TokenService }                             from './../../../service/token.service';

import { Items }                                    from './../../../models/item.model';
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
    itemsC:             string[] = [];
    numeroItem:         number = 0;
    progress:           number = 0;
    progressG:          number = 0;
    mostrarSpinner:     boolean = true;
    guiaLoaded:         boolean = false;
    verified:           boolean = false;
    itemsT:             any[] = [];

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
                this.items = data[0].items;

                const itemCodeMap = {};

                // Realiza el recorrido para obtener las cantidades de cada item
                this.items.forEach( ( item ) => {
                    if ( item.itemCode in itemCodeMap ) {
                        // Si ya existe, suma la cantidad al valor existente
                        itemCodeMap[item.itemCode] += item.quantity;
                    } else {
                        // Si no existe, agrega una entrada al mapa
                        itemCodeMap[item.itemCode] = item.quantity;
                    }
                } );

                // Luego, actualizamos this.items con elementos únicos y cantidades sumadas
                this.items = Object.keys( itemCodeMap ).map(
                    ( itemCode ) => {
                        const originalItem = this.items.find( ( item ) => item.itemCode === itemCode );
                        console.log(originalItem);

                        return {
                            docEntry: originalItem.docEntry, // Agrega el valor correcto para docEntry
                            dscription: originalItem.dscription, // Agrega el valor correcto para dscription
                            itemCode: itemCode,
                            quantity: itemCodeMap[itemCode],
                        };
                    }
                );

                this.trackingService.getOF( this.cardCode, this.docNum ).subscribe(
                    ( ofData ) => {
                        let itemQuantities = [];

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
                                            }
                                        } else {
                                            break;
                                        }
                                    }
                                }

                                const itemsQ = new Set( this.items.map( item => item.itemCode ) );
                                itemQuantities = itemQuantities.filter( item => itemsQ.has( item.itemCode ) );

                                this.items.forEach(
                                    ( item ) => {
                                        this.progressBarValue = 0;
                                        const itemQuantity = itemQuantities.find( ( itemG ) => itemG.itemCode === item.itemCode );

                                        itemQuantities.forEach(
                                            ( itemG ) => {
                                                if ( itemG.itemCode === item.itemCode ) {
                                                    if ( ofData.length !== 0 ) {
                                                        ofData.forEach(
                                                            ( ofItem ) => {
                                                            this.progress = 30;
                                                                if ( item.itemCode === ofItem.itemCode ) {
                                                                    this.progressBarValue = parseFloat( ( this.progressBarValue + this.progress ).toFixed( 2 ) );
                                                                }
                                                                this.progress = 70;
                                                                if ( ofItem.itemCode === item.itemCode ) {
                                                                    if ( itemG.itemCode === ofItem.itemCode ) {
                                                                        if ( itemG.quantity >= item.quantity ) {
                                                                            this.progressBarValue = parseFloat( ( this.progressBarValue + this.progress ).toFixed( 2 ) );
                                                                            if ( this.progressBarValue >= 100 ) {
                                                                                this.verified = true;
                                                                            } else {
                                                                                this.verified = false;
                                                                            }
                                                                            this.itemsT.push( {
                                                                                itemCode: item.itemCode,
                                                                                dscription: item.dscription,
                                                                                quantityP: item.quantity,
                                                                                quantityD: itemQuantity ? itemG.quantity : 0,
                                                                                status: 'Despachado completamente.',
                                                                                progressBarValue: this.progressBarValue,
                                                                                verified: this.verified,
                                                                            } );
                                                                        } else {
                                                                            const cant = ( itemG.quantity * 100 ) / item.quantity;
                                                                            this.progressG = ( cant * this.progress ) / 100;
                                                                            this.progressBarValue = parseFloat( ( this.progressBarValue + this.progressG ).toFixed( 2 ) );
                                                                            if ( this.progressBarValue >= 100 ) {
                                                                                this.verified = true;
                                                                            } else {
                                                                                this.verified = false;
                                                                            }
                                                                            this.itemsT.push( {
                                                                                itemCode: item.itemCode,
                                                                                dscription: item.dscription,
                                                                                quantityP: item.quantity,
                                                                                quantityD: itemQuantity ? itemG.quantity : 0,
                                                                                status: `Hemos despachado el ${ this.progressBarValue }%.`,
                                                                                progressBarValue: this.progressBarValue,
                                                                                verified: this.verified,
                                                                            } );
                                                                        }
                                                                    } else {
                                                                        this.progress = 100;
                                                                        if ( itemG.quantity >= item.quantity ) {
                                                                            this.progressBarValue = parseFloat( ( this.progressBarValue + this.progress ).toFixed( 2 ) );
                                                                            if ( this.progressBarValue >= 100 ) {
                                                                                this.verified = true;
                                                                            } else {
                                                                                this.verified = false;
                                                                            }
                                                                            this.itemsT.push( {
                                                                                itemCode: item.itemCode,
                                                                                dscription: item.dscription,
                                                                                quantityP: item.quantity,
                                                                                quantityD: itemQuantity ? itemG.quantity : 0,
                                                                                status: 'Despachado completamente.',
                                                                                progressBarValue: this.progressBarValue,
                                                                                verified: this.verified,
                                                                            } );
                                                                        } else {
                                                                            const cant = ( itemG.quantity * 100 ) / item.quantity;
                                                                            this.progressG = ( cant * this.progress ) / 100;
                                                                            this.progressBarValue = parseFloat( ( this.progressBarValue + this.progressG ).toFixed( 2 ) );
                                                                            if ( this.progressBarValue >= 100 ) {
                                                                                this.verified = true;
                                                                            } else {
                                                                                this.verified = false;
                                                                            }
                                                                            this.itemsT.push( {
                                                                                itemCode: item.itemCode,
                                                                                dscription: item.dscription,
                                                                                quantityP: item.quantity,
                                                                                quantityD: itemQuantity ? itemG.quantity : 0,
                                                                                status: `Hemos despachado el ${ this.progressBarValue }%.`,
                                                                                progressBarValue: this.progressBarValue,
                                                                                verified: this.verified,
                                                                            } );
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        )
                                                    } else {
                                                        if ( itemG.itemCode === item.itemCode ) {
                                                            this.progress = 100;
                                                            if ( itemG.quantity >= item.quantity ) {
                                                                this.progressBarValue = parseFloat( ( this.progressBarValue + this.progress ).toFixed( 2 ) );
                                                                if ( this.progressBarValue >= 100 ) {
                                                                    this.verified = true;
                                                                } else {
                                                                    this.verified = false;
                                                                }
                                                                this.itemsT.push( {
                                                                    itemCode: item.itemCode,
                                                                    dscription: item.dscription,
                                                                    quantityP: item.quantity,
                                                                    quantityD: itemQuantity ? itemG.quantity : 0,
                                                                    status: 'Despachado completamente.',
                                                                    progressBarValue: this.progressBarValue,
                                                                    verified: this.verified,
                                                                } );
                                                            } else {
                                                                const cant = ( itemG.quantity * 100 ) / item.quantity;
                                                                this.progressG = ( cant * this.progress ) / 100;
                                                                this.progressBarValue = parseFloat( ( this.progressBarValue + this.progressG ).toFixed( 2 ) );
                                                                if ( this.progressBarValue >= 100 ) {
                                                                    this.verified = true;
                                                                } else {
                                                                    this.verified = false;
                                                                }
                                                                this.itemsT.push( {
                                                                    itemCode: item.itemCode,
                                                                    dscription: item.dscription,
                                                                    quantityP: item.quantity,
                                                                    quantityD: itemQuantity ? itemG.quantity : 0,
                                                                    status: `Hemos despachado el ${ this.progressBarValue }%.`,
                                                                    progressBarValue: this.progressBarValue,
                                                                    verified: this.verified,
                                                                } );
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        )
                                    }
                                );

                                this.items.forEach(
                                    ( item ) => {
                                        this.progressBarValue = 0;
                                        const itemQuantity = itemQuantities.find( ( itemG ) => itemG.itemCode === item.itemCode );
                                        let existingItem = this.itemsT.find( ( tItem ) => tItem.itemCode === item.itemCode );

                                        if ( !existingItem ) {
                                            itemQuantities.forEach(
                                                ( itemG ) => {
                                                    if ( ofData.length !== 0 ) {
                                                        this.progress = 30;
                                                        ofData.forEach(
                                                            ( ofItem ) => {
                                                                existingItem = this.itemsT.find( ( tItem ) => tItem.itemCode === item.itemCode );
                                                                if ( !existingItem ) {
                                                                    if ( item.itemCode === ofItem.itemCode ) {
                                                                        this.progressBarValue = parseFloat( ( this.progressBarValue + this.progress ).toFixed( 2 ) );
                                                                        if ( this.progressBarValue >= 100 ) {
                                                                            this.verified = true;
                                                                        } else {
                                                                            this.verified = false;
                                                                        }
                                                                        this.itemsT.push( {
                                                                            itemCode: item.itemCode,
                                                                            dscription: item.dscription,
                                                                            quantityP: item.quantity,
                                                                            quantityD: 0,
                                                                            status: 'Tiene una Orden de fabricación.',
                                                                            progressBarValue: this.progressBarValue,
                                                                            verified: this.verified,
                                                                        } );
                                                                    } else if ( itemG.itemCode === item.itemCode ) {
                                                                        this.progress = 100;
                                                                        console.log(this.progress);
                                                                        if ( itemG.quantity >= item.quantity ) {
                                                                            this.progressBarValue = parseFloat( ( this.progressBarValue + this.progress ).toFixed( 2 ) );
                                                                            if ( this.progressBarValue >= 100 ) {
                                                                                this.verified = true;
                                                                            } else {
                                                                                this.verified = false;
                                                                            }
                                                                            this.itemsT.push( {
                                                                                itemCode: item.itemCode,
                                                                                dscription: item.dscription,
                                                                                quantityP: item.quantity,
                                                                                quantityD: itemQuantity ? itemG.quantity : 0,
                                                                                status: 'Despachado completamente.',
                                                                                progressBarValue: this.progressBarValue,
                                                                                verified: this.verified,
                                                                            } );
                                                                        } else {
                                                                            const cant = ( itemG.quantity * 100 ) / item.quantity;
                                                                            this.progressG = ( cant * this.progress ) / 100;
                                                                            this.progressBarValue = parseFloat( ( this.progressBarValue + this.progressG ).toFixed( 2 ) );
                                                                            if ( this.progressBarValue >= 100 ) {
                                                                                this.verified = true;
                                                                            } else {
                                                                                this.verified = false;
                                                                            }
                                                                            this.itemsT.push( {
                                                                                itemCode: item.itemCode,
                                                                                dscription: item.dscription,
                                                                                quantityP: item.quantity,
                                                                                quantityD: itemQuantity ? itemG.quantity : 0,
                                                                                status: `Hemos despachado el ${ this.progressBarValue }%.`,
                                                                                progressBarValue: this.progressBarValue,
                                                                                verified: this.verified,
                                                                            } );
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        );
                                                    } else {
                                                        existingItem = this.itemsT.find( ( tItem ) => tItem.itemCode === item.itemCode );
                                                        if ( !existingItem ) {
                                                            // Si el elemento no existe en this.itemsT, agrégalo
                                                            this.itemsT.push( {
                                                                itemCode: item.itemCode,
                                                                dscription: item.dscription,
                                                                quantityP: item.quantity,
                                                                quantityD: 0,
                                                                status: `Pedido ingresado el ${ this.formatDate( data[0].docDate ) }.`,
                                                                progressBarValue: 0,
                                                                verified: false,
                                                            } );
                                                        }
                                                    }
                                                }
                                            );
                                        }
                                    }
                                );

                                this.items.forEach(
                                    ( item ) => {
                                        const existingItem = this.itemsT.find( ( tItem ) => tItem.itemCode === item.itemCode );
                                        if ( !existingItem ) {
                                            // Si el elemento no existe en this.itemsT, agrégalo
                                            this.itemsT.push( {
                                                itemCode: item.itemCode,
                                                dscription: item.dscription,
                                                quantityP: item.quantity,
                                                quantityD: 0,
                                                status: `Pedido ingresado el ${ this.formatDate( data[0].docDate ) }.`,
                                                progressBarValue: 0,
                                                verified: false,
                                            } );
                                        }
                                    }
                                );
                            },
                            ( error ) => {
                                console.error( error );
                                this.guiaLoaded = true;
                                this.items.forEach(
                                    ( item ) => {
                                        const existingItem = this.itemsT.find( ( tItem ) => tItem.itemCode === item.itemCode );
                                        if ( !existingItem ) {
                                            if ( ofData.length !== 0 ) {
                                                this.progress = 30;
                                                ofData.forEach( ( ofItem ) => {
                                                    if ( item.itemCode === ofItem.itemCode ) {
                                                        this.progressBarValue = parseFloat( ( this.progressBarValue + this.progress ).toFixed( 2 ) );
                                                        if ( this.progressBarValue >= 100 ) {
                                                            this.verified = true;
                                                        } else {
                                                            this.verified = false;
                                                        }
                                                        this.itemsT.push( {
                                                            itemCode: item.itemCode,
                                                            dscription: item.dscription,
                                                            quantityP: item.quantity,
                                                            quantityD: 0,
                                                            status: 'Tiene una Orden de fabricación.',
                                                            progressBarValue: this.progressBarValue,
                                                            verified: this.verified,
                                                        } );
                                                    } else {
                                                        const existingItem = this.itemsT.find( ( tItem ) => tItem.itemCode === item.itemCode );
                                                        if ( !existingItem ) {
                                                            // Si el elemento no existe en this.itemsT, agrégalo
                                                            this.itemsT.push( {
                                                                itemCode: item.itemCode,
                                                                dscription: item.dscription,
                                                                quantityP: item.quantity,
                                                                quantityD: 0,
                                                                status: `Pedido ingresado el ${ this.formatDate( data[0].docDate ) }.`,
                                                                progressBarValue: 0,
                                                                verified: false,
                                                            } );
                                                        }
                                                    }
                                                } );
                                            } else {
                                                // Si el elemento no existe en this.itemsT, agrégalo
                                                this.itemsT.push( {
                                                    itemCode: item.itemCode,
                                                    dscription: item.dscription,
                                                    quantityP: item.quantity,
                                                    quantityD: 0,
                                                    status: `Pedido ingresado el ${ this.formatDate( data[0].docDate ) }.`,
                                                    progressBarValue: 0,
                                                    verified: false,
                                                } );
                                            }
                                        }
                                    }
                                );
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
    }

    formatDate( dateString: string ): string {
        const date = new Date( dateString );
        const day = ( date.getDate() ).toString().padStart( 2, '0' );
        const month = ( date.getMonth() + 1 ).toString().padStart( 2, '0' );
        const year = date.getFullYear().toString();

        return `${ day }/${ month }/${ year }`;
    }
}
