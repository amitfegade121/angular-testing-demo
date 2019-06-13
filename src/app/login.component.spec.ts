import { LoginComponent } from "./login.component";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { User } from './user';


describe("LoginComponent", () => {

    let loginComponent: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    // In this function, for ourTest suite, we configure a testing module using TestBed
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ LoginComponent ],
            imports: [ ReactiveFormsModule, FormsModule ]
        })

        // create component and test fixture
        fixture = TestBed.createComponent(LoginComponent);

        loginComponent = fixture.componentInstance;
        loginComponent.ngOnInit(); // Angular will not call this function for us. We have to manually call it.
    })

    it("form invalid when empty", () => {
        expect(loginComponent.loginForm.valid).toBeFalsy();
    })

    // Field Validity test spec

    it("email field validity", () => {
        let email = loginComponent.loginForm.controls.email;
        let errors = {};
        expect(email.valid).toBeFalsy();
        errors = email.errors || {};
        expect(errors["required"]).toBeTruthy();
        
        email.setValue("alex");
        errors = email.errors || {};
        expect(errors["pattern"]).toBeTruthy();
        expect(errors["required"]).toBeFalsy();
        
        email.setValue("alex@gmail.com");
        errors = email.errors || {};
        expect(email.valid).toBeTruthy();
        expect(errors["required"]).toBeFalsy();
        expect(errors["pattern"]).toBeFalsy();
    })

    it("password field validity", () => {
        let errors = {};
        let password = loginComponent.loginForm.controls.password;

        errors = password.errors || {};
        expect(errors["required"]).toBeTruthy();

        password.setValue("12345");
        errors = password.errors || {};
        expect(errors["required"]).toBeFalsy();
        expect(errors["minlength"]).toBeTruthy();

        password.setValue("123456789");
        errors = password.errors || {};
        expect(errors["required"]).toBeFalsy();
        expect(errors["minlength"]).toBeFalsy();

    })

    it("submitting a form emits an user", () => {

        expect(loginComponent.loginForm.valid).toBeFalsy();
        loginComponent.loginForm.controls.email.setValue("abc@gmail.com");
        loginComponent.loginForm.controls.password.setValue("123456789");
        expect(loginComponent.loginForm.valid).toBeTruthy();

        let user: User;

        // Subscribe to the Observable and store user in a local variable
        loginComponent.loggedIn.subscribe((value) => {
            user = value;
        })

        // call onSubmit() function
        loginComponent.onSubmit();

        // now check emitted user object
        expect(user.email).toBe("abc@gmail.com");
        expect(user.password).toBe("123456789");

    })

})