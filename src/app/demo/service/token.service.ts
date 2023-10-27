import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class TokenService {
    private token : string = '';
    private userDataSubject = new BehaviorSubject< any >( null );
    private tokenSubject = new BehaviorSubject<string | null>(null);

    setUserData( userData: any ) {
        this.userDataSubject.next( userData );
    }

    getUserData() {
        return this.userDataSubject.asObservable();
    }

    setToken(token: string) {
        this.tokenSubject.next(token);
    }

    getToken() {
        this.token = this.tokenSubject.value;
        return this.token;
    }

    clearToken() {
        this.tokenSubject.next(null);
        localStorage.removeItem('token');
    }
}
