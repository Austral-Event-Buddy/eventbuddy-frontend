import React, { useEffect, useRef } from 'react';
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

function Map({ location , interactive = false}) {

    const mapContainer = useRef(null);
    const map = useRef(null);

    useEffect(() => {
        if (map.current) return;
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [location[1], location[0]],
            zoom: 16,
            interactive: interactive
        });
        new mapboxgl.Marker({ color: 'red' })
            .setLngLat([location[1], location[0]])
            .addTo(map.current);
    }, [location]);
    return <div ref={mapContainer} className="cropped-image" style={{width:'100%'}}/>;
}

export default Map;