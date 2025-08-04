const startsVilleOptions = [
  {
    id: 1,
    name: 'Guild',
    pageRoute: '/guildscreen',
    src: '/homescreen_icons/guild_building.png',
    altText: 'Guild Icon',
  },
  {
    id: 2,
    name: 'Inn',
    pageRoute: '/innscreen',
    src: '/homescreen_icons/inn_building.png',
    altText: 'Inn Icon',
    disabled: true, // Assuming the Inn is not yet implemented
  },
  {
    id: 3,
    name: 'Market',
    pageRoute: '/marketscreen',
    src: '/homescreen_icons/market_stall.png',
    altText: 'Market Icon',
    disabled: true, // Assuming the Inn is not yet implemented
  },
];

export default startsVilleOptions;
