import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { TrackingService } from './demo/service/tracking.service';
import { DocumentService } from './demo/service/documents.service';
import { AuthService } from './demo/service/auth.service';
import { TokenService } from './demo/service/token.service';
import { UsuariosService } from './demo/service/usuarios.service';
import { StockService } from './demo/service/stock.service';

@NgModule( {
    declarations: [
        AppComponent,
        NotfoundComponent,
    ],
    imports: [
        AppRoutingModule,
        HttpClientModule,
        AppLayoutModule
    ],
    providers: [
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy,
        },
        TrackingService,
        DocumentService,
        AuthService,
        MessageService,
        TokenService,
        UsuariosService,
        StockService,
    ],
    bootstrap: [ AppComponent ],
} )
export class AppModule {}
