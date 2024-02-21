import { NgModule }                     from '@angular/core';

import { ClientesComponent }            from './clientes.component';
import { RouterModule }                 from '@angular/router';

@NgModule({
    imports: [ RouterModule.forChild( [
        { path: '', component: ClientesComponent }
    ] ) ],
    exports: [ RouterModule ],
})
export class ClientesRoutingModule { }
