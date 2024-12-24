import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({ 
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  photos: string[] = [];
  editIndex: number = -1; // Use -1 to indicate no selection

  @ViewChild('fileInput') fileInput!: ElementRef;
  @ViewChild('editFileInput') editFileInput!: ElementRef;

  constructor(private router: Router) { }

  ngOnInit() {
    // Load saved photos from localStorage if available
    if (typeof window !== 'undefined') {
      const savedPhotos = localStorage.getItem('photos');
      if (savedPhotos) {
        this.photos = JSON.parse(savedPhotos);
      }
    }
  }

  isLoginOrRegisterPage(): boolean {
    return this.router.url === '/' || this.router.url === '/register';
  }

  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('userToken');
    }
    this.router.navigate(['/']);
  }

  selectFile() {
    this.fileInput.nativeElement.click();
  }

  onFilesSelected(event: any) {
    const files = event.target.files;
    if (files) {
      for (let file of files) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.photos.push(e.target.result);
          // Save the photos array in localStorage
          if (typeof window !== 'undefined') {
            localStorage.setItem('photos', JSON.stringify(this.photos));
          }
        };
        reader.readAsDataURL(file);
      }
    }
  }

  triggerEditFileInput(index: number) {
    this.editIndex = index;
    this.editFileInput.nativeElement.click();
  }

  onEditFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && this.editIndex >= 0) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.photos[this.editIndex] = e.target.result;
        // Save the updated photos array in localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('photos', JSON.stringify(this.photos));
        }
        this.editIndex = -1; // Reset the edit index after editing
      };
      reader.readAsDataURL(file);
    }
  }

  deletePhoto(index: number) {
    this.photos.splice(index, 1);
    // Save the updated photos array in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('photos', JSON.stringify(this.photos));
    }
  }
}
