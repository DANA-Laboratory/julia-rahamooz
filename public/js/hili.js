$( "#no2" ).hide();
 $( "#no2" ).load( "https://raw.githubusercontent.com/DANA-Laboratory/juliaCourses/master/src/no2.jl", function()
 {
$(document).ready(function() {
  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
  });
});
   $( "#no2" ).show();
 });
