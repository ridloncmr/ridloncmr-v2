export interface Command {
    name: string;
    description: string;
    usage: string;
    execute: (args: string[], service: any) => void;
    autoComplete?: (args: string[], location: any[]) => string[];
  }
