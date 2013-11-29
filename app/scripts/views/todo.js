/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'TodoModel',
  ], function($, _, Backbone, JST, TodoModel) {
    'use strict';

    var TodoView = Backbone.View.extend({
      tmpl: JST['app/scripts/templates/todo.ejs'],
      //tmpl: $('#todo-entry').html(),
      tagName: 'li',
      className: 'entry',

      events: {
        'change .done': 'toggleDone'
      },

      render: function() {
        var _self = this;
        _self.$el.html(_.template(_self.tmpl( _self.model.attributes)));
        if(_self.model.get('done')){
          _self.$el.addClass('removeList');
        }else{
          _self.$el.removeClass('removeList');
        }
        
        return _self;
      },

      initialize: function() {
        var _self = this;
        _self.listenTo(_self.model, 'change', _self.render);

      },

      toggleDone: function(e) {
        //e.preventDefault();
        this.model.set('done',!this.model.get('done'));
      }
    });

    var AppView = Backbone.View.extend({

      el: $('#app'),

      initialize: function() {

        var _self = this;
        // setup element variables
        _self.inputText = _self.$el.find('.todo-input')[0];
        _self.todoList = _self.$el.find('.todo-list')[0];

      },

      events: {

        'submit form': 'onSubmit'

      },

      onSubmit: function(e) {

        e.preventDefault();
        var _self = this;

        if (_self.inputText.value.trim() === '') {
          return false;
        }

        // TODO: create new model using the collection's create or add method
        var _todoText = _self.inputText.value.trim();
        var _todoView = new TodoView({
          model: new TodoModel({
            title: _todoText
          })
        });
        //
        $(_self.todoList).prepend(_todoView.render().el);

        _self.inputText.value = '';
        _self.inputText.focus();
      }

    });

    //var _app = new AppView();
  //};
  return AppView;

});
