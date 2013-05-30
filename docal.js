(function ($) {
	var options;
	$.fn.arCal = function(opts) {
		options = opts;
		options = options || {};
		options.date = options.date || new Date();
		options.tag = options.tag || 'div';
		options.class = options.class || 'ar-cal';

		var $arCalEl = createElement(options.tag, options.class);

		if(options.id) {
			$arCalEl.attr('id', options.id);
		}

		var $generatedHTML;
		if(options.week === 'none') {
			options.day = options.day || {};

			$generatedHTML = getDay(options.date)
		} else if (options.month === 'none') {
			options.day = options.day || {};
			options.week = options.week || {};

			$generatedHTML = getWeek(options.date);
		} else {
			options.day = options.day || {};
			options.week = options.week || {};
			options.month = options.month || {};

			$generatedHTML = getMonth(options.date);
		}

		$arCalEl.append($generatedHTML);
		this.append($arCalEl);
	};

	function createElement(tag, className, dataSelector) {
		var $element = $('<'+ tag +'>');
		$element.addClass(className);

		if(dataSelector) {
			$element.attr(dataSelector, dataSelector);
		}

		return $element;
	}

	function getMonth(date) {
		options.month.tag = options.month.tag || 'div';
		options.month.class = options.month.class || 'month';
		options.month.dataSelector = options.month.dataSelector || 'data-calendar-month';

		var $monthEl = createElement(options.month.tag, options.month.class, options.month.dataSelector);
		$monthEl.append(getWeeks(date));
		return $monthEl;
	}

	function getWeeks(monthDate) {
		var elements = $();
		var date = new Date(monthDate);
		date.setDate(1);

		var currentMonth = date.getMonth();
		while(date.getMonth() == currentMonth) {
			elements = elements.add(getWeek(date));
			date.setDate(date.getDate() + 7);
		}

		return elements;
	}

	function getWeek(date) {
		options.week.tag = options.week.tag || 'div';
		options.week.class = options.week.class || 'week';
		options.week.dataSelector = options.week.dataSelector || 'data-calendar-week';

		var $weekEl = createElement(options.week.tag, options.week.class, options.week.dataSelector);
		$weekEl.append(getDays(date));
		return $weekEl;
	}

	function getDays(weekDate) {
		var elements = $();
		var date = new Date(weekDate);
		while(date.getDay() != 0) {
			date.setDate(date.getDate() - 1);
		}

		for(var i = 0; i < 7; i++) {
			elements = elements.add(getDay(date));
			date.setDate(date.getDate() + 1);
		}

		return elements;
	}

	function getDay(date) {
		options.day.tag = options.day.tag || 'div';
		options.day.class = options.day.class || 'day';
		options.day.dataSelector = options.day.dataSelector || 'data-calendar-day';

		var $dayEl = createElement(options.day.tag, options.day.class, options.day.dataSelector);

		$dayEl.attr(options.day.dataSelector, formatDateData(date));
		$dayEl.append('<span>'+ date.getDate() +'</span>')
		return $dayEl;
	}

	function formatDateData(date) {
		return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-');
	}
}(jQuery));