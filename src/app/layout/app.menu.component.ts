import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component( {
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
} )
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor( public layoutService: LayoutService ) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Inicio',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: [ '/dashboard' ] }
                ]
            },
            {
                label: 'Cliente',
                items: [
                    {
                        label: 'Tracking',
                        icon: 'pi pi-fw pi-table',
                        routerLink: [ '/tracking-list']
                    },
                    {
                        label: 'Facturas',
                        icon: 'pi pi-fw pi-file',
                        routerLink: [ '/factura']
                    },
                    {
                        label: 'Stock',
                        icon: 'pi pi-fw pi-shopping-cart',
                        routerLink: [ '/stock']
                    }
                ]
            },
            {
                label: 'Paginas',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    {
                        label: 'Autenticación',
                        icon: 'pi pi-fw pi-user',
                        items: [
                            {
                                label: 'Login',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: [ '/auth/login' ]
                            },
                            {
                                label: 'Error',
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: [ '/auth/error' ]
                            },
                            {
                                label: 'Access Denied',
                                icon: 'pi pi-fw pi-lock',
                                routerLink: [ '/auth/access' ]
                            }
                        ]
                    },
                ]
            }
        ];
    }
}
