import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { app } from './app/app';
import { routes } from './app/app.routes';

bootstrapApplication(app, {
  providers: [provideRouter(routes)]
}).catch(err => console.error(err));
