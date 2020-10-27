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
let tsTBE;
let gSheetToUpdate = 'Sheet1!B:C';
let paidSocialCampaign;
document.addEventListener('DOMContentLoaded', function() {

  //   document.querySelectorAll('trim').addEventListener("change", event => {
  //     document.querySelectorAll('trim')[0].value.trim;
  // });
  $(document).on('click', '#tsTable tr', function() {
    checkTsTableLength();
  })

  document.querySelector('.checkcircle').addEventListener("click", event => {
    displayBlock('exptToExcel');
    displayBlock('toCreateJiraTkt');
    displayNone('check_circle');
  });
  document.querySelector('.networkNamesList').addEventListener("change", event => {
    let a = getValueByClassName("agencyNamesList");
    let b = getValueByClassName("networkNamesList");
    if (a === "TSG" && b === "DV360") {
      console.log("getElementById('publisherOrNetwork')   " + getElementById('publisherOrNetwork'));
      getElementById('publisherOrNetwork').value = "Youtube";
    }
  });
  getElementById("startDate").value = (new Date()).toLocaleDateString();
  getElementById("endDate").value = new Date(new Date().getFullYear() + 1, 11, 31).toLocaleDateString();
  let elemsModal = document.querySelectorAll('.modal');
  let instancesModal = M.Modal.init(elemsModal, null);
  $('#signInModal')[0].click();
  let elemsDropDownTrigger = document.querySelectorAll('.dropdown-trigger');
  let instancesDDT = M.Dropdown.init(elemsDropDownTrigger, null)
  let elemsTT = document.querySelectorAll('.tooltipped');
  let instancesTT = M.Tooltip.init(elemsTT, null);
  let elemsChips = document.querySelectorAll('.chips');
  let instancesChips = M.Chips.init(elemsChips, null);
  let elemsdp = document.querySelectorAll('.datepicker');
  let instancesdp = M.Datepicker.init(elemsdp, null);
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
      displayNone('mobLp');
      //displayNone('mobLp2')
      displayNone('dsklpIcon');
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
      displayNone('dislpIcon');
    }
    if (platforms.includes("CTVLP")) {
      displayBlock('ctvLp');
      displayBlock('ctvlpIcon');
    } else if (!(platforms.includes("CTVLP"))) {
      displayNone('ctvLp');
      displayNone('ctvlpIcon');
    }
  });
});
let serverCampaignName;
let advertiserId;
let landingPageforDCMlandingPageId;

