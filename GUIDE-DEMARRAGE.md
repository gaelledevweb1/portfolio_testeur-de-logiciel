🛒 FreshMarket
Guide complet du testeur Cypress
Projet QA portfolio — Sibaud  •  Mars 2026
1. Présentation du projet
FreshMarket est une boutique e-commerce fictive spécialement conçue pour la pratique des tests E2E Cypress. Toute la logique métier est intentionnellement exposée dans une seule page HTML afin que tu te consacres entièrement à la partie test.
Application : panier-shop.html — à placer dans ton dossier Laragon et servir sur http://localhost/...
1.1 Fonctionnalités couvertes
•	Catalogue produits avec filtres par catégorie et recherche full-text
•	Produits en promotion et en rupture de stock
•	Panier : ajout, modification de quantité, suppression, vidage
•	Calcul automatique : sous-total, livraison gratuite > 30 €, total
•	Codes promo : FRESH10, SAVE20, BIENVENUE (10%, 20%, 15%)
•	Confirmation de commande avec numéro unique FM-XXXXXX
•	Toast notifications, modale, fermeture en cliquant hors de la boîte

2. Analyse de tes points de progression
Sur la base de tes fichiers todo-list, voici les axes sur lesquels FreshMarket va te faire progresser :
2.1 Vocabulaire & assertions ciblées
Dans ton projet précédent, tu utilisais souvent .should('contain') et .should('be.visible'). Voici les assertions à découvrir ici :
•	cy.should('have.length', n)  — vérifier le nombre exact d'éléments dans la grille
•	cy.should('have.class', 'active')  — vérifier le filtre actif
•	cy.should('be.disabled')  — pour les boutons en rupture
•	cy.should('have.css', ...)  — couleur du badge Promo/Rupture
•	cy.should('not.exist')  — élément complètement absent du DOM
•	cy.invoke('text').then(...)  — lire et transformer du texte (prix, total)
•	cy.within(() => {...})  — limiter les assertions à un article du panier
2.2 Précision des sélecteurs
Les data-testid sont tous posés. Objectif : éviter les sélecteurs fragiles et pratiquer les combinaisons :
[data-testid='product-card'][data-product-id='1']
[data-testid='cart-item'][data-id='5']
[data-testid='cart-item']:first [data-testid='cart-item-qty']
2.3 Scénarios plus synthétiques
Dans ta todo-list, certains scénarios étaient très longs. L'objectif ici est d'écrire des tests courts, indépendants, avec une seule assertion principale par test (principe du Single Assert).
Exemple d'objectif : SC-16 (livraison gratuite) tient en 6 lignes max.
2.4 Fixtures & Page Object Model
Tu as bien appliqué le POM et les fixtures dans la todo-list. Ici, l'enjeu est de factoriser les données produits (prix, noms) dans des fixtures JSON, et de créer une classe ShopPage avec des méthodes parlantes :
addProductToCart(productId)
applyPromoCode(code)
getCartTotal()
proceedToCheckout()

