import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TrackingListComponent } from './tracking-list.component';

@NgModule( {
	imports: [
        RouterModule.forChild( [
		    { path: '', component: TrackingListComponent }
	    ] )
    ],
	exports: [
        RouterModule
    ]
} )
export class TrackingListRoutingModule { }
