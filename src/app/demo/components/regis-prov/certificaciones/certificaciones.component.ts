import { Component, OnInit }            from '@angular/core';
import { Router }                       from '@angular/router';

import { Certificaciones, Tipo, Norma } from 'src/app/demo/models/certificaciones.model';

import { CertificacionesService }       from 'src/app/demo/service/proveedores/certificaciones.service';

@Component( {
  selector: 'app-certificaciones',
  templateUrl: './certificaciones.component.html'
} )
export class CertificacionesComponent implements OnInit {
    agregarCertificaciones:     string = '';
    filteredNorms:              any[];
    tipo:                       Tipo[] = [];
    norma:                      Norma[] = [];
    certificaciones:            Certificaciones[] = [];
    nuevoCertificacion:         Certificaciones = {
                                    tipoCertP: '',
                                    normaCertP: '',
                                    nombreCertP: '',
                                    fechaVigenciCertP: new Date(2024, 0, 1),
                                    obsCertP: ''
                                };

    constructor(
        private router: Router,
        private certificacionesService: CertificacionesService
    ) {}

    ngOnInit(): void {
        this.certificacionesService.getTipo().subscribe(
            ( data ) => {
                this.tipo = data.resultado;
            }
        )
        this.certificacionesService.getNorma().subscribe(
            ( data ) => {
                this.norma = data.resultado;
            }
        )
    }

    nextPage() {
        this.router.navigate( [ 'registro/clientes' ] );
    }

    prevPage() {
        this.router.navigate( [ 'registro/contacto' ] );
    }

    agregarCampos() {
        // Verificar si los campos están llenos
        if (
            this.nuevoCertificacion.tipoCertP.trim() !== '' &&
            this.nuevoCertificacion.normaCertP.trim() !== '' &&
            this.nuevoCertificacion.nombreCertP.trim() !== '' &&
            this.nuevoCertificacion.obsCertP.trim() !== ''
        ) {
            // Agregar la nueva sucursal al vector
            this.certificaciones.push( { ...this.nuevoCertificacion } );

            // Vaciar los campos de entrada
            this.nuevoCertificacion.tipoCertP = '';
            this.nuevoCertificacion.normaCertP = '';
            this.nuevoCertificacion.nombreCertP = '';
            this.nuevoCertificacion.fechaVigenciCertP = null;
            this.nuevoCertificacion.obsCertP = '';
        }
    }

    filterNorm(event) {
        //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
        let filtered : any[] = [];
        let query = event.query;

        for(let i = 0; i < this.norma.length; i++) {
            let norm = this.norma[i];
            if (norm.normaCertificacion.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(norm);
            }
        }

        this.filteredNorms = filtered;
    }
}
