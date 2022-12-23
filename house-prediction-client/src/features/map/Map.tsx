import React, { useEffect, useMemo, useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
    setPosition as setPrice,
} from './mapSlice'
import { selectSearchInput, setSearchInput } from "../search-bar/searchBarSlice";
import { predictPrice } from "../../services/predictionService";




const Map = () => {
    const lat = 31.9635712;
    const lng = 34.8101149;
    const dispatch = useAppDispatch();
    const positionInput = useAppSelector(selectSearchInput);
    const [marker, setMarker] = useState({ lat: lat, lng: lng, time: new Date(), });
    const center = useMemo(() => marker, [])
    const { isLoaded } = useLoadScript({ googleMapsApiKey:"" })
    const [ isMapLoaded, setIsMapLoaded ] = useState<google.maps.Map | boolean>(false)

    useEffect(() => {
        const item = {...positionInput.item, lat: marker.lat, lng: marker.lng};
        console.log(item);
        predictPrice(item).then((payload: any) => {
                console.log(payload.data);
                
            dispatch(setPrice(payload.data))
        })
    }, [marker])
    

    if (!isLoaded) return <div>Loading...</div>

    return (
        <GoogleMap
            mapContainerClassName="h-96 w-full mt-5"
            zoom={13}
            center={center}
            onLoad={(map) => {setTimeout(() => setIsMapLoaded(map))}}
            onClick={e => {
                setMarker({lat: e.latLng?.lat() ?? lat, lng: e.latLng?.lng() ?? lng, time: new Date()});
            }}
        >
            {isMapLoaded ? <Marker position={marker} /> : null}
        </GoogleMap>
    );

}

export default Map;

function setMapInstance(map: google.maps.Map): void {
    throw new Error("Function not implemented.");
}
