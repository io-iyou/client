import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'finder', loadChildren: './home/finder/finder.module#FinderPageModule' },
  { path: 'record', loadChildren: './home/record/record.module#RecordPageModule' },
  { path: 'contact', loadChildren: './home/contact/contact.module#ContactPageModule' },
  { path: 'session', loadChildren: './home/session/session.module#SessionPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
