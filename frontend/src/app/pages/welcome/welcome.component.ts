import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {WindowRefService} from '../../service/window-ref.service';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  cpu_usage: any;
  chartOptions: EChartsOption = {
    tooltip: {
      formatter: '{a} <br/>{b} : {c}%'
    },
    series: [
      {
        name: 'Pressure',
        type: 'gauge',
        progress: {
          show: true
        },
        detail: {
          valueAnimation: true,
          formatter: '{value}'
        },
        data: [
          {
            value: 50,
            name: 'SCORE'
          }
        ]
      }
    ]
  };

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
      _this.chartOptions = {
        tooltip: {
          formatter: '{a} <br/>{b} : {c}%'
        },
        series: [
          {
            name: 'Pressure',
            type: 'gauge',
            progress: {
              show: true
            },
            detail: {
              valueAnimation: true,
              formatter: '{value}'
            },
            data: [
              {
                value: cpu_usage.avg,
                name: 'SCORE'
              }
            ]
          }
        ]
      };
      _this.cd.detectChanges();  // 手动触发变更检测
    })
  }

}
