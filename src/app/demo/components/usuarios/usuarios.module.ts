import { NgModule }                     from '@angular/core';
import { CommonModule }                 from '@angular/common';
import { FormsModule }                  from '@angular/forms';

import { UsuariosComponent }            from './usuarios.component';

import { UsuariosRoutingModule }        from './usuarios-routing.module';

import { TableModule }                  from 'primeng/table';
import { ButtonModule }                 from 'primeng/button';
import { PasswordModule }               from 'primeng/password';
import { ConfirmDialogModule }          from 'primeng/confirmdialog';
import { InputTextModule }              from 'primeng/inputtext';
import { DialogModule }                 from 'primeng/dialog';
import { ToolbarModule }                from 'primeng/toolbar';
import { AutoCompleteModule }           from 'primeng/autocomplete';
import { RadioButtonModule }            from 'primeng/radiobutton';

@NgModule({
	imports: [
		CommonModule,
		UsuariosRoutingModule,
        TableModule,
        ButtonModule,
        PasswordModule,
        ConfirmDialogModule,
        InputTextModule,
        DialogModule,
        ToolbarModule,
        AutoCompleteModule,
        RadioButtonModule,
        FormsModule,
	],
	declarations: [
        UsuariosComponent
    ]
})
export class UsuariosModule { }
