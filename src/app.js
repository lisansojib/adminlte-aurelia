import {inject} from 'aurelia-framework';
import {PushMenu} from './template/js/push-menu';

@inject(PushMenu)
export class App {
  constructor(pushMenu){
    this.pushMenu = pushMenu;
  }

  configureRouter(config, router) {
    config.title = 'Aurelia';
    config.map([
      { route: ['', 'welcome'], name: 'welcome',      moduleId: 'welcome',      nav: true, title: 'Welcome' },
      { route: 'users',         name: 'users',        moduleId: 'users',        nav: true, title: 'Github Users' },
      { route: 'child-router',  name: 'child-router', moduleId: 'child-router', nav: true, title: 'Child Router' }
    ]);

    this.router = router;
  }

  attached(){
    $(document).on('click', '[data-toggle="push-menu"]', (e) => {
      e.preventDefault();
      this.pushMenu.toggle();
    });
  }
}
