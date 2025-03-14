import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FileNode } from '../../../../core/models/file-node.model';
import { CommonModule } from '@angular/common';
import { TagsComponent } from '../tags/tags.component';

@Component({
  selector: 'app-article-card',
  standalone: true,
  imports: [CommonModule, TagsComponent],
  templateUrl: 'article-card.component.html',
  styleUrl: 'article-card.component.scss'
})
export class ArticleCardComponent implements OnChanges {

  @Input() directory: FileNode | undefined;

  title: string = '';
  subtitle: string = '';
  bodySections: string[] = [];
  imagePath: string | undefined;
  url: string | undefined;
  tags: string[] = [];


  ngOnChanges(): void {
    if (!this.directory) return;
    console.log(this.directory);

    if (this.directory.type === 'file') {
      this.title = this.directory.id === 'title' ? this.directory.content ?? '' : '';
      this.subtitle = this.directory.id === 'subtitle' ? this.directory.content ?? '' : '';
      this.bodySections = (this.directory.id !== 'title' && this.directory.id !== 'subtitle') ? [this.directory.content ?? ''] : [];
    } else if (this.directory.children) {
      const children = this.directory.children;

      // get title and dubtitle (title and subtitle)
      this.title = children.find(child => child.id === 'title')?.content ?? '';
      this.subtitle = children.find(child => child.id === 'subtitle')?.content ?? '';

      // Check for image nodes within children
      const imageNode = children.find(child => child.type === 'image');
      this.imagePath = imageNode?.content;

      // Get URLs
      const urlNode = children.find(child => child.isUrl);
      this.url = urlNode?.content;

      // get tags
      this.tags = this.directory.tags ?? [];

      this.bodySections = children
        .filter(child => child.id !== 'title' && child.id !== 'subtitle' && child.type !== 'image' && !child.isUrl)
        .map(child => child.content ?? '');
    }
  }
}