3. Plan de tests — 25 scénarios
Classe de priorité : P1 = bloquant, P2 = haute, P3 = moyenne.
ID	Titre du scénario	Type	Description	Priorité
SC-01	Page se charge correctement	Nominal	Vérifier que le titre, les produits et le panier sont visibles au chargement	P1 – Critique
SC-02	Recherche d'un produit existant	Nominal	Taper 'pommes' → seuls les produits contenant ce texte s'affichent	P1 – Critique
SC-03	Recherche sans résultats	Non-nominal	Taper 'zzz' → message 'Aucun produit trouvé' affiché	P2 – Haute
SC-04	Filtre par catégorie 'Fruits'	Nominal	Cliquer sur filtre Fruits → seuls les fruits s'affichent, badge actif	P1 – Critique
SC-05	Filtre 'Tous' remet tout	Nominal	Après filtre Fruits, cliquer Tous → les 12 produits réapparaissent	P2 – Haute
SC-06	Cumul filtre + recherche	Nominal	Filtre Légumes + recherche 'broc' → seul Brocoli visible	P2 – Haute
SC-07	Produit en rupture non cliquable	Non-nominal	Les produits 'Oranges filet' et 'Carottes 1kg' ont badge Rupture et boutons désactivés	P1 – Critique
SC-08	Ajouter un produit au panier	Nominal	Cliquer 'Ajouter' sur Pommes Gala → badge panier = 1, panier affiche l'article	P1 – Critique
SC-09	Toast notification après ajout	Nominal	Après ajout → toast apparaît avec le nom du produit et disparaît après 2,5s	P3 – Moyenne
SC-10	Quantité produit via +/− sur la carte	Nominal	Cliquer + 3 fois sur Pommes → qty affiché = 3, panier = 3 articles	P2 – Haute
SC-11	Bouton 'Ajouter' devient '✓ Ajouté'	Nominal	Après ajout au panier, le bouton change de texte et de couleur	P3 – Moyenne
SC-12	Panier vide au démarrage	Nominal	Message 'Votre panier est vide' visible, boutons Commander et Vider désactivés	P1 – Critique
SC-13	Augmenter qty depuis le panier	Nominal	Cliquer + dans la ligne panier → qty dans le panier et le total augmentent	P2 – Haute
SC-14	Diminuer qty panier jusqu'à 1 min	Limite	Qty = 1, cliquer − → qty reste à 1 (ne descend pas à 0)	P2 – Haute
SC-15	Supprimer un article du panier	Nominal	Cliquer ✕ sur un article → il disparaît de la liste, total recalculé	P1 – Critique
SC-16	Livraison gratuite > 30€	Limite	Sous-total ≥ 30€ → livraison = 'Gratuit 🎉'	P2 – Haute
SC-17	Code promo valide FRESH10	Nominal	Entrer 'FRESH10' → message succès, ligne remise −10% apparaît, total recalculé	P1 – Critique
SC-18	Code promo invalide	Non-nominal	Entrer 'ABCDEF' → message erreur en rouge, aucune remise appliquée	P2 – Haute
SC-19	Code promo champ vide	Non-nominal	Cliquer Appliquer sans code → message 'Veuillez entrer un code promo'	P2 – Haute
SC-20	Code promo via touche Entrée	Nominal	Taper 'SAVE20' + Entrée → comportement identique au clic bouton	P3 – Moyenne
SC-21	Vider le panier	Nominal	Cliquer 'Vider le panier' → panier vide, message vide réapparaît, promo effacée	P1 – Critique
SC-22	Passer une commande	Nominal	Panier non vide, cliquer Commander → modale de confirmation s'affiche avec numéro de commande	P1 – Critique
SC-23	Numéro de commande unique	Nominal	Passer 2 commandes → vérifier que les numéros FM-XXXXXX sont différents	P2 – Haute
SC-24	Fermer la modale remet le panier à zéro	Nominal	Après confirmation, fermer la modale → panier vide, produits reviennent à qty 0	P1 – Critique
SC-25	Fermer modale en cliquant hors de la boîte	Limite	Cliquer sur l'overlay (hors du modal) → modal se ferme, panier vidé	P3 – Moyenne

4. Structure de dossiers recommandée
freshmarket-cypress/
├── panier-shop.html
├── package.json
├── cypress.config.js
├── cypress/
│   ├── e2e/
│   │   ├── 01-chargement.cy.ts
│   │   ├── 02-recherche-filtres.cy.ts
│   │   ├── 03-panier.cy.ts
│   │   ├── 04-promo.cy.ts
│   │   └── 05-commande.cy.ts
│   ├── fixtures/
│   │   ├── products.json
│   │   └── promoCodes.json
│   ├── pageObject/
│   │   └── shopPage.ts
│   └── support/
│       └── e2e.ts
└── README.md

5. Exemples de fixtures à créer
products.json
{
  "pommes": { "id": 1, "name": "Pommes Gala", "price": "2,49 €", "category": "fruits" },
  "bananesPromo": { "id": 2, "name": "Bananes bio", "originalPrice": "2,29 €" },
  "rupture": { "oranges": 4, "carottes": 8 }
}
promoCodes.json
{
  "valid": [
    { "code": "FRESH10", "percent": 10, "message": "Code \"FRESH10\" appliqué" },
    { "code": "SAVE20",  "percent": 20, "message": "Code \"SAVE20\" appliqué"  },
    { "code": "BIENVENUE", "percent": 15 }
  ],
  "invalid": ["ABCDEF", "PROMO99", ""]
}

