import { Component, OnInit }                            from '@angular/core';

import { Table }                                        from 'primeng/table';
import { DialogService }                                from 'primeng/dynamicdialog';
import { DynamicDialogRef }                             from 'primeng/dynamicdialog';

import { DocumentService }                              from '../../service/documents.service';
import { TokenService }                                 from '../../service/token.service';

import { Document }                                     from '../../models/tracking/document.model';
import { Usuarios }                                     from '../../models/admin/usuarios.model';

import { DocumentoComponent }                           from './documento/documento.component';

@Component( {
    templateUrl: './factura.component.html',
    styleUrls: ['./factura.component.css']
} )
export class FacturaComponent implements OnInit {
    ref:                DynamicDialogRef;
    codClient:          string = '';
    first:              number = 0;
    documentos:         Document[] = [];
    userData:           Usuarios[] = [];
    dataLoaded:         boolean = false;

    constructor(
        public dialogService: DialogService,
        private documentService: DocumentService,
        private tokenService: TokenService
    ) { }

    ngOnInit(): void {
        this.tokenService.getUserData().subscribe( // Trae la información del usuario loggeado
            ( data ) => {
                this.userData = data;
                this.codClient = this.userData[0].datosLogin.cardCode;
            }
        );

        this.documentService.getFacturasList( this.codClient ).subscribe( // Trae una lista de facturas basado en el código del cliente
            ( data ) => {
                const today = new Date();
                const currentYear = today.getFullYear(); // Obtiene la fecha actual
                // Solo guarda los documentos que sean del mismo año que la fecha actual
                data.forEach(
                    ( item ) => {
                        const ffact = new Date( item.ffact );
                        if ( ffact.getFullYear().toString() === currentYear.toString() ) {
                            this.documentos.push( item );
                        }
                    }
                );

                // Ordena desde la fecha mas actual y los va guardando en el vector documentos
                this.documentos.sort(
                    ( a, b ) => {
                        const dateA = new Date( a.ffact ).getTime();
                        const dateB = new Date( b.ffact ).getTime();
                        return dateB - dateA;
                    }
                );

                this.dataLoaded = true; // Variable que envia verdadero para poder mostrar la información en pantalla
            },
            ( error ) => {
                console.error( error );
                this.dataLoaded = true; // Variable que envia verdadero para poder mostrar la información en pantalla
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

    onPageChange( event: any ) { // Permite el manejo de paginación en la tabla que se muestra en pantalla
        this.first = event.first;
    }

    onGlobalFilter( table: Table, event: Event ) { // Nos ayuda a tomar el contenido del input y realizar la busqueda en el contenido de la tabla mostrada
        table.filterGlobal( ( event.target as HTMLInputElement ).value, 'contains' );
    }

    showDocs( docNum ) { // Función de configuración para el modal que se construyo con DinamycDialog enviando un parametro a la misma
        this.ref = this.dialogService.open( DocumentoComponent, {
            header: 'Detalle del Documento',
            width: '210mm',
            contentStyle: {
                'overflow': 'auto'
            },
            baseZIndex: 10000,
            data: {
                docNum
            },
            maximizable: true
        } );
    }
}
