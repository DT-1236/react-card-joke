import React, { Component } from 'react';
import styled from 'styled-components';

const StyledCard = styled.div`
  position: absolute;
  top: 15%;
  transform: rotate(${props => props.angle}deg);
`;

class Card extends Component {
  render() {
    return (
      <StyledCard className="Card" angle={this.props.angle}>
        <img src={this.props.img} alt="Some Card!" />
      </StyledCard>
    );
  }
}

export default Card;
