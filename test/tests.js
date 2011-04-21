module('jQuery Week Calendar v2.0-dev');
function formatTimeZone(){
  var TZ = -(new Date()).getTimezoneOffset();
  var TZ = {
    'sign': (TZ < 0 ? '-' : '+'),
    'hour': (Math.floor(TZ / 60)),
    'minute': (TZ % 60)};

  return TZ['sign'] + (TZ['hour'] < 10 ? '0' : '') + TZ['hour'] + ":" + (TZ['minute'] < 10 ? '0' : '') + TZ['minute'];
}

test('Default Options', function() {

    var $calendar = $('#calendar');
    $calendar.weekCalendar();

  expect(25);

	same($calendar.weekCalendar('option', 'alwaysDisplayTimeMinutes'), true);
	same($calendar.weekCalendar('option', 'use24Hour'), false);
	same($calendar.weekCalendar('option', 'daysToShow'), 7);
	same($calendar.weekCalendar('option', 'minBodyHeight'), 100);
	same($calendar.weekCalendar('option', 'useShortDayNames'), false);
	same($calendar.weekCalendar('option', 'timeSeparator'), ' to ');
	same($calendar.weekCalendar('option', 'startParam'), 'start');
	same($calendar.weekCalendar('option', 'endParam'), 'end');
/*	same($("#calendar").weekCalendar('option','businessHours.start'), 8);
	same($("#calendar").weekCalendar('option','businessHours.end'), 18);
	same($("#calendar").weekCalendar('option','businessHours.limitDisplay'), false);
*/
    same($calendar.weekCalendar('option', 'newEventText'), 'New Event');
    same($calendar.weekCalendar('option', 'timeslotHeight'), 20);
    same($calendar.weekCalendar('option', 'defaultEventLength'), 2);
    same($calendar.weekCalendar('option', 'timeslotsPerHour'), 4);
    same($calendar.weekCalendar('option', 'minDate'), null);
    same($calendar.weekCalendar('option', 'maxDate'), null);
    same($calendar.weekCalendar('option', 'buttons'), true);
    same($calendar.weekCalendar('option', 'scrollToHourMillis'), 500);
    same($calendar.weekCalendar('option', 'allowCalEventOverlap'), false);
    same($calendar.weekCalendar('option', 'overlapEventsSeparate'), false);
    same($calendar.weekCalendar('option', 'readonly'), false);
    same($calendar.weekCalendar('option', 'allowEventCreation'), true);

    same($calendar.weekCalendar('option', 'displayOddEven'), false);
    same($calendar.weekCalendar('option', 'textSize'), 13);
    same($calendar.weekCalendar('option', 'headerSeparator'), '<br />');
    same($calendar.weekCalendar('option', 'getHeaderDate'), null);
    same($calendar.weekCalendar('option', 'preventDragOnEventCreation'), false);

    //same($("#calendar").weekCalendar('option','draggable'), true);

});

test('Date internationalization', function() {

  var $calendar = $('#calendar');
  $calendar.weekCalendar({
      date: new Date(),
      firstDayOfWeek: $.datepicker.regional['fr'].firstDay,
      shortDays: $.datepicker.regional['fr'].dayNamesShort,
      longDays: $.datepicker.regional['fr'].dayNames,
      shortMonths: $.datepicker.regional['fr'].monthNamesShort,
      longMonths: $.datepicker.regional['fr'].monthNames,
      dateFormat: 'd F y'
    });

  expect(2);

  // default format
  same($calendar.weekCalendar('formatDate', new Date('Apr 20 2011 14:50:32 GMT+0200')), '20 Avril 11');
  // force format
  same($calendar.weekCalendar('formatDate', new Date('Apr 20 2011 14:50:32 GMT+0200'), 'l j M Y'), 'Mercredi 20 Avril 2011');
  // TODO add formatTime tests

});

test("issue # 60: eventHeader doesn't take care of use24Hour option", function() {
  var $calendar = $('#calendar');
  $calendar.weekCalendar({
    'use24Hour': false,
    'timeSeparator': ' -> '
  });
  //get local timezone:
  var TZ = formatTimeZone();

  expect(5);
  var _events = [{
      'id': 1,
      'start': '2009-05-10T13:15:00.000' + TZ,
      'end': '2009-05-10T14:15:00.000' + TZ,
      'title': 'Lunch with Mike'}, {
      'id': 1,
      'start': '2009-05-10T10:15:00.000' + TZ,
      'end': '2009-05-10T12:15:00.000' + TZ,
      'title': 'Lunch with Mike'}
      ];
  // trick to call private function
  var _privateWeekCalendar = $calendar.data('weekCalendar');
  _events = _privateWeekCalendar._cleanEvents.call(_privateWeekCalendar, _events);

  var eventHeaderFunc = $calendar.weekCalendar('option', 'eventHeader');

  ok($.isFunction(eventHeaderFunc), 'check eventHeader is a function');

  // test without use24Hour option
  same(eventHeaderFunc(_events[0], $calendar), '01:15 pm -> 02:15 pm');
  same(eventHeaderFunc(_events[1], $calendar), '10:15 am -> 12:15 pm');

  // now force use24Hour to true
  $calendar.weekCalendar('option', 'use24Hour', true);

  same(eventHeaderFunc(_events[0], $calendar), '13:15 -> 14:15');
  same(eventHeaderFunc(_events[1], $calendar), '10:15 -> 12:15');

});
