import { NgModule }                 from '@angular/core';
import { RouterModule }             from '@angular/router';

import { FacturaComponent }         from './factura.component';

@NgModule( {
	imports: [
        RouterModule.forChild( [ // A travez del forChild podemos acceder a las rutas como rutas hijas desde el app-routing
		    { path: '', component: FacturaComponent }
	    ] )
    ],
	exports: [
        RouterModule
    ]
} )
export class FacturaRoutingModule { }
