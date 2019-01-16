import { inject } from 'aurelia-framework';

export class App {
  constructor() {
  }

  configureRouter(config, router) {
    config.title = 'AdminLTE 2 | Fixed Layout';
    config.map([
      { route: ['', 'login'], name: 'login', moduleId: 'auth/login', nav: true, title: 'Login' },
      { route: 'welcome', name: 'welcome', moduleId: 'welcome', nav: true },
      { route: 'register', name: 'register', moduleId: 'auth/register', nav: true, title: 'Register' }
    ]);

    this.router = router;
  }

  attached() {
    $('body').layout('fix')
  }
}
