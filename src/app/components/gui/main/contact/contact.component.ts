import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ContentService } from '../../../../core/services/content.service';
import { BaseFileComponent } from '../base-file.component';
import { ArticleCardComponent } from "../../layout/article-card/article-card.component";


@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ArticleCardComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent extends BaseFileComponent implements OnInit {
  activeTab: string = '';

  constructor(contentService: ContentService) {
    super(contentService);
  }

  getId(): string {
    return 'contact'; // Matches the ID in CONTENT_DATA
  }

  protected override onBaseOnInit(): void {
    console.log(this.directories);
    console.log(this.content)
  }
}
