import { Component, OnInit }                            from '@angular/core';

import { Table }                                        from 'primeng/table';
import { DialogService }                                from 'primeng/dynamicdialog';
import { DynamicDialogRef }                             from 'primeng/dynamicdialog';

import { DocumentService }                              from '../../service/documents.service';
import { TokenService }                                 from '../../service/token.service';

import { Usuarios }                                     from '../../models/usuarios.model';
import { GuiaInfo, GuiaValue }                            from '../../models/guia-rem.model';

@Component({
  selector: 'app-guia',
  templateUrl: './guia.component.html',
  styleUrls: ['./guia.component.css']
})
export class GuiaComponent implements OnInit {
    first:              number = 0;
    userData:           Usuarios[] = [];
    info:               GuiaInfo;
    guias:              GuiaValue[] = [];
    codClient:          string = '';
    dataLoaded:         boolean = false;

    constructor(
        private documentService: DocumentService,
        private tokenService: TokenService
    ) { }

    ngOnInit(): void {
        this.tokenService.getUserData().subscribe( // Trae la información del usuario loggeado
            ( data ) => {
                this.userData = data;
                this.codClient = this.userData[0].datosLogin.cardCode;
            }
        )

        this.documentService.getGuiasList( this.codClient ).subscribe( // Trae una lista de guias de remisión basado en el código del cliente
            ( data: any ) => {
                const today = new Date();
                const currentYear = today.getFullYear(); // Obtiene la fecha actual
                // Solo guarda las guias que sean del mismo año que la fecha actual
                this.guias = data.value;
                this.guias.forEach(
                    ( item ) => {
                        const docDate = new Date( item.DocDate );
                        console.log(currentYear.toString(), docDate.getFullYear().toString());
                        if ( docDate.getFullYear().toString() === currentYear.toString() ) {
                            this.guias.push( item );
                        }
                    }
                );

                // Ordena desde la fecha mas actual y los va guardando en el vector guias
                this.guias.sort(
                    ( a, b ) => {
                        const dateA = new Date( a.DocDate ).getTime();
                        const dateB = new Date( b.DocDate ).getTime();
                        return dateB - dateA;
                    }
                );

                this.dataLoaded = true; // Variable que envia verdadero para poder mostrar la información en pantalla
            },
            ( error ) => {
                console.error( error );
                this.dataLoaded = true; // Variable que envia verdadero para poder mostrar la información en pantalla
            }
        )
    }

    formatDate( dateString: string ): string { // Permite tomar la fecha que viene de la BD formatearla y presentarla como DD/MM/YYYY
        const date = new Date( dateString );
        const day = ( date.getDate() + 1 ).toString().padStart( 2, '0' );
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

}
