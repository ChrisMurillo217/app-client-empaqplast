import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Pedidos } from '../models/pedido.model';
import { Fabricacion } from '../models/fabricacion.model';
import { Guia } from '../models/guia.model';

@Injectable( {
  providedIn: 'root'
} )
export class TrackingService {
    urlAPI : string = 'http://192.168.20.14:8086/api';

    constructor( private __http: HttpClient ) { }

    getPedidosList( cardCode: string ): Observable< any[] > {
        const url = `${ this.urlAPI }/PedidoCliente?CardCode=${ cardCode }`;
        return this.__http.get< Pedidos[] >( url ).pipe(
            catchError( ( error ) => {
                return throwError( error );
            } )
        );
    }

    getPedidosByDocNum( cardCode: string, docNum: number ): Observable< any[] > {
        const url = `${ this.urlAPI }/PedidoItem?CardCode=${ cardCode }&DocNum=${ docNum }`;
        return this.__http.get< Pedidos[] >( url ).pipe(
            catchError( ( error ) => {
                return throwError( error );
            } )
        );
    }

    getOF( cardCode: string, originNum: number ): Observable< Fabricacion[] > {
        const url = `${ this.urlAPI }/Of?CardCode=${ cardCode }&OriginNum=${ originNum }`;
        return this.__http.get< Fabricacion[] >( url ).pipe(
            catchError( ( error ) => {
                return throwError( error );
            } )
        );
    }

    getGuia( cardCode: string, pedido: number ): Observable< Guia[] > {
        const url = `${ this.urlAPI }/Guia?CardCode=${ cardCode }&Pedido=${ pedido }`;
        return this.__http.get< Guia[] >( url ).pipe(
            catchError( ( error ) => {
                return throwError( error );
            } )
        );
    }
}
