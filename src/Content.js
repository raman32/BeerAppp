import React, { Component } from "react";
import BeerDisplay from "./BeerDisplay";
import "./Content.css";
import "./bootstrap.css";

class Content extends Component {
  constructor(props) {
    super(props);
    this.handleOnScroll = this.handleOnScroll.bind(this);
    this._isMounted = false;
    this.state = {
      BeerProducts: [],
      fetchComplete: false,
      page: 0,
      CompleteBeerProduct: [],
      searchTerm: "",
      refresh: false
    };
    this.getData = this.getData.bind(this);
  }
  queryString(myObject) {
    let queryString = "";
    let myObjectKeys = Object.keys(myObject);
    let myObjectValues = Object.values(myObject);
    // console.log(myObjectValues);
    for (let i = 0; i < myObjectKeys.length; i++) {
      if (myObjectValues[i]) {
        queryString +=
          myObjectKeys[i] + "=" + myObjectValues[i].toString() + "&";
      }
    }
    if (queryString) {
      queryString = queryString.substring(0, queryString.length - 1);
    }
    return queryString;
  }
  getData() {
    let temp = {
      beer_name: this.props.searchTerm,
      page: this.state.page + 1
    };
    fetch("https://api.punkapi.com/v2/beers?" + this.queryString(temp), {
      method: "GET"
    })
      .then(response => response.json())
      .then(findresponse => {
        this.setState({
          BeerProducts: findresponse
        });
        this.setState({
          fetchComplete: true
        });
      });
  }
  getDataDuplicate() {
    let temp = {
      beer_name: this.props.searchTerm,
      page: 1
    };
    fetch("https://api.punkapi.com/v2/beers?" + this.queryString(temp), {
      method: "GET"
    })
      .then(response => response.json())
      .then(findresponse => {
        if (findresponse.length) {
          this.setState({
            CompleteBeerProduct: findresponse
          });
          this.setState({
            fetchComplete: true
          });
        } else {
          this.setState({
            fetchComplete: false
          });
        }
      });
  }
  componentWillMount() {
    this.getData();
    this.setState({ page: this.state.page + 1 });
    this.setState({ searchTerm: this.props.searchTerm });
  }
  componentDidMount() {
    this.getData();
    window.addEventListener("scroll", this.handleOnScroll);
    this.setState({ refresh: false });
  }
  componentWillUpdate() {
    if (this.state.refresh) {
      this.setState({ refresh: false });
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
    window.removeEventListener("scroll", this.handleOnScroll);
  }
  componentWillReceiveProps() {
    this.setState({ refresh: true });
  }

  handleOnScroll() {
    let scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
    let scrollHeight =
      (document.documentElement && document.documentElement.scrollHeight) ||
      document.body.scrollHeight;
    let clientHeight =
      document.documentElement.clientHeight || window.innerHeight;
    let scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;
    // console.log(scrollHeight, clientHeight, scrollTop);
    if (scrolledToBottom && this.props.page === "home") {
      let currentPage = this.state.page;
      this.setState({ page: currentPage + 1 });
      this.getData();
      let temp = this.state.CompleteBeerProduct.slice();
      this.setState({
        CompleteBeerProduct: temp.concat(this.state.BeerProducts)
      });
      // console.log("Reached the end");
    }
  }

  render() {
    // console.log(this.state.refresh&&this.state.searchTerm!==this.props.searchTerm);
    if (this.state.refresh && this.state.searchTerm !== this.props.searchTerm) {
      this.setState({
        fetchComplete: false,
        searchTerm: this.props.searchTerm
      });
      this.getDataDuplicate();
    }

    let page = this.props.page;
    let favorite = false;
    let searchTerm = this.props.searchTerm;
    let display = [];

    searchTerm = searchTerm.trim().toLowerCase();

    if (this.state.fetchComplete) {
      if (!this.state.CompleteBeerProduct.length) {
        this.setState({ CompleteBeerProduct: this.state.BeerProducts.slice() });
      }
      let BeerProductsfiltered = this.state.CompleteBeerProduct.slice();
      if (page === "home") {
        for (let value of BeerProductsfiltered) {
          favorite = false;
          for (let a of this.props.favorite) {
            if (a === value) {
              favorite = true;
            }
          }
          display.push(
            <BeerDisplay
              key={value.id}
              className="col-sm-3 col-md-6 col-lg-4 ml-auto"
              favorite={favorite}
              onAddFavorite={this.props.addFavorite}
              onRemoveFavorite={this.props.removeFavorite}
              BeerProducts={value}
              BeerProductsArray={BeerProductsfiltered}
              favoriteArray={this.props.favorite}
            />
          );
        }
      } else if (page === "favorite") {
        let BeerProductsfilteredFavorite = this.props.favorite;
        if (searchTerm.length > 0) {
          BeerProductsfilteredFavorite = BeerProductsfilteredFavorite.filter(
            function(i) {
              return i.name.toLowerCase().match(searchTerm);
            }
          );
        }
        for (let value of BeerProductsfilteredFavorite) {
          display.push(
            <BeerDisplay
              className="col-6 col-sm-6 col-md-6 "
              favorite={true}
              onRemoveFavorite={this.props.removeFavorite}
              BeerProducts={value}
              BeerProductsArray={BeerProductsfiltered}
              favoriteArray={this.props.favorite}
            />
          );
        }
      }
    } else {
      display = (
        <div className="h4 text-center">
          {" "}
          Working on your Querry... Was Your Search Was valid ?{" "}
        </div>
      );
    }

    return (
      <div className="row mx-auto align-items-center justify-content-center">
        {display}
      </div>
    );
  }
}
export default Content;
