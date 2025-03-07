import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HackerProgramComponent } from '../hacker-program/hacker-program.component';

@Component({
  standalone: true,
  selector: 'app-program-loader',
  template: '<ng-container *ngComponentOutlet="currentProgram"></ng-container>',
  imports: [CommonModule]
})
export class ProgramLoaderComponent implements OnInit {
  currentProgram: any;
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      const exeName = params.get('exe');

      switch (exeName) {
        case 'hacker.exe':
          this.currentProgram = HackerProgramComponent;
          break;
        default:
          this.router.navigate(['/']);
      }
    });
  }
}
