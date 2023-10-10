import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  addEmployee(data: any) {
    return this.http.post('http://localhost:3000/employes', data)
  }
  getEmployee() {
    return this.http.get('http://localhost:3000/employes')
  }
  delEmployee(id: any) {
    return this.http.delete(`http://localhost:3000/employes/${id}`)

  }
  updateEmployee(id: number, data: any) {
    return this.http.put(`http://localhost:3000/employes/${id}`, data)
  }
}
