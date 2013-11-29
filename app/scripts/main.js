/*global require*/
'use strict';

require.config({
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: [
        'underscore',
        'jquery'
      ],
      exports: 'Backbone'
    },
    bootstrap: {
      deps: ['jquery'],
      exports: 'jquery'
    }
  },
  paths: {
    jquery: '../bower_components/jquery/jquery',
    backbone: '../bower_components/backbone/backbone',
    underscore: '../bower_components/underscore/underscore',
    bootstrap: 'vendor/bootstrap',
    TodoModel: 'models/todo',
    AppView: 'views/todo'
  }
});

require([
    'backbone', 'TodoModel', 'AppView'
  ], function(Backbone,TodoModel,AppView) {
    
    var _app = new AppView();

  Backbone.history.start();
});
