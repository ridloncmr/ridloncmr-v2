import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-base-program',
  standalone: true,
  imports: [],
  template: '',
})
export class BaseProgramComponent {
  constructor(private router: Router) {}

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.ctrlKey && event.key === 'c') {
      this.exitProgram();
    }
  }

  exitProgram() {
    this.router.navigate(['/']);
  }
}