import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FileNode } from '../../../../core/models/file-node.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-article-card',
  standalone: true,
  imports: [CommonModule],
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

  ngOnChanges(): void {
    if (!this.directory) return;

    if (this.directory.type === 'file') {
      this.title = this.directory.id === 'title' ? this.directory.content ?? '' : '';
      this.subtitle = this.directory.id === 'tenure' ? this.directory.content ?? '' : '';
      this.bodySections = (this.directory.id !== 'title' && this.directory.id !== 'tenure') ? [this.directory.content ?? ''] : [];
      console.log("WTF", this.bodySections);
    } else if (this.directory.children) {
      const children = this.directory.children;

      this.title = children.find(child => child.id === 'title')?.content ?? '';
      this.subtitle = children.find(child => child.id === 'tenure')?.content ?? '';

      // Check for image nodes within children
      const imageNode = children.find(child => child.type === 'image');
      this.imagePath = imageNode?.content;

      const urlNode = children.find(child => child.isUrl);
      this.url = urlNode?.content;

      this.bodySections = children
        .filter(child => child.id !== 'title' && child.id !== 'tenure' && child.type !== 'image' && !child.isUrl)
        .map(child => child.content ?? '');
    }
  }
}
