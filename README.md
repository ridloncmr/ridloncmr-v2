# Ridloncmr Terminal Website

This project is a **terminal-style web application** designed to serve content dynamically in a file system-like structure. It provides a command-line interface to navigate and interact with the site's content. There is an optional GUI for those less inclined to the terminal ;) 

## 🚀 Tech Stack
- **Built with Angular 17**
  - This project is specifically developed using **Angular 17** to keep up with the latest features and best practices.
  - It serves as a practice ground for updating Angular applications.
- **Hosted on Firebase**
  - The site is deployed on **Firebase** for fast, reliable, and scalable hosting. And access to firestore, auth, and more...

---

## 📂 Content Management
The site is powered by a JSON-based **file system**, where content is structured using `IFileNode` objects. Each piece of content is referenced using a `contentKey` and stored separately in a TypeScript file to keep JSON clean and readable.

### **Adding a New Piece of Content**
To add new content, follow these steps:

1. **Modify `content-data.json`**
   - Add a new JSON object representing the new content file.
   
   #### Example:
   ```json
   {
     "id": "ridloncmr",
     "name": "Ridloncmr",
     "type": "directory",
     "children": [
       {
         "id": "introduction",
         "name": "Introduction.txt",
         "type": "file",
         "contentKey": "Introduction"
       }
     ]
   }
   ```

2. **Create or Modify the Content File**
   - Inside `src/app/data/content-text/`, create a new file (if it doesn’t exist) and define the content as a string.
   
   #### Example: `introduction.ts`
   ```typescript
   export const Introduction: string = `
   👋 Hey, I’m Christian!
   
   I’m an Application Architect who thrives on breaking down complexity, optimizing systems, and delivering clean, scalable solutions...
   `;
   ```

3. **Export the New Content in `content-index.ts`**
   - Add the new content export to `src/app/data/content-text/content-index.ts`.
   
   #### Example:
   ```typescript
   export { Introduction } from './introduction';
   ```

4. **Ensure `contentKey` Matches the Exported Variable**
   - The `contentKey` in `content-data.json` **must match** the exported variable name in `content-index.ts`. 
   - Example: If `contentKey: "Introduction"` is in `content-data.json`, then `export const Introduction` must exist in `content-index.ts`.

---

## 📌 IFileNode Structure
Each file or directory in the content system follows this interface:
```typescript
export interface IFileNode {
  id: string;
  name: string;
  type: 'directory' | 'file' | 'executable' | 'image';
  children?: IFileNode[];
  content?: string;
  isUrl?: boolean;
  contentKey?: string;
}
```

- **`id`**: Unique identifier for the file or directory.
- **`name`**: Display name in the file system.
- **`type`**: Defines whether the node is a `directory`, `file`, or `executable`.
- **`children`**: (Optional) Sub-files or sub-directories.
- **`content`**: (Optional) The actual content (if stored inline).
- **`isUrl`**: (Optional) If `true`, indicates that the file is an external link.
- **`contentKey`**: (Optional) References the associated content in `content-index.ts`.

---

## 🔧 Terminal Commands
The terminal allows users to interact with the file system using commands. Each command is defined in `command-data.ts` and must be registered there to be available in the terminal.

### **Adding a New Command**
To add a new command:

1. **Modify `command-data.ts`**
   - Add a new command object inside the `COMMANDS` array.
   
   #### Example:
   ```typescript
   {
     name: 'newcmd',
     description: 'Description of the new command',
     usage: "newcmd [options]",
     execute: (args, service: CommandService) => {
       service.outputHistory.push('Executing new command...');
     }
   }
   ```

2. **Ensure It Appears in the `help` Command**
   - The `help` command dynamically lists all commands in the `COMMANDS` array, so adding the command here automatically includes it in the help list.

### **Existing Commands**
| Command  | Description | Usage |
|----------|------------|--------|
| `help`   | Lists available commands | `help` |
| `dir`    | Lists files and directories | `dir` |
| `cd`     | Change directory | `cd <folder>` or `cd ..` |
| `open`   | Opens a file | `open <file>` |
| `run`    | Executes a program | `run <program.exe>` |
| `glitch` | Toggles glitch effects | `glitch on \| off` |
| `cls`    | Clears the screen | `cls` |
| `gui`    | Switches to GUI mode | `gui` |

---

