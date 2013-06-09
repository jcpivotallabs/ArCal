(function ($) {
	var options;
	$.fn.arCal = function(opts) {
		options = opts;
		options = options || {};
		options.date = options.date || new Date();
		options.tag = options.tag || 'div';
		options.class = options.class || 'ar-cal';
		options.enableRange = options.enableRange || false;
		options.onChange = options.onChange || $.noop;

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

		setupCallbacks(this);

		return this;
	};

	function setupCallbacks(ctx) {
		options.day.selectedClass = options.day.selectedClass || 'selected';
		getCalendarDayElements(ctx).on('click', function(e) {
			var selectedValue = getDateFromElement(this);

			if(options.enableRange) {
				handleRangeClick(ctx, this, selectedValue);
			} else {
				handleSingleClick(ctx, this, selectedValue);
			}
		});
	}

	function handleSingleClick(ctx, selectedElement, selectedValue) {
		if (!options.enableRange) {
			var previouslySelectedDay = ctx.find('.' + options.day.selectedClass);
			if (getDateFromElement(previouslySelectedDay) == selectedValue) {
				clearSelectedClassesFromCalendar(ctx);
				fireOnChange(null, null);
				return;
			}
		}

		clearSelectedClassesFromCalendar(ctx);
		$(selectedElement).addClass(options.day.selectedClass);
		fireOnChange(selectedValue, selectedValue);
	}

	function handleRangeClick(ctx, selectedElement, selectedValue) {
		var hiddenInput = ctx.find('input[type=hidden][name="ar-cal-range-selection-temporary-store"]').first();
		if(hiddenInput.length > 0) {
			var rangeSelectedEventObject = fireOnChange(hiddenInput.val(), selectedValue);

			hiddenInput.remove();

			clearSelectedClassesFromCalendar(ctx);

			addSelectedRangeClasses(ctx, rangeSelectedEventObject);
		} else {
			ctx.append('<input type="hidden" value="'+ selectedValue +'" name="ar-cal-range-selection-temporary-store" />');
			handleSingleClick(ctx, selectedElement, selectedValue);
		}
	}

	function fireOnChange(value1, value2) {
		var rangeSelectedEventObject = {};
		if(new Date(value1) > new Date(value2)) {
			rangeSelectedEventObject.start = value2;
			rangeSelectedEventObject.end = value1;
		} else {
			rangeSelectedEventObject.start = value1;
			rangeSelectedEventObject.end = value2;
		}
		options.onChange(rangeSelectedEventObject);

		return rangeSelectedEventObject;
	}

	// TODO clean this up
	function addSelectedRangeClasses(ctx, rangeSelectedEventObject) {
		var elements = getCalendarDayElements(ctx);
		var start = 0;
		var end = elements.length;
		var endFound = false;
		var pos = 0;
		while(!endFound) {
			var element = elements[pos];
			if($(element).attr(options.day.dataSelector) == rangeSelectedEventObject.start) {
				start = pos;
			} else if($(element).attr(options.day.dataSelector) == rangeSelectedEventObject.end) {
				end = pos;
				endFound = true;
			}
			pos++;
		}

		for(var i = start; i <= end; i++) {
			$(elements[i]).addClass(options.day.selectedClass);
		}
	}

	function getMonth(date) {
		options.month.tag = options.month.tag || 'div';
		options.month.class = options.month.class || 'month';
		options.month.dataSelector = options.month.dataSelector || 'data-calendar-month';

		var $monthEl = createElement(options.month.tag, options.month.class, options.month.dataSelector);
		$monthEl.attr(options.month.dataSelector, date.getMonth() + 1);
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
		$dayEl.addClass(getDayOfWeekClasses(date));

		if(formatDateData(date) == formatDateData(new Date())) {
			$dayEl.addClass('ar-today');
		}

		$dayEl.append('<span>'+ date.getDate() +'</span>');
		return $dayEl;
	}

	function createElement(tag, className, dataSelector) {
		var $element = $('<'+ tag +'>');
		$element.addClass(className);

		if(dataSelector) {
			$element.attr(dataSelector, dataSelector);
		}

		return $element;
	}

	function getDayOfWeekClasses(date) {
		switch(date.getDay()) {
			case 0: return 'ar-sunday ar-weekend';
			case 1: return 'ar-monday ar-weekday';
			case 2: return 'ar-tuesday ar-weekday';
			case 3: return 'ar-wednesday ar-weekday';
			case 4: return 'ar-thursday ar-weekday';
			case 5: return 'ar-friday ar-weekday';
			case 6: return 'ar-saturday ar-weekend';
		}
		return '';
	}

	function formatDateData(date) {
		return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-');
	}

	function getCalendarDayElements(ctx) {
		return ctx.find(options.day.tag + '.' + options.day.class + '[' + options.day.dataSelector + ']');
	}

	function clearSelectedClassesFromCalendar(ctx) {
		getCalendarDayElements(ctx).removeClass(options.day.selectedClass);
	}

	function getDateFromElement(element) {
		return $(element).data(options.day.dataSelector.replace('data-', ''));
	}
}(jQuery));