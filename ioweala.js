if (Meteor.isClient) {

  Session.set('result', ".......");
  defaultDate = "2015-08-15";
  Session.set('ddate', defaultDate);
  defaultAmount = 40;
  Session.set('principal', defaultAmount);

  Template.hello.greeting = function () {
    return "";
  };

  Template.selectDateOfTwentyFifthBirthday.defaultDate = function() {
    return defaultDate;
  };

  Template.inputOriginalAward.defaultAmount = function() {
    return defaultAmount;
  };

  Template.result.amount = function() {
    return "About "+Session.get('result')+" k";
  };

  Template.hello.events({
    'click input': function () {
      // template data, if any, is available in 'this'
      // if (typeof console !== 'undefined')
        // console.log("You pressed the button");
    }
  });

  Template.selectEntranceYear.events({
    'change #yearpicker': function (evt) {
      // template data, if any, is available in 'this'
      // if (typeof console !== 'undefined')
        // console.log(evt.currentTarget.value);
      Session.set('entranceYear', evt.currentTarget.value);
    }
  });

  Template.inputOriginalAward.events({
    'change #principal': function (evt) {
      // template data, if any, is available in 'this'
      // if (typeof console !== 'undefined')
        // console.log(evt.currentTarget.value);
      Session.set('principal', evt.currentTarget.value);
    }
  });

  Template.selectDateOfTwentyFifthBirthday.events({
    'change #dreadedDate': function (evt) {
      // template data, if any, is available in 'this'
      // if (typeof console !== 'undefined')
        // console.log(evt.currentTarget.value);
      Session.set('ddate', evt.currentTarget.value);
    }
  });

  Template.tellMe.events({
    'click input': function (evt) {
      // template data, if any, is available in 'this'
      // if (typeof console !== 'undefined')
        // console.log(evt.currentTarget.value);

      var d = Session.get('ddate');
      var arrDate = d.split('-');
      // console.log(arrDate);
      var dDate = new Date(arrDate[0], arrDate[1] -1, arrDate[2]);
      // console.log(dDate);

      var d1 = '01/08/2008';
      var arrDate1 = d1.split("/");
      // console.log(arrDate1);
      entranceDate = new Date(arrDate1[2], arrDate1[1] -1, arrDate1[0]);
      // console.log(entranceDate);

      dateDiff = diffDate(dDate,entranceDate);
      // console.log(dateDiff);
      if (Session.get('entranceYear') == "2008")
        rate = 0.155;
      else
        rate = 0.16;
      res = Math.floor(Session.get('principal') * Math.pow(1+rate, dateDiff));
      // console.log(res);
      Session.set('result', res);
    }

  });

  function diffDate(endDate,startDate) {
    var diff = Math.floor(endDate.getTime() - startDate.getTime());
    var day = 1000* 60 * 60 * 24;

    var days = diff/day;
    var months = days/30;
    var years = months/12;

    return years;
  }
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
