angular.module('website', [])
    .controller('MainCtrl', ['$scope', 'PaleoService', function ($scope, PaleoService) {
    	//
    	// prepare a paleo food array in $scope
    	// this array will be used render second dropdown menu
    	//
        $scope.paleoFoods = PaleoService.getPaleoFoods();
        //
        // prepare a paleo group array in $scope
        // this array will be used render first drop down menu
        //
        $scope.paleoGroups = PaleoService.getPaleoGroups();
        
        // 
        // isSelected function used to be called in ng-class
        //
        $scope.isSelected = function (group) {
            if(typeof $scope.myGroup === 'undefined') {
                return;
            }
            
            //
            // if group match myGroup, return true
            //
            return $scope.myGroup.data === group;
        };
    }])
    .factory('PaleoService', function () {
        var groups = [{data:'meats', label:'Meats'},
            {data:'vegetables', label:'Vegetables'},
            {data:'fats', label:'Fats'},
            {data:'nuts', label:'Nuts'},
            {data:'fruits', label:'Fruits'}];

        var foods = [{group:'meats', label:'Steak'},
            {group:'meats', label:'Chicken Breast'},
            {group:'meats', label:'Grass Fed Beef'},
            {group:'meats', label:'Bacon'},
            {group:'meats', label:'Eggs'},
            {group:'vegetables', label:'Asparagus'},
            {group:'vegetables', label:'Avocado'},
            {group:'vegetables', label:'Carrots'},
            {group:'vegetables', label:'Broccoli'},
            {group:'vegetables', label:'Peppers'},
            {group:'fats', label:'Coconut oil'},
            {group:'fats', label:'Olive oil'},
            {group:'fats', label:'Macadamia Oil'},
            {group:'fats', label:'Avocado Oil'},
            {group:'fats', label:'Grass fed Butter'},
            {group:'nuts', label:'Almonds'},
            {group:'nuts', label:'Cashews'},
            {group:'nuts', label:'Hazelnuts'},
            {group:'nuts', label:'Macadamia Nutts'},
            {group:'nuts', label:'Pecans'},
            {group:'fruits', label:'Apple'},
            {group:'fruits', label:'Avocado'},
            {group:'fruits', label:'Blackberries'},
            {group:'fruits', label:'Papaya'},
            {group:'fruits', label:'Mango'}];

        var getPaleoGroups = function() {
           return groups;
        };

        var getPaleoFoods = function() {
            return foods;
        };

        return {
            getPaleoGroups: getPaleoGroups,
            getPaleoFoods: getPaleoFoods
        }
    });