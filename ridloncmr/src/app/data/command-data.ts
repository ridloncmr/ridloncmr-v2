import { Command } from "../core/models/command.model";
import { CommandService } from "../core/services/command.service";


export const COMMANDS: Command[] = [
  {
    name: 'help',
    description: 'Lists available commands',
    execute: (args, service: CommandService) => {
      service.outputHistory.push(
        'Commands: ' + COMMANDS.map((cmd) => cmd.name).join(', ')
      );
    },
  },
  {
    name: 'dir',
    description: 'Lists files and directories in the current path',
    execute: (args, service: CommandService) => {
      const location = service.getCurrentLocation();

      const getRandomDate = () => {
        const now = new Date();
        const past = new Date(now.getFullYear() - Math.floor(Math.random() * 5), Math.random() * 12, Math.random() * 28);
        return past.toLocaleDateString('en-US') + ' ' + past.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
      };

      const formatSize = (size: number) => size.toLocaleString(); // Format file sizes like CMD

      // 🔥 Ensure alignment by defining column widths
      const DATE_WIDTH = 22;
      const DIR_WIDTH = 10;
      const SIZE_WIDTH = 15;
      const NAME_WIDTH = 25; // Adjust as needed

      // Function to pad values for alignment
      const padRight = (text: string, width: number) => text.padEnd(width, ' ');
      const padLeft = (text: string, width: number) => text.padStart(width, ' ');

      let output = '';

      // Header with a horizontal rule
      output += `Date Modified${' '.repeat(DATE_WIDTH - 12)} Type       Size${' '.repeat(SIZE_WIDTH - 4)} Name\n`;
      output += `------------------------------------------------------------\n`;

      // Always show `.` and `..` for navigation
      output += `${padRight(getRandomDate(), DATE_WIDTH)} ${padRight('<DIR>', DIR_WIDTH)} ${''.padStart(SIZE_WIDTH, ' ')} ${padRight('.', NAME_WIDTH)}\n`;
      output += `${padRight(getRandomDate(), DATE_WIDTH)} ${padRight('<DIR>', DIR_WIDTH)} ${''.padStart(SIZE_WIDTH, ' ')} ${padRight('..', NAME_WIDTH)}\n`;

      location.forEach(item => {
        const date = getRandomDate();
        if (item.type === 'directory') {
          output += `${padRight(date, DATE_WIDTH)} ${padRight('<DIR>', DIR_WIDTH)} ${''.padStart(SIZE_WIDTH, ' ')} ${padRight(item.name, NAME_WIDTH)}\n`;
        } else {
          const fileSize = Math.floor(Math.random() * 500000) + 1000; // Fake file sizes
          output += `${padRight(date, DATE_WIDTH)} ${''.padStart(DIR_WIDTH, ' ')} ${padLeft(formatSize(fileSize), SIZE_WIDTH)} ${padRight(item.name, NAME_WIDTH)}\n`;
        }
      });

      service.outputHistory.push(output.trim());
    },
  },
  {
    name: 'cd',
    description: 'Change directory',
    execute: (args, service: CommandService) => {
      if (!args.length) {
        service.outputHistory.push('Usage: cd <folder>');
        return;
      }

      const folder = args[0].toLowerCase(); // Convert input to lowercase
      const location = service.getCurrentLocation();
      const folderNode = location.find(
        (item) => item.id.toLowerCase() === folder && item.type === 'directory'
      );

      if (folder === '..') {
        if (service.currentPath.length > 0) service.currentPath.pop();
      } else if (folderNode) {
        service.currentPath.push(folderNode.id); // Use original casing
      } else {
        service.outputHistory.push(`No such directory: ${folder}`);
      }
    },
    autoComplete: (args, location) => {
      return location
        .filter((item) => item.type === 'directory')
        .map((item) => item.id)
        .filter((name) =>
          args[0] ? name.toLowerCase().startsWith(args[0].toLowerCase()) : true
        ); // Suggest all on empty input
    },
  },
  {
    name: 'open',
    description: 'Opens a file',
    execute: (args, service: CommandService) => {
      if (!args.length) {
        service.outputHistory.push('Usage: open <file>');
        return;
      }

      const fileName = args[0].toLowerCase();
      const location = service.getCurrentLocation();
      const fileNode = location.find(
        (item) => item.name.toLowerCase() === fileName && item.type === 'file'
      );

      if (fileNode) {
        if (fileNode.isUrl) {
          window.open(fileNode.content, '_blank');
        } else {
          service.outputHistory.push(
            fileNode.content ?? 'No content available.'
          );
        }
      } else {
        service.outputHistory.push(`No such file: ${fileName}`);
      }
    },
    autoComplete: (args, location) => {
      return location
        .filter((item) => item.type === 'file')
        .map((item) => item.name)
        .filter((name) =>
          args[0] ? name.toLowerCase().startsWith(args[0].toLowerCase()) : true
        ); // Suggest all on empty input
    },
  },
  {
    name: 'glitch',
    description: 'Toggles glitch effects (on/off)',
    execute: (args, service: CommandService) => {
      if (!args.length) {
        service.outputHistory.push("Usage: glitch <on|off>");
        return;
      }

      const option = args[0].toLowerCase();
      if (option === "off") {
        service.disableGlitchEffects();
        service.outputHistory.push("Glitch effects disabled.");
      } else if (option === "on") {
        service.enableGlitchEffects();
        service.outputHistory.push("Glitch effects enabled.");
      } else {
        service.outputHistory.push("Invalid option. Use: glitch <on|off>");
      }
    }
  },
  {
    name: 'cls',
    description: 'Clear Screen',
    execute: (args, service: CommandService) => {
      service.outputHistory.splice(0, service.outputHistory.length);
    },
  },
  {
    name: 'gui',
    description: 'Switch to GUI mode',
    execute: (args, service: CommandService) => {
      service.router.navigate(['/gui']);
    },
  },
  {
    name: 'terminal',
    description: 'Switch to Terminal mode',
    execute: (args, service: CommandService) => {
      service.router.navigate(['/terminal']);
    },
  },
];
