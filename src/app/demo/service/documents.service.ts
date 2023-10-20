import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Document } from '../models/document.model';

@Injectable( {
  providedIn: 'root'
} )
export class DocumentService {
    urlAPI:                     string = 'http://192.168.20.14:8086/api';

    constructor( private __http: HttpClient ) { }

    getFacturasList( codClient: string ): Observable< any[] > {
        const url = `${ this.urlAPI }/Facturas?CodClient=${ codClient }`;
        return this.__http.get< Document[] >( url ).pipe(
            catchError( ( error ) => {
                return throwError( error );
            } )
        );
    }

    getFacturaByDocNum( codClient: string, numeroFact: number ): Observable< any[] > {
        const url = `${ this.urlAPI }/Factura?CodClient=${ codClient }&NumeroFact=${ numeroFact }`;
        return this.__http.get< Document[] >( url ).pipe(
            catchError( ( error ) => {
                return throwError( error );
            } )
        );
    }
}
