import React, { Component } from 'react';
import styled from 'styled-components';

const StyledCard = styled.div`
  position: absolute;
  top: 15%;
  transform: rotate(${props => props.angle}deg)
    translate(${props => props.xshift}px, ${props => props.yshift}px);
`;

class Card extends Component {
  render() {
    return (
      <StyledCard
        className="Card"
        angle={this.props.angle}
        xshift={this.props.xshift}
        yshift={this.props.yshift}
      >
        <img src={this.props.img} alt="Some Card!" />
      </StyledCard>
    );
  }
}

export default Card;
