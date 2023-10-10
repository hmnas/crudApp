import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  education: string[] = [
    'Matric', 'Diploma', 'Intermediate', 'Graduate', 'Post Graduate'
  ]
  empForm !: FormGroup
  constructor(private fbuilder: FormBuilder,
    private empService: EmployeeService,
    private dialogRef: MatDialogRef<EmployeeComponent>,
    private coreBar: CoreService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.empForm = this.fbuilder.group({
      fName: '',
      lName: '',
      email: '',
      education: '',
      dob: '',
      gender: '',
      exp: '',
      company: '',
      package: ''
    })
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data)
  }

  onFormSubmit() {
    if (this.data) {
      if (this.empForm.valid) {
        console.log(this.empForm.value)
        this.empService.updateEmployee(this.data.id, this.empForm.value).subscribe({
          next: (val: any) => {
            this.coreBar.openSackBar('Employee Updated', 'done')
            this.dialogRef.close(true)
          },
          error: (err: any) => {
            console.log(err);
          }
        })
      }
    }
    else {
      if (this.empForm.valid) {
        console.log(this.empForm.value)
        this.empService.addEmployee(this.empForm.value).subscribe({
          next: (val: any) => {
            console.log(val)
            this.coreBar.openSackBar('Employee Added', 'done')
            this.dialogRef.close(true)
          },
          error: (err: any) => {
            console.log(err);
          }
        })
      }
    }


  }
}
