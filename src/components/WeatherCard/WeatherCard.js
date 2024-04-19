import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
    margin: 16px;
    width: 300px;
    display: flex;
    align-items: center;
`;

const Data = styled.div`
    display: flex;
    flex-direction: column;
`;

const Summary = styled.span`
    font-size: 24px;
`

const WeatherCard = ({weatherData}) => {

  const iconUrl= `https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`;

  return (
    <Card>
        <img src={iconUrl} alt={weatherData.summary}/>
        <Data>
            <Summary>{weatherData.summary}</Summary>
            <span>Temp: {weatherData.temp}°C</span>
            <span>Humidity : {weatherData.humidity}%</span>
        </Data>
    </Card>
  );
};

export default WeatherCard;