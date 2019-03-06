import React, { Component } from "react";
import TopPanel from "./TopPanel";
import Content from "./Content";
import AdvanceSearch from "./AdvanceSearch";
class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      link: "home",
      favorites: [],
      searchArgs: {
        abv_gt: null,
        abv_lt: null,
        ibu_gt: null,
        ibu_lt: null,
        ebc_gt: null,
        ebc_lt: null,
        brewed_before: null,
        brewed_after: null
      }
    };
    this.onChangehandle = this.onChangehandle.bind(this);
    this.onChangehandlePage = this.onChangehandlePage.bind(this);
    this.addFavorite = this.addFavorite.bind(this);
    this.removeFavorite = this.removeFavorite.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  onChangehandle(value) {
    this.setState({ searchTerm: value });
  }
  onChangehandlePage(value) {
    this.setState({ link: value });
  }
  addFavorite(value) {
    let a = this.state.favorites;
    a.push(value);
    this.setState({ favorites: a });
  }
  removeFavorite(value) {
    let a = this.state.favorites.filter(item => item !== value);
    this.setState({ favorites: a });
  }
  handleSubmit(value) {
    this.setState({ searchArgs: value });
  }
  render() {
    let content;
    if (this.state.link === "home") {
      content = (
        <Content
          searchTerm={this.state.searchTerm}
          link={this.state.link}
          page={this.state.link}
          favorite={this.state.favorites}
          addFavorite={this.addFavorite}
          removeFavorite={this.removeFavorite}
        />
      );
    } else if (this.state.link === "favorite") {
      content = (
        <Content
          searchTerm={this.state.searchTerm}
          link={this.state.link}
          page={this.state.link}
          favorite={this.state.favorites}
          addFavorite={this.addFavorite}
          removeFavorite={this.removeFavorite}
        />
      );
    } else if (this.state.link === "advance-search") {
      content = (
        <AdvanceSearch
          searchArgs={this.state.searchArgs}
          favorite={this.state.favorites}
          addFavorite={this.addFavorite}
          removeFavorite={this.removeFavorite}
        />
      );
    }
    return (
      <div>
        <TopPanel
          searchTerm={this.state.searchTerm}
          link={this.state.link}
          onChangehandler={this.onChangehandle}
          onChangehandlerPage={this.onChangehandlePage}
          handleSubmit={this.handleSubmit}
        />
        {content}
      </div>
    );
  }
}

export default MainPage;
