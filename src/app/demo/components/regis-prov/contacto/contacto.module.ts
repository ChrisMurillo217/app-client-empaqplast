import { NgModule }                     from '@angular/core';
import { CommonModule }                 from '@angular/common';
import { FormsModule }                  from '@angular/forms';

import { ContactoRoutingModule }        from './contacto-routing.module';
import { ContactoComponent }            from './contacto.component';

import { CardModule }                   from 'primeng/card';
import { InputTextModule }              from 'primeng/inputtext';
import { InputMaskModule }              from 'primeng/inputmask';
import { KeyFilterModule }              from 'primeng/keyfilter';
import { ButtonModule }                 from 'primeng/button';

@NgModule({
    imports: [
        CommonModule,
        ContactoRoutingModule,
        FormsModule,
        CardModule,
        InputTextModule,
        InputMaskModule,
        KeyFilterModule,
        ButtonModule,
    ],
    declarations: [ ContactoComponent ],
})
export class ContactoModule { }
