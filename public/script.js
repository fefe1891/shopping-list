$(document).ready(function() {
    $.get('/items', function(data) {
        console.log(data);
    });
    // Creating an item.
    $('#new-item-form').on('submit', function(e) {
        e.preventDefault();
        let newItem = { name: $('#new-item-input').val() }; // Get input value from user

        $.post('/items', newItem, function(data) {
            console.log(data);
        }).done(function(data) {
            // Clear the input field after successful POST request
            $('#new-item-input').val('');
        });
    });
});