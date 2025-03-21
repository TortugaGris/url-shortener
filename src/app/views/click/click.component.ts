import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-click',
  imports: [],
  template: '',
  styles: '',
})
export class ClickComponent {
  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
  ) {
    const linkId = this.route.snapshot.paramMap.get("linkId")
    console.log(linkId);
    if(linkId) this.api.addClick(linkId);
  }
}
