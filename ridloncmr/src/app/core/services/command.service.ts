import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FileNode } from '../models/file-node.model';
import { CONTENT_DATA } from '../../data/content-data';
import { COMMANDS } from '../../data/command-data';


@Injectable({
  providedIn: 'root'
})
export class CommandService {
  outputHistory: string[] = ['Welcome to my site!', "Type 'help' for available commands."];
  currentPath: string[] = []; // Tracks the current directory path
  fileSystem: FileNode[] = CONTENT_DATA;

  constructor(public router: Router) {}

  executeCommand(input: string) {
    if (!input.trim()) return;
  
    this.outputHistory.push(`> ${input}`);
    const parts = input.trim().split(' ');
    const commandName = parts.shift()?.toLowerCase() || ""; // Convert to lowercase
    const args = parts.map(arg => arg.toLowerCase()); // Convert all args to lowercase
  
    const command = COMMANDS.find(cmd => cmd.name.toLowerCase() === commandName);
    if (command) {
      command.execute(args, this);
    } else {
      this.outputHistory.push(`Unknown command: ${commandName}`);
    }
  }
  
  getCurrentPath(): string {
    return 'c:\\' + (this.currentPath.length ? this.currentPath.join('\\') : '');
  }

  getCurrentLocation(): FileNode[] {
    return this.currentPath.reduce((dir, sub) => {
      const found = dir.find(item => item.id === sub && item.type === 'directory');
      return found ? found.children || [] : [];
    }, this.fileSystem);
  }

  getAutoCompleteOptions(input: string): string[] {
    const parts = input.trim().split(' ');
    if (parts.length === 0) return []; // No input, no suggestions
  
    const commandName = parts[0].toLowerCase();
    const lastWord = parts.length > 1 ? parts[parts.length - 1].toLowerCase() : '';
  
    const command = COMMANDS.find(cmd => cmd.name.toLowerCase() === commandName);
    if (!command) return []; // Ignore if the command is invalid
  
    const location = this.getCurrentLocation();
  
    // If only the command is typed, suggest all possible options
    if (parts.length === 1) {
      if (command.autoComplete) {
        return command.autoComplete([''], location);
      }
      return [];
    }
  
    // Otherwise, refine the auto-complete based on the last word
    if (command.autoComplete) {
      return command.autoComplete(parts.slice(1), location);
    }
  
    return [];
  }
  
  
  getHistory() {
    return this.outputHistory;
  }
}
