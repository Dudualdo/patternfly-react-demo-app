import * as React from 'react';
import { Alert, Grid } from 'patternfly-react';

import { Wizard, Button } from 'patternfly-react';

const logo = require('../logo.svg');

const wizardSteps = [
  {
    title: 'General',
    render: () => <p>(Step 1 Contents Here)</p>
  },
  {
    title: 'Details',
    render: () => <p>(Step 2 Contents Here)</p>
  },
  {
    title: 'Results',
    render: () => <p>(Step 3 Contents Here)</p>
  }
];

const isLastStep = (step /* number */) => wizardSteps.length -1 ===  step;

export class WizardPatternExample extends React.Component {
  state = {
    showModal: false,
    loading: false,
    activeStepIndex: 0 // eslint-disable-line no-unused-state
  };

  close = () => { this.setState({ showModal: false, loading: false }); };
  hide = (e) => {
    // 'e' will always be true if the wizard is closed in the last step, and false in any other step.
    console.log(e); 
    this.close();
    console.log('Hiding ...');
  }

  exit = () => { 
    this.close();
    console.log('Closing ..');
    if (isLastStep(this.state.activeStepIndex)) {
      console.log('Final step.')
    }
  }

  onStepChanged = (index) => {
    console.log('Step', isLastStep(index) ? 'final' : index);
    this.setState({ activeStepIndex: index });
  }

  open = () => {
    console.log('Open ...');
    this.setState({ showModal: true, loading: true });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
  };

  renderStateless = () => {
    // We need knobs on the stateless example, because we must drive its state ourselves.
    const { loading, activeStepIndex } = this.state;

    return (
      <div>
        <Button bsStyle="primary" bsSize="large" onClick={this.open}>
          Launch Stateless Wizard
        </Button>

        <Wizard.Pattern
          show={this.state.showModal}
          onHide={this.hide}
          onExited={this.exit}

          title="Stateless Wizard Pattern Example"
          nextStepDisabled={false}
          steps={wizardSteps}
          loadingTitle="Loading..."
          loadingMessage="This may take a minute."
          onStepChanged={this.onStepChanged}
          loading={this.state.loading}
          activeStepIndex={activeStepIndex}
        />
      </div>
    );
  };
  renderStateful = () => {
    // No knobs for the stateful example, we want to let it control its own state.
    return (
      <div>
        <Button bsStyle="primary" bsSize="large" onClick={this.open}>
          Launch Stateful Wizard
        </Button>

        <Wizard.Pattern.Stateful
          show={this.state.showModal}
          onHide={this.hide}
          onExited={this.exit}
          title="Stateful Wizard Pattern Example"
          shouldDisableNextStep={activeStepIndex => false}
          steps={wizardSteps}
          loadingTitle="Loading..."
          loadingMessage="This may take a minute."
          loading={this.state.loading}
          closeText='finish'
        />
      </div>
    );
  };
  render() {
    return this.props.stateful ? this.renderStateful() : this.renderStateless();
  }
}

interface State {
  alertVisible: boolean;
}

class IpsumPage extends React.Component<any, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      alertVisible: true
    };
  }

  dismissAlert = () => {
    this.setState({ alertVisible: false });
  };

  render() {
    return (
      <Grid fluid className="container-pf-nav-pf-vertical">
				<WizardPatternExample stateful={false}/>
			</Grid>
    );
  }
}

export default IpsumPage;
