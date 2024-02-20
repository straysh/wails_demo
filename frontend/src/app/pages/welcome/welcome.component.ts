import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {WindowRefService} from '../../service/window-ref.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  cpu_usage: any;

  constructor(
    private winRef: WindowRefService,
    private cd: ChangeDetectorRef  // 注入 ChangeDetectorRef
  ) { }

  ngOnInit() {
    let _this = this;
    console.log(window)
    let _window = this.winRef.nativeWindow;
    // let getCPUUsage = _window["go"]["sys"]["Stats"]["GetCPUUsage"];
    let getCPUUsage = _window.go.sys.Stats.GetCPUUsage;
    getCPUUsage().then((cpu_usage: any) => {
      console.log(cpu_usage);
      _this.cpu_usage = cpu_usage.avg;
    })

    _window.runtime.EventsOn("cpu_usage", (cpu_usage: any) => {
      console.log(cpu_usage);
      _this.cpu_usage = cpu_usage.avg;
      _this.cd.detectChanges();  // 手动触发变更检测
    })
  }

}
