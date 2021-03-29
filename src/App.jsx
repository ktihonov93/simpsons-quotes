import React, { Component } from 'react'
import axios from 'axios';
import QuoteCard from './components/QuoteCard'
import LoadingSpinner from './components/LoadingSpinner';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      quote: [],
      loading: false
      
    }
    
    this.getQuote = this.getQuote.bind(this);
  }
  componentDidMount (){
    this.getQuote()
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
      {loading || !quote ? <LoadingSpinner /> : <QuoteCard quote={quote}/>}
      <button type="button" onClick={this.getQuote}>Get quote</button>
    </div>
  );
}
}

export default App;
