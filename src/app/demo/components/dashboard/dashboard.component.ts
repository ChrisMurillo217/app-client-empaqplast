import { Component, OnInit }                from '@angular/core';

import { TokenService }                     from '../../service/token.service';

import { Usuarios }                         from '../../models/admin/usuarios.model';

@Component( {
    templateUrl: './dashboard.component.html',
} )
export class DashboardComponent implements OnInit {
    userData        : Usuarios[] = [];
    model           : any[] = [];

    constructor(
        private tokenService: TokenService
    ) { }

    ngOnInit(): void {
        this.tokenService.getUserData().subscribe( // Trae la información del usuario que se logeo desde la funcion getUserData que esta en el servicio tokenService
            ( data ) => {
                this.userData = data;

                // En sortedData se esta almacenando el vector con las secciones ordenadas alfabéticamente
                const sortedData = data[0].seccionPagina.sort( ( a, b ) => a.idSeccion - b.idSeccion );

                sortedData.forEach(
                    (seccionPagina) => {
                        const seccionLabel = seccionPagina.nombreSeccion;
                        const paginaLabel = seccionPagina.nombrePagina;
                        const iconLabel = seccionPagina.icon;
                        const descripcionPagina = seccionPagina.descripcionPagina;

                        // Buscamos si ya existe una sección con el mismo nombre
                        const existingSeccion = this.model.find(
                            (item) =>
                                item.label === seccionLabel
                        );

                        // Si no existe una sección con este nombre, la creamos
                        if (!existingSeccion) {
                            this.model.push({
                                label: seccionLabel,
                                items: [],
                            });
                        }

                        // Añadimos la página a la sección correspondiente
                        this.model.find(
                            (item) =>
                                item.label === seccionLabel
                        ).items.push({
                            label: paginaLabel,
                            icon: iconLabel,
                            descripcionPagina: descripcionPagina,
                        });
                    }
                );
            }
        );
    }
}
