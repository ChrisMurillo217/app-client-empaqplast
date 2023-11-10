import { NgModule }                     from '@angular/core';
import { CommonModule }                 from '@angular/common';

import { UsuariosComponent }            from './usuarios.component';

import { UsuariosRoutingModule }        from './usuarios-routing.module';

import { TableModule }                  from 'primeng/table';
import { ButtonModule }                 from 'primeng/button';
import { PasswordModule }               from 'primeng/password';
import { ConfirmDialogModule }          from 'primeng/confirmdialog';
import { InputTextModule }              from 'primeng/inputtext';
import { DialogModule }                 from 'primeng/dialog';

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
	],
	declarations: [
        UsuariosComponent
    ]
})
export class UsuariosModule { }
