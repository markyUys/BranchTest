function rdSaveSchedule(sNextStep) {
    try{    // Added this as the validation gets called after this function and the input box never gets validated.
		var sErrorMsg = rdValidateForm()
		if (sErrorMsg) {
			return(false)
		}
	}
	catch(e){}
	
	if (typeof rdSaveInputCookies != 'undefined'){rdSaveInputCookies()}
	if (typeof rdSaveInputsToLocalStorage != 'undefined'){rdSaveInputsToLocalStorage()}

    rdAjaxRequestWithFormVars("rdAjaxCommand=rdAjaxNotify&rdNotifyCommand=RcSaveSchedule&rdNextStep=" + sNextStep)
    return(true)
}
function rdRunNowSaveFirst() {
    rdSaveSchedule("RunNow")
}
function rdRunNow() {
    rdAjaxRequestWithFormVars("rdAjaxCommand=rdAjaxNotify&rdNotifyCommand=RcRunNowSchedule")
}

function rdRemoveSchedule() {
    rdAjaxRequestWithFormVars("rdAjaxCommand=rdAjaxNotify&rdNotifyCommand=RcRemoveSchedule")
}

function rdSelectExportFormat() {
    //Hide the message body for HTML exports.
    var eleFormat = document.getElementById("ExportFormat")
    var eleMessage = document.getElementById("rowMessage")
    if (eleFormat.value=="HTML") {
        //eleMessage.style.display = "none"
		ShowElement(null, 'rowMessage', 'Hide');	//#15466.
		
    }else{
		//eleMessage.style.display = ""
        if(eleMessage.style.display != "")
			ShowElement(null, 'rowMessage', 'Show');
    }
      
}

function rdRefreshReportCenter() {
    //Called after Ajax updates are completed.
    //Removes the popup panel and refreshes the ReportCenter element.
    var sReportID = document.getElementById("rdRcReportID").value
    var sReportCenterID = document.getElementById("rdReportCenterID").value
    var sReportCenterDataTable = window.parent.document.getElementById("rdDataTableDiv-" + sReportCenterID)
    if (sReportCenterDataTable)
        window.parent.rdAjaxRequest('rdAjaxCommand=RefreshElement&rdReport=' + sReportID + '&rdRefreshElementID=' + sReportCenterID + ',rdDataTableDiv-' + sReportCenterID)
    else
        window.parent.rdAjaxRequest('rdAjaxCommand=RefreshElement&rdReport=' + sReportID + '&rdRefreshElementID=' + sReportCenterID) 

}

function rdHideSchedulePanel() {
    //Quickly hide the schedule panel to prevent further user interaction.
    var elePopupID = document.getElementById("rdPopupID")
    var sPopupID = elePopupID.value
    window.parent.document.getElementById(sPopupID).style.display="none"
    window.parent.document.getElementById(sPopupID).previousSibling.style.display="none"    //#15514.
}

