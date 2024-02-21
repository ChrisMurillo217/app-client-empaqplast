import { NgModule }                     from '@angular/core';

import { TerminosComponent }            from './terminos.component';
import { RouterModule }                 from '@angular/router';

@NgModule({
    imports: [ RouterModule.forChild( [
        { path: '', component: TerminosComponent }
    ] ) ],
    exports: [ RouterModule ],
})
export class TerminosRoutingModule { }
