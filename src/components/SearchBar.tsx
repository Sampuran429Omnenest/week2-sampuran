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
        <div>
            <input 
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            style={{flex:1,padding:8,borderRadius:4}}
            />
            <button
            onClick={handleClear}>Clear</button>
            <select onChange={handleSectorChange}>
                <option value="">Sectors</option>
                <option value="Technology">Technology</option>
                <option value="Finance">Finance</option>
                <option value="Automotive">Automotive</option>
            </select>
        </div>
    );
}
export default SearchBar;