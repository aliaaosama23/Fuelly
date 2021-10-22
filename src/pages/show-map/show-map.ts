import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

declare var google;
@IonicPage()
@Component({
  selector: 'page-show-map',
  templateUrl: 'show-map.html',
})
export class ShowMapPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  lat:number
  long:number
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.lat=this.navParams.get('lat')
    console.log("lat   :"+this.lat)
    this.long=this.navParams.get('long')
    console.log("lang   :"+this.long

    )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowMapPage');
    this.loadmap();
  }


  loadmap(){
    let latLng = new google.maps.LatLng(this.navParams.get('lat'),this.navParams.get('long'));


    let mapOptions = {
      center: latLng,
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    var Fulley = {lat: this.navParams.get('lat'), lng: this.navParams.get('long')};
    // The map, centered at Uluru
    var map = new google.maps.Map(
        document.getElementById('map'), {zoom: 16, center: Fulley });
    // The marker, positioned at Uluru
    var marker = new google.maps.Marker({position:  Fulley, map: map});
    var infowindow = new google.maps.InfoWindow({
      content: this.navParams.get('info')
    });

    marker.addListener('click', ()=> {
      infowindow.open(map, marker);
    });
  }
}
