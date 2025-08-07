const controlOptions = [
  {
    id: 1,
    name: 'Map',
    pageRoute: '/mapscreen',
    src: '/homescreen_icons/map_image.png',
    altText: 'Map Icon',
  },
  {
    id: 2,
    name: 'Party',
    pageRoute: '/partyscreen',
    src: '/homescreen_icons/party_image.png',
    altText: 'Party Icon',
    disabled: false, // Set to true if party screen is not implemented
  },
];

export default controlOptions;
