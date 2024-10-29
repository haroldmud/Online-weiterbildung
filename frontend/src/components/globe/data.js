const data = {
  all: {
    loc: [
      {
        name: "Germany",
        lat: 51.165690999999995,
        lng: 10.451526,
        size: 0.1,
        color: "white",
      },
      {
        name: "Rwanda",
        lat: -1.940278,
        lng: 29.873888,
        size: 0.1,
        color: "white",
      },
    ],
    arcs: [
      {
        name: "germany",
        startLat: 51.165690999999995,
        startLng: 10.451526,
        endLat: -1.940278,
        endLng: 29.873888,
        color: ["blue", "red"],
        stroke: 0.1,
      },
      {
        name: "rwanda",
        startLat: -1.940278,
        startLng: 29.873888,
        endLat: 51.165690999999995,
        endLng: 10.451526,
        color: ["blue", "red"],
        stroke: 0.1,
      },
    ],
  },
};
export default data;
