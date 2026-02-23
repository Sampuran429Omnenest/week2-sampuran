import type React from "react";
import { useState } from "react";

interface SearchBarProps{
    onSearch:(query:string)=>void;
    onFilterChange:(sector:string)=>void;
    placeholder?:string;
}
const SearchBar:React.FC<SearchBarProps>=({
    onSearch,
    onFilterChange,
    placeholder='Search stocks...',
})=>{
    const [query,setQuery]=useState('');
    const handleInputChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setQuery(e.target.value);
        onSearch(e.target.value);
    };
    //keyboard event
    const handleKeyDown=(e:React.KeyboardEvent<HTMLInputElement>)=>{
        if(e.key==='Enter') onSearch(query);
        if(e.key==='Escape') {setQuery('');onSearch('');}
    };
    //mouse event
    const handleClear=(e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        setQuery('');
        onSearch('');
    }
    //change event for <select>
    const handleSectorChange=(e:React.ChangeEvent<HTMLSelectElement>)=>{
        onFilterChange(e.target.value);
    }
    return(
        <div
        style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            justifyContent: "center",
            marginBottom: 30,
            flexWrap: "wrap",
        }}
        >
            <input 
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            style={{
                padding: "10px 14px",
                borderRadius: 8,
                border: "1px solid #D1D5DB",
                width: 260,
                fontSize: 14,
                outline: "none",
            }}
            />
            <button
            onClick={handleClear}
            style={{
                padding: "10px 16px",
                borderRadius: 8,
                border: "none",
                background: "#1E40AF",
                color: "#fff",
                cursor: "pointer",
                fontWeight: 500,
            }}
            >Clear
            </button>
            <select onChange={handleSectorChange}
            style={{
                padding: "10px 14px",
                borderRadius: 8,
                border: "1px solid #D1D5DB",
                fontSize: 14,
                background: "#fff",
            }}
            >
                <option value="">Sectors</option>
                <option value="Technology">Technology</option>
                <option value="Finance">Finance</option>
                <option value="Automotive">Automotive</option>
            </select>
        </div>
    );
}
export default SearchBar;