import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../service/token.service';
import { Usuarios } from '../../models/usuarios.model';
import { Secciones } from '../../models/secciones.model';

@Component( {
    templateUrl: './dashboard.component.html',
} )
export class DashboardComponent implements OnInit {
    mail            : string;
    password        : string;
    userData        : Usuarios[] = [];

    constructor(
        private tokenService: TokenService
    ) { }

    ngOnInit(): void {
        this.tokenService.getUserData().subscribe(
            ( data ) => {
                this.userData = data;
            }
        );
    }
}
