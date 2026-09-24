import { Routes } from '@angular/router';
import { Home } from './home/home';
import { StudyBMI } from './study-bmi/study-bmi';

export const routes: Routes = [
    { path: '' , component: Home},
    { path: 'study-bmi', component: StudyBMI }
];
