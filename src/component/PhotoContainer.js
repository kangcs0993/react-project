import {createClient} from 'pexels';
import {useState, useEffect} from 'react';
import {PEXELS_API_KEY} from '../config';


export default function PhotoContainer({
    search
}){
    const client = createClient(PEXELS_API_KEY)
    const [photos, setPhotos] = useState([])

    const query = search

    useEffect(() => {
        searchPhotos()

        console.log("inside")
        console.log(photos)
    }, [search])

    async function searchPhotos(){
        if(search.length > 0){
            client.photos.search({query}).then(photo => {
                setPhotos(photo["photos"])
            })
        }
    }

    const photoList = photos.map((photo) => {
        return(
            <div className='cityPhoto'>
                <img src={photo["src"]["original"]}></img>
            </div>
        )
    })


    return(
        <>
            {photoList}
        </>
    )
}