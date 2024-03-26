import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PostComponent } from './pages/post.component';

export const routes: Routes = [
    {
        path: '', 
        component: AppComponent,
        title: 'mainPage'
    },
    {
        path: 'post',
        component: PostComponent,
        title: 'postPage'
    }
];
