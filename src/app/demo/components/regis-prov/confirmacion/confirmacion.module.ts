import { NgModule }                     from '@angular/core';
import { CommonModule }                 from '@angular/common';
import { FormsModule }                  from '@angular/forms';

import { ConfirmacionRoutingModule }    from './confirmacion-routing.module';
import { ConfirmacionComponent }        from './confirmacion.component';

import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';

@NgModule({
    imports: [
        CommonModule,
        ConfirmacionRoutingModule,
        FormsModule,
        CardModule,
        ButtonModule
    ],
    declarations: [ ConfirmacionComponent ],
})
export class ConfirmacionModule { }
