import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Link } from '../../models/link.interface';

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
  urlForm = new FormGroup({
    url: new FormControl(''),
  });
  hostUrl = environment.hostUrl;
  links$?:Observable<Link[]>;

  constructor(private api: ApiService) {
    this.links$ = this.api.watchLinks();
  }

  onSubmit(){
    const url = this.urlForm.value.url;
    if (url) this.api.createShortLink(url);
    else console.error('Empty URL');
  }
}
