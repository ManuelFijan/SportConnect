import { useEffect, useState } from "react";
import Ad from "./Ad"; 

const AdsList = () => {
  const [ads, setAds] = useState<any[]>([]);
  const [randomAds, setRandomAds] = useState<any[]>([]);
  const [screenSize, setScreenSize] = useState<number>(window.innerWidth); // Pracenje sirine ekrana

  // Uzimamo reklame iz ads.json
  useEffect(() => {
    fetch('/ads.json')
      .then((response) => response.json())
      .then((data) => {
        console.log(ads);
        setAds(data);

        // Biramo 3 razlicite nasumicne reklame
        const randomAdsSet = new Set<any>(); // Set za pracenje unikatnih reklama

        while (randomAdsSet.size < 3) {
          const randomIndex = Math.floor(Math.random() * data.length);
          randomAdsSet.add(data[randomIndex]); // Dodajemo u Set dok imamo manje od 3 reklame
        }

        setRandomAds(Array.from(randomAdsSet)); // Pretvaramo Set u niz i pospremamo u randomAds varijablu
      })
      .catch((error) => {
        console.error("Error loading ads:", error);
      });
  }, []);

  // Pratimo promjenu velicine ekrana
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Ovisno koja je sirina ekrana toliko reklama uzimamo (lg = 3, sve manje je 1)
  const adsToDisplay = screenSize >= 1024 ? randomAds : randomAds.slice(0, 1); 

  return (
    <div className="space-y-4">
      {/* Render-amo reklame */}
      {adsToDisplay.map((ad) => (
        <Ad
          key={ad.id}
          imageUrl={ad.imageUrl}
          textContent={ad.textContent}
        />
      ))}
    </div>
  );
};

export default AdsList;