function generateOutput() {

  displayBlock('tsTable');
  displayBlock('nonTableSection');
  displayBlock('check_circle');
  displayNone('exptToExcel');
  displayNone('toCreateJiraTkt');
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
  if (budgetCode == 'PAIDSOCIAL' || agency == 'Outflink') {
    gSheetToUpdate = 'Sheet2!B:C';
    paidSocialCampaign = true;
  }

  let buyingPlatforms = getValueByClassName('networkNamesList');
  if (!buyingPlatforms) {
    $('#modal-trigger')[0].click();
    getElementById('modal1text').innerHTML = "Please select a buying platform."
    return;
  }
  let publisherOrNetwork = getElementById('publisherOrNetwork').value;
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
  let targeting = [];
  $('#targeting option:selected').each(function(i, selected) {
    targeting[i] = $(selected).attr('value');
  });
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
  let kpi = getValueByClassName('kpis');
  let buyingMetric = getValueByClassName('buyingMetrics');
  let date_range = getValueById('startDate') + " - " + getValueById('endDate');
  let getCardClass = document.querySelector('.card-content');
  getCardClass.innerHTML = `
  <p>KPI  - ${kpi}</p>
  <p>FLIGHT DATES - ${date_range}</p>
  <p>TS REQUESTER - ${yourName}</p>
`;

  let adDimensions = [];
  $('#adDimensions option:selected').each(function(i, selected) {
    adDimensions[i] = $(selected).attr('value');
  });
  let adDimensionsSelected = [];
  let sd = getElementById("deliverables");
  let deliverables = sd.options[sd.selectedIndex].text;
  console.log("Develirable Selected   " + deliverables);
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
  tsTBE = getElementById('tsTable');
  let placementTBE = getElementById('placementTable');
  if (openOutputSectionModal) {
    $('#modal-outputSection')[0].click();
    displayBlock('modal-outputSection');
  }
  targeting.forEach(function(targetingSelected, indexTargetingSelected) {
    adDimensionsSelected.forEach(function(subAdDimensionsSelected, indexSubAdDimnsionSelected) {
      platforms.forEach(function(platformSelected, indexPlatforms) {
        let landingPage = "AppStore";
        let lowerCasePlatformsSelected;
        if (platformSelected.search("LP") > 1) {
          lowerCasePlatformsSelected = platformSelected[0].toLowerCase() + platformSelected[1].toLowerCase() + platformSelected[2].toLowerCase() + platformSelected[3] + platformSelected[4].toLowerCase();
          landingPage = document.getElementById(lowerCasePlatformsSelected).value;
          landingPageforDCMlandingPageId = landingPage;
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
          dskLandingPage = landingPage;
          console.log("dskLandingPage " + dskLandingPage);
        } else if (truncatedPlatform === "AND") {
          truncatedPlatform = "Android";
          andLandingPage = landingPage;
          console.log("andLandingPage " + andLandingPage);
        } else if (truncatedPlatform === "IOS") {
          truncatedPlatform = "iOS";
          iOSLandingPage = landingPage;
          console.log("iOSLandingPage " + iOSLandingPage);
        } else if (truncatedPlatform === "MOB") {
          truncatedPlatform = "MOB"
          dskLandingPage = landingPage;
          console.log("dskLandingPage " + dskLandingPage);
        } else if (truncatedPlatform === "DIS") {
          truncatedPlatform = "DIS"
          dskLandingPage = landingPage;
          console.log("dskLandingPage " + dskLandingPage);
        } else if (truncatedPlatform === "CTV") {
          truncatedPlatform = "CTV"
          dskLandingPage = landingPage;
          console.log("dskLandingPage " + dskLandingPage);
        }

        let chosenDimension;
        var ibtnRemove = document.createElement('i');
        ibtnRemove.setAttribute('class', 'material-icons');
        ibtnRemove.innerHTML = 'delete';
        var buttonrm = document.createElement('a');

        // set the attributes.
        buttonrm.setAttribute('type', 'button');
        //buttonrm.setAttribute('value', 'Remove');
        buttonrm.setAttribute('class', 'waves-effect waves-light btn-small');
        buttonrm.appendChild(ibtnRemove);

        var ibtncpy = document.createElement('i');
        ibtncpy.setAttribute('class', 'material-icons');
        ibtncpy.innerHTML = 'add';
        var buttoncpy = document.createElement('a');
        // set the attributes.
        buttoncpy.setAttribute('type', 'button');
        //buttoncpy.setAttribute('value', 'Copy');
        buttoncpy.setAttribute('class', 'waves-effect waves-light btn-small');
        buttoncpy.appendChild(ibtncpy);
        tsData.push(brand, country, truncatedPlatform, campaignName.replace(/\s/g, ''), budgetCode, agency.replace(/\s/g, ''), buyingPlatforms, publisherOrNetwork.replace(/\s/g, ''), subSite.replace(/\s/g, ''), audience.replace(/\s/g, ''), vertical.replace(/\s/g, ''), message.replace(/\s/g, ''), offer.replace(/\s/g, ''), subAdDimensionsSelected.replace(/\s/g, ''), targetingSelected, subTargeting.replace(/\s/g, ''), deliverables, buyingMetric, cost, landingPage);
        tsData.forEach(function(tableElement, indexTSData) {
          let createTd = document.createElement("td");
          let contentEditable = document.createAttribute("contenteditable");
          contentEditable.value = "true";
          createTd.setAttributeNode(contentEditable);
          createTd.innerHTML = tableElement;
          createTr.appendChild(createTd);
          buttonrm.setAttribute('onclick', 'removeRow(this)');
          //    ,\'' + createTr + '\', \'' + createTrPlcmnt + '\'
          buttoncpy.setAttribute('onclick', 'cpyRow(this)');
          createTr.appendChild(buttonrm);
          createTr.appendChild(buttoncpy);
        });
        let tsDtFrPlacmntNme = new Array();
        if (truncatedPlatform == "Desktop") {
          truncatedPlatform = "DESK";
        } else if (truncatedPlatform == "Android") {
          truncatedPlatform = "AND";
        }
        let brandCode = brands[brand];
        tsDtFrPlacmntNme.push(brandCode, country, truncatedPlatform, campaignName.replace(/\s/g, ''), budgetCode, agency.replace(/\s/g, ''), buyingPlatforms, publisherOrNetwork.replace(/\s/g, ''), subSite.replace(/\s/g, ''), audience.replace(/\s/g, ''), vertical.replace(/\s/g, ''), message.replace(/\s/g, ''), offer.replace(/\s/g, ''), "amsId", subAdDimensionsSelected.replace(/\s/g, ''), targetingSelected, subTargeting.replace(/\s/g, ''), buyingMetric, cost, landingPage);
        placementName = tsDtFrPlacmntNme.join("-");
        let networkPublisher = (agency + buyingPlatforms).toUpperCase();
        if (buyingPlatforms === "Direct" || buyingPlatforms === "DIRECT") {
          networkPublisher = (agency + publisherOrNetwork).toUpperCase();
        }
        advertiserId = advertIdsDCM[country];
        serverCampaignName = brandCode + " " + country + " " + campaignName + " " + budgetCode + " " + new Date().getFullYear();
        let placementTableArray = new Array();
        if (iOSLandingPage === undefined) {
          iOSLandingPage = "AppStore";
        } else if (andLandingPage === undefined) {
          andLandingPage = "AppStore";
        }
        placementTableArray.push(placementName, iOSLandingPage, andLandingPage, dskLandingPage, networkPublisher, "Display", "dcm", deliverables, serverCampaignName, buyingMetric, cost, kpi, getValueById('startDate'), getValueById('endDate'));
        placementTableArray.forEach(function(tableElementPlTblArr, indexplTData) {
          let createTdPlTb = document.createElement("td");
          createTdPlTb.innerHTML = tableElementPlTblArr;
          createTrPlcmnt.appendChild(createTdPlTb);
          // buttoncpypl.setAttribute('onclick', 'cpyRow(this)');
          // createTrPlcmnt.appendChild(buttoncpypl);
        });
      });
    });
  });
  getValues("1-n2IWBQmrO2wSlR3b3W8bolNxrBRwL2gkPJeaLz79G0", gSheetToUpdate, callback);
  checkTsTableLength();
}

