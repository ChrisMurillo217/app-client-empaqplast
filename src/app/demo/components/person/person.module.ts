import { NgModule }                         from '@angular/core';
import { CommonModule }                     from '@angular/common';
import { FormsModule }                      from '@angular/forms';

import { PersonComponent }                  from './person.component';

import { PersonRoutingModule }              from './person-routing.module';

import { TableModule }                      from 'primeng/table';
import { ButtonModule }                     from 'primeng/button';
import { InputTextModule }                  from 'primeng/inputtext';
import { DialogModule }                     from 'primeng/dialog';
import { PasswordModule }                   from 'primeng/password';
import { ConfirmDialogModule }              from 'primeng/confirmdialog';
import { ToolbarModule }                    from 'primeng/toolbar';

@NgModule( {
	imports: [
		CommonModule,
		PersonRoutingModule,
        TableModule,
        ButtonModule,
        InputTextModule,
        DialogModule,
        PasswordModule,
        ConfirmDialogModule,
        ToolbarModule,
        FormsModule,
	],
	declarations: [
        PersonComponent
    ]
} )
export class PersonModule { }
