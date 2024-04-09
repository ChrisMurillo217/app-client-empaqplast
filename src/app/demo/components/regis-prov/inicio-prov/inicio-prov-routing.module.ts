import { NgModule }                     from '@angular/core';

import { InicioProvComponent }          from './inicio-prov.component';
import { RouterModule }                 from '@angular/router';

@NgModule( {
    imports: [ RouterModule.forChild( [
        { path: '', component: InicioProvComponent }
    ] ) ],
    exports: [ RouterModule ],
} )
export class InicioProvRoutingModule { }
