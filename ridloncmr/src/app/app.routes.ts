import { Routes } from '@angular/router';
import { TerminalComponent } from './components/terminal/terminal.component';
import { GuiComponent } from './components/gui/gui.component';

export const routes: Routes = [
  { path: '', component: TerminalComponent },
  { path: 'gui', component: GuiComponent } 
];

