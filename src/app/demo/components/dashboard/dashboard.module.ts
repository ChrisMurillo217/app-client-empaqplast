import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardsRoutingModule } from './dashboard-routing.module';
import { CardModule } from 'primeng/card';

@NgModule( {
    imports: [
        CommonModule,
        DashboardsRoutingModule,
        CardModule,
    ],
    declarations: [ DashboardComponent ]
} )
export class DashboardModule { }
