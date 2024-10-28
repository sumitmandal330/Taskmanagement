import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
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

    // Fill empty spaces after the last day of the month to complete the week
    const totalDays = calendarDays.length;
    const endDay = new Date(year, month, daysInMonth).getDay();
    const remainingDays = 6 - endDay;
    for (let i = 1; i <= remainingDays; i++) {
      calendarDays.push(null);
    }

    this.calendarDays = calendarDays;
  }

  previousMonth(): void {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.generateCalendar(this.currentYear, this.currentMonth);
  }

  nextMonth(): void {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.generateCalendar(this.currentYear, this.currentMonth);
  }

  isToday(day: number | null): boolean {
    if (!day) return false;
    const today = new Date();
    return (
      day === today.getDate() &&
      this.currentMonth === today.getMonth() &&
      this.currentYear === today.getFullYear()
    );
  }

  isSelected(day: number | null): boolean {
    if (!day || !this.selectedDate) return false;
    return (
      day === this.selectedDate.getDate() &&
      this.currentMonth === this.selectedDate.getMonth() &&
      this.currentYear === this.selectedDate.getFullYear()
    );
  }

  selectDate(day: number | null): void {
    if (day) {
      this.selectedDate = new Date(this.currentYear, this.currentMonth, day);
      alert(`You selected: ${this.selectedDate.toDateString()}`);
    }
  }
}
