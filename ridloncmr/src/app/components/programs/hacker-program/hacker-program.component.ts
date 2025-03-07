import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BaseProgramComponent } from '../base-program.component';

@Component({
  selector: 'app-hacker-program',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hacker-program.component.html',
  styleUrl: './hacker-program.component.scss'
})
export class HackerProgramComponent extends BaseProgramComponent implements OnInit {
  output: string[] = []; // Stores fake logs
  typingSpeed = 50; // Adjust speed of hacking effect

  ngOnInit() {
    this.startHackingEffect();
  }

  startHackingEffect() {
    const fakeLogs = [
      "Initializing brute-force attack...",
      "Connecting to secure server...",
      "Decrypting RSA-2048 keys...",
      "Fetching shadow passwords...",
      "Scanning open ports (22, 80, 443)...",
      "Bypassing firewall...",
      "Access granted: root@localhost",
      "Injecting payload...",
      "Uploading exploit...",
      "Transfer complete. Exiting..."
    ];

    let index = 0;

    const logInterval = setInterval(() => {
      if (index < fakeLogs.length) {
        this.output.push(fakeLogs[index]);
        index++;
      } else {
        clearInterval(logInterval);
      }
    }, this.typingSpeed);
  }
}