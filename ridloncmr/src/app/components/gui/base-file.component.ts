import { OnInit, Component } from '@angular/core';
import { FileNode } from '../../core/models/file-node.model';
import { ContentService } from '../../core/services/content.service';

@Component({
  standalone: true,
  template: '',
})
export abstract class BaseFileComponent implements OnInit {
  content: FileNode | null = null;
  directories: FileNode[] = [new FileNode('home', 'Home', 'directory')];

  constructor(protected contentService: ContentService) {}

  abstract getId(): string;

  protected onBaseOnInit(): void {};

  ngOnInit(): void {
    const id = this.getId();
    this.content = this.contentService.getFileNodeById(id);

    if (this.content?.children) {
      this.directories[0].children = this.contentService.getAllFileNodes(this.content.children);

      this.directories = [
        ...this.directories,
        ...this.contentService.getAllDirectoryNodes(this.content.children)
      ]
    }

    this.onBaseOnInit();
  }
}
