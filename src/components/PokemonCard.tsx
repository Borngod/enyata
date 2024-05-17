import React from "react";
import { Card, Button } from "antd";
import styled from "styled-components";
import eye from "../assets/eye.png";

// Type for the properties expected by the PokemonCard component
type PokemonCardProps = {
  pokemon: {
    name: string;
    sprites: {
      other: {
        dream_world: {
          front_default: string;
        };
      };
    };
  };
  onView: (pokemon: any) => void; // Function to handle viewing a Pokémon's details
};

// Functional component to display a single Pokémon card
const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, onView }) => {
  return (
    <div className={`card`}>
      <div className="card-content">
        {/* Image container */}
        <div className="image-bg">
          <img
            src={pokemon.sprites.other.dream_world.front_default}
            alt=""
            className="poke-ing"
          />
        </div>
        {/* Pokémon name */}
        <div>
          <p className="font-bold text-2xl text-center m-7">{pokemon.name}</p>
        </div>
        {/* View Pokémon button */}
        <div className={`view-poki`} onClick={() => onView(pokemon)}>
          <p className="text-center text-lg text-white ml-7 max-[1390px]:ml-4">View Pokemon</p>
          <img src={eye} alt="" />
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
