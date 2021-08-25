import numeral from 'numeral'
import { Popup, Circle } from 'react-leaflet'

const casesTypeColors = {
  cases: {
    hex: '#CC1034',
    rgb: 'rgb(204, 16, 52)',
    half_op: 'rgba(204, 16, 52, 0.5)',
    multiplier: 100000,
  },
  recovered: {
    hex: '#7fd922',
    rgb: 'rgb(125, 215, 29)',
    half_op: 'rgba(125, 215, 29, 0.5)',
    multiplier: 100000,
  },
  deaths: {
    hex: '#cc1034',
    rgb: 'rgb(251, 68, 67)',
    half_op: 'rgba(251, 68, 67, 0.5)',
    multiplier: 2000000,
  },
}

export const sortData = (data) => {
  const sortedData = [...data]
  return sortedData.sort((a, b) => b.cases - a.cases)
}

export const formatNumber = (num) => {
  return numeral(num).format('+0.0a')
}

export const mapHandler = (countries, casesType) =>
  countries.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      pathOptions={{ color: casesTypeColors[casesType].hex }}
      radius={Math.sqrt(
        country[casesType] * casesTypeColors[casesType].multiplier
      )}
      fillOpacity={0.2}
    >
      <Popup>
        <div className='info-container'>
          <div
            className='info-flag'
            style={{
              backgroundImage: `url(${country.countryInfo.flag})`,
            }}
          ></div>
          <div className='info-name'>{country.country}</div>
          <div className='info-confirmed'>
            Cases: {numeral(country.cases).format('0,0')}
          </div>
          <div className='info-recovered'>
            Recovered: {numeral(country.recovered).format('0,0')}
          </div>
          <div className='info-deaths'>
            Deaths: {numeral(country.deaths).format('0,0')}
          </div>
        </div>
      </Popup>
    </Circle>
  ))
