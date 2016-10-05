import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Tasks } from '../../api/task.js';

import template from './todosList.html';
 
class TodosListCtrl {
  constructor($scope) {
    $scope.viewModel(this);

    this.helpers({
      tasks() {
        return Tasks.find({}, {
          sort: {
            createdAt: -1
          }
        });
      }
      
    });

    this.addTask = function(newTask) {
      // Insert a task into the collection
      Tasks.insert({
        text: newTask,
        createdAt: new Date
      });

      this.newTask = '';
    }
    
    this.setChecked = function(task) {
      // Set the checked property to the opposite of its current value
      Tasks.update(task._id, {
        $set: {
          checked: !task.checked
        },
      });
    }
 
    this.removeTask = function(task) {
      Tasks.remove(task._id);
    }
  }
}

export default angular.module('todosList', [
  angularMeteor
])
  .component('todosList', {
    templateUrl: 'imports/components/todosList/todosList.html',
    controller: ['$scope', TodosListCtrl]
  });