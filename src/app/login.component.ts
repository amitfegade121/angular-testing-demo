import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from './user';

@Component({
    selector: "login",
    templateUrl: "./login.component.html"
})
export class LoginComponent implements OnInit {

    constructor(private fb: FormBuilder) { }

    @Output() loggedIn = new EventEmitter<User>();

    loginForm: FormGroup;

    ngOnInit() {
        this.loginForm = this.fb.group({
            email: ["", [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
            password: ["", [Validators.required, Validators.minLength(8)]]
        })
    }

    onSubmit() {
        console.log(this.loginForm.value);
        if(this.loginForm.valid) {
            this.loggedIn.emit(
                new User(this.loginForm.value.email, this.loginForm.value.password)
            );
        }
    }
    
}