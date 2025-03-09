import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FileNode } from '../../../../core/models/file-node.model';
import { CommonModule, SlicePipe } from '@angular/common';

@Component({
  selector: 'app-article-preview',
  standalone: true,
  imports: [CommonModule, SlicePipe ],
  templateUrl: './article-preview.component.html',
  styleUrl: './article-preview.component.scss'
})
export class ArticlePreviewComponent {
  @Input() article!: FileNode;

  constructor(private router: Router) {}

  readMore() {
    this.router.navigate(['/article', this.article.id]);
  }
}
