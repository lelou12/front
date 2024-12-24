import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: '',
      password: ''
    });
  }

  submit(): void {
    const loginData = this.form.getRawValue();
  
    // Vérification de l'email dans l'API check-admin
    this.http.post('http://127.0.0.1:8000/api/check-admin/', { email: loginData.email, password: loginData.password })
      .subscribe({
        next: (response: any) => {
          if (response.is_admin) {
            // Si l'email est admin
            this.router.navigate(['/adminpage']);
          } else {
            // Sinon, tentative de connexion normale
            this.http.post('http://127.0.0.1:8000/api/login/', loginData, { withCredentials: true })
              .subscribe({
                next: () => {
                  // Redirection utilisateur normal
                  this.router.navigate(['/home']);
                },
                error: (err) => {
                  console.error(err);
                  alert('Erreur lors de la connexion. Veuillez vérifier vos identifiants.');
                }
              });
          }
        },
        error: (err) => {
          console.error('Erreur API check-admin:', err);
          alert('Erreur lors de la vérification de l\'email. Veuillez réessayer.');
        }
      });
  }
  
}
