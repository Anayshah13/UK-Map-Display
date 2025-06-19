let map;

const default_img = "engscot(2).png";
const locations = [
  {
    name: "Natural History Museum",
    position: { lat: 51.4967, lng: -0.1764 },
    photo: "location-images/history.jpg",
  },
  {
    name: "Big Ben",
    position: { lat: 51.5007, lng: -0.1246 },
    photo: "location-images/bigben.jpg",
  },
  {
    name: "Westminster",
    position: { lat: 51.4945, lng: -0.1439 },
    photo: "location-images/westminster.jpg",
  },
  {
    name: "Nottingham",
    position: { lat: 52.9548, lng: -1.1581 },
    photo: "location-images/nottingham.jpg",
  },
  {
    name: "Newcastle United Stadium (St James' Park)",
    position: { lat: 54.9756, lng: -1.6214 },
    photo: "location-images/newcastle.jpg",
  },
  {
    name: "Tower Bridge",
    position: { lat: 51.5055, lng: -0.0865 },
    photo: "location-images/towerbridge.jpg",
  },
  {
    name: "Sky Garden",
    position: { lat: 51.5120, lng: -0.0836 },
    photo: "location-images/skygarden.jpg",
  },
  {
    name: "Silverstone Circuit",
    position: { lat: 52.0786, lng: -1.0169 },
    photo: "location-images/silverstone.jpg",
  },
  {
    name: "Cambridge",
    position: { lat: 52.2053, lng: 0.1218 },
    photo: "location-images/cambridge.jpg",
  },
  {
    name: "Harry Potter Studios",
    position: { lat: 51.6920, lng: -0.4186 },
    photo: "location-images/harrypotter.jpg",
  },
  {
    name: "Edinburgh",
    position: { lat: 55.9533, lng: -3.1883 },
    photo: "location-images/edinburgh-house.jpg",
  },
  {
    name: "Victoria Street (Diagon Alley Inspiration)",
    position: { lat: 55.9486, lng: -3.1930 },
    photo: "location-images/victoria street.jpg",
  },
  {
  name: "Inverness Castle",
  position: { lat: 57.4778, lng: -4.2247 },
  photo: "location-images/inverness.jpg",
  },
  {
  name: "The Kelpies",
  position: { lat: 56.0200, lng: -3.7533 },
  photo: "location-images/kelpies.jpg", 
  }

];


function initMap() {
  const ukBounds = {
    north: 61.0,
    south: 49.5,
    west: -11.0,
    east: 2.0,
  };

  const birmingham = { lat: 52.4862, lng: -1.8904 };

  map = new google.maps.Map(document.getElementById("map"), {
    center: birmingham,
    zoom: 6,
    restriction: {
      latLngBounds: ukBounds,
    },
    minZoom: 3,
    maxZoom: 16,
  });

  map.panBy(100, 50);

  locations.forEach((loc) => {
    const marker = new google.maps.Marker({
      position: loc.position,
      map: map,
      title: loc.name,
    });

    marker.addListener("mouseover", () => {
      showPhoto(loc.photo, loc.name);
    });

    marker.addListener("mouseout", hidePhoto);

    marker.addListener("click", () => {
      smoothZoomTo(loc.position, 11); 
      map.panTo(loc.position);
    });
  });
}

function smoothZoomTo(targetPosition, targetZoom) {
  const currentZoom = map.getZoom();
  const steps = Math.abs(targetZoom - currentZoom);
  const direction = targetZoom > currentZoom ? 1 : -1;
  let zoomLevel = currentZoom;

  map.setCenter(targetPosition);

  const interval = setInterval(() => {
    zoomLevel += direction;
    map.panTo(targetPosition);
    map.setZoom(zoomLevel);

    if (zoomLevel === targetZoom) {
      clearInterval(interval);
    }
  }, 100); 
}

function showPhoto(path, caption) {
  const photo = document.getElementById("location-photo");
  const photoCaption = document.getElementById("photo-caption");
  photo.src = path;
  photo.alt = caption;
  photoCaption.textContent = caption;
}

function hidePhoto() {
  const photo = document.getElementById("location-photo");
  const photoCaption = document.getElementById("photo-caption");
  photo.src = default_img;
  photoCaption.textContent = "hover over a image to view images";
}

function updateTime() {
  const now = new Date();

  const londonTime = now.toLocaleTimeString('en-GB', {
    timeZone: 'Europe/London',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  const indiaTime = now.toLocaleTimeString('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  document.getElementById("uk-time").textContent = `UK Time(GMT): ${londonTime}`;
  document.getElementById("india-time").textContent = `India Time(IST): ${indiaTime}`;
}

setInterval(updateTime, 1000);
updateTime();

const script = document.createElement("script");
script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
script.async = true;
script.defer = true;
document.head.appendChild(script);

//api key: AIzaSyCYpAQTphypvzb53PTN0XEUoQG2kJFnMnw