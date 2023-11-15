import { Injectable }                                   from '@angular/core';
import { HttpClient, HttpHeaders }                      from '@angular/common/http';

import { Observable, catchError, throwError }           from 'rxjs';

import { TokenService }                                 from './token.service';

import { Dates }                                        from '../models/dates.model';

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

    newUser( dates: Dates ): Observable< any > {
        const url = `${ this.urlAPI }/RegistroDatos`;
        const headers = this.getAuthHeaders();
        return this.__http.post( url, dates, { headers } ).pipe(
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

    getRoles( ): Observable< any[] > {
        const url = `${ this.urlAPI }/ListaRoles`;
        const headers = this.getAuthHeaders();
        return this.__http.get< Document[] >( url, { headers } ).pipe(
            catchError( ( error ) => {
                return throwError( error );
            } )
        );
    }
}
