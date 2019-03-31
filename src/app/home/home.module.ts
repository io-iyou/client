import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'session',
        children: [
          {
            path: '',
            //component: GrabPage,
            loadChildren: './session/session.module#SessionPageModule',
          }
        ]
      },
      {
        path: 'contact',
        children: [
          {
            path: '',
            //component: DefaultPage,
            loadChildren: './contact/contact.module#ContactPageModule',
            data: {
              preload: true
            },
          }
        ]
      },
      {
        path: 'finder',
        children: [
          {
            path: '',
            //component:OngoingPage,
            loadChildren: './finder/finder.module#FinderPageModule'
          }
        ]
      },
      {
        path: 'record',
        children: [
          {
            path: '',
            //component:CertificationPage,
            loadChildren: './record/record.module#RecordPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/home/finder',
        pathMatch: 'full'
      }
    ]
  }
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HomePage]
})
export class HomePageModule { }
