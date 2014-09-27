$(document).ready(function() {
    $("#move").hide();
});


$(window).load(function(){
  $(".button").click(function() {
    $('.selected').removeClass('selected');
    $(this).addClass('selected');
    var carId = $(this).attr('id').replace("car_","");
    var carLength = findById(carId).cars.car_length;    
  });
});

$(window).load(function() {
	$("#searchbutton").click(function(){;
		$('.button').filter(function(index) {
			var carName = $(this).text();
			var searchText = $('#searchfield').prop('value');
			return ( carName === searchText);
		}).each(function() {
			console.log($(this));
			$(this).addClass('selected');
	  });
  });
});

$(window).load(function() {
   $(".button").click(function() {
    if ($(".button").hasClass('selected')) {
    $("#move").show();
  } else {
    $("#move").hide();
  }
});
});

$(window).load(function(){
  $("#move").click(enableTrackButtons);
});

var enableTrackButtons = function(){
  $('.trackbutton').addClass('highlightTrack');
  $('.trackbutton').on('click', moveCarToTrack);
}

var moveCarToTrack = function(){
  var track = $(this).parent();
  var emptyUnitCount = track.children('.empty_unit').length;
  var car = $('.selected');
  var carId = car.attr('id').replace("car_","");


  var carLength = findById(carId).cars.car_length;
 /* var fromUnits = [];
  var carUnit = car.parent();
    for (i=0;i<carLength;i++) {         
      fromUnits.push(carUnit);
      var carUnit = carUnit.next(); 
    }*/
  var currentUnit;
  
  
    if(carLength > emptyUnitCount) {
      alert('car is too long!');
      $('.selected').parent('.unit').removeClass('empty_unit');
    } else {
      var r = confirm("Are you sure you want to move");
      if (r===true) {
        //$('.selected').parent('.unit').toggleClass('empty_unit');
        currentUnit = $('.selected').parent('.unit');
        currentUnit.addClass('empty_unit');
        var newUnit = $(this).parent().children('.empty_unit').first();
        newUnit.append($('.selected'));
        newUnit.removeClass('empty_unit');
        if (carLength > 1) {
          for (i=1;i<carLength;i++) {
            currentUnit = currentUnit.next();
            currentUnit.addClass('empty_unit');
            newUnit = newUnit.next();
            newUnit.removeClass('empty_unit');
            //$('.selected').parent('.unit').next().toggleClass('empty_unit');
          }
        };
         //var parentId = $(this).parent().attr('id');
         /*if ($(this).parent().children('.empty_unit').size() > 0) {
            $(this).parent().children('.empty_unit').first().append($('.selected'));
            $(this).parent().children('.empty_unit').first().removeClass('empty_unit');
            
            if (carLength > 1) {
                for (j=0;j<carLength;j++) {
                  newUnit = newUnit.next();
                  newUnit.removeClass('empty_unit');
                  //track.children('.empty_unit').eq(i).removeClass('empty_unit');
                }
              };
         }*/ /*else {
            fromUnits.each().removeClass('empty_unit');
         }*/
         
    }
  }
   $("button.button.selected").removeClass("selected");
   $("button.trackbutton.highlightTrack").removeClass("highlightTrack");
   $(this).off('click', moveCarToTrack);
   $("#move").hide();
  
}

//declare global variables
var thegame;
thegame = new mygame;

//create your object 
function mygame(){
  this.tracks = [];
  this.yards = [];
  this.unit = [];
  this.cars = [];
//an object method to say something
  this.sayhello = function (){
    console.log ('hello world');
  };
  this.addtrack = function (jsonTrack){ 
    var newtrack = new track();
    jQuery.extend(newtrack, jsonTrack);
    this.tracks.push(newtrack);
    newtrack.show();
  };
  this.addyard = function (jsonYard){
    var newyard = new yard();
    jQuery.extend(newyard, jsonYard);
    this.yards.push(newyard);
    newyard.showYardName();    
  };
  this.addunit = function (jsonUnit, trackid){
    var newunit = new unit();
    jQuery.extend(newunit, jsonUnit);
    this.unit.push(newunit);
    newunit.show(trackid);  

  };
    this.addcar = function (jsonUnit, unitid){
    var newcar = new car();
    jQuery.extend(newcar, jsonUnit);
    this.cars.push(newcar);
    newcar.show(unitid); 
    };
}

function yard(){
    /*var yardid;
  var yardname;*/
  this.showYardName = function () {
    var yard = $("#yard");
    yard.append('<h2 align="center">'+this.yard_name+'</h2>').trigger('create');
    console.log("y="+this.yard_name);
  };
}

function track()
{  
  function createTrack(jsonDataObject){
    this.track_id = jsonDataObject.track_id;
    for(i=0;i<jsonDataObject.units.length;i++){
      this.units.push(jsonDataObject.units[i])
    }
  }
  /*var trackname;*/
  this.debug = function (){
     console.log ('my id is: ' + this.track_id);
  };
  this.show = function () {
    $('#yard').append('<div class="track" id="t'+this.track_id+'"><button class="trackbutton">'+this.track_name+'</button></div>').trigger('create'); 
  };
}

