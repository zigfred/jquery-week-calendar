module("jQuery Week Calendar v2.0-dev");

test("Default Options", function() {
    
    var $calendar = $("#calendar");
    $calendar.weekCalendar();
    
	same($calendar.weekCalendar('option','alwaysDisplayTimeMinutes'), true);
	same($calendar.weekCalendar('option','use24Hour'), false);
	same($calendar.weekCalendar('option','daysToShow'), 7);
	same($calendar.weekCalendar('option','minBodyHeight'), 100);
	same($calendar.weekCalendar('option','useShortDayNames'), false);
	same($calendar.weekCalendar('option','timeSeparator'), ' to ');
	same($calendar.weekCalendar('option','startParam'), 'start');
	same($calendar.weekCalendar('option','endParam'), 'end');
/*	same($("#calendar").weekCalendar('option','businessHours.start'), 8);
	same($("#calendar").weekCalendar('option','businessHours.end'), 18);
	same($("#calendar").weekCalendar('option','businessHours.limitDisplay'), false);
*/
    same($calendar.weekCalendar('option','newEventText'), 'New Event');
    same($calendar.weekCalendar('option','timeslotHeight'), 20);
    same($calendar.weekCalendar('option','defaultEventLength'), 2);
    same($calendar.weekCalendar('option','timeslotsPerHour'), 4);
    same($calendar.weekCalendar('option','minDate'), null);
    same($calendar.weekCalendar('option','maxDate'), null);
    same($calendar.weekCalendar('option','buttons'), true);
    same($calendar.weekCalendar('option','scrollToHourMillis'), 500);
    same($calendar.weekCalendar('option','allowCalEventOverlap'), false);
    same($calendar.weekCalendar('option','overlapEventsSeparate'), false);
    same($calendar.weekCalendar('option','readonly'), false);
    same($calendar.weekCalendar('option','allowEventCreation'), true);
    
    same($calendar.weekCalendar('option','displayOddEven'), false);
    same($calendar.weekCalendar('option','textSize'), 13);
    same($calendar.weekCalendar('option','headerSeparator'), '<br />');
    same($calendar.weekCalendar('option','getHeaderDate'), null);
    same($calendar.weekCalendar('option','preventDragOnEventCreation'), false);
    
    //same($("#calendar").weekCalendar('option','draggable'), true);
    
});

/*
test("Override Default Options", function() {
    
});
*/
