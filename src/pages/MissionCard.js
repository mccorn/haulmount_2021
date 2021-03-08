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
    const {data, filters} = this.props;
    const {selectSite, selectRocket} = filters;
    // node?.links?.reddit?.launch

    if (!data) return null;
    // if (selectSite && data?.links?.reddit?.launch !== selectSite) return null;
    // if (selectRocket && data.rocket !== selectRocket) return null;

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
        <div className="MissionCard-Details">
          <div className="row">{data.details || (data.upcoming ? "upcoming" : "!upcoming")}</div>
          <div className="row">{data?.links?.reddit?.launch}</div>
          <div className="row">{data.rocket}</div>
        </div>
      </div>
    </div>;
  }
}