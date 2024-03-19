import { Injectable }                                   from '@angular/core';
import { HttpClient, HttpHeaders }                      from '@angular/common/http';

import { Observable, catchError, throwError }           from 'rxjs';

import { TokenService }                                 from './token.service';

import { Person }                                        from '../models/admin/person.model';
import { InfoUsers } from '../models/admin/info-users.model';

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

    newPerson( dates: Person ): Observable< any > { // A través de este método guardo nuevas personas en la BD
        const url = `${ this.urlAPI }/usuarios/registro/dato`;
        const headers = this.getAuthHeaders();
        return this.__http.post( url, dates, { headers } ).pipe(
            catchError( ( error ) => {
                return throwError( error );
            } )
        );
    }

    newUser( user: InfoUsers ): Observable< any > { // A través de este método guardo nuevas personas en la BD
        const url = `${ this.urlAPI }/usuarios/registro/usuario`;
        const headers = this.getAuthHeaders();
        return this.__http.post( url, user, { headers } ).pipe(
            catchError( ( error ) => {
                return throwError( error );
            } )
        );
    }

    getDatosUsuarios( ): Observable< any[] > { // Con este método obtenemos la lista de todos los Usuarios
        const url = `${ this.urlAPI }/usuarios/lista/datos`;
        const headers = this.getAuthHeaders();
        return this.__http.get< Document[] >( url, { headers } ).pipe(
            catchError( ( error ) => {
                return throwError( error );
            } )
        );
    }

    getRoles( ): Observable< any[] > { // Con este método obtenemos la lista de todos los roles
        const url = `${ this.urlAPI }/usuarios/lista/rol`;
        const headers = this.getAuthHeaders();
        return this.__http.get< Document[] >( url, { headers } ).pipe(
            catchError( ( error ) => {
                return throwError( error );
            } )
        );
    }
}
