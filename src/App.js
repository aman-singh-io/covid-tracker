import {
  Card,
  CardContent,
  FormControl,
  MenuItem,
  Select,
} from '@material-ui/core'
import { useState, useEffect } from 'react'
import './App.css'
import HorizontalBarChart from './HorizontalBar'
import InfoBox from './InfoBox'
import LineGraph from './LineGraph'
import Map from './Map'
import MultiAxisLine from './MultiAxisBar'
import PieChart from './PieChart'
import Table from './Table'
import { formatNumber, sortData } from './utils'
import ReactPlayer from 'react-player'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'

function App() {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('worldwide')
  const [countryInfo, setCountryInfo] = useState({})
  const [tableData, setTableData] = useState([])
  const [mapCenter, setMapCenter] = useState([31.505, 20])
  const [mapZoom, setMapZoom] = useState(3)
  const [mapCountries, setMapCountries] = useState([])
  const [casesType, setCasesType] = useState('cases')

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all?yesterday=true')
      .then((res) => res.json())
      .then((data) => setCountryInfo(data))
  }, [])

  console.log('render app')

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries').then((res) =>
        res.json().then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
            cases: country.cases,
            flag: country.countryInfo.flag,
          }))
          setCountries(countries)
          const sortedData = sortData(countries)
          setTableData(sortedData)
          setMapCountries(data)
        })
      )
    }
    getCountriesData()
  }, [])

  const onCountryChange = async (newValue) => {
    const countryCode = newValue.value

    setCountry(countryCode)
    console.log('------->>>>', newValue)
    const url =
      countryCode === 'worldwide'
        ? 'https://disease.sh/v3/covid-19/all?yesterday=true'
        : `https://disease.sh/v3/covid-19/countries/${countryCode}?yesterday=true`

    let response = await fetch(url)
    let data = await response.json()
    setCountryInfo(data)
    console.log(data.countryInfo)

    if (countryCode === 'worldwide') {
      setMapCenter([21.505, 30])
      setMapZoom(3)
    } else {
      setMapCenter([data.countryInfo.lat, data.countryInfo.long])
      setMapZoom(5)
    }
  }

  return (
    <div className='app'>
      <div className='app__left'>
        {/* Header */}
        <div className='app__header'>
          <h1>
            <i class='fas fa-viruses' aria-hidden='true'></i> COVID-19 TRACKER
          </h1>{' '}
          {/*
          <FormControl className='app__dropdown'>
            <Select
              variant='outlined'
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value='worldwide'>Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl> */}
          <Autocomplete
            onChange={(event, newValue) => {
              if (newValue) {
                onCountryChange(newValue)
              }
            }}
            id='combo-box-demo'
            options={countries}
            getOptionLabel={(option) => option.name}
            style={{ width: 300 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label='Select Country'
                variant='outlined'
              />
            )}
          />
        </div>
        {/* Info Box */}
        <div className='app__stats'>
          <InfoBox
            active={casesType === 'cases'}
            title='Coronavirus Cases'
            total={formatNumber(countryInfo.cases)}
            cases={formatNumber(countryInfo.todayCases)}
            onClick={() => setCasesType('cases')}
            isBlack
            icon='fas fa-lungs-virus fa-2x'
          />
          <InfoBox
            active={casesType === 'recovered'}
            title='Recovered'
            total={formatNumber(countryInfo.recovered)}
            cases={formatNumber(countryInfo.todayRecovered)}
            onClick={() => setCasesType('recovered')}
            icon='fas fa-virus-slash fa-2x'
            isGreen
          />
          <InfoBox
            active={casesType === 'deaths'}
            title='Deaths'
            total={formatNumber(countryInfo.deaths)}
            cases={formatNumber(countryInfo.todayDeaths)}
            onClick={() => setCasesType('deaths')}
            isRed
            icon='fas fa-skull-crossbones fa-2x'
          />
        </div>
        {/* Map */}
        <Map
          center={mapCenter}
          zoom={mapZoom}
          countries={mapCountries}
          casesType={casesType}
        />

        <div className='app__graphBottom'>
          <div className='app__graphBottomCard'>
            <LineGraph casesType={casesType} className='app__graphLine' />
          </div>
          <div className='app__graphBottomCard'>
            <HorizontalBarChart
              totalDeaths={countryInfo.deaths}
              totalRecovered={countryInfo.recovered}
              totalCases={countryInfo.cases}
            />
          </div>
        </div>
      </div>
      <Card className='app__right'>
        <CardContent>
          <h3>Lives Cases by Country </h3>
          {/* Table */}
          <Table countries={tableData} />
          <h3 style={{ marginBottom: '20px', marginTop: '20px' }}>Symptoms</h3>
          <ReactPlayer
            url='https://youtu.be/U8r3oTVMtQ0'
            width='100%'
            height='300px'
          />
        </CardContent>
      </Card>
    </div>
  )
}

export default App
