import { Component, OnInit } from '@angular/core';
import { ContentService } from '../../../core/services/content.service';
import { BaseFileComponent } from '../base-file.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent extends BaseFileComponent {

  constructor(contentService: ContentService) {
    super(contentService);
  }

  getId(): string {
    return 'contact';
  }
}
