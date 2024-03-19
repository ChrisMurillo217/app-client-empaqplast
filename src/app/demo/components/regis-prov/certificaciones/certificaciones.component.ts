import { Component, OnInit }            from '@angular/core';
import { Router }                       from '@angular/router';

import { Certificaciones, Tipo, Norma } from 'src/app/demo/models/proveedores/certificaciones.model';

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
    normaCertP:                 Norma;
    certificaciones:            Certificaciones[] = [];
    nuevoCertificacion:         Certificaciones = {
                                    tipoCertP: '',
                                    normaCertP: '',
                                    nombreCertP: '',
                                    fechaVigenciCertP: new Date(),
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
        const storedData = JSON.parse( localStorage.getItem( 'certificacionData' ) );
        const cerData = JSON.parse( localStorage.getItem( 'agregarCertificaciones' ) );
        if ( storedData ) {
            this.certificaciones = storedData;
        }
        if ( cerData ) {
            this.agregarCertificaciones = cerData;
        }
    }

    nextPage() {
        this.router.navigate( [ 'registro/clientes' ] );
    }

    prevPage() {
        this.router.navigate( [ 'registro/contacto' ] );
    }

    agregarCampos() {
        // Verificar si los campos están llenos
        this.nuevoCertificacion.normaCertP = this.normaCertP.normaCertificacion;
        if (
            this.nuevoCertificacion.tipoCertP.trim() !== '' &&
            this.nuevoCertificacion.normaCertP.trim() !== '' &&
            this.nuevoCertificacion.nombreCertP.trim() !== '' &&
            this.nuevoCertificacion.obsCertP.trim() !== ''
        ) {
            // Agregar la nueva certificación al vector
            this.certificaciones.push( { ...this.nuevoCertificacion } );

            localStorage.setItem( 'agregarCertificaciones', JSON.stringify( this.agregarCertificaciones ) );
            localStorage.setItem( 'certificacionData', JSON.stringify( this.certificaciones ) );

            // Vaciar los campos de entrada
            this.nuevoCertificacion.tipoCertP = '';
            this.nuevoCertificacion.normaCertP = '';
            this.nuevoCertificacion.nombreCertP = '';
            this.nuevoCertificacion.fechaVigenciCertP = null;
            this.nuevoCertificacion.obsCertP = '';
        }
    }

    filterNorm( event: any ) {
        let filtered: any[] = [];
        let query = event.query;

        for( let i = 0; i < this.norma.length; i++ ) {
            let norm = this.norma[i];
            if ( norm.normaCertificacion.toLowerCase().indexOf( query.toLowerCase() ) == 0 ) {
                filtered.push( norm );
            }
        }

        this.filteredNorms = filtered;
    }
}
