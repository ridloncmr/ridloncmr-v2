import { Injectable } from '@angular/core';
import { FileNode } from '../models/file-node.model';
import { CONTENT_DATA } from '../../data/content-data';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  getFileSystem(): FileNode[] {
    return CONTENT_DATA; // Returns the root-level file structure
  }

  getTopLevelNodes(): FileNode[] {
    return CONTENT_DATA.map(node => new FileNode(node.id, node.name, node.type, node.content, node.isUrl, []));
  }
}
