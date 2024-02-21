import { Component, OnInit }            from '@angular/core';

import { MenuItem }                     from 'primeng/api';

@Component({
  selector: 'app-regis-prov',
  templateUrl: './regis-prov.component.html'
})
export class RegisProvComponent implements OnInit {
    items: MenuItem[];

    constructor() {}

    ngOnInit() {
        this.items = [
            {
                label: 'General',
                routerLink: 'general'
            },
            {
                label: 'Datos Financieros',
                routerLink: 'datos'
            },
            {
                label: 'Sucursales',
                routerLink: 'sucursales'
            },
            {
                label: 'Contacto',
                routerLink: 'contacto'
            },
            {
                label: 'Certificaciones',
                routerLink: 'certificaciones'
            },
            {
                label: 'Clientes',
                routerLink: 'clientes'
            },
            {
                label: 'Terminos',
                routerLink: 'terminos'
            },
            {
                label: 'Elaboración',
                routerLink: 'elaboracion'
            },
            {
                label: 'Confirmación',
                routerLink: 'confirmacion'
            },
        ];
    }
}
