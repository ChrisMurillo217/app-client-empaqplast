import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    canActivate(): Observable<boolean> | boolean {
        return this.authService.IsLoggedIn$.pipe(
            map( isLoggedIn => {
                if ( isLoggedIn ) {
                    return true;
                } else {
                    // Si el usuario no está autenticado, redirige al componente de inicio de sesión.
                    this.router.navigate( [ 'auth/login' ] );
                    return false;
                }
            } )
        );
    }
}
