import { NgModule }                         from '@angular/core';
import { CommonModule }                     from '@angular/common';
import { FormsModule }                      from '@angular/forms';

import { StockComponent }                   from './stock.component';
import { StockRoutingModule }               from './stock-routing.module';

import { TableModule }                      from 'primeng/table';
import { ButtonModule }                     from 'primeng/button';
import { PaginatorModule }                  from 'primeng/paginator';
import { InputTextModule }                  from 'primeng/inputtext';

@NgModule({
	imports: [
		CommonModule,
		StockRoutingModule,
		FormsModule,
		TableModule,
		ButtonModule,
        PaginatorModule,
        InputTextModule,
	],
	declarations: [
        StockComponent
    ]
})
export class StockModule { }