6. Squelette de Page Object à compléter
Crée ce fichier dans cypress/pageObject/shopPage.ts. Les méthodes sont volontairement vides pour que tu les implémentes toi-même !
class ShopPage {
  // Sélecteurs
  searchInput   = '[data-testid="search-input"]';
  filterAll     = '[data-testid="filter-all"]';
  filterFruits  = '[data-testid="filter-fruits"]';
  productCard   = '[data-testid="product-card"]';
  addToCartBtn  = '[data-testid="add-to-cart-btn"]';
  cartBadge     = '[data-testid="cart-badge"]';
  cartTotal     = '[data-testid="cart-total"]';
  promoInput    = '[data-testid="promo-input"]';
  applyPromoBtn = '[data-testid="apply-promo-btn"]';
  promoMessage  = '[data-testid="promo-message"]';
  checkoutBtn   = '[data-testid="checkout-btn"]';
  orderModal    = '[data-testid="order-modal"]';
  orderNumber   = '[data-testid="order-number"]';
  closeModalBtn = '[data-testid="close-modal-btn"]';
  cartEmpty     = '[data-testid="cart-empty"]';
  cartItem      = '[data-testid="cart-item"]';
  toast         = '[data-testid="toast"]';

  searchFor(term: string) { /* à implémenter */ }
  filterByCategory(cat: string) { /* à implémenter */ }
  addProductById(id: number) { /* à implémenter */ }
  removeItemFromCart(id: number) { /* à implémenter */ }
  applyPromoCode(code: string) { /* à implémenter */ }
  getCartTotal(): Cypress.Chainable<string> { /* à implémenter */ }
  checkout() { /* à implémenter */ }
  closeOrderModal() { /* à implémenter */ }
}
export default ShopPage;

7. Critères de qualité à viser
7.1 Pour chaque test
•	Un seul comportement vérifié par test (principe Single Assert)
•	Utiliser beforeEach(() => cy.visit(...)) dans chaque describe
•	Pas de cy.wait(X) arbitraires — préférer .should() qui attend automatiquement
•	Utiliser cy.fixture() pour toutes les données
•	Nommer les tests avec le format : 'SC-XX - [description courte]'
7.2 Organisation des fichiers
•	1 fichier .cy.ts par groupe fonctionnel (chargement, recherche, panier…)
•	1 seule classe Page Object pour toute l'appli
•	Les sélecteurs uniquement dans le Page Object, jamais en dur dans les specs
7.3 Bugs intentionnels à trouver 🐛
L'application contient les comportements limites suivants à documenter dans un bug.md :
•	Bug 1 : Que se passe-t-il si on modifie la quantité dans le panier puis qu'on applique un code promo ? Le total est-il bien recalculé ?
•	Bug 2 : Le compteur de livraison gratuite est-il correct si on vide partiellement le panier sous 30 € ?
•	Bug 3 : Que se passe-t-il si on tape un code promo en minuscules (ex : 'fresh10') ?
•	Bug 4 : Peut-on commander avec le même code promo deux fois de suite après vidage du panier ?

8. Checklist de démarrage
1.	Copier panier-shop.html dans ton dossier Laragon et vérifier qu'il s'ouvre dans le navigateur
2.	npm init -y dans freshmarket-cypress/
3.	npm install --save-dev cypress typescript cypress-real-events
4.	Créer cypress.config.js avec baseUrl: 'http://localhost/freshmarket-cypress'
5.	npx cypress open → choisir E2E → choisir Chrome
6.	Créer cypress/fixtures/products.json et promoCodes.json
7.	Créer cypress/pageObject/shopPage.ts avec les sélecteurs
8.	Écrire et exécuter les 5 premiers scénarios (SC-01 à SC-05)
9.	Identifier les 4 comportements limites et les documenter
10.	Viser 25 tests ✅ et 0 test en hard-coded selectors

Bon testing ! 🚀  —  Projet QA Portfolio Sibaud  —  Mars 2026
