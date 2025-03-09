import { OnInit, Component } from '@angular/core';
import { FileNode, IFileNode } from '../../core/models/file-node.model';
import { ContentService } from '../../core/services/content.service';

@Component({
  standalone: true,
  template: '',
})
export abstract class BaseFileComponent implements OnInit {
  content: IFileNode | null = null;
  directories: IFileNode[] = [
    new FileNode({ id: 'home', name: 'Home', type: 'directory' }),
  ];

  constructor(protected contentService: ContentService) {}

  abstract getId(): string;

  protected onBaseOnInit(): void {}

  async ngOnInit(): Promise<void> {
    const id = this.getId();
    this.content = await this.contentService.getFileNodeById(id);

    if (this.content?.children) {
      this.directories[0].children = this.contentService.getAllFileNodes(
        this.content.children
      );

      this.directories = [
        ...this.directories,
        ...this.contentService.getAllDirectoryNodes(this.content.children),
      ];
    }

    this.onBaseOnInit();
  }
}
