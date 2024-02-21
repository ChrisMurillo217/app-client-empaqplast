import { RouterModule }                 from '@angular/router';
import { NgModule }                     from '@angular/core';

import { NotfoundComponent }            from './demo/components/notfound/notfound.component';
import { AppLayoutComponent }           from './layout/app.layout.component';
import { RegisProvComponent }           from './demo/components/regis-prov/regis-prov.component';
import { AuthGuard }                    from './demo/guards/auth.guard';

@NgModule( {
    imports: [
        RouterModule.forRoot( [
            { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
            { path: '', component: AppLayoutComponent, canActivate: [ AuthGuard ], children: [
                    {
                        path: 'panel',
                        loadChildren: () => import( './demo/components/dashboard/dashboard.module' )
                            .then( m => m.DashboardModule )
                    },
                    {
                        path: 'seguimiento',
                        loadChildren: () => import( './demo/components/tracking-list/tracking-list.module' )
                            .then( m => m.TrackingListModule )
                    },
                    {
                        path: 'documentos',
                        loadChildren: () => import( './demo/components/factura/factura.module' )
                            .then( m => m.FacturaModule )
                    },
                    {
                        path: 'inventario',
                        loadChildren: () => import( './demo/components/stock/stock.module' )
                            .then( m => m.StockModule )
                    },
                    {
                        path: 'usuarios',
                        loadChildren: () => import( './demo/components/usuarios/usuarios.module' )
                            .then( m => m.UsuariosModule )
                    },
                    {
                        path: 'personas',
                        loadChildren: () => import( './demo/components/person/person.module' )
                            .then( m => m.PersonModule )
                    },
                    {
                        path: 'roles',
                        loadChildren: () => import( './demo/components/rol/rol.module' )
                            .then( m => m.RolModule )
                    },
                    {
                        path: 'guias',
                        loadChildren: () => import( './demo/components/guia/guia.module' )
                            .then( m => m.GuiaModule )
                    }
                ]
            },
            {
                path: 'registro', component: RegisProvComponent, children:
                [
                    {
                        path: 'general', loadChildren: () => import( './demo/components/regis-prov/general/general.module' )
                            .then( m => m.GeneralModule )
                    },
                    {
                        path: 'datos', loadChildren: () => import( './demo/components/regis-prov/datos/datos.module' )
                            .then( m => m.DatosModule )
                    },
                    {
                        path: 'sucursales', loadChildren: () => import( './demo/components/regis-prov/sucursales/sucursales.module' )
                            .then( m => m.SucursalesModule )
                    },
                    {
                        path: 'contacto', loadChildren: () => import( './demo/components/regis-prov/contacto/contacto.module' )
                            .then( m => m.ContactoModule )
                    },
                    {
                        path: 'certificaciones', loadChildren: () => import( './demo/components/regis-prov/certificaciones/certificaciones.module' )
                            .then( m => m.CertificacionesModule )
                    },
                    {
                        path: 'clientes', loadChildren: () => import( './demo/components/regis-prov/clientes/clientes.module' )
                            .then( m => m.ClientesModule )
                    },
                    {
                        path: 'terminos', loadChildren: () => import( './demo/components/regis-prov/terminos/terminos.module' )
                            .then( m => m.TerminosModule )
                    },
                    {
                        path: 'elaboracion', loadChildren: () => import( './demo/components/regis-prov/elaboracion/elaboracion.module' )
                            .then( m => m.ElaboracionModule )
                    },
                    {
                        path: 'confirmacion', loadChildren: () => import( './demo/components/regis-prov/confirmacion/confirmacion.module' )
                            .then( m => m.ConfirmacionModule )
                    }
                ]
            },
            {
                path: 'auth',
                loadChildren: () => import( './demo/components/auth/auth.module' )
                    .then( m => m.AuthModule )
            },
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
