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

    getAuthHeaders() { // Este metodo me sirve para conectarme con el servicio de token donde estamos recibiendo y enviando el token configurado como Bearer
        const token = this.tokenService.getToken();
        return new HttpHeaders( {
            Authorization: `Bearer ${ token }`
        } );
    }

    getUsuariosList(): Observable< Usuarios[] > { // A traves de este metodo podemos presentar la lista de usuarios que tenemos en la BD
        const url = `${ this.urlAPI }/Permisos`;
        const headers = this.getAuthHeaders();
        return this.__http.get< Usuarios[] >( url, { headers } ).pipe(
            catchError( ( error ) => {
                return throwError( error );
            } )
        );
    }

    getLogin( usuario: string, contrasena: string ): Observable< Usuarios[] > { // Este metodo nos sirve para realizar una comparación entre lo que se escribe en pantalla y lo que esta en la BD y en base a eso iniciar sesión o mostrar un mensaje de error
        const url = `${ this.urlAPI }/PermisosLogin?usuario=${ usuario }&contrasena=${ contrasena }`;
        return this.__http.get< Usuarios[] >( url ).pipe(
            catchError( ( error ) => {
                return throwError( error );
            } ),
            tap( ( response ) => {
                if ( response && response.length > 0 ) {
                    const token = response[0].datosLogin.token // Obtenemos el token solo si las credenciales son correctas
                    this.tokenService.setUserData( response ); // Enviamos la información del usuario para poder tener acceso a ella conforme vayamos necesitando mas adelante
                    this.tokenService.setToken( token ); // Enviamos el registro del token  que sera utilizado para las diferentes consultas durante el uso del sistema
                }
            } )
        );
    }
}
