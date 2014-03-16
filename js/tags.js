/************************************************************** 
 * 
 * This is main JavaScript file using Angular.js
 * 
 **************************************************************/ 

/************************************************************** 
 * 
 * Define an angular module for our app
 *
 **************************************************************/ 
var app = angular.module('tagsApp', []);

/************************************************************** 
 * 
 * controller
 * 
 **************************************************************/ 
app.controller('tagsController', function($scope) {
	$scope.inputTags = [];
	
	//
	// add tag fuction
	//
	$scope.addTag = function() {
		if ($scope.tagText.length == 0) {
			return;
		}
		
		// 
		// insert new object to inputTags array to create new tag
		//
		$scope.inputTags.push({name: $scope.tagText});
		
		// 
		// tagText bind in input field in tags.html
		//
		$scope.tagText = '';
	}
	
	//
	// delete tag function
	// this function get call from both delete icon of tags.html
	// and backspace key press in tag-input directive
	//
	$scope.deleteTag = function(key) {
		if ($scope.inputTags.length > 0 &&
			$scope.tagText.length == 0 &&
			key === undefined) {
			//
			// backspace delete last input tag
			// use pop to remove the last element of an array
			// only delete tag if no tagText to delete
			//
			$scope.inputTags.pop();
		} else if (key != undefined) {
			//
			// click delete icon delete element of array
			//
			$scope.inputTags.splice(key, 1);
		}
	}
});

/************************************************************** 
 * 
 * tag-input directive
 * 
 * purpose of directive: 
 * 1) dynamically change the input width
 * 2) call addTag function when press tab and enter key
 * 3) delete tag when press backspace key
 * 
 * this directive's scope is parent scope, 
 * so this diective can freely use 
 * the parent scope's variables and functions
 * 
 **************************************************************/ 
app.directive('tagInput', function() {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			// initial input width
			scope.inputWidth = 20;

			// Watch for changes in text field
			scope.$watch(attrs.ngModel, function(value) {
				if (value != undefined) // ngModel will be undefined at begining
				{
					//
					// get width of value.
					// one way we can get the width of this value is
					// to create a tempary element and then get it width
					//
					var tempEl = $('<span>' + value + '</span>').appendTo('body');
					// set scope.inputWidth
					scope.inputWidth = tempEl.width() + 5;
					// no need for this tempary element, remove it
					tempEl.remove();
				}
			});

			element.bind('keydown', function(e) {
				//
				// e.which 9 is tab key stoke
				// the defaut behavor of tab key is to go to next input field
				// call preventDefault to prevent this behavor
				//
				if (e.which == 9) {
					e.preventDefault();
				}
				
				//
				// e.which 8 is backspace key stoke.
				// call deleteTag() to delete tag.
				// deleteTag function defined in controller,
				// deleteTag function passed by adding a attribute
				//
				if (e.which == 8) {
					scope.$apply(attrs.deleteTag);
				}
			});

			element.bind('keyup', function(e) {
				var key = e.which;

				// 
				// e.which 9 is tab key stoke
				// e.which 13 is enter key stoke				
				// when Tab or Enter pressed, 
				// call addTag function to add new tag
				// addTag function passed to directive by adding new attribute
				//
				if (key == 9 || key == 13) {
					e.preventDefault();
					scope.$apply(attrs.newTag);
				}
			});
		}
	}
});










































