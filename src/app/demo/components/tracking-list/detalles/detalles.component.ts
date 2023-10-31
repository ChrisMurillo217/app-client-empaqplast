import { Component, OnInit }                        from '@angular/core';

import { DynamicDialogRef }                         from 'primeng/dynamicdialog';
import { DynamicDialogConfig }                        from 'primeng/dynamicdialog';

import { TrackingService }                          from './../../../service/tracking.service';
import { TokenService }                             from './../../../service/token.service';

import { Items }                                    from './../../../models/item.model';
import { Usuarios }                                 from './../../../models/usuarios.model';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {
    userData:           Usuarios[] = [];
    cardCode:           string = '';
    docNum:             number = 0;
    items:              Items[] = [];
    detailsLoaded:      boolean = false;

    constructor(
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig,
        private trackingService: TrackingService,
        private tokenService: TokenService
    ) {}

    ngOnInit(): void {
        this.docNum = this.config.data.docNum;

        this.tokenService.getUserData().subscribe(
            ( data ) => {
                this.userData = data;
                this.cardCode = this.userData[0].datosLogin.cardCode;
            }
        );

        this.trackingService.getPedidosByDocNum( this.cardCode, this.docNum ).subscribe(
            ( data ) => {
                this.items = data[0].items;
                this.detailsLoaded = true;
            },
            ( error ) => {
                console.error( error );
            }
        );
    }

}
