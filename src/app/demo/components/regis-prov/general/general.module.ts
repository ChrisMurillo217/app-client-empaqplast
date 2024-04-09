import { NgModule }                     from '@angular/core';
import { CommonModule }                 from '@angular/common';
import { FormsModule }                  from '@angular/forms';

import { GeneralRoutingModule }         from './general-routing.module';
import { GeneralComponent }             from './general.component';

import { KeyFilterModule }              from 'primeng/keyfilter';
import { AutoCompleteModule }           from 'primeng/autocomplete';
import { InputMaskModule }              from 'primeng/inputmask';
import { InputTextModule }              from 'primeng/inputtext';
import { InputTextareaModule }          from 'primeng/inputtextarea';
import { CardModule }                   from 'primeng/card';
import { ButtonModule }                 from 'primeng/button';
import { RadioButtonModule }            from 'primeng/radiobutton';

@NgModule( {
    imports: [
        CommonModule,
        GeneralRoutingModule,
        FormsModule,
        KeyFilterModule,
        AutoCompleteModule,
        InputMaskModule,
        InputTextModule,
        InputTextareaModule,
        CardModule,
        ButtonModule,
        RadioButtonModule,
    ],
    declarations: [ GeneralComponent ],
} )
export class GeneralModule { }
