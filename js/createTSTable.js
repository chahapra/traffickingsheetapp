function createTSExcelLikeTable(){
document.getElementById('paginationSection').style.display = 'none';
document.getElementById('displayPlacementNamesFS').style.display = 'none';
document.getElementById('placementTable').style.display = "block";
var placementTable = document.getElementById('placementTable');
var newtr = document.createElement("tr");
placementTable.appendChild(newtr);
var tdRequester = document.createElement("td");
newtr.appendChild(tdRequester);
tdRequester.innerHTML = document.getElementById('requester').value;

var tdBrand = document.createElement("td");
newtr.appendChild(tdBrand);
tdBrand.innerHTML = document.getElementsByClassName('brands')[0].value;

var tdCountry = document.createElement("td");
newtr.appendChild(tdCountry);
tdCountry.innerHTML = countries[document.getElementsByClassName('countries')[0].value];

var tdplatform = document.createElement("td");
newtr.appendChild(tdCountry);
tdCountry.innerHTML = countries[document.getElementsByClassName('countries')[0].value];

// var country = countries[document.getElementsByClassName('countries')[0].value];
// var platforms = [];
// $('#platforms option:selected').each(function(i, selected) {
//   platforms[i] = $(selected).attr('value');
// });
// var campaignName = document.getElementById('campaignName').value;
// var budgetcode = budgetcodes[document.getElementsByClassName('budgetcodes')[0].value];
// var agency = document.getElementById('agency').value;
// var buyingPlatforms = document.getElementsByClassName('buyingPlatforms')[0].value;
// var publiserOrNetwork = document.getElementById('publiserOrNetwork').value;
// var subSite = document.getElementById('sub-site').value;
// var audience = document.getElementById('audience').value;
// var vertical = document.getElementById('vertical').value;
// var offer = document.getElementById('offer').value;
// var newtr = document.createElement("tr");
// var newtd1 = document.createElement("td");
// var newtd2 = document.createElement("td");
//   var newtd3 = document.createElement("td");
//   var newtd4 = document.createElement("td");
//   var contentEditable = document.createAttribute("contenteditable");
//   contentEditable.value = "true";
//   newtd2.setAttributeNode(contentEditable);
//   tBElement.appendChild(newtr);
//   newtr.appendChild(newtd1);
//   newtr.appendChild(newtd2);
//   newtr.appendChild(newtd3);
//   newtd1.innerHTML = count++;
//   newtd2.innerHTML = placementName;



}
