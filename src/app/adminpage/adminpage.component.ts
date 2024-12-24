import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css']
})
export class AdminpageComponent {
  faSignOutAlt = faSignOutAlt; // Icône de déconnexion

  AdminArray: any[] = [];
  name: string = "";
  address: string = "";
  mobile: number = 0;
  email: string = "";  // Nouveau champ pour l'email
  password: string = "";  // Nouveau champ pour le mot de passe
  currentAdminID: string | null = null;  // Changement de type pour permettre la vérification

  constructor(private http: HttpClient, private router: Router) {
    this.getAllAdmin();
  }

  saveRecords() {
    // Vérification de la longueur du numéro de téléphone (mobile)
    if (this.mobile.toString().length !== 8) {
      alert('Le numéro de téléphone doit être exactement de 8 chiffres.');
      return; // Arrêter l'exécution si la validation échoue
    }

    const bodyData = {
      name: this.name,
      address: this.address,
      mobile: this.mobile,
      email: this.email,
      password: this.password,
      role: "user", // Toujours 'user' même si l'admin essaie de créer un autre rôle
      is_admin: false // Toujours false pour un utilisateur normal
    };
  
    this.http.post('http://localhost:8000/api/register/', bodyData).subscribe(
      (response: any) => {
        console.log('Utilisateur créé avec succès:', response);
        alert('Utilisateur créé avec succès');
        this.getAllAdmin();
        this.resetForm();
      },
      (error) => {
        console.error('Erreur lors de la création de l\'utilisateur:', error);
        alert('Erreur lors de la création de l\'utilisateur : ' + (error.error ? JSON.stringify(error.error) : 'Vérifiez le backend.'));
      }
    );
  }
  
  getAllAdmin() {
    this.http.get("http://localhost:8000/api/users/").subscribe(
      (resultData: any) => {
        console.log(resultData);
        // Filtrer les utilisateurs pour exclure ceux avec le rôle 'admin'
        this.AdminArray = resultData.filter((user: any) => user.role === "user");
        this.resetForm(); // Réinitialise le formulaire après récupération des enregistrements
      },
      (err) => {
        console.error(err);
        alert("Erreur lors de la récupération des utilisateurs.");
      }
    );
  }

  setUpdate(data: any) {
    this.name = data.name;
    this.address = data.address;
    this.mobile = data.mobile;
    this.email = data.email;  // Pré-remplir le champ email
    this.password = '';  // Réinitialise le mot de passe pour éviter de le montrer
    this.currentAdminID = data.id;  // Assurez-vous que l'ID est stocké
  }

  UpdateRecords() {
    if (!this.currentAdminID) {
      alert("Sélectionnez un enregistrement à mettre à jour.");
      return;
    }

    const bodyData = {
      name: this.name,
      address: this.address,
      mobile: this.mobile,
      email: this.email,
      password: this.password,
      role: "user"
    };

    this.http.put("http://127.0.0.1:8000/api/users/" + this.currentAdminID + "/", bodyData).subscribe(
      (resultData: any) => {
        console.log(resultData);
        alert("Enregistrement mis à jour avec succès !");
        this.resetForm();  // Réinitialise le formulaire après la mise à jour
        this.getAllAdmin(); // Rafraîchir la liste des utilisateurs
      },
      err => {
        console.error(err);
        alert("Erreur lors de la mise à jour de l'enregistrement.");
      }
    );
  }

  setDelete(data: any) {
    if (confirm("Voulez-vous vraiment supprimer cet administrateur ?")) {
      this.http.delete("http://127.0.0.1:8000/api/users/" + data.id + "/").subscribe(
        (resultData: any) => {
          console.log(resultData);
          alert("Administrateur supprimé avec succès !");
          this.getAllAdmin(); // Rafraîchir la liste des utilisateurs
        },
        err => {
          console.error(err);
          alert("Erreur lors de la suppression de l'administrateur.");
        }
      );
    }
  }

  resetForm() {
    this.name = '';
    this.address = '';
    this.mobile = 0;
    this.email = '';  // Réinitialise le champ email
    this.password = '';  // Réinitialise le champ mot de passe
    this.currentAdminID = null; // Réinitialise l'ID
  }

  logout() {
    localStorage.removeItem('userToken');
    this.router.navigate(['']); // Redirige vers la page de connexion
  }
}
