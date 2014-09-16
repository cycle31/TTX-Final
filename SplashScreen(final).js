 $(function() {
    var progressbar = $( "#progressbar" ),
      progressLabel = $( ".progress-label" );
 
    progressbar.progressbar({
      value: false,
      change: function() {
        progressLabel.text( progressbar.progressbar( "value" ) + "%" );
      },
      complete: function() {
        progressLabel.text( "Complete!" );
      }
    });
 
    function progress() {
      var val = progressbar.progressbar( "value" ) || 0;
 
      progressbar.progressbar( "value", val + 2 );
 
      if ( val < 99 ) {
        setTimeout( progress, 80 );
      }
    }
 
    setTimeout( progress, 2000 );
$('#progressbar').css({background: '#FF0000'});
     $(function() {
    $( "#accordion" ).accordion();
    $(".ui-accordion-header").css("background","#FFF5EE") ;
    $("#accordion li").draggable({
      appendTo: "body",
      helper: "clone"
    
    });
    $("#accordian li").droppable({activeClass: "ui-state-default",
      hoverClass: "ui-state-hover",
      accept: ":not(.ui-sortable-helper)",
      drop: function( event, ui ) {
        $( this ).find( ".placeholder" ).remove();
        $( "<li></li>" ).text( ui.draggable.text() ).appendTo( this );
      }
    }).sortable({
      items: "li:not(.placeholder)",
      sort: function() {
        $( this ).removeClass( "ui-state-default" );
      }
    });

$(".ui-accordion-header.ui-state-active ").css("background","gold") ;
$(".ui-accordion-header.ui-state-default ").css("background","gold") ;
});
  });
  setTimeout(function() {
  window.location.href = "login.html";
}, 6200);

  $( "progress" ).click(function() {
  $( "progressbar.progressbar" ).delay( 100 );
});