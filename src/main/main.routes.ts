import { Routes } from '@angular/router';
import { DescriptionComponent } from './module/description/description.component';
import { PlaygroundComponent } from './module/playground/playground.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'description'
    },
    {
        path: 'description',
        pathMatch: 'full',
        component: DescriptionComponent
    },
    {
        path: 'playground',
        pathMatch: 'full',
        component: PlaygroundComponent
    },
    {
        path: 'reference',
        pathMatch: 'full',
        component: DescriptionComponent
    },
    {
        path: '**',
        component: DescriptionComponent
    }
];
