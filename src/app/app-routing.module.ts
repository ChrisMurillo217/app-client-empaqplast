import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { AuthGuard } from './demo/guards/auth.guard';

@NgModule( {
    imports: [
        RouterModule.forRoot( [
            { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
            { path: '', component: AppLayoutComponent, canActivate: [ AuthGuard ], children: [
                    {
                        path: 'dashboard',
                        loadChildren: () => import( './demo/components/dashboard/dashboard.module' )
                            .then( m => m.DashboardModule )
                    },
                    {
                        path: 'tracking-list',
                        loadChildren: () => import( './demo/components/tracking-list/tracking-list.module' )
                            .then( m => m.TrackingListModule )
                    },
                    {
                        path: 'documentos',
                        loadChildren: () => import( './demo/components/factura/factura.module' )
                            .then( m => m.FacturaModule )
                    },
                    {
                        path: 'stock',
                        loadChildren: () => import( './demo/components/stock/stock.module' )
                            .then( m => m.StockModule )
                    },
                    {
                        path: 'usuarios',
                        loadChildren: () => import( './demo/components/usuarios/usuarios.module' )
                            .then( m => m.UsuariosModule )
                    },
                    {
                        path: 'persona',
                        loadChildren: () => import( './demo/components/person/person.module' )
                            .then( m => m.PersonModule )
                    },
                    {
                        path: 'roles',
                        loadChildren: () => import( './demo/components/rol/rol.module' )
                            .then( m => m.RolModule )
                    }
                ]
            },
            { path: 'auth', loadChildren: () => import( './demo/components/auth/auth.module' ).then( m => m.AuthModule ) },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: 'auth/login' },
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
