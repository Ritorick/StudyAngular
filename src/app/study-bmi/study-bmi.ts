import { Component, signal, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { BmiApiService } from '../services/bmi-api.service';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-study-bmi',
  imports: [RouterLink, ReactiveFormsModule,BaseChartDirective],
  templateUrl: './study-bmi.html',
  styleUrl: './study-bmi.css',
})

export class StudyBMI implements OnInit {
  constructor(
    private bmiApi: BmiApiService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}
  protected readonly title = signal('hello-world-app');

  bmi: number = 0;
  height: number = 0;
  weight: number = 0;
  assessment: String = "";
  color = 'white';

  user_id:number = 0;

  loadRecords(): void {
    this.bmiApi.getRecords(30, this.user_id).subscribe({
      next: result => {
        console.log(result);
        this.chartData = {
          labels: result.map(record => {
            const date = new Date(record.created_at);
            return `${date.getMonth()+1}/${date.getDate()}`
          }),
          datasets: [
            {
              data: result.map(record => record.bmi),
              label: 'BMI',
              tension: 0.4
            }
          ]
        };
        this.cdr.detectChanges();
      },
      error: error => {
        console.error(error);
      }
    });
  }

  postRecord(user_id:number, height:number, weight:number):void {
    this.bmiApi.addRecord(
      user_id,
      height,
      weight
    ).subscribe({
      next: result => {
        console.log('POST成功:', result);
        this.loadRecords();
      },
      error: error => {
        console.error('POST失敗:', error);
      }
    });
  }

  ngOnInit(): void {
    this.user_id = Number(this.route.snapshot.paramMap.get("user_id"));
    this.loadRecords();
  }

  abs(value:number) {
    return Math.abs(value);
  }

  BMIDataInputForm = new FormGroup({
    weight: new FormControl('', [
      Validators.required
    ]),
    height : new FormControl('', [
      Validators.required
    ])
  });

  chartData: ChartData<'line'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'BMI',
        tension: 0.4
      }
    ]
  };
  chartOptions: ChartOptions<'line'> = {
    responsive: true
  };

  onSubmit() {
    const weight = Number(this.BMIDataInputForm.value.weight);
    const height = Number(this.BMIDataInputForm.value.height);

    this.bmi = Number((weight / ((height / 100) ** 2)).toFixed(1));

    this.height = height;
    this.weight = weight;
    if (this.bmi >= 40) {
      this.assessment = "肥満(4度)";
      this.color = 'darkred'
    } else if (this.bmi >= 35) {
      this.assessment = "肥満(3度)";
      this.color = 'red'
    } else if (this.bmi >= 30) {
      this.assessment = "肥満(2度)";
      this.color = 'orange'
    } else if (this.bmi >= 25) {
      this.assessment = "肥満(1度)";
      this.color = 'gold'
    } else if (this.bmi >= 18.5) {
      this.assessment = "普通体重";
      this.color = 'yellowgreen'
    } else {
      this.assessment = "低体重";
      this.color = 'blue'
    }

    this.postRecord(this.user_id, height, weight);
    this.loadRecords();
    this.cdr.detectChanges();
  }
}