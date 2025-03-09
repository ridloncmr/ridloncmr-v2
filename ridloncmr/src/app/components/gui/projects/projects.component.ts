import { Component, OnInit } from '@angular/core';
import { ContentService } from '../../../core/services/content.service';
import { BaseFileComponent } from '../base-file.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent extends BaseFileComponent {

  constructor(contentService: ContentService) {
    super(contentService);
  }

  getId(): string {
    return 'projects';
  }
}
