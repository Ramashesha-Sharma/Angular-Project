import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeModel } from './employee-dashboard.model';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  formValue !:FormGroup;
  employeeModelObj:EmployeeModel=new EmployeeModel();
  employeeData!:any;
  showAdd:boolean=true;
  showUpdate:boolean=true;
  constructor(private formbuilder: FormBuilder, private api:ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      name: [''],
      email: [''],
      mobile: [''],
      salary: ['']
    })
    this.getAllEmployee();
  }
  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false; 
  }
  postEmpolyeeDetails(){
    this.employeeModelObj.name=this.formValue.value.name;
    this.employeeModelObj.mobile=this.formValue.value.mobile;
    this.employeeModelObj.email=this.formValue.value.email;
    this.employeeModelObj.salary=this.formValue.value.salary;

    this.api.postEmployee(this.employeeModelObj).subscribe(res=>{
      console.log(res);
      alert("Employee added succesfully");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    },
    err=>{
      alert("something went wrong");
    })
  }


  getAllEmployee(){
   this.api.getEmployee().subscribe(res=>{
    this.employeeData=res;
   }) 
  }

  deleteEmployeeData(row:number){
    console.log(row);
    this.api.deleteEmployee(row).subscribe(res=>{
      alert("Employee deleted");
      this.getAllEmployee(); 
    })
  }

  onEdit(row:any){
    this.showAdd=false;
    this.showUpdate=true;
    this.employeeModelObj = row;
    this.formValue.controls['name'].setValue(row.name);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['salary'].setValue(row.salary);
    
    console.log(this.employeeModelObj);
    console.log(this.employeeModelObj.id);
  }

  updateEmpolyeeDetails(){
    this.employeeModelObj.name=this.formValue.value.name;
    this.employeeModelObj.mobile=this.formValue.value.mobile;
    this.employeeModelObj.email=this.formValue.value.email;
    this.employeeModelObj.salary=this.formValue.value.salary;
    
    console.log(this.employeeModelObj);
    console.log(this.employeeModelObj.id);
    
    this.api.updateEmployee(this.employeeModelObj,this.employeeModelObj.id).subscribe(res=>{
      alert("update succesfull");
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    })
  }

}
