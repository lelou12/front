import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'; // Import the logout icon
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-bus',
  templateUrl: './bus.component.html',
  styleUrls: ['./bus.component.css']
})
export class BusComponent {
  BusArray: any[] = [];

  name: string = "";
  matricule: string = "";

  currentBusID = "";

  faSignOutAlt = faSignOutAlt; // Assign the logout icon to a property

  constructor(private http: HttpClient, private router: Router, private library: FaIconLibrary) {
    this.library.addIcons(faSignOutAlt); // Add the icon to the library
    this.getAllBus();
  }

  saveRecords() {
    let bodyData = {
      "name": this.name,
      "matricule": this.matricule
    };

    this.http.post("http://127.0.0.1:8000/api/bus", bodyData).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Bus Registered Successfully");
      this.getAllBus();
    });
  }

  getAllBus() {
    this.http.get("http://127.0.0.1:8000/api/bus")
      .subscribe((resultData: any) => {
        console.log(resultData);
        this.BusArray = resultData;
        this.name = '';
        this.matricule = '';
      });
  }

  setUpdate(data: any) {
    this.name = data.name;
    this.matricule = data.matricule;
    this.currentBusID = data.id;
  }

  UpdateRecords() {
    let bodyData = {
      "name": this.name,
      "matricule": this.matricule
    };

    this.http.put("http://127.0.0.1:8000/api/bus/" + this.currentBusID, bodyData).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Bus Registered Updated");
      this.name = '';
      this.matricule = '';
      this.getAllBus();
    });
  }

  setDelete(data: any) {
    this.http.delete("http://127.0.0.1:8000/api/bus" + "/" + data.id).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Bus Deleted");
      this.getAllBus();
    });
  }

  logout() {
    // Clear any user data or tokens if stored
    localStorage.removeItem('userToken');
    // Redirect to home page
    this.router.navigate(['/home']);
  }
}
