import { NgModule }                     from '@angular/core';
import { RouterModule }                 from '@angular/router';

import { ErrorComponent }               from './error.component';

@NgModule( {
    imports: [ RouterModule.forChild( [ // A travez del forChild podemos acceder a las rutas como rutas hijas desde el app-routing
        { path: '', component: ErrorComponent }
    ] ) ],
    exports: [ RouterModule ]
} )
export class ErrorRoutingModule { }
