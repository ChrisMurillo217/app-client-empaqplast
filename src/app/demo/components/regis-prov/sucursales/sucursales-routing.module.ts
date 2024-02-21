import { NgModule }                     from '@angular/core';

import { SucursalesComponent }          from './sucursales.component';
import { RouterModule }                 from '@angular/router';

@NgModule({
    imports: [ RouterModule.forChild( [
        { path: '', component: SucursalesComponent }
    ] ) ],
    exports: [ RouterModule ],
})
export class SucursalesRoutingModule { }
