import { Component, ViewChild, ElementRef, AfterViewInit, HostListener, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommandService } from '../../core/services/command.service';
import { TerminalBrandingComponent } from './terminal-branding/terminal-branding.component';
import { TerminalInfoComponent } from './terminal-info/terminal-info.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-terminal',
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TerminalBrandingComponent,
    TerminalInfoComponent,
  ],
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss'],
})
export class TerminalComponent  {
  

  

  constructor(
    private commandService: CommandService,
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer
  ) {}








}