var found = false;
function lookForCar (currentCarId) {
  for (c=0;c<thegame.cars.length;c++) {
    if (thegame.cars[c].cars.car_id === currentCarId) {          
          found = true;
          break;
          }
  }
}


function findById(id) {
    for (c=0;c<thegame.cars.length;c++) {
      if (thegame.cars[c].cars.car_id === id) {
        return thegame.cars[c];
      }
    }    
  }


function unit(){
  this.show = function (id) {
    $('#'+id).append('<div class="unit" id="u'+this.unit_id+'"></div>').trigger('create'); 
  };
}

function car(){
  this.show = function (id) {
    $('#'+id).append('<button class="button" id="car_'+this.cars.car_id+'">'+this.cars.car_number+'</button>').trigger('create'); 
  };
}

function addClass(id,new_class){
       var i,n=0;

       new_class=new_class.split(",");

       for(i=0;i<new_class.length;i++){
               if((" "+document.getElementById(id).className+" ").indexOf(" "+new_class[i]+" ")==-1){
                       document.getElementById(id).className+=" "+new_class[i];
                       n++;
               }
       }

       return n;
}


$(document).ready (function(){
  
  var server = new ajaxServiceLayer();
  var tracksFromJSON = server.gettracks();
  console.log(tracksFromJSON);
  thegame.addyard(tracksFromJSON);
  for (t=0;t<tracksFromJSON.tracks.length;t++)
  {  
    var currentTrack = tracksFromJSON.tracks[t]
    thegame.addtrack(currentTrack);
    for (u=0;u<currentTrack.units.length;u++)
    {
      var trackid = "t"+currentTrack.track_id;
      var currentUnit = currentTrack.units[u];
      var unitid = "u"+currentUnit.unit_id;
      thegame.addunit(currentTrack.units[u],trackid);
      if (currentUnit.hasOwnProperty('cars')) {
        lookForCar(currentUnit.cars.car_id);
        if (found === false) {
          thegame.addcar(currentUnit,unitid);
            var carid = "car_"+currentUnit.cars.car_id;
            switch(currentUnit.cars.car_length) {
              case "1":
              addClass(carid,'carOneUnit');
              break;
              case "2":
              //document.getElementById("carid").className += "carTwoUnits";
              $('#'+carid).addClass('carTwoUnits');
              //$('#carid').css('width', '140px');
              //addClass(carid,'carTwoUnits');
              break;
              case "3":
              addClass(carid,'carThreeUnits');
              break;
              case "5":
              addClass(carid,'carFiveUnits');
              //#carid.style.cssText = "width:350px";
              break;
            };
            switch(currentUnit.cars.car_status) {
              case "ready":
              addClass(carid,'white');
              break;
              case "just_arrived":
              addClass(carid,'blue');
              break;
              case "not_workable":
              addClass(carid,'red');
              break;
              case "ready_to_be_released":
              addClass(carid,'green');
              break;
            };
            switch(currentUnit.cars.car_type) {
              case "flat":
              $('#'+carid).append('<h3 style="font-size:10px; line-height:0.5">|_'+currentUnit.cars.car_length+'_|</h3>');
              break;
              case "box":
              $('#'+carid).append('<h3 style="font-size:10px; line-height:0.5">[_'+currentUnit.cars.car_length+'_]</h3>');
              break;
              case "gondola":
              $('#'+carid).append('<h3 style="font-size:10px; line-height:0.5">{_'+currentUnit.cars.car_length+'_}</h3>');
              break;              
            }
        }       
        
        else {
            found = false;
        }
       // }
      }
     else {
        addClass(unitid,'empty_unit');
     } 
    }
  };
});

