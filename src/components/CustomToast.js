import React, { Component, Fragment } from 'react';
import { FormattedMessage, FormattedTime } from 'react-intl';
import CustomScrollBar from '../components/CustomScrollbars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './CustomToast.scss';

class CustomToast extends Component {

    render() {
        const { titleId, message, messageId, time } = this.props;
        console.log(message)
        return (
            <Fragment>
                <div className="toast-item">
                    <div className="toast-title">
                        <FontAwesomeIcon icon={['fa', 'fa-exclamation-triangle']} />{" "}
                        <FormattedMessage id={titleId} />
                        {time && (
                            <span className="date">
                                <FormattedTime hour='numeric' minute='numeric' second='numeric' hour12={true} value={time} />
                            </span>
                        )}
                    </div>
                    {
                        (message && typeof message === 'object') ?
                            <CustomScrollBar autoHeight={true} autoHeightMin={50} autoHeightMax={100}>
                                {

                                    message.map((msg, index) => {
                                        return (
                                            <Fragment key={index}>
                                                <div className="toast-content">{msg}</div>
                                            </Fragment>
                                        )
                                    })
                                }
                            </CustomScrollBar> :
                            <div className="toast-content">
                                {message ? message : (messageId ? (<FormattedMessage id={messageId} />) : null)}
                            </div>
                    }
                </div>
            </Fragment>
        );
    }
}

export class CustomToastCloseButton extends Component {

    render() {
        return (
            <button type="button" className="toast-close" onClick={this.props.closeToast}>
                <FontAwesomeIcon icon={['fa', 'fa-times-circle']} />
            </button>
        );
    }
}

export default CustomToast;