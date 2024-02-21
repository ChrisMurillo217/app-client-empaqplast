import { Component }            from '@angular/core';
import { Router }               from '@angular/router';
import { General } from 'src/app/demo/models/general.model';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html'
})
export class GeneralComponent {
    blockSpace:         RegExp = /[^\s]/;
    general:            General[] = [];
    nuevaInfo:          General = {
                            rucP: '',
                            razonSocialP: '',
                            direccionP: '',
                            ciudadP: '',
                            paisP: '',
                            emailP: '',
                            nomRLP: '',
                            paginaWP: '',
                            naturalezaP: '',
                            actividadEconomicaP: ''
                        }

    constructor( private router: Router ){}

    nextPage() {
        this.router.navigate( [ 'registro/datos' ] );
    }

    agregarCampos() {
        if (
            this.nuevaInfo.rucP.trim() !== '' &&
            this.nuevaInfo.razonSocialP.trim() !== '' &&
            this.nuevaInfo.direccionP.trim() !== '' &&
            this.nuevaInfo.ciudadP.trim() !== '' &&
            this.nuevaInfo.paisP.trim() !== '' &&
            this.nuevaInfo.emailP.trim() !== '' &&
            this.nuevaInfo.nomRLP.trim() !== '' &&
            this.nuevaInfo.paginaWP.trim() !== '' &&
            this.nuevaInfo.naturalezaP.trim() !== '' &&
            this.nuevaInfo.actividadEconomicaP.trim() !== ''
        ) {
            this.general.push( { ...this.nuevaInfo } );

            this.nuevaInfo.rucP = '';
            this.nuevaInfo.razonSocialP = '';
            this.nuevaInfo.direccionP = '';
            this.nuevaInfo.ciudadP = '';
            this.nuevaInfo.paisP = '';
            this.nuevaInfo.emailP = '';
            this.nuevaInfo.nomRLP = '';
            this.nuevaInfo.paginaWP = '';
            this.nuevaInfo.naturalezaP = '';
            this.nuevaInfo.actividadEconomicaP = '';
        }
    }
}