function ajaxServiceLayer(){
  
  this.gettracks = function(){
    
    /*
    $.get("getballs.aspx")
      .done(function(data){
        yard = JSON.parse(data);
      });
    */
    //fake the server for now
    //http://www.w3schools.com/json/json_syntax.asp
    var yard = {
    
            "yard_id": "1",
            "yard_name": "Yard1",
            "yard_location": "location1",
            "tracks": [
                {
                    "track_id": "1",
                    "track_name": "j1",
                    "units": [
                        {
                            "unit_id": "1",
                            "unit_name": "u1",
                            "cars": {
                                "car_id": "1",
                                "car_initials": "TTX",
                                "car_number": "11111",
                                "car_type": "flat",
                                "car_length": "1",
                                "car_status": "ready"
                            }
                        },
                        {
                            "unit_id": "2",
                            "unit_name": "u2",
                            "cars": {
                                "car_id": "2",
                                "car_initials": "TTX",
                                "car_number": "11112",
                                "car_type": "flat",
                                "car_length": "1",
                                "car_status": "just_arrived"
                            }

                        },
                        {
                            "unit_id": "3",
                            "unit_name": "u3",
                            "cars": {
                                "car_id": "3",
                                "car_initials": "TTX",
                                "car_number": "11113",
                                "car_type": "flat",
                                "car_length": "2",
                                "car_status": "ready"
                            }
                        },
                        {
                            "unit_id": "4",
                            "unit_name": "u4",
                            "cars": {
                                "car_id": "3",
                                "car_initials": "TTX",
                                "car_number": "11113",
                                "car_type": "flat",
                                "car_length": "2",
                                "car_status": "ready"
                            }
                        },
                        {
                            "unit_id": "5",
                            "unit_name": "u5"
                        },
                        {
                            "unit_id": "6",
                            "unit_name": "u6"
                        }
                    ]
                },
                {
                    "track_id": "2",
                    "track_name": "j2",
                    "units": [
                        {
                            "unit_id": "7",
                            "unit_name": "u1",
                            "cars": {
                                "car_id": "4",
                                "car_initials": "TTX",
                                "car_number": "11114",
                                "car_type": "flat",
                                "car_length": "1",
                                "car_status": "ready"
                            }
                        },
                        {
                            "unit_id": "8",
                            "unit_name": "u2",
                            "cars": {
                                "car_id": "5",
                                "car_initials": "TTX",
                                "car_number": "11115",
                                "car_type": "flat",
                                "car_length": "1",
                                "car_status": "not_workable"
                            }
                        },
                        {
                            "unit_id": "9",
                            "unit_name": "u3",
                            "cars": {
                                "car_id": "6",
                                "car_initials": "TTX",
                                "car_number": "11116",
                                "car_type": "flat",
                                "car_length": "2",
                                "car_status": "ready"
                            }
                        },
                        {
                            "unit_id": "10",
                            "unit_name": "u4",
                            "cars": {
                                "car_id": "6",
                                "car_initials": "TTX",
                                "car_number": "11116",
                                "car_type": "flat",
                                "car_length": "2",
                                "car_status": "ready"
                            }
                        },
                        {
                            "unit_id": "11",
                            "unit_name": "u5",
                            "cars": {
                                "car_id": "7",
                                "car_initials": "TTX",
                                "car_number": "11117",
                                "car_type": "flat",
                                "car_length": "1",
                                "car_status": "ready_to_be_released"
                            }
                        }
                    ]
                },
                {
                    "track_id": "3",
                    "track_name": "j3",
                    "units": [
                        {
                            "unit_id": "12",
                            "unit_name": "u1",
                            "cars": {
                                "car_id": "8",
                                "car_initials": "TTX",
                                "car_number": "11118",
                                "car_type": "flat",
                                "car_length": "1",
                                "car_status": "ready"
                            }
                        },
                        {
                            "unit_id": "13",
                            "unit_name": "u2",
                            "cars": {
                                "car_id": "9",
                                "car_initials": "TTX",
                                "car_number": "11119",
                                "car_type": "flat",
                                "car_length": "5",
                                "car_status": "ready"
                            }
                        },
                        {
                            "unit_id": "14",
                            "unit_name": "u3",
                            "cars": {
                                "car_id": "9",
                                "car_initials": "TTX",
                                "car_number": "11119",
                                "car_type": "flat",
                                "car_length": "5",
                                "car_status": "ready"
                            }
                        },
                        {
                            "unit_id": "15",
                            "unit_name": "u4",
                            "cars": {
                                "car_id": "9",
                                "car_initials": "TTX",
                                "car_number": "11119",
                                "car_type": "flat",
                                "car_length": "5",
                                "car_status": "ready"
                            }
                        },
                        {
                            "unit_id": "16",
                            "unit_name": "u5",
                            "cars": {
                                "car_id": "9",
                                "car_initials": "TTX",
                                "car_number": "11119",
                                "car_type": "flat",
                                "car_length": "5",
                                "car_status": "ready"
                            }
                        },
                        {
                            "unit_id": "17",
                            "unit_name": "u6",
                            "cars": {
                                "car_id": "9",
                                "car_initials": "TTX",
                                "car_number": "11119",
                                "car_type": "flat",
                                "car_length": "5",
                                "car_status": "ready"
                            }
                        },
                        {
                            "unit_id": "18",
                            "unit_name": "u7"
                        },
                        {
                            "unit_id": "19",
                            "unit_name": "u8"
                        }
                    ]
                },
                {
                    "track_id": "4",
                    "track_name": "j4",
                    "units": [
                        {
                            "unit_id": "20",
                            "unit_name": "u1",
                            "cars": {
                                "car_id": "10",
                                "car_initials": "TTX",
                                "car_number": "11110",
                                "car_type": "flat",
                                "car_length": "1",
                                "car_status": "ready"
                            }
                        },
                        {
                            "unit_id": "21",
                            "unit_name": "u2",
                            "cars": {
                                "car_id": "11",
                                "car_initials": "TTX",
                                "car_number": "11111",
                                "car_type": "flat",
                                "car_length": "1",
                                "car_status": "ready"
                            }
                        },
                        {
                            "unit_id": "22",
                            "unit_name": "u3"
                        }
                    ]
                }
            ]
        
    
};
    console.log(yard);
    return yard;
  };
  
}