import { Injectable }                                   from '@angular/core';
import { HttpClient, HttpHeaders }                      from '@angular/common/http';

import { Observable, catchError, throwError }           from 'rxjs';

import { TokenService }                                 from '../token.service';

@Injectable()
export class ProveedorService {
    urlAPI:                     string = 'http://tracking.empaqplast.com:8086/api';

    constructor(
        private __http: HttpClient,
        private tokenService: TokenService
    ) { }

    getAuthHeaders() {
        const token = this.tokenService.getToken();
        return new HttpHeaders( {
            Authorization: `Bearer ${ token }`
        } );
    }

    getProveedores( pagina: number, elemento: number ): Observable< any > { // Con este método obtenemos la lista de todos los Proveedores
        const url = `${ this.urlAPI }/proveedores/lista/registrados?pagina=${ pagina }&elementosPorPagina=${ elemento }`;
        const headers = this.getAuthHeaders();
        return this.__http.get< any >( url, { headers } ).pipe(
            catchError( ( error ) => {
                return throwError( error );
            } )
        );
    }
}
