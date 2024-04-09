import { NgModule }                     from '@angular/core';
import { CommonModule }                 from '@angular/common';

import { ProveedoresComponent }         from './proveedores.component';
import { ProveedoresRoutingModule }     from "./proveedores-routing.module";

import { TableModule }                  from 'primeng/table';
import { ButtonModule }                 from 'primeng/button';
import { InputTextModule }              from 'primeng/inputtext';

@NgModule( {
    imports: [
        CommonModule,
        ProveedoresRoutingModule,
        TableModule,
        ButtonModule,
        InputTextModule
    ],
    declarations: [
        ProveedoresComponent
    ],
} )
export class ProveedoresModule { }