function fnExcelReport() {

  var n = new Date().toLocaleDateString();
  var d = n.split("/")[2] + n.split("/")[1] + n.split("/")[0];
  let tsTable = getElementById("tsTable");
  var tbl = document.getElementById("tsTable");
  let placementTable = getElementById("placementTable");
  //console.log("placementTable  "+placementTable.rows[0].cells.item(18).innerHTML);
  let tsDtFrPlacmntNmeNew = [];
  let newPlacementName;
  console.log("gapi.auth2.getAuthInstance().isSignedIn.get() " + gapi.auth2.getAuthInstance().isSignedIn.get());
  updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());

  if (tbl != null && placementTable != null) {
    for (var i = 1; i < tbl.rows.length; i++) {
      let tsDtInnerFrPlacmntNmeNew = [];
      let brandNew;
      for (var j = 0; j <= 15; j++) {
        tsDtInnerFrPlacmntNmeNew.push(tbl.rows[i].cells.item(j).innerHTML);
        //console.log("row item    " + j + "  " + tbl.rows[i].cells.item(j).innerHTML);
      }
      tsDtInnerFrPlacmntNmeNew.splice(0, 1, brands[tbl.rows[i].cells.item(0).innerHTML]);
      tsDtInnerFrPlacmntNmeNew.splice(2, 1, platformCodes[tbl.rows[i].cells.item(2).innerHTML]);
      tsDtInnerFrPlacmntNmeNew.join("-");
      tsDtInnerFrPlacmntNmeNew.splice(13, 0, amsIdArr[i - 1]);
      amsIdUsedArr.push(amsIdArr[i - 1]);
      let joinedtsDtInnerFrPlacmntNmeNew = tsDtInnerFrPlacmntNmeNew.join("-");
      console.log("PlcmntNmeNew    " + joinedtsDtInnerFrPlacmntNmeNew);
      document.getElementById("placementTable").rows[i].cells.item(0).innerHTML = joinedtsDtInnerFrPlacmntNmeNew;
      //document.getElementById("placementTable").rows[i].cells.item(i).innerHTML = joinedtsDtInnerFrPlacmntNmeNew;
      tsDtFrPlacmntNmeNew.push(joinedtsDtInnerFrPlacmntNmeNew);
      placementNameUsedArr.push(joinedtsDtInnerFrPlacmntNmeNew);
    }
  }


  TableToExcel.convert(tsTable, {
    name: `TS_` + serverCampaignName + "_" + d + `.xlsx`,
    sheet: {
      name: `TS_` + serverCampaignName + "_" + d
    }
  });

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
  batchUpdateValues('1-n2IWBQmrO2wSlR3b3W8bolNxrBRwL2gkPJeaLz79G0', gSheetToUpdate, 'USER_ENTERED', updatingValues, callback);
}



