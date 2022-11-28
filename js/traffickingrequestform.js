// let mobileBannerSizes = [
//   "120x60",
//   "120x600",
//   "160x600",
//   "250x250",
//   "300x250",
//   "320x100",
//   "320x320",
//   "728x90",
//   "970x250",
//   "300x600",
// ];
// let desktopBannerSizes = [
//   "320x50",
//   "300x250",
//   "250x250",
//   "320x100",
//   "320x160",
//   "320x480",
//   "480x320",
//   "728x90",
//   "1024x768",
//   "768x1024",
// ];
let placementName;
let amsId;
let amsIdUsedArr = [];
let placementNameUsedArr = [];
let profileNamePsuedoArr = [];
let profileName;
let buyingMetricArr = [];
let costArr = [];
let forAMSsystem = [];
let openOutputSectionModal = true;
let collectAmsData = [];
let updatingValues;
let updatedAMSArr;
let tsTBE;
let gSheetToUpdate = "Display!B:H";
let paidSocialCampaign;
let kpi;
let buyingMetric;
let date_range;
let affiliate_req;
let btag;


function saveUsingLocalStorage() {
  window.localStorage.setItem("kpi", kpi);
  window.localStorage.setItem("buyingMetric", buyingMetric);
  window.localStorage.setItem("date_range", date_range);
  let tstable = document.getElementById("tsTable");
  let tstablelength = tstable.rows.length;
  localStorage.setItem("tstablelength", tstablelength);
  for (var i = 1; i < tstablelength; i++) {
    window.localStorage.setItem("ts" + i, tstable.rows[i].outerHTML);
  }

  let placementstable = document.getElementById("placementTable");
  let placementtablelength = placementstable.rows.length;
  localStorage.setItem("placementtablelength", placementtablelength);
  for (var i = 1; i < placementtablelength; i++) {
    window.localStorage.setItem("pl" + i, placementstable.rows[i].outerHTML);
  }
}

function getSavedLocalStorage() {
  addandremovebuttons();
  displayBlock("nonTableSection");
  generateCard();
  displayBlock("modal-outputSection");
  displayBlock("tsTable");
  let tssavedrows = parseInt(window.localStorage.getItem("tstablelength"));
  for (var i = 1; i < tssavedrows; i++) {
    buttonrm.setAttribute("onclick", "removeRow(this)");
    buttoncpy.setAttribute("onclick", "cpyRow(this)");
    $("#tsTable").append(window.localStorage.getItem("ts" + i));
  }
  let pltsavedrows = parseInt(
    window.localStorage.getItem("placementtablelength")
  );
  for (var i = 1; i < pltsavedrows; i++) {
    $("#placementTable").append(window.localStorage.getItem("pl" + i));
  }
  checkTsTableLength();
  window.localStorage.clear();
}

document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".saveoutput").addEventListener("click", (event) => {
    $("#modal-outputSection")[0].click();
    displayBlock("modal-outputSection");
    document.getElementsByClassName("saveoutput")[0].style.display = "none";
  });

  $(document).on("click", "#tsTable tr", function () {
    checkTsTableLength();
  });
  document.querySelector(".checkcircle").addEventListener("click", (event) => {
    displayBlock("exptToExcel");
    displayBlock("toCreateJiraTkt");
    displayNone("check_circle");
  });
  document
    .querySelector(".networkNamesList")
    .addEventListener("change", (event) => {
      let a = getValueByClassName("agencyNamesList");
      let b = getValueByClassName("networkNamesList");
      if (a === "TSG" && b === "DV360") {
        console.log(
          "getElementById('publisherOrNetwork')   " +
            getElementById("publisherOrNetwork")
        );
        getElementById("publisherOrNetwork").value = "Youtube";
      }
    });
  getElementById("startDate").value = new Date().toLocaleDateString();
  getElementById("endDate").value = new Date(
    new Date().getFullYear() + 1,
    11,
    31
  ).toLocaleDateString();
  let elemsModal = document.querySelectorAll(".modal");
  let instancesModal = M.Modal.init(elemsModal, null);
  $("#signInModal")[0].click();
  let elemsDropDownTrigger = document.querySelectorAll(".dropdown-trigger");
  let instancesDDT = M.Dropdown.init(elemsDropDownTrigger, null);
  let elemsTT = document.querySelectorAll(".tooltipped");
  let instancesTT = M.Tooltip.init(elemsTT, null);
  let elemsChips = document.querySelectorAll(".chips");
  let instancesChips = M.Chips.init(elemsChips, null);
  let elemsdp = document.querySelectorAll(".datepicker");
  let instancesdp = M.Datepicker.init(elemsdp, null);
  let elemsSelect = document.querySelectorAll("select");
  let instancesSelect = M.FormSelect.init(elemsSelect, null);
  const arrayofDataObjs = {
    brands: brandImages,
    countries: countriesLL,
    budgets: budgets,
    kpis: kpis,
    buyingMetrics: buyingMetrics,
    agencyNamesList: agencyNamesList,
    networkNamesList: networkNamesList,
    dimensionsArr: dimensionsArr,
    targetAudienceList: targetAudienceList,
  };
  var arrSize = Object.keys(arrayofDataObjs).length;
  var keys = Object.keys(arrayofDataObjs);
  var values = Object.values(arrayofDataObjs);
  for (i = 0; i <= arrSize; i++) {
    $("input." + keys[i]).autocomplete({
      data: values[i],
    });
  }
  $(".chips-initialBannerSizes").chips({
    data: dimensionsBannerArr,
  });
  $(".chips-initialVideoSizes").chips({
    data: dimensionsVideoArr,
  });
});

