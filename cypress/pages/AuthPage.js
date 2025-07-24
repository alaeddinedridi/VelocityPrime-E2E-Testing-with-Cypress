export class AuthPage { 

    enterEmail=(email)=>{
        cy.getByData("email").clear()

        if (email.length == 0){
            cy.getByData("email").focus().blur()
        }else{
            cy.getByData("email").type(email)
        }
    }

    enterPassword=(password)=>{
        cy.getByData("password").clear()
        
        if (password.length == 0){
            cy.getByData("password").focus().blur()
        }else{
            cy.getByData("password").clear().type(password)
        }
        
    }

    login=()=>{
        cy.get("button[type='submit']").click()
    }
    
}

