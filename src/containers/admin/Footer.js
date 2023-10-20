import React, { Component } from 'react';
import { connect } from 'react-redux';

class Main extends Component {  
    render() {
        return (
            <>
                <footer className="sticky-footer bg-white">
                  <div className="container my-auto">
                    <div className="copyright text-center my-auto">
                      <span>Copyright © Your Website 2021</span>
                    </div>
                  </div>
                </footer>
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

export default connect(mapStateToProps, mapDispatchToProps)(Main);
