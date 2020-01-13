import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Form } from '../form';
import { Experiment } from '../experiment'
import { FormServiceService } from '../../form-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-mainscreen',
  templateUrl: './mainscreen.component.html',
  styleUrls: ['./mainscreen.component.css']
})
export class MainscreenComponent implements OnInit {
  closeResult: string;
  uploadForm: FormGroup;
  loadTable: boolean = false;
  loadExperiment: boolean = false;
  uploadFile: File;
  //LIST FormData
  previousData: Form[];
  displayedColumns = ['ID', 'Name','Download Link'];
  displayedColumns_Exp = ['Experiment ID', 'Name','Download Link'];
  previousExperiment: Experiment[];
  errorMessage: string = null;
  successMessage: string = null;
  responseURI: any;
  strSPL:String;
  dataSet_id:number;
  dataSet_name:String;
  data_setArr:any;
  experiment_Arr:any;
  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private formService: FormServiceService,
    private router: Router
  ) { }
  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      profile: [""],
      fileName: [""],
    });
    console.log("DATA FROM FORM", this.uploadForm.value);
    this.loadTable = true;
    this.loadExperiment = true;
    //For loading previous dataSets and experiment data.
    this.getDataset();
    this.getExperiment();
    this.formService.getDataSet().subscribe(res => {this.data_setArr = res,this.addLink(),console.log("Response data",this.data_setArr)});
    this.formService.getExperiments().subscribe(res => {this.experiment_Arr = res,console.log("Response data",this.experiment_Arr)});
  }
  //Making GET request from service for Dataset table:
  addLink(){
    this.data_setArr.forEach(obj =>{
      obj.data_Link = 'http://localhost:8080/download/'+obj.dataId
    });
    // console.log(this.data_setArr);
  }
  getDataset() {
    this.formService.getData().subscribe(data => this.previousData = data);
  }
  //Making GET request from service for Experiment table:
  getExperiment() {
    this.formService.getExperiment().subscribe(data => this.previousExperiment = data);
  }
  //Opening INPUT SCREEN:
  open_Input() {
    this.router.navigate(['/input']);
  }
  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  //Method when we will select the file
  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(event.target.files[0]);
      this.uploadForm.get("profile").setValue(file);
    }
  }
  //On submitting setting file to server.
  onSubmit() {
    this.errorMessage = null;
    this.successMessage = null;
    const formData = new FormData();
    formData.append("file", this.uploadForm.get("profile").value);
    formData.append("dataFile", this.uploadForm.get("fileName").value);
    // console.log("FORMDATAATA",this.uploadForm.value)
    //Making service call for uploading data.
    this.formService.uploadFile(formData).subscribe(res => { this.responseURI = res, this.successMessage = "File Uploaded Successfully", console.log("Good response:", this.responseURI),this.setIdName() }, err => { this.errorMessage = "Upload Failed", console.log("Error response:", err) })
  }

  //Using SUbStr for taking ID and name of the file: Good response: http://localhost:8080/download/38-adada.
  setIdName(){
    this.strSPL = String(this.responseURI)
    var temp = this.strSPL.substr(31,32);
    this.dataSet_id = parseInt(temp.substr(0,2));
    this.dataSet_name = temp.substr(3,);
    console.log("ID",this.dataSet_id+"Name",this.dataSet_name);
    //PUBLISHING
    // this.sendData();
  }
  //PUBLISHING DATA_ID AND DATA_NAME FOR USING IN INPUT SCREEN.
  // sendData(){
  //   this.formService.sendData(this.dataSet_id,this.dataSet_name);
  // }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
}
