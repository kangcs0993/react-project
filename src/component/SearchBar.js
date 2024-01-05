export default function SearchBar({
    setSearch
}){
    function searchBar(event){
        setSearch(document.getElementById("searchBar").value)
    }

    return(
        <>
            <input id="searchBar"></input>
            <button onClick={searchBar}>search</button>
        </>
    )
}