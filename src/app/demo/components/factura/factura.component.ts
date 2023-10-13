import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { DocumentService } from '../../service/documents.service';
import { ItemFact } from '../../models/itemFact.model';
import { Document } from '../../models/document.model';

@Component( {
    templateUrl: './factura.component.html',
    providers: [
        MessageService,
        ConfirmationService
    ]
} )
export class FacturaComponent implements OnInit {
    codClient:          string = 'CN0590055328001';
    numeroFact:         number = 0;
    first:              number = 0;
    itemsF:             ItemFact[] = [];
    documentos:         Document[] = [];
    docs:               Document[] = [];

    @ViewChild('filter') filter!: ElementRef;

    constructor( private documentService: DocumentService ) {}

    ngOnInit(): void {
        this.documentService.getFacturasList( this.codClient ).subscribe(
            ( data ) => {
                this.documentos = data;
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

    onPageChange( event: any ) {
        this.first = event.first;
    }

    onGlobalFilter( table: Table, event: Event ) {
        table.filterGlobal( ( event.target as HTMLInputElement ).value, 'contains' );
    }

    itemClick( docNum: number ) {
        this.numeroFact = docNum;

        this.documentService.getFacturaByDocNum( this.codClient, this.numeroFact ).subscribe(
            ( data ) => {
                this.docs = data[0];
                this.itemsF = data[0].itemsFactura;
                console.log(this.docs, this.itemsF, data);
            },
            ( error ) => {
                console.error( error );
            }
        );
    }
}
