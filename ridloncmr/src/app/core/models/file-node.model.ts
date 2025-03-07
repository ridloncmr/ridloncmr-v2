export class FileNode {
    id: string;
    name: string;
    type: 'directory' | 'file' | 'executable';
    children?: FileNode[];
    content?: string;
    isUrl?: boolean;
  
    constructor(
      id: string,
      name: string,
      type: 'directory' | 'file' | 'executable',
      content?: string,
      isUrl?: boolean,
      children?: FileNode[]
    ) {
      this.id = id;
      this.name = name;
      this.type = type;
      this.content = content;
      this.isUrl = isUrl;
      this.children = children ?? (type === 'directory' ? [] : undefined);
    }
  }
  