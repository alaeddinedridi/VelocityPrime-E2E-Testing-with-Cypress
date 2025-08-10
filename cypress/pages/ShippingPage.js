export class ShippingPage { 
    enterFullname=(fullname)=>{
        cy.get('[name="fullname"]').clear()
       

        if (fullname.length == 0){
            cy.get('[name="fullname"]').focus().blur()
        }else{
            cy.get('[name="fullname"]').type(fullname)
        }
    }

    enterPhoneNumber=(phoneNumber)=>{
        cy.get('[name="phoneNumber"]').clear()
       

        if (phoneNumber.length == 0){
            cy.get('[name="phoneNumber"]').focus().blur()
        }else{
            cy.get('[name="phoneNumber"]').type(phoneNumber)
        }
    }

    enterAddress=(address)=>{
        cy.get('[name="address"]').clear()
       

        if (address.length == 0){
            cy.get('[name="address"]').focus().blur()
        }else{
            cy.get('[name="address"]').type(address)
        }
    }

    enterCityName=(city)=>{
        cy.get('[name="city"]').clear()
       

        if (city.length == 0){
            cy.get('[name="city"]').focus().blur()
        }else{
            cy.get('[name="city"]').type(city)
        }
    }

    enterPostalCode=(postalCode)=>{
        cy.get('[name="pcode"]').clear()
       

        if (postalCode.length == 0){
            cy.get('[name="pcode"]').focus().blur()
        }else{
            cy.get('[name="pcode"]').type(postalCode)
        }
    }

    clickNext=()=>{
        cy.get('button[type="submit"]').click()
    }

}