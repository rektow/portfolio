import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const produits = [
  { id: 1, nom: "Rolex Submariner", prix: 12000, image: process.env.PUBLIC_URL + "/images/rolex.jpg" },
  { id: 2, nom: "Omega Speedmaster", prix: 9800, image: process.env.PUBLIC_URL + "/images/omega.jpg" },
  { id: 3, nom: "Cartier Santos", prix: 14500, image: process.env.PUBLIC_URL + "/images/cartier.jpg" },
];

function App() {
  const [panier, setPanier] = useState([]);
  const [formData, setFormData] = useState({ nom: "", adresse: "", email: "", telephone: "" });

  const ajouterAuPanier = (produit) => {
    setPanier([...panier, produit]);
  };

  const supprimerDuPanier = (index) => {
    const newPanier = [...panier];
    newPanier.splice(index, 1);
    setPanier(newPanier);
  };

  const total = panier.reduce((acc, item) => acc + item.prix, 0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Commande envoyée avec succès !");
  };

  return (
    <div style={{ background: "#111", color: "#f8f8f8", fontFamily: "Georgia, serif", padding: "2rem" }}>
      <h1 style={{ textAlign: "center", color: "#d4af37" }}>Élégance Horlogère</h1>

      {/* Carrousel */}
      <Swiper spaceBetween={50} slidesPerView={1} style={{ maxWidth: "600px", margin: "2rem auto" }}>
        {produits.map((p) => (
          <SwiperSlide key={p.id}>
            <img src={p.image} alt={p.nom} style={{ width: "100%", borderRadius: "10px" }} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Catalogue */}
      <div style={{ display: "flex", justifyContent: "center", gap: "2rem", flexWrap: "wrap" }}>
        {produits.map((p) => (
          <div key={p.id} style={{ background: "#222", borderRadius: "8px", width: "300px", padding: "1rem", textAlign: "center" }}>
            <img src={p.image} alt={p.nom} style={{ width: "100%", borderRadius: "8px" }} />
            <h2 style={{ color: "#fff" }}>{p.nom}</h2>
            <p style={{ color: "#ccc" }}>{p.prix.toLocaleString()} €</p>
            <button
              onClick={() => ajouterAuPanier(p)}
              style={{ background: "#d4af37", color: "#111", padding: "0.5rem 1rem", border: "none", borderRadius: "4px" }}
            >
              Ajouter au panier
            </button>
          </div>
        ))}
      </div>

      {/* Panier */}
      <div style={{ marginTop: "3rem", background: "#1a1a1a", padding: "1rem", borderRadius: "8px" }}>
        <h2 style={{ color: "#d4af37" }}>🧺 Votre panier</h2>
        {panier.length === 0 ? (
          <p>Votre panier est vide.</p>
        ) : (
          <ul>
            {panier.map((item, index) => (
              <li key={index} style={{ marginBottom: "0.5rem" }}>
                {item.nom} - {item.prix.toLocaleString()} €
                <button
                  onClick={() => supprimerDuPanier(index)}
                  style={{ marginLeft: "1rem", color: "#c00", background: "none", border: "none", cursor: "pointer" }}
                >
                  ✖
                </button>
              </li>
            ))}
          </ul>
        )}
        {panier.length > 0 && <p><strong>Total :</strong> {total.toLocaleString()} €</p>}
      </div>

      {/* Formulaire */}
      <div style={{ marginTop: "3rem", background: "#1a1a1a", padding: "1rem", borderRadius: "8px", maxWidth: "600px", marginInline: "auto" }}>
        <h2 style={{ color: "#d4af37" }}>📦 Passer commande</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="nom" placeholder="Votre nom" value={formData.nom} onChange={handleChange} required style={inputStyle} />
          <input type="text" name="adresse" placeholder="Adresse" value={formData.adresse} onChange={handleChange} required style={inputStyle} />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required style={inputStyle} />
          <input type="tel" name="telephone" placeholder="Téléphone" value={formData.telephone} onChange={handleChange} required style={inputStyle} />
          <button type="submit" style={{ ...inputStyle, background: "#d4af37", color: "#111", cursor: "pointer" }}>
            Envoyer la commande
          </button>
        </form>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "0.8rem",
  marginBottom: "1rem",
  borderRadius: "6px",
  border: "none",
  fontSize: "1rem",
};

export default App;
