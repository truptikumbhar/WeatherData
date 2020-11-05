import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {WeatherService } from '../app/weather.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'DemoApp';
  cityForm : FormGroup;
  city : any='';
  weatherData :any=[];
  sysData :any=[];
  mainData: any=[];
  showData : boolean= false;
  constructor(private weatherServe: WeatherService, private fb : FormBuilder){
    this.cityForm= this.fb.group({
      city : new FormControl('', Validators.required)
    });
  }
  
  getCityData(){
    if(this.cityForm.get('city').value == ''){
      this.city ="show";
    }else{
      this.city= '';
      let localCity = localStorage.getItem('city');
    if(this.cityForm.get('city').value == localCity){
      alert("No city data Available");
    }else{
      this.weatherServe.getCityData(this.cityForm.get('city').value).subscribe((data) =>{
        this.showData = true;
        console.log(data);
       
        this.weatherData = JSON.parse(JSON.stringify(data)).weather;
        this.sysData = JSON.parse(JSON.stringify(data)).sys;
        this.mainData = JSON.parse(JSON.stringify(data)).main;
        localStorage.setItem('cityData', this.weatherData);
        
        console.log(this.sysData);

      });
     }
    }
    
  }

}
