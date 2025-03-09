import { Component, OnInit } from '@angular/core';
import { ContentService } from '../../../core/services/content.service';
import { BaseFileComponent } from '../base-file.component';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent extends BaseFileComponent {

  constructor(contentService: ContentService) {
    super(contentService);
  }

  getId(): string {
    return 'ridloncmr';
  }
}
