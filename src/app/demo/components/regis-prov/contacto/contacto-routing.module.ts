import { NgModule }                     from '@angular/core';

import { ContactoComponent }            from './contacto.component';
import { RouterModule }                 from '@angular/router';

@NgModule({
    imports: [ RouterModule.forChild( [
        { path: '', component: ContactoComponent }
    ] ) ],
    exports: [ RouterModule ],
})
export class ContactoRoutingModule { }
