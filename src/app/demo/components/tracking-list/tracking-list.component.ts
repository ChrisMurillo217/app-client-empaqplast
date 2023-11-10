import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Table }                                    from 'primeng/table';
import { ProgressBar }                              from 'primeng/progressbar';
import { DialogService }                            from 'primeng/dynamicdialog';
import { DynamicDialogRef }                         from 'primeng/dynamicdialog';

import { TrackingService }                          from './../../service/tracking.service';
import { TokenService }                             from '../../service/token.service';

import { Pedidos }                                  from './../../models/pedido.model';
import { Usuarios }                                 from '../../models/usuarios.model';

import { DetallesComponent }                        from './detalles/detalles.component';
import { TrackingComponent }                        from './tracking/tracking.component';

@Component( {
    templateUrl: './tracking-list.component.html',
    styleUrls: ['./tracking-list.component.css']
} )
export class TrackingListComponent implements OnInit {
    ref:                DynamicDialogRef;
    cardCode:           string = '';
    first:              number = 0;
    pedidos:            Pedidos[] = [];
    userData:           Usuarios[] = [];
    loading:            boolean = true;
    dataLoaded:         boolean = false;

    @ViewChild( 'filter' ) filter!: ElementRef;
    @ViewChild( 'myProgressBar' ) progressBar!: ProgressBar;

    constructor(
        public dialogService: DialogService,
        private trackingService: TrackingService,
        private tokenService: TokenService
    ) {}

    ngOnInit(): void {
        this.tokenService.getUserData().subscribe(
            ( data ) => {
                this.userData = data;
                this.cardCode = this.userData[0].datosLogin.cardCode;
            }
        );
        this.trackingService.getPedidosList( this.cardCode ).subscribe(
            ( data ) => {
                const today = new Date();
                const currentYear = today.getFullYear();
                data.forEach(
                    ( item ) => {
                        const docDate = new Date( item.docDate )
                        if ( docDate.getFullYear().toString() === currentYear.toString() ) {
                            this.pedidos.push( item );
                        }
                    }
                );

                this.pedidos.sort(
                    ( a, b ) => {
                        const dateA = new Date( a.docDate ).getTime();
                        const dateB = new Date( b.docDate ).getTime();
                        return dateB - dateA;
                    }
                );

                this.loading = false;
                this.dataLoaded = true;
            },
            ( error ) => {
                console.error( error );
            }
        );
    }

    showDetails( docNum ) {
        this.ref = this.dialogService.open( DetallesComponent, {
            header: 'Detalles del pedido',
            width: '700px',
            contentStyle: {
                'max-height': '700px',
                'overflow': 'auto'
            },
            baseZIndex: 10000,
            data: {
                docNum
            }
        } );
    }

    showTracking( docNum ) {
        this.ref = this.dialogService.open( TrackingComponent, {
            header: 'Seguimiento',
            width: '1200px',
            contentStyle: {
                'max-height': '700px',
                'overflow': 'auto'
            },
            baseZIndex: 10000,
            data: {
                docNum
            }
        } );
    }

    ngOnDestroy(): void {
        if ( this.ref ) {
            this.ref.close()
        }
    }

    formatDate( dateString: string ): string {
        const date = new Date( dateString );
        const day = ( date.getDate() ).toString().padStart( 2, '0' );
        const month = ( date.getMonth() + 1 ).toString().padStart( 2, '0' );
        const year = date.getFullYear().toString();

        return `${ day }/${ month }/${ year }`;
    }

    onPageChange( event: any ) {
        this.first = event.first;
    }

    onGlobalFilter( table: Table, event: Event ) {
        table.filterGlobal( ( event.target as HTMLInputElement ).value, 'contains' );
    }
}
