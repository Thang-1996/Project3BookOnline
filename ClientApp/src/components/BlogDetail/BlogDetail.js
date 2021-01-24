import React, { Component } from 'react';
import { withRouter } from 'react-router';


class BlogDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {

            blogs: props.blogs,
            blogID: this.props.match.params.id,
            blog: null, 
        };
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.blogs !== prevState.blogs) {
            return {
                blogs: nextProps.blogs,
            };
        }
        return null;;
    }
    async componentDidMount() {
        let blogs = this.state.blogs;
        let blog = {};
        await blogs.find((item) => {
            if (this.state.blogID == item.blogID) {
                blog = item
                this.setState({
                    blog: item,
                })
            }
        });
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.blogs !== this.props.blogs) {

            this.setState({
                blogs: this.props.blogs,
          
            });
        }
    }
    render() {
        const { blog } = this.state;
        console.log(blog);
        return (
            <div>
                <div className="breadcrumbs-area mb-70">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="breadcrumbs-menu">
                                    <ul>
                                        <li><a href="#">HOME</a></li>
                                        <li><a href="#" className="active">BLOG DETAILS</a></li>
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
                                    <div className="author-destils mb-30">
                                        <div className="author-left">
                                            <div className="author-description">
                                                <p>Posted by:
                                                     <span>{ blog ? blog.userName : ''}</span>
                                                </p>
                                                <span>May 15 2017</span>
                                            </div>
                                        </div>  
                                    </div>
                                    <div className="blog-img mb-30">
                                        <img src={blog ? "images/" + (blog.blogImage) : ""} alt="woman" />
                                    </div>
                                    <div className="single-blog-content">
                                        <div className="single-blog-title">
                                            <h3>{ blog ? blog.Title : ''}</h3>
                                        </div>
                                        <div className="blog-single-content">
                                            <p style={{ fontSize: "16px" }} dangerouslySetInnerHTML={{ __html: blog ? blog.description : "" }}></p>

                                        </div>
                                    </div>
                                    <div className="sharing-post mt-20">
                                        <div className="share-text">
                                            <span>Share this post</span>
                                        </div>
                                        <div className="share-icon">
                                            <ul>
                                                <li><a href="#"><i className="fa fa-facebook" /></a></li>
                                                <li><a href="#"><i className="fa fa-twitter" /></a></li>
                                                <li><a href="#"><i className="fa fa-dribbble" /></a></li>
                                                <li><a href="#"><i className="fa fa-google-plus" /></a></li>
                                                <li><a href="#"><i className="fa fa-instagram" /></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(BlogDetail);
