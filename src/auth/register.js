import { AuthService } from 'aurelia-authentication';
import { inject } from 'aurelia-framework';

@inject(AuthService)
export class Register {
	username;
	email;
	password;

	constructor(authService) {
		this.authService = authService;
	}

	submit() {
		debugger;
		var postData = {
			Username: this.username,
			Email: this.email,
			Password: this.password
		};

		this.authService.signup(postData)
			.then(response => {
				debugger;
				console.log(response);
			})
			.catch(err => {
				debugger;
				err.text().then( errorMessage => {
					console.log(errorMessage);
				  })
			});
	}
}