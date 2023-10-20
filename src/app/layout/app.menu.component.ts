import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { UserDataService } from '../demo/service/user-data.service';
import { Usuarios } from '../demo/models/usuarios.model';

@Component( {
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
} )
export class AppMenuComponent implements OnInit {
    userData:           Usuarios[] = [];
    model:              any[] = [];
    model1:              any[] = [];

    constructor(
        public layoutService: LayoutService,
        private userDataService: UserDataService
    ) { }

    ngOnInit() {
        this.userDataService.getUserData().subscribe(
            ( data ) => {
                data[0].seccionPagina.forEach((seccionPagina) => {
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
