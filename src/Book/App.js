import React, { useEffect } from "react";
import { Router, Route, Redirect } from "react-router-dom";
import history from "./history";
import AOS from "aos";
import Collection from "./Book/Collection/Collection";
import AddBook from "./Book/AddBook";
import Login from "./Auth/Login";
import Book from "./Book/Book";
import ContactUser from "./Book/ContactUser";
import "aos/dist/aos.css";
import Home from "./Home/Home";
import Trades from "./Book/Trade/Trades";
import BookInfo from "./Book/BookInfo";
import BookInfo1 from "./Book/BookInfo/BookInfo1";
import Request from "./Book/Request/Request";
import MyCollection from "./Book/Collection/MyCollection";
import Wishlist from "./Book/Wishlist/Wishlist";
import SignUp from "./Auth/SignUp";
import { connect } from "react-redux";
import { verifyLogin } from "./actions/authAction";
const App = (props) => {
  useEffect(async () => {
    AOS.init({
      duration: 1000,
      offset: 100,
    });
    // console.log("Hi");
    await props.verifyLogin();
  }, []);
  console.log("Hi", props.isSignedIn);
  return (
    <div>
      <Router history={history}>
        <div>
          <Route path="/collection" exact component={Collection} />
          <Route
            path="/addBook"
            exact
            render={() => {
              return props.isSignedIn !== false ? (
                <AddBook />
              ) : (
                <Redirect to="/login" />
              );
            }}
          />
          <Route path="/login" exact component={Login} />
          <Route path="/signUp" exact component={SignUp} />
          <Route path="/contactUser" exact component={ContactUser} />
          <Route path="/" exact component={Home} />
          <Route path="/book" exact component={Book} />
          <Route
            path="/chat"
            exact
            render={() => {
              return props.isSignedIn !== false ? (
                <ContactUser />
              ) : (
                <Redirect to="/login" />
              );
            }}
            // component={ContactUser}
          />
          <Route
            path="/trades"
            exact
            render={() => {
              return props.isSignedIn !== false ? (
                <Trades />
              ) : (
                <Redirect to="/login" />
              );
            }}
          />
          <Route path="/bookInfo" exact component={BookInfo} />
          <Route path="/bookInfo1" exact component={BookInfo1} />
          {/* <Route path="/mySent" exact component={MySent} /> */}
          {/* <Route path="/myReceived" exact component={MyReceived} /> */}
          <Route
            path="/request"
            exact
            render={() => {
              return props.isSignedIn !== false ? (
                <Request />
              ) : (
                <Redirect to="/login" />
              );
            }}
          />
          <Route
            path="/myCollection"
            exact
            render={() => {
              return props.isSignedIn !== false ? (
                <MyCollection />
              ) : (
                <Redirect to="/login" />
              );
            }}
          />
          <Route
            path="/wishlist"
            exact
            render={() => {
              return props.isSignedIn !== false ? (
                <Wishlist />
              ) : (
                <Redirect to="/login" />
              );
            }}
          />
        </div>
      </Router>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.login.isSignedIn,
  };
};
export default connect(mapStateToProps, { verifyLogin })(App);
