import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { TrackingService } from '../../service/tracking.service';
import { Pedidos } from '../../models/pedido.model';
import { Table } from 'primeng/table';

@Component( {
    templateUrl: './stock.component.html',
    providers: [
        MessageService,
        ConfirmationService
    ]
} )
export class StockComponent implements OnInit {
    pedidos:      Pedidos[] = [];
    first         = 0;

    @ViewChild('filter') filter!: ElementRef;

    constructor( private trackingService: TrackingService ) {}

    ngOnInit(): void {
        this.trackingService.getPedidosList('CN1754791810').subscribe(
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

    onPageChange( event: any ) {
        this.first = event.first;
    }

    onGlobalFilter( table: Table, event: Event ) {
        table.filterGlobal( ( event.target as HTMLInputElement ).value, 'contains' );
    }
}
