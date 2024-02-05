import React, { Component } from 'react';

import { connect } from 'react-redux';
import './PartTemplate.scss'
class PartTemplate extends Component {
    constructor(props) {
        super(props)

    }

    componentDidMount() {

    }

    render() {

        if (this.props.partName === "PART 1") {
            return (
                <div className="card-header py-3" >
                    {this.props.partName}
                    <div className='enter-row'></div>
                    <table>
                        <tr>
                            {this.props.partData && this.props.partData.map((item) => {
                                return (
                                    <td key={item}>
                                        <span className={(Number(item) < 10) ? 'parts itemLessThan10' : 'parts'}>{item}</span>
                                    </td>
                                )
                            })}
                        </tr>
                    </table>
                </div>
            );
        } else {
            let i = 0;
            return (
                <div className="card-header py-3" >
                    {this.props.partName}
                    <div className='enter-row'></div>
                    <table>
                        {this.props.partData && this.props.partData.map((itemPart, keyPart) => {
                            i++;
                            return (
                                <>
                                    <tr key={keyPart}>
                                        {itemPart[i] && itemPart[i].map((item) => {
                                            return (
                                                <td key={item}>
                                                    <span className={(Number(item) < 10) ? 'parts itemLessThan10' : 'parts'}>{item}</span>
                                                </td>
                                            )
                                        })}
                                    </tr>
                                    <div className='enter-row'></div>
                                </>
                            )
                        })}
                    </table>
                </div>

            );
        }

        // }
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

export default connect(mapStateToProps, mapDispatchToProps)(PartTemplate);
