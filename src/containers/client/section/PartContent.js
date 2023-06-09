import React, { Component } from 'react';
import { connect } from 'react-redux';
import './scss/PartContent.scss'
import testBG from '../../../assets/images/blog-1.jpg';
import { Link } from 'react-router-dom';

class PartContent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            part: ''
        }


    }

    componentDidUpdate = () => {
        if (this.state.part !== localStorage.getItem('dataPart')) {
            this.setState({
                part: localStorage.getItem('dataPart')
            })
        }
    }

    componentDidMount = () => {
    }

    render() {
        return (
            <section id="portfolio" className="portfolio">
                <div className="container" data-aos="fade-up">
                    <div className="portfolio-isotope" data-portfolio-filter="*" data-portfolio-layout="masonry" data-portfolio-sort="original-order">
                        <ul className="portfolio-flters" data-aos="fade-up" data-aos-delay={100}>
                            <li data-filter="*" className="filter-active">All</li>
                            <li data-filter=".filter-app">App</li>
                            <li data-filter=".filter-product">Product</li>
                            <li data-filter=".filter-branding">Branding</li>
                            <li data-filter=".filter-books">Books</li>
                            <li data-filter=".filter-admin">Admins</li>
                        </ul>{/* End Portfolio Filters */}
                        <div className="row gy-4 portfolio-container" data-aos="fade-up" data-aos-delay={300}>
                            <div className="col-lg-4 col-md-6 portfolio-item filter-admin">
                                <img src="images/admin.jpg" alt="bg" className="img-fluid" />
                                <div className="portfolio-info">
                                    <h4>App 1</h4>
                                    <p>Lorem ipsum, dolor sit amet consectetur</p>
                                    <a href="assets/img/portfolio/app-1.jpg" title="App 1" data-gallery="portfolio-gallery-app" className="glightbox preview-link"><i className="bi bi-zoom-in" /></a>
                                    <Link to={{pathname: '/part'}} title="More Details" className="details-link"><i className="bi bi-link-45deg" /></Link>
                                </div>
                            </div>{/* End Portfolio Item */}
                            <div className="col-lg-4 col-md-6 portfolio-item filter-product">
                                <img src={testBG} alt="bg" className="img-fluid" />
                                <div className="portfolio-info">
                                    <h4>Product 1</h4>
                                    <p>Lorem ipsum, dolor sit amet consectetur</p>
                                    <a href="assets/img/portfolio/product-1.jpg" title="Product 1" data-gallery="portfolio-gallery-product" className="glightbox preview-link"><i className="bi bi-zoom-in" /></a>
                                    <a href="portfolio-details.html" title="More Details" className="details-link"><i className="bi bi-link-45deg" /></a>
                                </div>
                            </div>{/* End Portfolio Item */}
                            <div className="col-lg-4 col-md-6 portfolio-item filter-branding">
                                <img src={testBG} alt="bg" className="img-fluid" />
                                <div className="portfolio-info">
                                    <h4>Branding 1</h4>
                                    <p>Lorem ipsum, dolor sit amet consectetur</p>
                                    <a href="assets/img/portfolio/branding-1.jpg" title="Branding 1" data-gallery="portfolio-gallery-branding" className="glightbox preview-link"><i className="bi bi-zoom-in" /></a>
                                    <a href="portfolio-details.html" title="More Details" className="details-link"><i className="bi bi-link-45deg" /></a>
                                </div>
                            </div>{/* End Portfolio Item */}
                            <div className="col-lg-4 col-md-6 portfolio-item filter-books">
                                <img src={testBG} alt="bg" className="img-fluid" />
                                <div className="portfolio-info">
                                    <h4>Books 1</h4>
                                    <p>Lorem ipsum, dolor sit amet consectetur</p>
                                    <a href="assets/img/portfolio/books-1.jpg" title="Branding 1" data-gallery="portfolio-gallery-book" className="glightbox preview-link"><i className="bi bi-zoom-in" /></a>
                                    <a href="portfolio-details.html" title="More Details" className="details-link"><i className="bi bi-link-45deg" /></a>
                                </div>
                            </div>{/* End Portfolio Item */}
                            <div className="col-lg-4 col-md-6 portfolio-item filter-app">
                                <img src={testBG} alt="bg" className="img-fluid" />
                                <div className="portfolio-info">
                                    <h4>App 2</h4>
                                    <p>Lorem ipsum, dolor sit amet consectetur</p>
                                    <a href="assets/img/portfolio/app-2.jpg" title="App 2" data-gallery="portfolio-gallery-app" className="glightbox preview-link"><i className="bi bi-zoom-in" /></a>
                                    <a href="portfolio-details.html" title="More Details" className="details-link"><i className="bi bi-link-45deg" /></a>
                                </div>
                            </div>{/* End Portfolio Item */}
                            <div className="col-lg-4 col-md-6 portfolio-item filter-product">
                                <img src={testBG} alt="bg" className="img-fluid" />
                                <div className="portfolio-info">
                                    <h4>Product 2</h4>
                                    <p>Lorem ipsum, dolor sit amet consectetur</p>
                                    <a href="assets/img/portfolio/product-2.jpg" title="Product 2" data-gallery="portfolio-gallery-product" className="glightbox preview-link"><i className="bi bi-zoom-in" /></a>
                                    <a href="portfolio-details.html" title="More Details" className="details-link"><i className="bi bi-link-45deg" /></a>
                                </div>
                            </div>{/* End Portfolio Item */}
                            <div className="col-lg-4 col-md-6 portfolio-item filter-branding">
                                <img src={testBG} alt="bg" className="img-fluid" />
                                <div className="portfolio-info">
                                    <h4>Branding 2</h4>
                                    <p>Lorem ipsum, dolor sit amet consectetur</p>
                                    <a href="assets/img/portfolio/branding-2.jpg" title="Branding 2" data-gallery="portfolio-gallery-branding" className="glightbox preview-link"><i className="bi bi-zoom-in" /></a>
                                    <a href="portfolio-details.html" title="More Details" className="details-link"><i className="bi bi-link-45deg" /></a>
                                </div>
                            </div>{/* End Portfolio Item */}
                            <div className="col-lg-4 col-md-6 portfolio-item filter-books">
                                <img src={testBG} alt="bg" className="img-fluid" />
                                <div className="portfolio-info">
                                    <h4>Books 2</h4>
                                    <p>Lorem ipsum, dolor sit amet consectetur</p>
                                    <a href="assets/img/portfolio/books-2.jpg" title="Branding 2" data-gallery="portfolio-gallery-book" className="glightbox preview-link"><i className="bi bi-zoom-in" /></a>
                                    <a href="portfolio-details.html" title="More Details" className="details-link"><i className="bi bi-link-45deg" /></a>
                                </div>
                            </div>{/* End Portfolio Item */}
                            <div className="col-lg-4 col-md-6 portfolio-item filter-app">
                                <img src={testBG} alt="bg" className="img-fluid" />
                                <div className="portfolio-info">
                                    <h4>App 3</h4>
                                    <p>Lorem ipsum, dolor sit amet consectetur</p>
                                    <a href="assets/img/portfolio/app-3.jpg" title="App 3" data-gallery="portfolio-gallery-app" className="glightbox preview-link"><i className="bi bi-zoom-in" /></a>
                                    <a href="portfolio-details.html" title="More Details" className="details-link"><i className="bi bi-link-45deg" /></a>
                                </div>
                            </div>{/* End Portfolio Item */}
                            <div className="col-lg-4 col-md-6 portfolio-item filter-product">
                                <img src={testBG} alt="bg" className="img-fluid" />
                                <div className="portfolio-info">
                                    <h4>Product 3</h4>
                                    <p>Lorem ipsum, dolor sit amet consectetur</p>
                                    <a href="assets/img/portfolio/product-3.jpg" title="Product 3" data-gallery="portfolio-gallery-product" className="glightbox preview-link"><i className="bi bi-zoom-in" /></a>
                                    <a href="portfolio-details.html" title="More Details" className="details-link"><i className="bi bi-link-45deg" /></a>
                                </div>
                            </div>{/* End Portfolio Item */}
                            <div className="col-lg-4 col-md-6 portfolio-item filter-branding">
                                <img src={testBG} alt="bg" className="img-fluid" />
                                <div className="portfolio-info">
                                    <h4>Branding 3</h4>
                                    <p>Lorem ipsum, dolor sit amet consectetur</p>
                                    <a href="assets/img/portfolio/branding-3.jpg" title="Branding 2" data-gallery="portfolio-gallery-branding" className="glightbox preview-link"><i className="bi bi-zoom-in" /></a>
                                    <a href="portfolio-details.html" title="More Details" className="details-link"><i className="bi bi-link-45deg" /></a>
                                </div>
                            </div>{/* End Portfolio Item */}
                            <div className="col-lg-4 col-md-6 portfolio-item filter-books">
                                <img src={testBG} alt="bg" className="img-fluid" />
                                <div className="portfolio-info">
                                    <h4>Books 3</h4>
                                    <p>Lorem ipsum, dolor sit amet consectetur</p>
                                    <a href="assets/img/portfolio/books-3.jpg" title="Branding 3" data-gallery="portfolio-gallery-book" className="glightbox preview-link"><i className="bi bi-zoom-in" /></a>
                                    <a href="portfolio-details.html" title="More Details" className="details-link"><i className="bi bi-link-45deg" /></a>
                                </div>
                            </div>{/* End Portfolio Item */}
                        </div>{/* End Portfolio Container */}
                    </div>
                </div>
            </section>
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

export default connect(mapStateToProps, mapDispatchToProps)(PartContent);
