import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { AppService } from '../app.service';
import { BudgetComponent } from '../budget/budget.component';
import { Budget } from '../models/budget';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  budgets: Budget[] = [];
  displayedColumns: string[] = ['budgetCodeId', 'fiscalYear', 'budgetCode', 'budgetTitle','extra'];
  dataSource: MatTableDataSource<Budget>;
  constructor(private appService: AppService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.appService.getAllRequest('all').subscribe(res => {
      if (res) {
        this.budgets = res.data;
        this.dataSource = new MatTableDataSource(this.budgets);
      }
    }, error => {
      console.log('error while fetching the budgets');
    });
  }

  addBudget() {
    const dialogRef = this.dialog.open(BudgetComponent, {
      width: '50%',
      height: '50%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result:', result);
      if (result) {
        this.budgets.push(result.data);
        this.dataSource = new MatTableDataSource(this.budgets);
      }
    });
  }

  viewBudget(budget: Budget) {
    const dialogRef = this.dialog.open(BudgetComponent, {
      width: '50%',
      height: '50%',
      data: budget
    });
  }


}
