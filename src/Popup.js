import React, { Component } from "react";

import "./Popup.css";
import "./bootstrap.css";

import BeerDisplay from "./BeerDisplay";
class Popup extends Component {
  constructor(props) {
    super(props);
    this.state = { click: 0 };
    this.onClickOutside = this.onClickOutside.bind(this);
  }
  onClickOutside() {
    this.props.remove();
  }

  render() {
    let BeerProducts = this.props.BeerProducts;
    //console.log(BeerProducts);
    let list = BeerProducts.food_pairing.map(value => (
      <li key={value}>{value.toString()}</li>
    ));
    let display = [];
    let favorite = false;
    let BeerProductsfiltered = this.props.BeerProductsArray.slice();
    for (let value of BeerProductsfiltered) {
      favorite = false;
      for (let a of this.props.favoriteArray) {
        if (a === value) {
          favorite = true;
        }
      }
      if (value !== BeerProducts) {
        display.push(
          <BeerDisplay
            className="col-sm-3 col-md-6 col-lg-4"
            onAddFavorite={this.props.onAddFavorite}
            onRemoveFavorite={this.props.onRemoveFavorite}
            BeerProducts={value}
            BeerProductsArray={this.props.BeerProductsArray}
            favorite={favorite}
            favoriteArray={this.props.favoriteArray}
          />
        );
      }
    }
    return (
      <div>
        <div className="outer-window" onClick={this.onClickOutside} />
        <div className="inner-window">
          <div className="close-x">
            <span onClick={this.onClickOutside}>X</span>
          </div>
          <div className=" mx-auto">
            <div className="row justify-content-center">
              <div className="col-4 text-center">
                <img
                  className="image-popup img-fluid"
                  src={BeerProducts.image_url}
                  alt={BeerProducts.description}
                />
              </div>
              <div class="col-8 pl-20 pr-10 text-left">
                <div className="title-text-pop ">{BeerProducts.name}</div>
                <div className="title-description-pop">
                  {BeerProducts.tagline}
                </div>
                <div className="align-left">
                  <hr id="line" />
                </div>
                <div className="h5 pt-10">
                  IBU:{BeerProducts.ibu} ABV:{BeerProducts.abv} EBC:
                  {BeerProducts.ebc}
                </div>
                <div>{BeerProducts.description}</div>
                <div>
                  Best Served With:
                  <ul>{list}</ul>
                </div>
              </div>
            </div>
            <div id="also-like-text">You might also like:</div>
            <div className="row mx-auto align-items-center justify-content-center">
              {display}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Popup;
