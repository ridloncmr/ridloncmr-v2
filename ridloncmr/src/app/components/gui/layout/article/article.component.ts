import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { ContentService } from '../../../../core/services/content.service';
import { FileNode } from '../../../../core/models/file-node.model';

@Component({
  selector: 'app-article',
  standalone: true,
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss'
})
export class ArticleComponent implements OnInit {
  article: FileNode | null = null;
  sanitizedContent: SafeHtml = '';

  constructor(
    private route: ActivatedRoute,
    private contentService: ContentService,
    private sanitizer: DomSanitizer,  // ✅ Inject DomSanitizer
    private location: Location
  ) {}

  ngOnInit(): void {
    const articleId = this.route.snapshot.paramMap.get('id');
    if (articleId) {
      this.article = this.contentService.getFileNodeById(articleId);

      // ✅ Sanitize HTML content
      if (this.article?.content) {
        this.sanitizedContent = this.sanitizer.bypassSecurityTrustHtml(this.article.content);
      }
    }
  }

  goBack(): void {
    this.location.back();
  }
}
