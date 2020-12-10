import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppService } from '../app.service';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {

  budgetForm = this.fb.group({
    budgeCodeId: [this.data ? this.data.budgetCodeId : ''],
    fiscalYear: [this.data ? this.data.fiscalYear : '', [Validators.required]],
    budgetCode: [this.data ? this.data.budgetCode : '', [Validators.required]],
    budgetTitle: [this.data ? this.data.budgetTitle : '', [Validators.required]]
  });

  constructor(public dialogRef: MatDialogRef<BudgetComponent>, private fb: FormBuilder, private appService: AppService,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
    if(this.data) {
      this.budgetForm.disable();
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.budgetForm.controls; }

  onSubmit() {
    if (!this.data) {
      // stop here if form is invalid
      if (this.budgetForm.invalid) {
        console.log('Invalid');
        return;
      }
      this.appService.postRequest('add', this.budgetForm.getRawValue()).subscribe(res => {
        if (res) {
          this.dialogRef.close(res);
        }
      }, error => {
        if (error) {
          console.log(error);
        }
      });
    }
    else {
      this.dialogRef.close();
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
