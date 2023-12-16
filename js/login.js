function redirectToRegister() {
    window.location.href = 'register.html';
}

$(document).ready(function () {
    $("#loginForm").submit(function (e) {
        e.preventDefault();
        console.log("Form Submitted");
  
        var formData = $(this).serialize();
        console.log("Form Data:", formData);

        $.ajax({
            type: "POST",
            url: "php/login.php",
            data: formData,
            dataType: "json",
            success: function (response) {
                console.log("AJAX Success:", response);

                if (response && response.id) {
                    console.log("Login successful! User ID: " + response.id);

                    
                    swal({
                        title: "Login Successful!",
                        text: "You are now logged in.",
                        icon: "success",
                    }).then((value) => {     //Promise method 
                         
                        window.location.href = "profile.html";
                    });
                } else if (response && response.hasOwnProperty('error')) {
                  
                   
                    swal({
                        title: "Login Failed!",
                        text: "Warning message: " + response.error,
                        icon: "warning",
                    });
                } else {
                    console.error("Unexpected response format or missing properties");
                }
            },

            error: function (xhr, status, error) {
                swal({
                    title: "Login Failed!",
                    text: " Wrong email or password",
                    icon: "error",
                });
            }
        });
    });
});
