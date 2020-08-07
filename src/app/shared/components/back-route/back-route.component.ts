import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-back-route',
  templateUrl: './back-route.component.html',
  styleUrls: ['./back-route.component.less']
})
export class BackRouteComponent implements OnInit {

  private ref: string;
  private refParams: string;
  public link: string;
  public params: any;
  public show = false;

  @Input() type = 'button';
  @Input() title = 'Back';
  @Input() always = false;
  @Input() defaultRef = '';

  constructor(private route: ActivatedRoute) {
    this.ref = this.route.snapshot.queryParamMap.get('ref');
    this.refParams = this.route.snapshot.queryParamMap.get('refparams');
  }

  ngOnInit() {
    this.link = this.ref || this.defaultRef;
    this.link.replace(/^\/|\/$/g, '');
    this.link = '/' + this.link;
    this.params = this.refParams ? JSON.parse(this.refParams) : {};
    this.show = this.always || this.ref ? true : false;
  }

}
