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
                    {
                        label: 'Dashboard',
                        icon: 'pi pi-fw pi-home',
                        routerLink: [ '/dashboard' ]
                    },
                    {
                        label: 'Tracking',
                        icon: 'pi pi-fw pi-table',
                        routerLink: [ '/tracking-list']
                    },
                    {
                        label: 'Documentos',
                        icon: 'pi pi-fw pi-file',
                        routerLink: [ '/documentos']
                    },
                    // {
                    //     label: 'Stock',
                    //     icon: 'pi pi-fw pi-shopping-cart',
                    //     routerLink: [ '/stock']
                    // }
                ]
            }
        ];
    }
}
