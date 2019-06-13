import { AuthService } from "./auth.service";


describe("AuthService", () => {

     let authService: AuthService;

     beforeEach(() => {
         authService = new AuthService();
     })

     afterEach(() => {
         authService = null;
         localStorage.removeItem("token");
     })

    // first test case, where isAuthenticated() function returns true, if there is a token
    
    it("should return true from isAuthenticated when there is a token", () => {
        localStorage.setItem("token", "12345");
        expect(authService.isAuthenticated()).toBeTruthy();
    })

    it("sould return false from isAuthenticated when there is no token", () => {
        expect(authService.isAuthenticated()).toBeFalsy();
    })
})