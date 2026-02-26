import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AeroportiService } from '../service/aeroporti-service';
import { ModelloAeroporto } from '../modello/modello-aeroporto';

@Component({
  selector: 'app-lista-aeroporti',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './lista-aeroporti.html',
  styleUrls: ['./lista-aeroporti.scss']
})
export class ListaAeroporti implements OnInit {
  private aeroportiService = inject(AeroportiService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  displayedColumns: string[] = [
    'icao',
    'iata', 
    'nome',
    'citta',
    'nazione',
    'coordinate',
    'actions'
  ];

  dataSource!: MatTableDataSource<ModelloAeroporto>;
  isLoading = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.loadAeroporti();
  }

  loadAeroporti(): void {
    this.isLoading = true;
    this.aeroportiService.getAeroporti().subscribe({
      next: (data) => {
        console.log('data: ' + data[0].nome);
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        
        // Configurazione filtro personalizzato per cercare su più colonne
        this.dataSource.filterPredicate = (data: ModelloAeroporto, filter: string) => {
          const searchStr = filter.toLowerCase();
          return data.icao?.toLowerCase().includes(searchStr) ||
                 data.iata?.toLowerCase().includes(searchStr) ||
                 data.nome?.toLowerCase().includes(searchStr) ||
                 data.citta?.toLowerCase().includes(searchStr) ||
                 data.nazione?.toLowerCase().includes(searchStr);
        };
        
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Errore nel caricamento aeroporti:', error);
        this.snackBar.open('Errore nel caricamento degli aeroporti', 'Chiudi', {
          duration: 3000
        });
        this.isLoading = false;
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onEdit(aeroporto: ModelloAeroporto): void {
    // TODO: Aprire dialog di modifica (implementeremo dopo)
    console.log('Edit aeroporto:', aeroporto);
  }

  onDelete(aeroporto: ModelloAeroporto): void {
    if (confirm(`Sei sicuro di voler eliminare l'aeroporto ${aeroporto.nome}?`)) {
      this.aeroportiService.deleteAeroporto(aeroporto.id).subscribe({
        next: () => {
          this.snackBar.open('Aeroporto eliminato con successo', 'Chiudi', {
            duration: 3000
          });
          this.loadAeroporti();
        },
        error: (error) => {
          console.error('Errore nell\'eliminazione:', error);
          this.snackBar.open('Errore nell\'eliminazione dell\'aeroporto', 'Chiudi', {
            duration: 3000
          });
        }
      });
    }
  }

  onViewMap(aeroporto: ModelloAeroporto): void {
    if (aeroporto.coordinate) {
      // TODO: Aprire dialog con mappa (implementeremo dopo)
      console.log('View map:', aeroporto);
    } else {
      this.snackBar.open('Coordinate non disponibili per questo aeroporto', 'Chiudi', {
        duration: 3000
      });
    }
  }

  hasCoordinates(aeroporto: ModelloAeroporto): boolean {
    return !!(aeroporto.coordinate);
  }
}
