import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FacturaComponent } from './factura.component';

@NgModule( {
	imports: [
        RouterModule.forChild( [
		    { path: '', component: FacturaComponent }
	    ] )
    ],
	exports: [
        RouterModule
    ]
} )
export class FacturaRoutingModule { }