//9374

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

function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}

function updateSignInStatus(isSignedIn) {
  if (isSignedIn) {
    //getValues("1-n2IWBQmrO2wSlR3b3W8bolNxrBRwL2gkPJeaLz79G0", gSheetToUpdate, callback);
    document.querySelector("#modalInitial > div.modal-content > p").innerText = "Welcome " + gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getName();
    document.querySelector("#requester").value = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getName();
    displayBlock("closeModal");
    displayNone("signinOnLoad");
    justLoadDFAClient();
  }
}

function handleSignInClick(event) {
  //gapi.auth2.getAuthInstance().signIn();
  gapi.auth2.getAuthInstance().signIn().then(function(response) {
    //If Google OAuth 2 works fine
    console.log("response  " + response);
  }, function(error) {
    //If Google OAuth 2 occured error
    console.log("error" + error);

  });
  // if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
  //   document.querySelector("#modalInitial > div.modal-content > p").innerText = "User Authorized, welcome " + gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getName();
  //   document.querySelector("#requester").value = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getName();
  //   displayBlock("closeModal");
  //   displayNone("signinOnLoad");
  // } else {
  //   document.querySelector("#modalInitial > div.modal-content > p").innerText = "User Not Authorized, please reload";
  //   displayBlock("closeModal");
  //   displayNone("signinOnLoad");
  // }
}

function handleSignOutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}

function callback(response) {
  // console.log("called back   " + response.result);
}

