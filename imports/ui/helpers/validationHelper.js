troponinRequirements = {
  required: true,
  digits: true,
  min: 0,
  max: 50000,
}

$.validator.setDefaults({
  errorElement: "span",
  errorClass: "help-block",
  highlight: function(element) {
      $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
  },
  unhighlight: function(element) {
      $(element).closest('.form-group').removeClass('has-error').addClass('has-success');
  },
  errorPlacement: function (error, element) {
    if (element.parent('.input-group').length || element.prop('type') === 'checkbox' || element.prop('type') === 'radio') {
      error.insertAfter(element.parent().parent());
    } else if (element.parent().parent('.signup-panel').length) {
      error.insertAfter(element);
    }
    else {
      error.insertAfter(element.parent());
    }
  },
  rules: {
    baselineTroponin: troponinRequirements,
    threeHourTroponin: troponinRequirements,
    sixHourTroponin: troponinRequirements,
    gender: {
      required: true,
    },
    painDuration: {
      required: true,
    },
    patientAge: {
      required: true,
    },
    ecgIschaemia: {
      required: true,
    }
  },
  messages: {
    baselineTroponin: {
      required: "Please enter a baseline troponin",
      // minlength: "Use at least 10 characters, please.",
      // bookUnique: "This book already exists!"
    },
    gender: {
      required: "Please enter the patient's gender"
    },
  },
});
