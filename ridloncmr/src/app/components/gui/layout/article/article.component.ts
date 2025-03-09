import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileNode } from '../../../../core/models/file-node.model';
import { ContentService } from '../../../../core/services/content.service';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { Location } from '@angular/common';


@Component({
  selector: 'app-article',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss'
})
export class ArticleComponent implements OnInit {
  article: FileNode | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contentService: ContentService,
    private location: Location
  ) {}

  ngOnInit(): void {
    const articleId = this.route.snapshot.paramMap.get('id');
    if (articleId) {
      this.article = this.contentService.getFileNodeById(articleId);
    }
  }

  goBack(): void {
    this.location.back(); // navigate back
  }
}
