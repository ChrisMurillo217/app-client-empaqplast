import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { StockService } from '../../service/stock.service';
import { TokenService } from '../../service/token.service';
import { Stock } from '../../models/stock.model';
import { Usuarios } from '../../models/usuarios.model';
import { Table } from 'primeng/table';

@Component( {
    templateUrl: './stock.component.html',
    providers: [
        MessageService,
        ConfirmationService
    ],
    styleUrls: ['./stock.component.css']
} )
export class StockComponent implements OnInit {
    codClient:          string = '';
    stocks:             Stock[] = [];
    userData:           Usuarios[] = [];
    first               = 0;
    loading:            boolean = true;
    dataLoaded:         boolean = false;

    @ViewChild('filter') filter!: ElementRef;

    constructor(
        private stockService: StockService,
        private tokenService: TokenService
    ) {}

    ngOnInit(): void {
        this.tokenService.getUserData().subscribe(
            ( data ) => {
                this.userData = data;
                this.codClient = this.userData[0].datosLogin.cardCode;
            }
        );
        this.stockService.getStock( this.codClient ).subscribe(
            ( data ) => {
                this.stocks = data;
                this.stocks.sort( ( a, b ) => a.itemCode.localeCompare( b.itemCode ) );
                this.loading = false;
                this.dataLoaded = true;
            },
            ( error ) => {
                console.error( error );
            }
        );
    }

    onPageChange( event: any ) {
        this.first = event.first;
    }

    onGlobalFilter( table: Table, event: Event ) {
        table.filterGlobal( ( event.target as HTMLInputElement ).value, 'contains' );
    }
}
