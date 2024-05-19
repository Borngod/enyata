import React, { useState, useEffect } from "react";
import axios from "axios";
import ColorThief from "color-extr-thief";
import arrow from "../assets/arrow.png";
import ProgressBar from "@ramonak/react-progress-bar";

// Ant Design Tabs component

// Type for the properties expected by the DetailView component
type DetailViewProps = {
  pokemon: {
    name: string;
    sprites: {
      other: {
        dream_world: {
          front_default: string;
        };
      };
    };
    types: { type: { url: string } }[];
    height: number;
    weight: number;
    abilities: { ability: { name: string } }[];
    stats: { stat: { name: string }; base_stat: number }[];
  };
  onClose: () => void;
  theme: string;
};



// Functional component to display the detailed view of a Pokémon
const DetailView: React.FC<DetailViewProps> = ({ pokemon, onClose, theme }) => {
  const [similarPokemon, setSimilarPokemon] = useState<any[]>([]);
  const [rgb, setRgb] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<string>("about");

  // Function to get the dominant color from an image
  function getDominantColor(
    imageUrl: string,
    callback: (color: number[]) => void
  ) {
    // @ts-ignore: Ignore TypeScript error for the next line
    const img: HTMLImageElement = document.createElement("IMG"); // Explicitly typed as HTMLImageElement
    const colorThief = new ColorThief();
    img.src = imageUrl; // Set src directly
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      callback(colorThief.getColor(img));
    };
  }

  // Fetch similar Pokémon based on type when the component mounts
  useEffect(() => {
    const fetchSimilarPokemon = async () => {
      const typeUrl = pokemon.types[0].type.url;
      const response = await axios.get(typeUrl);
      const data = response.data;
      const similarPokemonRequests = data.pokemon
        .slice(0, 10)
        // @ts-ignore: Ignore TypeScript error for the next line
        .map((p) => axios.get(p.pokemon.url));
      const similar = await Promise.all(similarPokemonRequests);
      setSimilarPokemon(similar.map((res) => res.data));
    };
    fetchSimilarPokemon();
  }, [pokemon]);

  // Get the dominant color of the Pokémon's image
  useEffect(() => {
    getDominantColor(
      `${pokemon.sprites.other.dream_world.front_default}`,
      setRgb
    );
  }, [pokemon]);

  
  // Render the content of the active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "about":
        return (
          <div className="about">
            <h2 className="text-center font-extrabold text-2xl mt-1">About</h2>
            <p className="text-2xl mt-2 mb-2">
              <span>Height:</span>{" "}
              <span className="font-bold">{pokemon.height}m</span>
            </p>
            <p className="text-2xl mt-1 mb-2">
              <span>Weight:</span>{" "}
              <span className="font-bold">{pokemon.weight}kg</span>
            </p>
            <div className="flex gap-20 items-center mb-2">
              <p className="text-2xl not">Abilities:</p>
              <ul>
                {pokemon.abilities.map((ability) => (
                  <li
                    key={ability.ability.name}
                    className="poki-ability text-2xl font-bold"
                  >
                    {ability.ability.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      case "stats":
        return (
          <div className="stats">
            <h2 className="text-center font-bold text-xl">Stats</h2>
            <ul>
              {pokemon.stats.map((stat) => (
                <li
                  key={stat.stat.name}
                  className="flex stats-list text-xl gap-7 items-center mb-2 mt-2"
                >
                  <span className="stats-text capitalize">
                    {stat.stat.name}:{" "}
                  </span>{" "}
                  <span className="progress">
                    <ProgressBar
                      completed={`${stat.base_stat}`}
                      baseBgColor={"#7b7b7b"}
                      bgColor={
                        theme === "theme1"
                          ? "#de527f"
                          : theme === "theme2"
                          ? "#39badf"
                          : theme === "theme3"
                          ? "#e1a725"
                          : ""
                      }
                      isLabelVisible={false}
                      animateOnRender={true}
                      borderRadius={"0px"}
                      height={"10px"}
                    />
                  </span>
                  <span className="text-sm font-bold">{stat.base_stat}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      case "similar":
        return (
          <div className="similar">
            <h2 className="text-center font-bold text-xl">Similar</h2>
            <ul className="flex justify-center items-center simi gap-5">
              {similarPokemon.slice(0, 2).map((poke, index) => (
                <li key={index} className="list-card">
                  <span className="list-details">
                    <span className="list-bg">
                      <img
                        src={poke.sprites.other.dream_world.front_default}
                        alt={poke.name}
                      />
                    </span>
                    <p className="font-bold text-2xl capitalize">{poke.name}</p>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="detail-modal">
      <div className="bg-white detail-content">
        <div
          style={{
            margin: "0 auto",
            background: `linear-gradient(to bottom, rgb(${rgb
              .map((v) => v + 30)
              .join(",")}), rgb(${rgb.map((v) => v - 30).join(",")}))`,
          }}
          className="poki-back"
        >
          <div className="pokis-image">
            <img src={pokemon.sprites.other.dream_world.front_default} alt="" />
          </div>
          <div className="arrow" onClick={onClose}>
            <img src={arrow} alt="" />
          </div>
        </div>
        <div className="">
          <h2 className="text-center font-bold text-4xl poki-name">
            {pokemon.name}
          </h2>
          {renderTabContent()}
          <div className="tabs">
            <div
              className={`tab ${activeTab === "about" ? "active" : ""}`}
              onClick={() => setActiveTab("about")}
            >
              About
            </div>
            <div
              className={`tab text-center ${
                activeTab === "stats" ? "active" : ""
              }`}
              onClick={() => setActiveTab("stats")}
            >
              Stats
            </div>
            <div
              className={`tab ${activeTab === "similar" ? "active" : ""}`}
              onClick={() => setActiveTab("similar")}
            >
              Similar
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailView;
