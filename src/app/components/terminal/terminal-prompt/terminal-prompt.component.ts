import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { CommandService } from '../../../core/services/command.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-terminal-prompt',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './terminal-prompt.component.html',
  styleUrl: './terminal-prompt.component.scss'
})
export class TerminalPromptComponent implements OnInit, AfterViewInit {
  @ViewChild('terminalInput') terminalInput!: ElementRef;
  @ViewChild('suggestionElement') suggestionElement!: ElementRef;

  isGlitching: boolean = false;
  commandInput: string = '';
  outputHistory: SafeHtml[] = [];
  suggestions: string[] = [];
  suggestionIndex: number = -1;
  inlineSuggestion: string = '';

  constructor(
    private commandService: CommandService,
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer
  ) { }

  get prompt(): string {
    return this.commandService.getCurrentPath() + '>';
  }

  ngOnInit() {
    this.outputHistory = this.commandService.getHistory();
    this.startRandomGlitches();
  }

  ngAfterViewInit() {
    this.focusInput();
  }

  startRandomGlitches() {
    setInterval(() => {
      this.isGlitching = true;
      setTimeout(() => {
        this.isGlitching = false;
      }, 250); // Short glitch burst
    }, Math.random() * 7000 + 3000); // Randomly every 3-10 seconds
  }

  @HostListener('document:keydown.tab', ['$event'])
  handleTab(event: KeyboardEvent) {
    event.preventDefault();
    this.applyOrCycleSuggestion();
  }

  @HostListener('document:keydown.enter', ['$event'])
  handleEnter(event: KeyboardEvent) {
    if (this.inlineSuggestion) {
      event.preventDefault();
      this.applySuggestion();
    }
    this.handleCommand();
  }

  handleInput() {
    this.updateSuggestions();
    this.cdr.detectChanges();
  }

  handleCommand() {
    if (this.commandInput.trim()) {
      let formattedCommand = this.commandInput
        .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>') // Bold
        .replace(/\*(.*?)\*/g, '<i>$1</i>'); // Italic

      this.outputHistory.push(
        this.sanitizer.bypassSecurityTrustHtml(
          `${this.prompt} ${formattedCommand}`
        )
      );
      this.commandService.executeCommand(this.commandInput);
      this.commandInput = '';
      this.clearSuggestions();
    }
    this.focusInput();
  }

  focusInput() {
    setTimeout(() => this.terminalInput.nativeElement.focus(), 0);
  }

  updateSuggestions() {
    const parts = this.commandInput.trim().split(' ');
    const lastWord = parts.length > 1 ? parts[parts.length - 1] : '';

    const newSuggestions = this.commandService.getAutoCompleteOptions(
      this.commandInput.trim()
    );

    // Reset suggestion index **only if the suggestions change**
    if (JSON.stringify(newSuggestions) !== JSON.stringify(this.suggestions)) {
      this.suggestionIndex = -1;
    }

    this.suggestions = newSuggestions;

    // Ensure inline suggestion updates correctly
    this.inlineSuggestion =
      this.suggestions.length > 0
        ? ` ${this.suggestions[0].slice(lastWord.length)}`
        : '';

    this.cdr.detectChanges(); // has to before adjustSuggestionPosition
    this.adjustSuggestionPosition();
  }

  applyOrCycleSuggestion() {
    if (this.suggestions.length === 0) return;

    if (this.suggestions.length === 1) {
      this.applySuggestion();
      return;
    }

    const parts = this.commandInput.trim().split(' ');
    const lastWord = parts.length > 1 ? parts[parts.length - 1] : '';

    if (this.suggestionIndex === -1) {
      // Start cycling at the first available suggestion
      this.suggestionIndex = 1;
    } else {
      // Cycle to the next suggestion
      this.suggestionIndex =
        (this.suggestionIndex + 1) % this.suggestions.length;
    }

    const suggestion = this.suggestions[this.suggestionIndex];
    const remainingText = suggestion.slice(lastWord.length);

    this.inlineSuggestion = remainingText;
    this.cdr.detectChanges();
  }

  applySuggestion() {
    if (this.inlineSuggestion) {
      if (
        !this.commandInput.endsWith(' ') &&
        !this.commandInput.includes(' ')
      ) {
        this.commandInput += ' ' + this.inlineSuggestion.trimStart();
      } else {
        this.commandInput += this.inlineSuggestion.trimStart();
      }

      this.clearSuggestions();
    }
  }

  adjustSuggestionPosition() {
    if (!this.terminalInput || !this.suggestionElement) return;

    const inputElement = this.terminalInput.nativeElement;
    const suggestionEl = this.suggestionElement.nativeElement;
    let textWidth = this.getTextWidth(this.commandInput, inputElement);

    if (!this.commandInput.endsWith(' ')) {
      textWidth += this.getTextWidth(' ', inputElement);
    }

    suggestionEl.style.paddingLeft = `${textWidth + 1}px`;
  }

  getTextWidth(text: string, element: HTMLElement): number {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (context) {
      const style = window.getComputedStyle(element);
      context.font = `${style.fontSize} ${style.fontFamily}`;
      return context.measureText(text).width;
    }
    return 0;
  }

  clearSuggestions() {
    this.suggestions = [];
    this.suggestionIndex = -1;
    this.inlineSuggestion = '';
    this.cdr.detectChanges();
  }
}
