import MapContainer from "./MapContainer"

export default function ResultContainer({
    search
}){
    return(
        <div>
            <div id="mapContainer">
                <MapContainer search={search}></MapContainer>
            </div>
        </div>
    )
}