function callbackAfterUpdate(response) {
  // console.log("called back   " + response.result);
  location.reload();
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
          if (paidSocialCampaign) {
            callbackAfterUpdate();
          } else {
            loadDFAClient();
          }
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

//loadDFAClient & Call to create Campaign

function loadDFAClient() {
  return gapi.client.load("https://content.googleapis.com/discovery/v1/apis/dfareporting/v3.4/rest")
    .then(function() {
        console.log("GAPI client loaded for API");
        getUserProfileIdAndInsertLandingPage();
      },
      function(err) {
        console.error("Error loading GAPI client for API", err);

      });
}
// Make sure the client is loaded and sign-in is complete before calling this method.
let profileId;
let landingPageId;

// Create Campaign on DCM

function createCampaignOnDCM() {
  let startDate = new Date().toISOString().slice(0, 10);
  let endDate = new Date("2021-12-31").toISOString().slice(0, 10);
  gapi.client.dfareporting.campaigns.list({
      "profileId": profileId
    })
    .then(function(response) {
        // Handle the results here (response.result has the parsed body).
        if ((response.result.campaigns.filter(p => p.name == serverCampaignName + " FT TRACKING"))[0]) {
          $('#modal-trigger')[0].click();
          getElementById('modal1text').innerHTML = "Campaign Exists in DCM. AdOps will add placements to that one. Please submit URLbuilder and TS sheets";
        } else {
          gapi.client.dfareporting.campaigns.insert({
              "profileId": profileId,
              "resource": {
                "advertiserId": advertiserId,
                "accountId": 470006,
                "endDate": endDate,
                "startDate": startDate,
                "name": serverCampaignName + " FT TRACKING",
                "defaultLandingPageId": landingPageId
              }
            })
            .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
                callbackAfterUpdate();
              },
              function(err) {
                console.error("Campaign Creation error", err);
              });
        };
      },
      function(err) {
        console.error("Execute error", err);
      });


}

// get DCM userProfile & insert a landing Page

function getUserProfileIdAndInsertLandingPage() {

  gapi.client.dfareporting.userProfiles.list({})
    .then(function(response) {
        // Handle the results here (response.result has the parsed body).
        console.log("Get UserProfile Response", response);
        profileId = Number(JSON.parse(response.body).items[0].profileId);
        console.log("profileId --" + profileId);
        getLandingePageId();
      },
      function(err) {
        console.error("Get UserProfile Execute error", err);
      });

}


// get DCM landing Page ID

function getLandingePageId() {
  console.log(" Profile Id in getLandingPagId  " + profileId);
  gapi.client.dfareporting.advertiserLandingPages.insert({
      "profileId": profileId,
      "resource": {
        "advertiserId": advertiserId,
        "name": serverCampaignName.replace(/\s/g, ''),
        "url": landingPageforDCMlandingPageId,
      }
    })
    .then(function(response) {
        // Handle the results here (response.result has the parsed body).
        console.log("AdvLandingPage Insert Response", response);
        landingPageId = (JSON.parse(response.body)).id;
        console.log("landingPageId -- " + landingPageId);
        createCampaignOnDCM();
      },
      function(err) {
        console.error("AdvLandingPage Insert Execute error", err);
        //alert("No DCM Campaign created, landing page error");
        $('#modal-trigger')[0].click();
        getElementById('modal1text').innerHTML = "No DCM Campaign created, please submit URLbuilder and TS sheets sheet to AdOps and they will sort it out.";
      });
}


function removeRow(oButton) {
  var empTab = document.getElementById('tsTable');
  empTab.deleteRow(oButton.parentNode.rowIndex); // buttton -> td -> tr
  var plcmntTab = document.getElementById('placementTable');
  plcmntTab.deleteRow(oButton.parentNode.rowIndex); // buttton -> td -> tr
  checkTsTableLength();
}

function cpyRow(oButton) {
  var empTab = document.getElementById('tsTable');
  var tsRow = oButton.parentNode;
  var newRow = tsRow.cloneNode(true);
  empTab.appendChild(newRow);
  var plcmntTab = document.getElementById('placementTable');
  var plRow = plcmntTab.rows[oButton.parentNode.rowIndex];
  var newPlRow = plRow.cloneNode(true);
  plcmntTab.appendChild(newPlRow);
}

function checkTsTableLength() {
  var x = document.getElementById("tsTable").rows.length - 1;
  console.log("x " + x);
  document.getElementById("showTableRows").innerHTML = x + " placements";
  return;
}

//just load DFA client on load of the page
function justLoadDFAClient() {
  return gapi.client.load("https://content.googleapis.com/discovery/v1/apis/dfareporting/v3.4/rest")
    .then(function() {
        console.log("GAPI client loaded for API");
        //getUserProfileIdAndInsertLandingPage();
      },
      function(err) {
        console.error("Error loading GAPI client for API", err);

      });
}
