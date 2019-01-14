import { inject } from 'aurelia-framework';
import { PushMenu } from './template/js/push-menu';
import { Layout } from './template/js/layout';
import { Tree } from './template/js/tree';
import { BoxWidget } from './template/js/box-widget';

@inject(PushMenu, Layout, Tree, BoxWidget)
export class App {
  constructor(pushMenu, layout, tree, boxWidget) {
    this.pushMenu = pushMenu;
    this.layout = layout;
    this.tree = tree;
    this.boxWidget = boxWidget;
  }

  configureRouter(config, router) {
    config.title = 'AdminLTE 2 | Fixed Layout';
    config.map([
      { route: ['', 'welcome'], name: 'welcome', moduleId: 'welcome', nav: true },
      { route: 'users', name: 'users', moduleId: 'users', nav: true, title: 'Github Users' },
      { route: 'child-router', name: 'child-router', moduleId: 'child-router', nav: true, title: 'Child Router' }
    ]);

    this.router = router;
  }

  attached() {
    $(document).on('click', '[data-toggle="push-menu"]', (e) => {
      e.preventDefault();
      this.pushMenu.toggle();
    });
    
    this.boxWidget.activate();
  }
}
