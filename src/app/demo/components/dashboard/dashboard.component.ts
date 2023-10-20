import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../../service/user-data.service';
import { Usuarios } from '../../models/usuarios.model';

@Component( {
    templateUrl: './dashboard.component.html',
} )
export class DashboardComponent implements OnInit {
    mail            : string;
    password        : string;
    userData        : Usuarios[] = [];

    constructor(
        private userDataService: UserDataService
    ) { }

    ngOnInit(): void {
        this.userDataService.getUserData().subscribe(
            ( data ) => {
                this.userData = data;
            }
        );
    }
}
