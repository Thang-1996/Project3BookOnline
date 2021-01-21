import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class BlogItems extends Component {
    constructor(props) {
        super(props);

        this.state = {
          
        };

    }


    render() {
        const { blog } = this.props;


        return (
            <div className="single-blog-post">
                <div className="author-destils mb-30">
                    <div className="author-left">

                        <div className="author-description">
                            <p>Posted by:
                           <span>{ blog.userName}</span>
                                
                            </p>
                            <span>May 15 2017</span>
                        </div>
                    </div>
                    <div className="author-right">
                        <span>Share this:</span>
                        <ul>
                            <li><a href="#"><i className="fa fa-facebook" /></a></li>
                            <li><a href="#"><i className="fa fa-twitter" /></a></li>
                            <li><a href="#"><i className="fa fa-dribbble" /></a></li>
                            <li><a href="#"><i className="fa fa-google-plus" /></a></li>
                            <li><a href="#"><i className="fa fa-instagram" /></a></li>
                        </ul>
                    </div>
                </div>
                <div className="blog-img mb-30">
                    <Link to={"/blog/" + blog.blogID}><img src={"images/" + blog.blogImage} alt="blog" /></Link>
                </div>
                <div className="single-blog-content">
                    <div className="single-blog-title">
                        <Link to={"/blog/" + blog.blogID}><h3>{blog.title}</h3></Link>
                    </div>
                    <div className="blog-single-content">
                        <p>{ blog.description}</p>
                    </div>
                </div>
                <div className="blog-comment-readmore">
                    <div className="blog-readmore">
                        <Link to={"/blog/" + blog.blogID}>Read more<i className="fa fa-long-arrow-right" /></Link>
                    </div>
              
                </div>
            </div>
        );
    }
}
