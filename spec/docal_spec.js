describe('DoCal', function() {
	afterEach(function() {
		$('#jasmine_content').html('');
	});

	describe('wiring and set up', function() {
		it('should be a jQuery plugin under .arCal()', function() {
			expect($().arCal).not.toBeUndefined();
		});
	});

	describe('rendering', function() {
		describe('the calendar container', function() {
			it('should append a div with class ar-cal and no id to the element', function() {
				$('#jasmine_content').arCal({
					week: 'none',
					month: 'none'
				});

				expect($('#jasmine_content div.ar-cal').length).toEqual(1);
			});

			it('should render with the id that is passed', function() {
				$('#jasmine_content').arCal({
					id: 'spec_cal',
					week: 'none',
					month: 'none'
				});
				expect($('#jasmine_content #spec_cal').length).toEqual(1);
			});

			it('should render with the correct tag if passed', function() {
				$('#jasmine_content').arCal({
					tag: 'table',
					week: 'none',
					month: 'none'
				});

				expect($('#jasmine_content table.ar-cal').length).toEqual(1);
			});

			it('should render with the correct class if passed', function() {
				$('#jasmine_content').arCal({
					class: 'awesome-ar-cal',
					week: 'none',
					month: 'none'
				});

				expect($('#jasmine_content div.awesome-ar-cal').length).toEqual(1);
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
				expect($renderedDay.data('calendar-day')).toEqual('2012-2-29');
				expect($renderedDay.find('span').text()).toEqual('29');
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

				expect($('#spec_cal label.day').length).toEqual(1);
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

				expect($('#spec_cal div.super-day').length).toEqual(1);
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

				expect($('#spec_cal div[data-a-new-day]').length).toEqual(1);
				expect($('#spec_cal div[data-a-new-day]').data('a-new-day')).toEqual('2012-2-29');
			});
		});

		describe('a week', function() {
			it('should render the week container', function() {
				$('#jasmine_content').arCal({
					id: 'spec_cal',
					date: new Date('2/29/2012'),
					month: 'none'
				});

				expect($('#spec_cal div.week[data-calendar-week]').length).toEqual(1);
			});

			it('should render the correct week', function() {
				$('#jasmine_content').arCal({
					id: 'spec_cal',
					date: new Date('2/29/2012'),
					month: 'none'
				});

				var $renderedWeek = $('#spec_cal div.week').first();
				expect($renderedWeek.find('div.day').length).toEqual(7);
				expect($renderedWeek.find('div.day').first().data('calendar-day')).toEqual('2012-2-26');
				expect($renderedWeek.find('div.day').last().data('calendar-day')).toEqual('2012-3-3');
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

				expect($('#spec_cal span.week').length).toEqual(1);
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

				expect($('#spec_cal div.a-long-week').length).toEqual(1);
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

				expect($('#spec_cal div[data-gimme-my-week]').length).toEqual(1);
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

				expect($('#spec_cal div.month[data-calendar-month]').length).toEqual(1);
				expect($('#spec_cal div.month div.week').length).toEqual(5);
				expect($('#spec_cal div.day').first().data('calendar-day')).toEqual('2012-1-29');
				expect($('#spec_cal div.day').last().data('calendar-day')).toEqual('2012-3-3');
			});

			it('should render with the correct tag if passed', function() {
				$('#jasmine_content').arCal({
					id: 'spec_cal',
					date: new Date('2/29/2012'),
					month: {
						tag: 'tr'
					}
				});

				expect($('#spec_cal tr.month').length).toEqual(1);
			});

			it('should render with the correct class if passed', function() {
				$('#jasmine_content').arCal({
					id: 'spec_cal',
					date: new Date('2/29/2012'),
					month: {
						class: 'a-busy-month'
					}
				});

				expect($('#spec_cal div.a-busy-month').length).toEqual(1);
			});

			it('should render with the correct data attribute with a value of the month', function() {
				$('#jasmine_content').arCal({
					id: 'spec_cal',
					date: new Date('2/29/2012'),
					month: {
						dataSelector: 'data-show-me-a-month'
					}
				});

				expect($('#spec_cal div[data-show-me-a-month]').length).toEqual(1);
				expect($('#spec_cal div[data-show-me-a-month]').data('show-me-a-month')).toEqual(2);
			});
		});
	});

	describe('events', function() {
		describe('selecting a single day', function() {
			it('calls a "selected" callback when a day is clicked', function() {
				var daySelectedSpy = jasmine.createSpy('day selected');
				$('#jasmine_content').arCal({
					selected: daySelectedSpy,
					date: new Date('2/29/2012'),
					day: {
						tag: 'div',
						dataSelector: 'data-day'
					}
				});

				$('#jasmine_content div[data-day="2012-2-1"]').click();

				expect(daySelectedSpy).toHaveBeenCalledWith('2012-2-1');
			});

			it('adds a "selected" class to the day', function() {
				$('#jasmine_content').arCal({
					selected: $.noop,
					date: new Date('2/29/2012'),
					day: {
						tag: 'div',
						dataSelector: 'data-day'
					}
				});

				$('#jasmine_content div[data-day="2012-2-1"]').click();

				expect($('#jasmine_content div[data-day="2012-2-1"]').hasClass('selected')).toEqual(true);
			});

			it('adds a custom class if passed in the day options', function() {
				$('#jasmine_content').arCal({
					selected: $.noop,
					date: new Date('2/29/2012'),
					day: {
						tag: 'div',
						dataSelector: 'data-day',
						selectedClass: 'oh-yeah-day-selected'
					}
				});

				$('#jasmine_content div[data-day="2012-2-1"]').click();

				expect($('#jasmine_content div[data-day="2012-2-1"]').hasClass('oh-yeah-day-selected')).toEqual(true);

			});
		});

		describe('selecting a range', function() {
			it('calls the "selected" callback with a range of dates if "enableRange" is set to true', function() {
				var daySelectedSpy = jasmine.createSpy('day selected');
				$('#jasmine_content').arCal({
					selected: daySelectedSpy,
					enableRange: true,
					date: new Date('2/29/2012'),
					day: {
						tag: 'div',
						dataSelector: 'data-day'
					}
				});

				// simulate selecting a range
				$('#jasmine_content div[data-day="2012-2-1"]').click();

				expect(daySelectedSpy).not.toHaveBeenCalled();

				$('#jasmine_content div[data-day="2012-2-24"]').click();

				expect(daySelectedSpy).toHaveBeenCalledWith({start: '2012-2-1', end: '2012-2-24'});

				daySelectedSpy.reset();

				// simulate selecting another
				$('#jasmine_content div[data-day="2012-2-14"]').click();

				expect(daySelectedSpy).not.toHaveBeenCalled();

				$('#jasmine_content div[data-day="2012-2-29"]').click();

				expect(daySelectedSpy).toHaveBeenCalledWith({start: '2012-2-14', end: '2012-2-29'});
			});

			it('calls the "selected" callback with the range in the correct order', function() {
				var daySelectedSpy = jasmine.createSpy('day selected');
				$('#jasmine_content').arCal({
					selected: daySelectedSpy,
					enableRange: true,
					date: new Date('2/29/2012'),
					day: {
						tag: 'div',
						dataSelector: 'data-day'
					}
				});

				$('#jasmine_content div[data-day="2012-2-24"]').click();

				expect(daySelectedSpy).not.toHaveBeenCalled();

				$('#jasmine_content div[data-day="2012-2-1"]').click();

				expect(daySelectedSpy).toHaveBeenCalledWith({start: '2012-2-1', end: '2012-2-24'});
			});

			it('adds a "selected" class to all days in the range', function() {
				$('#jasmine_content').arCal({
					selected: $.noop,
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

				expect($('#jasmine_content div[data-day="2012-2-1"]').hasClass('selected')).toEqual(true);
				expect($('#jasmine_content div[data-day="2012-2-24"]').hasClass('selected')).toEqual(true);
				expect($('#jasmine_content div.a-day.selected').length).toEqual(24);
			});

			it('adds a custom selected class to all days in the range if passed', function() {
				$('#jasmine_content').arCal({
					selected: $.noop,
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

				expect($('#jasmine_content div[data-day="2012-2-1"]').hasClass('yup-this-day-plz')).toEqual(true);
				expect($('#jasmine_content div[data-day="2012-2-24"]').hasClass('yup-this-day-plz')).toEqual(true);
				expect($('#jasmine_content div.a-day.yup-this-day-plz').length).toEqual(24);
			});

			it('removes the selected class from the old range if a new one is selected', function() {
				$('#jasmine_content').arCal({
					selected: $.noop,
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

				expect($('#jasmine_content div[data-day="2012-2-1"]').hasClass('yup-this-day-plz')).toEqual(true);
				expect($('#jasmine_content div[data-day="2012-2-24"]').hasClass('yup-this-day-plz')).toEqual(true);
				expect($('#jasmine_content div.a-day.yup-this-day-plz').length).toEqual(24);

				$('#jasmine_content div[data-day="2012-2-25"]').click();
				$('#jasmine_content div[data-day="2012-2-29"]').click();

				expect($('#jasmine_content div[data-day="2012-2-1"]').hasClass('yup-this-day-plz')).toEqual(false);
				expect($('#jasmine_content div[data-day="2012-2-24"]').hasClass('yup-this-day-plz')).toEqual(false);

				expect($('#jasmine_content div[data-day="2012-2-25"]').hasClass('yup-this-day-plz')).toEqual(true);
				expect($('#jasmine_content div[data-day="2012-2-29"]').hasClass('yup-this-day-plz')).toEqual(true);

				expect($('#jasmine_content div.a-day.yup-this-day-plz').length).toEqual(5);
			});
		});
	});
});