import { Routes } from '@angular/router';

/**
 * @note
 * - no guards are added its public access routes
 */

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'app',
        pathMatch: 'full'
    },
    {
        path: 'app',
        loadComponent: () => import('./layout/user-layout/user-layout').then(m => m.UserLayoutComponent),
        children : [
            {
                path: '',
                redirectTo: 'nobel-prize',
                pathMatch: 'full'
            },
            {
                path: 'nobel-prize',
                loadComponent: () => import('./pages/nobel-prize/nobel-prize.page').then(m => m.NobelPrizePageComponent),
            },
            {
                path: 'laureates-profile/:id',
                loadComponent: () => import('./pages/laureates-profile/laureates-profile').then(m => m.LaureatesProfile),
            },
       
        ]
    },
    // {
    //     path: 'app',
    //     admin layout routes      
    // },
    // {
    //     path: 'auth',
    //      admin layout routes      
    // },
];
