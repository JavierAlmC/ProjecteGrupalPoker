import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-dialog',
  template: `
  <h2 mat-dialog-title>Edit Profile</h2>
  <div mat-dialog-content>
    <form [formGroup]="editProfileForm">
      <mat-form-field>
        <input matInput formControlName="nickname" placeholder="Nickname" />
      </mat-form-field>
      <mat-form-field>
        <input matInput formControlName="nombre" placeholder="Nombre" />
      </mat-form-field>
      <mat-form-field>
        <input matInput formControlName="email" placeholder="Email" />
      </mat-form-field>
    </form>
  </div>
  <div mat-dialog-actions>
    <button mat-button (click)="closeDialog()">Cancel</button>
    <button mat-button color="primary" (click)="saveChanges()">Save Changes</button>
  </div>
`,
  styleUrls: ['./edit-dialog.component.css'],
  imports: [MatFormFieldModule,ReactiveFormsModule],
  standalone: true,
})
export class EditDialogComponent {
  editProfileForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.editProfileForm = this.fb.group({
      nickname: [data.profile.nickname, Validators.required],
      nombre: [data.profile.nombre, Validators.required],
      email: [data.profile.email, [Validators.required, Validators.email]],
    });
  }

  saveChanges(): void {
    if (this.editProfileForm.valid) {
      const updatedProfile = this.editProfileForm.value;
      this.dialogRef.close(updatedProfile);
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}