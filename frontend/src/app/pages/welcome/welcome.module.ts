import { NgModule } from '@angular/core';

import { WelcomeRoutingModule } from './welcome-routing.module';

import { WelcomeComponent } from './welcome.component';
import {WindowRefService} from '../../service/window-ref.service';
import {NzProgressModule} from 'ng-zorro-antd/progress';
import {NgxEchartsModule} from 'ngx-echarts';
import * as echarts from 'echarts';


@NgModule({
  imports: [
    WelcomeRoutingModule,
    NzProgressModule,
    NgxEchartsModule.forRoot({
      echarts,
    }),
  ],
  declarations: [WelcomeComponent],
  exports: [WelcomeComponent],
  providers: [
    WindowRefService,
  ],
})
export class WelcomeModule { }
