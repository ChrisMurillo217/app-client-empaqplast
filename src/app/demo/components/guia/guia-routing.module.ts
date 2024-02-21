import { NgModule }                 from '@angular/core';
import { RouterModule }             from '@angular/router';

import { GuiaComponent } from './guia.component';

@NgModule( {
	imports: [
        RouterModule.forChild( [ // A travez del forChild podemos acceder a las rutas como rutas hijas desde el app-routing
		    { path: '', component: GuiaComponent }
	    ] )
    ],
	exports: [
        RouterModule
    ]
} )
export class GuiaRoutingModule { }
