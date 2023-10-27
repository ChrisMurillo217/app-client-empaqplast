import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { AuthService } from '../demo/service/auth.service';
import { TokenService } from '../demo/service/token.service';

@Component( {
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
} )
export class AppTopBarComponent implements OnInit {
    showMenu: boolean = true;
    tieredItems: MenuItem[] = [];
    items!: MenuItem[];

    @ViewChild( 'menubutton' ) menuButton!: ElementRef;
    @ViewChild( 'topbarmenubutton' ) topbarMenuButton!: ElementRef;
    @ViewChild( 'topbarmenu' ) menu!: ElementRef;

    constructor(
        public layoutService: LayoutService,
        private router: Router,
        private tokenService: TokenService
    ) { }

    ngOnInit() {
        this.tieredItems = [
            {
                label: 'Usuario',
                icon: 'pi pi-user',
                items: [
                    {
                        label: 'Configuraciónes',
                        icon: 'pi pi-fw pi-cog'
                    },
                ]
            }
        ];
    }

    logout() {
        this.tokenService.clearToken();
        this.router.navigate( [ '/auth/login' ] );
    }

    toggleMenu() {
        this.showMenu = !this.showMenu;
    }
}
