describe('Login Page Test Cases', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/');
    });

    it('Visit login page', ()=> {
        cy.title().should('eq', 'React Gallery');
        cy.contains('Hello Again');
    });

    it('Contain Email and Password Input, and Login button', () => {
        //check email
        const email = cy.get("input[name='email']");
        email.should("be.visible");
        email.should("have.attr", "type", "email");
        email.should("have.attr", "placeholder", "Email Address");

        //check password
        const password = cy.get("input[name='password']");
        password.should("be.visible");
        password.should("have.attr", "type", "password");
        password.should("have.attr", "placeholder", "Password");

        //check button, rgb value should have space between value
        const button = cy.get("button");
        button.should("be.visible");
        button.should("contain", "Login");
        button.should("have.css", "background-color", "rgb(79, 70, 229)");
        button.should("have.css", "color", "rgb(255, 255, 255)");
    });

    it('Do login with null values', () => {
        const button = cy.get("button");
        button.click();
        cy.on('window:alert', (text) => {
            expect(text).to.contains('login failed');
        });
    });

    it('Do login with wrong values', () => {
        const email = cy.get("input[name='email']");
        email.type('wrong@gmail.com');

        const password = cy.get("input[name='password']");
        password.type('12345678');

        const button = cy.get("button");
        button.click();

        cy.on('window:alert', (text) => {
            expect(text).to.contains('login failed');
        });
    });

    it('Do login with correct values', () => {
        const email = cy.get("input[name='email']");
        email.type('user@react.test');

        const password = cy.get("input[name='password']");
        password.type('password');

        const button = cy.get("button");
        button.click();

        cy.on('window:alert', (text) => {
            expect(text).to.contains('welcome');
        });

        cy.url().should('eq', 'http://localhost:3000/dashboard');
    });
});