let previousDivContainerId = null;
let previousEventTarget = null;
let previousParentElement = null;
let paginationLength = null;
document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelector(".generateOutput")
    .addEventListener("click", (event) => {
      if (M.Modal.getInstance(document.getElementById("modal1")).isOpen) {
        openOutputSectionModal = true;
      }
    });
  $(".tabs").tabs();
  document
    .querySelector(".adDimensions")
    .addEventListener("change", (event) => {
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

  displayNone("tsTable");
  displayNone("placementTable");
  displayNone("exptToExcel");
  displayNone("nonTableSection");
  document.querySelector(".platforms").addEventListener("change", (event) => {
    let platforms = [];
    $("#platforms option:selected").each(function (i, selected) {
      platforms[i] = $(selected).attr("value");
    });
    if (platforms.length == 0) {
      displayNone("andLp");
      displayNone("andlpIcon");
      displayNone("iosLp");
      displayNone("ioslpIcon");
      displayNone("dskLp");
      displayNone("mobLp");
      //displayNone('mobLp2')
      displayNone("dsklpIcon");
      displayNone("moblpIcon");
      displayNone("ctvlpIcon");
    }
    if (platforms.includes("ANDLP")) {
      displayBlock("andLp");
      displayBlock("andlpIcon");
    } else if (!platforms.includes("ANDLP")) {
      displayNone("andLp");
      displayNone("andlpIcon");
    }
    if (platforms.includes("IOSLP")) {
      displayBlock("iosLp");
      displayBlock("ioslpIcon");
    } else if (!platforms.includes("IOSLP")) {
      displayNone("iosLp");
      displayNone("ioslpIcon");
    }
    if (platforms.includes("DSKLP")) {
      displayBlock("dskLp");
      displayBlock("dsklpIcon");
    } else if (!platforms.includes("DSKLP")) {
      displayNone("dskLp");
      displayNone("dsklpIcon");
    }
    if (platforms.includes("MOBLP")) {
      displayBlock("mobLp");
      // displayBlock('mobLp2')
      displayBlock("moblpIcon");
    } else if (!platforms.includes("MOBLP")) {
      displayNone("mobLp");
      // displayNone('mobLp2')
      displayNone("moblpIcon");
    }
    if (platforms.includes("DISLP")) {
      displayBlock("disLp");
      // displayBlock('disLp2')
      displayBlock("dislpIcon");
    } else if (!platforms.includes("DISLP")) {
      displayNone("disLp");
      displayNone("dislpIcon");
    }
    if (platforms.includes("CTVLP")) {
      displayBlock("ctvLp");
      displayBlock("ctvlpIcon");
    } else if (!platforms.includes("CTVLP")) {
      displayNone("ctvLp");
      displayNone("ctvlpIcon");
    }
  });
});
let serverCampaignName;
let advertiserId;
let landingPageforDCMlandingPageId;

