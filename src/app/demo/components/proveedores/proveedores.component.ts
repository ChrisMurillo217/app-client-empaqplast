import { Component, OnInit, ViewChild, ElementRef }         from '@angular/core';

import { Proveedor }                                        from '../../models/proveedores/proveedor.model';
import { ProveedorService }                                 from '../../service/proveedores/proveedores.service';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {
    dataLoaded:             boolean = false;
    datos:                  Proveedor[] = [];
    pagina:                 number = 1;
    elemento:               number = 10;

    @ViewChild( 'filter' ) filter!: ElementRef;

    constructor (
        private proveedorService: ProveedorService
    ) {}

    ngOnInit(): void {
        this.proveedorService.getProveedores( this.pagina, this.elemento ).subscribe(
            ( data ) => {
                this.pagina = data.totalPages;
                this.elemento = data.totalReg;
                this.proveedorService.getProveedores( this.pagina, this.elemento ).subscribe(
                    ( data ) => {
                        this.datos = data.resultado
                        this.dataLoaded = true;
                    },
                    ( error ) => {
                        console.error( error );
                    }
                )
            },
            ( error ) => {
                console.error( error );
            }
        )
    }

}
