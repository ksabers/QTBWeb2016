import { Component, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    DatePipe
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {
  totalFlights = signal(0);
  totalHours = signal(0);
  lastFlightDate = signal<Date | null>(null);

  constructor() {
    this.totalFlights.set(42);
    this.totalHours.set(87);
    this.lastFlightDate.set(new Date(2026, 0, 15));
  }
}
