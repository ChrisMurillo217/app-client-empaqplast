import { NgModule }                         from '@angular/core';
import { RouterModule }                     from '@angular/router';

import { TrackingListComponent }            from './tracking-list.component';

@NgModule( {
	imports: [
        RouterModule.forChild( [ // A travez del forChild podemos acceder a las rutas como rutas hijas desde el app-routing
		    { path: '', component: TrackingListComponent }
	    ] )
    ],
	exports: [
        RouterModule
    ]
} )
export class TrackingListRoutingModule { }
