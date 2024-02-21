import { NgModule }                     from '@angular/core';
import { RouterModule }                 from '@angular/router';

import { DashboardComponent }           from './dashboard.component';

@NgModule( {
    imports: [ RouterModule.forChild( [ // A travez del forChild podemos acceder a las rutas como rutas hijas desde el app-routing
        { path: '', component: DashboardComponent }
    ] ) ],
    exports: [ RouterModule ]
} )
export class DashboardsRoutingModule { }
