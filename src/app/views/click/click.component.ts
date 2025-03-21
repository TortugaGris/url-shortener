import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-click',
  imports: [],
  template: '<h1 class="text-3xl font-bold">{{message}}</h1>',
  styles: '',
})
export class ClickComponent {
  message = "Redirecting...";
  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
  ) {
    const linkId = this.route.snapshot.paramMap.get("linkId")
    console.log(linkId);
    if(linkId) {
      this.api.addClick(linkId)
        .then((link) => window.location.href=link)
        .catch(()=>this.message="Link Not Found");
    };
  }
}
