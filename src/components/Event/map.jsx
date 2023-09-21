import React, { useEffect, useRef } from 'react';
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

function Map({ location }) {

    const mapContainer = useRef(null);
    const map = useRef(null);

    useEffect(() => {
        if (map.current) return;
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [location[1], location[0]],
            zoom: 16,
            interactive: false
        });
        new mapboxgl.Marker({ color: 'red' })
            .setLngLat([location[1], location[0]])
            .addTo(map.current);
    }, [location]);

    return <div ref={mapContainer} style={{ width: '100%', height: '400px' }} className="cropped-image" />;
}

export default Map;
