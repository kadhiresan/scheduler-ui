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

	$scope.upload=function(form, uploadData, fileForm){
		if(form.$valid){
			console.log('uploadData',uploadData);
			$scope.pageLoader = true;
			userService.addWebinar(uploadData).then(function(resp){
	  			console.log('resp addWebinar',resp);
	            $scope.pageLoader = false;

	          

	            var data = new FormData();
				$.each($("#uploadFile")[0].files, function(i, file) {
					console.log('file',file);
				    data.append('file', file, file.name);
				});

				// for (var pair of data.entries()) {
				// 	console.log('pair',pair);
				// }

	            userService.uploadExcel(data).then(function(resp){
		  			console.log('resp upload',resp);
		            $scope.pageLoader = false;
		        },function(err){
		            $scope.pageLoader = false;
		            utilityService.showmdToast('error',err.message);
		        })
	        },function(err){
	            $scope.pageLoader = false;
	            utilityService.showmdToast('error',err.message);
	        })
		}
  	};

  	$scope.upload

  	$scope.getInstructors = function(){
  		$scope.pageLoader = true;
  		userService.getInstructors().then(function(resp){
            $scope.pageLoader = false;
            $scope.instructorList = resp.data;
        },function(err){
            $scope.pageLoader = false;
            utilityService.showmdToast('error',err.message);
        })
  	};

  	$scope.getCourses = function(){
  		$scope.pageLoader = true;
  		userService.getCourses().then(function(resp){
            $scope.pageLoader = false;
            $scope.courseList = resp.data;
        },function(err){
            $scope.pageLoader = false;
            utilityService.showmdToast('error',err.message);
        })
  	};

  	$scope.getCustomEntities = function(){
  		$scope.pageLoader = true;
  		userService.getCustomEntities().then(function(resp){
            $scope.pageLoader = false;
            console.log('resp',resp);
            $scope.customEntities = resp.data;
        },function(err){
            $scope.pageLoader = false;
            utilityService.showmdToast('error',err.message);
        })
  	};

  	$scope.getSessions = function(){
  		$scope.pageLoader = true;
  		userService.getSessions().then(function(resp){
            $scope.pageLoader = false;
            $scope.sessionList = resp.data;
        },function(err){
            $scope.pageLoader = false;
            utilityService.showmdToast('error',err.message);
        })
  	};

  	$scope.getWebinars = function(){
  		$scope.pageLoader = true;
  		userService.getWebinars().then(function(resp){
            $scope.pageLoader = false;
            $scope.webinarList = resp.data;
        },function(err){
            $scope.pageLoader = false;
            utilityService.showmdToast('error',err.message);
        })
  	};

  	$scope.openentityModal = function(courseKey){
  		$('#entityModal').modal();
  		$scope.courseKey = courseKey;
  		console.log('$scope.courseKey',$scope.courseKey);
  	}

  	$scope.addEntity = function(form, entity){
  		if(form.$valid){
  			var data = {
  				course_key : $scope.courseKey,
  				custom_entity : entity.entity
  			}
  			userService.addCustomEntity(data).then(function(resp){
	            $scope.pageLoader = false;
	            console.log('resp',resp);
	            $scope.getCustomEntities();
	        },function(err){
	            $scope.pageLoader = false;
	            utilityService.showmdToast('error',err.message);
	        })
  		}
  	}

  	$scope.showAnalysis = function(type, filterData){
  		var data;
  		if(type=="overAll"){
  			console.log('in overAll');
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
  		console.log('in getAnalysis',data);
  		userService.getAnalysis(data).then(function(resp){
            $scope.pageLoader = false;
            renderPiechart(resp.data);
        },function(err){
            $scope.pageLoader = false;
            utilityService.showmdToast('error',err.message);
        })
  	}

  	var getEntityAnalysis = function(data,course){
  		console.log('in getAnalysis',data);
  		userService.getEntityAnalysis(data, course).then(function(resp){
  			console.log('resp',resp);
            $scope.pageLoader = false;
            renderBarChart(resp.data);
        },function(err){
            $scope.pageLoader = false;
            utilityService.showmdToast('error',err.message);
        })
  	}

  	$scope.entityAnalysis = function(type, filterData){
  		var data;
  		if(filterData && filterData.course_key){
	  		if(type=="overAll"){
	  			console.log('in overAll');
	  			data = {};
	  			getEntityAnalysis(data,filterData.course_key);
	  		}else{
	    		if(filterData){
	    			data = filterData;
	    			getEntityAnalysis(data,filterData.course_key);
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
        console.log('chartList',chartList);
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
		    plotOptions: {
		        series: {
		            borderWidth: 0,
		            dataLabels: {
		                enabled: true,
		                format: '{point.y:.1f}%'
		            }
		        }
		    },
		    credits : false,
		    tooltip: {
		        headerFormat: '',
		        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
		    },

		    series: [{
		        name: 'Brands',
		        colorByPoint: true,
		        data : chartData
		        // data: [{
		        //     name: 'study_messages',
		        //     y: 20
		        // }, {
		        //     name: 'voice_messages',
		        //     y: 30
		        // }, {
		        //     name: 'video_issues',
		        //     y: 50
		        // }]
		    }],
		});
  	}
  	if($state.is('home.stats')){
  		setTimeout(function() {
	    	// renderPiechart();
	    	// renderBarChart();
	    }, 100);
  	}
    
    

});
