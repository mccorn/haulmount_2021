import React, {Component} from 'react';
import $ from 'jquery';
import MissionCard from "./MissionCard";

export default class Launches extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pageData: props.pageData,
    }
  }

  componentDidMount() {
    $.get(
      "https://api.spacexdata.com/v4/launches",
      (data) => {
        console.log('arg', data);
        this.setState({pageData: data})
      }
    )
  }

  render() {
    const {pageData} = this.state;

    return <div>
      Launches

      <div>
        {pageData?.map((mission, idx) => (
          <MissionCard data={mission} key={idx} />
        ))}
      </div>
    </div>;
  }
}