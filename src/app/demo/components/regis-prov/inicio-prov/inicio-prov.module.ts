import { NgModule }                     from '@angular/core';
import { CommonModule }                 from '@angular/common';
import { FormsModule }                  from '@angular/forms';

import { InicioProvRoutingModule }      from './inicio-prov-routing.module';
import { InicioProvComponent }          from './inicio-prov.component';

import { ImageModule }                  from 'primeng/image';
import { CardModule }                   from 'primeng/card';
import { ButtonModule }                 from 'primeng/button';

@NgModule( {
    imports: [
        CommonModule,
        FormsModule,
        InicioProvRoutingModule,
        ImageModule,
        CardModule,
        ButtonModule,
    ],
    declarations: [InicioProvComponent],
} )
export class InicioProvModule { }
