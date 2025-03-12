import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FileNode } from '../../../../core/models/file-node.model';
import { ContentService } from '../../../../core/services/content.service';
import { ArticlePreviewComponent } from '../../layout/article-preview/article-preview.component';
import { BaseFileComponent } from '../base-file.component';
import { ArticleCardComponent } from "../../layout/article-card/article-card.component";


@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, ArticlePreviewComponent, ArticleCardComponent],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss',
})
export class WelcomeComponent extends BaseFileComponent {

  introduction: FileNode | undefined;
  experienceDirectories: FileNode[] = [];

  featuredStory: FileNode | undefined;
  private introductionId: string = 'introduction';
  private experienceId: string = 'experience';
  private storiesId: string = 'stories';

  constructor(contentService: ContentService) {
    super(contentService);
  }

  getId(): string {
    return 'ridloncmr'; // This should match the ID in CONTENT_DATA
  }

  protected override async onBaseOnInit(): Promise<void> {
    this.introduction = await this.contentService.getFileNodeById(this.introductionId);
    this.experienceDirectories = await this.contentService.getAllDirectoriesById(this.experienceId);

    const storiesDirectory = await this.contentService.getFileNodeById(this.storiesId);
    if (storiesDirectory) {
      const allStories = this.contentService.getAllFileNodes([storiesDirectory], true);
      this.featuredStory = allStories[Math.floor(Math.random() * allStories.length)];
    }
  }

}
