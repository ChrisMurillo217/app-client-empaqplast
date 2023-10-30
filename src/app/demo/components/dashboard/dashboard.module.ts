import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardsRoutingModule } from './dashboard-routing.module';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@NgModule( {
    imports: [
        CommonModule,
        DashboardsRoutingModule,
        CardModule,
        ButtonModule,
    ],
    declarations: [ DashboardComponent ]
} )
export class DashboardModule { }
