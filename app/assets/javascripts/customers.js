"use strict";

$(document).on("turbolinks:load", function () {
  if (window.selectors === undefined) {
    window.selectors = {};
  }

  window.selectors.handleSelectField = function (evt) {
    evt.preventDefault();

    var selectedField = evt.target.children[evt.target.selectedIndex];

    if (selectedField.value === "name") {
      // Add name filter to view
      var fieldFilter = $('<div>').addClass('fieldFilter').appendTo('div.filter');
      $('<input>').addClass('fieldSelectedBox').attr({
        'type': 'checkbox',
        'checked': 'checked',
        'name': selectedField.value
      }).appendTo(fieldFilter);

      $('<span>'+selectedField.value+'</span>').appendTo(fieldFilter);
      var isOrNot = $('<select>').addClass('is-or-not').appendTo(fieldFilter);
      $('<option>starts</span>').val('true').attr({
        'selected': "selected"
      }).appendTo(isOrNot);

      $('<option>does not start</option>').val('false').appendTo(isOrNot);

      $('<span>with</span>').appendTo(fieldFilter);

      var lettersField = $('<select>').addClass('letters').appendTo(fieldFilter);
      var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      for(var i = 0; i < letters.length; i++) {
        var ltr = $('<option>'+letters[i]+'</option>').val(letters[i]).appendTo(lettersField);
        if (i === 0) { ltr.attr('selected', 'selected'); }
      }
    } else if (selectedField.value === "age") {
        // Add age filter to view.
        var fieldFilter = $('<div>').addClass('fieldFilter').appendTo('div.filter');
        $('<input>').addClass('fieldSelectedBox').attr({
          'type': 'checkbox',
          'checked': 'checked',
          'name': selectedField.value
        }).appendTo(fieldFilter);

        $('<span>'+selectedField.value+'</span>').appendTo(fieldFilter);
        var isOrNot = $('<select>').addClass('is-or-not').appendTo(fieldFilter);
        $('<option>is</span>').val('true').attr({
          'selected': "selected"
        }).appendTo(isOrNot);

        $('<option>is not</option>').val('false').appendTo(isOrNot);
        $('<span>between</span>').appendTo(fieldFilter);

        var ageRange = $('<select>').addClass('letters').appendTo(fieldFilter);

        for(var i = 0; i < 10; i++) {
          var ltr = $('<option>'+(i*10)+' to '+(i*10+10-1)+'</option>').val(i).appendTo(ageRange);
          if (i === 0) { ltr.attr('selected', 'selected'); };
        }
    };

    // Remove change listeners from all select fields first and attach again.
    $('.fieldFilter select').off("change");
    $('.fieldFilter select').change(window.selectors.handleSubmit);
    selectedField.disabled=true;
    $('.fieldSelectedBox').off("change");
    $('.fieldSelectedBox').change(window.selectors.handleSubmit);

  };

  $('select.fields').change(window.selectors.handleSelectField);

  window.selectors.updateTable = function (data) {
    console.log('updateTable');
    var parser = new DOMParser();
    var htmlDoc = parser.parseFromString(data, "text/html")
    $('tbody').replaceWith($(htmlDoc).find('tbody'))
  };

  window.selectors.handleSubmit = function (evt) {
    evt.preventDefault();
    var data = {};
    var form = $('.fieldFilter');
    // Aggregate data
    for (var j = 0; j < form.length; j++) {
      // Add to query data only if box is checked.
      var field = form[j].children;
      if (field[0].checked) {
        var fieldName = field[0].name;
        data[fieldName] = {};
        data[fieldName]["pos"] = field[2].value;
        data[fieldName]["value"] = field[4].value;
      }
    }

    $.get('./customers', data, window.selectors.updateTable);

  };
  $('.fieldSelectedBox').change(window.selectors.handleSubmit);
  $('.fieldFilter select').change(window.selectors.handleSubmit);

});
