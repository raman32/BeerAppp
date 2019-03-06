import React, { Component } from "react";
import Popup from "./Popup";
import "./BeerDisplay.css";

class BeerDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = { hovered: false, popup: false };
    this.onClickHandleAdd = this.onClickHandleAdd.bind(this);
    this.onClickHandleRemove = this.onClickHandleRemove.bind(this);
    this.onclickedPopup = this.onclickedPopup.bind(this);
    this.onCilckedOutside = this.onCilckedOutside.bind(this);
  }
  onClickHandleAdd(event) {
    this.props.onAddFavorite(this.props.BeerProducts);
  }
  onClickHandleRemove(event) {
    this.props.onRemoveFavorite(this.props.BeerProducts);
  }
  onclickedPopup() {
    this.setState({ popup: true });
  }
  onCilckedOutside() {
    this.setState({ popup: false });
  }
  render() {
    let BeerProducts = this.props.BeerProducts;
    let favorite = this.props.favorite;
    let favoriteDisplay;
    if (favorite) {
      favoriteDisplay = (
        <div className="favorite-icon">
          <img
            onClick={this.onClickHandleRemove}
            src="favorite-icon.svg"
            alt="favorite Button"
            height="20px"
            width="20px"
          />
        </div>
      );
    } else {
      favoriteDisplay = (
        <div className="favorite-icon">
          <img
            onClick={this.onClickHandleAdd}
            src="favorite-icon.png"
            alt="favorite Button"
            height="20px"
            width="20px"
          />
        </div>
      );
    }
    return (
      <div>
        <div className="beer-box">
          {favoriteDisplay}
          <div onClick={this.onclickedPopup}>
            <img
              className="image-beer"
              src={BeerProducts.image_url}
              alt={BeerProducts.description}
            />
            <div className="description">
              <p className="name">{BeerProducts.name}</p>
              <p className="tagline">{BeerProducts.tagline}</p>
            </div>
          </div>
        </div>
        {this.state.popup ? (
          <Popup
            remove={this.onCilckedOutside}
            BeerProducts={BeerProducts}
            BeerProductsArray={this.props.BeerProductsArray}
            onAddFavorite={this.props.onAddFavorite}
            onRemoveFavorite={this.props.onRemoveFavorite}
            favorite={favorite}
            favoriteArray={this.props.favoriteArray}
          />
        ) : null}
      </div>
    );
  }
}
export default BeerDisplay;
