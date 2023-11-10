import { Component }                        from '@angular/core';
import { Router }                           from '@angular/router';

import { MessageService }                   from 'primeng/api';

import { AuthService }                      from '../../../service/auth.service';
import { TokenService }                     from '../../../service/token.service';

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
    // Variables donde se van a almacenar tanto el correo como la contraseña del usuario
    mail            : string;
    password        : string;

    constructor(
        private authService: AuthService,
        private router: Router,
        private messageService: MessageService,
        private tokenService: TokenService
    ) { }

    login() {
        this.authService.getLogin( this.mail, this.password ).subscribe( // Función que se conecta al servicio para iniciar sesión
            ( data ) => {
                this.tokenService.setToken( data[0].datosLogin.token ); // Envia el token hacia el servicio donde se lo manejará en el resto de la aplicación
                this.tokenService.setUserData( data ); // Envia la información del usuario al servicio para poder realizar las diferentes consultas
                this.router.navigate( [ '/panel' ] ); // Permite que nos redirija hacia la pagina seleccionada
            },
            ( error ) => {
                console.error( error );
                this.messageService.add( { // Función para enviar una alerta un mensaje en color rojo donde nos informa que son incorrectas las credenciales
                    severity:'error',
                    summary: 'Error',
                    detail: 'El usuario o contraseña son incorrectos o no existen.'
                } );
            }
        );
    }
}
