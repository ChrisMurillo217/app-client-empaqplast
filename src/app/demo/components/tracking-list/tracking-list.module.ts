import { NgModule }                             from '@angular/core';
import { CommonModule }                         from '@angular/common';

import { TrackingListComponent }                from './tracking-list.component';
import { DetallesComponent }                    from './detalles/detalles.component';
import { TrackingComponent }                    from './tracking/tracking.component';

import { TrackingListRoutingModule }            from './tracking-list-routing.module';

import { TableModule }                          from 'primeng/table';
import { ButtonModule }                         from 'primeng/button';
import { ProgressBarModule }                    from 'primeng/progressbar';
import { PaginatorModule }                      from 'primeng/paginator';
import { DynamicDialogModule }                  from 'primeng/dynamicdialog';
import { DialogService }                        from 'primeng/dynamicdialog';
import { InputTextModule }                      from 'primeng/inputtext';

@NgModule({
	imports: [
		CommonModule,
		TrackingListRoutingModule,
		TableModule,
		ButtonModule,
		ProgressBarModule,
        PaginatorModule,
        DynamicDialogModule,
        InputTextModule,
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
