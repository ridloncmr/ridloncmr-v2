import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileNode } from '../../core/models/file-node.model';
import { ContentService } from '../../core/services/content.service';

@Component({
  standalone: true,
  selector: 'app-gui',
  imports: [CommonModule],
  templateUrl: './gui.component.html',
  styleUrls: ['./gui.component.scss']
})
export class GuiComponent implements OnInit {
  fileSystem: FileNode[] = [];

  constructor(private contentService: ContentService) {}

  ngOnInit() {
    this.fileSystem = this.contentService.getFileSystem(); // Load file system dynamically
  }
}
