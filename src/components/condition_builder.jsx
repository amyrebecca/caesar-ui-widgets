
import React from 'react';
import {
  Col,
  ControlLabel,
  FormControl,
  FormGroup,
  Grid,
  Panel,
  Row,
} from 'react-bootstrap';
import css from '../styl/index.styl'; // eslint-disable-line no-unused-vars
import ConditionViewer from './condition_viewer';

class ConditionBuilder extends React.Component {
  constructor() {
    super();
    this.state = {
      conditionString: '["gte", ["const", 4], ["const", 3]]',
      showBuilder: true,
      validCondition: true,
      lastParse: ['gte', ['const', 4], ['const', 3]],
    };

    this.toggleBuilder = this.toggleBuilder.bind(this);
    this.updateCondition = this.updateCondition.bind(this);
    this.getValidationState = this.getValidationState.bind(this);
  }

  getValidationState() {
    const { validCondition } = this.state;
    return validCondition ? 'success' : 'error';
  }

  toggleBuilder() {
    const { showBuilder } = this.state;
    this.setState({ showBuilder: !showBuilder });
  }

  updateCondition(evt) {
    const expr = evt.target.value;
    let { lastParse, validCondition } = this.state;

    try {
      const parse = JSON.parse(expr);
      if (parse != null && parse instanceof Array) {
        validCondition = true;
        lastParse = parse;
      }
    } catch (ex) {
      validCondition = false;
    }
    this.setState({
      conditionString: expr,
      validCondition,
      lastParse,
    });
  }

  render() {
    const {
      showBuilder,
      conditionString,
      lastParse,
    } = this.state;
    const builderDisplay = showBuilder ? 'block' : 'none';

    return (
      <Grid fluid>
        <Row>
          <Col xs="12" md="12">
            <h1>
              Condition Builder
            </h1>
          </Col>
        </Row>
        <Row>
          <Col xs="12" md="12">
            <FormGroup
              controlId="formCondition"
              validationState={this.getValidationState()}
            >
              <ControlLabel>
                Condition
              </ControlLabel>
              <FormControl
                type="text"
                value={conditionString}
                onChange={this.updateCondition}
              />
              <FormControl.Feedback />
            </FormGroup>
          </Col>
        </Row>
        <Row style={{ display: builderDisplay }}>
          <Col xs="12" md="12">
            <Panel>
              <Panel.Body>
                <ConditionViewer condition={lastParse} />
              </Panel.Body>
            </Panel>
          </Col>
        </Row>
        <Row>
          <Col xs="12" md="12">
            <div className="pull-right">
              <button
                type="submit"
                className="btn btn-default"
                data-toggle="collapse"
                data-target="#builder"
                href="builder"
                aria-expanded="false"
                aria-controls="builder"
                onClick={() => this.toggleBuilder()}
              >
                Condition Builder
              </button>
              &nbsp;
              <button type="submit" className="btn btn-primary">
                Update
              </button>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}
/* eslint-enable */

export default ConditionBuilder;