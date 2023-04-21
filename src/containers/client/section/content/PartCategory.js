import React, { Component } from 'react';
import { connect } from 'react-redux';

class PartCategory extends Component {

    render() {
        return (
            <>
                <div className="col-lg-4" data-aos="fade-up" data-aos-delay="400">

                    <div className="sidebar ps-lg-4">

                        <div className="sidebar-item search-form">
                            <h3 className="sidebar-title">Search</h3>
                            <form action="" className="mt-3">
                                <input type="text" />
                                <button type="submit"><i className="bi bi-search"></i></button>
                            </form>
                        </div>

                        <div className="sidebar-item categories">
                            <h3 className="sidebar-title">Categories</h3>
                            <ul className="mt-3">
                                <li><a href="#">General <span>(25)</span></a></li>
                                <li><a href="#">Lifestyle <span>(12)</span></a></li>
                                <li><a href="#">Travel <span>(5)</span></a></li>
                                <li><a href="#">Design <span>(22)</span></a></li>
                                <li><a href="#">Creative <span>(8)</span></a></li>
                                <li><a href="#">Educaion <span>(14)</span></a></li>
                            </ul>
                        </div>

                        <div className="sidebar-item recent-posts">
                            <h3 className="sidebar-title">Recent Posts</h3>

                            <div className="mt-3">

                                <div className="post-item mt-3">
                                    <img src="assets/img/blog/blog-recent-1.jpg" alt="" className="flex-shrink-0" />
                                    <div>
                                        <h4><a href="blog-post.html">Nihil blanditiis at in nihil autem</a></h4>
                                         {/* <time dateTime="2020-01-01">Jan 1, 2020</time> */}
                                    </div>
                                </div>

                                <div className="post-item">
                                    <img src="assets/img/blog/blog-recent-2.jpg" alt="" className="flex-shrink-0" />
                                    <div>
                                        <h4><a href="blog-post.html">Quidem autem et impedit</a></h4>
                                         {/* <time dateTime="2020-01-01">Jan 1, 2020</time> */}
                                    </div>
                                </div>

                                <div className="post-item">
                                    <img src="assets/img/blog/blog-recent-3.jpg" alt="" className="flex-shrink-0" />
                                    <div>
                                        <h4><a href="blog-post.html">Id quia et et ut maxime similique occaecati ut</a></h4>
                                         {/* <time dateTime="2020-01-01">Jan 1, 2020</time> */}
                                    </div>
                                </div>

                                <div className="post-item">
                                    <img src="assets/img/blog/blog-recent-4.jpg" alt="" className="flex-shrink-0" />
                                    <div>
                                        <h4><a href="blog-post.html">Laborum corporis quo dara net para</a></h4>
                                         {/* <time dateTime="2020-01-01">Jan 1, 2020</time> */}
                                    </div>
                                </div>

                                <div className="post-item">
                                    <img src="assets/img/blog/blog-recent-5.jpg" alt="" className="flex-shrink-0" />
                                    <div>
                                        <h4><a href="blog-post.html">Et dolores corrupti quae illo quod dolor</a></h4>
                                         {/* <time dateTime="2020-01-01">Jan 1, 2020</time> */}
                                    </div>
                                </div>

                            </div>

                        </div>

                        <div className="sidebar-item tags">
                            <h3 className="sidebar-title">Tags</h3>
                            <ul className="mt-3">
                                <li><a href="#">App</a></li>
                                <li><a href="#">IT</a></li>
                                <li><a href="#">Business</a></li>
                                <li><a href="#">Mac</a></li>
                                <li><a href="#">Design</a></li>
                                <li><a href="#">Office</a></li>
                                <li><a href="#">Creative</a></li>
                                <li><a href="#">Studio</a></li>
                                <li><a href="#">Smart</a></li>
                                <li><a href="#">Tips</a></li>
                                <li><a href="#">Marketing</a></li>
                            </ul>
                        </div>

                    </div>

                </div>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PartCategory);
