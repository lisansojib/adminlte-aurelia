import 'bootstrap';
import 'fastclick';
import 'jquery-slimscroll';
import 'fetch';

import authConfig from './auth/authConfig';

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-api', config => {
      config
        .registerEndpoint('auth', 'http://localhost:49990')
        .setDefaultEndpoint('auth');;
    })
    .plugin('aurelia-authentication', baseConfig => {
      baseConfig.configure(authConfig);
    });

  //Uncomment the line below to enable animation.
  //aurelia.use.plugin('aurelia-animator-css');
  //if the css animator is enabled, add swap-order="after" to all router-view elements

  //Anyone wanting to use HTMLImports to load views, will need to install the following plugin.
  //aurelia.use.plugin('aurelia-html-import-template-loader')

  aurelia.start().then(() => aurelia.setRoot());
}
