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
  margin-top: 5%;
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
    this.getNewDeck = this.getNewDeck.bind(this);
  }

  async getNewDeck() {
    const response = await axios.get(newDeckURI);
    this.setState({ deckId: response.data.deck_id, cards: [] });
  }

  async componentDidMount() {
    this.getNewDeck();
  }

  async draw() {
    if (this.state.cards.length < 52) {
      const response = await axios.get(drawCardURI(this.state.deckId));
      const cards = [...this.state.cards];
      cards.push(this.renderCard(response.data.cards[0]));
      this.setState({ cards });
    }
  }

  renderCard(card) {
    return (
      <Card
        img={card.image}
        suit={card.suit}
        value={card.value}
        key={card.code}
        angle={Math.floor((Math.random() - 0.5) * 90)}
        xshift={Math.floor((Math.random() - 0.5) * 20)}
        yshift={Math.floor((Math.random() - 0.5) * 20)}
      />
    );
  }

  render() {
    return (
      <StyledDeck className="Deck">
        {this.state.cards.length === 52 ? (
          <StyledButton onClick={this.getNewDeck}>New Deck?</StyledButton>
        ) : (
          <StyledButton onClick={this.draw}>Get a new Card!</StyledButton>
        )}

        {this.state.deckId ? this.state.cards : 'Loading...'}
      </StyledDeck>
    );
  }
}

export default Deck;
