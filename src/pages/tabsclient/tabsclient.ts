import { Component } from '@angular/core';

import { ChatsPage } from '../chats/chats';
import { ShortlistedPage } from '../shortlisted/shortlisted';
import { FreelancersPage } from '../freelancers/freelancers';


@Component({
  templateUrl: 'tabsclient.html',
})
export class TabsclientPage {

  tab1Root = FreelancersPage;
  tab2Root = ChatsPage;
  tab3Root = ShortlistedPage;

  constructor() {

  }
}
