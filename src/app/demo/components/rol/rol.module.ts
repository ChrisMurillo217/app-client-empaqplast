import { NgModule }                         from '@angular/core';
import { CommonModule }                     from '@angular/common';
import { FormsModule }                      from '@angular/forms';

import { RolComponent }                     from './rol.component';
import { RolRoutingModule }                 from './rol-routing.module';

import { TableModule }                      from 'primeng/table';
import { FileUploadModule }                 from 'primeng/fileupload';
import { ButtonModule }                     from 'primeng/button';
import { RippleModule }                     from 'primeng/ripple';
import { ToastModule }                      from 'primeng/toast';
import { ToolbarModule }                    from 'primeng/toolbar';
import { RatingModule }                     from 'primeng/rating';
import { InputTextModule }                  from 'primeng/inputtext';
import { InputTextareaModule }              from 'primeng/inputtextarea';
import { DropdownModule }                   from 'primeng/dropdown';
import { RadioButtonModule }                from 'primeng/radiobutton';
import { InputNumberModule }                from 'primeng/inputnumber';
import { DialogModule }                     from 'primeng/dialog';
import { PasswordModule }                   from 'primeng/password';

@NgModule( {
	imports: [
		CommonModule,
		RolRoutingModule,
        TableModule,
        FileUploadModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        ToolbarModule,
        RatingModule,
        InputTextModule,
        InputTextareaModule,
        DropdownModule,
        RadioButtonModule,
        InputNumberModule,
        DialogModule,
        PasswordModule,
        FormsModule,
	],
	declarations: [
        RolComponent
    ]
} )
export class RolModule { }
