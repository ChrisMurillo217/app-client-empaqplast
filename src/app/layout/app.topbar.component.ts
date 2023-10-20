import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { AuthService } from '../demo/service/auth.service';

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
        private authService: AuthService,
        private router: Router
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
                    {
                        separator: true
                    },
                    {
                        label: 'Cerrar Sesión',
                        icon: 'pi pi-fw pi-sign-out',
                        command: () => {
                            this.logout()
                        }
                    }
                ]
            }
        ];
    }

    logout() {
        this.authService.logout();
        this.router.navigate( [ '/auth/login' ] );
    }

    toggleMenu() {
        this.showMenu = !this.showMenu;
    }
}
