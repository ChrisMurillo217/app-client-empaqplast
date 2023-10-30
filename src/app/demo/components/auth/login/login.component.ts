import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthService } from '../../../service/auth.service';
import { TokenService } from '../../../service/token.service';
import { Usuarios } from './../../../models/usuarios.model';

@Component( {
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale( 1.6 );
            margin-right: 1rem;
            color: var( --primary-color ) !important;
        }
    `]
} )
export class LoginComponent {
    mail            : string;
    password        : string;
    usuarios        : Usuarios[] = [];
    isLoggedIn      : boolean = false;

    constructor(
        public layoutService: LayoutService,
        private authService: AuthService,
        private router: Router,
        private messageService: MessageService,
        private tokenService: TokenService
    ) { }

    login() {
        this.authService.getLogin( this.mail, this.password ).subscribe(
            ( data ) => {
                this.tokenService.setToken( data[0].datosLogin.token );
                this.tokenService.setUserData( data );
                this.router.navigate( [ '/panel' ] );
            },
            ( error ) => {
                console.error( error );
                this.messageService.add( {
                    severity:'error',
                    summary: 'Error',
                    detail: 'El usuario o contraseña son incorrectos o no existen.'
                } );
            }
        );
    }
}
