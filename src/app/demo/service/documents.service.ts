import { Injectable }                               from '@angular/core';
import { HttpClient, HttpHeaders }                  from '@angular/common/http';
import { Observable, catchError, throwError }       from 'rxjs';

import { Document }                                 from '../models/tracking/document.model';
import { GuiaInfo }                                 from '../models/tracking/guia-rem.model';

import { TokenService }                             from './token.service';

@Injectable( {
  providedIn: 'root'
} )
export class DocumentService {
    urlAPI:                     string = 'http://tracking.empaqplast.com:8086/api';

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

    getFacturasList( codClient: string ): Observable< any[] > { // Metodo para obtener la lista de todas las facturas y notas de credito que se tiene
        const url = `${ this.urlAPI }/Facturas?CodClient=${ codClient }`;
        const headers = this.getAuthHeaders();
        return this.__http.get< Document[] >( url, { headers } ).pipe(
            catchError( ( error ) => {
                return throwError( error );
            } )
        );
    }

    getFacturaByDocNum( codClient: string, numeroFact: number ): Observable< any[] > { // Metodo para obtener el detalle de una factura especifica basado en el codigo del cliente y el numero de factura
        const url = `${ this.urlAPI }/Factura?CodClient=${ codClient }&NumeroFact=${ numeroFact }`;
        const headers = this.getAuthHeaders();
        return this.__http.get< Document[] >( url, { headers } ).pipe(
            catchError( ( error ) => {
                return throwError( error );
            } )
        );
    }

    getGuiasList( cardCode: string ): Observable< any[] > { // Metodo para obtener la lista de todas las guías que se tiene
        const url = `${ this.urlAPI }/Entrega?cardCode=${ cardCode }`;
        const headers = this.getAuthHeaders();
        return this.__http.get< GuiaInfo[] >( url, { headers } ).pipe(
            catchError( ( error ) => {
                return throwError( error );
            })
        );
    }
}
