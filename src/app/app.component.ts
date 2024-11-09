import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'tcc-psicologia-frontend-2';

  isExperimentoAtivo: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.isExperimentoAtivo = this.router.url.includes('iniciar');
    });
  }
}
