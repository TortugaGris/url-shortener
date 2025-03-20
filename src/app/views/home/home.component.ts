import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private api: ApiService) {}
  urlForm = new FormGroup({
    url: new FormControl(''),
  });
  shortLink$?: Observable<string>;

  onSubmit(){
    const url = this.urlForm.value.url;
    if (url) this.shortLink$ = this.api.createShortLink(url);
    else console.error('Empty URL');
  }
}
