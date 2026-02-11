import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  @Input() isMobile = false;
  @Output() menuToggle = new EventEmitter<void>();
  
  private router = inject(Router);
  
  goHome() {
    this.router.navigate(['/dashboard']);
  }
  
  logout() {
    console.log('Logout clicked');
    this.router.navigate(['/login']);
  }
}
