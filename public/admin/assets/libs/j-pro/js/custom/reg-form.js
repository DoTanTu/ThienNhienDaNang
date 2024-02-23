$(document).ready(function(){
			// Validation
			$( "#j-pro" ).justFormsPro({
				rules: {
					name: {
						required: true
					},
					email: {
						required: true,
						email: true
					},
					password: {
						required: true
					},
					passwordConfirm: {
						equalTo : "#password"
					}
				},
				messages: {
					name: {
						required: "Add your name"
					},
					email: {
						required: "Add your email",
						email: "Incorrect email format"
					},
					password: {
						required: "Add your password"
					},
					passwordConfirm: {
						required: "Password not compare"
					}
				}
			});
		});