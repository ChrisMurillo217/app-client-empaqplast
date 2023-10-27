import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError, BehaviorSubject, tap } from 'rxjs';
import { Usuarios } from '../models/usuarios.model';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
    urlAPI                      : string = 'http://tracking.empaqplast.com:8086/api';
    private isLoggedInSubject = new BehaviorSubject< boolean >( false );


    constructor(
        private __http: HttpClient,
        private tokenService: TokenService
    ) {}

    getAuthHeaders() {
        const token = this.tokenService.getToken();
        return new HttpHeaders( {
            Authorization: `Bearer ${ token }`
        } );
    }

    getUsuariosList(): Observable< Usuarios[] > {
        const url = `${ this.urlAPI }/Permisos`;
        const headers = this.getAuthHeaders();
        return this.__http.get< Usuarios[] >( url, { headers } ).pipe(
            catchError( ( error ) => {
                return throwError( error );
            } )
        );
    }

    getLogin( usuario: string, contrasena: string ): Observable< Usuarios[] > {
        const url = `${ this.urlAPI }/PermisosLogin?usuario=${ usuario }&contrasena=${ contrasena }`;
        return this.__http.get< Usuarios[] >( url ).pipe(
            catchError( ( error ) => {
                return throwError( error );
            } ),
            tap( ( response ) => {
                if ( response && response.length > 0 ) {
                    const token = response[0].datosLogin.token
                    this.tokenService.setUserData( response );
                    this.tokenService.setToken( token );
                    localStorage.setItem( 'token', token );
                }
            } )
        );
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    get IsLoggedIn$(): Observable< boolean > {
        return this.isLoggedInSubject.asObservable();
    }
}
