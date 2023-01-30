import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,
  Form, FormGroup, Label, Input, FormText } from 'reactstrap';
class ModalUser extends Component {

    constructor(props){
        super(props)
        this.state = {

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
        return (
            <Modal 
              isOpen={this.props.isOpen}
              toggle={() => this.toggle()}
              className={'modaluser-class'}
              size = "lg"
              centered
            >
              <ModalHeader toggle={() => this.toggle()}>Modal title</ModalHeader>
              <ModalBody>
              <div className="row">
                  <div className="col-6">
                      <Label for="exampleEmail">Email</Label>
                      <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
                  </div>
                  <div className="col-6">
                      <Label for="exampleEmail">Name</Label>
                      <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
                  </div>
              </div>
              <br/>
              <div className="row">
                  <div className="col-6">
                      <Label for="exampleEmail">Email</Label>
                      <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
                  </div>
                  <div className="col-6">
                      <Label for="exampleEmail">Name</Label>
                      <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
                  </div>
              </div>
              <br/>
              <div className="row">
                  <div className="col-6">
                      <Label for="exampleEmail">Email</Label>
                      <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
                  </div>
                  <div className="col-6">
                      <Label for="exampleEmail">Name</Label>
                      <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
                  </div>
              </div>
              <br/>
              <div className="row">
                  <div className="col-6">
                      <Label for="exampleEmail">Email</Label>
                      <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
                  </div>
                  <div className="col-6">
                      <Label for="exampleEmail">Name</Label>
                      <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
                  </div>
              </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={() => this.toggle()}>Do Something</Button>{' '}
                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
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
