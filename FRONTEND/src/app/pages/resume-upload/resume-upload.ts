import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeService } from '../../services/resume.service';

@Component({
  selector: 'app-resume-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resume-upload.html',
  styles: []
})
export class ResumeUploadComponent {

  selectedFile!: File;

  constructor(
    private resumeService: ResumeService
  ) {}

  onFileChange(event: Event): void {

    const input =
      event.target as HTMLInputElement;

    if(input.files && input.files.length > 0){

      this.selectedFile =
        input.files[0];
    }
  }

  upload(): void {

    if(!this.selectedFile){

      alert('Select Resume First');
      return;
    }

    this.resumeService
      .uploadResume(
        1,
        this.selectedFile
      )
      .subscribe({

        next: (res) => {

          console.log(res);

          alert('Resume Uploaded');
        },

        error: (err) => {

          console.error(err);

          alert('Upload Failed');
        }

      });

  }

}
