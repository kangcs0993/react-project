import {useState} from "react";
import SearchBar from "./component/SearchBar";
import MapContainer from "./component/ResultContainer";

export default function App(){
    const [search, setSearch] = useState("");
    
    return(
        <>
            <SearchBar setSearch={setSearch}></SearchBar>

            <hr>
            </hr>
            
            <MapContainer search={search}></MapContainer>
        </>
    )
}