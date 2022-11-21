import './App.css';
import '../node_modules/react-grid-layout/css/styles.css';
import '../node_modules/react-resizable/css/styles.css';
import React from 'react'
import { nanoid } from 'nanoid';
import GridLayout from "react-grid-layout";

function App() {
  return (
    <div>
      <PendingApp />
    </div>
  );
}

export default App;

const PendingStates = {
  Active: 'Active',
  Deleted: 'Deleted',
  Done: 'Done'
};

class PendingApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddPending = this.handleAddPending.bind(this);
    this.handleDeletePending = this.handleDeletePending.bind(this);
    this.handleMarkDone = this.handleMarkDone.bind(this);
    this.state = { pendings: [] };
  }

  handleAddPending(pending) {
    this.state.pendings.push(pending);
    this.setState({ pendings: this.state.pendings })
  }

  handleDeletePending(id) {
    const pending = this.state.pendings.find(p => p.id === id);
    pending.currentState = PendingStates.Deleted;
    this.setState({ pendings: this.state.pendings });
  }

  handleMarkDone(id) {
    const pending = this.state.pendings.find(p => p.id === id);
    pending.currentState = PendingStates.Done;
    this.setState({ pendings: this.state.pendings });
  }

  render() {
    return (
      <div>
        <div class="Pending-grid">
          <ActivePendingsGrid pendings={this.state.pendings} onMarkDone={this.handleMarkDone} onDelete={this.handleDeletePending} onAddPending={this.handleAddPending} />
        </div>
        <div class="Counter">
          <Counter pendings={this.state.pendings} />
        </div>
      </div>);
  }
}

class ActivePendingsGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pendings: props.pendings, isAddPendingState: false }
    this.setAddPendingState = this.setAddPendingState.bind(this);
    this.handleAddPending = this.handleAddPending.bind(this);
  }

  getLayout() {
    let counter = 1;
    let result = { fullLayout: [], pendingsLayout: [], addPendingLayout: null };
    const addPendingItem = this.getAddPendingItem();
    result.fullLayout.push(addPendingItem);
    result.addPendingLayout = addPendingItem;
    const activePendings = this.getActivePendings();
    activePendings.forEach(p => {
      const layout = this.getActiePendingItem(p, counter);
      counter++;
      result.pendingsLayout.push(layout);
      result.fullLayout.push(layout);
    });

    return result;
  }

  handleAddPending(pending) {
    this.setState({ isAddPendingState: false });
    this.props.onAddPending(pending);
  }

  setAddPendingState() {
    this.setState({ isAddPendingState: true });
  }

  getAddPendingItem() {
    return { i: nanoid().toString(), x: 0, y: 0, w: 1, h: 1, static: true }
  }

  getActiePendingItem(pending, counter) {
    return { i: pending.id, x: counter++ % 4, y: 0, w: 1, h: 1, pending: pending };
  }

  getActivePendings() {
    return this.state.pendings.filter(p => p.currentState === PendingStates.Active);
  }

  renderAddPendingItem() {
    if (this.state.isAddPendingState) {
      return (<AddPendingForm onAddPending={this.handleAddPending} />)
    }
    else {
      return (<AddPendingButton onClick={this.setAddPendingState} />)
    }
  }

  renderActivePendingItem(pending) {
    return (<div key={pending.id}><PendingItem key={pending.id} {...pending} onMarkDone={this.props.onMarkDone} onDelete={this.props.onDelete} /></div>);
  }

  render() {
    const layout = this.getLayout();

    return (
      <GridLayout
        className="layout"
        layout={layout.fullLayout}
        cols={4}
        width={1300}
        rowHeight={350}
        isResizable={false}
      >
        <div key={layout.addPendingLayout.i}>{this.renderAddPendingItem()}</div>
        {layout.pendingsLayout.map(p => {
          return (this.renderActivePendingItem(p.pending))
        })}
      </GridLayout>
    );
  }
}

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pendings: props.pendings };
  }

  countPendingsByState(state) {
    return this.state.pendings.filter(p => p.currentState === state).length;
  }

  render() {
    return (<div>Active: {this.countPendingsByState(PendingStates.Active)} Done: {this.countPendingsByState(PendingStates.Done)}</div>);
  }
}

class AddPendingButton extends React.Component {
  render() {
    return (
      <div class='Pending-grid-item' onClick={this.props.onClick}>
        Add pending
      </div>);
  }
}

class AddPendingForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { item: { id: nanoid().toString(), description: '', priority: '1', currentState: PendingStates.Active } }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onAddPending(this.state.item);
  }

  handleChange(e) {
    this.setState({
      item: {
        ...this.state.item,
        [e.target.name]: e.target.value
      }
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} class='Pending-grid-item'>
        <table>
          <tr>
            <td>Description:</td>
            <td><input type="text" value={this.state.item.description} onChange={this.handleChange} name="description" /></td>
          </tr>
          <tr>
            <td>Priority:</td>
            <td>
              <select value={this.state.item.priority} onChange={this.handleChange} name="priority">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>Status:</td>
            <td>
              <select value={this.state.item.currentState} onChange={this.handleChange} name="currentState">
                <option value={PendingStates.Active}>{PendingStates.Active}</option>
                <option value={PendingStates.Done}>{PendingStates.Done}</option>
                <option value={PendingStates.Deleted}>{PendingStates.Deleted}</option>
              </select>
            </td>
          </tr>
        </table>
        <input type="submit" value="Add pending" />
      </form>)
  }
}

class PendingItem extends React.Component {
  constructor(props) {
    super(props);

    this.description = props.description;
    this.priority = props.priority;
    this.id = props.id;
    this.handleMarkDone = this.handleMarkDone.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleMarkDone() {
    this.props.onMarkDone(this.id);
  }

  handleDelete() {
    this.props.onDelete(this.id);
  }

  render() {
    return (<div class='Pending-grid-item'><div>Description: {this.description}</div><div>Priority: {this.priority}</div><div><DoneButton onClick={this.handleMarkDone} /><DeleteButton onClick={this.handleDelete} /></div></div>);
  }
}

class DoneButton extends React.Component {
  render() {
    return (<button onClick={this.props.onClick}>Done</button>);
  }
}

class DeleteButton extends React.Component {
  render() {
    return (<button onClick={this.props.onClick}>Delete</button>);
  }
}