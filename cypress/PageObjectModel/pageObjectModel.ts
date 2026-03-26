import cypress from "cypress";

Cypress.Commands.add('dataCy', (value)=>{
    return cy.get(`[data-cy =${value}]`)
})



declare global {
    namespace Cypress {
        interface Chainable {
            /**
             * Sélectionne un élément par son attribut data-cy
             * @example cy.dataCy('search-input')
             */
            dataCy(value: string): Chainable<JQuery<HTMLElement>>
        }
    }
}

interface Products{

    id:number;
    name:string;
    price?: string;
    originalPrice?: string;
    category:"fruits"|"légumes"|"épicerie" ;
}




export interface product{
    // pommes : (object : Products)=>string;
    pommes: Products;
    bananesPromo: Products;
    fraises:Products;
    oranges:Products;
    Courgettes:Products;
    TomatesPromo:Products;
    Brocoli:Products;
    Carottes:Products;
    Pâtes:Products;
    HuilePromo:Products;
    Riz:Products;
    Miel:Products;
}

export interface productsNonNominal {
    aucunResultatPourCeProduit : string;
}



class pageObjectModel {

    
     
    
}

export default pageObjectModel



