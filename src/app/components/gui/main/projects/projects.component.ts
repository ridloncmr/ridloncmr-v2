import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FileNode } from '../../../../core/models/file-node.model';
import { ContentService } from '../../../../core/services/content.service';
import { ArticlePreviewComponent } from '../../layout/article-preview/article-preview.component';
import { CardComponent } from '../../layout/card/card.component';
import { TabComponent } from '../../layout/tab/tab.component';
import { BaseFileComponent } from '../base-file.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, TabComponent, CardComponent, ArticlePreviewComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent extends BaseFileComponent implements OnInit {
  activeTab: string = '';

  constructor(contentService: ContentService) {
    super(contentService);
  }

  getId(): string {
    return 'projects';
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
