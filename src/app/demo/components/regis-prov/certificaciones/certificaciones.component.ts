import { Component }                from '@angular/core';
import { Router }                   from '@angular/router';
import { Certificaciones }          from 'src/app/demo/models/certificaciones.model';

@Component( {
  selector: 'app-certificaciones',
  templateUrl: './certificaciones.component.html'
} )
export class CertificacionesComponent {
    agregarCertificaciones:     string = '';
    certificaciones:            Certificaciones[] = [];
    nuevoCertificacion:         Certificaciones = {
                                    tipoCertP: '',
                                    normaCertP: '',
                                    nombreCertP: '',
                                    fechaVigenciCertP: new Date(2024, 0, 1),
                                    obsCertP: ''
                                };

    constructor( private router: Router ){}

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
}
