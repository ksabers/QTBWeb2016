import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    // CommonModule rimosso!
    RouterLink,
    RouterLinkActive,
    MatListModule,
    MatIconModule,
    MatDividerModule
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar {
  menuItems = [
    {
      label: 'Dashboard',
      icon: 'dashboard',
      route: '/dashboard'
    },
    {
      label: 'Apri Volo',
      icon: 'flight_takeoff',
      route: '/flights/start'
    },
    {
      label: 'Elenco Voli',
      icon: 'list',
      route: '/flights/list'
    }
  ];
  
  secondaryMenuItems = [
    {
      label: 'Aeromobili',
      icon: 'airplanemode_active',
      route: '/aircraft'
    },
    {
      label: 'Aeroporti',
      icon: 'multiple_airports',
      route: '/lista-aeroporti'
    },
    {
      label: 'Piloti',
      icon: 'people',
      route: '/pilots'
    },
    {
      label: 'Report',
      icon: 'bar_chart',
      route: '/reports'
    }
  ];
}
