import React, { Component } from "react";
import "./TopPanel.css";
import "./bootstrap.css";

class TopPanel extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      abv_gt: null,
      abv_lt: null,
      ibu_gt: null,
      ibu_lt: null,
      ebc_gt: null,
      ebc_lt: null,
      brewed_before: null,
      brewed_after: null
    };
  }
  handleSubmit() {
    this.props.handleSubmit(this.state);
  }

  checkIfNumber(svalue) {
    if (svalue === "0") {
      // console.log("0");
      return true;
    } else if (parseInt(svalue)) {
      // console.log("Int Parsed");
      return true;
    }

    return false;
  }
  handleNumber(event, id) {
    let temp = event.target.value;
    if (this.checkIfNumber(temp)) {
      this.setState({ [id]: parseInt(temp) });
    } else if (temp === "") {
      this.setState({ [id]: "" });
    }
    if (!this.checkIfNumber(temp)) {
      // console.log("Character Detected");
      this.setState({ [id]: "" });
    }
  }

  handleDate(event, id) {
    let temp = event.target.value;
    let value = "";
    if (temp[0] === "0" || temp[0] === "1") {
      value = temp[0];
      if (this.checkIfNumber(temp[1])) {
        value += temp[1] + "-";
        if (this.checkIfNumber(temp.substr(3, temp.length - 1))) {
          value += parseInt(temp.substr(3, 4)).toString();
        }
      }
    }
    this.setState({ [id]: value });
  }
  handleChange(event) {
    this.props.onChangehandler(event.target.value);
  }

  render() {
    let link = this.props.link;
    let search = this.props.searchTerm;
    let navigation;
    let searchbar = (
      <div>
        <input
          className="search-navbar"
          type="text"
          onChange={this.handleChange}
          value={search}
        />
        <div className="text-center row">
          <div className="col-4" />
          <div
            className="col-4 advance-search"
            onClick={() => this.props.onChangehandlerPage("advance-search")}
          >
            Click Here for Advance Search
          </div>
        </div>
      </div>
    );
    if (link === "home") {
      navigation = (
        <div className="links d-flex flex-row-reverse sticky-top">
          <div className="link-clicked-navigation link-property ">HOME</div>
          <div
            onClick={() => this.props.onChangehandlerPage("favorite")}
            className="link-property"
          >
            FAVORITE
          </div>
        </div>
      );
    } else if (link === "favorite") {
      navigation = (
        <div className="links d-flex flex-row-reverse sticky-top">
          <div
            onClick={() => this.props.onChangehandlerPage("home")}
            className="link-property"
          >
            HOME
          </div>
          <div className="link-clicked-navigation link-property ">FAVORITE</div>
        </div>
      );
    } else if (link === "advance-search") {
      navigation = (
        <div className="links d-flex flex-row-reverse sticky-top">
          <div
            onClick={() => this.props.onChangehandlerPage("home")}
            className="link-property"
          >
            HOME
          </div>
          <div
            className="link-property"
            onClick={() => this.props.onChangehandlerPage("favorite")}
          >
            FAVORITE
          </div>
        </div>
      );
      searchbar = (
        <div className="form-format">
          <form className="row mx-auto align-items-center justify-content-left ">
            <div className="col-12  col-md-6 col-lg-3 text-left ">
              <label className="label-format ">MIN IBU</label>
              <input
                className="input-format"
                type="text"
                onChange={event => this.handleNumber(event, "ibu_gt")}
                value={this.state.ibu_gt}
              />
            </div>
            <div className="col-12  col-md-6 col-lg-3 text-left">
              <label className="label-format ">MAX IBU</label>
              <input
                className="input-format"
                type="text"
                onChange={event => this.handleNumber(event, "ibu_lt")}
                value={this.state.ibu_lt}
              />
            </div>
            <div className="col-12  col-md-6 col-lg-3 text-left">
              <label className="label-format ">MIN ABV</label>
              <input
                className="input-format"
                type="text"
                onChange={event => this.handleNumber(event, "abv_gt")}
                value={this.state.abv_gt}
              />
            </div>
            <div className="col-12  col-md-6 col-lg-3 text-left">
              <label className="label-format ">MAX ABV</label>
              <input
                className="input-format"
                type="text"
                onChange={event => this.handleNumber(event, "abv_lt")}
                value={this.state.abv_lt}
              />
            </div>

            <div className="col-12  col-md-6 col-lg-3 text-left">
              <label className="label-format ">MIN EBC</label>
              <input
                className="input-format"
                type="text"
                onChange={event => this.handleNumber(event, "ebc_gt")}
                value={this.state.ebc_gt}
              />
            </div>
            <div className="col-12  col-md-6 col-lg-3 text-left">
              <label className="label-format ">MAX EBC</label>
              <input
                className="input-format"
                type="text"
                onChange={event => this.handleNumber(event, "ebc_lt")}
                value={this.state.ebc_lt}
              />
            </div>

            <div className="col-12  col-md-6 col-lg-3 text-left">
              <label className="label-format ">Brewed Before</label>
              <input
                className="input-format"
                type="text"
                onChange={event => this.handleDate(event, "brewed_before")}
                value={this.state.brewed_before}
              />
            </div>
            <div className="col-12  col-md-6 col-lg-3 text-left">
              <label className="label-format ">Brewed After</label>
              <input
                className="input-format"
                type="text"
                onChange={event => this.handleDate(event, "brewed_after")}
                value={this.state.brewed_after}
              />
            </div>
            <div className="col-12 ">
              <input
                className="submit-format btn btn-secondary "
                type="button"
                value="Submit"
                onClick={this.handleSubmit}
              />
            </div>
          </form>
        </div>
      );
    }

    return (
      <div className="top-panel">
        <div className="fixed-top top-panel">{navigation}</div>
        <div className="title-with-searchbar">
          <div>
            <p className="title-text font-weight-bold">The Beer Bank</p>
            <p className="title-description">Find Your Favorite Beer Here</p>
          </div>
          {searchbar}
        </div>
      </div>
    );
  }
}
export default TopPanel;
