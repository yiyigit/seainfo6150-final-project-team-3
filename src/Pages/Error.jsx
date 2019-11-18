import React from 'react';
import styles from "./Error.module.css";
import {getError} from "../Proxy/Data";

let errorAry = getError();
let errorObj = errorAry[Math.floor(Math.random() * errorAry.length)];
const Error = () => {
    return (
        <div className={styles.error}>
          <section className={styles.container}>
            <h1>
              Sorry!
            </h1>
            <p>
              We couldn't find that page.
            </p>
            <p>
              <span>Try searching or go to </span>
              <a href="/" className="clickable">Home Page</a>
              <span>.</span>
            </p>
            <figure className={styles.imageContainer}>
              <a href={errorObj.link}>
                <img className={styles.image} src={errorObj.imageURL} alt={errorObj.name}/>
              </a>
              <p>
                <span>Or you can have a </span>
                <a href={errorObj.link} className="clickable">{errorObj.name}</a>
                <span>!</span>
              </p>
              <div className={styles.gap}></div>
              <p>
                <span>Click and find the secret of this </span>
                <a href={errorObj.link} className="clickable">{errorObj.name}</a>
                <span>!</span>
              </p>
            </figure>
          </section>
        </div>
    )
}

export default Error
