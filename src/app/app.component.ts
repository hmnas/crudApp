import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeService } from './services/employee.service';
import { OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CoreService } from './core/core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = ['id', 'fName', 'lName', 'email', 'gender', 'education', 'dob', 'exp', 'company', 'package', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog,
    private empService: EmployeeService,
    private coreBar: CoreService) { }

  ngOnInit(): void {
    this.getEmployeeList()
  }
  openEmployeeForm() {
    let dialogRef = this.dialog.open(EmployeeComponent)
    dialogRef.afterClosed().subscribe({
      next: (res) => {
        if (res) {
          this.getEmployeeList()
        }
      }
    })
  }
  getEmployeeList() {
    this.empService.getEmployee().subscribe({
      next: (res: any) => {
        console.log(res)
        this.dataSource = new MatTableDataSource(res)
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }

  deleteEmployee(id: any) {
    this.empService.delEmployee(id).subscribe({
      next: (res) => {
        console.log(res)
        this.coreBar.openSackBar('Employee Deleted', 'done')
        this.getEmployeeList()
      },
      error: (err) => { console.log(err) }
    })
  }

  editEmployee(data: any) {
    let dialogRef = this.dialog.open(EmployeeComponent, {
      data,
    })
    dialogRef.afterClosed().subscribe({
      next: (res) => {
        if (res) {
          this.getEmployeeList()
        }
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
