import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FileNode } from '../../../../core/models/file-node.model';
import { ContentService } from '../../../../core/services/content.service';
import { ArticlePreviewComponent } from '../../layout/article-preview/article-preview.component';
import { CardComponent } from '../../layout/card/card.component';
import { TabComponent } from '../../layout/tab/tab.component';
import { BaseFileComponent } from '../base-file.component';


@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, TabComponent, CardComponent, ArticlePreviewComponent],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss',
})
export class WelcomeComponent extends BaseFileComponent {

  introduction: FileNode | undefined;
  experienceDirectories: FileNode[] = [];

  private introductionId: string = 'introduction';
  private experienceId: string = 'experience';

  constructor(contentService: ContentService) {
    super(contentService);
  }

  getId(): string {
    return 'ridloncmr'; // This should match the ID in CONTENT_DATA
  }

  protected override async onBaseOnInit(): Promise<void> {
console.log(this.directories);

    this.introduction = await this.contentService.getFileNodeById(this.introductionId);
    this.experienceDirectories = await this.contentService.getAllDirectoriesById(this.experienceId);

    console.log("introduction", this.introduction);
    console.log("experienceDirectories", this.experienceDirectories);
  }

}
