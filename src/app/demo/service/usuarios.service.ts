import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { InfoUsers } from '../models/info-users.model';
import { TokenService } from './token.service';

@Injectable()
export class UsuariosService {
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

    newUser( usuario: InfoUsers ): Observable< any > {
        const url = `${ this.urlAPI }/Registro`;
        const headers = this.getAuthHeaders();
        return this.__http.post( url, usuario, { headers } ).pipe(
            catchError( ( error ) => {
                return throwError( error );
            } )
        );
    }

    getDatosUsuarios( ): Observable< any[] > {
        const url = `${ this.urlAPI }/DatosUsuarios`;
        const headers = this.getAuthHeaders();
        return this.__http.get< Document[] >( url, { headers } ).pipe(
            catchError( ( error ) => {
                return throwError( error );
            } )
        );
    }
}
