import { Component,  ViewChild, ElementRef  } from '@angular/core';
import { IonicPage, NavController, ToastController, NavParams } from 'ionic-angular';


declare var google: any;


@Component({
  selector: 'page-jobs',
  templateUrl: 'jobs.html',
})
export class JobsPage {


  @ViewChild('map') mapElement: ElementRef;

  map: any;

  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController,
  ) {
    Window["myComponent"] = this;
  }

  ionViewDidLoad(){
    this.loadMap();
  }

  populateMap(map){

    var icon = {
      url: '../../assets/icon/dot.png', // url
      scaledSize: new google.maps.Size(40, 40), // scaled size
      origin: new google.maps.Point(0,0), // origin
      anchor: new google.maps.Point(0, 0) // anchor
  };

  var text = document.getElementById("intitalstring");
  var initialwindow = new google.maps.InfoWindow({
    content: text
  });


    var features = [
      {
        position: new google.maps.LatLng(-33.91721, 151.22630),
        type: 'info',
      }, {
        position: new google.maps.LatLng(-33.91539, 151.22820),
        type: 'info'
      }, {
        position: new google.maps.LatLng(-33.91747, 151.22912),
        type: 'info'
      }, {
        position: new google.maps.LatLng(-33.91910, 151.22907),
        type: 'info'
      }, {
        position: new google.maps.LatLng(-33.91872, 151.23089),
        type: 'info'
      }, {
        position: new google.maps.LatLng(-33.91784, 151.23094),
        type: 'info'
      }, {
        position: new google.maps.LatLng(-33.91682, 151.23149),
        type: 'info'
      }, {
        position: new google.maps.LatLng(-33.91790, 151.23463),
        type: 'info'
      }, {
        position: new google.maps.LatLng(-33.91666, 151.23468),
        type: 'info'
      }, {
        position: new google.maps.LatLng(-33.916988, 151.233640),
        type: 'info'
      }, {
        position: new google.maps.LatLng(-33.91662347903106, 151.22879464019775),
        type: 'parking'
      }
    ];


    var markerslist = [];

    for (var i = 0; i < features.length; i++) {
      var marker = new google.maps.Marker({
        position: features[i].position,
        icon: icon,
        map: map
      });

      markerslist.push(marker);
    };

    // console.log(markerslist);

    // for(var i = 0; i < markerslist.length; i++){
    //   marker.addListener('click', (event) =>  {
    //     // initialwindow.open(map, marker);
    //   });
    // }

    markerslist.forEach(function(mymarker) {
      mymarker.addListener('click', (event) =>  {
             initialwindow.open(map, mymarker);
          });
    });
  }

  viewProfile(){
    // this.navCtrl.push(DetailsfreelancerPage);
  }

  loadMap(){

    var mapStyle = [
      {
        featureType: "administrative",
        elementType: "labels",
        stylers: [
          { visibility: "off" }
        ]
      },{
        featureType: "poi",
        elementType: "labels",
        stylers: [
          { visibility: "off" }
        ]
      },{
        featureType: "water",
        elementType: "labels",
        stylers: [
          { visibility: "off" }
        ]
      },{
        featureType: "road",
        elementType: "labels",
        stylers: [
          { visibility: "off" }
        ]
      }
    ];


    let latLng = new google.maps.LatLng(-33.91722, 151.23064);
    let mapOptions = {
      center: latLng,
      zoom: 16,
      disableDefaultUI: true,
      mapTypeId: 'terrain'
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.map.set('styles', mapStyle);
    this.addDefaultMarker(this.map, latLng);

    this.populateMap(this.map);
    this.map.addListener('click', (e) => {
      console.log('Clicked')
    });    
  }

  addDefaultMarker(map, position){
    
    var icon = {
      url: '../../assets/icon/red.png', // url
      scaledSize: new google.maps.Size(40, 40), // scaled size
      origin: new google.maps.Point(0,0), // origin
      anchor: new google.maps.Point(0, 0) // anchor
  };

    var defmarker = new google.maps.Marker({
      position: position,
      map: map,
      // icon: icon,
      // animation: google.maps.Animation.BOUNCE,
      title: 'Hello World!'
    });

    defmarker.addListener('click', function() {
      map.setZoom(15);
      map.panTo(defmarker.getPosition());
    });

    return defmarker;
  }

  presentToast(message){
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

}
