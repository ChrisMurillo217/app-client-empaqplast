import { NgModule }                     from '@angular/core';

import { CertificacionesComponent }     from './certificaciones.component';
import { RouterModule }                 from '@angular/router';

@NgModule({
    imports: [ RouterModule.forChild( [
        { path: '', component: CertificacionesComponent }
    ] ) ],
    exports: [ RouterModule ],
})
export class CertificacionesRoutingModule { }
