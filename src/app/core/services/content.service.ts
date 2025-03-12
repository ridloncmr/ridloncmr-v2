import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { FileNode, IFileNode } from '../models/file-node.model';
import * as ContentText from '../../data/content-index';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  private contentUrl = 'assets/data/content-data.json';

  constructor(private http: HttpClient) {}

  async getFileSystem(): Promise<FileNode[]> {
    const data = await lastValueFrom(
      this.http.get<IFileNode[]>(this.contentUrl)
    );

    return data.map(node => this.resolveContent(node));
  }

  async getFileNodeById(id: string): Promise<FileNode | undefined> {
    const nodes = await this.getFileSystem();
    return this.findNode(nodes, id);
  }

  async getAllDirectoriesById(id: string): Promise<FileNode[]> {
    const rootNode = await this.getFileNodeById(id);
    if (!rootNode || rootNode.type !== 'directory') {
      return [];
    }

    return this.getAllDirectoryNodes(rootNode.children || [], true);
  }

  async getTopLevelNodes(): Promise<FileNode[]> {
    let fileSystem = await this.getFileSystem();
    return fileSystem.map(
      (node) =>
        new FileNode({
          id: node.id,
          fileName: node.fileName,
          guiName: node.guiName ?? node.fileName,
          type: node.type,
          content: node.content,
          isUrl: node.isUrl,
          children: [],
        } as IFileNode)
    );
  }

  getAllDirectoryNodes(nodes: FileNode[], allNodes: boolean = false): FileNode[] {
    let directories: FileNode[] = [];

    for (const node of nodes) {
      if (node.type === 'directory') {
        directories.push(node);
        // all nodes grabs all children directories regardless of parent
        if (node.children?.length && allNodes) {
          directories = directories.concat(
            this.getAllDirectoryNodes(node.children, true)
          );
        }
      }
    }

    return directories;
  }

  getAllFileNodes(nodes: FileNode[], allNodes: boolean = false): FileNode[] {
    let files: FileNode[] = [];

    for (const node of nodes) {
      if (node.type === 'file') {
        files.push(node);
      }
      // all nodes grabs all children files regardless of parent
      if (node.children?.length && allNodes) {
        files = files.concat(this.getAllFileNodes(node.children, true));
      }
    }

    return files;
  }

  private findNode(nodes: FileNode[], id: string): FileNode | undefined {
    for (const node of nodes) {
      if (node.id === id) return node;
      if (node.children?.length) {
        const foundInChildren = this.findNode(node.children, id);
        if (foundInChildren) return foundInChildren;
      }
    }
    return undefined;
  }

  private resolveContent(node: IFileNode): FileNode {
    const resolvedNode = new FileNode({
      ...node,
      content: node.contentKey ? (ContentText as any)[node.contentKey] : node.content,
      children: node.children?.map(child => this.resolveContent(child))
    });

    return resolvedNode;
  }
}
