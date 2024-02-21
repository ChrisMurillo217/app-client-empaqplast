import { NgModule }                     from '@angular/core';
import { RouterModule }                 from '@angular/router';

import { AccessComponent }              from './access.component';

@NgModule( {
    imports: [ RouterModule.forChild( [ // A travez del forChild podemos acceder a las rutas como rutas hijas desde el app-routing
        { path: '', component: AccessComponent }
    ] ) ],
    exports: [ RouterModule ]
} )
export class AccessRoutingModule { }
