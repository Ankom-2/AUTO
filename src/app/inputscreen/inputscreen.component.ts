import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { transition } from '@angular/animations';
import { FormServiceService } from '../../form-service.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-inputscreen',
  templateUrl: './inputscreen.component.html',
  styleUrls: ['./inputscreen.component.css']
})
export class InputscreenComponent implements OnInit {

  closeResult: string;
  // uploadForm: FormGroup;
  registerForm: FormGroup;
  httpClient: HttpClient;
  SERVER_URL: any = "";
  loadTable: boolean = false;
  loadExperiment: boolean = false;
  submitted: boolean = false;
  data: any;
  classi: boolean = false;
  reg: boolean = false;
  trai: number = 80;
  tes: number = 20;
  errorMessage: any;
  successMessage: any;
  dataSet: any;
  subscription: Subscription;
  data_setArr:any;
  // data_Id: number[]=[];
  data_name:object[]=[];
  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private formService: FormServiceService,
  ) { }
  ngOnInit() {
    //Subscribing to formService for DATA_ID and DATA_NAME.
    // this.subscription =  this.formService.getURIData().subscribe(res => {console.log("RESPONSE FOR URI",res)});
    this.formService.getDataSet().subscribe(res => {this.data_setArr = res,console.log("Response data",this.data_setArr),this.addNameId()});
    this.dataSet = this.formBuilder.group({ dataId: ["", Validators.required] });
    this.registerForm = this.formBuilder.group({
      expName: ["", Validators.required],
      problemType: ["", Validators.required],
      target: ["", Validators.required],

      dataSet: this.dataSet,
      splitTrain: [this.trai, Validators.required],
      splitTest: [this.tes, Validators.required],
      scoreType: ["", Validators.required]
    });

    //Adding data id and name to array fro drop_down:
    this.loadTable = true;
    this.loadExperiment = true;
  }
  // ngOnDestroy() {
  //   // unsubscribe to ensure no memory leaks
  //   this.subscription.unsubscribe();
  // }
  addNameId(){
    this.data_setArr.forEach((obj) => {
      this.data_name.push({"id":obj.dataId,"name":obj.dataName})
    });
    // console.log("DATA DAATA",this.data_name);
  }
  onChange(event: any) {
    this.trai = event.target.value;
    this.tes = 100 - this.trai;
    console.log(this.trai, this.tes)
  }

  //On submitting setting file to server.
  onSubmit(e) {
    this.errorMessage = null;
    this.successMessage = null;
    // const formData = new FormData();
    
    console.log("FORMDATAATA", this.registerForm.value);
    //Making service call for uploading data.
    this.formService.postFormData(this.registerForm.value).subscribe(res => { this.successMessage = "Data Uploaded Successfully", console.log("Good response:", res) }, err => { this.errorMessage = "Upload Failed", console.log("Error response:", err) })
    // close();
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
  onItemChange(event) {
    console.log(event.target.value);
    if (event.target.value == 1) {
      this.classi = true;
      this.reg = false;
      console.log(this.classi);
    } else {
      this.classi = false;
      this.reg = true;
      console.log(this.classi);
    }
  }


}
