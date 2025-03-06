import { FileNode } from "../core/models/file-node.model";


export const CONTENT_DATA: FileNode[] = [
  new FileNode('welcome', 'Welcome', 'directory', undefined, false, [
    new FileNode('introduction', 'Introduction.txt', 'file', "Welcome to my personal site! You can explore sections using `cd` and `dir` commands.")
  ]),
  new FileNode('welcome2', 'Welcome2', 'directory', undefined, false, [
    new FileNode('introduction', 'Introduction.txt', 'file', "Welcome to my personal site! You can explore sections using `cd` and `dir` commands.")
  ]),
  new FileNode('stories', 'Stories', 'directory', undefined, false, [
    new FileNode('glitched-out', 'GlitchedOut.txt', 'file', "GlitchedOut is a horror ARG about a world consumed by glitches and anomalies."),
    new FileNode('sky-pirates', 'SkyPirates.txt', 'file', "Sky Pirates is a steampunk adventure set in a dying world where airships rule the skies.")
  ]),
  new FileNode('projects', 'Projects', 'directory', undefined, false, [
    new FileNode('playball', 'PlayBall.txt', 'file', "PlayBall.gg is a modern rec league management SaaS focused on frictionless game organization."),
    new FileNode('arg', 'ARG.txt', 'file', "Developing an interactive horror ARG experience built around the GlitchedOut universe.")
  ]),
  new FileNode('contact', 'Contact', 'directory', undefined, false, [
    new FileNode('linkedin', 'LinkedIn.url', 'file', "https://linkedin.com", true),
    new FileNode('github', 'GitHub.url', 'file', "https://github.com", true),
    new FileNode('email', 'Email.txt', 'file', "You can reach me at me@example.com.")
  ])
];
