import { NgModule }                     from '@angular/core';
import { CommonModule }                 from '@angular/common';
import { FormsModule }                  from '@angular/forms';

import { CertificacionesRoutingModule } from './certificaciones-routing.module';
import { CertificacionesComponent }     from './certificaciones.component';

import { CardModule }                   from 'primeng/card';
import { RadioButtonModule }            from 'primeng/radiobutton';
import { InputTextModule }              from 'primeng/inputtext';
import { CalendarModule }               from 'primeng/calendar';
import { InputTextareaModule }          from 'primeng/inputtextarea';
import { ButtonModule }                 from 'primeng/button';

@NgModule({
    imports: [
        CommonModule,
        CertificacionesRoutingModule,
        FormsModule,
        CardModule,
        RadioButtonModule,
        InputTextModule,
        CalendarModule,
        InputTextareaModule,
        ButtonModule,
    ],
    declarations: [ CertificacionesComponent ],
})
export class CertificacionesModule { }
