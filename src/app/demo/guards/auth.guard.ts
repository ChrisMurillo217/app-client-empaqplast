import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenService } from '../service/token.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private tokenService: TokenService,
        private router: Router
    ) {}

    canActivate(): Observable<boolean> | boolean {
        return of( this.tokenService.getToken() ).pipe(
            map( token => {
                if ( token ) {
                    return true;
                } else {
                    this.router.navigate( [ 'auth/login' ] );
                    return false;
                }
            } )
        );
    }
}
