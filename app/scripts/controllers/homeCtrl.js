'use strict';

/**
 * @ngdoc function
 * @name edurekaUiApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the edurekaUiApp
 */
angular.module('edurekaUiApp')
.controller('HomeCtrl', function ($scope, $state, userService, utilityService) {

	// $scope.$parent.pageLoader = true;
	$scope.createSession = function(form,sessionData){
		if(form.$valid){
			$scope.$parent.pageLoader = true;
			userService.addWebinar(sessionData).then(function(resp){
	            $scope.$parent.pageLoader = false;
	        },function(err){
	            $scope.$parent.pageLoader = false;
	            utilityService.showmdToast('error',err.message);
	        })
		}
	}

	$scope.upload=function(){
		$scope.$parent.pageLoader = true;
        var data = new FormData();
		$.each($("#uploadFile")[0].files, function(i, file) {
		    data.append('file', file, file.name);
		});
        userService.uploadExcel(data).then(function(resp){
            $scope.$parent.pageLoader = false;
            $scope.uploadResult = resp;
            $('#uploadModal').modal();
        },function(err){
            $scope.$parent.pageLoader = false;
            utilityService.showmdToast('error',err.message);
        })
  	};

  	$scope.upload

  	$scope.getInstructors = function(){
  		$scope.$parent.pageLoader = true;
  		userService.getInstructors().then(function(resp){
            $scope.$parent.pageLoader = false;
            $scope.instructorList = resp.data;
        },function(err){
            $scope.$parent.pageLoader = false;
            utilityService.showmdToast('error',err.message);
        })
  	};

  	$scope.entityFilterData = {};
  	$scope.getCourses = function(){
  		$scope.$parent.pageLoader = true;
  		userService.getCourses().then(function(resp){
            $scope.$parent.pageLoader = false;
            $scope.courseList = resp.data;
            if($state.is('home.entityAnalysis')){
            	$scope.entityFilterData.course_key = $scope.courseList[0]._key;
        		$scope.entityAnalysis('overAll',$scope.entityFilterData);
            }
        },function(err){
            $scope.$parent.pageLoader = false;
            utilityService.showmdToast('error',err.message);
        })
  	};

  	$scope.getCustomEntities = function(){
  		$scope.$parent.pageLoader = true;
  		userService.getCustomEntities().then(function(resp){
            $scope.$parent.pageLoader = false;
            $scope.customEntities = resp.data;
        },function(err){
            $scope.$parent.pageLoader = false;
            utilityService.showmdToast('error',err.message);
        })
  	};

  	$scope.getSessions = function(){
  		$scope.$parent.pageLoader = true;
  		userService.getSessions().then(function(resp){
            $scope.$parent.pageLoader = false;
            $scope.sessionList = resp.data;
        },function(err){
            $scope.$parent.pageLoader = false;
            utilityService.showmdToast('error',err.message);
        })
  	};

  	$scope.getWebinars = function(){
  		$scope.$parent.pageLoader = true;
  		userService.getWebinars().then(function(resp){
            $scope.$parent.pageLoader = false;
            $scope.webinarList = resp.data;
        },function(err){
            $scope.$parent.pageLoader = false;
            utilityService.showmdToast('error',err.message);
        })
  	};

  	$scope.openentityModal = function(courseKey){
  		$('#entityModal').modal();
  		$scope.courseKey = courseKey;
  	}

  	$scope.addEntity = function(form, entity){
  		if(form.$valid){
  			var data = {
  				course_key : $scope.courseKey,
  				custom_entity : entity.entity
  			}
  			userService.addCustomEntity(data).then(function(resp){
	            $scope.$parent.pageLoader = false;
	            $scope.getCustomEntities();
	        },function(err){
	            $scope.$parent.pageLoader = false;
	            utilityService.showmdToast('error',err.message);
	        })
  		}
  	}

  	$scope.showAnalysis = function(type, filterData){
  		var data;
  		if(type=="overAll"){
  			data = {};
  			getAnalysis(data);
  		}else{
    		if(filterData){
    			data = filterData;
    			getAnalysis(data);
    		}
  		}
  	}

  	var getAnalysis = function(data){
  		userService.getAnalysis(data).then(function(resp){
            $scope.$parent.pageLoader = false;
        	renderPiechart(resp.data);
        },function(err){
            $scope.$parent.pageLoader = false;
            utilityService.showmdToast('error',err.message);
        })
  	}

  	var getEntityAnalysis = function(data,course){
  		userService.getEntityAnalysis(data, course).then(function(resp){
            $scope.$parent.pageLoader = false;
            if(resp.data.length){
            	renderBarChart(resp.data);
            }else {
            	utilityService.showmdToast('error','No data Found');
            }
        },function(err){
            $scope.$parent.pageLoader = false;
            utilityService.showmdToast('error',err.message);
        })
  	}

  	$scope.entityAnalysis = function(type, filterData){
  		var data;
  		if(filterData && filterData.course_key){
	  		if(type=="overAll"){
	  			data = {};
	  			getEntityAnalysis(data,filterData.course_key);
	  		}else{
	    		if(filterData){
	    			var newData = JSON.parse(JSON.stringify(filterData))
	    			delete newData.course_key;
	    			getEntityAnalysis(newData,filterData.course_key);
	    		}
	  		}
	  	}else{
	  		utilityService.showmdToast('error','Please select a course');
	  	}
  	}


  	// $scope.pages =[{title:"pge1"},{title:"pge2"},{title:"pge3"}];

    // $scope.chartData = [{"study_messages":20, "voice_messages":30, "video_issues":50}];
    
    var renderPiechart = function(chartData) {
    	var chart;
    	var chartData = createDataForChart(chartData);
        chart = new Highcharts.Chart({
            chart: {
                renderTo: 'pie-chart-container',
                type: 'pie',
            },
            title: {
                text: ''
            },
            yAxis: {
                title: {
                    text: 'Total percent market share'
                }
            },
            plotOptions: {
                pie: {
                    shadow: false
                }
            },
            tooltip: {
                formatter: function() {
                    // return '<b>'+ this.point.name +'</b>: '+ this.y +' %';
                    return '<b>'+ this.point.name +'</b>: '+ this.y;
                }
            },
            series: [{
                name: 'Browsers',
                data: chartData.chartList,
                innerSize : "20%",
                // dataLabels: {
                //     enabled: false
                // }
            }],
            credits: {
                enabled: false
            },
        },function(chart) { // on complete
            var textX = chart.plotLeft + (chart.plotWidth  * 0.5);
            var textY = chart.plotTop  + (chart.plotHeight * 0.5);

            var span = '<span id="pieChartInfoText" style="position:absolute; text-align:center;">';
            span += '<span style="font-size: 10px">Score</span><br>';
            span += '<span style="font-size: 26px">'+chartData.innersize+'</span>';
            span += '</span>';

            $("#addText").append(span);
            span = $('#pieChartInfoText');
            span.css('left', textX + (span.width() * -0.5));
            span.css('top', textY + (span.height() * -0.5));
        });
    };
    function createDataForChart (data){
        // var data = {"study_messages":20, "voice_messages":30, "video_issues":50}
        var chartList = [];
        for (var key in data){
        	var arr = [];
        	arr.push(key);
        	arr.push(data[key]);
        	chartList.push(arr);
        }
        return {"chartList":chartList}
    }
  

  	var renderBarChart = function(chartData){
  		Highcharts.chart('bar-chart-container', {
		    chart: {
		        type: 'column'
		    },
	
		    xAxis: {
		        type: 'category'
		    },
		    yAxis: {
		        title: {
		            text: 'percentage'
		        }

		    },
		    legend: {
		        enabled: false
		    },
		    title:{
			    text:''
			},
		    plotOptions: {
		        series: {
		            borderWidth: 0,
		            dataLabels: {
		                enabled: true,
		                // format: '{point.y:.1f}%',
		                format: '{point.y:.1f}'
		            }
		        }
		    },
		    credits : false,
		    tooltip: {
		        headerFormat: '',
		        // pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
		        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b> of total<br/>'
		    },

		    series: [{
		        name: 'Custom Entities',
		        colorByPoint: true,
		        data : chartData
		    }],
		});
  	}
  	
});
