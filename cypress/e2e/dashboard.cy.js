describe("Dashboard Page Test Cases", () => {

    it('Do login with correct values', () => {
        cy.visit('http://localhost:3000/');

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

    it('Found no photos for the first time', () => {
        cy.contains('Found 0 photos');
    });

    it('Contains image url and description input, and publish button', () => {

        const image = cy.get("input[name='image']");
        image.should("be.visible");
        image.should("have.attr", "type", "url");
        image.should("have.attr", "required", "required");
        image.should("have.attr", "placeholder", "Image URL");

        const description = cy.get("input[name='desc']");
        description.should("be.visible");
        description.should("have.attr", "type", "text");
        description.should("have.attr", "required", "required");
        description.should("have.attr", "placeholder", "What's on your mind?");

        const button = cy.get("button");
        button.should("be.visible");
        button.contains('Publish!');
        button.should("have.css", "background-color", "rgb(79, 70, 229)");
        button.should("have.css", "color", "rgb(255, 255, 255)");
    });

    it('Upload some photos', () => {
        const photos = [
            {
                imageValue: 'https://images.unsplash.com/photo-1709884735626-63e92727d8b6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZnJlZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D',
                descriptionValue: 'Image 1: Resto',
            },
            {
                imageValue: 'https://images.unsplash.com/photo-1544894079-e81a9eb1da8b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZnJlZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D',
                descriptionValue: 'Image 2: Sea France',
            },
        ];

        photos.forEach(({imageValue, descriptionValue}) => {
            const image = cy.get("input[name='image']");
            image.type(imageValue);

            const desc = cy.get("input[name='desc']");
            desc.type(descriptionValue);

            const button = cy.get('button');
            button.click();

            //check uploaded image is exist
            cy.get('img').should('have.attr', 'src', imageValue);
            cy.contains(descriptionValue);
        });

        cy.contains(`Found ${photos.length} photos`);
    });
});