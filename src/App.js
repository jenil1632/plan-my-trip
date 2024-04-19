import React, { useState } from 'react';
import styled from 'styled-components';
import { TailSpin } from 'react-loader-spinner'; 
import Searchbox from './components/Searchbox/Searchbox';
import Dropdown from './components/Dropdown/Dropdown';
import Resultcard from './components/Resultcard/Resultcard';
import WeatherCard from './components/WeatherCard/WeatherCard';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-image: url('${process.env.PUBLIC_URL}/banner.jpg'); /* Replace with background image URL */
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  color: #fff;
  baxkground-attachment: fixed;
  position: relative;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  margin-bottom: 20px;
  align-items: baseline;
`;

const Button = styled.button`
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #333;
  color: #fff;
  cursor: pointer;
  margin: 1em;
  height: 43px;
`;

const Results = styled.div`
  width: 100%;
  padding: 20px;
  border-radius: 4px;
`;

const ResultContainer = styled.div`
  width : 90%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const H2 = styled.h2`
  text-align: center;
`;

const H1 = styled.h1`
  text-align: center;
`;

const ResultHeader = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const App = () => {
  const seasons = ['Dec-Feb', 'Mar-May', 'Jun-Aug', 'Sept-Nov'];
  const travelTypes = ['Solo', 'Friends', 'Family', 'Business', 'Romantic'];
  const durations = ['1 Day', '2 Days', '3 days', '4 days', '5 days', '6 days', '7 days', '8+ days'];

  const [destination, setDestination] = useState('');
  const [season, setSeason] = useState('');
  const [travelType, setTravelType] = useState('');
  const [duration, setDuration] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const [searchedDestination, setSearchedDestination] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(
      `Searching for ${destination} in ${season} for ${travelType} trip lasting ${duration}`
    );
    const params = {
      destination : destination,
      season : season,
      travelType : travelType,
      duration : duration
    };

    const fetchItin = async (params) => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8080/itin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(params), // Convert data to JSON format
        }); 
        const itinData = await response.json();
        setResults(itinData);
        setSearchedDestination(destination);
      } catch (error) {
        console.error('Error fetching data:', error);
        alert('Something Went wrong. Please refresh the page and Try again!')
      }
      setLoading(false);
    };

    fetchItin(params);
  };

  return (
    <Container>
      <h1>Plan Your Trip</h1>
      <Form onSubmit={handleSubmit}>
        <Searchbox value={destination} onChange={setDestination} />
        <Dropdown label="When?" options={seasons} onChange={setSeason} />
        <Dropdown label="With Whom?" options={travelTypes} onChange={setTravelType} />
        <Dropdown label="How long?" options={durations} onChange={setDuration} />
        <Button type="submit" disabled={loading}>Search</Button>
      </Form>
      {loading ? (
        <div className="overlay">
          <TailSpin color="#00BFFF" height={80} width={80} />
        </div>
      ) : (
        <>
      {results && <Results>
        <H2>Here you Go!</H2>
        <ResultHeader>
          <H1>{searchedDestination}</H1>
          <WeatherCard weatherData={results.weatherData}></WeatherCard>
        </ResultHeader>
        <ResultContainer>
        {results.itineraryByDays.map((itin)=>
        <Resultcard key={itin.day} imgUrl={results.urls[itin.day-1]} activities={itin.activities} 
        highlight={itin.highlight} heading={itin.day}></Resultcard>)}
        </ResultContainer>
      </Results>}
        </>
      )}
    </Container>
  );
};

export default App;
