import { NgModule }                     from '@angular/core';
import { CommonModule }                 from '@angular/common';

import { FacturaComponent }             from './factura.component';
import { DocumentoComponent }           from './documento/documento.component';

import { FacturaRoutingModule }         from './factura-routing.module';

import { TableModule }                  from 'primeng/table';
import { ButtonModule }                 from 'primeng/button';
import { PaginatorModule }              from 'primeng/paginator';
import { DynamicDialogModule }          from 'primeng/dynamicdialog';
import { DialogService }                from 'primeng/dynamicdialog';
import { InputTextModule }              from 'primeng/inputtext';

@NgModule({
	imports: [
		CommonModule,
		FacturaRoutingModule,
		TableModule,
		ButtonModule,
        PaginatorModule,
        DynamicDialogModule,
        InputTextModule,
	],
    providers: [
        DialogService
    ],
	declarations: [
        FacturaComponent,
        DocumentoComponent
    ]
})
export class FacturaModule { }
