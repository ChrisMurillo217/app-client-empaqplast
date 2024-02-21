import { NgModule }                     from '@angular/core';
import { CommonModule }                 from '@angular/common';
import { FormsModule }                  from '@angular/forms';

import { ClientesRoutingModule }        from './clientes-routing.module';
import { ClientesComponent }            from './clientes.component';
import { CardModule }                   from 'primeng/card';
import { InputTextModule }              from 'primeng/inputtext';
import { InputMaskModule }              from 'primeng/inputmask';
import { KeyFilterModule }              from 'primeng/keyfilter';
import { AutoCompleteModule }           from 'primeng/autocomplete';
import { ButtonModule }                 from 'primeng/button';

@NgModule({
    imports: [
        CommonModule,
        ClientesRoutingModule,
        FormsModule,
        CardModule,
        InputTextModule,
        InputMaskModule,
        KeyFilterModule,
        AutoCompleteModule,
        ButtonModule,
    ],
    declarations: [ ClientesComponent ],
})
export class ClientesModule { }
