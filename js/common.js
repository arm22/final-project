"use strict";

Parse.initialize('BMb15tkaXZoMUpEfRNzx943OH771Wt7qHRRxO2Mo', 'rc1EtAbdIgJ4wENH9BkxWuYwb8Btb4i8fAilfSgY');

function showError(err) {
    $('.error-message').html(err.message).fadeIn();
}

function clearError() {
    $('.error-message').fadeOut().empty();
}
