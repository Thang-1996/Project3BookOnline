import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import BlogItems from './components/BlogItems';

export default class Blog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            blogs: [],
        };

    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.blogs !== prevState.blogs) {
            return {
                blogs: nextProps.blogs,
            };
        }
        return null;
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.blogs !== this.props.blogs) {
            this.setState({
                blogs: this.props.blogs,
            });
        }
    }


    render() {
        const { blogs } = this.state;



        return (
            <div>
                <div className="breadcrumbs-area mb-70">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="breadcrumbs-menu">
                                    <ul>
                                        <li><Link to="/">Home</Link></li>
                                        <li><Link to="/" className="active">Blog</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            
                <div className="blog-main-area mb-70">
                    <div className="container">
                        <div className="row">
                          
                            <div className="col-lg-12 col-md-12 col-12 order-lg-2 order-1">
                                <div className="blog-main-wrapper">
                                    {
                                        blogs ? blogs.map((item, index) => {
                                           return  <BlogItems blog={item} key={index} />
                                        }):null

                                    }
                              
                                 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
