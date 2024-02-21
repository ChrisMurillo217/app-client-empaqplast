import { NgModule }                 from '@angular/core';
import { RouterModule }             from '@angular/router';

import { PersonComponent }          from './person.component';

@NgModule( {
	imports: [
        RouterModule.forChild( [ // A travez del forChild podemos acceder a las rutas como rutas hijas desde el app-routing
		    { path: '', component: PersonComponent }
	    ] )
    ],
	exports: [
        RouterModule
    ]
} )
export class PersonRoutingModule { }
