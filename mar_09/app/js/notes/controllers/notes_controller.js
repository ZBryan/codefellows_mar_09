'use strict';

module.exports = function(app) {
  app.controller('notesController', ['$scope', 'resource', function($scope, resource) {
    $scope.notes = [];

    var Note = resource('notes');

    $scope.getAll = function() {
     Note.getAll(function(data) {
        $scope.notes = data;
      });
    };

    $scope.create = function(note) {
     Note.create(note, function(data) {
        $scope.notes.push(data);
      });
    };

    $scope.save = function(note) {
      Note.save(note, function() {
        note.editing = false;
      });
    };

    $scope.remove = function(note) {
      Note.remove(note, function() {
        $scope.notes.splice($scope.notes.indexOf(note), 1);
      });
    };

    $scope.toggleEdit = function(note) {
      if (note.editing) {
        note.noteBody = note.oldNoteBody;
        note.editing = false;
      } else {
        note.oldNoteBody = note.noteBody;
        note.editing = true;
      }
    };
  }]);
};