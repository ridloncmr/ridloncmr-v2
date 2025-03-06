import { Command } from "../core/models/command.model";
import { CommandService } from "../core/services/command.service";


export const COMMANDS: Command[] = [
    {
        name: "help",
        description: "Lists available commands",
        execute: (args, service: CommandService) => {
            service.outputHistory.push("Commands: " + COMMANDS.map(cmd => cmd.name).join(', '));
        }
    },
    {
        name: "dir",
        description: "Lists files and directories in the current path",
        execute: (args, service: CommandService) => {
            const location = service.getCurrentLocation();
            service.outputHistory.push(location.length ? location.map(item => item.name).join('  ') : "No files or folders.");
        }
    },
    {
        name: "cd",
        description: "Change directory",
        execute: (args, service: CommandService) => {
            if (!args.length) {
                service.outputHistory.push("Usage: cd <folder>");
                return;
            }

            const folder = args[0].toLowerCase(); // Convert input to lowercase
            const location = service.getCurrentLocation();
            const folderNode = location.find(item => item.id.toLowerCase() === folder && item.type === 'directory');

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
                .filter(item => item.type === "directory")
                .map(item => item.id)
                .filter(name => args[0] ? name.toLowerCase().startsWith(args[0].toLowerCase()) : true); // Suggest all on empty input
        }
    },
    {
        name: "open",
        description: "Opens a file",
        execute: (args, service: CommandService) => {
            if (!args.length) {
                service.outputHistory.push("Usage: open <file>");
                return;
            }

            const fileName = args[0].toLowerCase();
            const location = service.getCurrentLocation();
            const fileNode = location.find(item => item.name.toLowerCase() === fileName && item.type === 'file');

            if (fileNode) {
                if (fileNode.isUrl) {
                    window.open(fileNode.content, '_blank');
                } else {
                    service.outputHistory.push(fileNode.content ?? "No content available.");
                }
            } else {
                service.outputHistory.push(`No such file: ${fileName}`);
            }
        },
        autoComplete: (args, location) => {
            return location
                .filter(item => item.type === "file")
                .map(item => item.name)
                .filter(name => args[0] ? name.toLowerCase().startsWith(args[0].toLowerCase()) : true); // Suggest all on empty input
        }
    },
    {
        name: "gui",
        description: "Switch to GUI mode",
        execute: (args, service: CommandService) => {
            service.router.navigate(['/gui']);
        }
    },
    {
        name: "terminal",
        description: "Switch to Terminal mode",
        execute: (args, service: CommandService) => {
            service.router.navigate(['/terminal']);
        }
    }
];
