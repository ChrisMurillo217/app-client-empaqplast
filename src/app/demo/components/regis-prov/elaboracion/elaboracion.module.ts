import { NgModule }                     from '@angular/core';
import { CommonModule }                 from '@angular/common';
import { FormsModule }                  from '@angular/forms';

import { ElaboracionRoutingModule }     from './elaboracion-routing.module';
import { ElaboracionComponent }         from './elaboracion.component';

import { CardModule }                   from 'primeng/card';
import { ButtonModule }                 from 'primeng/button';
import { InputTextModule }              from 'primeng/inputtext';

@NgModule({
    imports: [
        CommonModule,
        ElaboracionRoutingModule,
        FormsModule,
        CardModule,
        ButtonModule,
        InputTextModule
    ],
    declarations: [ ElaboracionComponent ],
})
export class ElaboracionModule { }
