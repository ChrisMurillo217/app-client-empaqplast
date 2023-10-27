import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Pedidos } from '../models/pedido.model';
import { Fabricacion } from '../models/fabricacion.model';
import { Guia } from '../models/guia.model';
import { TokenService } from './token.service';

@Injectable( {
  providedIn: 'root'
} )
export class TrackingService {
    urlAPI : string = 'http://tracking.empaqplast.com:8086/api';

    constructor(
        private __http: HttpClient,
        private tokenService: TokenService
    ) { }

    getAuthHeaders() {
        const token = this.tokenService.getToken();
        return new HttpHeaders( {
            Authorization: `Bearer ${ token }`
        } );
    }

    getPedidosList( cardCode: string ): Observable< any[] > {
        const url = `${ this.urlAPI }/PedidoCliente?CardCode=${ cardCode }`;
        const headers = this.getAuthHeaders();
        return this.__http.get< Pedidos[] >( url, { headers } ).pipe(
            catchError( ( error ) => {
                return throwError( error );
            } )
        );
    }

    getPedidosByDocNum( cardCode: string, docNum: number ): Observable< any[] > {
        const url = `${ this.urlAPI }/PedidoItem?CardCode=${ cardCode }&DocNum=${ docNum }`;
        const headers = this.getAuthHeaders();
        return this.__http.get< Pedidos[] >( url, { headers } ).pipe(
            catchError( ( error ) => {
                return throwError( error );
            } )
        );
    }

    getOF( cardCode: string, originNum: number ): Observable< Fabricacion[] > {
        const url = `${ this.urlAPI }/Of?CardCode=${ cardCode }&OriginNum=${ originNum }`;
        const headers = this.getAuthHeaders();
        return this.__http.get< Fabricacion[] >( url, { headers } ).pipe(
            catchError( ( error ) => {
                return throwError( error );
            } )
        );
    }

    getGuia( cardCode: string, pedido: number ): Observable< Guia[] > {
        const url = `${ this.urlAPI }/Guia?CardCode=${ cardCode }&Pedido=${ pedido }`;
        const headers = this.getAuthHeaders();
        return this.__http.get< Guia[] >( url, { headers } ).pipe(
            catchError( ( error ) => {
                return throwError( error );
            } )
        );
    }
}
