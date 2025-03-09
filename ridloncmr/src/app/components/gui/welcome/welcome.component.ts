import { Component, OnInit } from '@angular/core';
import { ContentService } from '../../../core/services/content.service';
import { BaseFileComponent } from '../base-file.component';
import { FileNode } from '../../../core/models/file-node.model';
import { CommonModule } from '@angular/common';
import { ArticlePreviewComponent } from '../layout/article-preview/article-preview.component';
import { CardComponent } from '../layout/card/card.component';
import { TabComponent } from '../layout/tab/tab.component';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, TabComponent, CardComponent, ArticlePreviewComponent],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss',
})
export class WelcomeComponent extends BaseFileComponent implements OnInit {
  activeTab: string = '';

  constructor(contentService: ContentService) {
    super(contentService);
  }

  getId(): string {
    return 'ridloncmr'; // This should match the ID in CONTENT_DATA
  }

  override async ngOnInit(): Promise<void> {
    super.ngOnInit();
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
