describe('events', function () {
  describe('selecting a single day', function () {
    it('calls the "onChange" callback when a day is clicked', function () {
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

    it('adds a "selected" class to the day', function () {
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

    it('adds a custom class if passed in the day options', function () {
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

    it('removes the selected class if the old selected day is clicked again', function () {
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

    it('adds the selected class to the new day and removes from the old day when selected', function () {
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

  describe('selecting a range', function () {
    it('calls the "onChange" callback with a range of dates if "enableRange" is set to true', function () {
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

    it('calls the "onChange" callback with the range in the correct order', function () {
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

    it('adds a "selected" class to all days in the range', function () {
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

    it('adds a custom selected class to all days in the range if passed', function () {
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

    it('removes the selected class from the old range if a new one is selected', function () {
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