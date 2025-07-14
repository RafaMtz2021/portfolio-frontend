import { useEffect, useState } from "react";
import "./carrusel.css";

const TOTAL_CARDS = 50;
const VISIBLE_CARDS = 6;
const ROTATE_INTERVAL = 2000;

export default function CarruselCards() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const anglePerCard = 360 / VISIBLE_CARDS;
  const radius = typeof window !== "undefined" && window.innerWidth <= 768 ? 250 : 400;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TOTAL_CARDS);
    }, ROTATE_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel-container">
      <div className="carousel">
        {Array.from({ length: VISIBLE_CARDS }).map((_, i) => {
          const realIndex = (currentIndex + i) % TOTAL_CARDS;
          const angle = anglePerCard * i;
          return (
            <div
              className="memory-card"
              key={realIndex}
              style={{
                transform: `rotateY(${angle}deg) translateZ(${radius}px)`
              }}
            >
              <div className="card-inner">
                <div className="card-front">
                  <div className="card-content">
                    <div className="memory-date">Número: {realIndex + 1}</div>
                    <h3>Personaje {realIndex + 1}</h3>
                    <div className="memory-image">
                      <i className="fa-solid fa-star"></i>
                      <div className="glitch-effect"></div>
                    </div>
                    <p className="memory-preview">Descripción breve del personaje.</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
