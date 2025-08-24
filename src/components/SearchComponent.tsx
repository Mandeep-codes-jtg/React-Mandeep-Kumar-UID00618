import { useState } from 'react';

interface SearchComponentProps {
  onSearch: (query: string) => void;
  suggest: (query: string) => void;
}

const SearchComponent = ({ onSearch, suggest }: SearchComponentProps) => {
  const [query, setQuery] = useState<string>('');

  const handleSearch = () => {
    const trimmed = query.trim()
    setQuery(trimmed)
    if (trimmed) {
      onSearch(trimmed);
    }
  };

  return (
    <div style={{ marginBottom: '1rem' }}>
      <input
        type="text"
        placeholder="Search GitHub users"
        value={query}
        onChange={(e) => {setQuery(e.target.value);suggest(e.target.value)}}
        
        style={{ padding: '0.5rem', width: '250px' }}
        onKeyDown={(e)=>{if(e.key==="Enter"){handleSearch()}}}
      />
      <button onClick={handleSearch} style={{ marginLeft: '1rem' }}>
        Search
      </button>
    </div>
  );
};

export default SearchComponent;
