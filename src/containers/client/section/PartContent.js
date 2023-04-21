import React, { Component } from 'react';
import { connect } from 'react-redux';
import './scss/PartContent.scss'
import PartMain from './content/PartMain';
import PartCategory from './content/PartCategory';

class PartContent extends Component {
    constructor(props){
        super(props)

        this.state = {
            part : ''
        }


    }
    componentDidUpdate = () => {
        if(this.state.part !== localStorage.getItem('dataPart')){
            this.setState({
                part : localStorage.getItem('dataPart')
            })
        }
    }
    
    componentDidMount = () => {
    }

    render() {
        return (
            <section id="blog" className="blog">
                <div className="container" data-aos="fade-up">

                    <div className="row g-5">
                        <PartMain  data={this.state.part}/>
                        <PartCategory />
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
