import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommandService } from '../../../core/services/command.service';

interface InfoLine {
  label: string;
  value: string;
  displayedValue: string; // What is currently shown as it's typed
  isTyping: boolean;
  delay: number;
}

@Component({
  standalone: true,
  selector: 'app-terminal-info',
  imports: [CommonModule],
  templateUrl: './terminal-info.component.html',
  styleUrls: ['./terminal-info.component.scss']
})
export class TerminalInfoComponent implements OnInit {
  bootLines: { text: string; isVisible: boolean; delay: number }[] = [];
  systemInfo: InfoLine[] = [];
  isGlitching: boolean = false;
  isBootComplete: boolean = false; // Controls when to wipe the screen

  constructor(private commandService: CommandService) {}

  ngOnInit() {
    this.initializeBootSequence();
    this.initializeSystemInfo();
    this.simulateBoot();
    this.startRandomGlitches();
  }

  initializeBootSequence() {
    this.bootLines = [
      { text: `Initializing system...`, isVisible: false, delay: 500 },
      { text: `Checking integrity...`, isVisible: false, delay: 1000 },
      { text: `Loading kernel modules...`, isVisible: false, delay: 1500 },
      { text: `Decrypting connection...`, isVisible: false, delay: 2000 },
      { text: `Verifying anomaly data...`, isVisible: false, delay: 2500 },
      { text: `System Ready.`, isVisible: false, delay: 3000 },
    ];
  }

  initializeSystemInfo() {
    this.systemInfo = [
      { label: `System:`, value: `Glitched Out OS v1.6`, displayedValue: '', isTyping: false, delay: 3500 },
      { label: `Status:`, value: `[ERROR] Unstable Environment Detected`, displayedValue: '', isTyping: false, delay: 3800 },
      { label: `Connection:`, value: `Encrypted`, displayedValue: '', isTyping: false, delay: 4100 },
      { label: `Session ID:`, value: this.generateSessionId(), displayedValue: '', isTyping: false, delay: 4400 },
    ];
  }

  simulateBoot() {
    let totalDelay = 0;
    this.bootLines.forEach((line, index) => {
      totalDelay += line.delay;
      setTimeout(() => {
        this.bootLines[index].isVisible = true;
        if (index === this.bootLines.length - 1) {
          setTimeout(() => this.clearBootLogs(), 1000);
        }
      }, totalDelay);
    });
  }

  clearBootLogs() {
    setTimeout(() => {
      this.isBootComplete = true; // Boot is complete, show labels immediately

      // Start typing the system information
      let totalDelay = 0;
      this.systemInfo.forEach((info, index) => {
        totalDelay += info.delay;
        setTimeout(() => {
          this.startTypingEffect(info);
        }, totalDelay);
      });

    }, 1000);
  }

  startTypingEffect(info: InfoLine) {
    info.isTyping = true;
    let index = 0;
    const interval = setInterval(() => {
      if (index < info.value.length) {
        info.displayedValue += info.value[index];
        index++;
      } else {
        clearInterval(interval);
        info.isTyping = false;
      }
    }, 50); // Speed of typing effect
  }

  generateSessionId(): string {
    return (Math.random() * 9999999).toFixed(0);
  }

  startRandomGlitches() {
    setInterval(() => {
      this.isGlitching = true;
      setTimeout(() => {
        this.isGlitching = false;
      }, 250);
    }, Math.random() * 7000 + 3000);
  }
}
