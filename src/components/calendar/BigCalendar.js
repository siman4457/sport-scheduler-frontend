import React, {Component} from 'react';
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from 'moment';
// import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from 'axios'
import { Dropdown } from 'react-bulma-components';
// import ModalContent from './ModalContent'

const localizer = momentLocalizer(moment);
// const DnDCalendar = withDragAndDrop(Calendar);

class BigCalendar extends Component {
    state = {
        events: [],
        show: false,
        selectedEvent: {},
        availableEmployees: [],
        selectedEmployee: {}
    };

    componentDidMount(){
        axios.get("http://localhost:5000/games/getGames").then(
          res => {
              let games = []
              res.data.games.forEach(game => {
                games.push({
                  title: game.title,
                  start: moment(game.datetime).toDate(),
                  end: moment(game.datetime).add(2,'hours').toDate(),
                  resource: game._id,
                  isAssigned: game.employeeId ? true : false
                })
              });
              this.setState({events:games})
            }
      )
      .catch(err=> err)
    }

    onEventResize = (data) => {
      const { start, end } = data;

      this.setState((state) => {
        state.events[0].start = start;
        state.events[0].end = end;
        return { events: [...state.events] };
      });
    };

  onEventDrop = (data) => {
    console.log(data);
    const { start, end } = data;
    let event = this.state.events.find(e => e.resource === data.event.resource)
    let index = this.state.events.findIndex(e => e.resource === data.event.resource)
  
    if(event){
      this.setState((state) => {
      state.events[index].start = start;
      state.events[index].end = end;
      return { events: [...state.events] };
      });
    }
  }

  eventStyleGetter = (event, start, end, isSelected) => {
    if(event.isAssigned === true){
      let green = '#73cc5a';
      let style = {
        backgroundColor: green,
        opacity: 0.8,
        color: 'white',
        border: '0px',
        display: 'block'
      };
      
      return {style: style};
    }
  }
  
  onSelectEvent = async (data) => {
    const req = {
      start: data.start,
      end: data.end
    }
    
    this.setState({show: true});
    this.setState({selectedEvent:data});
    await axios.post("http://localhost:5000/schedule/findAvailableEmployees", req)
    .then(res => {
      if(res.data.availableEmployees){
        this.setState({selectedEmployee: res.data.availableEmployees[0]})
      }
      this.setState({availableEmployees:res.data.availableEmployees})
    })
    .catch(err=> console.log(err))
    
  }

  handleSelect = (option) => {
    this.setState({selectedEmployee:option});
  }
  
  handleSave = async (employee, game) => {
    if(employee && game){
      const req =  {
        employeeId: employee._id,
        gameId: game.resource
      }
      await axios.post("http://localhost:5000/schedule/scheduleGame", req)
      .then(res => {
        console.log(res.data.message)
      })
      .catch(err => console.log(err))
    }
    
    
  }

  render() {
    return (
      <div className="App">
        {/* Change Calendar to DndCalendar and uncomment DndCalendar above if you want drag and drop capability */}
        <Calendar
          defaultDate={moment().toDate()}
          defaultView="week"
          events={this.state.events}
          localizer={localizer}          
          onEventDrop={this.onEventDrop}
          onEventResize={this.onEventResize}
          resizable
          style={{ height: "90vh" }}
          onSelectEvent={this.onSelectEvent}
          eventPropGetter={(this.eventStyleGetter)}
        />
        

        {/**** ASSIGN GAME MODAL ****/}
        <div className={ this.state.show ? "modal is-active" : "modal"}>
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">{this.state.selectedEvent.title}</p>
              <button onClick={() => this.setState({ show: false })} className="delete" aria-label="close"></button>
            </header>
            <section className="modal-card-body">
            <Dropdown value={this.state.selectedEmployee} onChange={this.handleSelect}>
              {this.state.availableEmployees && this.state.availableEmployees.map(employee => (
                  <Dropdown.Item key={employee._id} value={employee}>
                      {employee.first_name} {employee.last_name}
                  </Dropdown.Item>
              ))}
            </Dropdown>
            </section>
            <footer className="modal-card-foot">
              <button className="button is-success" onClick={() => this.handleSave(this.state.selectedEmployee, this.state.selectedEvent)}>Save changes</button>
              <button className="button" onClick={() => this.setState({ show: false })}>Cancel</button>
            </footer>
          </div>
        </div>
      </div>
    );
  }
}

export default BigCalendar;
