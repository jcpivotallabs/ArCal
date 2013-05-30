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

			it('should render with the correct data attribute if passed', function() {
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

			it('should render with the correct data attribute if passed', function() {
				$('#jasmine_content').arCal({
					id: 'spec_cal',
					date: new Date('2/29/2012'),
					month: {
						dataSelector: 'data-show-me-a-month'
					}
				});

				expect($('#spec_cal div[data-show-me-a-month]').length).toEqual(1);
			});
		});
	});
});