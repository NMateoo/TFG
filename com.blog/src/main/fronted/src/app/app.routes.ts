import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CreateComponent } from './create/create.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { loginGuard } from './guards/login.guard';
import { AllPostComponent } from './all-post/all-post.component';
import { UserPostComponent } from './user-post/user-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { AdminComponent } from './admin/admin.component';

export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
        title: 'Home'
    },
    {
        path: 'login',
        component: LoginComponent,
        title: 'Login'
    },
    {
        path: 'register',
        component: RegisterComponent,
        title: 'Register'
    },
    {
        path: 'create',
        component: CreateComponent,
        title: 'Create',
        canActivate: [loginGuard]
    },
    {
        path: 'post/:titulo',
        component: PostDetailComponent,
        title: 'Post detail'
    },
    {
        path: 'user/:username',
        component: UserDetailComponent,
        title: 'Users',
        canActivate: [loginGuard]
    },
    {
        path: 'posts/:username',
        component: UserPostComponent,
        title: 'All post',
        canActivate: [loginGuard]
    },
    {
        path: 'edit-user/:username',
        component: EditUserComponent,
        title: 'Edit user',
        canActivate: [loginGuard]
    },
    {
        path: 'edit-post/:id',
        component: EditPostComponent,
        title: 'Edit post',
        canActivate: [loginGuard]
    },
    {
        path: 'all',
        component: AllPostComponent,
        title: 'All post'
    },
    {
        path: 'admin',
        component: AdminComponent,
        title: 'Admin'
    },
    {
        path: '**',
        redirectTo: '/home',
    }
];
