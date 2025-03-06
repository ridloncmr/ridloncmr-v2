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
}
