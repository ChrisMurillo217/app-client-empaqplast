import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Document } from '../models/document.model';
import { TokenService } from './token.service';

@Injectable( {
  providedIn: 'root'
} )
export class DocumentService {
    urlAPI:                     string = 'http://tracking.empaqplast.com:8086/api';

    constructor(
        private __http: HttpClient,
        private tokenService: TokenService
    ) { }

    private saveLocalStorage(): void {
        // localStorage.setItem('history', )
    }

    getAuthHeaders() {
        const token = this.tokenService.getToken();
        return new HttpHeaders( {
            Authorization: `Bearer ${ token }`
        } );
    }

    getFacturasList( codClient: string ): Observable< any[] > {
        const url = `${ this.urlAPI }/Facturas?CodClient=${ codClient }`;
        const headers = this.getAuthHeaders();
        return this.__http.get< Document[] >( url, { headers } ).pipe(
            catchError( ( error ) => {
                return throwError( error );
            } )
        );
    }

    getFacturaByDocNum( codClient: string, numeroFact: number ): Observable< any[] > {
        const url = `${ this.urlAPI }/Factura?CodClient=${ codClient }&NumeroFact=${ numeroFact }`;
        const headers = this.getAuthHeaders();
        return this.__http.get< Document[] >( url, { headers } ).pipe(
            catchError( ( error ) => {
                return throwError( error );
            } )
        );
    }
}
