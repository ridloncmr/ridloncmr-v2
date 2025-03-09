import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ContentService } from '../../../../core/services/content.service';
import { FileNode } from '../../../../core/models/file-node.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  routes: FileNode[] = [];

  constructor(private contentService: ContentService) {}

  async ngOnInit(): Promise<void> {
    this.routes = await this.contentService.getFileSystem();
  }
}
