let vendornames = [];
let vendortype = [];
let vendordesc = [];
let vendormaster = [];
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems, null);
  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems, null);
  document.getElementsByClassName("card")[0].style.display = "none";
});

function getdetails() {
  document.getElementById("background-img-vendorpage").style.display = "none";
  document.getElementsByClassName("card")[0].style.display = "block";
  var vendorname = $(event.target).text().replace("cloud", "");
  document.getElementsByClassName("card-title")[0].innerText = vendorname;
  document.getElementById("specific-vendor").innerText = vendormaster[vendorname];
  document.getElementsByClassName("sidenav-overlay")[0].style.opacity = 0;

  // console.log(" Vendor Name   --- "+vendormaster[vendorname]);
  // $("#modal-trigger").click();
}


function getvendordetails() {
  gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: "17CRJRwIPJijUFXbp2aBCUdAHlRVBIL8yN7abf5V3Gew",
    range: "Form Responses 1!A:S"
  }).then((response) => {
    var gsheetrows = response.result.values.length;
    var getslideoutul = document.getElementById("slide-out");
    for (var i = 1; i < gsheetrows; i++) {
      var lielement = document.createElement("li");
      var aelement = document.createElement("a");
      lielement.appendChild(aelement);
      var ielement = document.createElement("i");
      // ielement.innerText = response.result.values[i][1];
      ielement.innerText = "cloud";
      aelement.appendChild(ielement);
      ielement.after(response.result.values[i][1]);
      ielement.setAttribute("class", "material-icons");
      lielement.appendChild(aelement);
      aelement.addEventListener("click", getdetails);
      aelement.setAttribute("href", "#!");
      getslideoutul.appendChild(lielement);
      vendormaster[response.result.values[i][1]] = [response.result.values[i][2], response.result.values[i][3]];
      // vendortype.push(response.result.values[i][2]);
      // vendordesc.push(response.result.values[i][3])
    }
    console.log(vendormaster);
  });
}

function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}

function initClient() {
  var API_KEY = 'AIzaSyCatCt5LLHwUcyQtVdCwu_F46A4pcmSXkQ'; // TODO: Update placeholder with desired API key.

  var CLIENT_ID = '242856726277-6a9j6geqin7hqmngon9i710rptaq93br.apps.googleusercontent.com'; // TODO: Update placeholder with desired client ID.
  // TODO: Authorize using one of the following scopes:
  //   'https://www.googleapis.com/auth/drive'
  //   'https://www.googleapis.com/auth/drive.file'
  //   'https://www.googleapis.com/auth/spreadsheets'
  var SCOPE = 'https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/dfatrafficking';

  gapi.client.init({
    'apiKey': API_KEY,
    'clientId': CLIENT_ID,
    'scope': SCOPE,
    'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
  }).then(function() {
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignInStatus);
    updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
  });
}

function updateSignInStatus(isSignedIn) {


  if (isSignedIn) {
    console.log("user signed in");
    getvendordetails();
    //getValues("1-n2IWBQmrO2wSlR3b3W8bolNxrBRwL2gkPJeaLz79G0", gSheetToUpdate, callback);
    // profileName = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getName();
    // document.querySelector("#modalInitial > div.modal-content > p").innerText = "Welcome " + gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getName();
    // document.querySelector("#requester").value = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getName();
    // displayBlock("closeModal");
    // displayNone("signinOnLoad");
    // justLoadDFAClient();
  }
}
