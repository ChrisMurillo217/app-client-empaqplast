import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";

@NgModule( {
    imports: [
        RouterModule.forRoot( [
            { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
            { path: '', component: AppLayoutComponent, children: [
                    { path: 'dashboard', loadChildren: () => import( './demo/components/dashboard/dashboard.module' ).then( m => m.DashboardModule ) },
                    { path: 'tracking-list', loadChildren: () => import( './demo/components/tracking-list/tracking-list.module' ).then( m => m.TrackingListModule ) },
                    { path: 'factura', loadChildren: () => import( './demo/components/factura/factura.module' ).then( m => m.FacturaModule ) },
                    { path: 'stock', loadChildren: () => import( './demo/components/stock/stock.module' ).then( m => m.StockModule ) }
                ]
            },
            { path: 'auth', loadChildren: () => import( './demo/components/auth/auth.module' ).then( m => m.AuthModule ) },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ], {
            scrollPositionRestoration: 'enabled',
            anchorScrolling: 'enabled',
            onSameUrlNavigation: 'reload'
        } )
    ],
    exports: [ RouterModule ]
} )
export class AppRoutingModule {
}
