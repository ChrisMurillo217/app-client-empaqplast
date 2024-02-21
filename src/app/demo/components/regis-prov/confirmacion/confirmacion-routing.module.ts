import { NgModule }                     from '@angular/core';

import { ConfirmacionComponent }        from './confirmacion.component';
import { RouterModule }                 from '@angular/router';

@NgModule({
    imports: [ RouterModule.forChild( [
        { path: '', component: ConfirmacionComponent }
    ] ) ],
    exports: [ RouterModule ],
})
export class ConfirmacionRoutingModule { }
