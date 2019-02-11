import React, { Component } from 'react'
import wordMatch from "../helpers/word_match";

export default class Home extends Component {
  state = {
    loading: false,
    ignorecase: true,
    txt: '',
    response: '',
    inputWord: '',
    words: []
  }

  addWord(e) {
    e.preventDefault();
    let wordContainer = this.state.words;
    wordContainer.push(
      {
        value: this.state.inputWord,
        color: '#e6ff14',
        occurrences: 0
      }
    );
    this.setState({
      words: wordContainer,
      inputWord: ''
    })
  }

  removeWord(e, sp) {
    e.preventDefault();

    let wordContainer = this.state.words;
    
    var index = wordContainer.map(function (e) {
      return e.value;
    }).indexOf(sp.value);

    if (index > -1) {
      wordContainer.splice(index, 1);
    }

    this.setState({
      words: wordContainer
    })
  }

  onSubmit(event) {

    event.preventDefault();
    
    this.setState({
      loading: true
    })

    for (let i = 0; i < this.state.words.length; i++) {
      this.state.words[i].occurrences = 0; // Clear the find
    }

    var r = wordMatch(this.state.txt, this.state.words, {ignoreCase: this.state.ignorecase});

    this.setState({
      response: r
    })

    setTimeout(() => {
      this.setState({
        loading: false
      })
    }, 1000);
  }

  render () {

    return (
      <div>
        {
          this.state.loading ? 
          <div className="progress">
              <div className="indeterminate"></div>
          </div>
          : null
        }
        <h3>Matching Words</h3>

         <div className="row">
          <form className="col s12" onSubmit={this.onSubmit.bind(this)}>
            <div className="row">
              <div className="input-field col s12">
                <textarea 
                  id="textarea1" 
                  placeholder="Insert some text here" 
                  className="materialize-textarea"
                  value={this.state.txt}
                  onChange={(e) => this.setState({txt: e.target.value})}
                  ></textarea>
              </div>
            </div>
            <div className="row">
            <span className="right">
                <label>Ignore Case</label>
                <div className="switch">
                  <label>
                    Off
                    <input 
                    type="checkbox" 
                    checked={this.state.ignorecase}
                    onChange={() => this.setState({ ignorecase: !this.state.ignorecase })}
                    />
                    <span className="lever"></span>
                    On
                  </label>
                </div>
              </span>
              <button className="btn waves-effect waves-light" type="submit" name="action">Match
              </button>
            </div>
          </form>
          <div className="row">
            <div className="col s6">
              <h3>Words that must match</h3>
              <form onSubmit={this.addWord.bind(this)}>
                <div className="row">
                  <div className="input-field col s12">
                    <input 
                      type="text" 
                      className="validate" 
                      placeholder="Type a new word"
                      onSubmit={this.addWord.bind(this)}
                      value={this.state.inputWord}
                      onChange={(e) => this.setState({ inputWord: e.target.value })}
                      />
                  </div>
                </div>
              </form>
              <div className="collection">
              {
                this.state.words.map((e, k) =>
                  <a 
                    href="#!" 
                    key={k} 
                    onClick={(even) => this.removeWord(even, e)}
                    className="collection-item"><span className="new badge">{e.occurrences}</span>{e.value}</a>
                )
              }
            </div>
            </div>
            <div className="col s6">
              <h4>Result Text</h4>
              <p  dangerouslySetInnerHTML={{ __html: this.state.response }}></p>
              
            </div>
          </div>
        </div>
      </div>
    )
  }
}