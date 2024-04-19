import React from 'react';
import styled from 'styled-components';

const Img = styled.img`
  padding: 10px;
  width: 80%;
  margin: 1em auto;
  display: block;
  max-height: 200px;
`;

const Card = styled.div`
    background-color: white;
    color: black;
    margin: 16px;
    width: 300px;
    border-radius: 4px;

`

const H3 = styled.div`
    text-align: center;
    margin-top: 8px;
`
const UL = styled.ul`
    display: block;
    width: 80%;
    margin: 1em auto;
    padding-left: 20px;
`
const LI = styled.li`
    padding-bottom: 0.5em;
`

const Resultcard = ({imgUrl, activities, highlight, heading}) => {

  let index = 0;

  return (
    <Card>
        <H3><strong>Day {heading}</strong></H3>
        <Img src={imgUrl} alt={highlight}/>
        <div>
            <UL>
                {activities.map((activity) => 
                    <LI key={index++}>{activity}</LI>
                )}
            </UL>
        </div>
    </Card>
  );
};

export default Resultcard;