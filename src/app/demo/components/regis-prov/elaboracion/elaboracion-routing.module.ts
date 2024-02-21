import { NgModule }                     from '@angular/core';

import { ElaboracionComponent }         from './elaboracion.component';
import { RouterModule }                 from '@angular/router';

@NgModule({
    imports: [ RouterModule.forChild( [
        { path: '', component: ElaboracionComponent }
    ] ) ],
    exports: [ RouterModule ],
})
export class ElaboracionRoutingModule { }
