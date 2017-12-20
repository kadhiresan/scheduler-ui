'use strict';

angular.module('edurekaUiApp')
.service('utilityService', function ($mdToast) {

    this.showmdToast = function(type, message){
        $mdToast.show(
            $mdToast.simple({
                textContent: message,                       
                hideDelay: 3000,
                position: 'top right',
                toastClass: type  
            })
        );
    };

});