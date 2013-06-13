describe('ArCal', function() {
  describe('wiring and set up', function() {
    it('should be a jQuery plugin under .arCal()', function() {
      expect($.fn.arCal).not.toBeUndefined();
    });

    it('return the element from the selector after being called', function() {
      expect($('#jasmine_content').arCal({})).toEqual($('#jasmine_content'));
    });
  });

  describe('rendering', function() {
    describe('the calendar container', function() {
      it('should append a div with class ar-cal and no id to the element', function() {
        $('#jasmine_content').arCal({
          week: 'none',
          month: 'none'
        });

        expect($('#jasmine_content div.ar-cal')).toHaveLength(1);
      });

      it('should render with the id that is passed', function() {
        $('#jasmine_content').arCal({
          id: 'spec_cal',
          week: 'none',
          month: 'none'
        });
        expect($('#jasmine_content #spec_cal')).toHaveLength(1);
      });

      it('should render with the correct tag if passed', function() {
        $('#jasmine_content').arCal({
          tag: 'table',
          week: 'none',
          month: 'none'
        });

        expect($('#jasmine_content table.ar-cal')).toHaveLength(1);
      });

      it('should render with the correct class if passed', function() {
        $('#jasmine_content').arCal({
          class: 'awesome-ar-cal',
          week: 'none',
          month: 'none'
        });

        expect($('#jasmine_content div.awesome-ar-cal')).toHaveLength(1);
      });
    });

    describe('a day', function() {
      it('should render the day container with the day (1-31) inside', function() {
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

      it('should render with the correct tag if passed', function() {
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

      it('should render with the correct class if passed', function() {
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

      it('should render with the correct data attribute with a value of the date', function() {
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

      describe('day description classes', function() {
        it('adds the ar-today class if the day is today', function() {
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

        it('adds the correct day of the week and weekend/weekday classes', function() {
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

    describe('a week', function() {
      it('should render the week container', function() {
        $('#jasmine_content').arCal({
          id: 'spec_cal',
          date: new Date('2/29/2012'),
          month: 'none'
        });

        expect($('#spec_cal div.week[data-calendar-week]')).toHaveLength(1);
      });

      it('should render the correct week', function() {
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

      it('should render with the correct tag if passed', function() {
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

      it('should render with the correct class if passed', function() {
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

      it('should render with the correct data attribute if passed', function() {
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

    describe('a month', function() {
      it('should render the month container', function() {
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

      it('should render with the correct tag if passed', function() {
        $('#jasmine_content').arCal({
          id: 'spec_cal',
          date: new Date('2/29/2012'),
          month: {
            tag: 'tr'
          }
        });

        expect($('#spec_cal tr.month')).toHaveLength(1);
      });

      it('should render with the correct class if passed', function() {
        $('#jasmine_content').arCal({
          id: 'spec_cal',
          date: new Date('2/29/2012'),
          month: {
            class: 'a-busy-month'
          }
        });

        expect($('#spec_cal div.a-busy-month')).toHaveLength(1);
      });

      it('should render with the correct data attribute with a value of the month', function() {
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

  describe('events', function() {
    describe('selecting a single day', function() {
      it('calls the "onChange" callback when a day is clicked', function() {
        var dayOnChangeSpy = jasmine.createSpy('day selected');
        $('#jasmine_content').arCal({
          onChange: dayOnChangeSpy,
          date: new Date('2/29/2012'),
          day: {
            tag: 'div',
            dataSelector: 'data-day'
          }
        });

        $('#jasmine_content div[data-day="2012-2-1"]').click();

        expect(dayOnChangeSpy).toHaveBeenCalledWith({start: '2012-2-1', end: '2012-2-1'});
      });

      it('adds a "selected" class to the day', function() {
        $('#jasmine_content').arCal({
          date: new Date('2/29/2012'),
          day: {
            tag: 'div',
            dataSelector: 'data-day'
          }
        });

        $('#jasmine_content div[data-day="2012-2-1"]').click();

        expect($('#jasmine_content div[data-day="2012-2-1"]')).toHaveClass('selected');
      });

      it('adds a custom class if passed in the day options', function() {
        $('#jasmine_content').arCal({
          date: new Date('2/29/2012'),
          day: {
            tag: 'div',
            dataSelector: 'data-day',
            selectedClass: 'oh-yeah-day-selected'
          }
        });

        $('#jasmine_content div[data-day="2012-2-1"]').click();

        expect($('#jasmine_content div[data-day="2012-2-1"]')).toHaveClass('oh-yeah-day-selected');
      });

      it('removes the selected class if the old selected day is clicked again', function() {
        var dayOnChangeSpy = jasmine.createSpy();
        $('#jasmine_content').arCal({
          onChange: dayOnChangeSpy,
          date: new Date('2/29/2012'),
          day: {
            tag: 'div',
            dataSelector: 'data-day',
            selectedClass: 'oh-yeah-day-selected'
          }
        });

        $('#jasmine_content div[data-day="2012-2-1"]').click();

        expect($('#jasmine_content div[data-day="2012-2-1"]')).toHaveClass('oh-yeah-day-selected');
        expect(dayOnChangeSpy).toHaveBeenCalledWith({start: '2012-2-1', end: '2012-2-1'});

        dayOnChangeSpy.reset();
        $('#jasmine_content div[data-day="2012-2-1"]').click();

        expect($('#jasmine_content div[data-day="2012-2-1"]')).not.toHaveClass('oh-yeah-day-selected');
        expect(dayOnChangeSpy).toHaveBeenCalledWith({start: null, end: null});
      });

      it('adds the selected class to the new day and removes from the old day when selected', function() {
        $('#jasmine_content').arCal({
          date: new Date('2/29/2012'),
          day: {
            tag: 'div',
            dataSelector: 'data-day',
            selectedClass: 'oh-yeah-day-selected'
          }
        });

        $('#jasmine_content div[data-day="2012-2-1"]').click();

        expect($('#jasmine_content div[data-day="2012-2-1"]')).toHaveClass('oh-yeah-day-selected');

        $('#jasmine_content div[data-day="2012-2-20"]').click();

        expect($('#jasmine_content div[data-day="2012-2-1"]')).not.toHaveClass('oh-yeah-day-selected');
        expect($('#jasmine_content div[data-day="2012-2-20"]')).toHaveClass('oh-yeah-day-selected');
      });
    });

    describe('selecting a range', function() {
      it('calls the "onChange" callback with a range of dates if "enableRange" is set to true', function() {
        var dayOnChangeSpy = jasmine.createSpy('day selected');
        $('#jasmine_content').arCal({
          onChange: dayOnChangeSpy,
          enableRange: true,
          date: new Date('2/29/2012'),
          day: {
            tag: 'div',
            dataSelector: 'data-day'
          }
        });

        // simulate selecting a range
        $('#jasmine_content div[data-day="2012-2-1"]').click();

        expect(dayOnChangeSpy).toHaveBeenCalledWith({start: '2012-2-1', end: '2012-2-1'});

        $('#jasmine_content div[data-day="2012-2-24"]').click();

        expect(dayOnChangeSpy).toHaveBeenCalledWith({start: '2012-2-1', end: '2012-2-24'});

        dayOnChangeSpy.reset();

        // simulate selecting another
        $('#jasmine_content div[data-day="2012-2-14"]').click();

        expect(dayOnChangeSpy).toHaveBeenCalledWith({start: '2012-2-14', end: '2012-2-14'});

        $('#jasmine_content div[data-day="2012-2-29"]').click();

        expect(dayOnChangeSpy).toHaveBeenCalledWith({start: '2012-2-14', end: '2012-2-29'});
      });

      it('calls the "onChange" callback with the range in the correct order', function() {
        var dayOnChangeSpy = jasmine.createSpy('day selected');
        $('#jasmine_content').arCal({
          onChange: dayOnChangeSpy,
          enableRange: true,
          date: new Date('2/29/2012'),
          day: {
            tag: 'div',
            dataSelector: 'data-day'
          }
        });

        $('#jasmine_content div[data-day="2012-2-24"]').click();

        expect(dayOnChangeSpy).toHaveBeenCalledWith({start: '2012-2-24', end: '2012-2-24'});

        $('#jasmine_content div[data-day="2012-2-1"]').click();

        expect(dayOnChangeSpy).toHaveBeenCalledWith({start: '2012-2-1', end: '2012-2-24'});
      });

      it('adds a "selected" class to all days in the range', function() {
        $('#jasmine_content').arCal({
          enableRange: true,
          date: new Date('2/29/2012'),
          day: {
            tag: 'div',
            class: 'a-day',
            dataSelector: 'data-day'
          }
        });

        $('#jasmine_content div[data-day="2012-2-24"]').click();
        $('#jasmine_content div[data-day="2012-2-1"]').click();

        expect($('#jasmine_content div[data-day="2012-2-1"]')).toHaveClass('selected');
        expect($('#jasmine_content div[data-day="2012-2-24"]')).toHaveClass('selected');
        expect($('#jasmine_content div.a-day.selected')).toHaveLength(24);
      });

      it('adds a custom selected class to all days in the range if passed', function() {
        $('#jasmine_content').arCal({
          enableRange: true,
          date: new Date('2/29/2012'),
          day: {
            tag: 'div',
            class: 'a-day',
            dataSelector: 'data-day',
            selectedClass: 'yup-this-day-plz'
          }
        });

        $('#jasmine_content div[data-day="2012-2-24"]').click();
        $('#jasmine_content div[data-day="2012-2-1"]').click();

        expect($('#jasmine_content div[data-day="2012-2-1"]')).toHaveClass('yup-this-day-plz');
        expect($('#jasmine_content div[data-day="2012-2-24"]')).toHaveClass('yup-this-day-plz');
        expect($('#jasmine_content div.a-day.yup-this-day-plz')).toHaveLength(24);
      });

      it('removes the selected class from the old range if a new one is selected', function() {
        $('#jasmine_content').arCal({
          enableRange: true,
          date: new Date('2/29/2012'),
          day: {
            tag: 'div',
            class: 'a-day',
            dataSelector: 'data-day',
            selectedClass: 'yup-this-day-plz'
          }
        });

        $('#jasmine_content div[data-day="2012-2-24"]').click();
        $('#jasmine_content div[data-day="2012-2-1"]').click();

        expect($('#jasmine_content div[data-day="2012-2-1"]')).toHaveClass('yup-this-day-plz');
        expect($('#jasmine_content div[data-day="2012-2-24"]')).toHaveClass('yup-this-day-plz');
        expect($('#jasmine_content div.a-day.yup-this-day-plz')).toHaveLength(24);

        $('#jasmine_content div[data-day="2012-2-25"]').click();
        $('#jasmine_content div[data-day="2012-2-29"]').click();

        expect($('#jasmine_content div[data-day="2012-2-1"]')).not.toHaveClass('yup-this-day-plz');
        expect($('#jasmine_content div[data-day="2012-2-24"]')).not.toHaveClass('yup-this-day-plz');

        expect($('#jasmine_content div[data-day="2012-2-25"]')).toHaveClass('yup-this-day-plz');
        expect($('#jasmine_content div[data-day="2012-2-29"]')).toHaveClass('yup-this-day-plz');

        expect($('#jasmine_content div.a-day.yup-this-day-plz')).toHaveLength(5)
      });
    });
  });
});