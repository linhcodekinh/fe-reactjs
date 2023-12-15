import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

class UserAdd extends Component {

    constructor(props) {
        super(props)

        this.state = {

        }
    }

  

    componentDidMount = () => {
       
    }

    render() {
        return (
            <div>Xin Chao!!!</div>
        ); 
    }

}
const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserAdd);
