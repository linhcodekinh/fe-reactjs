import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter,
  Form, FormGroup, Label, Input, FormText } from 'reactstrap';
  import {DatePicker} from 'reactstrap-date-picker'
class ModalUser extends Component {

    constructor(props){
        super(props)
        this.state = {
            datetime: new Date().toISOString()
        }
    }

    toggle = () => {
        this.props.toggleModalUser();
    }

    componentDidMount() {
    }


    render() {
        console.log('check child props ', this.props)
        console.log('check child open modal ', this.props.isOpen)
        console.log('check child open modal 2', this.props.arrPos)
        let arrPos = this.props.arrPos;
        console.log('arrPos', arrPos)
        return (
            <Modal 
              isOpen={this.props.isOpen}
              arrPos={this.props.arrPos}
              toggle={() => this.toggle()}
              className={'modaluser-class'}
              size = "lg"
              centered
            >
              <ModalHeader toggle={() => this.toggle()}>Add New User</ModalHeader>
              <ModalBody>
              {/* <div className="row">
                  <div className="col-6">
                      <Label className="label-input-text" for="exampleUserName">User Name</Label>
                      <Input className="input-text" type="text" name="username" id="exampleUserName" placeholder="input user name" />
                  </div>
                  <div className="col-6">
                      <Label className="label-input-text" for="exampleEmail">Email</Label>
                      <Input className="input-text" type="email" name="email" id="exampleEmail" placeholder="input email" />
                  </div>
              </div>
              <br/>
              <div className="row">
                  <div className="col-6">
                      <Label className="label-input-text" for="examplePassWord">Password</Label>
                      <Input className="input-text" type="password" name="password" id="examplePassWord" placeholder="input password   " />
                  </div>
                  <div className="col-6">
                      <Label className="label-input-text" for="exampleEmail">Active</Label>
                      <Label className="label-radio">
                        <input name="radio-active" type="radio" />{' '}TRUE
                      </Label>
                      <Label className="label-radio">
                        <input name="radio-active" type="radio" />{' '}FALSE
                      </Label>
                  </div>
              </div>
              <br/>
              <div className="row">
                  <div className="col-8">
                      <Label className="label-input-text" for="exampleEmail">Role</Label>
                      <Label className="label-checkbox">
                        <input type="checkbox" />{' '}ADMIN
                      </Label>
                      <Label className="label-checkbox">
                        <input type="checkbox" />{' '}ADMIN2
                      </Label>
                      <Label className="label-checkbox">
                        <input type="checkbox" />{' '}USER
                      </Label>
                      

                  </div>
              </div> */}
                <Form>
                <Row className="row-cols-lg-12 g-3 align-items-center">
                    <Col>
                    <Label className="label-input-text" for="exampleUserName">
                        User Name
                    </Label>
                    <Input
                        className="input-text"
                        id="exampleUserName"
                        name="email"
                        placeholder="input user name"
                        type="email"
                    />
                    </Col>

                    <Col>
                    <Label className="label-input-text" for="exampleEmail">
                        Email
                    </Label>
                    <Input
                        className="input-text"
                        id="exampleEmail"
                        name="email"
                        placeholder="with a placeholder"
                        type="email"
                    />
                    </Col>
                </Row>
                <br/>
                <Row className="row-cols-lg-12 g-3 align-items-center">
                    <Col>
                    <Label className="label-input-text" for="examplePassword">
                        Password
                    </Label>
                    <Input
                        className="input-text"
                        id="examplePassword"
                        name="email"
                        placeholder="input user name"
                        type="password"
                    />
                    </Col>

                    <Col>
                        <Label className="label-input-text">
                            Active
                        </Label>
                        <Label className="label-radio">
                            <Input name="radio-active" type="radio" />{' '}TRUE
                        </Label>
                        <Label className="label-radio">
                            <Input name="radio-active" type="radio" />{' '}FALSE
                        </Label>
                    </Col>
                </Row>
                <br/>
                <Row className="row-cols-lg-12 g-3 align-items-center">
                    <Col>
                        <Label className="label-input-text">
                            Role
                        </Label>
                        <Label className="label-checkbox">
                            <Input type="checkbox" />{' '}ADMIN
                        </Label>
                        <Label className="label-checkbox">
                            <Input type="checkbox" />{' '}ADMIN2
                        </Label>
                        <Label className="label-checkbox">
                            <Input type="checkbox" />{' '}USER
                        </Label>
                    </Col>
                </Row>
                <br/>
                <Row className="row-cols-lg-12 g-3 align-items-center">
                    <Col>
                        <Label className="label-input-text">
                            Type
                        </Label>
                        <Label className="label-checkbox">
                            <Input type="checkbox" />{' '}MEMBER
                        </Label>
                        <Label className="label-checkbox">
                            <Input type="checkbox" />{' '}EMPLPOYEE
                        </Label>
                    </Col>
                </Row>
                <br/>
                <Row className="row-cols-lg-12 g-3 align-items-center">
                    <Col>
                    <Label className="label-input-text" for="exampleYourName">
                        Name
                    </Label>
                    <Input
                        className="input-text"
                        id="exampleYourName"
                        name="name"
                        placeholder="input your name"
                        type="text"
                    />
                    </Col>

                    <Col>
                        <Label className="label-input-text">
                            Gender
                        </Label>
                        <Label className="label-radio">
                            <Input name="radio-active" type="radio" />{' '}MALE
                        </Label>
                        <Label className="label-radio">
                            <Input name="radio-active" type="radio" />{' '}FEMALE
                        </Label>
                    </Col>
                </Row>
                <br/>
                <Row className="row-cols-lg-12 g-3 align-items-center">
                    <Col>
                        <Label className="label-input-text" for="exampleYourName">
                            Date of birth
                        </Label>

                        <Label className="label-radio">
                            <Input name="radio-active" type="radio" />{' '}TRUE
                        </Label>
                        <Label className="label-radio">
                            <Input name="radio-active" type="radio" />{' '}FALSE
                        </Label>
                    </Col>
                    <Col>
                        <Label className="label-input-text">
                            Phone
                        </Label>
                        <Input
                            className="input-text"
                            id="exampleYourPhone"
                            name="phone"
                            placeholder="input your phone"
                            type="text"
                        />
                    </Col>
                </Row>
                <br/>
                <Row className="row-cols-lg-12 g-3 align-items-center">
                    <Col>
                        <Label className="label-input-text">
                            Address
                        </Label>
                        <Input
                            className="input-text"
                            id="exampleYourAddress"
                            name="address"
                            placeholder="input your address"
                            type="text"
                        />
                    </Col>
                    <Col>
                        <Label className="label-input-text">
                            Position
                        </Label>
                        {arrPos && arrPos.map((item,index) => {
                            return (
                                <Label className="label-radio" key={index}>
                                    <Input name="radio-pos" type="radio" />{' '}{item.name}
                                </Label>
                            )
                        })}
                    </Col>
                </Row>
                </Form>
              </ModalBody>
              <ModalFooter>
                <Button color="primary px-3" onClick={() => this.toggle()}>Save changes</Button>{' '}
                <Button color="secondary px-3" onClick={this.toggle}>Close</Button>
              </ModalFooter>
            </Modal>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