function generateOutput() {
  displayBlock("tsTable");
  displayBlock("nonTableSection");
  displayBlock("check_circle");
  displayNone("exptToExcel");
  displayNone("toCreateJiraTkt");
  //let yourName = getValueById('requester');
  let brand = getValueByClassName("brands");
  if (!brand) {
    $("#modal-trigger")[0].click();
    getElementById("modal1text").innerHTML = "Please select a Brand.";
    return;
  }
  let country = countries[getValueByClassName("countries")];
  if (!country) {
    $("#modal-trigger")[0].click();
    getElementById("modal1text").innerHTML = "Please select a GEO.";
    return;
  }
  let platforms = [];
  $("#platforms option:selected").each(function (i, selected) {
    platforms[i] = $(selected).attr("value");
  });
  let campaignName = getValueById("campaignName");
  if (!campaignName) {
    $("#modal-trigger")[0].click();
    getElementById("modal1text").innerHTML = "Please input a Campaign Name.";
    return;
  }
  let budgetCode = budgetCodes[getValueByClassName("budgets")];
  if (!budgetCode) {
    $("#modal-trigger")[0].click();
    getElementById("modal1text").innerHTML = "Please select a Budget Code.";
    return;
  }
  let agency = getValueByClassName("agencyNamesList");
  if (!agency) {
    $("#modal-trigger")[0].click();
    getElementById("modal1text").innerHTML = "Please select an agency.";
    return;
  }

  let buyingPlatforms = getValueByClassName("networkNamesList");
  if (!buyingPlatforms) {
    $("#modal-trigger")[0].click();
    getElementById("modal1text").innerHTML = "Please select a buying platform.";
    return;
  }

  let publisherOrNetwork = getElementById("publisherOrNetwork").value;
  if (!publisherOrNetwork) {
    $("#modal-trigger")[0].click();
    getElementById("modal1text").innerHTML =
      "Please select a Publisher Network.";
    return;
  }

  if (
    publisherOrNetwork.toLowerCase() == "facebook" ||
    publisherOrNetwork.toLowerCase() == "snapchat" ||
    publisherOrNetwork.toLowerCase() == "twitter"
  ) {
    gSheetToUpdate = "PaidSocial!B:H";
    paidSocialCampaign = true;
  }

  let subSite = getValueById("sub-site");
  if (!subSite) {
    $("#modal-trigger")[0].click();
    getElementById("modal1text").innerHTML = "Please select a subsite.";
    return;
  }
  btag = document.getElementById("btag").value;
  if (btag != "" || btag.toLowerCase() === "x") {
    affiliate_req = true;
  }

  let audience = getValueById("audience");
  var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  if (format.test(audience)) {
    $("#modal-trigger")[0].click();
    getElementById("modal1text").innerHTML =
      "Please remove special characters from audience";
    return;
  }
  let vertical = getValueById("vertical");
  let message = getValueById("message");
  let offer = getValueById("offer");
  let targeting = [];
  $("#targeting option:selected").each(function (i, selected) {
    targeting[i] = $(selected).attr("value");
  });
  let subTargeting = getValueById("subTargeting");
  let cost = getValueById("cost");
  let regex =
    /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
  let andLpLc;
  let iosLpLc;
  let dskLpLc;
  let mobLpLc;
  let disLpLc;
  let ctvLpLc;
  if (platforms.toString().includes("LP")) {
    let andLp = getElementById("andLp").value;
    if (platforms.toString() == "ANDLP") {
      if (andLp) {
        andLpLc = andLp;
        if (!regex.test(andLpLc)) {
          $("#modal-trigger")[0].click();
          getElementById("modal1text").innerHTML = "Please enter a proper URL.";
          return;
        }
      } else if (andLp == "") {
        $("#modal-trigger")[0].click();
        getElementById("modal1text").innerHTML = "Please enter a URL.";
        return;
      }
    }
    let iosLp = getElementById("iosLp").value;
    if (platforms.toString() == "IOSLP") {
      if (iosLp) {
        iosLpLc = iosLp;
        if (!regex.test(iosLpLc)) {
          $("#modal-trigger")[0].click();
          getElementById("modal1text").innerHTML = "Please enter a proper URL.";
          return;
        }
      } else if (iosLp == "") {
        $("#modal-trigger")[0].click();
        getElementById("modal1text").innerHTML = "Please enter a URL.";
        return;
      }
    }
    let dskLp = getElementById("dskLp").value;
    if (platforms.toString() == "DSKLP") {
      if (dskLp) {
        dskLpLc = dskLp;
        if (!regex.test(dskLpLc)) {
          $("#modal-trigger")[0].click();
          getElementById("modal1text").innerHTML = "Please enter a proper URL.";
          return;
        }
      } else if (dskLp == "") {
        $("#modal-trigger")[0].click();
        getElementById("modal1text").innerHTML = "Please enter a URL.";
        return;
      }
    }
    let mobLp = getElementById("mobLp").value;
    if (platforms.toString() == "MOBLP") {
      if (mobLp) {
        mobLpLc = mobLp.toLowerCase();
        if (!regex.test(mobLpLc)) {
          $("#modal-trigger")[0].click();
          getElementById("modal1text").innerHTML = "Please enter a proper URL.";
          return;
        }
      } else if (mobLp == "") {
        $("#modal-trigger")[0].click();
        getElementById("modal1text").innerHTML = "Please enter a URL.";
        return;
      }
    }
    let disLp = getElementById("disLp").value;
    if (platforms.toString() == "DISLP") {
      if (disLp) {
        disLpLc = disLp.toLowerCase();
        if (!regex.test(disLpLc)) {
          $("#modal-trigger")[0].click();
          getElementById("modal1text").innerHTML = "Please enter a proper URL.";
          return;
        }
      } else if (disLp == "") {
        $("#modal-trigger")[0].click();
        getElementById("modal1text").innerHTML = "Please enter a URL.";
        return;
      }
    }
    let ctvLp = getElementById("ctvLp").value;
    if (platforms.toString() == "CTVLP") {
      if (ctvLp) {
        ctvLpLc = ctvLp.toLowerCase();
        if (!regex.test(ctvLpLc)) {
          $("#modal-trigger")[0].click();
          getElementById("modal1text").innerHTML = "Please enter a proper URL.";
          return;
        }
      } else if (ctvLp == "") {
        $("#modal-trigger")[0].click();
        getElementById("modal1text").innerHTML = "Please enter a URL.";
        return;
      }
    }
  }

  generateCard();

  let adDimensions = [];
  $("#adDimensions option:selected").each(function (i, selected) {
    adDimensions[i] = $(selected).attr("value");
  });
  let adDimensionsSelected = [];
  let sd = getElementById("deliverables");
  let deliverables = sd.options[sd.selectedIndex].text;
  console.log("Develirable Selected   " + deliverables);
  if (adDimensions == "1x1") {
    adDimensionsSelected = ["1x1"];
  } else if (adDimensions == "BAN") {
    let selectedChipNodesDmsns = document
      .querySelector(".bannerSizes")
      .innerText.split("close");
    selectedChipNodesDmsns.pop();
    for (var i = 0; i < selectedChipNodesDmsns.length; i++) {
      adDimensionsSelected.push(selectedChipNodesDmsns[i]);
    }
    //  deliverables = "Javascript Tag";
  } else if (adDimensions == "VOD") {
    let selectedChipNodesDmsns = document
      .querySelector(".videoLengths")
      .innerText.split("close");
    selectedChipNodesDmsns.pop();
    for (var i = 0; i < selectedChipNodesDmsns.length; i++) {
      adDimensionsSelected.push(
        selectedChipNodesDmsns[i].replace("↵close", "")
      );
    }
    //  deliverables = "VAST/VPAID Tag";
  }
  tsTBE = getElementById("tsTable");
  let placementTBE = getElementById("placementTable");
  if (openOutputSectionModal) {
    $("#modal-outputSection")[0].click();
    displayBlock("modal-outputSection");
  }
  targeting.forEach(function (targetingSelected, indexTargetingSelected) {
    adDimensionsSelected.forEach(function (
      subAdDimensionsSelected,
      indexSubAdDimnsionSelected
    ) {
      platforms.forEach(function (platformSelected, indexPlatforms) {
        let landingPage = "AppStore";
        let lowerCasePlatformsSelected;
        if (platformSelected.search("LP") > 1) {
          lowerCasePlatformsSelected =
            platformSelected[0].toLowerCase() +
            platformSelected[1].toLowerCase() +
            platformSelected[2].toLowerCase() +
            platformSelected[3] +
            platformSelected[4].toLowerCase();
          landingPage = document.getElementById(
            lowerCasePlatformsSelected
          ).value;
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
          truncatedPlatform = "MOB";
          dskLandingPage = landingPage;
          console.log("dskLandingPage " + dskLandingPage);
        } else if (truncatedPlatform === "DIS") {
          truncatedPlatform = "DIS";
          dskLandingPage = landingPage;
          console.log("dskLandingPage " + dskLandingPage);
        } else if (truncatedPlatform === "CTV") {
          truncatedPlatform = "CTV";
          dskLandingPage = landingPage;
          console.log("dskLandingPage " + dskLandingPage);
        }

        let chosenDimension;

        //add and remove buttons added in the below function
        addandremovebuttons();

        tsData.push(
          brand,
          country,
          truncatedPlatform,
          campaignName.replace(/\s/g, ""),
          budgetCode,
          agency.replace(/\s/g, ""),
          buyingPlatforms.replace(/\s/g, ""),
          publisherOrNetwork.replace(/\s/g, ""),
          subSite.replace(/\s/g, ""),
          audience.replace(/\s/g, ""),
          vertical.replace(/\s/g, ""),
          message.replace(/\s/g, ""),
          offer.replace(/\s/g, ""),
          subAdDimensionsSelected.replace(/\s/g, ""),
          targetingSelected,
          subTargeting.replace(/\s/g, ""),
          deliverables,
          buyingMetric,
          cost,
          landingPage
        );
        tsData.forEach(function (tableElement, indexTSData) {
          let createTd = document.createElement("td");
          let contentEditable = document.createAttribute("contenteditable");
          contentEditable.value = "true";
          createTd.setAttributeNode(contentEditable);
          createTd.innerHTML = tableElement;
          createTr.appendChild(createTd);
          buttonrm.setAttribute("onclick", "removeRow(this)");
          buttoncpy.setAttribute("onclick", "cpyRow(this)");
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
        tsDtFrPlacmntNme.push(
          brandCode,
          country,
          truncatedPlatform,
          campaignName.replace(/\s/g, ""),
          budgetCode,
          agency.replace(/\s/g, ""),
          buyingPlatforms.replace(/\s/g, ""),
          publisherOrNetwork.replace(/\s/g, ""),
          subSite.replace(/\s/g, ""),
          audience.replace(/\s/g, ""),
          vertical.replace(/\s/g, ""),
          message.replace(/\s/g, ""),
          offer.replace(/\s/g, ""),
          "amsId",
          subAdDimensionsSelected.replace(/\s/g, ""),
          targetingSelected,
          subTargeting.replace(/\s/g, ""),
          buyingMetric,
          cost,
          landingPage
        );
        placementName = tsDtFrPlacmntNme.join("-");
        let networkPublisher = (agency + buyingPlatforms).toUpperCase();
        if (buyingPlatforms === "Direct" || buyingPlatforms === "DIRECT") {
          networkPublisher = (agency + publisherOrNetwork).toUpperCase();
        }
        advertiserId = advertIdsDCM[country];
        serverCampaignName =
          brandCode +
          " " +
          country +
          " " +
          campaignName +
          " " +
          budgetCode +
          " " +
          new Date().getFullYear();
        let placementTableArray = new Array();
        if (iOSLandingPage === undefined) {
          iOSLandingPage = "AppStore";
        } else if (andLandingPage === undefined) {
          andLandingPage = "AppStore";
        }
        let channelName = "Display";
        if (affiliate_req) {
          channelName = "Affiliates";
        }
        placementTableArray.push(
          placementName,
          iOSLandingPage,
          andLandingPage,
          dskLandingPage,
          networkPublisher,
          channelName,
          "ft",
          deliverables,
          serverCampaignName,
          buyingMetric,
          cost,
          kpi,
          getValueById("startDate"),
          getValueById("endDate")
        );
        placementTableArray.forEach(function (
          tableElementPlTblArr,
          indexplTData
        ) {
          let createTdPlTb = document.createElement("td");
          createTdPlTb.innerHTML = tableElementPlTblArr;
          createTrPlcmnt.appendChild(createTdPlTb);
        });
      });
    });
  });

  checkTsTableLength();
}

function getvaluesandexport() {
  document.getElementById("exptToExcel").disabled = true;
  if (affiliate_req) {
    fnExcelReport();
  } else {
    getValues(
      "1-n2IWBQmrO2wSlR3b3W8bolNxrBRwL2gkPJeaLz79G0",
      gSheetToUpdate,
      fnExcelReport
    );
  }
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
  console.log(
    "gapi.auth2.getAuthInstance().isSignedIn.get() " +
      gapi.auth2.getAuthInstance().isSignedIn.get()
  );
  updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());

  if (tbl != null && placementTable != null) {
    for (var i = 1; i < tbl.rows.length; i++) {
      let tsDtInnerFrPlacmntNmeNew = [];
      let brandNew;
      for (var j = 0; j <= 15; j++) {
        tsDtInnerFrPlacmntNmeNew.push(tbl.rows[i].cells.item(j).innerHTML);
        //console.log("row item    " + j + "  " + tbl.rows[i].cells.item(j).innerHTML);
      }
      tsDtInnerFrPlacmntNmeNew.splice(
        0,
        1,
        brands[tbl.rows[i].cells.item(0).innerHTML]
      );
      tsDtInnerFrPlacmntNmeNew.splice(
        2,
        1,
        platformCodes[tbl.rows[i].cells.item(2).innerHTML]
      );
      tsDtInnerFrPlacmntNmeNew.join("-");
      if (affiliate_req) {
        tsDtInnerFrPlacmntNmeNew.splice(13, 0, btag.replace("btag=", ""));
      } else {
        tsDtInnerFrPlacmntNmeNew.splice(13, 0, amsIdArr[i - 1]);
      }
      amsIdUsedArr.push(amsIdArr[i - 1]);
      let joinedtsDtInnerFrPlacmntNmeNew = tsDtInnerFrPlacmntNmeNew.join("-");
      console.log("PlcmntNmeNew    " + joinedtsDtInnerFrPlacmntNmeNew);
      document
        .getElementById("placementTable")
        .rows[i].cells.item(0).innerHTML = joinedtsDtInnerFrPlacmntNmeNew;
      //document.getElementById("placementTable").rows[i].cells.item(i).innerHTML = joinedtsDtInnerFrPlacmntNmeNew;
      tsDtFrPlacmntNmeNew.push(joinedtsDtInnerFrPlacmntNmeNew);
      placementNameUsedArr.push(joinedtsDtInnerFrPlacmntNmeNew);
      forAMSsystem.push(
        joinedtsDtInnerFrPlacmntNmeNew +
          ", " +
          amsIdArr[i - 1] +
          ", " +
          "DEFAULT"
      );
      buyingMetricArr.push(tbl.rows[i].cells.item(17).innerHTML);
      costArr.push(tbl.rows[i].cells.item(18).innerHTML);
      profileNamePsuedoArr.push(profileName);
    }
  }

  // TableToExcel.convert(tsTable, {
  //   name: `TS_` + serverCampaignName + "_" + d + `.xlsx`,
  //   sheet: {
  //     name: `TS_` + serverCampaignName + "_" + d,
  //   },
  // });

  // TableToExcel.convert(placementTable, {
  //   name: `URLBuilderUpload_` + serverCampaignName + "_" + d + `.xlsx`,
  //   sheet: {
  //     name: `URLBuilderUpload_` + serverCampaignName + "_" + d,
  //   },
  // })
  console.log("before URL Builder Call" + tsDtFrPlacmntNmeNew);
makePlacementNames(tsDtFrPlacmntNmeNew);

  updatingValues = [
    amsIdUsedArr,
    placementNameUsedArr,
    forAMSsystem,
    buyingMetricArr,
    costArr,
    profileNamePsuedoArr,
  ].reduce((c, v) => {
    v.forEach((o, i) => {
      c[i] = c[i] || [];
      c[i].push(o);
    });
    return c;
  }, []);
  batchUpdateValues(
    "1-n2IWBQmrO2wSlR3b3W8bolNxrBRwL2gkPJeaLz79G0",
    gSheetToUpdate,
    "USER_ENTERED",
    updatingValues,
    callback
  );


  
}

//9374

//function to display an element
const displayBlock = (elementId) => {
  getElementById(elementId).style.display = "block";
};

//function to remove display of an element
const displayNone = (elementId) => {
  getElementById(elementId).style.display = "none";
};

// function to get value of an element by id
const getValueById = (elementId) => {
  return getElementById(elementId).value.toUpperCase();
};

//function to get element by id
const getElementById = (elementId) => {
  return document.getElementById(elementId);
};

// function to get value of a classname
const getValueByClassName = (classNme) => {
  return document.getElementsByClassName(classNme)[0].value;
};

//function to dynamically add options to the select tag
const addOptionTags = (elementId, dimensionArr) => {
  const htmlElement = getElementById(elementId);
  dimensionArr.forEach((item, i) => {
    htmlElement.innerHTML += `<option value=${item}>${item}</option>`;
  });
};

//This functioncalls a g.sheet and fetches AMSid which are not assigned to the placements.
let amsIdArr = [];

function initClient() {
  var API_KEY = "AIzaSyCatCt5LLHwUcyQtVdCwu_F46A4pcmSXkQ"; // TODO: Update placeholder with desired API key.

  var CLIENT_ID =
    "242856726277-6a9j6geqin7hqmngon9i710rptaq93br.apps.googleusercontent.com"; // TODO: Update placeholder with desired client ID.
  // TODO: Authorize using one of the following scopes:
  //   'https://www.googleapis.com/auth/drive'
  //   'https://www.googleapis.com/auth/drive.file'
  //   'https://www.googleapis.com/auth/spreadsheets'
  var SCOPE =
    "https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/dfatrafficking";

  gapi.client
    .init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      scope: SCOPE,
      discoveryDocs: [
        "https://sheets.googleapis.com/$discovery/rest?version=v4",
      ],
    })
    .then(function () {
      gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignInStatus);
      updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    });
}

