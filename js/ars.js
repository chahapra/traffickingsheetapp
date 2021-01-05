$(document).ready(function() {
  $('select').formSelect();
  $('#audiencetable').hide();
});


function generateaudiencenames() {
  $('#audiencetable').show();
  var formvalues = $("#arsform").serializeArray();
  console.log("formvalues  "+formvalues)
  $.each(formvalues, function(i, field) {
    console.log("field.value "+field.value);
    });
  }
