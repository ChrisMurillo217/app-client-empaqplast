import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Stock } from '../models/stock.model';
import { TokenService } from './token.service';

@Injectable( {
  providedIn: 'root'
} )
export class StockService {
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

    getStock( cardCode: string ): Observable< any[] > { // Metodo para obtener la lista del stock que tiene cada empresa basado en el cardCode
        const url = `${ this.urlAPI }/Stock?CardCode=${ cardCode }`;
        const headers = this.getAuthHeaders();
        return this.__http.get< Stock[] >( url, { headers } ).pipe(
            catchError( ( error ) => {
                return throwError( error );
            } )
        );
    }
}
