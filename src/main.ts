import { bootstrapApplication } from '@angular/platform-browser';
import { mainConfig } from './main/main.config';
import { Main } from './main/main.component';

bootstrapApplication(Main, mainConfig)
    .catch((err) => console.error(err));
