let mobileBannerSizes = ["120x60", "120x600", "160x600", "250x250", "300x250", "320x100", "320x320", "728x90", "970x250", "300x600"];
let desktopBannerSizes = ["320x50", "300x250", "250x250", "320x100", "320x160", "320x480", "480x320", "728x90", "1024x768", "768x1024"];
let placementName;
let amsId;
let amsIdUsedArr = [];
let placementNameUsedArr = [];
let openOutputSectionModal = true;
let collectAmsData = [];
let updatingValues;
let updatedAMSArr;
document.addEventListener('DOMContentLoaded', function() {
  getElementById("startDate").value = (new Date()).toLocaleDateString();
  getElementById("endDate").value = new Date(new Date().getFullYear() + 1, 11, 31).toLocaleDateString();
  let elemsModal = document.querySelectorAll('.modal');
  let instancesModal = M.Modal.init(elemsModal, null);
  $('#signInModal')[0].click();
  // document.getElementById("signinOnLoad").addEventListener("click", event => {
  //   $('#modalInitial').close();
  // });

  let elemsDropDownTrigger = document.querySelectorAll('.dropdown-trigger');
  let instancesDDT = M.Dropdown.init(elemsDropDownTrigger, null)
  let elemsTT = document.querySelectorAll('.tooltipped');
  let instancesTT = M.Tooltip.init(elemsTT, null);
  let elemsChips = document.querySelectorAll('.chips');
  let instancesChips = M.Chips.init(elemsChips, null);
  let elemsdp = document.querySelectorAll('.datepicker');
  let instancesdp = M.Datepicker.init(elemsdp, null);
  // addOptionTags('mulMobDm', mobileBannerSizes);
  // addOptionTags('mulDskDm', desktopBannerSizes);
  let elemsSelect = document.querySelectorAll('select');
  let instancesSelect = M.FormSelect.init(elemsSelect, null);
  const arrayofDataObjs = {
    "brands": brandImages,
    "countries": countriesLL,
    "budgets": budgets,
    "kpis": kpis,
    "buyingMetrics": buyingMetrics,
    "agencyNamesList": agencyNamesList,
    "networkNamesList": networkNamesList,
    "dimensionsArr": dimensionsArr
  };
  var arrSize = Object.keys(arrayofDataObjs).length;
  var keys = Object.keys(arrayofDataObjs);
  var values = Object.values(arrayofDataObjs);
  for (i = 0; i <= arrSize; i++) {
    $('input.' + keys[i]).autocomplete({
      data: values[i],
    });
  }
  $('.chips-initialBannerSizes').chips({
    data: dimensionsBannerArr,
  });
  $('.chips-initialVideoSizes').chips({
    data: dimensionsVideoArr,
  });
});


