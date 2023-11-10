import { NgModule }                     from '@angular/core';
import { CommonModule }                 from '@angular/common';

import { ButtonModule }                 from 'primeng/button';

import { ErrorRoutingModule }           from './error-routing.module';

import { ErrorComponent }               from './error.component';

@NgModule( {
    imports: [
        CommonModule,
        ErrorRoutingModule,
        ButtonModule
    ],
    declarations: [ ErrorComponent ]
} )
export class ErrorModule { }
