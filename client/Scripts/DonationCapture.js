var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");


function DonationCSCHelp(){
    var sFeatures = 'WIDTH=392px,HEIGHT=540px,RESIZABLE=YES,SCROLLBARS=NO,TOOLBAR=NO,LEFT=5,TOP=20,location=No;status=No';
    var oPopUp = new PopUpDialogBB('~/Admin/DonationHelp.ascx', '_blank', sFeatures, '&mode=1');
    oPopUp.Show();
}

function DonationBankHelp(){
    var sFeatures = 'WIDTH=392px,HEIGHT=400px,RESIZABLE=YES,SCROLLBARS=NO,TOOLBAR=NO,LEFT=5,TOP=20,location=No;status=No';
    var oPopUp = new PopUpDialogBB('~/Admin/DonationHelp.ascx', '_blank', sFeatures, '&mode=2');
    oPopUp.Show();
}

function DDGuarantee(){
    var sFeatures = 'WIDTH=392px,HEIGHT=415px,RESIZABLE=YES,SCROLLBARS=NO,TOOLBAR=NO,LEFT=5,TOP=20,location=No;status=No';
    var oPopUp = new PopUpDialogBB('~/Admin/DonationHelp.ascx', '_blank', sFeatures, '&mode=3');
    oPopUp.Show();
}

function DonationGiftAidHelp(){
    var sFeatures = 'WIDTH=510px,HEIGHT=425px,RESIZABLE=YES,SCROLLBARS=NO,TOOLBAR=NO,LEFT=5,TOP=20,location=No;status=No';
    var oPopUp = new PopUpDialogBB('~/Admin/DonationHelp.ascx', '_blank', sFeatures, '&mode=4');
    oPopUp.Show();
}

function MGSearch(){
    var sFeatures = 'WIDTH=600px,HEIGHT=520px,RESIZABLE=YES,SCROLLBARS=NO,TOOLBAR=NO,LEFT=10,TOP=30,location=No;status=No';
    var oPopUp = new PopUpDialogBB('~/Admin/MatchFinder/MGSearch.ascx', '_blank', sFeatures, '&mgCallback=SetMGCompany&MGSessionID=' + MGSessionInfo);
    oPopUp.Show();
}

function SetMGCompany(sName) {
    try {
        document.getElementById(chkMGCompanyID).checked = true;
        document.getElementById(MGCompanyID).value = sName;
        ShowMGCompany();
    } catch(e) {}
}

function ShowMGCompany() {
    try {
        var tr_MGCompany = document.getElementById(tr_MGCompanyID);
        if (document.getElementById(chkMGCompanyID).checked){
            tr_MGCompany.style.display = '';
        } else {
            tr_MGCompany.style.display = 'none';
        }
    } catch(e) {}
}

function setNewUserControls(bChecked) {

    var usr = document.getElementById("TrUsername");
    var pass = document.getElementById("TrPassword");
    var cpas = document.getElementById("TrConfirmPass");
    var rmnd = document.getElementById("TrReminder");
    var passmsg = document.getElementById("TRPasswordMessage");

    var value;


    if (bChecked == true) {
        value = '';
    } else {
        value = 'none';
    }

    if (usr != null) { usr.style.display = value; }
    if (pass != null) { pass.style.display = value; }
    if (cpas != null) { cpas.style.display = value; }
    if (rmnd != null) { rmnd.style.display = value; }
    if (passmsg != null) { passmsg.style.display = value; }

}

}