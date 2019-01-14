import React, { Component } from 'react';
import axios from 'axios';
import Card from './Card';
import styled from 'styled-components';

const StyledDeck = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledButton = styled.button`
  display: relative;
  margin-top: 10%;
`;

const newDeckURI =
  'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';
function drawCardURI(deck_id) {
  return `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`;
}

class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      deckId: null
    };
    this.draw = this.draw.bind(this);
    this.renderCard = this.renderCard.bind(this);
  }

  async componentDidMount() {
    const response = await axios.get(newDeckURI);
    this.setState({ deckId: response.data.deck_id });
  }

  async draw() {
    const response = await axios.get(drawCardURI(this.state.deckId));
    const cards = [...this.state.cards];
    cards.push(this.renderCard(response.data.cards[0]));
    this.setState({ cards });
  }

  renderCard(card) {
    return (
      <Card
        img={card.image}
        suit={card.suit}
        value={card.value}
        key={card.code}
        angle={Math.floor((Math.random() - 0.5) * 90)}
      />
    );
  }

  render() {
    return (
      <StyledDeck className="Deck">
        <StyledButton onClick={this.draw}>Get a new Card!</StyledButton>
        {this.state.deckId ? this.state.cards : 'Loading...'}
      </StyledDeck>
    );
  }
}

export default Deck;
