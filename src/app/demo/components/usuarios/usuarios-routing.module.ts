import { NgModule }                     from '@angular/core';
import { RouterModule }                 from '@angular/router';

import { UsuariosComponent }            from './usuarios.component';

@NgModule( {
	imports: [
        RouterModule.forChild( [ // A travez del forChild podemos acceder a las rutas como rutas hijas desde el app-routing
		    { path: '', component: UsuariosComponent }
	    ] )
    ],
	exports: [
        RouterModule
    ]
} )
export class UsuariosRoutingModule { }
