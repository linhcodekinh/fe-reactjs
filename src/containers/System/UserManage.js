import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
class UserManage extends Component {

    state = {

    }

    componentDidMount() {

    }


    render() {
        return (
            <div className="container">
              <h2 className="mb-5 title-mana">Quản lý account</h2>
              <div className="table-responsive custom-table-responsive">
                <table className="table custom-table">
                  <thead>
                    <tr>  
                      <th scope="col">
                        <label className="control control--checkbox">
                          <input type="checkbox" className="js-check-all" />
                          <div className="control__indicator" />
                        </label>
                      </th>
                      <th scope="col">Order</th>
                      <th scope="col">Name</th>
                      <th scope="col">Occupation</th>
                      <th scope="col">Contact</th>
                      <th scope="col">Education</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr scope="row">
                      <th scope="row">
                        <label className="control control--checkbox">
                          <input type="checkbox" />
                          <div className="control__indicator" />
                        </label>
                      </th>
                      <td>
                        1392
                      </td>
                      <td><a href="#">James Yates</a></td>
                      <td>
                        Web Designer
                        <small className="d-block">Far far away, behind the word mountains</small>
                      </td>
                      <td>+63 983 0962 971</td>
                      <td>NY University</td>
                    </tr>
                    <tr className="spacer"><td colSpan={100} /></tr>
                    <tr className="active">
                      <th scope="row">
                        <label className="control control--checkbox">
                          <input type="checkbox" defaultChecked />
                          <div className="control__indicator" />
                        </label>
                      </th>
                      <td>4616</td>
                      <td><a href="#">Matthew Wasil</a></td>
                      <td>
                        Graphic Designer
                        <small className="d-block">Far far away, behind the word mountains</small>
                      </td>
                      <td>+02 020 3994 929</td>
                      <td>London College</td>
                    </tr>
                    <tr className="spacer"><td colSpan={100} /></tr>
                    <tr>
                      <th scope="row">
                        <label className="control control--checkbox">
                          <input type="checkbox" />
                          <div className="control__indicator" />
                        </label>
                      </th>
                      <td>9841</td>
                      <td><a href="#">Sampson Murphy</a></td>
                      <td>
                        Mobile Dev
                        <small className="d-block">Far far away, behind the word mountains</small>
                      </td>
                      <td>+01 352 1125 0192</td>
                      <td>Senior High</td>
                    </tr>
                    <tr className="spacer"><td colSpan={100} /></tr>
                    <tr>
                      <th scope="row">
                        <label className="control control--checkbox">
                          <input type="checkbox" />
                          <div className="control__indicator" />
                        </label>
                      </th>
                      <td>9548</td>
                      <td><a href="#">Gaspar Semenov</a></td>
                      <td>
                        Illustrator
                        <small className="d-block">Far far away, behind the word mountains</small>
                      </td>
                      <td>+92 020 3994 929</td>
                      <td>College</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
