import { NgModule }                     from '@angular/core';
import { CommonModule }                 from '@angular/common';
import { FormsModule }                  from '@angular/forms';

import { SucursalesRoutingModule }      from './sucursales-routing.module';
import { SucursalesComponent }          from './sucursales.component';

import { CardModule }                   from 'primeng/card';
import { InputTextModule }              from 'primeng/inputtext';
import { AutoCompleteModule }           from 'primeng/autocomplete';
import { InputTextareaModule }          from 'primeng/inputtextarea';
import { KeyFilterModule }              from 'primeng/keyfilter';
import { ButtonModule }                 from 'primeng/button';
import { RadioButtonModule }            from 'primeng/radiobutton';
import { TableModule }                  from 'primeng/table';

@NgModule({
    imports: [
        CommonModule,
        SucursalesRoutingModule,
        FormsModule,
        CardModule,
        InputTextModule,
        AutoCompleteModule,
        InputTextareaModule,
        KeyFilterModule,
        ButtonModule,
        RadioButtonModule,
        TableModule
    ],
    declarations: [ SucursalesComponent ],
})
export class SucursalesModule { }