let previousDivContainerId = null;
let previousEventTarget = null;
let previousParentElement = null;
let paginationLength = null;
document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('.generateOutput').addEventListener("click", event => {
    if ((M.Modal.getInstance(document.getElementById('modal1'))).isOpen) {
      openOutputSectionModal = true;
    }
  });
  $('.tabs').tabs();
  document.querySelector('.adDimensions').addEventListener("change", event => {
    let adDimensions = getElementById("adDimensions");
    switch (adDimensions.value) {
      case "BAN":
        displayBlock("bannerSizes");
        displayNone("videoLengths");
        break;
      case "VOD":
        displayBlock("videoLengths");
        displayNone("bannerSizes");
        break;
      default:
        displayNone("bannerSizes");
        displayNone("videoLengths");
        break;
    }
  });


  displayNone('tsTable');
  displayNone('placementTable');
  displayNone('exptToExcel');
  displayNone('nonTableSection');
  document.querySelector('.platforms').addEventListener("change", event => {
    let platforms = [];
    $('#platforms option:selected').each(function(i, selected) {
      platforms[i] = $(selected).attr('value');
    });
    if (platforms.length == 0) {
      displayNone('andLp');
      displayNone('andlpIcon');
      displayNone('iosLp');
      displayNone('ioslpIcon');
      displayNone('dskLp');
      displayNone('mobLp1');
      displayNone('mobLp2')
      displayNone('dskLpIcon');
      displayNone('mobLp1Icon');
      displayNone('ctvLpIcon');
    }
    if (platforms.includes("ANDLP")) {
      displayBlock('andLp');
      displayBlock('andlpIcon');
    } else if (!(platforms.includes("ANDLP"))) {
      displayNone('andLp');
      displayNone('andlpIcon');
    }
    if (platforms.includes("IOSLP")) {
      displayBlock('iosLp')
      displayBlock('ioslpIcon');
    } else if (!(platforms.includes("IOSLP"))) {
      displayNone('iosLp');
      displayNone('ioslpIcon');
    }
    if (platforms.includes("DSKLP")) {
      displayBlock('dskLp');
      displayBlock('dsklpIcon');

    } else if (!(platforms.includes("DSKLP"))) {
      displayNone('dskLp');
      displayNone('dsklpIcon');
    }
    if (platforms.includes("MOBLP")) {
      displayBlock('mobLp');
      // displayBlock('mobLp2')
      displayBlock('moblpIcon');

    } else if (!(platforms.includes("MOBLP"))) {
      displayNone('mobLp');
      // displayNone('mobLp2')
      displayNone('moblpIcon');
    }
    if (platforms.includes("DISLP")) {
      displayBlock('disLp');
      // displayBlock('disLp2')
      displayBlock('dislpIcon');

    } else if (!(platforms.includes("DISLP"))) {
      displayNone('disLp');
      // displayNone('disLp2')
      displayNone('dislpIcon');
    }if (platforms.includes("CTVLP")) {
      displayBlock('ctvLp');
      // displayBlock('disLp2')
      displayBlock('ctvlpIcon');

    } else if (!(platforms.includes("CTVLP"))) {
      displayNone('ctvLp');
      // displayNone('disLp2')
      displayNone('ctvlpIcon');
    }
  });
});
let serverCampaignName;

