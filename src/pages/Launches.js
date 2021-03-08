import React, {Component} from 'react';
import $ from 'jquery';
import MissionCard from "./MissionCard";

export default class Launches extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pageData: props.pageData,
    };

    this.setPageData = this.setPageData.bind(this);
  }

  componentDidMount() {
    $.get(
      "https://api.spacexdata.com/v4/launches",
      this.setPageData,
    )
  }

  setPageData(data) {
    const rockets = [];
    const sites = [];

    data.forEach((node, idx) => {
      let rocket = node?.rocket;
      let site = node?.links?.reddit?.launch;

      if (rockets.indexOf(rocket) === -1) rockets.push(rocket);
      if (sites.indexOf(site) === -1) sites.push(site);
    });

    this.setState({
      pageData: data,
      rockets,
      sites,
    });
  }

  render() {
    const {pageData, rockets, sites, selectSite, selectRocket} = this.state;

    const filteredData = pageData?.filter((node, idx) => {
      if (selectSite && selectSite !== node?.links?.reddit?.launch) return;
      if (selectRocket && selectRocket !== node?.rocket) return;
      return true;
    });

    return <div>
      <h2>
        Launches
      </h2>

      <hr/>

      <div className="row SelectsGrid">
        <div className="Select">
          <label>
            Launch site
          </label>
          <select onChange={(e) => this.setState({selectSite: e.target.value})}>
            {sites?.map((site, idx) => <option value={site || ""} key={idx}>{site || "Не выбрано"}</option>)}
          </select>
        </div>
        <div className="Select">
          <label>
            Rocket
          </label>
          <select onChange={(e) => this.setState({selectRocket: e.target.value})}>
            <option value={""} key={-1}>Не выбрано</option>
            {rockets?.map((rocket, idx) => <option value={rocket} key={idx}>{rocket}</option>)}
          </select>
        </div>
      </div>
      <div className="row">
        {!!filteredData?.length
          ? filteredData?.map((mission, idx) => (
            <MissionCard data={mission} key={idx} />
          ))
          : <i>Нет миссий, подходящих под описание</i>}
      </div>
    </div>;
  }
}