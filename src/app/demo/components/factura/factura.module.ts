import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FacturaComponent } from './factura.component';
import { FacturaRoutingModule } from './factura-routing.module';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { PaginatorModule } from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog';

@NgModule({
	imports: [
		CommonModule,
		FacturaRoutingModule,
		FormsModule,
		TableModule,
		ButtonModule,
		InputTextModule,
		ToastModule,
        PaginatorModule,
        DialogModule
	],
	declarations: [
        FacturaComponent
    ]
})
export class FacturaModule { }