function generateOutput() {
  //display trafficiking sheet table and export to excel button
  //updateSignInStatus();
  displayBlock('tsTable');
  displayBlock('nonTableSection');
  displayBlock('exptToExcel');
  displayBlock('toCreateJiraTkt');

  let yourName = getValueById('requester');
  let brand = getValueByClassName('brands');
  if (!brand) {
    $('#modal-trigger')[0].click();
    getElementById('modal1text').innerHTML = "Please select a Brand."
    return;
  }
  let country = countries[getValueByClassName('countries')];
  if (!country) {
    $('#modal-trigger')[0].click();
    getElementById('modal1text').innerHTML = "Please select a GEO."
    return;
  }
  let platforms = [];
  $('#platforms option:selected').each(function(i, selected) {
    platforms[i] = $(selected).attr('value');
  });
  let campaignName = getValueById('campaignName');
  if (!campaignName) {
    $('#modal-trigger')[0].click();
    getElementById('modal1text').innerHTML = "Please input a Campaign Name."
    return;
  }
  let budgetCode = budgetCodes[getValueByClassName('budgets')];
  if (!budgetCode) {
    $('#modal-trigger')[0].click();
    getElementById('modal1text').innerHTML = "Please select a Budget Code."
    return;
  }
  let agency = getValueByClassName('agencyNamesList');
  if (!agency) {
    $('#modal-trigger')[0].click();
    getElementById('modal1text').innerHTML = "Please select an agency."
    return;
  }
  let buyingPlatforms = getValueByClassName('networkNamesList');
  if (!buyingPlatforms) {
    $('#modal-trigger')[0].click();
    getElementById('modal1text').innerHTML = "Please select a buying platform."
    return;
  }
  let publisherOrNetwork = getValueById('publisherOrNetwork');
  if (!publisherOrNetwork) {
    $('#modal-trigger')[0].click();
    getElementById('modal1text').innerHTML = "Please select a Publisher Network."
    return;
  }
  let subSite = getValueById('sub-site');
  if (!subSite) {
    $('#modal-trigger')[0].click();
    getElementById('modal1text').innerHTML = "Please select a subsite."
    return;
  }
  let audience = getValueById('audience');
  let vertical = getValueById('vertical');
  let message = getValueById('message');
  let offer = getValueById('offer');
  let targeting = getValueById('targeting');
  let subTargeting = getValueById('subTargeting');
  let cost = getValueById('cost');
  let regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;

  let andLpLc;
  let iosLpLc;
  let dskLpLc;
  let mobLpLc;
  let disLpLc;
  let ctvLpLc;
  if ((platforms.toString()).includes("LP")) {
    let andLp = getElementById('andLp').value;
    if (platforms.toString() == "ANDLP") {
      if (andLp) {
        andLpLc = andLp;
        if (!regex.test(andLpLc)) {
          $('#modal-trigger')[0].click();
          getElementById('modal1text').innerHTML = "Please enter a proper URL.";
          return;
        }
      } else if (andLp == "") {
        $('#modal-trigger')[0].click();
        getElementById('modal1text').innerHTML = "Please enter a URL.";
        return;
      }
    }
    let iosLp = getElementById('iosLp').value;
    if (platforms.toString() == "IOSLP") {
      if (iosLp) {
        iosLpLc = iosLp;
        if (!regex.test(iosLpLc)) {
          $('#modal-trigger')[0].click();
          getElementById('modal1text').innerHTML = "Please enter a proper URL.";
          return;
        }
      } else if (iosLp == "") {
        $('#modal-trigger')[0].click();
        getElementById('modal1text').innerHTML = "Please enter a URL.";
        return;
      }
    }
    let dskLp = getElementById('dskLp').value;
    if (platforms.toString() == "DSKLP") {
      if (dskLp) {
        dskLpLc = dskLp;
        if (!regex.test(dskLpLc)) {
          $('#modal-trigger')[0].click();
          getElementById('modal1text').innerHTML = "Please enter a proper URL."
          return;
        }
      } else if (dskLp == "") {
        $('#modal-trigger')[0].click();
        getElementById('modal1text').innerHTML = "Please enter a URL.";
        return;
      }
    }
    let mobLp = getElementById('mobLp').value;
    if (platforms.toString() == "MOBLP") {
      if (mobLp) {
        mobLpLc = mobLp.toLowerCase();
        if (!regex.test(mobLpLc)) {
          $('#modal-trigger')[0].click();
          getElementById('modal1text').innerHTML = "Please enter a proper URL."
          return;
        }
      } else if (mobLp == "") {
        $('#modal-trigger')[0].click();
        getElementById('modal1text').innerHTML = "Please enter a URL.";
        return;
      }
    }
    // let mobLp2 = getValueById('mobLp2');
    // if (mobLp2) {
    //    mobLp2Lc = mobLp2.toLowerCase();
    //   if (!regex.test(mobLp2Lc)) {
    //     $('#modal-trigger')[0].click();
    //     getElementById('modal1text').innerHTML = "Please enter a proper URL."
    //     return;
    //   }
    // }
    let disLp = getElementById('disLp').value;
    if (platforms.toString() == "DISLP") {
      if (disLp) {
        disLpLc = disLp.toLowerCase();
        if (!regex.test(disLpLc)) {
          $('#modal-trigger')[0].click();
          getElementById('modal1text').innerHTML = "Please enter a proper URL."
          return;
        }
      } else if (disLp == "") {
        $('#modal-trigger')[0].click();
        getElementById('modal1text').innerHTML = "Please enter a URL.";
        return;
      }
    }

    let ctvLp = getElementById('ctvLp').value;
    if (platforms.toString() == "CTVLP") {
      if (ctvLp) {
        ctvLpLc = ctvLp.toLowerCase();
        if (!regex.test(ctvLpLc)) {
          $('#modal-trigger')[0].click();
          getElementById('modal1text').innerHTML = "Please enter a proper URL."
          return;
        }
      } else if (ctvLp == "") {
        $('#modal-trigger')[0].click();
        getElementById('modal1text').innerHTML = "Please enter a URL.";
        return;
      }
    }
  }
  // let disLp2 = getValueById('disLp2');
  // if (disLp2) {
  //    disLp2Lc = disLp2.toLowerCase();
  //   if (!regex.test(disLp2Lc)) {
  //     $('#modal-trigger')[0].click();
  //     getElementById('modal1text').innerHTML = "Please enter a proper URL."
  //     return;
  //   }
  // }
  let kpi = getValueByClassName('kpis');
  let buyingMetric = getValueByClassName('buyingMetrics');
  let date_range = getValueById('startDate') + " - " + getValueById('endDate');
  let getCardClass = document.querySelector('.card-content');
  getCardClass.innerHTML = `
  <p>KPI  - ${kpi}</p>
  <!-- <p>BUYING METRIC - ${buyingMetric}</p> -->
  <p>FLIGHT DATES - ${date_range}</p>
  <br/>
  <p>TS REQUESTER - ${yourName}</p>
`;

  let adDimensions = [];
  $('#adDimensions option:selected').each(function(i, selected) {
    adDimensions[i] = $(selected).attr('value');
  });
  let adDimensionsSelected = [];
  let sd = getElementById("deliverables");
  let deliverables = sd.options[sd.selectedIndex].text;
  console.log("Develirable Selected   "+deliverables);
  if (adDimensions == "1x1") {
    adDimensionsSelected = ["1x1"];
  } else if (adDimensions == "BAN") {
    let selectedChipNodesDmsns = document.querySelector('.bannerSizes').innerText.split("close");
    selectedChipNodesDmsns.pop();
    for (var i = 0; i < selectedChipNodesDmsns.length; i++) {
      adDimensionsSelected.push(selectedChipNodesDmsns[i]);
    }
  //  deliverables = "Javascript Tag";
  } else if (adDimensions == "VOD") {
    let selectedChipNodesDmsns = document.querySelector('.videoLengths').innerText.split("close");
    selectedChipNodesDmsns.pop();
    for (var i = 0; i < selectedChipNodesDmsns.length; i++) {
      adDimensionsSelected.push(selectedChipNodesDmsns[i].replace("↵close", ""));
    }
  //  deliverables = "VAST/VPAID Tag";
  }
  let tsTBE = getElementById('tsTable');
  let placementTBE = getElementById('placementTable');
  if (openOutputSectionModal) {
    $('#modal-outputSection')[0].click();
    displayBlock('modal-outputSection');
  }
  adDimensionsSelected.forEach(function(subAdDimensionsSelected, indexSubAdDimnsionSelected) {
    platforms.forEach(function(platformSelected, indexPlatforms) {
      let landingPage = "AppStore";
      let lowerCasePlatformsSelected;
      if (platformSelected.search("LP") > 1) {
        lowerCasePlatformsSelected = platformSelected[0].toLowerCase() + platformSelected[1].toLowerCase() + platformSelected[2].toLowerCase() + platformSelected[3] + platformSelected[4].toLowerCase();
        // if(lowerCasePlatformsSelected == "mobLp"){
        //   lowerCasePlatformsSelected = lowerCasePlatformsSelected+"1";
        // }
        landingPage = document.getElementById(lowerCasePlatformsSelected).value;
        console.log("landingPage      " + landingPage);
      }
      let tsData = new Array();
      let createTr = document.createElement("tr");
      let createTrPlcmnt = document.createElement("tr");
      tsTBE.appendChild(createTr);
      placementTBE.appendChild(createTrPlcmnt);
      let truncatedPlatform = platformSelected.substr(0, 3);
      let iOSLandingPage = "";
      let andLandingPage = "";
      let dskLandingPage = "";
      if (truncatedPlatform === "DSK") {
        truncatedPlatform = "Desktop";
        dskLandingPage = dskLpLc;
      } else if (truncatedPlatform === "AND") {
        truncatedPlatform = "Android";
        andLandingPage = andLpLc;
      } else if (truncatedPlatform === "IOS") {
        truncatedPlatform = "iOS";
        iOSLandingPage = iosLpLc;
      } else if (truncatedPlatform === "MOB") {
        truncatedPlatform = "MOB"
        dskLandingPage = mobLpLc;
      } else if (truncatedPlatform === "DIS") {
        truncatedPlatform = "DIS"
        dskLandingPage = disLpLc;
      } else if (truncatedPlatform === "CTV") {
        truncatedPlatform = "CTV"
        dskLandingPage = ctvLpLc;
      }

      let chosenDimension;

      tsData.push(brand, country, truncatedPlatform, campaignName.trim(), budgetCode, agency, buyingPlatforms, publisherOrNetwork.trim(), subSite.trim(), audience, vertical.trim(), message.trim(), offer.trim(), subAdDimensionsSelected.trim(), targeting, subTargeting, deliverables,buyingMetric, cost, landingPage);
      tsData.forEach(function(tableElement, indexTSData) {
        // var chkbox = document.createElement('input');
        // chkbox.type = "checkbox";
        // chkbox.id = "chk";
        // chkbox.name = "chk";
        let createTd = document.createElement("td");
        let contentEditable = document.createAttribute("contenteditable");
        contentEditable.value = "true";
        createTd.setAttributeNode(contentEditable);
        createTd.innerHTML = tableElement;
        // createTd.appendChild(chkbox);
        createTr.appendChild(createTd);
      });
      let tsDtFrPlacmntNme = new Array();
      if (truncatedPlatform == "Desktop") {
        truncatedPlatform = "DESK";
      } else if (truncatedPlatform == "Android") {
        truncatedPlatform = "AND";
      }
      let brandCode = brands[brand];
      tsDtFrPlacmntNme.push(brandCode, country, truncatedPlatform, campaignName.trim(), budgetCode, agency, buyingPlatforms, publisherOrNetwork.trim(), subSite.trim(), audience, vertical.trim(), message.trim(), offer.trim(), "amsId", subAdDimensionsSelected.trim(), targeting, subTargeting, buyingMetric, cost, landingPage);
      placementName = tsDtFrPlacmntNme.join("-");
      let networkPublisher = (agency + buyingPlatforms).toUpperCase();
      serverCampaignName = brandCode + " " + country + " " + campaignName + " " + budgetCode + " " + new Date().getFullYear();
      let placementTableArray = new Array();
      if (iOSLandingPage === undefined) {
        iOSLandingPage = "AppStore";
      } else if (andLandingPage === undefined) {
        andLandingPage = "AppStore";
      }
      console.log("dskLandingPage " + dskLandingPage);
      placementTableArray.push(placementName, iOSLandingPage, andLandingPage, dskLandingPage, networkPublisher, "Display", "dcm", deliverables, serverCampaignName, buyingMetric, cost, kpi, getValueById('startDate'), getValueById('endDate'));
      placementTableArray.forEach(function(tableElement, indexplTData) {
        let createTdPlTb = document.createElement("td");
        createTdPlTb.innerHTML = tableElement;
        createTrPlcmnt.appendChild(createTdPlTb);
      });
    });
  });

}

