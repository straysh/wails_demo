import { NgModule } from '@angular/core';

import { WelcomeRoutingModule } from './welcome-routing.module';

import { WelcomeComponent } from './welcome.component';
import {WindowRefService} from '../../service/window-ref.service';
import {NzProgressModule} from 'ng-zorro-antd/progress';


@NgModule({
  imports: [
    WelcomeRoutingModule,
    NzProgressModule,
  ],
  declarations: [WelcomeComponent],
  exports: [WelcomeComponent],
  providers: [
    WindowRefService,
  ],
})
export class WelcomeModule { }
