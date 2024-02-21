import { NgModule }                     from '@angular/core';
import { RouterModule }                 from '@angular/router';

import { LoginComponent }               from './login.component';

@NgModule( {
    imports: [ RouterModule.forChild( [ // A travez del forChild podemos acceder a las rutas como rutas hijas desde el app-routing
        { path: '', component: LoginComponent }
    ] ) ],
    exports: [ RouterModule ]
} )
export class LoginRoutingModule { }
