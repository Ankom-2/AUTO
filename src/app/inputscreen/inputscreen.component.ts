import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { transition } from '@angular/animations';
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
  tes:number = 20;
  // val:number;
  //LIST FormData
  // previousData = [
  //   { dataSet_ID: 1001, Name: "Data_Set_1" },
  //   { dataSet_ID: 1002, Name: "Data_Set_2" },
  //   { dataSet_ID: 1003, Name: "Data_Set_3" },
  //   { dataSet_ID: 1009, Name: "Data_Set_N" }
  // ];
  // previousExperiment = [
  //   { exp_ID: 1001, Name: "Experiment_Name_1" },
  //   { exp_ID: 1002, Name: "Experiment_Name_2" },
  //   { exp_ID: 1003, Name: "Experiment_Name_3" },
  //   { exp_ID: 1009, Name: "Experiment_Name_N" }
  // ];

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) { }
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      expName:["",Validators.required],
      pType: ["", Validators.required],
      target: ["", Validators.required],
      dsName: ["", Validators.required],
      train: [this.trai, Validators.required],
      test: [this.tes, Validators.required],
      score: ["", Validators.required]
    });
    this.loadTable = true;
    this.loadExperiment = true;
  }
    onChange(event:any){
      this.trai = event.target.value;
      this.tes = 100-this.trai;
      console.log(this.trai, this.tes)
    }
  
  // open(content) {
  //   this.modalService
  //     .open(content, { ariaLabelledBy: "modal-basic-title" })
  //     .result.then(
  //       result => {
  //         this.closeResult = `Closed with: ${result}`;
  //       },
  //       reason => {
  //         this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //       }
  //     );
  // }
  // onFileSelect(event) {
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     console.log(event.target.files[0]);
  //     this.uploadForm.get("profile").setValue(file);
  //   }
  // }
  //On submitting setting file to server.
  onSubmit(e) {
    // const formData = new FormData();
    // formData.append("file", this.uploadForm.get("profile").value);
    // this.httpClient
    //   .post<any>(this.SERVER_URL, formData)
    //   .subscribe(res => console.log(res), err => console.log(err));
    // close();
    this.submitted = true;
    this.data = JSON.stringify(this.registerForm.value);
    e.preventDefault();
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
    if (event.target.value == "classification") {
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
