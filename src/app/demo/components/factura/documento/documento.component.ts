import { Component, OnInit, ViewChild, ElementRef }     from '@angular/core';
import * as JsBarcode                                   from 'jsbarcode'; // Librería para generar códigos de barra
import html2canvas                                      from 'html2canvas'; // Librería que convierte código HTML a imagenes
import jsPDF                                            from 'jspdf'; // Librería para generar documentos PDF

import { DynamicDialogRef }                             from 'primeng/dynamicdialog';
import { DynamicDialogConfig }                          from 'primeng/dynamicdialog';

import { DocumentService }                              from '../../../service/documents.service';
import { TokenService }                                 from '../../../service/token.service';

import { ItemFact }                                     from '../../../models/itemFact.model';
import { Document }                                     from '../../../models/document.model';
import { Usuarios }                                     from '../../../models/usuarios.model';

@Component({
  selector: 'app-documento',
  templateUrl: './documento.component.html',
  styleUrls: ['./documento.component.css']
})
export class DocumentoComponent implements OnInit {
    userData:           Usuarios[] = [];
    docs:               Document[] = [];
    itemsF:             ItemFact[] = [];
    codClient:          string = '';
    autoSri:            string = '';
    tiempo:             string = '';
    docNum:             number = 0;
    numeroFact:         number = 0;
    subtotal:           number = 0;
    iva:                number = 0;
    docTotal:           number = 0;
    plazo:              number = 0;
    detailsLoaded:      boolean = false;

    @ViewChild( 'cardContainer', { static: false } ) cardContainer: ElementRef; // Hace una referencia de una parte del html para el uso en la lógica

    constructor(
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig,
        private documentService: DocumentService,
        private tokenService: TokenService
    ) {}

    ngOnInit(): void {
        this.docNum = this.config.data.docNum; // Almacena en la variable docNum el valor que viene por config del DynamicDialog

        this.tokenService.getUserData().subscribe( // Trae la información del usuario que esta loggeado
            ( data ) => {
                this.userData = data;
                this.codClient = this.userData[0].datosLogin.cardCode; // Carga el código del cliente que esta almacenado en la información del usuario
            }
        );

        this.numeroFact = this.docNum;

        this.documentService.getFacturaByDocNum( this.codClient, this.numeroFact ).subscribe(
            ( data ) => {
                // En esta parte se esta guardando en las variables la información al documento solicitado
                this.docs = data[0];
                this.subtotal = Number( data[0].subtotal.toFixed( 2 ) );
                this.iva = Number( data[0].iva.toFixed( 2 ) );
                this.docTotal = Number( data[0].docTotal.toFixed( 2 ) );
                this.autoSri = data[0].autoSri;
                this.itemsF = data[0].itemsFactura;
                this.detailsLoaded = true;

                // Configuraciones para la generación del código de barras
                const opts = {
                    format: 'CODE128', // Formato para un código de barras de alta densidad
                    displayValue: true, // Muestra la información que tiene el BarCode
                    width: 0.85,
                    height: 50,
                    fontSize: 10
                };

                setTimeout( () => { // Le da un tiempo de espera para generar el barcode
                    JsBarcode( '#barcode', this.autoSri, opts );
                }, 0 );

                const match = data[0].pymntGroup.match( /^(\d+)\s+(.*)/ ); // Separa los elementos de una oración basandose en los espacios en blanco de la información que tiene data[0] y la guarda en el vector match como elementos separados

                if ( match ) {
                    this.plazo = match[1]; // Asigna el primer dato a la variable plazo
                    this.tiempo = match[2]; // Asigna el siguiente dato a la variable tiempo
                } else {
                    console.log( "No se encontró un número y una palabra en el string." );
                }
            },
            ( error ) => {
                console.error( error );
            }
        );
    }

    formatDate( dateString: string ): string { // Permite tomar la fecha que viene de la BD formatearla y presentarla como DD/MM/YYYY
        const date = new Date( dateString );
        const day = ( date.getDate() ).toString().padStart( 2, '0' );
        const month = ( date.getMonth() + 1 ).toString().padStart( 2, '0' );
        const year = date.getFullYear().toString();

        return `${ day }/${ month }/${ year }`;
    }

    formatNumber( numero ) { // Formatea cualquier numero que venga de la BD 00100201234567 de esta manera y presentarlo de la siguiente forma 001-002-01234567
        const numberFormated = numero.slice( 0, 3 ) + '-' + numero.slice( 3, 6 ) + '-' + numero.slice( 6 );
        return numberFormated;
    }

    imprimirContenido() { // Función para imprimir contenido HTML
        const cardContainer = this.cardContainer.nativeElement; // Toma el contenido HTML de cardContainer y lo guarda en la variable
        // Dimenseiones para el documento PDF
        const pageWidth = 210;
        const pageHeight = 297;
        // Espacios de margen para el documento PDF
        const margin = 15;
        const topMargin = 10;

        html2canvas( cardContainer ).then( // Toma el contenido de cardContainer y lo convierte en una imagen
            ( canvas ) => {
                const imgData = canvas.toDataURL('image/png'); // Guarda el contenido tomado en la variable imgData
                const pdf = new jsPDF('p', 'mm', 'a4'); // Configuraciones del documento PDF

                // Calcula el ancho y alto de la imagen ajustada
                const maxWidth = pageWidth - 2 * margin;
                const maxHeight = pageHeight - topMargin - margin;

                let imgWidth = canvas.width;
                let imgHeight = canvas.height;

                if (imgWidth > maxWidth) {
                    imgHeight = (imgHeight * maxWidth) / imgWidth;
                    imgWidth = maxWidth;
                }

                if ( imgHeight > maxHeight ) {
                    imgWidth = ( imgWidth * maxHeight ) / imgHeight;
                    imgHeight = maxHeight;
                }

                const imageX = margin + ( maxWidth - imgWidth ) / 2;
                const imageY = topMargin + ( maxHeight - imgHeight ) / 2;

                pdf.addImage( imgData, 'PNG', imageX, imageY, imgWidth, imgHeight );
                pdf.setTextColor(255, 0, 0);// Configura el color de relleno en rojo
                pdf.text('* Este documento no tiene validez tributaria * ', 50, 5);// Agrega el texto al principio de la página
                pdf.text('* Este documento no tiene validez tributaria *', 50, pageHeight );// Agrega el texto al final de la página
                pdf.setTextColor( 0, 0, 0 );// Restablece el color de relleno a negro
                pdf.save( 'documento.pdf' );
            }
        );
    }
}
