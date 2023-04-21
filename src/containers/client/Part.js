import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './Header.js';
import Footer from './Footer.js';
import Breadcrumbs from './section/Breadcrumbs.js'
import PartContent from './section/PartContent.js';

class Part extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            part : ''
        }
    } 

    shouldComponentUpdate = (nextProps) => {
        if(nextProps.location.data && nextProps.location.data !== null){
            localStorage.setItem('dataPart', nextProps.location.data)
        }
        return nextProps.location.data !== this.state.part;
    }

    componentDidUpdate = () => {
        if(this.state.part !== localStorage.getItem('dataPart')){
            this.setState({
                part : localStorage.getItem('dataPart')
            })
        }
    }

    componentDidMount = () => {
        this.setState({
            part : localStorage.getItem('dataPart')
        })
    }
    
    render() {
        return (
            <>
                <Header/>
                <Breadcrumbs data={this.state.part}/>
                
                <main id="main">
                    <PartContent data={this.state.part}/>
                </main>
                
                <Footer/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Part);