function fnExcelReport() {
  var n = new Date().toLocaleDateString();
  var d = n.split("/")[2] + n.split("/")[1] + n.split("/")[0];
  let tsTable = getElementById("tsTable");
  var tbl = document.getElementById("tsTable");
  console.log("tbl  " + tbl.rows[2].cells.item(18).innerHTML);
  let placementTable = getElementById("placementTable");
  //console.log("placementTable  "+placementTable.rows[0].cells.item(18).innerHTML);
  let tsDtFrPlacmntNmeNew = [];
  let newPlacementName;
  console.log("gapi.auth2.getAuthInstance().isSignedIn.get() " + gapi.auth2.getAuthInstance().isSignedIn.get());
  updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());

  if (tbl != null && placementTable != null) {
    for (var i = 2; i < tbl.rows.length; i++) {
      let tsDtInnerFrPlacmntNmeNew = [];
      let brandNew;
      for (var j = 0; j <= 15; j++) {
        tsDtInnerFrPlacmntNmeNew.push(tbl.rows[i].cells.item(j).innerHTML);
        console.log("row item    " + j + "  " + tbl.rows[i].cells.item(j).innerHTML);
      }
      tsDtInnerFrPlacmntNmeNew.splice(0, 1, brands[tbl.rows[i].cells.item(0).innerHTML]);
      tsDtInnerFrPlacmntNmeNew.splice(2, 1, platformCodes[tbl.rows[i].cells.item(2).innerHTML]);
      tsDtInnerFrPlacmntNmeNew.join("-");
      tsDtInnerFrPlacmntNmeNew.splice(13, 0, amsIdArr[i - 2]);
      amsIdUsedArr.push(amsIdArr[i - 2]);
      let joinedtsDtInnerFrPlacmntNmeNew = tsDtInnerFrPlacmntNmeNew.join("-");
      console.log("PlcmntNmeNew    " + joinedtsDtInnerFrPlacmntNmeNew);
      document.getElementById("placementTable").rows[i].cells.item(0).innerHTML = joinedtsDtInnerFrPlacmntNmeNew;
      //document.getElementById("placementTable").rows[i].cells.item(i).innerHTML = joinedtsDtInnerFrPlacmntNmeNew;
      tsDtFrPlacmntNmeNew.push(joinedtsDtInnerFrPlacmntNmeNew);
      placementNameUsedArr.push(joinedtsDtInnerFrPlacmntNmeNew);
    }
  }

  console.log("tbl before  " + tbl.rows[2].cells.item(18).innerHTML);

  TableToExcel.convert(tsTable, {
    name: `TS_` + serverCampaignName + "_" + d + `.xlsx`,
    sheet: {
      name: `TS_` + serverCampaignName + "_" + d
    }
  });
  console.log("tbl after  " + tbl.rows[2].cells.item(18).innerHTML);


  TableToExcel.convert(placementTable, {
    name: `URLBuilderUpload_` + serverCampaignName + "_" + d + `.csv`,
    sheet: {
      name: `URLBuilderUpload_` + serverCampaignName + "_" + d
    }
  });

  // handleSignInClick();
  // updateSignInStatus();
  console.log(amsIdUsedArr);
  console.log(placementNameUsedArr);
  updatingValues = [amsIdUsedArr, placementNameUsedArr].reduce((c, v) => {
    v.forEach((o, i) => {
      c[i] = c[i] || [];
      c[i].push(o);
    });
    return c;
  }, []);
  console.log(" updatingValues " + updatingValues[0]);
  batchUpdateValues('1-n2IWBQmrO2wSlR3b3W8bolNxrBRwL2gkPJeaLz79G0', 'Sheet1!B:C', 'USER_ENTERED', updatingValues, callback);
}





