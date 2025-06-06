import { Routes } from '@angular/router';
import { DescriptionComponent } from './module/description/description.component';

const Paths = {
    EMPTY: '',
    DESCRIPTION: 'description',
    PLAYGROUND: 'playground',
    ALL: '**'
} as const;

export const routes: Routes = [
    {
        path: Paths.EMPTY,
        pathMatch: 'full',
        redirectTo: Paths.DESCRIPTION
    },
    {
        path: Paths.DESCRIPTION,
        pathMatch: 'full',
        component: DescriptionComponent
    },
    {
        path: Paths.PLAYGROUND,
        pathMatch: 'full',
        component: DescriptionComponent
    },
    {
        path: Paths.ALL,
        component: DescriptionComponent
    }
];
