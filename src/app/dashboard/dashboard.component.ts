import { Component,OnInit} from '@angular/core';
import { map } from 'rxjs/operators';
import { FormServiceService } from 'src/form-service.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private formService: FormServiceService) { }
  private dashboard:any;
  ngOnInit() {
    this.formService.getResultData().subscribe(res => { this.dashboard = res.experiments, console.log(this.dashboard) }, err => { console.log(err) });
  }

}
