import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Link } from '../../models/link.interface';
import { FormatDatePipe } from '../../pipes/format-date.pipe';
import { IconsModule } from '../../icons/icons.module';
import { TruncatePipe } from '../../pipes/truncate.pipe';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormatDatePipe,
    TruncatePipe,
    IconsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  urlForm = new FormGroup({
    url: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/)
    ]),
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
    this.urlForm.reset()
  }

  copyToClipboard(hostUrl: string, linkId: string) {
     navigator.clipboard.writeText(`${hostUrl}/${linkId}`);
  }
}
