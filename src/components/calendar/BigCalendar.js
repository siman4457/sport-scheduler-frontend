import React, {Component} from 'react';
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from 'moment';
// import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from 'axios'

const localizer = momentLocalizer(moment);
// const DnDCalendar = withDragAndDrop(Calendar);

class BigCalendar extends Component {
    state = {
        events: [],
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
                  resource: game._id
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

  onSelectEvent = (data) => {
    console.log(data)
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
        />
      </div>
    );
  }
}

export default BigCalendar;
