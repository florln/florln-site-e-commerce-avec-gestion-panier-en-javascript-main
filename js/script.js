const products =  [
    {
        id: 1,
        name: "Produit 1",
        price: 29.99,
        image: "images/image1.jpg",
        description: "Ceci est une description du Produit 1. Il est de haute qualité et répond à tous vos besoins.",
        details: "Détails: Taille - M, Couleur - Rouge, Matériau - Coton.",
        detailsUrl: "produit.html?id=1"
    },
    {
        id: 2,
        name: "Produit 2",
        price: 39.99,
        image: "images/image2.jpg",
        description: "Ceci est une description du Produit 2. Un produit exceptionnel pour les amateurs de confort.",
        details: "Détails: Taille - L, Couleur - Bleu, Matériau - Polyester.",
        detailsUrl: "produit.html?id=2"
    },
    {
        id: 3,
        name: "Produit 3",
        price: 49.99,
        image: "images/image3.jpg",
        description: "Ceci est une description du Produit 3. Parfait pour toutes les occasions.",
        details: "Détails: Taille - S, Couleur - Vert, Matériau - Lin.",
        detailsUrl: "produit.html?id=3"
    },
    {
        id: 4,
        name: "Produit 4",
        price: 59.99,
        image: "images/image4.jpg",
        description: "Ceci est une description du Produit 4. Idéal pour ceux qui recherchent le meilleur.",
        details: "Détails: Taille - XL, Couleur - Noir, Matériau - Soie.",
        detailsUrl: "produit.html?id=4"
    },
    {
        id: 5,
        name: "Produit 5",
        price: 200.99,
        image: "images/image5.jpg",
        description: "Ceci est une description du Produit 5. Idéal pour ceux qui recherchent le meilleur.",
        details: "Détails: Taille - XL, Couleur - Noir, Matériau - Soie.",
        detailsUrl: "produit.html?id=5"
    },
    {
        id: 6,
        name: "Produit 6",
        price: 250.99,
        image: "images/image6.jpg",
        description: "Ceci est une description du Produit 5. Idéal pour ceux qui recherchent le meilleur.",
        details: "Détails: Taille - XL, Couleur - Noir, Matériau - Soie.",
        detailsUrl: "produit.html?id=6"
    },
    {
        id: 7,
        name: "Produit 7",
        price: 175.77,
        image: "images/image7.jpg",
        description: "Ceci est une description du Produit 5. Idéal pour ceux qui recherchent le meilleur.",
        details: "Détails: Taille - XL, Couleur - Noir, Matériau - Soie.",
        detailsUrl: "produit.html?id=7"
    },
    {
        id: 8,
        name: "Produit 8",
        price: 120.99,
        image: "images/image8.jpg",
        description: "Ceci est une description du Produit 5. Idéal pour ceux qui recherchent le meilleur.",
        details: "Détails: Taille - XL, Couleur - Noir, Matériau - Soie.",
        detailsUrl: "produit.html?id=8"
    },
    {
        id: 9,
        name: "Produit 9",
        price: 180.00,
        image: "images/image9.jpg",
        description: "Ceci est une description du Produit 5. Idéal pour ceux qui recherchent le meilleur.",
        details: "Détails: Taille - XL, Couleur - Noir, Matériau - Soie.",
        detailsUrl: "produit.html?id=9"
    },
    {
        id: 10,
        name: "Produit 10",
        price: 80.10,
        image: "images/image10.jpg",
        description: "Ceci est une description du Produit 5. Idéal pour ceux qui recherchent le meilleur.",
        details: "Détails: Taille - XL, Couleur - Noir, Matériau - Soie.",
        detailsUrl: "produit.html?id=10"
    },
];


let cart = JSON.parse(localStorage.getItem("cart")) || []

// fonction pour afficher la liste des produits
function afficherListeProduits() {
    // Récupération de l'élément HTML qui contiendra la liste des produits
    const container = document.getElementById("products-container");

    // Je parcours la liste des produits
    products.forEach((produit) => {
        const existingProduct = cart.find(item => item.id === produit.id)
        // Création d'un élément HTML pour chaque produit
        const card = document.createElement("div");
        card.className = "product-card";

        if(existingProduct){
            card.innerHTML = `
             <img src="./${produit.image}" alt="${produit.name}" class="product-image">
            <div class="product-info">
                <h3>${produit.name}</h3>
                <p>Prix: €${produit.price}</p>
                <a href="./pages/${produit.detailsUrl}" class="view-details"><i class="fas fa-eye"></i></a>
                <button class="add-to-cart already-in-cart " id="btn-${produit.id}"
                    onclick="window.location='./pages/cart.html'">Déjà au panier</button>
            </div>
        `;
        }else{
            card.innerHTML = `
             <img src="./${produit.image}" alt="${produit.name}" class="product-image">
            <div class="product-info">
                <h3>${produit.name}</h3>
                <p>Prix: €${produit.price}</p>
                <a href="./pages/${produit.detailsUrl}" class="view-details"><i class="fas fa-eye"></i></a>
                <button class="add-to-cart " id="btn-${produit.id}"
                    onclick="ajouterProduitPanier(${produit.id})">Ajouter au panier</button>
            </div>
        `;
        }

        

        container.appendChild(card)
    })
}

afficherListeProduits()

// Fonction pour ajouter un produit dans le panier
function ajouterProduitPanier(productId) {
    const product =  products.find(p => p.id === productId );
    const existingProduct = cart.find(item => item.id === productId)

    if (existingProduct) {
        alert("ce produit est déjà dans votre panier")
    }else{
        cart.push({...product, quantity: 1})
        updateCart();
        alert("produit ajouté au panier avec sucess");
    }
    localStorage.setItem("cart", JSON.stringify(cart))

    // changer le type de bouton
    const addToCartItemBtn = document.getElementById(`btn-${productId}`)
    addToCartItemBtn.classList.add("already-in-cart");
    addToCartItemBtn.innerText = "Déjà au panier";
    addToCartItemBtn.setAttribute("onclick", `window.location='cart.html'`)
}

function updateCart(){
    const cartCount = document.getElementById("cart-count")

    cartCount.textContent =  cart.length
}
updateCart();
