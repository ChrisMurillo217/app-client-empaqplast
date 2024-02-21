import { NgModule }                     from '@angular/core';

import { GeneralComponent }             from './general.component';
import { RouterModule }                 from '@angular/router';

@NgModule({
    imports: [ RouterModule.forChild( [
        { path: '', component: GeneralComponent }
    ] ) ],
    exports: [ RouterModule ],
})
export class GeneralRoutingModule { }
