import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as JsBarcode from 'jsbarcode';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { DocumentService } from '../../service/documents.service';
import { UserDataService } from '../../service/user-data.service';
import { ItemFact } from '../../models/itemFact.model';
import { Document } from '../../models/document.model';
import { Usuarios } from '../../models/usuarios.model';

@Component( {
    templateUrl: './factura.component.html',
    providers: [
        MessageService,
        ConfirmationService
    ]
} )
export class FacturaComponent implements OnInit {
    codClient:          string = '';
    numeroFact:         number = 0;
    first:              number = 0;
    itemsF:             ItemFact[] = [];
    documentos:         Document[] = [];
    docs:               Document[] = [];
    userData:           Usuarios[] = [];
    loading:            boolean = true;
    plazo:              number = 0;
    tiempo:             string = '';
    subtotal:           number = 0;
    iva:                number = 0;
    docTotal:           number = 0;
    pryUnit:            number = 0;
    pryTrasDscto:       number = 0;
    totalLinea:         number = 0;
    autoSri:            string = '';

    @ViewChild( 'filter' ) filter!: ElementRef;
    @ViewChild( 'barcode' ) barcode!: ElementRef;
    @ViewChild( 'cardContainer', { static: false } ) cardContainer: ElementRef;

    constructor(
        private documentService: DocumentService,
        private userDataService: UserDataService
    ) {}

    ngOnInit(): void {
        this.userDataService.getUserData().subscribe(
            ( data ) => {
                this.userData = data;
                this.codClient = this.userData[0].datosLogin.cardCode;
            }
        );
        this.documentService.getFacturasList( this.codClient ).subscribe(
            ( data ) => {
                this.documentos = data;
                this.loading = false;
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
                this.subtotal = Number( data[0].subtotal.toFixed( 2 ) );
                this.iva = Number( data[0].iva.toFixed( 2 ) );
                this.docTotal = Number( data[0].docTotal.toFixed( 2 ) );
                this.autoSri = data[0].autoSri;
                this.itemsF = data[0].itemsFactura;

                const opts = {
                    format: 'CODE128',
                    displayValue: false,
                    width: 1,
                    height: 50
                };

                JsBarcode(this.barcode.nativeElement, this.autoSri, opts);

                const svgElement = this.barcode.nativeElement;
                const textElement = svgElement.querySelector('text');

                if (textElement) {
                    textElement.setAttribute('font-size', '5px');
                }

                const match = data[0].pymntGroup.match( /^(\d+)\s+(.*)/ );

                if ( match ) {
                    this.plazo = match[1];
                    this.tiempo = match[2];
                } else {
                    console.log("No se encontró un número y una palabra en el string.");
                }
            },
            ( error ) => {
                console.error( error );
            }
        );
    }

    imprimirContenido() {
        const cardContainer = this.cardContainer.nativeElement;

        html2canvas(cardContainer).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const width = pdf.internal.pageSize.getWidth();
            const height = (canvas.height * width) / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, width, height);
            pdf.save('documento.pdf');
        });
    }
}
