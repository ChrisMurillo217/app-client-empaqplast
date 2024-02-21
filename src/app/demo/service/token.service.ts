import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class TokenService {
    private token : string = '';
    private userDataSubject = new BehaviorSubject< any >( null );
    private tokenSubject = new BehaviorSubject<string | null>(null);

    setUserData( userData: any ) { // Este metodo se encarga de proporcionar la información del usuario loggeado
        this.userDataSubject.next( userData );
    }

    getUserData() { // Este metodo obtiene la información del servicio de autenticación
        return this.userDataSubject.asObservable();
    }

    setToken( token: string ) { // Este metodo se encarga de proporcionar el token
        this.tokenSubject.next( token );
    }

    getToken() { // Este metodo obtiene el token del servicio de autenticación
        this.token = this.tokenSubject.value;
        return this.token;
    }

    clearToken() { // Este se encarga de limpiar el token del localStorage para evitar posibles filtraciónes de actores externos
        this.tokenSubject.next( null );
        localStorage.removeItem( 'token' );
    }
}
