export default function SearchBar({
    setSearch
}){
    function searchBar(){
        setSearch(document.getElementById("searchBar").value)
    }

    return(
        <div id="searchBarContainer">
            <input id="searchBar"></input>
            <button onClick={searchBar}>search</button>
        </div>
    )
}