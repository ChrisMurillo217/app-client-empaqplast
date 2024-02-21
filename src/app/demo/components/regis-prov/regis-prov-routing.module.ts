import { NgModule }                     from '@angular/core';
import { RouterModule }                 from '@angular/router';
import { RegisProvComponent }           from './regis-prov.component';

@NgModule( {
    imports: [ RouterModule.forChild( [
        {   path: 'registro', component: RegisProvComponent, children:
            [
                {
                    path: 'general', loadChildren: () => import( './general/general.module' )
                        .then( m => m.GeneralModule )
                },
                {
                    path: 'datos', loadChildren: () => import( './datos/datos.module' )
                        .then( m => m.DatosModule )
                },
                {
                    path: 'sucursales', loadChildren: () => import( './sucursales/sucursales.module' )
                        .then( m => m.SucursalesModule )
                },
                {
                    path: 'contacto', loadChildren: () => import( './contacto/contacto.module' )
                        .then( m => m.ContactoModule )
                },
                {
                    path: 'certificaciones', loadChildren: () => import( './certificaciones/certificaciones.module' )
                        .then( m => m.CertificacionesModule )
                },
                {
                    path: 'clientes', loadChildren: () => import( './clientes/clientes.module' )
                        .then( m => m.ClientesModule )
                },
                {
                    path: 'terminos', loadChildren: () => import( './terminos/terminos.module' )
                        .then( m => m.TerminosModule )
                },
                {
                    path: 'elaboracion', loadChildren: () => import( './elaboracion/elaboracion.module' )
                        .then( m => m.ElaboracionModule )
                },
                {
                    path: 'confirmacion', loadChildren: () => import( './confirmacion/confirmacion.module' )
                        .then( m => m.ConfirmacionModule )
                }
            ]
        }
    ] ) ],
    exports: [ RouterModule ],
} )
export class RegisProvRoutingModule { }
