import React, { Component } from 'react'
import axios from 'axios';
import QuoteCard from './components/QuoteCard'
import LoadingSpinner from './components/LoadingSpinner';

const sampleQuote = {
    quote:
      "Facts are meaningless. You could use facts to prove anything that's even remotely true.",
    character: 'Homer Simpson',
    image:
      'https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FHomerSimpson.png?1497567511939'
  }
  

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      quote: sampleQuote,
      loading: false
      
    }
    
    this.getQuote = this.getQuote.bind(this);
  }
  
  getQuote() {
    this.setState( { loading: true }, () => {
      // Send the request  
      axios.get('https://simpsons-quotes-api.herokuapp.com/quotes')
      // Extract the DATA from the received response  
      .then(response => response.data) 
      // Use this data to update the state  
      .then(data => {  
        this.setState({ 
          loading: false, 
          quote: data[0]  
        });  
    })
  });  
}

  render() {
    const { quote, loading } = this.state;
  return (
    <div className="App">
      {loading ? <LoadingSpinner /> : <QuoteCard quote={quote}/>}
      <button type="button" onClick={this.getQuote}>Get quote</button>
    </div>
  );
}
}

export default App;
