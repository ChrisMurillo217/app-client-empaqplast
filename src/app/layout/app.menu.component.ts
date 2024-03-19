import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { TokenService } from '../demo/service/token.service';
import { Usuarios } from '../demo/models/admin/usuarios.model';

@Component( {
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
} )
export class AppMenuComponent implements OnInit {
    userData:           Usuarios[] = [];
    model:              any[] = [];

    constructor(
        public layoutService: LayoutService,
        private tokenService: TokenService
    ) { }

    ngOnInit() {
        this.tokenService.getUserData().subscribe(
            ( data ) => {
                const sortedData = data[0].seccionPagina.sort( ( a, b ) => a.idSeccion - b.idSeccion );

                sortedData.forEach((seccionPagina) => {
                    const seccionLabel = seccionPagina.nombreSeccion;
                    const paginaLabel = seccionPagina.nombrePagina;
                    const iconLabel = seccionPagina.icon;

                    // Buscamos si ya existe una sección con el mismo nombre
                    const existingSeccion = this.model.find((item) => item.label === seccionLabel);

                    // Si no existe una sección con este nombre, la creamos
                    if (!existingSeccion) {
                        this.model.push({
                            label: seccionLabel,
                            items: [],
                        });
                    }

                    // Añadimos la página a la sección correspondiente
                    this.model.find((item) => item.label === seccionLabel).items.push({
                        label: paginaLabel,
                        icon: iconLabel, // Agrega el icono que corresponda
                        routerLink: [paginaLabel.toLowerCase()], // Agrega el enlace de router que corresponda
                    });
                });
            }
        );

    }
}
