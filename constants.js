export const API_URL = {
  internal: process.env.INTERNAL_API_URL || 'http://localhost:3001',
  rapidapi: 'community-open-weather-map.p.rapidapi.com'
}

export const internalAPI = {
  url: API_URL.internal,
  city: ''
}

export const rapid = {
  nexturl: 'https://' + API_URL.rapidapi + '/forecast?q=',
  pasturl: 'https://' + API_URL.rapidapi + '/onecall/timemachine',
  host: API_URL.rapidapi,
  key: process.env.RAPIDAPI_KEY || '3c5851de7amsh1226b702e3157f8p1b35e8jsn633cdea0f700', // ¯\_(ツ)_/¯ -- É client-side, não tem como não ser pública
  useQueryString: true
}
