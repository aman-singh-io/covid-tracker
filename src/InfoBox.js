import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import './InfoBox.css'

function InfoBox({
  title,
  cases,
  active,
  total,
  isRed,
  isBlack,
  isGreen,
  icon,
  ...props
}) {
  const colorCheck = () => {
    if (isBlack) {
      return '#1d2c4d'
    }
    if (isRed) {
      return '#cc1034'
    } else {
      return '#7fd922'
    }
  }
  return (
    <Card
      className={`infoBox ${active && 'infoBox--selected'} ${
        isRed && 'infoBox--isRed'
      } ${isBlack && 'infoBox--isBlack'}`}
      onClick={props.onClick}
    >
      <div className='infoBox__container'>
        <i
          className={icon}
          aria-hidden='true'
          style={{
            marginLeft: '2rem',
            color: isBlack ? '#1d2c4d' : isRed ? '#cc1034' : '#7fd922',
          }}
        ></i>
        <CardContent>
          <Typography
            className='infoxBox__title'
            color='textSecondary'
            variant='h6'
            component='h2'
            style={{
              color: isBlack ? '#1d2c4d' : isRed ? '#cc1034' : '#7fd922',
            }}
          >
            {title}
          </Typography>
          <h2
            className='infoxBox__cases'
            style={{
              color: isBlack ? '#1d2c4d' : isRed ? '#cc1034' : '#7fd922',
            }}
          >
            {cases} Yesterday
          </h2>
          <Typography className='infoxBox__total' color='textSecondary'>
            {total} Total
          </Typography>
        </CardContent>
      </div>
    </Card>
  )
}

export default InfoBox