//function to display an element
const displayBlock = elementId => {
  getElementById(elementId).style.display = "block";
}

//function to remove display of an element
const displayNone = elementId => {
  getElementById(elementId).style.display = "none";
}

// function to get value of an element by id
const getValueById = elementId => {
  return (getElementById(elementId).value).toUpperCase();
}

//function to get element by id
const getElementById = elementId => {
  return document.getElementById(elementId);
}

// function to get value of a classname
const getValueByClassName = classNme => {
  return document.getElementsByClassName(classNme)[0].value;
}

//function to dynamically add options to the select tag
const addOptionTags = (elementId, dimensionArr) => {
  const htmlElement = getElementById(elementId);
  dimensionArr.forEach((item, i) => {
    htmlElement.innerHTML += `<option value=${item}>${item}</option>`;
  });
}

//This functioncalls a g.sheet and fetches AMSid which are not assigned to the placements.
let amsIdArr = [];

function initClient() {
  var API_KEY = 'AIzaSyCatCt5LLHwUcyQtVdCwu_F46A4pcmSXkQ'; // TODO: Update placeholder with desired API key.

  var CLIENT_ID = '242856726277-6a9j6geqin7hqmngon9i710rptaq93br.apps.googleusercontent.com'; // TODO: Update placeholder with desired client ID.
  // TODO: Authorize using one of the following scopes:
  //   'https://www.googleapis.com/auth/drive'
  //   'https://www.googleapis.com/auth/drive.file'
  //   'https://www.googleapis.com/auth/spreadsheets'
  var SCOPE = 'https://www.googleapis.com/auth/spreadsheets';

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

function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}

