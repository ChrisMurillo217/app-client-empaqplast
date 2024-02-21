import { NgModule }                     from '@angular/core';
import { CommonModule }                 from '@angular/common';
import { FormsModule }                  from '@angular/forms';

import { DatosRoutingModule }           from './datos-routing.module';
import { DatosComponent }               from './datos.component';

import { KeyFilterModule }              from 'primeng/keyfilter';
import { AutoCompleteModule }           from 'primeng/autocomplete';
import { InputMaskModule }              from 'primeng/inputmask';
import { InputTextModule }              from 'primeng/inputtext';
import { InputTextareaModule }          from 'primeng/inputtextarea';
import { CardModule }                   from 'primeng/card';
import { ButtonModule }                 from 'primeng/button';

@NgModule({
    imports: [
        CommonModule,
        DatosRoutingModule,
        FormsModule,
        CardModule,
        KeyFilterModule,
        AutoCompleteModule,
        InputMaskModule,
        InputTextModule,
        InputTextareaModule,
        ButtonModule,
    ],
    declarations: [ DatosComponent ],
})
export class DatosModule { }
