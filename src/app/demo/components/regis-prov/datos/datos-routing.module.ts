import { NgModule }                     from '@angular/core';

import { DatosComponent }               from './datos.component';
import { RouterModule }                 from '@angular/router';

@NgModule({
    imports: [ RouterModule.forChild( [
        { path: '', component: DatosComponent }
    ] ) ],
    exports: [ RouterModule ],
})
export class DatosRoutingModule { }
