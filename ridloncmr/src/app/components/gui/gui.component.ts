import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileNode } from '../../core/models/file-node.model';
import { ContentService } from '../../core/services/content.service';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from "./layout/footer/footer.component";

@Component({
  standalone: true,
  selector: 'app-gui',
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './gui.component.html',
  styleUrls: ['./gui.component.scss']
})
export class GuiComponent implements OnInit {
  fileSystem: FileNode[] = [];

  articles = [
    { title: 'Article 1', content: 'Lorem ipsum dolor sit amet...' },
    // { title: 'Article 2', content: 'Consectetur adipiscing elit...' },
    // { title: 'Article 3', content: 'Sed do eiusmod tempor incididunt...' }
  ];

  constructor(private contentService: ContentService) {}

  ngOnInit() {
    this.fileSystem = this.contentService.getFileSystem();
  }
}
