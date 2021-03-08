import React, {Component} from 'react';
import './MissionCard.css';

export default class MissionCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pageData: props.pageData,
    }
  }

  render() {
    const {data} = this.props;

    if (!data) return null;
    const date = new Date(data.date_local);

    return <div className="MissionCard">
      <div className="MissionCard-Image">
        <img src={data.links?.patch?.small} />
      </div>
      <div>
        <div className="MissionCard-Header">
          <div className="MissionCard-Title">{data.name}</div>
          <div className="MissionCard-Date">{date.getDate()}.{date.getMonth()}.{date.getFullYear()}</div>
        </div>
        <div className="MissionCard-Details">{data.details || data.upcoming}</div>
      </div>
    </div>;
  }
}