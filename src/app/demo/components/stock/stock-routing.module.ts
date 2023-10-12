import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StockComponent } from './stock.component';

@NgModule( {
	imports: [
        RouterModule.forChild( [
		    { path: '', component: StockComponent }
	    ] )
    ],
	exports: [
        RouterModule
    ]
} )
export class StockRoutingModule { }
