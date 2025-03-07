import { Routes } from '@angular/router';
import { TerminalComponent } from './components/terminal/terminal.component';
import { GuiComponent } from './components/gui/gui.component';
import { TerminalPromptComponent } from './components/terminal/terminal-prompt/terminal-prompt.component';

export const routes: Routes = [
  {
    path: '', 
    component: TerminalComponent,
    children: [
      { path: '', component: TerminalPromptComponent }
    ]
  },
  { path: 'gui', component: GuiComponent } 
];

