import { NgModule }                     from '@angular/core';
import { RouterModule }                 from '@angular/router';

import { StockComponent }               from './stock.component';

@NgModule( {
	imports: [
        RouterModule.forChild( [ // A travez del forChild podemos acceder a las rutas como rutas hijas desde el app-routing
		    { path: '', component: StockComponent }
	    ] )
    ],
	exports: [
        RouterModule
    ]
} )
export class StockRoutingModule { }
