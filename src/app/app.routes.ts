import { Routes } from '@angular/router';
import { CalendarComponent } from '@syncfusion/ej2-angular-calendars';
import { CenterbarComponent } from './centerbar/centerbar.component';
import { ChartComponent } from './chart/chart.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { ShowTaskComponent } from './show-task/show-task.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidenavbarComponent } from './sidenavbar/sidenavbar.component';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { NotificationComponent } from './notification/notification.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'app-login',
        pathMatch: 'full'
    },
    {
        path: 'app-login',
        component: LoginComponent
    },
    {
        path: 'app-layout',
        component: LayoutComponent,
        canActivate: [authGuard]
    },
       
    {
        path: 'app-calendar',
        component: CalendarComponent,
        canActivate: [authGuard]
    },
            {
                path: 'app-centerbar',
                component: CenterbarComponent,
        canActivate: [authGuard]
            },
            {
                path: 'app-chart',
                component: ChartComponent,
        canActivate: [authGuard]
            },
            {
                path: 'app-create-task',
                component: CreateTaskComponent,
        canActivate: [authGuard]
            },
            {
                path: 'app-show-task',
                component: ShowTaskComponent,
        canActivate: [authGuard]
            },
            {
                path: 'app-sidebar',
                component: SidebarComponent,
        canActivate: [authGuard]
            },
            {
                path: 'app-sidenavbar',
                component: SidenavbarComponent,
        canActivate: [authGuard]
            },

            {
                path:'app-notification',
                component: NotificationComponent ,
                canActivate: [authGuard]
            },

            {
                path:'app-notification',
                component:NotificationComponent,
                canActivate: [authGuard]
            },
            {
                path: 'app-dashboard',
                component:DashboardComponent ,
                canActivate: [authGuard]
            },
            
        
        ];
    
    

