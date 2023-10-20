import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError, BehaviorSubject } from 'rxjs';
import { Usuarios } from '../models/usuarios.model';

@Injectable()
export class AuthService {
    urlAPI                      : string = 'http://192.168.20.14:8086/api';
    private isLoggedInSubject = new BehaviorSubject< boolean >( false );


    constructor( private __http: HttpClient ) {}

    getUsuariosList(): Observable< Usuarios[] > {
        const url = `${ this.urlAPI }/Permisos`;
        return this.__http.get< Usuarios[] >( url ).pipe(
            catchError( ( error ) => {
                return throwError( error );
            } )
        );
    }

    getLogin( usuario: string, contrasena: string ): Observable< Usuarios[] > {
        const url = `${ this.urlAPI }/PermisosLogin?usuario=${ usuario }&contrasena=${ contrasena }`;
        const isAuthenticated = true;
        this.isLoggedInSubject.next( isAuthenticated );
        localStorage.setItem( 'isLoggedIn', isAuthenticated ? 'true' : 'false' );
        return this.__http.get< Usuarios[] >( url ).pipe(
            catchError( ( error ) => {
                return throwError( error );
            } )
        );
    }

    logout() {
        this.isLoggedInSubject.next( false );
        localStorage.setItem( 'isLoggedIn', 'false' );
    }

    get IsLoggedIn$(): Observable< boolean > {
        return this.isLoggedInSubject.asObservable();
    }
}
