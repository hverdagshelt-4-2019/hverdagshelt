import * as React from 'react';
import { Component } from 'react-simplified';
import styles from "./style.css";

export default class Comment extends Component {

    render() {
        return (
            <div>
                <div className={styles.commentBody}>
                    <div className={styles.header}>
                        <h4 className="card-title">{this.props.name}</h4>
                    </div>
                    <div className={styles.description}>
                        <p className="card-text">{this.props.description}</p>
                    </div>
                </div>
            </div>
        );
    }
}