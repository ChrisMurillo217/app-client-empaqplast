import { Component }                    from '@angular/core';
import { Router }                       from '@angular/router';

@Component({
  selector: 'app-inicio-prov',
  templateUrl: './inicio-prov.component.html',
  styleUrls: ['./inicio-prov.component.css']
})
export class InicioProvComponent {
    constructor(
        private router: Router
    ) {}

    nextPage() {
        this.router.navigate( [ 'registro/general' ] );
    }
}
