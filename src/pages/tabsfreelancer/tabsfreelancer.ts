import { Component } from '@angular/core';

import { ChatsPage } from '../chats/chats';
import { JobsPage } from '../jobs/jobs';
import { ProfilefreelancerPage } from '../profilefreelancer/profilefreelancer';


@Component({
  templateUrl: 'tabsfreelancer.html',
})
export class TabsfreelancerPage {

  tab1Root = JobsPage;
  tab2Root = ChatsPage;
  tab3Root = ProfilefreelancerPage;

  constructor() {

  }
}
