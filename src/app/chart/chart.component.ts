import { Component, Input, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [CanvasJSAngularChartsModule],
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnChanges {
  @Input() toDoCount: number = 0;
  @Input() inProgressCount: number = 0;
  @Input() completedCount: number = 0;
  @Input() selectedDay: string = 'Weekly'; // Input for selected filter

  chartOptions: any;
  dataPointsToDo: any[] = [];
  dataPointsInProgress: any[] = [];
  dataPointsCompleted: any[] = [];

  daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['toDoCount'] || changes['inProgressCount'] || changes['completedCount'] || changes['selectedDay']) {
      this.updateChartData();
      this.updateChartOptions();
      this.cdr.detectChanges(); // Ensure Angular detects changes
    }
  }

  // Update data points based on the selected day or filter
  updateChartData() {
    this.clearDataPoints();

    if (this.selectedDay === 'Weekly') {
      this.initializeWeeklyDataPoints();
    } else {
      this.initializeDailyDataPoints();
    }
  }

  clearDataPoints() {
    this.dataPointsToDo = [];
    this.dataPointsInProgress = [];
    this.dataPointsCompleted = [];
  }

  initializeWeeklyDataPoints() {
    const today = new Date();
    const todayDay = today.getDay(); // Current day index (0 for Sunday, etc.)

    for (let i = 0; i < 7; i++) {
      const dayIndex = (todayDay + i) % 7;
      this.dataPointsToDo.push({
        x: i,
        y: i === todayDay ? this.toDoCount : 0
      });
      this.dataPointsInProgress.push({
        x: i,
        y: i === todayDay ? this.inProgressCount : 0
      });
      this.dataPointsCompleted.push({
        x: i,
        y: i === todayDay ? this.completedCount : 0
      });
    }
  }

  initializeDailyDataPoints() {
    const dayIndex = this.daysOfWeek.indexOf(this.selectedDay);

    if (dayIndex > -1) {
      this.dataPointsToDo = [{ x: dayIndex, y: this.toDoCount }];
      this.dataPointsInProgress = [{ x: dayIndex, y: this.inProgressCount }];
      this.dataPointsCompleted = [{ x: dayIndex, y: this.completedCount }];
    }
  }

  updateChartOptions() {
    this.chartOptions = {
      animationEnabled: true,
      theme: "light2",
      title: {
        text: "Task Status Overview"
      },
      axisX: {
        title: "Days of the Week",
        interval: 1,
        labelFormatter: (e: any) => this.daysOfWeek[e.value], // Map X values (0-6) to day names
      },
      axisY: {
        title: "Number of Tasks",
        minimum: 0
      },
      toolTip: {
        shared: true
      },
      legend: {
        cursor: "pointer",
        itemclick: function (e: any) {
          if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
          } else {
            e.dataSeries.visible = true;
          }
          e.chart.render();
        }
      },
      data: [
        {
          type: "column",
          showInLegend: true,
          name: "To-do",
          dataPoints: this.dataPointsToDo
        },
        {
          type: "column",
          showInLegend: true,
          name: "In Progress",
          dataPoints: this.dataPointsInProgress
        },
        {
          type: "column",
          showInLegend: true,
          name: "Completed",
          dataPoints: this.dataPointsCompleted
        }
      ]
    };
  }
}
