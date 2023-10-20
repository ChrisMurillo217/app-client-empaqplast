import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InfoUsers } from '../models/info-users.model';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class UsuariosService {
    urlAPI:                     string = 'http://192.168.20.14:8086/api';

    constructor( private __http: HttpClient ) { }

    newUser( usuario: InfoUsers ): Observable< any > {
        const url = `${ this.urlAPI }/Registro`;
        return this.__http.post( url, usuario ).pipe(
            catchError( ( error ) => {
                return throwError( error );
            } )
        );
    }
}
