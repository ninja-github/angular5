import { Component, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';



@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {

  show: boolean;
  countryData = new CountryInfo(0, "");
  countryList: CountryInfo[] = [];

  message: string = "";

  constructor(private _httpService: Http) { }

  ngOnInit() {
    this.show = false;

    this.loaddata();

  }

  private loaddata() {
    this.countryList = [];
    this._httpService.get('http://localhost:8080/foldername/country/countrylist.php').subscribe(values => {
      // this.apiValues = values.json() as infoclass[];  
      //console.log(values.json());
      var message = values.json()["error"] as string;
      if (message == undefined) {
        values.json().forEach(element => {
          //console.log(element);
          var info: CountryInfo = new CountryInfo(element.CountryId, element.CountryName);
          this.countryList.push(info);
        });
        console.log(this.countryList);
      }


    });
  }
  SaveCountry() {
    console.log(this.countryData.CountryName);
    this._httpService.post('http://localhost:8080/foldername/country/countryinsert.php', {
      CountryName: this.countryData.CountryName
    }).subscribe(
      (res) => {
        console.log(res.text());
        this.message = "Country Data Inserted!";
        this.loaddata();
      },
      err => {
        console.log("Error occured");
      }
      );


  }

  Delete(id) {
    //console.log(this.countryData.CountryName);
    this._httpService.get('http://localhost:8080/foldername/country/countrydelete.php?id=' + id).subscribe(
      (res) => {
        console.log(res.text());
        this.message = "Country Data Deleted!";
        this.loaddata();
      },
      err => {
        console.log("Error occured");
      }
    );


  }
  EditData(country) {
    this.countryData = country;
    this.show = true;
  }
  UpdateCountry() {
    console.log(this.countryData.CountryName);
    this._httpService.post('http://localhost:8080/foldername/country/countryupdate.php', {
      CountryName: this.countryData.CountryName,
      CountryId: this.countryData.CountryId,
    }).subscribe(
      (res) => {
        console.log(res.text());
        this.message = "Country Data Updated!";
        this.loaddata();
      },
      err => {
        console.log("Error occured");
      }
      );
      this.show = false;

  }
}

export class CountryInfo {
  CountryId: number;
  CountryName: string;

  constructor(id: number, cname: string) {
    this.CountryId = id;
    this.CountryName = cname;
  }
}