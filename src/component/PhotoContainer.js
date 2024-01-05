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
    }, [search])

    async function searchPhotos(){
        if(search.length > 0){
            client.photos.search({query, per_page: 1}).then(photo => console.log(photo))
            setPhotos(client.photos.search({query, per_page: 1}))
        }
    }

    console.log(photos)

    return(
        <div>
        </div>
    )
}