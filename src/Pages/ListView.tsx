import Topbar from "../components/Topbar";
import { useState, useEffect } from "react";
import ThemeModal from "../components/ThemeModal";
import { Pagination, Input, Select } from "antd";
import axios from "axios";
import PokemonCard from "../components/PokemonCard";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import DetailView from "../components/DetailView";
import { ClipLoader } from "react-spinners";
import API_URL from "../services/BaseUrl";

// Type for theme context properties
type ThemeContextProps = {
  theme: string;
  setTheme: (newTheme: string) => void;
};

// Type for Pokemon data
type Pokemon = {
  name: string;
  url: string;
  [key: string]: any; // Additional properties can be added as needed
};

const { Search } = Input;
const { Option } = Select;

// Main component for displaying the list of Pokémon
const ListView: React.FC<ThemeContextProps> = ({ theme, setTheme }) => {
  const [switchTheme, setSwitch] = useState<boolean>(false);
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(8);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch the list of Pokémon from the API when the component mounts
  useEffect(() => {
    const fetchPokemonList = async (limit = 500) => {
      setLoading(true);
      try {
        const response = await axios.get<{ results: Pokemon[] }>(`${API_URL}/pokemon?limit=${limit}`);
        const detailedPokemonList = await Promise.all(
          response.data.results.map((p) =>
            axios.get<Pokemon>(p.url).then((res) => res.data)
          )
        );
        setPokemonList(detailedPokemonList);
        setFilteredPokemon(detailedPokemonList);
      } catch (error) {
        console.error("Error fetching Pokémon list:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPokemonList();
  }, []);

  // Filter Pokémon based on the search query
  useEffect(() => {
    const filtered = pokemonList.filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPokemon(filtered);
  }, [searchQuery, pokemonList]);

  // Handle the search input change
  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  // Handle the change in page size
  const handlePageSizeChange = (value: number) => {
    setPageSize(value);
  };

  // Handle the change in the current page
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Get the Pokémon to be displayed on the current page
  const paginatedPokemon = filteredPokemon.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className={`back ${theme}`}>
      <Topbar setSwitch={setSwitch} switchTheme={switchTheme} handle={handleSearch} />
      {switchTheme && (
        <ThemeModal setSwitch={setSwitch} setTheme={setTheme} theme={theme} />
      )}

      <PokemonGrid>
        {loading ? (
          <div className="clip">
            <ClipLoader
              color={
                theme === "theme1"
                  ? "#de527f"
                  : theme === "theme2"
                  ? "#39badf"
                  : theme === "theme3"
                  ? "#e1a725"
                  : undefined
              }
              size={70}
            />
          </div>
        ) : (
          paginatedPokemon.map((pokemon, index) => (
            <PokemonCard
              key={index}
              pokemon={pokemon}
              onView={setSelectedPokemon}
            />
          ))
        )}
      </PokemonGrid>

      <PaginationControls>
        <Pagination
          current={currentPage}
          total={filteredPokemon.length}
          pageSize={pageSize}
          onChange={handlePageChange}
        />
        <Select defaultValue={8} onChange={handlePageSizeChange}>
          <Option value={8}>8</Option>
          <Option value={16}>16</Option>
          <Option value={24}>24</Option>
        </Select>
      </PaginationControls>
      {selectedPokemon && (
        <DetailView
          pokemon={selectedPokemon}
          onClose={() => setSelectedPokemon(null)}
          theme={theme}
        />
      )}
    </div>
  );
};

export default ListView;

// Styled components for pagination controls
const PaginationControls = styled.div`
  display: flex;
  gap: 800px;
  align-items: center;
  position: relative;
  bottom: 30px;

  @media (max-width: 1400px) {
    gap: 700px;
  }
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

// Styled component for the Pokémon grid
const PokemonGrid = styled.div`
  margin-top: 80px;
  display: grid;
  height: 100%;
  min-height: 95vh;
  width: 100%; /* Fixed typo */
  grid-template-columns: repeat(4, 1fr); /* 4 columns for 2 rows */
  grid-gap: 15px;
  justify-content: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;
