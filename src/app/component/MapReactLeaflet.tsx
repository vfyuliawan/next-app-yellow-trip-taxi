"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-routing-machine";
import { useEffect } from "react";
import "@/app/assets/MapReactLeaflet.css"; 


const RoutingMachine = ({ pickup, dropoff }: { pickup: L.LatLngTuple; dropoff: L.LatLngTuple }) => {
  const map = useMap();

  useEffect(() => {
    //@ts-ignore
    const routingControl = L.Routing.control({
      waypoints: [L.latLng(pickup[0], pickup[1]), L.latLng(dropoff[0], dropoff[1])],
      routeWhileDragging: true,
    }).addTo(map);

    return () => {
      map.removeControl(routingControl);
    };
  }, [map, pickup, dropoff]);

  return null;
};

const RoutingMachine2 = ({ pickup, dropoff }: { pickup: L.LatLngTuple; dropoff: L.LatLngTuple }) => {
    const map = useMap();
  
    useEffect(() => {
        //@ts-ignore
      const routingControl = L.Routing.control({
        waypoints: [L.latLng(pickup), L.latLng(dropoff)],
        routeWhileDragging: true,
        addWaypoints: false, 
        draggableWaypoints: false,
        lineOptions: {
          styles: [
            {
              color: "green",
              weight: 6,
            },
          ],
        },
        createMarker: () => null, 
      }).addTo(map);
  
      return () => {
        map.removeControl(routingControl);
      };
    }, [map, pickup, dropoff]);
  
    return null;
  };

export const MapReactLeaflet = (props: {
  pickup: { latitud: number; longitude: number };
  dropoff: { latitud: number; longitude: number };
}) => {
  const pickup = [props.pickup.latitud, props.pickup.longitude] as L.LatLngTuple;
  const dropoff = [props.dropoff.latitud, props.dropoff.longitude] as L.LatLngTuple;

  // Custom icons
  const pickupIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png", 
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const dropoffIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png", 
    iconSize: [40, 40],
  });

  return (
    <MapContainer
      style={{ height: "500px", width: "100%" }}
      center={pickup}
      zoom={5}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={pickup} icon={pickupIcon} eventHandlers={{
        mouseover: (e) => {
          e.target.openPopup(); 
        },
        mouseout: (e) => {
          e.target.closePopup(); 
        },
      }}>
        <Popup>
          <b>Pickup Location</b>
          <br />
          Latitude: {props.pickup.latitud}
          <br />
          Longitude: {props.pickup.longitude}
        </Popup>
      </Marker>
      <Marker position={dropoff} icon={dropoffIcon}  eventHandlers={{
        mouseover: (e) => {
          e.target.openPopup();
        },
        mouseout: (e) => {
          e.target.closePopup(); 
        },
      }}>
        <Popup>
          <b>Drop-off Location</b>
          <br />
          Latitude: {props.dropoff.latitud}
          <br />
          Longitude: {props.dropoff.longitude}
        </Popup>
      </Marker>
      <RoutingMachine2  pickup={pickup} dropoff={dropoff} />
    </MapContainer>
  );
};