function handleClientLoad() {
  gapi.load("client:auth2", initClient);
}

function updateSignInStatus(isSignedIn) {
  if (isSignedIn) {
    //getValues("1-n2IWBQmrO2wSlR3b3W8bolNxrBRwL2gkPJeaLz79G0", gSheetToUpdate, callback);
    profileName = gapi.auth2
      .getAuthInstance()
      .currentUser.get()
      .getBasicProfile()
      .getName();
    document.querySelector("#modalInitial > div.modal-content > p").innerText =
      "Welcome " +
      gapi.auth2
        .getAuthInstance()
        .currentUser.get()
        .getBasicProfile()
        .getName();
    document.querySelector("#requester").value = gapi.auth2
      .getAuthInstance()
      .currentUser.get()
      .getBasicProfile()
      .getName();
    displayBlock("closeModal");
    displayNone("signinOnLoad");
    justLoadDFAClient();
  }
}

function handleSignInClick(event) {
  //gapi.auth2.getAuthInstance().signIn();
  gapi.auth2
    .getAuthInstance()
    .signIn()
    .then(
      function (response) {
        //If Google OAuth 2 works fine
        console.log("response  " + response);
      },
      function (error) {
        //If Google OAuth 2 occured error
        console.log("error " + error);
      }
    );
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

function batchUpdateValues(
  spreadsheetId,
  range,
  valueInputOption,
  _values,
  callback
) {
  document.getElementById("exptToExcel").disabled = true;
  // console.log(spreadsheetId);
  // console.log(range);
  // console.log(valueInputOption);
  // console.log(" values " + _values);

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
  gapi.client.sheets.spreadsheets.values
    .get({
      spreadsheetId: spreadsheetId,
      range: range,
    })
    .then(
      function (response) {
        // 2. Create the updated values using the retrieved values.
        let values = response.result.values;
        const obj = values.reduce(
          (o, [b], i) =>
            Object.assign(o, {
              [b]: i,
            }),
          {}
        );
        const addValues = _values.reduce((ar, [b, c, d, e, f, g, h]) => {
          // console.log("  ar " + ar);
          // console.log("  b " + b);
          // console.log("  c " + c);
          // console.log("  d " + d);
          // console.log("  e " + e);
          if (obj[b]) {
            values[obj[b]][1] = c;
            values[obj[b]][2] = d;
            values[obj[b]][3] = e;
            values[obj[b]][4] = f;
            values[obj[b]][5] = g;
            values[obj[b]][6] = h;
            // console.log("  values[obj[b]][0] " + values[obj[b]][0]);
            // console.log("  values[obj[b]][1] " + values[obj[b]][1]);
            // console.log("  values[obj[b]][2] " + values[obj[b]][2]);
            // console.log("  c in obj[b]" + c);
            // console.log("  d in obj[b]" + d);
            // console.log("  e in obj[b]" + e);
          } else {
            ar.push([b, c]);
            console.log("  ar in else" + ar);
          }
          return ar;
        }, []);

        values = values.concat(addValues);
        // 3. Put the updated values to "Sheet1" using your script.
        var data = [];
        data.push({
          range: range,
          values: values,
        });
        var body = {
          data: data,
          valueInputOption: valueInputOption,
        };
        gapi.client.sheets.spreadsheets.values
          .batchUpdate({
            spreadsheetId: spreadsheetId,
            resource: body,
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
      },
      function (reason) {
        console.error("error: " + reason.result.error.message);
      }
    );
  localStorage.clear();
}

function getValues(spreadsheetId, range, fnExcelReport) {
  // [START sheets_get_values]
  gapi.client.sheets.spreadsheets.values
    .get({
      spreadsheetId: spreadsheetId,
      range: range,
    })
    .then((response) => {
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
      fnExcelReport();
    });

  // [END sheets_get_values]
}

//loadDFAClient & Call to create Campaign
function loadDFAClient() {
  return gapi.client
    .load(
      "https://content.googleapis.com/discovery/v1/apis/dfareporting/v3.5/rest"
    )
    .then(
      function () {
        console.log("GAPI client loaded for API");
        getUserProfileIdAndInsertLandingPage();
      },
      function (err) {
        console.error("Error loading GAPI client for API", err);
      }
    );
}
// Make sure the client is loaded and sign-in is complete before calling this method.
let profileId;
let landingPageId;
let startDate = new Date().toISOString().slice(0, 10);

// Create Campaign on DCM
function createCampaignOnDCM() {
  let endDate = getElementById("endDate").value.split("/").reverse().join("-");
  gapi.client.dfareporting.campaigns
    .list({
      profileId: profileId,
    })
    .then(
      function (response) {
        // Handle the results here (response.result has the parsed body).
        if (
          response.result.campaigns.filter(
            (p) => p.name == serverCampaignName + " FT TRACKING"
          )[0]
        ) {
          $("#modal-trigger")[0].click();
          getElementById("modal1text").innerHTML =
            "Campaign Exists in DCM. AdOps will add placements to that one. Please submit URLbuilder and TS sheets";
        } else {
          gapi.client.dfareporting.campaigns
            .insert({
              profileId: profileId,
              resource: {
                advertiserId: advertiserId,
                accountId: 470006,
                endDate: endDate,
                startDate: startDate,
                name: serverCampaignName + " FT TRACKING",
                defaultLandingPageId: landingPageId,
              },
            })
            .then(
              function (response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
                callbackAfterUpdate();
                // createPlacements();
              },
              function (err) {
                console.error("Campaign Creation error", err);
              }
            );
        }
      },
      function (err) {
        console.error("Execute error", err);
        callbackAfterUpdate();
      }
    );
}

// get DCM userProfile & insert a landing Page

function getUserProfileIdAndInsertLandingPage() {
  gapi.client.dfareporting.userProfiles.list({}).then(
    function (response) {
      // Handle the results here (response.result has the parsed body).
      console.log("Get UserProfile Response", response);
      profileId = Number(JSON.parse(response.body).items[0].profileId);
      console.log("profileId --" + profileId);
      getLandingePageId();
    },
    function (err) {
      console.error("Get UserProfile Execute error", err);
    }
  );
}

// get DCM landing Page ID

function getLandingePageId() {
  console.log(" Profile Id in getLandingPagId  " + profileId);
  gapi.client.dfareporting.advertiserLandingPages
    .insert({
      profileId: profileId,
      resource: {
        advertiserId: advertiserId,
        name: serverCampaignName.replace(/\s/g, ""),
        url: landingPageforDCMlandingPageId,
      },
    })
    .then(
      function (response) {
        // Handle the results here (response.result has the parsed body).
        console.log("AdvLandingPage Insert Response", response);
        landingPageId = JSON.parse(response.body).id;
        console.log("landingPageId -- " + landingPageId);
        createCampaignOnDCM();
      },
      function (err) {
        console.error("AdvLandingPage Insert Execute error", err);
        //alert("No DCM Campaign created, landing page error");
        $("#modal-trigger")[0].click();
        getElementById("modal1text").innerHTML =
          "No DCM Campaign created, please submit URLbuilder and TS sheets sheet to AdOps and they will sort it out.";
      }
    );
}

// function to create placement names
let siteId;

function createPlacements() {
  return gapi.client.dfareporting.placements
    .insert({
      profileId: profileId,
      resource: {
        accountId: 470006,
        siteId: 5916554,
        name: placementNameUsedArr[0],
        compatibility: "DISPLAY",
        externalId: "1234",
        campaignId: 24824452,
        tagFormats: ["PLACEMENT_TAG_STANDARD"],
        pricingSchedule: {
          endDate: endDate,
          startDate: startDate,
          pricingType: "PRICING_TYPE_CPM",
        },
        size: {
          height: 250,
          width: 300,
        },
        paymentSource: "PLACEMENT_AGENCY_PAID",
      },
    })
    .then(
      function (response) {
        // Handle the results here (response.result has the parsed body).
        console.log("Response", response);
        callbackAfterUpdate();
      },
      function (err) {
        console.error("Execute error", err);
      }
    );
}

function removeRow(oButton) {
  var empTab = document.getElementById("tsTable");
  empTab.deleteRow(oButton.parentNode.rowIndex); // buttton -> td -> tr
  var plcmntTab = document.getElementById("placementTable");
  plcmntTab.deleteRow(oButton.parentNode.rowIndex); // buttton -> td -> tr
  checkTsTableLength();
}

function cpyRow(oButton) {
  var empTab = document.getElementById("tsTable");
  var tsRow = oButton.parentNode;
  var newRow = tsRow.cloneNode(true);
  empTab.appendChild(newRow);
  var plcmntTab = document.getElementById("placementTable");
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
  return gapi.client
    .load(
      "https://content.googleapis.com/discovery/v1/apis/dfareporting/v3.5/rest"
    )
    .then(
      function () {
        console.log("GAPI client loaded for API");
        //getUserProfileIdAndInsertLandingPage();
      },
      function (err) {
        console.error("Error loading GAPI client for API", err);
      }
    );
}

function generateCard() {
  kpi = window.localStorage.getItem("kpi");
  buyingMetric = window.localStorage.getItem("buyingMetric");
  date_range = window.localStorage.getItem("date_range");
  yourName = document.querySelector("#requester").value;
  if (kpi === null) {
    kpi = getValueByClassName("kpis");
    buyingMetric = getValueByClassName("buyingMetrics");
    date_range = getValueById("startDate") + " - " + getValueById("endDate");
  }
  let getCardClass = document.querySelector(".card-content");
  getCardClass.innerHTML = `
  <p>KPI  - ${kpi}</p>
  <p>FLIGHT DATES - ${date_range}</p>
  <p>TS REQUESTER - ${yourName}</p>
`;
}

var ibtnRemove;
var buttonrm;
var ibtncpy;
var buttoncpy;

function addandremovebuttons() {
  ibtnRemove = document.createElement("i");
  ibtnRemove.setAttribute("class", "material-icons");
  ibtnRemove.innerHTML = "delete";

  buttonrm = document.createElement("a");
  buttonrm.setAttribute("type", "button");
  buttonrm.setAttribute("class", "waves-effect waves-light btn-small");
  buttonrm.appendChild(ibtnRemove);

  ibtncpy = document.createElement("i");
  ibtncpy.setAttribute("class", "material-icons");
  ibtncpy.innerHTML = "add";

  buttoncpy = document.createElement("a");
  buttoncpy.setAttribute("type", "button");
  buttoncpy.setAttribute("class", "waves-effect waves-light btn-small");
  buttoncpy.appendChild(ibtncpy);
}

// URL Builder code - Starts BELOW - 

function makePlacementNames(parsedata) {
  // let parsedata = [];
  // let newLinebrk = data.split("\n");
  // for (let i = 0; i < newLinebrk.length; i++) {
  //   parsedata.push(newLinebrk[i].split(","));
  // }

  console.log("parsedata in UB  " + parsedata);
  //output structure
  results = new Array([
    "Site_ID",
    "Placement_ID",
    "Site",
    "Placement",
    "Dimensions",
    "Start_Date",
    "End_Date",
    "Placement_Type",
    "Status",
    "Hidden",
    "Stopped",
    "Third_Party_ID",
    "Clicktag_1",
    "Third_Party_Impression_1",
    "Third_Party_Impression_2",
    "Non AF Link",
  ]);
  //results2 = new Array([]);

  //console.table(parsedata);
  for (i = 1; i < parsedata.length; i++) {
    //split row into variables
    var placement = parsedata[i][0].trim();
    var iosLP = parsedata[i][1].trim();
    var andLP = parsedata[i][2].trim();
    var deskLP = parsedata[i][3].trim();
    var networkName = parsedata[i][4].toUpperCase().trim();
    var channel = parsedata[i][5].trim();
    var adserver = parsedata[i][6].trim();
    var tagType = parsedata[i][7].trim();
    var campaignName = parsedata[i][8].trim();
    var rateType = parsedata[i][9].trim();
    var unitCost = parsedata[i][10].trim();
    var conversion = parsedata[i][11].trim();
    var startDate = parsedata[i][12].trim();
    var endDate = parsedata[i][13].trim();

    //split placement name into variables
    var splitPlacementName = new Array();
    splitPlacementName = placement.split("-");
    var brand = splitPlacementName[0];
    var geo = splitPlacementName[1];
    var platform = splitPlacementName[2];
    var campaign = splitPlacementName[3];
    var budget = splitPlacementName[4];
    var agency = splitPlacementName[5];
    var dsp = splitPlacementName[6];
    var publisher = splitPlacementName[7];
    var subsite = splitPlacementName[8];
    var audience = splitPlacementName[9];
    var vertical = splitPlacementName[10];
    var message = splitPlacementName[11];
    var offer = splitPlacementName[12];
    var ams = splitPlacementName[13].trim();
    var format = splitPlacementName[14].toLowerCase();
    var targeting = splitPlacementName[15];
    var subtargeting = splitPlacementName[16];

    //JSON lookup keys
    var siteKey = agency + "-" + dsp + "-" + publisher;
    var appLinkKey = brand + "-" + geo + "-" + platform;

    var networkParams = null;
    var networkParamsImps;
    var landingPage;
    var empty = "";
    var finalLink = null;
    var finalImpLink = null;
    var nonafLink = null;
    var utmParamsIOS = null;
    var utmParamsAND = null;
    var utmParamsDESK = null;
    var error;

    var amsSub4 = "&af_sub4=" + ams;
    var versionID = "&af_ad=[%FT_CONFID%]";

    //check for / at the end of URL and append if not existing
    iosLP = iosLP.slice(iosLP.length - 1) == "/" ? iosLP : iosLP + "/";
    andLP = andLP.slice(andLP.length - 1) == "/" ? andLP : andLP + "/";
    deskLP = deskLP.slice(deskLP.length - 1) == "/" ? deskLP : deskLP + "/";

    //set landing page
    if (platform.toLowerCase() == "and") {
      landingPage = andLP;
    } else if (platform.toLowerCase() == "ios") {
      landingPage = iosLP;
    } else {
      landingPage = deskLP;
    }

    landingPage = landingPage.startsWith("http")
      ? landingPage
      : (landingPage = "");

    //search through JSON
    var appresult = app.find(({ id }) => id === appLinkKey);
    var networkresult = network.find(({ id }) => id === networkName);
    var siteresult = site.find(({ id }) => id === siteKey.toLowerCase());

    if (appLinkKey.toLowerCase().search("desk") > 0) {
      appresult = "desk";
    }

    try {
      if (!appresult) throw "Add app: '" + appLinkKey + "' to appindex.json";
      if (!networkresult)
        throw "Add network '" + networkName + "' to networkindex.json";
      if (!siteresult) throw "Add site '" + siteKey + "' to siteindex.json";
    } catch (err) {
      alert("ERROR: " + err);
    }

    //machine link
    var machinelink =
      "https://api.mchnad.com/clk/95dc8a68-69f0-4471-b6de-6043a9247f48/network/" +
      siteresult.ftid +
      "/" +
      appresult.appid +
      "/unknown/[ftqs:[machineclick]]/redirect/";

    console.log(networkName);
    console.log(machinelink);
    console.log(appresult.click);
    console.log(appresult.imp);
    console.log(appresult.nativeurl);
    console.log(networkresult.iosclick);
    console.log(networkresult.iosimp);
    console.log(networkresult.andclick);
    console.log(networkresult.andimp);
    console.log(siteresult.siteid);
    console.log(siteresult.adserver);
    console.log(appresult.appid);

    //make format 1x1 for vod activity
    if (format.toLowerCase().includes("vod")) {
      format = "1x1";
    }

    //Build UTM params
    switch (channel.toLowerCase()) {
      case "paidsocial":
        var utmParamsIOS =
          "?source=" +
          ams +
          "&utm_medium=paidsocial&utm_source=" +
          publisher.toLowerCase() +
          "&utm_campaign=" +
          campaign.toLowerCase();
        var utmParamsAND =
          "?source=" +
          ams +
          "&utm_medium=paidsocial&utm_source=" +
          publisher.toLowerCase() +
          "&utm_campaign=" +
          campaign.toLowerCase();
        var utmParamsDESK =
          "?source=" +
          ams +
          "&utm_medium=paidsocial&utm_source=" +
          publisher.toLowerCase() +
          "&utm_campaign=" +
          campaign.toLowerCase();
        break;
      case "affiliates":
        var utmParamsIOS =
          "?source=" +
          ams +
          "&utm_medium=affiliates&utm_source=" +
          publisher.toLowerCase() +
          "&utm_campaign=" +
          campaign.toLowerCase();
        var utmParamsAND =
          "?source=" +
          ams +
          "&utm_medium=affiliates&utm_source=" +
          publisher.toLowerCase() +
          "&utm_campaign=" +
          campaign.toLowerCase();
        var utmParamsDESK =
          "?source=" +
          ams +
          "&utm_medium=affiliates&utm_source=" +
          publisher.toLowerCase() +
          "&utm_campaign=" +
          campaign.toLowerCase();
        break;
      case "display":
        console.log("control is here in DISPLAY");
        var utmParamsIOS =
          "?source=" +
          ams +
          "&utm_medium=display&utm_source=" +
          publisher.toLowerCase() +
          "&utm_campaign=" +
          campaign.toLowerCase();
        var utmParamsAND =
          "?source=" +
          ams +
          "&utm_medium=display&utm_source=" +
          publisher.toLowerCase() +
          "&utm_campaign=" +
          campaign.toLowerCase();
        var utmParamsDESK =
          "?source=" +
          ams +
          "&utm_medium=display&utm_source=" +
          publisher.toLowerCase() +
          "&utm_campaign=" +
          campaign.toLowerCase();
        break;
      case "crm":
        var utmParamsIOS =
          "?source=" +
          ams +
          "&utm_medium=crm&utm_source=" +
          publisher.toLowerCase() +
          "&utm_campaign=" +
          campaign.toLowerCase();
        var utmParamsAND =
          "?source=" +
          ams +
          "&utm_medium=crm&utm_source=" +
          publisher.toLowerCase() +
          "&utm_campaign=" +
          campaign.toLowerCase();
        var utmParamsDESK =
          "?source=" +
          ams +
          "&utm_medium=crm&utm_source=" +
          publisher.toLowerCase() +
          "&utm_campaign=" +
          campaign.toLowerCase();
    }

    //Build url
    switch (platform.toLowerCase()) {
      case "ios":
        landingPage = iosLP;
        finalLink = buildFinalLink(
          machinelink,
          tagType,
          appresult.click,
          appresult.imp,
          placement,
          amsSub4,
          versionID,
          networkresult.iosclick,
          landingPage,
          networkresult.iosimp,
          utmParamsIOS
        );
        nonafLink = landingPage.startsWith("http")
          ? landingPage + utmParamsIOS
          : appresult.nativeurl;
        finalImpLink =
          appresult.imp +
          "c=" +
          placement +
          amsSub4 +
          "&" +
          networkresult.iosimp;
        break;
      case "and":
        landingPage = andLP;
        finalLink = buildFinalLink(
          machinelink,
          tagType,
          appresult.click,
          appresult.imp,
          placement,
          amsSub4,
          versionID,
          networkresult.andclick,
          landingPage,
          networkresult.andimp,
          utmParamsAND
        );
        nonafLink = landingPage.startsWith("http")
          ? landingPage + utmParamsAND
          : appresult.nativeurl;
        finalImpLink =
          appresult.imp +
          "c=" +
          placement +
          amsSub4 +
          "&" +
          networkresult.andimp;
        break;
      case "dis":
        networkParamsImps = null;
        networkParams = networkresult.andclick;
        finalLink = buildFinalOneLink(
          appresult.click,
          placement,
          amsSub4,
          versionID,
          networkParams,
          iosLP,
          andLP,
          deskLP,
          networkParamsImps,
          utmParamsDESK,
          utmParamsAND,
          utmParamsIOS,
          channel
        );
        nonafLink = landingPage + utmParamsDESK;
        break;
      case "mob":
        networkParamsImps = null;
        networkParams = networkresult.andclick;
        finalLink = buildFinalOneLink(
          appresult.click,
          placement,
          amsSub4,
          versionID,
          networkParams,
          iosLP,
          andLP,
          deskLP,
          networkParamsImps,
          utmParamsDESK,
          utmParamsAND,
          utmParamsIOS,
          channel
        );
        nonafLink = landingPage + utmParamsDESK;
        break;
      case "ctv":
        landingPage = deskLP;
        appLink = landingPage;
        impLink = null;
        networkParams = utmParamsDESK;
        finalLink = appLink + networkParams;
        nonafLink = landingPage + utmParamsDESK;
        break;
      case "desk":
        landingPage = deskLP;
        appLink = landingPage;
        impLink = null;
        networkParams = utmParamsDESK;
        finalLink = appLink + networkParams;
        nonafLink = landingPage + utmParamsDESK;
    }

    // generate links for special cases
    if (channel.toLowerCase() == "paidsocial") {
      //	finalLink = nonafLink;
    } else if (dsp.toLowerCase() == "dv360") {
      finalLink = nonafLink + "&review=true";
    } else if (
      dsp.toLowerCase() == "mediamath" &&
      adserver.toLowerCase() == "ft"
    ) {
      finalLink = finalLink.replace("AD_ATTR.campaign", "%campaignID%");
      finalLink = finalLink.replace("AD_ATTR.creative", "%FT_CONFID%");
      finalLink = finalLink.replace("AD_ATTR.width", "%placementWidth%");
      finalLink = finalLink.replace("AD_ATTR.height", "%placementHeight%");
      finalLink = finalLink.replace("BID_ATTR.pub_id", "%placementID%");
      finalLink = finalLink.replace(/MM_UUID/gi, "%IDFA%");
      finalLink = finalLink.replace("&af_sub1=[BID_ATTR.bid_id]", "");
      finalLink = finalLink.replace("AD_ATTR.strategy", "FTRACKID");
      finalLink = finalLink.replace("&af_siteid=[BID_ATTR.site_id]", "");
      finalImpLink = finalImpLink.replace("AD_ATTR.campaign", "%campaignID%");
      finalImpLink = finalImpLink.replace("AD_ATTR.creative", "%FT_CONFID%");
      finalImpLink = finalImpLink.replace("AD_ATTR.width", "%placementWidth%");
      finalImpLink = finalImpLink.replace(
        "AD_ATTR.height",
        "%placementHeight%"
      );
      finalImpLink = finalImpLink.replace("BID_ATTR.pub_id", "%placementID%");
      finalImpLink = finalImpLink.replace(/MM_UUID/gi, "%IDFA%");
      finalImpLink = finalImpLink.replace("&af_sub1=[BID_ATTR.bid_id]", "");
      finalImpLink = finalImpLink.replace("AD_ATTR.strategy", "FTRACKID");
      finalImpLink = finalImpLink.replace("&af_siteid=[BID_ATTR.site_id]", "");
    }

    //finalImpLink = (finalLink.includes("appsflyer") ? finalLink.replace("app", "impression") : "");

    results.push([
      siteresult.ftid,
      empty,
      empty,
      placement,
      format,
      startDate,
      endDate,
      empty,
      empty,
      empty,
      empty,
      ams,
      finalLink,
      finalImpLink,
      empty,
      nonafLink,
    ]);
    //results2.push([siteresult.ftid,empty,empty,placement,format,startDate,endDate,empty,empty,empty,empty,ams,finalLink,empty,empty,nonafLink]);
  }
  console.table("results   "+results);
  //console.table(results2);
  makeTable(results);
}

function buildFinalLink(
  machinelink,
  tagType,
  appLink,
  appimp,
  placement,
  amsSub4,
  versionID,
  networkParams,
  landingPage,
  networkParamsImps,
  utmParams
) {
  if (tagType.includes("Machine")) {
    appLink = machinelink + appLink;
  }

  if (landingPage.startsWith("http")) {
    encodedUTM = encodeURIComponent(utmParams);
    finalLink =
      appLink +
      "c=" +
      placement +
      amsSub4 +
      versionID +
      "&" +
      networkParams +
      "&af_r=" +
      landingPage +
      encodedUTM;
  } else {
    finalLink =
      appLink + "c=" + placement + amsSub4 + versionID + "&" + networkParams;
  }
  return finalLink;
}

function buildFinalOneLink(
  appLink,
  placement,
  amsSub4,
  versionID,
  networkParams,
  iosLP,
  andLP,
  deskLP,
  networkParamsImps,
  utmParamsDESK,
  utmParamsAND,
  utmParamsIOS,
  channel
) {
  networkParams = networkParams + "&af_param_forwarding=false";
  utmParamsAND = encodeURIComponent(utmParamsAND);
  utmParamsIOS = encodeURIComponent(utmParamsIOS);
  utmParamsDESK = encodeURIComponent(utmParamsDESK);

  if (
    deskLP.startsWith("http") &&
    iosLP.startsWith("http") &&
    andLP.startsWith("http")
  ) {
    finalLink =
      appLink +
      "c=" +
      placement +
      amsSub4 +
      "&" +
      networkParams +
      "&af_android_url=" +
      andLP +
      utmParamsAND +
      "&af_ios_url=" +
      iosLP +
      utmParamsIOS +
      "&af_web_dp=" +
      deskLP +
      utmParamsDESK;
  } else if (
    deskLP.startsWith("http") &&
    iosLP.startsWith("http") &&
    andLP == ""
  ) {
    finalLink =
      appLink +
      "c=" +
      placement +
      amsSub4 +
      "&" +
      networkParams +
      "&af_ios_url=" +
      iosLP +
      utmParamsIOS +
      "&af_web_dp=" +
      deskLP +
      utmParamsDESK;
  } else if (
    deskLP.startsWith("http") &&
    iosLP == "" &&
    andLP.startsWith("http")
  ) {
    finalLink =
      appLink +
      "c=" +
      placement +
      amsSub4 +
      "&" +
      networkParams +
      "&af_android_url=" +
      andLP +
      utmParamsAND +
      "&af_web_dp=" +
      deskLP +
      utmParamsDESK;
  } else if (deskLP.startsWith("http") && iosLP == "" && andLP == "") {
    finalLink =
      appLink +
      "c=" +
      placement +
      amsSub4 +
      "&" +
      networkParams +
      "&af_web_dp=" +
      deskLP +
      utmParamsDESK;
  } else {
    finalLink = appLink + "c=" + placement + amsSub4 + "&" + networkParams;
  }
  return finalLink;
}

//export to csv functions
function makeTable(results) {
  var table = document.createElement("table");
  var tableBody = document.createElement("tbody");

  results.forEach(function (rowData) {
    var row = document.createElement("tr");

    rowData.forEach(function (cellData) {
      var cell = document.createElement("td");
      cell.appendChild(document.createTextNode(cellData));
      row.appendChild(cell);
    });

    tableBody.appendChild(row);
  });

  table.appendChild(tableBody);
  document.body.appendChild(table);
  document
    .getElementsByTagName("table")[0]
    .setAttribute("contentEditable", true);
}

function downloadCSV(csv, filename) {
  var csvFile;
  var downloadLink;

  // CSV file
  csvFile = new Blob([csv], { type: "text/csv" });

  // Download link
  downloadLink = document.createElement("a");

  // File name
  downloadLink.download = filename;

  // Create a link to the file
  downloadLink.href = window.URL.createObjectURL(csvFile);

  // Hide download link
  downloadLink.style.display = "none";

  // Add the link to DOM
  document.body.appendChild(downloadLink);

  // Click download link
  downloadLink.click();
}

function exportTableToCSV(filename) {
  var csv = [];
  var rows = document.querySelectorAll("table tr");

  for (var i = 0; i < rows.length; i++) {
    var row = [],
      cols = rows[i].querySelectorAll("td, th");

    for (var j = 0; j < cols.length; j++) row.push(cols[j].innerText);

    csv.push(row.join(","));
  }

  // Download CSV file
  downloadCSV(csv.join("\n"), filename);
}
