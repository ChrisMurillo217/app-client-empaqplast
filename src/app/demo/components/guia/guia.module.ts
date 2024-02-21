import { NgModule }                     from '@angular/core';
import { CommonModule }                 from '@angular/common';

import { GuiaComponent }                from './guia.component';

import { GuiaRoutingModule }         from './guia-routing.module';

import { TableModule }                  from 'primeng/table';
import { ButtonModule }                 from 'primeng/button';
import { PaginatorModule }              from 'primeng/paginator';
import { DynamicDialogModule }          from 'primeng/dynamicdialog';
import { DialogService }                from 'primeng/dynamicdialog';
import { InputTextModule }              from 'primeng/inputtext';

@NgModule({
    imports: [
		CommonModule,
		GuiaRoutingModule,
		TableModule,
		ButtonModule,
        PaginatorModule,
        DynamicDialogModule,
        InputTextModule,
    ],
    declarations: [
        GuiaComponent
    ],
    providers: [
        DialogService
    ],
})
export class GuiaModule { }

