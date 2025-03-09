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

  getFileNodeById(id: string): FileNode {
    const foundNode = this.findNode(CONTENT_DATA, id);
    if (!foundNode) {
      throw new Error(`FileNode with ID '${id}' not found.`);
    }
    return foundNode;
  }

  getAllDirectoryNodes(nodes: FileNode[]): FileNode[] {
    let directories: FileNode[] = [];

    for (const node of nodes) {
      if (node.type === 'directory') {
        directories.push(node);
        if (node.children?.length) {
          directories = directories.concat(this.getAllDirectoryNodes(node.children));
        }
      }
    }

    return directories;
  }

  getAllFileNodes(nodes: FileNode[]): FileNode[] {
    let files: FileNode[] = [];

    for (const node of nodes) {
      if (node.type === 'file') {
        files.push(node);
      }
      // if (node.children?.length) {
      //   files = files.concat(this.getAllFileNodes(node.children));
      // }
    }

    return files;
  }

  private findNode(nodes: FileNode[], id: string): FileNode | null {
    for (const node of nodes) {
      if (node.id === id) {
        return node; // Found the node
      }
      if (node.children?.length) {
        const foundInChildren = this.findNode(node.children, id);
        if (foundInChildren) {
          return foundInChildren; // Found in children
        }
      }
    }
    return null; // No match found
  }
}
