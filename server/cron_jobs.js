var world = function () {
  console.log('World!');
}

var testNewsletter = function() {

  var options = {
      apiKey: 'key-82c9f724f1ce91a5d437513369b0aa64',
      domain: 'ethicsmonitor.org'
  }

  var bigCursor = Dilemmas.find({},{sort: {votes: -1, submitted: -1, _id: -1}, limit: 1} );
  var newCursor = Dilemmas.find({},{sort: {submitted: -1, _id: -1}, limit: 1} );

  var bigDilemma = bigCursor.fetch()[0];
  var newDilemma = newCursor.fetch()[0];
  console.log(bigDilemma);
  console.log(newDilemma);


  //var htmlMsg = '<html><head></head><body><img style="max-width:600px;" src="https://s3.amazonaws.com/ethicsmonitor/siteimages/header.jpg" alt="EthicsMonitor"><p><img src='+ bigDilemma.imageUrl +' alt="Dilemma Image"></p><p><b>This weeks Big Dilemma:</b>'+ bigDilemma.title +'</p><p><b>This weeks New Dilemma:</b>'+ newDilemma.title +'</p><p><img src='+ newDilemma.imageUrl +' alt="Dilemma Image"></p></body></html>';
  var htmlMsg = '<html><head></head><body><a href="http://ethicsmonitor.org"><img style="max-width:480px;" src="https://s3.amazonaws.com/ethicsmonitor/siteimages/header.jpg" alt="EthicsMonitor"></a><p><a href="http://ethicsmonitor.org/dilemma/detail/'+ bigDilemma._id +'"><img style="max-width:350px;" src="' + bigDilemma.imageUrl + '" alt="Dilemma Image"></a></p><p><b>Big Dilemma this week: </b>'+ bigDilemma.title +'</p><br><p><a href="http://ethicsmonitor.org/dilemma/detail/'+ newDilemma._id +'"><img style="max-width:350px;" src="'+ newDilemma.imageUrl +'" alt="Dilemma Image"></a></p><p><b>New Dilemma this week: </b>'+ newDilemma.title +'</p><br><p style="color:lightgrey;max-width:480px;">Copyright 2015. Goa Center for Alternative Photography, All rights reserved. You are receiving this email because either you subscribed on our website or registered for an event. If you find yourself added without your knowledge you can safely unsubscribe.<p><p style="color:lightgrey;max-width:480px;">Our mailing address is: Goa Center for Alternative Photography, Vasco Da Gama, Goa 403726, India</p><p style="color:lightgrey;max-width:480px;"><a href="%mailing_list_unsubscribe_url%">Unsubscribe from this list.</a></p></body></html>';
  //console.log(htmlMsg);

  var MailgunServer = new Mailgun(options);
  MailgunServer.send({
                                 'to': 'test@ethicsmonitor.org',
                                 'from': 'em@goa-cap.org',
                                 'html': htmlMsg,
                                 'text': "EthicsMonitor - Weekly Newsletter",
                                 'subject': " Weekly Newsletter",
                                 'tags': [
                                     'some',
                                     'test',
                                     'tags'
                                 ]
                             });
  console.log("sent test newsletter");
}

var weeklyNewsletter = function() {

  var options = {
      apiKey: 'key-82c9f724f1ce91a5d437513369b0aa64',
      domain: 'ethicsmonitor.org'
  }

  var bigCursor = Dilemmas.find({},{sort: {votes: -1, submitted: -1, _id: -1}, limit: 1} );
  var newCursor = Dilemmas.find({},{sort: {submitted: -1, _id: -1}, limit: 1} );

  var bigDilemma = bigCursor.fetch()[0];
  var newDilemma = newCursor.fetch()[0];

  var htmlMsg = '<html><head></head><body><a href="http://ethicsmonitor.org"><img style="max-width:480px;" src="https://s3.amazonaws.com/ethicsmonitor/siteimages/header.jpg" alt="EthicsMonitor"></a><p><a href="http://ethicsmonitor.org/dilemma/detail/'+ bigDilemma._id +'"><img style="max-width:350px;" src="' + bigDilemma.imageUrl + '" alt="Dilemma Image"></a></p><p><b>Big Dilemma this week: </b>'+ bigDilemma.title +'</p><br><p><a href="http://ethicsmonitor.org/dilemma/detail/'+ newDilemma._id +'"><img style="max-width:350px;" src="'+ newDilemma.imageUrl +'" alt="Dilemma Image"></a></p><p><b>New Dilemma this week: </b>'+ newDilemma.title +'</p><br><p style="color:lightgrey;max-width:480px;">Copyright 2015. Goa Center for Alternative Photography, All rights reserved. You are receiving this email because either you subscribed on our website or registered for an event. If you find yourself added without your knowledge you can safely unsubscribe.<p><p style="color:lightgrey;max-width:480px;">Our mailing address is: Goa Center for Alternative Photography, Vasco Da Gama, Goa 403726, India</p><p style="color:lightgrey;max-width:480px;"><a href="%mailing_list_unsubscribe_url%">Unsubscribe from this list.</a></p></body></html>';

  var MailgunServer = new Mailgun(options);
  MailgunServer.send({
                                 'to': 'newsletter@ethicsmonitor.org',
                                 'from': 'em@goa-cap.org',
                                 'html': htmlMsg,
                                 'text': "EthicsMonitor - Weekly Newsletter",
                                 'subject': " Weekly Newsletter",
                                 'tags': [
                                     'weekly',
                                     'newsletter',
                                     'ethics'
                                 ]
                             });
}

/*
field           allowed values
------          --------------
minute          0-59
hour            0-23
day of month    1-31
month           1-12 (or names, see below)
day of week     0-7 (0 or 7 is Sun, or use names)

Run once a year, ie.  "0 0 1 1 *".
Run once a month, ie. "0 0 1 * *".
Run once a week, ie.  "0 0 * * 0".
Run once a day, ie.   "0 0 * * *".
Run once an hour, ie. "0 * * * *".
*/
var cron = new Meteor.Cron( {
  events:{
  //  "* * * * *"  : world,
  //"43 14 * * 2"  : testNewsletter,
  "10 10 * * 4"  : weeklyNewsletter,    
  }
});
