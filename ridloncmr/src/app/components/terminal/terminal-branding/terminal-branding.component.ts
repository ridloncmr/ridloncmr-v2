import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-terminal-branding',
  imports: [CommonModule],
  templateUrl: './terminal-branding.component.html',
  styleUrls: ['./terminal-branding.component.scss']
})
export class TerminalBrandingComponent implements OnInit {

  isGlitching: boolean = false;

  ngOnInit() {
    this.startRandomGlitches();
  }


  startRandomGlitches() {
    setInterval(() => {
      this.isGlitching = true;
      setTimeout(() => {
        this.isGlitching = false;
      }, 250); // Short glitch burst
    }, Math.random() * 7000 + 3000); // Randomly every 3-10 seconds
  }
}
