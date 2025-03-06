import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-terminal',
  imports: [CommonModule, FormsModule],
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss']
})
export class TerminalComponent {
  commandInput: string = '';
  outputHistory: string[] = ['Welcome to my site!', "Type 'help' for available commands."];

  constructor() { }

  handleCommand() {
    if (this.commandInput.trim()) {
      this.outputHistory.push(`> ${this.commandInput}`);

      switch (this.commandInput.toLowerCase()) {
        case 'help':
          this.outputHistory.push('Available commands: help, about, clear');
          break;
        case 'about':
          this.outputHistory.push('This is my personal site, styled like a command terminal.');
          break;
        case 'clear':
          this.outputHistory = [];
          break;
        default:
          this.outputHistory.push(`Unknown command: ${this.commandInput}`);
      }

      this.commandInput = '';
    }
  }
}
