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
  originalName: string = "ridloncmr";
  glitchedLetters: string[] = [];
  isGlitching: boolean = false;

  private substitutions: { [key: string]: string[] } = {
    'i': ['1', '!'],
    'o': ['0'],
    'e': ['3'],
    'a': ['4', '@'],
    's': ['5', '$'],
    't': ['7'],
    'c': ['(', '{'],
    'l': ['|', '1'],
    'm': ['^^', 'nn'],
    'r': ['Я']
  };

  ngOnInit() {
    this.glitchedLetters = this.originalName.split(''); // Initialize letters
    this.startGlitchEffect();
  }

  startGlitchEffect() {
    setInterval(() => {
      this.isGlitching = true;
      this.animateLetterGlitch();
      setTimeout(() => this.isGlitching = false, 800); // Effect lasts for 800ms
    }, Math.random() * 5000 + 3000); // Random interval between glitches
  }

  animateLetterGlitch() {
    const letters = this.originalName.split('');
    const tempGlitchedLetters = [...letters];

    letters.forEach((char, index) => {
      let glitchDuration = Math.random() * 500 + 100; // Random glitch time for each letter
      let interval = setInterval(() => {
        if (this.substitutions[char.toLowerCase()] && Math.random() > 0.3) {
          const possibleReplacements = this.substitutions[char.toLowerCase()];
          tempGlitchedLetters[index] = possibleReplacements[Math.floor(Math.random() * possibleReplacements.length)];
        } else {
          tempGlitchedLetters[index] = char; // Reset to original
        }
        this.glitchedLetters = [...tempGlitchedLetters]; // Update letters array
      }, 50);

      setTimeout(() => {
        clearInterval(interval);
        tempGlitchedLetters[index] = char; // Ensure final letter is original or a single glitch
        this.glitchedLetters = [...tempGlitchedLetters];
      }, glitchDuration);
    });
  }
}
