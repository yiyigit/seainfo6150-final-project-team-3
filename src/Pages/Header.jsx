import React, { Component } from "react";
import styles from "./Header.module.css";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      redirect: false
    };
  }

  search = () => {
    if (this.state.value !== "") {
      this.setState({redirect: true});
    }
  }

  onSearch = (e) => {
    this.search();
  }

  handleChange = (e) => {
    this.setState({value: e.target.value});
  }

  handleKeyPress = (e) => {
    if(e.key === 'Enter'){
      this.search();
    }
  }

  render() {
    if (this.state.redirect) {
      window.location.href = `/search/${this.state.value}`;
      return;
    }
    return (
      <header className={`${styles.header} background-color`}>
        <nav className={styles.nav}>
          <a className={`clickable ${styles.home} ${styles.navButton}`} href="/">Home</a>
          <a className={`clickable ${styles.category} ${styles.clickable} ${styles.navButton}`} href="/allcategories">Category</a>
          <img className={styles.logo} src="../../images/logo2.png" alt="logo"/>
          <div className={styles.search}>
            <input type="text" value={this.state.value} onChange={this.handleChange} onKeyPress={this.handleKeyPress} maxLength="16"/>
            <img className={styles.searchIcon} src="../../images/search.png" alt="logo" onClick={this.onSearch}/>
          </div>
        </nav>
      </header>
    )
  }
}
