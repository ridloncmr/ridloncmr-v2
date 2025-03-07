import { Routes } from '@angular/router';
import { TerminalComponent } from './components/terminal/terminal.component';
import { GuiComponent } from './components/gui/gui.component';
import { TerminalPromptComponent } from './components/terminal/terminal-prompt/terminal-prompt.component';
import { ProgramLoaderComponent } from './components/programs/program-loader/program-loader.component';

export const routes: Routes = [
  {
    path: '', 
    component: TerminalComponent,
    children: [
      { path: '', component: TerminalPromptComponent },
      { path: 'program', component: ProgramLoaderComponent },
    ]
  },
  { path: 'gui', component: GuiComponent } 
];

