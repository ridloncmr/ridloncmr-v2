import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef, HostListener, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BaseProgramComponent } from '../base-program.component';
import { BruteForceAttempts, ErrorMessages, FakeCodeSnippets, HackingProcesses, IpScanResults, PasswordDumps } from '../../../data/hacker-data';

@Component({
  selector: 'app-hacker-program',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hacker-program.component.html',
  styleUrl: './hacker-program.component.scss'
})
export class HackerProgramComponent extends BaseProgramComponent implements OnInit, AfterViewInit {
  @ViewChild('outputContainer') outputContainer!: ElementRef;

  output: string[] = [];
  isCompiling: boolean = false;
  typingSpeed = 50;
  activeFakeCode: string = "";
  currentIndex: number = 0;
  isTyping: boolean = false; // Prevents multiple snippets from starting at once

  constructor(private cdr: ChangeDetectorRef, protected override router: Router) {
    super(router);
  }

  ngOnInit() {
    this.output.push("Initializing hacker.exe...");
    this.output.push("Waiting for user input...");
    this.output.push("\n");
  }

  ngAfterViewInit() {
    this.scrollToBottomSmooth();
  }

  @HostListener('document:keydown', ['$event'])
  handleTyping(event: KeyboardEvent) {
    if (event.key === "Enter" && !this.isCompiling) {
      this.startCompilation();
      return;
    }

    if (event.key.length === 1 && !event.ctrlKey && !this.isCompiling) {
      this.typeCharacter();
    }
  }

  typeCharacter() {
    if (!this.isTyping) {
      // ✅ Fake code now only appears when the user actually starts typing
      this.activeFakeCode = FakeCodeSnippets[Math.floor(Math.random() * FakeCodeSnippets.length)];
      this.output.push(""); // Create a new empty line for typing effect
      this.currentIndex = 0;
      this.isTyping = true;
      this.cdr.detectChanges();
    }

    let currentLineIndex = this.output.length - 1;
    let lastLine = this.output[currentLineIndex];

    if (this.currentIndex < this.activeFakeCode.length) {
      this.output[currentLineIndex] = lastLine + this.activeFakeCode[this.currentIndex];
      this.currentIndex++;
    } else {
      this.activeFakeCode = "";
      this.currentIndex = 0;
      this.isTyping = false;
    }

    this.cdr.detectChanges();
    this.scrollToBottomSmooth();
  }

  startCompilation() {
    this.isCompiling = true;

    this.output.push(""); // Ensure space before compiling
    this.output.push("[Compiling...]");
    this.cdr.detectChanges();
    this.scrollToBottomSmooth();

    this.hideCursor();

    let index = 0;
    const interval = setInterval(() => {
      if (index < HackingProcesses.length) {
        this.output.push("  " + HackingProcesses[index]);

        if (Math.random() > 0.7) {
          this.output.push("  " + IpScanResults[Math.floor(Math.random() * IpScanResults.length)]);
        }
        if (Math.random() > 0.6) {
          this.output.push("  " + BruteForceAttempts[Math.floor(Math.random() * BruteForceAttempts.length)]);
        }
        if (Math.random() > 0.8) {
          this.output.push("  " + ErrorMessages[Math.floor(Math.random() * ErrorMessages.length)]);
        }
        if (index === HackingProcesses.length - 1) {
          this.output.push(""); // New line for spacing
          this.output.push("[Execution Complete. System Compromised.]");
          this.output.push("  " + PasswordDumps[Math.floor(Math.random() * PasswordDumps.length)]);
          this.output.push(""); // Final blank lineasdfasd
        }

        this.cdr.detectChanges();
        this.scrollToBottomSmooth();
        index++;
      } else {
        clearInterval(interval);
        this.isCompiling = false;
        this.output.push(""); // Ensure space before compilingadsfasf
        this.showCursor();
      }
    }, this.typingSpeed * 5);
  }

  scrollToBottomSmooth() {
    setTimeout(() => {
      if (this.outputContainer) {
        const element = this.outputContainer.nativeElement;
        element.scrollTo({
          top: element.scrollHeight,
          behavior: "smooth"
        });
      }
    }, 10);
  }

  private hideCursor() {
    setTimeout(() => {
      const cursorElement = document.querySelector(".cursor");
      if (cursorElement) {
        (cursorElement as HTMLElement).style.display = "none";
      }
    }, 10);
  }

  private showCursor() {
    setTimeout(() => {
      const cursorElement = document.querySelector(".cursor");
      if (cursorElement) {
        (cursorElement as HTMLElement).style.display = "inline-block";
      }
    }, 10);
  }
}
