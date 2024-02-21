import { NgModule }                 from '@angular/core';
import { RouterModule }             from '@angular/router';

import { RolComponent }             from './rol.component';

@NgModule( {
	imports: [
        RouterModule.forChild( [ // A travez del forChild podemos acceder a las rutas como rutas hijas desde el app-routing
		    { path: '', component: RolComponent }
	    ] )
    ],
	exports: [
        RouterModule
    ]
} )
export class RolRoutingModule { }
