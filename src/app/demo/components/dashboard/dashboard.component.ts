import { Component, OnInit }                from '@angular/core';

import { TokenService }                     from '../../service/token.service';

import { Usuarios }                         from '../../models/usuarios.model';

@Component( {
    templateUrl: './dashboard.component.html',
} )
export class DashboardComponent implements OnInit {
    userData        : Usuarios[] = [];

    constructor(
        private tokenService: TokenService
    ) { }

    ngOnInit(): void {
        this.tokenService.getUserData().subscribe( // Trae la información del usuario que se logeo desde la funcion getUserData que esta en el servicio tokenService
            ( data ) => {
                this.userData = data;
            }
        );
    }
}
