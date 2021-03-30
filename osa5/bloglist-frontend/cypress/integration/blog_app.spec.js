describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      cy.visit('http://localhost:3000')
    })
  
    it('Login form is shown', function() {
        cy.contains('username')
        cy.contains('password')
        cy.contains('login')
    })

    describe('Login',function() {
        it('succeeds with correct credentials', function() {
            cy.get('#username').type('paavo')
            cy.get('#password').type('squarepants')
            cy.get('#submit').click()
        
            cy.contains('Logged in as Paavo M. Pesusieni')
        })
    
        it('fails with wrong credentials', function() {
            cy.get('#username').type('wronguser')
            cy.get('#password').type('wrongpass')
            cy.get('#submit').click()
        
            cy.contains('Incorrect password!')
        })
    })

    describe('When logged in', function() {
        beforeEach(function() {
            cy.get('#username').type('paavo')
            cy.get('#password').type('squarepants')
            cy.get('#submit').click()
        
            cy.contains('Logged in as Paavo M. Pesusieni')
        })
    
        it('A blog can be created', function() {
            cy.contains('Add new blog').click()
            cy.get('#author').type('Mikko Mallikas')
            cy.get('#title').type('Paavon muistelmat')
            cy.get('#url').type('http://mikko.blogit.fi/paavo_muistelee/')
            cy.get('#submit').click()
            cy.contains('Blog added!')
            cy.contains('Paavon muistelmat by Mikko Mallikas')
        })

        it('A blog can be liked', function() {
            cy.contains('show').click()
            cy.contains('4 likes')
            cy.contains('like').click()
            cy.contains('5 likes')
        })

        it('A blog can not be deleted', function() {
            cy.contains('show').click()
            cy.contains('4 likes')
            cy.contains('remove').click()
            cy.contains('Blog was not removed: Error: Request failed with status code 401')
        })

        it('A blog can be created and then deleted', function() {
            cy.contains('Add new blog').click()
            cy.get('#author').type('Mikko Mallikas')
            cy.get('#title').type('Paavon muistelmat')
            cy.get('#url').type('http://mikko.blogit.fi/paavo_muistelee/')
            cy.get('#submit').click()
            cy.contains('Blog added!')
            cy.contains('Paavon muistelmat by Mikko Mallikas')
            cy.get('button.showblog:last').click()
            cy.contains('remove').click()
            cy.contains('Blog removed!')
        })

        it('Bloglist is sorted by likes', function() {
            cy.contains('Add new blog').click()
            cy.get('#author').type('Mikko Mallikas')
            cy.get('#title').type('Paavon muistelmat')
            cy.get('#url').type('http://mikko.blogit.fi/paavo_muistelee/')
            cy.get('#submit').click()
            cy.contains('Blog added!')
            cy.contains('Paavon muistelmat by Mikko Mallikas')
            cy.get('button.showblog:last').click()
            cy.contains('0 likes')
            cy.contains('like').click()
            cy.contains('1 likes')
            cy.contains('like').click()
            cy.contains('2 likes')
            cy.contains('like').click()
            cy.contains('3 likes')
            cy.contains('like').click()
            cy.contains('4 likes')
            cy.contains('like').click()
            cy.contains('5 likes')
            cy.contains('like').click()
            cy.contains('hide').click()
            cy.get('div.blogSummary:first').contains('Paavon muistelmat by Mikko Mallikas')
            cy.get('div.blogSummary:last').contains('One Blog Already Here')
        })
    })
  })