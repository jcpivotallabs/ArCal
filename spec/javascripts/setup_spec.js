describe('setup', function () {
  it('should be a jQuery plugin under .arCal()', function () {
    expect($.fn.arCal).not.toBeUndefined();
  });

  it('return the element from the selector after being called', function () {
    expect($('#jasmine_content').arCal({})).toEqual($('#jasmine_content'));
  });
});