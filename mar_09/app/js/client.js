'use strict';

require('angular/angular');

var notesApp = angular.module('notesApp', []);

//services
require('./services/resource_service')(notesApp);

//controllers
require('./notes/controllers/notes_controller')(notesApp);

//directives