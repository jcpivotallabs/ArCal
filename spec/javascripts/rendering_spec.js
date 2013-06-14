describe('rendering', function () {
  describe('the calendar container', function () {
    it('should append a div with class ar-cal and no id to the element', function () {
      $('#jasmine_content').arCal({
        week: 'none',
        month: 'none'
      });

      expect($('#jasmine_content div.ar-cal')).toHaveLength(1);
    });

    it('should render with the id that is passed', function () {
      $('#jasmine_content').arCal({
        id: 'spec_cal',
        week: 'none',
        month: 'none'
      });
      expect($('#jasmine_content #spec_cal')).toHaveLength(1);
    });

    it('should render with the correct tag if passed', function () {
      $('#jasmine_content').arCal({
        tag: 'table',
        week: 'none',
        month: 'none'
      });

      expect($('#jasmine_content table.ar-cal')).toHaveLength(1);
    });

    it('should render with the correct class if passed', function () {
      $('#jasmine_content').arCal({
        class: 'awesome-ar-cal',
        week: 'none',
        month: 'none'
      });

      expect($('#jasmine_content div.awesome-ar-cal')).toHaveLength(1);
    });
  });

  describe('a day', function () {
    it('should render the day container with the day (1-31) inside', function () {
      $('#jasmine_content').arCal({
        id: 'spec_cal',
        date: new Date('2/29/2012'),
        day: {},
        week: 'none',
        month: 'none'
      });

      var $renderedDay = $($('#spec_cal div.day[data-calendar-day]')[0]);
      expect($renderedDay).toHaveData('calendar-day', '2012-2-29');
      expect($renderedDay.find('span')).toHaveText('29');
    });

    it('should render with the correct tag if passed', function () {
      $('#jasmine_content').arCal({
        id: 'spec_cal',
        date: new Date('2/29/2012'),
        day: {
          tag: 'label'
        },
        week: 'none',
        month: 'none'
      });

      expect($('#spec_cal label.day')).toHaveLength(1);
    });

    it('should render with the correct class if passed', function () {
      $('#jasmine_content').arCal({
        id: 'spec_cal',
        date: new Date('2/29/2012'),
        day: {
          class: 'super-day'
        },
        week: 'none',
        month: 'none'
      });

      expect($('#spec_cal div.super-day')).toHaveLength(1);
    });

    it('should render with the correct data attribute with a value of the date', function () {
      $('#jasmine_content').arCal({
        id: 'spec_cal',
        date: new Date('2/29/2012'),
        day: {
          dataSelector: 'data-a-new-day'
        },
        week: 'none',
        month: 'none'
      });

      expect($('#spec_cal div[data-a-new-day]')).toHaveLength(1);
      expect($('#spec_cal div[data-a-new-day]')).toHaveData('a-new-day', '2012-2-29');
    });

    describe('day description classes', function () {
      it('adds the ar-today class if the day is today', function () {
        $('#jasmine_content').arCal({
          id: 'spec_cal',
          day: {
            class: 'super-day'
          },
          week: 'none',
          month: 'none'
        });

        expect($('#jasmine_content div.super-day')).toHaveClass('ar-today');
      });

      it('adds the correct day of the week and weekend/weekday classes', function () {
        $('#jasmine_content').arCal({
          id: 'spec_cal',
          date: new Date('2/26/2012'),
          day: {
            dataSelector: 'data-a-new-day'
          },
          week: 'none',
          month: 'none'
        });

        expect($('#spec_cal div[data-a-new-day].ar-sunday.ar-weekend')).toHaveLength(1);
        expect($('#spec_cal div[data-a-new-day].ar-sunday.ar-weekend')).toHaveData('a-new-day', '2012-2-26');

        $('#jasmine_content').arCal({
          id: 'spec_cal',
          date: new Date('2/27/2012'),
          day: {
            dataSelector: 'data-a-new-day'
          },
          week: 'none',
          month: 'none'
        });

        expect($('#spec_cal div[data-a-new-day].ar-monday.ar-weekday')).toHaveLength(1);
        expect($('#spec_cal div[data-a-new-day].ar-monday.ar-weekday')).toHaveData('a-new-day', '2012-2-27');

        $('#jasmine_content').arCal({
          id: 'spec_cal',
          date: new Date('2/28/2012'),
          day: {
            dataSelector: 'data-a-new-day'
          },
          week: 'none',
          month: 'none'
        });

        expect($('#spec_cal div[data-a-new-day].ar-tuesday.ar-weekday')).toHaveLength(1);
        expect($('#spec_cal div[data-a-new-day].ar-tuesday.ar-weekday')).toHaveData('a-new-day', '2012-2-28');

        $('#jasmine_content').arCal({
          id: 'spec_cal',
          date: new Date('2/29/2012'),
          day: {
            dataSelector: 'data-a-new-day'
          },
          week: 'none',
          month: 'none'
        });

        expect($('#spec_cal div[data-a-new-day].ar-wednesday.ar-weekday')).toHaveLength(1);
        expect($('#spec_cal div[data-a-new-day].ar-wednesday.ar-weekday')).toHaveData('a-new-day', '2012-2-29');

        $('#jasmine_content').arCal({
          id: 'spec_cal',
          date: new Date('3/1/2012'),
          day: {
            dataSelector: 'data-a-new-day'
          },
          week: 'none',
          month: 'none'
        });

        expect($('#spec_cal div[data-a-new-day].ar-thursday.ar-weekday')).toHaveLength(1);
        expect($('#spec_cal div[data-a-new-day].ar-thursday.ar-weekday')).toHaveData('a-new-day', '2012-3-1');

        $('#jasmine_content').arCal({
          id: 'spec_cal',
          date: new Date('3/2/2012'),
          day: {
            dataSelector: 'data-a-new-day'
          },
          week: 'none',
          month: 'none'
        });

        expect($('#spec_cal div[data-a-new-day].ar-friday.ar-weekday')).toHaveLength(1);
        expect($('#spec_cal div[data-a-new-day].ar-friday.ar-weekday')).toHaveData('a-new-day', '2012-3-2');

        $('#jasmine_content').arCal({
          id: 'spec_cal',
          date: new Date('3/3/2012'),
          day: {
            dataSelector: 'data-a-new-day'
          },
          week: 'none',
          month: 'none'
        });

        expect($('#spec_cal div[data-a-new-day].ar-saturday.ar-weekend')).toHaveLength(1);
        expect($('#spec_cal div[data-a-new-day].ar-saturday.ar-weekend')).toHaveData('a-new-day', '2012-3-3');
      });
    });
  });

  describe('a week', function () {
    it('should render the week container', function () {
      $('#jasmine_content').arCal({
        id: 'spec_cal',
        date: new Date('2/29/2012'),
        month: 'none'
      });

      expect($('#spec_cal div.week[data-calendar-week]')).toHaveLength(1);
    });

    it('should render the correct week', function () {
      $('#jasmine_content').arCal({
        id: 'spec_cal',
        date: new Date('2/29/2012'),
        month: 'none'
      });

      var $renderedWeek = $('#spec_cal div.week').first();
      expect($renderedWeek.find('div.day')).toHaveLength(7);
      expect($renderedWeek.find('div.day').first()).toHaveData('calendar-day', '2012-2-26');
      expect($renderedWeek.find('div.day').last()).toHaveData('calendar-day', '2012-3-3');
    });

    it('should render with the correct tag if passed', function () {
      $('#jasmine_content').arCal({
        id: 'spec_cal',
        date: new Date('2/29/2012'),
        week: {
          tag: 'span'
        },
        month: 'none'
      });

      expect($('#spec_cal span.week')).toHaveLength(1);
    });

    it('should render with the correct class if passed', function () {
      $('#jasmine_content').arCal({
        id: 'spec_cal',
        date: new Date('2/29/2012'),
        week: {
          class: 'a-long-week'
        },
        month: 'none'
      });

      expect($('#spec_cal div.a-long-week')).toHaveLength(1);
    });

    it('should render with the correct data attribute if passed', function () {
      $('#jasmine_content').arCal({
        id: 'spec_cal',
        date: new Date('2/29/2012'),
        week: {
          dataSelector: 'data-gimme-my-week'
        },
        month: 'none'
      });

      expect($('#spec_cal div[data-gimme-my-week]')).toHaveLength(1);
    });
  });

  describe('a month', function () {
    it('should render the month container', function () {
      $('#jasmine_content').arCal({
        id: 'spec_cal',
        date: new Date('2/29/2012'),
        month: {
          tag: 'div',
          class: 'month',
          dataSelector: 'data-calendar-month'
        }
      });

      expect($('#spec_cal div.month[data-calendar-month]')).toHaveLength(1);
      expect($('#spec_cal div.month div.week')).toHaveLength(5);
      expect($('#spec_cal div.day').first()).toHaveData('calendar-day', '2012-1-29');
      expect($('#spec_cal div.day').last()).toHaveData('calendar-day', '2012-3-3');
    });

    it('should render with the correct tag if passed', function () {
      $('#jasmine_content').arCal({
        id: 'spec_cal',
        date: new Date('2/29/2012'),
        month: {
          tag: 'tr'
        }
      });

      expect($('#spec_cal tr.month')).toHaveLength(1);
    });

    it('should render with the correct class if passed', function () {
      $('#jasmine_content').arCal({
        id: 'spec_cal',
        date: new Date('2/29/2012'),
        month: {
          class: 'a-busy-month'
        }
      });

      expect($('#spec_cal div.a-busy-month')).toHaveLength(1);
    });

    it('should render with the correct data attribute with a value of the month', function () {
      $('#jasmine_content').arCal({
        id: 'spec_cal',
        date: new Date('2/29/2012'),
        month: {
          dataSelector: 'data-show-me-a-month'
        }
      });

      expect($('#spec_cal div[data-show-me-a-month]')).toHaveLength(1);
      expect($('#spec_cal div[data-show-me-a-month]')).toHaveData('show-me-a-month', 2);
    });
  });
});