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
  displayedColumns = ['ID', 'Name'];
  displayedColumns_Exp = ['Experiment ID', 'Name'];
  previousExperiment: Experiment[];

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
  }
  //Making GET request from service for Dataset table:
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
    const formData = new FormData();

    formData.append("file", JSON.stringify(this.uploadForm.get("profile").value));
    formData.append("dataFile", this.uploadForm.get("fileName").value);
    console.log("FORMDATAATA",this.uploadForm.value)
    //Making service call for uploading data.
    this.formService.uploadFile(formData).subscribe(res => console.log(res), err => console.log(err))
    close();
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
}
