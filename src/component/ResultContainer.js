import MapContainer from "./MapContainer"
import PhotoContainer from "./PhotoContainer"

export default function ResultContainer({
    search
}){
    return(
        <div>
            <MapContainer search={search}></MapContainer>

            <hr></hr>
    
            <PhotoContainer search={search}></PhotoContainer>
        </div>
    )
}