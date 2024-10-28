import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  currentYear: number;
  currentMonth: number;
  selectedDate: Date | null = null;
  calendarDays: (number | null)[] = [];
  monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  constructor() {
    const today = new Date();
    this.currentYear = today.getFullYear();
    this.currentMonth = today.getMonth();
  }

  ngOnInit(): void {
    this.generateCalendar(this.currentYear, this.currentMonth);
  }

  generateCalendar(year: number, month: number): void {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const calendarDays: (number | null)[] = [];

    // Fill initial empty spaces before the 1st of the month
    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(null);
    }

    // Fill the actual days
    for (let day = 1; day <= daysInMonth; day++) {
      calendarDays.push(day);
    }

    this.calendarDays = calendarDays;
  }

  // Move to the previous month
  previousMonth(): void {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.generateCalendar(this.currentYear, this.currentMonth);
  }

  // Move to the next month
  nextMonth(): void {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.generateCalendar(this.currentYear, this.currentMonth);
  }

  // Highlight today's date
  isToday(day: number | null): boolean {
    if (!day) return false;
    const today = new Date();
    return (
      day === today.getDate() &&
      this.currentMonth === today.getMonth() &&
      this.currentYear === today.getFullYear()
    );
  }

  // Remove past date disabling
  selectDate(day: number | null): void {
    if (day) {
      this.selectedDate = new Date(this.currentYear, this.currentMonth, day);
      alert(`You selected: ${this.selectedDate.toDateString()}`);
    }
  }
}
