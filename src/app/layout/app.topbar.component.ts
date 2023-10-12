import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";

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

    constructor( public layoutService: LayoutService ) { }

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
                        routerLink: [ '/auth/login' ]
                    }
                ]
            }
        ];
    }

    toggleMenu() {
        this.showMenu = !this.showMenu;
    }
}
