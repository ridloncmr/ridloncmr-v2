import { Component } from '@angular/core';
import { ContentService } from '../../../core/services/content.service';
import { BaseFileComponent } from '../base-file.component';
import { FileNode } from '../../../core/models/file-node.model';
import { CommonModule } from '@angular/common';
import { ArticlePreviewComponent } from '../layout/article-preview/article-preview.component';
import { CardComponent } from '../layout/card/card.component';
import { TabComponent } from '../layout/tab/tab.component';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-stories',
  standalone: true,
  imports: [CommonModule, TabComponent, CardComponent, ArticlePreviewComponent],
  templateUrl: './stories.component.html',
  styleUrl: './stories.component.scss',
  animations: [
    trigger('fadeInOutAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(15px) scale(1)' }),
        animate('250ms ease-out', style({ opacity: 1, transform: 'translateY(0) scale(1)' }))
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ opacity: 0, transform: 'translateY(-10px) scale(1)' }))
      ])
    ])
  ]
})
export class StoriesComponent extends BaseFileComponent {
  activeTab: string = "";

  constructor(contentService: ContentService) {
    super(contentService);
  }

  getId(): string {
    return 'stories';
  }

  protected override onBaseOnInit(): void {
    if (this.directories.length > 0) {
      this.activeTab = this.directories[0].id;
    }
  }

  setActiveTab(tabId: string) {
    this.activeTab = tabId;
  }

  getCurrentFiles(): FileNode[] {
    const activeDirectory = this.directories.find(dir => dir.id === this.activeTab);
    return activeDirectory?.children || [];
  }
}
