import { Routes } from '@angular/router';
import { Home } from './home/home';
import { StudyBMI } from './study-bmi/study-bmi';
import { Register } from './register/register';

export const routes: Routes = [
    { path: '' , component: Home },
    { path: 'study-bmi/:user_id', component: StudyBMI },
    { path: 'register' , component: Register }
];
