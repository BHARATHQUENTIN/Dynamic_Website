function redirectToLogin() {
    window.location.href = 'login.html';
}

$(document).ready(function () {
    $("#signupForm").submit(function (e) {
        e.preventDefault();
        var formData = $(this).serialize();

        $.ajax({
            type: "POST",
            url: "php/register.php",
            data: formData,
            success: function (response) {
                // Parse the JSON response
                var jsonResponse = JSON.parse(response);

                // Check if the response indicates success
                if (jsonResponse.success) {
                    swal({
                        title: "Signup Completed",
                        text: "Account Created",
                        icon: "success",
                    }).then((value) => {
                        // Redirect to login page only on successful account creation
                        window.location.href = "login.html";
                    });
                } else {
                    // Check for specific error codes and display appropriate messages
                    if (jsonResponse.errorCode === 100) {
                        swal({
                            title: "Error",
                            text: "Passwords do not match",
                            icon: "error",
                        });
                    } else if (jsonResponse.errorCode === 200) {
                        swal({
                            title: "Error",
                            text: "Email already registered",
                            icon: "error",
                        });
                    } else if (jsonResponse.errorCode === 300) {
                        swal({
                            title: "Error",
                            text: "Database error",
                            icon: "error",
                        });
                    } else {
                        // Handle any other unexpected errors
                        swal({
                            title: "Error",
                            text: "Unexpected error",
                            icon: "error",
                        });
                    }
                }
            },
            error: function (xhr, status, error) {
                // Handle AJAX communication error
                swal({
                    title: "Error",
                    text: "Failed to communicate with the server",
                    icon: "error",
                });
            }
        });
    });
});


