import { NgModule }                     from '@angular/core';
import { CommonModule }                 from '@angular/common';
import { FormsModule }                  from '@angular/forms';

import { TerminosRoutingModule }        from './terminos-routing.module';
import { TerminosComponent }            from './terminos.component';

import { CardModule }                   from 'primeng/card';
import { SelectButtonModule }           from 'primeng/selectbutton';
import { ButtonModule }                 from 'primeng/button';

@NgModule({
    imports: [
        CommonModule,
        TerminosRoutingModule,
        FormsModule,
        CardModule,
        SelectButtonModule,
        ButtonModule
    ],
    declarations: [ TerminosComponent ],
})
export class TerminosModule { }
