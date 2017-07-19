var teams = {
  "1808871722730718_2029963597288195":"1"
}
var CMT_FORM = "";
var LIKE_FORM = "";

function doGet(e) {
  if (e.parameter['hub.verify_token'] === 'your_verify_token') {
    var textContent = ContentService.createTextOutput(e.parameter['hub.challenge']);
    textContent.setMimeType(ContentService.MimeType.TEXT);
    return textContent;
  }
}

function doPost(e) {
  
  try {
    var msgdata = JSON.parse(e['postData'].contents);
    msgdata.entry.forEach(function(entry) {
      processRequest(entry);
    });
  } catch (err) {
    //var doc = DocumentApp.openById("15IXYe_cpouufPkZOoRhU3TKjjYn4Kqip6cu3O3oEV-I");
    //doc.getBody().setText(JSON.stringify(err));
  }
}

function processRequest(data) {
  try {
    data.changes.forEach(function (action) {
      if (action.field === "feed" && 
          action.value.verb === "add" && 
          teams[action.value.post_id]) {
        if (action.value.item === "comment") {
          saveCmt(action.value.sender_id, 
                  action.value.created_time, 
                  action.value.message, 
                  teams[action.value.post_id]);
        } else if (action.value.reaction_type) {
          saveLike(action.value.sender_id, 
                  action.value.created_time, 
                  action.value.reaction_type, 
                  teams[action.value.post_id]);
        } 
      }
    });
  } catch (err) {}
}

function saveCmt(id, time, cmt, team) {
  if (!cmt) return;
  var app = FormApp.openById();
  var FormResponse = app.createResponse(CMT_FORM);
  var q = app.getItems();
  FormResponse.withItemResponse(q[0].asTextItem().createResponse(time*1000+''));
  FormResponse.withItemResponse(q[1].asTextItem().createResponse(id+''));
  FormResponse.withItemResponse(q[2].asParagraphTextItem().createResponse(cmt+''));
  FormResponse.withItemResponse(q[3].asTextItem().createResponse(team));
  FormResponse.submit();
}

function saveLike(id, time, type, team) {
  var app = FormApp.openById();
  var FormResponse = app.createResponse(LIKE_FORM);
  var q = app.getItems();
  FormResponse.withItemResponse(q[0].asTextItem().createResponse(id+''));
  FormResponse.withItemResponse(q[1].asTextItem().createResponse(time*1000+''));
  FormResponse.withItemResponse(q[2].asParagraphTextItem().createResponse(type+''));
  FormResponse.withItemResponse(q[3].asTextItem().createResponse(team));
  FormResponse.submit();
}
