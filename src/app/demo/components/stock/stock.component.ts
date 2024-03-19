import { Component, OnInit, ViewChild, ElementRef }         from '@angular/core';

import { Table }                                            from 'primeng/table';

import { StockService }                                     from '../../service/stock.service';
import { TokenService }                                     from '../../service/token.service';

import { Stock }                                            from '../../models/tracking/stock.model';
import { Usuarios }                                         from '../../models/admin/usuarios.model';

@Component( {
    templateUrl: './stock.component.html',
    styleUrls: ['./stock.component.css']
} )
export class StockComponent implements OnInit {
    codClient:          string = '';
    stocks:             Stock[] = [];
    userData:           Usuarios[] = [];
    first               = 0;
    dataLoaded:         boolean = false;

    @ViewChild('filter') filter!: ElementRef;

    constructor(
        private stockService: StockService,
        private tokenService: TokenService
    ) {}

    ngOnInit(): void {
        this.tokenService.getUserData().subscribe( // Trae la información del usuario loggeado
            ( data ) => {
                this.userData = data;
                this.codClient = this.userData[0].datosLogin.cardCode;
            }
        );
        this.stockService.getStock( this.codClient ).subscribe( // Trae el stock que posee el cliente loggeado
            ( data ) => {
                this.stocks = data;
                this.stocks.sort( ( a, b ) => a.itemCode.localeCompare( b.itemCode ) ); // Ordena por orden alfabetico los códigos de item
                this.dataLoaded = true;
            },
            ( error ) => {
                console.error( error );
                this.dataLoaded = true;
            }
        );
    }

    onPageChange( event: any ) {  // Permite el manejo de paginación en la tabla que se muestra en pantalla
        this.first = event.first;
    }

    onGlobalFilter( table: Table, event: Event ) { // Nos ayuda a tomar el contenido del input y realizar la busqueda en el contenido de la tabla mostrada
        table.filterGlobal( ( event.target as HTMLInputElement ).value, 'contains' );
    }
}
