import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html', // Chemin correspondant au fichier HTML
  styleUrls: ['./crud.component.css']
})
export class CrudComponent {
  faSignOutAlt = faSignOutAlt;

  EmployeeArray: any[] = [];
  name: string = "";
  address: string = "";
  mobile: number = 0;
  password: string = "";
  isemployer: boolean = false;
  solde: number = 2000; // Solde initial par défaut
  currentEmployeeID: string = "";

  constructor(private http: HttpClient, private router: Router) {
    this.getAllEmployee();
  }

  saveRecords() {
    const bodyData = {
      name: this.name,
      address: this.address,
      mobile: this.mobile,
      password: this.password,
      isemployer: this.isemployer,
      solde: this.solde
    };

    this.http.post("http://127.0.0.1:8000/employe", bodyData).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Employee Registered Successfully");
      this.getAllEmployee();
    }, error => {
      console.error("Error saving employee:", error);
      alert("Failed to register employee. Please try again.");
    });
  }

  getAllEmployee() {
    this.http.get("http://127.0.0.1:8000/employe")
      .subscribe((resultData: any) => {
        this.EmployeeArray = resultData;
        this.EmployeeArray.forEach((employee: any) => {
          employee.commission = (employee.commission || 0) + '%';
        });
        this.resetForm();
      }, error => {
        console.error("Error fetching employees:", error);
        alert("Failed to fetch employee records.");
      });
  }

  finishCourse(employeeID: string) {
    this.http.put(`http://127.0.0.1:8000/api2/employe/${employeeID}/`, {}).subscribe(
      (resultData: any) => {
        alert("Course Finished. Commission Applied.");
        this.getAllEmployee(); // Recharge les employés après la mise à jour
      },
      error => {
        console.error("Error finishing course:", error);
        alert("Failed to finish course. Please check your input and try again.");
      }
    );
}

  

  setUpdate(data: any) {
    this.name = data.name;
    this.address = data.address;
    this.mobile = data.mobile;
    this.password = data.password;
    this.isemployer = data.isemployer;
    this.solde = data.solde;
    this.currentEmployeeID = data.id;
  }

  UpdateRecords() {
    const bodyData = {
      name: this.name,
      address: this.address,
      mobile: this.mobile,
      password: this.password,
      isemployer: this.isemployer,
      solde: this.solde
    };

    this.http.put(`http://127.0.0.1:8000/employe/${this.currentEmployeeID}`, bodyData).subscribe((resultData: any) => {
      alert("Employee Record Updated");
      this.getAllEmployee();
    }, error => {
      console.error("Error updating employee:", error);
      alert("Failed to update employee. Please try again.");
    });
  }

  setDelete(data: any) {
    this.http.delete(`http://127.0.0.1:8000/employe/${data.id}`).subscribe((resultData: any) => {
      alert("Employee Deleted Successfully");
      this.getAllEmployee();
    }, error => {
      console.error("Error deleting employee:", error);
      alert("Failed to delete employee.");
    });
  }

  reduceSolde(employeeID: string) {
    this.http.put(`http://127.0.0.1:8000/employe/${employeeID}/update-balance/`, {}).subscribe((resultData: any) => {
      alert("Employee Solde Reduced Successfully");
      this.getAllEmployee();
    }, error => {
      console.error("Error reducing solde:", error);
      alert("Failed to update solde.");
    });
  }

  logout() {
    localStorage.removeItem('userToken');
    this.router.navigate(['/home']);
  }

  resetForm() {
    this.name = '';
    this.address = '';
    this.mobile = 0;
    this.password = '';
    this.isemployer = false;
    this.solde = 2000; // Reset solde
  }
}
