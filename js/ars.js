$(document).ready(function() {
  $('select').formSelect();
  $('#audiencetable').hide();
});


function generateaudiencenames() {
  $('#audiencetable').show();
  var formvalues = $("#arsform").serializeArray();
  console.log("formvalues  "+formvalues)
  var signal;
  $.each(formvalues, function(i, field) {
    // $("#audiencetable").append("<td>"+ i + " " + field.value+"</td>");
     signal = field.value[0] + " ";
    });
  }
