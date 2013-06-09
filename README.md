# ArCal v0.3 #

The last jQuery calendar you'll ever need.

This is a work on progress, so right now it's not the last calendar you'll ever need.

Suggestions/Feedback/Pull Requests are appreciated!

To run the specs, clone the repo onto your machine and open specs.html. The code is tested using Jasmine 1.3.1.

My thanks to:

* [The Jasmine team](http://pivotal.github.io/jasmine)
* [Pivotal Labs](http://www.pivotallabs.com)
* Everyone who has ever made a calendar plugin that I've used

## To Do ##

Note: This is NOT a complete list.

* Improve markup generation/customization
  * More information about elements in markup
      * <del>current date class</del>
      * <del>selected date class</del>
      * <del>day of the week and weekend/weekday classes on days</del>
      * data attribute values on months
      * data attribute values on weeks
* Add support for generating markup for years
* Allow for passing of templates
* Add easy event handling
  * <del>Selecting dates one at a time</del>
  * <del>Range select</del>
  * Drag-to-select
  * <del>Unselect</del>
* Add easy calendar control implementation
  * Controls to browse through days/weeks/months/years


## Interface ##

### Markup ###
If you run this:

    $('#my_calendar_container').arCal(); // run on May 3rd, 2013

you get markup that looks like this:

    <div class="ar-cal">
      <div class="month" data-calendar-month="data-calendar-month">
        <div class="week" data-calendar-week="data-calendar-week">
          <div class="day ar-sunday ar-weekend" data-calendar-day="2013-4-28"><span>28</span></div>
          <div class="day ar-monday ar-weekday" data-calendar-day="2013-4-29"><span>29</span></div>
          <div class="day ar-tuesday ar-weekday" data-calendar-day="2013-4-30"><span>30</span></div>
          <div class="day ar-wednesday ar-weekday" data-calendar-day="2013-5-1"><span>1</span></div>
          <div class="day ar-thursday ar-weekday" data-calendar-day="2013-5-2"><span>2</span></div>
          <div class="day ar-friday ar-weekday ar-today" data-calendar-day="2013-5-3"><span>3</span></div>
          <div class="day ar-saturday ar-weekend" data-calendar-day="2013-5-4"><span>4</span></div>
        </div>
        <div class="week" data-calendar-week="data-calendar-week">
          <div class="day ar-sunday ar-weekend" data-calendar-day="2013-5-5"><span>5</span></div>
          <div class="day ar-monday ar-weekday" data-calendar-day="2013-5-6"><span>6</span></div>
          <div class="day ar-tuesday ar-weekday" data-calendar-day="2013-5-7"><span>7</span></div>
          ......
        </div>
      </div>
    </div>

Want something completely different? If you run this:

    $('#my_calendar_container').arCal({
      id: 'arcal_is_cool',
      tag: 'table',
      date: '2/29/2012',
      day: {
        tag: 'td',
        class: 'my-day-class',
        dataSelector: 'data-gimme-a-day'
      },
      week: {
        tag: 'tr',
        class: 'my-week-class',
        dataSelector: 'data-gimme-a-week'
      },
      month: {
        tag: 'tbody',
        class: 'my-month-class',
        dataSelector: 'data-gimme-a-month'
      }
    });

you get markup that looks like this:

    <table class="ar-cal" id="arcal_is_cool">
      <tbody class="my-month-class" data-gimme-a-month="data-gimme-a-month">
        <tr class="my-week-class" data-gimme-a-week="data-gimme-a-week">
          <td class="my-day-class ar-sunday ar-weekend" data-gimme-a-day="2012-1-29"><span>29</span></td>
          <td class="my-day-class ar-monday ar-weekday" data-gimme-a-day="2012-1-30"><span>30</span></td>
          <td class="my-day-class ar-tuesday ar-weekday" data-gimme-a-day="2012-1-31"><span>31</span></td>
          <td class="my-day-class ar-wednesday ar-weekday" data-gimme-a-day="2012-2-1"><span>1</span></td>
          <td class="my-day-class ar-thursday ar-weekday" data-gimme-a-day="2012-2-2"><span>2</span></td>
          <td class="my-day-class ar-friday ar-weekday" data-gimme-a-day="2012-2-3"><span>3</span></td>
          <td class="my-day-class ar-saturday ar-weekend" data-gimme-a-day="2012-2-4"><span>4</span></td>
        </tr>
        <tr class="my-week-class" data-gimme-a-week="data-gimme-a-week">
          <td class="my-day-class ar-sunday ar-weekend" data-gimme-a-day="2012-2-5"><span>5</span></td>
          <td class="my-day-class ar-monday ar-weekday" data-gimme-a-day="2012-2-6"><span>6</span></td>
          <td class="my-day-class ar-tuesday ar-weekday" data-gimme-a-day="2012-2-7"><span>7</span></td>
          ....
        </tr>
      </tbody>
    </table>

Notice that in the second example, I've set the date explicity to February 29, 2012. I've also specified the exact markup I want to render a day, a week, and a month.

If you only want to render a week, you can pass the string 'none' to the month option instead of a hash. If you only want to render a day, you can pass the string 'none' to the week option.

### Events ###

Initializing a calendar to handle selecting a day:

    $('#my_calendar_container').arCal({
      onChange: myDaySelectionCallbackFunction,
      day: {
        selectedClass: 'selected-date'
      }
    });

When a day is clicked, your onChange callback function will be called, with an object of the format { start: STARTDATE, end: ENDDATE }, where STARTDATE and ENDDATE are strings of the days selected (in the format 'YYYY-M-D') as the argument. In the case above, STARTDATE and ENDDATE will both be the same value (unlike in the range case illustrated below). Either a default class of "selected" or the custom selectedClass you pass will be added to the day. Clicking a selected day again will unselect it, and call the callback with STARTDATE and ENDDATE set to null.

Initializing a calendar to handle selecting a range of days:

    $('#my_calendar_container').arCal({
      onChange: myDaySelectionCallbackFunction,
      enableRange: true,
      day: {
        selectedClass: 'selected-date'
      }
    });

The first day you click will act like a single select. The second day you click will then fire your callback and add the "selected" class (or your custom selectedClass) to all the days in the range.