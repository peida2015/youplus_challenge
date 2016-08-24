"use strict";

(function () {
  document.onreadystatechange = function () {
    if (window.selectors === undefined) {
      window.selectors = {};
    }

    if (document.readyState === "complete") {
      window.selectors.handleSelectField = function (evt) {
        evt.preventDefault();

        var selectedField = evt.target.children[evt.target.selectedIndex];

        if (selectedField.value === "name") {
          // Add name filter to view
          var fieldFilter = $('<div>').addClass('fieldFilter').appendTo('form.filter');
          $('<input>').attr({
            'type': 'checkbox',
            'checked': 'checked'
          }).appendTo(fieldFilter);

          $('<span>'+selectedField.value+'</span>').appendTo(fieldFilter);
          var isOrNot = $('<select>').addClass('is-or-not').appendTo(fieldFilter);
          $('<option>starts with</span>').val('starts with').attr({
            'selected': "selected"
          }).appendTo(isOrNot);

          $('<option>does not start with</option>').val('does not start with').appendTo(isOrNot);

          var lettersField = $('<select>').addClass('letters').appendTo(fieldFilter);
          var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
          for(var i = 0; i < letters.length; i++) {
            var ltr = $('<option>'+letters[i]+'</option>').val(letters[i]).appendTo(lettersField);
            if (i === 0) { ltr.attr('selected', 'selected'); }
          }

          selectedField.disabled=true;
        }

      };

      $('select.fields').change(window.selectors.handleSelectField);


    }
  }
})();
