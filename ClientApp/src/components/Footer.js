import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {

    }
    render() {

        return (
            <footer>
                <div className="footer-bottom">
                    <div className="container">
                        <div className="row bt-2">
                            <div className="col-lg-6 col-md-6 col-12">
                                <div className="copy-right-area">
                                    <p>Copyright ©<Link to="/">Online Book Store</Link>. All Right Reserved.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}
