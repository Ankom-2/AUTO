import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatSidenavModule
} from '@angular/material';
import { InputscreenComponent } from './inputscreen/inputscreen.component';
import { FormServiceService } from '../form-service.service';
import { MatTableModule, MatSortModule, MatProgressSpinnerModule } from '@angular/material';
import { MainscreenComponent } from './mainscreen/mainscreen.component';
import { ScatterComponent } from './scatter/scatter.component';
import { BarComponent } from './bar/bar.component';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    InputscreenComponent,
    MainscreenComponent,
    ScatterComponent,
    BarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSliderModule,
    NgbModule, ReactiveFormsModule,
    HttpClientModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule, MatInputModule,
    MatListModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatSidenavModule, MatTableModule, MatSortModule, MatProgressSpinnerModule
  ],
  entryComponents:[ScatterComponent],
  providers: [FormServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
