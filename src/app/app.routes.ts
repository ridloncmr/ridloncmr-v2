import { Routes } from '@angular/router';
import { TerminalComponent } from './components/terminal/terminal.component';
import { GuiComponent } from './components/gui/gui.component';
import { TerminalPromptComponent } from './components/terminal/terminal-prompt/terminal-prompt.component';
import { ProgramLoaderComponent } from './components/programs/program-loader/program-loader.component';
import { ArticleComponent } from './components/gui/layout/article/article.component';
import { ContactComponent } from './components/gui/main/contact/contact.component';
import { ProjectsComponent } from './components/gui/main/projects/projects.component';
import { StoriesComponent } from './components/gui/main/stories/stories.component';
import { WelcomeComponent } from './components/gui/main/welcome/welcome.component';

export const routes: Routes = [
  {
    path: '',
    component: TerminalComponent,
    children: [
      { path: '', component: TerminalPromptComponent },
      { path: 'program', component: ProgramLoaderComponent },
    ],
  },
  {
    path: '',
    component: GuiComponent,
    children: [
      { path: 'ridloncmr', component: WelcomeComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'projects', component: ProjectsComponent },
      { path: 'stories', component: StoriesComponent },
      { path: 'article/:id', component: ArticleComponent },
    ],
  },
];