function updateSignInStatus(isSignedIn) {
  if (isSignedIn) {
    getValues("1-n2IWBQmrO2wSlR3b3W8bolNxrBRwL2gkPJeaLz79G0", "Sheet1!B:C", callback);
  }
}

function handleSignInClick(event) {
  gapi.auth2.getAuthInstance().signIn();
  displayBlock("closeModal");
  displayNone("signinOnLoad");
}

function handleSignOutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}

function callback(response) {
  // console.log("called back   " + response.result);
}



function batchUpdateValues(spreadsheetId, range, valueInputOption, _values, callback) {

  // console.log(spreadsheetId);
  // console.log(range);
  // console.log(valueInputOption);
  // console.log(_values);

  // spreadsheetId = "1-n2IWBQmrO2wSlR3b3W8bolNxrBRwL2gkPJeaLz79G0";
  // range = "Sheet1!B:C";
  // valueInputOption = "USER_ENTERED";
  // _values = [
  //   ["18779496", "PS-DE-AND-ALWAYSON-G-TSG-Mediamath-OM-ROS-ALL-ALL-TEST--18779496-1x1-P-X"],
  //   ["18779504", "PS-DE-iOS-ALWAYSON-G-TSG-Mediamath-OM-ROS-ALL-ALL-TEST--18779504-1x1-P-X"],
  //   ["18779512", "PS-DE-iOS-ALWAYSON-G-TSG-Mediamath-OM-ROS-ALL-ALL-TEST--18779512-1x1-P-X"],
  //   ["18779520", "PS-DE-iOS-ALWAYSON-G-TSG-Mediamath-OM-ROS-ALL-ALL-TEST--18779520-1x1-P-X"],
  //   ["18779538", "PS-DE-iOS-ALWAYSON-G-TSG-Mediamath-OM-ROS-ALL-ALL-TEST--18779538-1x1-P-X"]
  // ];

  // 1. Retrieve the existing values from "Sheet1" in the Spreadsheet using the method of values.get in Sheets API.
  gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: spreadsheetId,
      range: range
    })
    .then(function(response) {

      // 2. Create the updated values using the retrieved values.
      let values = response.result.values;
      const obj = values.reduce((o, [b], i) => Object.assign(o, {
        [b]: i
      }), {});
      const addValues = _values.reduce((ar, [b, c]) => {
        if (obj[b]) {
          values[obj[b]][1] = c;
        } else {
          ar.push([b, c]);
        }
        return ar;
      }, []);
      values = values.concat(addValues);

      // 3. Put the updated values to "Sheet1" using your script.
      var data = [];
      data.push({
        range: range,
        values: values
      });
      var body = {
        data: data,
        valueInputOption: valueInputOption
      };
      gapi.client.sheets.spreadsheets.values.batchUpdate({
          spreadsheetId: spreadsheetId,
          resource: body
        })
        .then((response) => {
          var result = response.result;
          console.log(`${result.totalUpdatedCells} cells updated.`);
          callback(response);
        });
    }, function(reason) {
      console.error('error: ' + reason.result.error.message);
    });
}

function getValues(spreadsheetId, range, callback) {
  // [START sheets_get_values]
  gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: spreadsheetId,
    range: range
  }).then((response) => {
    var result = response.result;
    var numRows = result.values ? result.values.length : 0;
    console.log(`${numRows} rows retrieved.`);
    collectAmsData = Array.from(result.values);
    for (i = 1; i < collectAmsData.length; i++) {
      if (collectAmsData[i].toString().length <= 30) {
        let amsId = collectAmsData[i].toString().split(",");
        //console.log("AMSID  " + amsId[0]);
        amsIdArr.push(amsId[0]);
      }
    }
    // [START_EXCLUDE silent]
    callback(response);
    // [END_EXCLUDE]
  });

  // [END sheets_get_values]
}
