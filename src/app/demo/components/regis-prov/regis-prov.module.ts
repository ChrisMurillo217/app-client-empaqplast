import { NgModule }                         from '@angular/core';
import { CommonModule }                     from '@angular/common';
import { FormsModule }                      from '@angular/forms';
import { RouterModule }                     from '@angular/router';
import { BrowserModule }                    from '@angular/platform-browser';

import { RegisProvComponent }               from './regis-prov.component';

import { StepsModule }                      from 'primeng/steps';

@NgModule( {
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule,
        FormsModule,
        StepsModule,
    ],
    declarations: [
        RegisProvComponent,
    ],
    exports: [ RegisProvComponent ]
})
export class RegisProvModule { }
