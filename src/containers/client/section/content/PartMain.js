import React, { Component } from 'react';
import { connect } from 'react-redux';
import imgavaPart1 from '../../../../../public/assets/images/part1-ava.png'; // Tell Webpack this JS file uses this image
import imgavaPart2 from '../../../../../public/assets/images/part2-ava.png';
import imgavaPart3 from '../../../../../public/assets/images/part3-ava.png';
import testBG from '../../../../../public/assets/images/test.png';
// import imgavaPart4 from '../../../../../public/assets/images/part4-ava.png'; 

class ImageBG extends Component {

    constructor(props) {
        super(props)
        this.state = {
            avaimg: '',
        }
    }

    checkImg = (dataP) => {
        let avaimg = ''
        let dataPart = dataP.data
        console.log('checkImg props dataPart', dataPart)
        if (dataPart === 'part1') {
            avaimg = 'imgavaPart1'
        } else if (dataPart === 'part2') {
            avaimg = 'imgavaPart2'
        } else if (dataPart === 'part3') {
            avaimg = 'imgavaPart3'
        } else if (dataPart === 'part4') {
            avaimg = 'imgavaPart2'
        } else if (dataPart === 'part5') {
            avaimg = 'imgavaPart2'
        } else if (dataPart === 'part6') {
            avaimg = 'imgavaPart2'
        } else if (dataPart === 'part7') {
            avaimg = 'imgavaPart2'
        }
        console.log('avaimg props dataPart', avaimg)
        return avaimg
    }

    componentDidUpdate = () => {
        let dataP = this.props.data
        let avaimg = this.checkImg(dataP)
        if (this.state.avaimg !== avaimg) {
            this.setState({
                avaimg: avaimg
            })
        }
    }

    componentDidMount = () => {

    }

    render() {
        if (this.state.avaimg === 'imgavaPart1') {
            return (
                <img src={imgavaPart1} alt="bg" className="img-fluid" />
            )
        } else if (this.state.avaimg === 'imgavaPart2') {
            return (
                <img src={imgavaPart2} alt="bg" className="img-fluid" />
            )
        } else {
            return (
                <img src={imgavaPart3} alt="bg" className="img-fluid" />
            )
        }
    }
}

class PartMain extends Component {
    constructor(props) {
        super(props)

    }

    componentDidUpdate = () => {
        console.log('componentDidUpdate PartMain props ', this.props)
    }

    render() {
        return (
            <>
          
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

export default connect(mapStateToProps, mapDispatchToProps)(PartMain);
