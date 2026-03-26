# demander à claude.ai la précision du contexte pour les cas suivants : 

## Precision 1 :  - GUIDE-DEMARRAGE indiqué ceux-ci : "rupture": { "oranges": 4, "carottes": 8 } et dans App.js : 
# { id: 4, name: "Oranges filet",   emoji: "🍊", category: "fruits",   price: 2.79, promo: false, stock: false },
# { id: 8, name: "Carottes 1kg",    emoji: "🥕", category: "légumes",  price: 1.29, promo: false, stock: false },
# ! nb : est ce que  la rupture correspond qu'au dela de 4 orange filet il n'y a plus et pareille pour les carottes au dela de 8, ou bien à l'id de ses produits.
# confirmation de claude. ai : cela correspond bien à l'id de ses produits.

## precision 2 : -GUIDE-DEMMARRAGE indiqué ceux-ci :
# "pommes": { "id": 1, "name": "Pommes Gala", "price": "2,49 €", "category": "fruits" },
#  "bananesPromo": { "id": 2, "name": "Bananes bio", "originalPrice": "2,29 €" },
# et app.js cela: 
 # { id: 1, name: "Pommes Gala",     emoji: "🍎", category: "fruits",   price: 2.49, promo: false, stock: true  },
  #    { id: 2, name: "Bananes bio",     emoji: "🍌", category: "fruits",   price: 1.89, promo: true,  originalPrice: 2.29, stock: true  },
  # confirmation de claude.ai : Ce que le guide aurait dû préciser
# "Ces fixtures sont des exemples minimaux, à toi de les compléter selon ce que chaque test doit vérifier."
# Sans cette phrase, tu te retrouves à te demander si c'est un oubli ou un choix — c'est une lacune du guide.

## precision 3: GUIDE-DEMMARRAGE indiqué ceux-ci  " Codes promo : FRESH10, SAVE20, BIENVENUE (10%, 20%, 15%)" et un peu plus loin ceux-ci : promoCodes.json
# {
# "valid": [
#   { "code": "FRESH10", "percent": 10, "message": "Code      \"FRESH10\" appliqué" },
#   { "code": "SAVE20",  "percent": 20, "message": "Code \"SAVE20\" appliqué"  },
#   { "code": "BIENVENUE", "percent": 15 }
#  ],...} et dans app.js ceux ci : const PROMO_CODES = {
#      "FRESH10": 10,  // 10% de remise
#      "SAVE20":  20,  // 20% de remise
#     "BIENVENUE": 15 // 15% de remise
#   };
# precision de  claude.ai : Le guide dit bien BIENVENUE (10%, 20%, 15%) c'est une liste des trois remises dans l'ordre des trois codes :
# FRESH10 → 10%
# SAVE20  → 20%
# BIENVENUE → 15%
# C'est juste une façon condensée d'écrire les trois valeurs sur une seule ligne. Les parenthèses s'appliquent aux trois codes ensemble, dans l'ordre.

## precision 4 : pour le titre  tu parle du H1 ou ou du title qui se trouve dans le head , comment determiné cette precision : 
# SC-01    Page se charge correctement    Nominal    Vérifier que le titre, les produits et le panier sont visibles au chargement    P1 – Critique
# precision de claude.ai : La règle pratique : si Cypress ne peut pas le voir, ça ne compte pas comme "visible". Le <title> du head est accessible via cy.title(), mais ce n'est pas ce qu'un utilisateur voit au chargement.
# 💡 Le guide utilise "titre" de façon un peu vague — dans ton implémentation, privilégie toujours les data-testid disponibles dans le HTML. C'est eux qui font foi.