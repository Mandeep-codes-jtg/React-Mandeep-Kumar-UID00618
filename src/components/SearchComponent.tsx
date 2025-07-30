import { useState } from 'react';

interface SearchComponentProps {
  onSearch: (query: string) => void;
}

const SearchComponent = ({ onSearch }: SearchComponentProps) => {
  const [query, setQuery] = useState<string>('');

  const handleSearch = () => {
    setQuery(query.trim())
    if (query) {
      onSearch(query);
    }
  };

  return (
    <div style={{ marginBottom: '1rem' }}>
      <input
        type="text"
        placeholder="Search GitHub users"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: '0.5rem', width: '250px' }}
      />
      <button onClick={handleSearch} style={{ marginLeft: '1rem' }}>
        Search
      </button>
    </div>
  );
};

export default SearchComponent;
