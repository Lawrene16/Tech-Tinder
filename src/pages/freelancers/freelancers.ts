import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { DetailsfreelancerPage } from '../detailsfreelancer/detailsfreelancer';
import firebase from 'firebase';
import { Storage } from '@ionic/storage';
import { Keyboard } from 'ionic-angular';
import { AuthService } from '../../providers/auth/auth.service';
import { Geolocation } from '@ionic-native/geolocation';

declare var google: any;

@Component({
  selector: 'page-freelancers',
  templateUrl: 'freelancers.html',
})
export class FreelancersPage {

  @ViewChild('map') mapElement: ElementRef;

  map: any;
  firedata = firebase.database();
  firebaseArray = [];
  freelancername;
  freelancerhourlyrate;
  freelancerskills;
  markerslist = [];
  zoomvalue = 20;
  radius = 0;
  num = 20;

  skills: Array<string>;
  private list: string[] = ['Android',
    'UI',
    'Photoshop',
    'Excel',
    'Xcode',
    'Ionic',
    'Visual Studio',
    'React',
    'Vue',
    'iOS',
    'Project Management',
    'Swift'];
  public searchedtag: string = '';
  public countries: string[] = [];

  constructor(public navCtrl: NavController,
    private keyboard: Keyboard,
    public authService: AuthService,
    public storage: Storage,
    private geolocation: Geolocation,
    public loadingCtrl: LoadingController) {
    Window["myComponent"] = this;

    this.getLocation();
  }

  add(item: string, i) {
    this.countries = [];
    this.searchedtag = item;
  }

  getLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp.coords);
    })
  }

  ionViewCanEnter(): Promise<boolean> {
    return this.authService.authenticated;
  }

  search() {
    if (!this.searchedtag.trim().length || !this.keyboard.isOpen()) {
      this.countries = [];
      return;
    }

    this.countries = this.list.filter(
      item =>
        item.toUpperCase().includes(this.searchedtag.toUpperCase()
        ));
  }

  removeFocus() {
    this.keyboard.close();
  }

  ionViewDidLoad() {
    this.loadMap();
  }

  populateMap(map) {

    this.getdist();

    var icon = {
      url: '../../assets/icon/dot.png', // url
      scaledSize: new google.maps.Size(40, 40), // scaled size
      origin: new google.maps.Point(0, 0), // origin
      anchor: new google.maps.Point(0, 0) // anchor
    };

    let load = this.loadingCtrl.create({
      content: 'Finding Freelancers...',
    });
    load.present();
    this.firedata.ref('/users').orderByChild('mjbmmn').once('value', (snapshot) => {
      let result = snapshot.val();
      let temparr = [];
      for (var key in result) {
        temparr.push(result[key]);
      }
      load.dismiss();

      var contentwindow = new google.maps.InfoWindow({
        // content: strinh
      });

      temparr.forEach((firebaseSpot) => {
        // console.log(firebaseSpot)

        if (firebaseSpot.userType == "freelancer") {
          var marker = new google.maps.Marker({
            position: new google.maps.LatLng(firebaseSpot.lat, firebaseSpot.lng),
            icon: icon,
            animation: google.maps.Animation.DROP,
            map: map
          });

          this.markerslist.push(marker);
          this.storage.set("clickedmarker", firebaseSpot)

          var strinh = '<p align="center" id="intitalstring">' +
            '<b>' + firebaseSpot.name + '</b><br>' +
            'Hourly rate - ' + firebaseSpot.hourlyRate + '<br>' +
            'Skills - ' + firebaseSpot.skillsstring + '<br>' +
            '<br>' +
            '<button onclick="Window.myComponent.viewProfile()" class="contactbtn">View Profile</button>' +
            '</p>';

          marker.addListener('click', (event) => {

            if (map.getZoom() != this.zoomvalue && map.getZoom() != this.zoomvalue) {
              map.setZoom(16);
              map.panTo(marker.getPosition());
            }

            else if (map.getZoom() == this.zoomvalue) {
              contentwindow.setContent(strinh);
              this.storage.set("clickedmarker", firebaseSpot);
              contentwindow.open(map, marker);
            }

          });
        }
      });
    });
  }

  rad(x) {
    return x * Math.PI / 180;
  };

  getDistance(p1, p2) {
    var R = 6378137; // Earth’s mean radius in meter
    var dLat = this.rad(p2.lat() - p1.lat());
    var dLong = this.rad(p2.lng() - p1.lng());
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.rad(p1.lat())) * Math.cos(this.rad(p2.lat())) *
      Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d; // returns the distance in meter
  }

  viewProfile() {
    this.storage.get("clickedmarker").then((res) => {
      // console.log(res);
      this.navCtrl.push(DetailsfreelancerPage, { 'res': res });

    })
  }

  getdist() {
    google.maps.LatLng.prototype.distanceFrom = function (latlng) {
      var lat = [this.lat(), latlng.lat()]
      var lng = [this.lng(), latlng.lng()]
      var R = 6378137;
      var dLat = (lat[1] - lat[0]) * Math.PI / 180;
      var dLng = (lng[1] - lng[0]) * Math.PI / 180;
      var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat[0] * Math.PI / 180) * Math.cos(lat[1] * Math.PI / 180) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c;
      return Math.round(d);
    }
  }

  loadMap() {

    var mapStyle = [
      {
        featureType: "administrative",
        elementType: "labels",
        stylers: [
          { visibility: "off" }
        ]
      }, {
        featureType: "poi",
        elementType: "labels",
        stylers: [
          { visibility: "off" }
        ]
      }, {
        featureType: "water",
        elementType: "labels",
        stylers: [
          { visibility: "off" }
        ]
      }, {
        featureType: "road",
        elementType: "labels",
        stylers: [
          { visibility: "off" }
        ]
      }
    ];

    this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp.coords);

      let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      let mapOptions = {
        center: latLng,
        zoom: this.zoomvalue,
        disableDefaultUI: true,
        mapTypeId: 'terrain'
      }
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.map.set('styles', mapStyle);
      this.addDefaultMarker(this.map, latLng);

      this.populateMap(this.map);
      this.map.addListener('click', (e) => {
        console.log(this.map.getZoom())
      });
    })



  }

  addDefaultMarker(map, position) {

    var icon = {
      url: '../../assets/icon/red.png', // url
      scaledSize: new google.maps.Size(40, 40), // scaled size
      origin: new google.maps.Point(0, 0), // origin
      anchor: new google.maps.Point(0, 0) // anchor
    };

    var defmarker = new google.maps.Marker({
      position: position,
      map: map,
      // icon: icon,
      // animation: google.maps.Animation.BOUNCE,
      title: 'Hello World!'
    });

    defmarker.addListener('click', function () {
      map.setZoom(this.zoomvalue);
      map.panTo(defmarker.getPosition());
    });


    // this.circle = new google.maps.Circle({
    //   map: map,
    //   radius: this.radius,    // 10 miles in metres
    //   fillColor: '#AA0000'
    // });
    // this.circle.bindTo('center', defmarker, 'position');

    return defmarker;
  }

  increase() {
    this.radius = this.radius + 5;
    if (this.radius >= 0) {
      this.num = this.num - 0.2;
      // this.circle.setRadius(this.radius);
      this.map.setZoom(this.num);
    }

    // this.markerslist.forEach(marker =>{
    // console.log(marker);

    // var loc1 = new google.maps.LatLng(52.5773139, 1.3712427);
    // var loc2 = marker.getPosition();

    // var bla = this.getDistance(loc1, loc2)

    // if(this.radius >= bla){
    //   console.log("is more")
    // }
    // });

    // console.log(this.radius);
  }

  eventHandler(keyCode) {
    console.log(keyCode);
    if (keyCode == 13) {
      // this.radius = this.radius - 1;
      console.log(this.radius)
      // this.map.setZoom(this.radius);
    }
  }

  reduce() {


    if (this.radius >= 0) {
      this.radius = this.radius - 5;

      this.num = this.num + 0.2;
      // this.circle.setRadius(this.radius);
      this.map.setZoom(this.num);
    }


    // this.markerslist.forEach(marker =>{
    // var loc1 = new google.maps.LatLng(52.5773139, 1.3712427);
    // var loc2 = marker.getPosition();

    // var bla = this.getDistance(loc1, loc2)

    // if(this.radius <= bla){
    //   console.log("is more")
    // }
    // });
  }

}
