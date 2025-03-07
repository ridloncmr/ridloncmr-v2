import { FileNode } from "../core/models/file-node.model";
import { BridgeOfDeath } from "./stories/bridge-of-death";
import { GlitchedOut } from "./stories/glitched-out";
import { HungerThatRemains } from "./stories/hunger-that-remains";
import { TheChildWhoSeesTooMuch } from "./stories/the-child-who-sees-too-much";
import { VanishingPoint } from "./stories/vanishing-point";


export const CONTENT_DATA: FileNode[] = [
  new FileNode('welcome', 'Welcome', 'directory', undefined, false, [
    new FileNode('introduction', 'Introduction.txt', 'file', "Welcome to my personal site! You can explore sections using `cd` and `dir` commands.")
  ]),
  new FileNode('welcome2', 'Welcome2', 'directory', undefined, false, [
    new FileNode('introduction', 'Introduction.txt', 'file', "Welcome to my personal site! You can explore sections using `cd` and `dir` commands.")
  ]),
  new FileNode('stories', 'Stories', 'directory', undefined, false, [
    new FileNode('GlitchVerse', 'GlitchVerse', 'directory', undefined, false, [
      new FileNode("glitche-out", "GlitchedOut.txt", "file", GlitchedOut),
      new FileNode("vanishing-point", "VanishingPoint.txt", "file", VanishingPoint),
      new FileNode("the-child-who-sees-too-much", "TheChildWhoSeeTooMuch.txt", "file", TheChildWhoSeesTooMuch),
    ]),
    new FileNode("hunger-that-remains", "HungerThatRemains.txt", "file", HungerThatRemains),
    new FileNode("bridge-of-death", "BridgeOfDeath.txt", "file", BridgeOfDeath),
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
