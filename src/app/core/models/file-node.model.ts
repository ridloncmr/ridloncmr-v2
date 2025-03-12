export type FileType = 'directory' | 'file' | 'executable' | 'image';

export interface IFileNode {
  id: string;
  fileName: string;
  guiName?: string;
  type: FileType;
  children?: IFileNode[];
  content?: string;
  contentKey?: string;
  isUrl?: boolean;
  tags?: string[];
}

export class FileNode implements IFileNode {
  id: string;
  fileName: string;
  guiName?: string;
  type: FileType;
  children?: FileNode[];
  content?: string;
  contentKey?: string;
  isUrl?: boolean;
  tags?: string[]

  constructor(data: IFileNode) {
    this.id = data.id;
    this.fileName = data.fileName;
    this.guiName = data.guiName;
    this.type = data.type;
    this.content = data.content;
    this.contentKey = data.contentKey;
    this.isUrl = data.isUrl;
    this.tags = data.tags;
    this.children =
      data.children?.map((child: FileNode) => new FileNode(child)) ??
      (this.type === 'directory' ? [] : undefined);
  }

  static fromJson(json: IFileNode): FileNode {
    return new FileNode(json);
  }
}
