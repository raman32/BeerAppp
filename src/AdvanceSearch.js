import React, { Component } from "react";
import BeerDisplay from "./BeerDisplay";
import "./Content.css";
import "./bootstrap.css";

class AdvanceSearch extends Component {
  constructor(props) {
    super(props);
    this.handleOnScroll = this.handleOnScroll.bind(this);
    this.state = {
      BeerProducts: [],
      fetchComplete: false,
      page: 0,
      CompleteBeerProduct: [],
      searchArgsCheck: [],
      refresh: false
    };
    this.getData = this.getData.bind(this);
  }
  queryString(myObject) {
    let queryString = "";
    let myObjectKeys = Object.keys(myObject);
    let myObjectValues = Object.values(myObject);
    //console.log(myObjectValues);
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
    let temp = this.props.searchArgs;
    //console.log(this.state.page);
    temp["page"] = this.state.page + 1;
    fetch("https://api.punkapi.com/v2/beers?" + this.queryString(temp), {
      method: "GET",
      headers: {}
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
    let temp = this.props.searchArgs;
    temp["page"] = 1;
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
  componentDidMount() {
    this.getData();

    window.addEventListener("scroll", this.handleOnScroll);
    this.setState({ refresh: false });
  }
  componentWillMount() {
    this.getData();
    this.setState({ page: this.state.page + 1 });
    this.setState({ searchArgs: this.props.searchArgs });
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleOnScroll);
  }
  componentWillReceiveProps() {
    this.setState({ refresh: true });
  }
  componentWillUpdate() {
    if (this.state.refresh) {
      this.setState({ refresh: false });
    }
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
    if (scrolledToBottom) {
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
    // let page = this.props.page;
    // let searchTerm = this.state.searchTerm;
    // searchTerm = searchTerm.trim().toLowerCase();
    // if (this.state.searchArgsCheck !== this.props.searchArgs) {
    //   console.log("Changed");
    //   this.setState({
    //     CompleteBeerProduct: [],
    //     BeerProducts: [],
    //     searchArgsCheck: this.props.searchArgs
    //   });
    //   this.getData();
    // }
    if (this.state.refresh && this.state.searchArgs !== this.props.searchArgs) {
      this.setState({
        fetchComplete: false,
        searchTerm: this.props.searchTerm
      });
      this.getDataDuplicate();
      //console.log(this.state.BeerProducts);
    }
    let favorite = false;
    let display = [];
    if (this.state.fetchComplete) {
      if (!this.state.CompleteBeerProduct.length) {
        this.setState({ CompleteBeerProduct: this.state.BeerProducts.slice() });
      }
      let BeerProductsfiltered = this.state.CompleteBeerProduct.slice();

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
export default AdvanceSearch;
