
// import user from '../fixtures/products.json'
import pageObjectModel, {
  type product,
  type productsNonNominal,
  
}from "../PageObjectModel/pageObjectModel";

// describe('template spec', () => {
//   it('passes', () => {
//     cy.visit('https://example.cypress.io')
//   })
// })

// describe('The Home Page', () => {
//   beforeEach(() => {
//     // reset and seed the database prior to every test
//     cy.exec('npm run db:reset && npm run db:seed')
//   })

//   it('successfully loads', () => {
//     cy.visit('/')
//   })
// })


describe('freshMarket page - catalogue',()=>{
    

   beforeEach( () => {
     cy.visit('/panier-shop.html');
   })

  //  sc-01:
  it('verifie que la page se charge correctement', () => {
    cy.visit('/panier-shop.html');
  });

  // ! Absence de H1;  le slogan si bien définit peut donner indication aux utilisateur d'etre sur la bonne marque donc sur le bon site si  ceux-ci sont bien definit,  ainsi que le sous titre h2 notre catalogue pour  donner  des indications precises aux utilisateurs sur ce qu'ils observent
  // it('verifie que tu as un titre au chargement de la page', () => {
    
  // });

  it('verifie que ta grille de produit contient 12 produits', () => {
   
    cy.get('[data-testid="products-grid"]').should('be.visible').find('[data-testid="product-card"]');
    cy.get('[data-testid="product-card"]').should('have.length',12);
  });

  it(' dans la grille de produit, chaque produit doivent contenir  un nom, une categorie, un prix', () => {

    cy.get('[data-testid="products-grid"]').should('be.visible').find('[data-testid="product-card"]').as('productCard');
   cy.fixture("products").then((data:product)=>{
   cy.get('@productCard').each(($card)=>{
    

      cy.wrap($card).filter('article.product-card').as('articleProductCard');
      cy.get('@articleProductCard').each(($cardInfo)=>{
        
        cy.wrap($cardInfo).find('[data-testid="product-name"]').as('ObjetproductCardSansRupture');
        cy.get('@ObjetproductCardSansRupture').should('not.be.empty');
        cy.wrap($cardInfo).find('[data-testid="product-category"]').should('not.be.empty');
        cy.wrap($cardInfo).find('[data-testid="product-price"]').should('not.be.empty');
      });
    
   });
});
      
  });

   it.only(' les produits, qui affiche la propriéte original price, doivent correspondrent à mon objet fixture products.json', () => {
    //  1ere etape selectionnner les produits qui ont la propriete original price dans la grille de produit
     cy.get('[data-testid="products-grid"]').find('[data-testid="product-card"]').as('productCard');
     cy.get('@productCard').find('[data-testid="product-price-original"]').as('productOriginalPrice').should('have.length',3);
    //  cy.get('@productOriginalPrice').should('have.length',3);
    cy.fixture("products").then((data :product )=>{
      //  je souhaite recuperer dans mon objet, les produits qui ont la propriete original price et connaitre leur valeur
      console.log(data.bananesPromo.originalPrice);
      console.log(Object.entries(data));
      console.log(Object.values(data));
      
      
      
      data.bananesPromo.originalPrice;
      Object.entries(data);
       const typeOfOjectValues = Object.values(data);
       console.log(typeOfOjectValues.valueOf());
       
    // cy.get('').each(()=>{

    // });

    });

   });

  // it('dans la grille de produits, l\'affichage des produits en stocks et en ruptures, avec leurs propriétes et valeurs doivent correspondre à mon objet fixture products.json ', () => {
    
  // });

  it('verifie la présence du panier et son contenu', () => {
    cy.get('[data-testid="cart-panel"]').should('be.visible').find('h2').as('h2Panier');
    cy.get('@h2Panier').should('contain', 'Mon panier').find('[data-testid="cart-item-count"]').as('CardItemCountPanier');
    cy.get('@CardItemCountPanier').should('contain', '0 article(s)');
    cy.get('[data-testid="cart-panel"]').find('[data-testid="cart-empty"]').as('CartEmptyPanier');
    cy.get('@CartEmptyPanier').should("contain", "🛒 Votre panier est vide.Ajoutez des produits !");
  });

  // SC-02:

  it('trouver seulement, le produit taper dans la barre de recherche,  si appartient au  catalogue', () => {
    
    cy.fixture('products').then((data : product ) => {

    cy.wrap(data.bananesPromo).should('have.keys',['id','name','originalPrice','category']).and('contain',{name: 'Bananes bio'})
     const nomProduit = data.bananesPromo.name 
     console.log(nomProduit);
     cy.get('[data-testid="search-input"]').type(nomProduit);
     cy.get('[data-testid="products-grid"]').should('be.visible').find('[data-testid="product-card"]').as('ProductCard');

    cy.get('@ProductCard').should('be.visible').should('have.length',1);
    
    
    cy.get('@ProductCard').find('[data-testid="product-name"]').should('have.text', nomProduit);;
    
  })
  
  });


  // SC-03 : 
  it('Voir le message d\'erreur  "Aucun produit trouvé" si "zzzz" est recherché dans la barre de recherche ', () => {
    cy.fixture("productsNonNominal").then((data : productsNonNominal)=>{

      cy.get('[data-testid="search-input"]').type(data.aucunResultatPourCeProduit);
       cy.get('[data-testid="products-grid"]').should('be.visible').find('[data-testid="products-empty"]').should('contain','Aucun produit trouvé');
    });
  });

  // SC-04 : 
  it('fitres  la categorie "Fruits",seuls les  fruits s\'afficheront', () => {
   
    cy.fixture("products").then((data : product)=>{
      cy.get('[data-testid="filter-fruits"]').click();
     cy.get('[data-testid="products-grid"]').should('be.visible').find('[data-testid="product-card"]').as('ProductCard');
     cy.get('@ProductCard').should('have.length',4);
     cy.get('@ProductCard').find('[data-testid="product-name"]').and('contain.text', 'Pommes GalaBananes bioFraises 500gOranges filet' );

    });
   
  });

  // SC-05 : 
  it('apres filtres "Fruits",cliquer sur filtre "tous", affiche les 12 produits', () => {
    cy.fixture("products").then((data: product )=>{
      cy.get('[data-testid="filter-fruits"]').click();
      cy.get('[data-testid="filter-all"]').click();
     cy.get('[data-testid="products-grid"]').should('be.visible').find('[data-testid="product-card"]').as('ProductCard');
     cy.get('@ProductCard').should('have.length',12);
    //  cy.get('@ProductCard').find('[data-testid="product-name"]').should('have.text', "Pommes GalaBananes bioFraises 500gOranges filetCourgettesTomates cerisesBrocoliCarottes 1kgPâtes rigatoniHuile d'oliveRiz basmatiMiel artisanal");
     

    });
  });
});