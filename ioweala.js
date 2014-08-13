
Entrances = new Meteor.Collection("entrances");

if (Meteor.isClient) {

  Session.set('result', ".......");
  defaultDate = "2015-08-15";
  Session.set('ddate', defaultDate);
  defaultAmount = 40;
  Session.set('principal', defaultAmount);
  defaultYear = "2008";
  Session.set('entranceYear', defaultYear);

  Template.hello.greeting = function () {
    return "";
  };

  Template.selectDateOfTwentyFifthBirthday.defaultDate = function() {
    return defaultDate;
  };

  Template.selectDateOfTwentyFifthBirthday.years = function () {
    return EntranceYears.find({}, {sort: {year: 1}}); //not working for some reason
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
      var yearSelected = Session.get('entranceYear');
      var principalSelected = Session.get('principal');
      var dDateSelected = Session.get('ddate');

      entranceDetails = Entrances.findOne({year:Session.get('entranceYear')});
      d1 = entranceDetails.fdoc;
      rate = entranceDetails.rate;

      var arrDate = dDateSelected.split('-');
      // console.log(arrDate);
      var dDate = new Date(arrDate[0], arrDate[1] -1, arrDate[2]);
      // console.log(dDate);

      var arrDate1 = d1.split("/");
      entranceDate = new Date(arrDate1[2], arrDate1[1] -1, arrDate1[0]);

      dateDiff = diffDate(dDate,entranceDate);
      // console.log(dateDiff);

      res = Math.floor(principalSelected * Math.pow(1+rate, dateDiff));
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
    if (Entrances.find().count() === 0) {
      var classes = [{year:"2008", fdoc:"01/08/2008", rate:0.155},
                   {year:"2009", fdoc:"01/08/2009", rate:0.17},
                   {year:"2010", fdoc:"01/08/2010", rate:0.16}
                   ];
      for (var i = 0; i < classes.length; i++)
        Entrances.insert(classes[i]);
    }
  });
}
