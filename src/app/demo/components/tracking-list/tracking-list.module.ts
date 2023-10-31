import { NgModule }                             from '@angular/core';
import { CommonModule }                         from '@angular/common';

import { TrackingListComponent }                from './tracking-list.component';
import { DetallesComponent }                    from './detalles/detalles.component';
import { TrackingComponent }                    from './tracking/tracking.component';

import { TrackingListRoutingModule }            from './tracking-list-routing.module';

import { TableModule }                          from 'primeng/table';
import { ButtonModule }                         from 'primeng/button';
import { RippleModule }                         from 'primeng/ripple';
import { InputTextModule }                      from 'primeng/inputtext';
import { ProgressBarModule }                    from 'primeng/progressbar';
import { ToastModule }                          from 'primeng/toast';
import { PaginatorModule }                      from 'primeng/paginator';
import { DialogModule }                         from 'primeng/dialog';
import { DynamicDialogModule }                  from 'primeng/dynamicdialog';
import { DialogService }                        from 'primeng/dynamicdialog';

@NgModule({
	imports: [
		CommonModule,
		TrackingListRoutingModule,
		TableModule,
		ButtonModule,
        RippleModule,
        InputTextModule,
		ProgressBarModule,
		ToastModule,
        PaginatorModule,
        DialogModule,
        DynamicDialogModule,
	],
    providers: [
        DialogService
    ],
	declarations: [
        TrackingListComponent,
        DetallesComponent,
        TrackingComponent
    ]
})
export class TrackingListModule { }
