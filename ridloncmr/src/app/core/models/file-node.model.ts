export interface IFileNode {
  id: string;
  name: string;
  type: 'directory' | 'file' | 'executable';
  children?: IFileNode[];
  content?: string;
  contentKey?: string;
  isUrl?: boolean;
}


export class FileNode {
  id: string;
  name: string;
  type: 'directory' | 'file' | 'executable';
  children?: FileNode[];
  content?: string;
  contentKey?: string;
  isUrl?: boolean;

  constructor(data: IFileNode) {
    this.id = data.id;
    this.name = data.name;
    this.type = data.type;
    this.content = data.content;
    this.contentKey = data.contentKey;
    this.isUrl = data.isUrl;
    this.children = data.children?.map((child: FileNode) => new FileNode(child)) ?? (this.type === 'directory' ? [] : undefined);
  }

  static fromJson(json: IFileNode): FileNode {
    return new FileNode(json);
  }
}
