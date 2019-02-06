import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ViewController} from 'ionic-angular';
import { PostLocation } from '../../Models/PostLocation';




@IonicPage()
@Component({
  selector: 'page-set-location',
  templateUrl: 'set-location.html',
})
export class SetLocationPage {

  baseLocation:PostLocation = new PostLocation(29.866866,31.315270);
 
  locationSet=false;

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController) {
  }

  setLoc()
  {
    this.viewCtrl.dismiss(this.baseLocation);
  }

  Cancel()
  {
    this.viewCtrl.dismiss();
  }
  click(event)
  {
    this.baseLocation.latitude=event.coords.lat;
    this.baseLocation.longtuide=event.coords.lng;
    this.locationSet=true;
  }



}
