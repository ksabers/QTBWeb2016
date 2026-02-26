import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ModelloAeroporto } from '../modello/modello-aeroporto';

@Component({
  selector: 'app-dialog-aeroporti',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule
  ],
  templateUrl: './dialog-aeroporti.html',
  styleUrls: ['./dialog-aeroporti.scss']
})
export class DialogAeroporti {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<DialogAeroporti>);
  readonly data = inject<ModelloAeroporto | null>(MAT_DIALOG_DATA);

  // Determina se siamo in modalità edit o insert
  readonly isEdit = !!this.data;
  readonly dialogTitle = this.isEdit ? 'Modifica Aeroporto' : 'Nuovo Aeroporto';

  form = this.fb.group({
    nome: [this.data?.nome || '', Validators.required],
    denominazione: [this.data?.denominazione || ''],
    idTipoAeroporto: [this.data?.idTipoAeroporto || 1, Validators.required],
    identificativo: [this.data?.identificativo || ''],
    coordinate: [this.data?.coordinate || ''],
    icao: [this.data?.icao || ''],
    iata: [this.data?.iata || ''],
    qnh: [this.data?.qnh || null],
    qfu: [this.data?.qfu || ''],
    asfalto: [this.data?.asfalto || false],
    lunghezza: [this.data?.lunghezza || null],
    radio: [this.data?.radio || ''],
    indirizzo: [this.data?.indirizzo || ''],
    cap: [this.data?.cap || ''],
    citta: [this.data?.citta || ''],
    provincia: [this.data?.provincia || ''],
    nazione: [this.data?.nazione || ''],
    telefono: [this.data?.telefono || ''],
    email: [this.data?.email || '', Validators.email],
    web: [this.data?.web || ''],
    note: [this.data?.note || '']
  });

  onSave(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const result = {
      ...this.data, // mantiene id se in edit
      ...this.form.value
    };

    this.dialogRef.close(result);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
