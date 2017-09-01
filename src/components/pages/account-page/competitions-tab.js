import React from "react";
import { Button, Table, Input, Modal } from "react-materialize";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { memberCompetitions } from "../../../actions";
import { RightButtonPanel, VerticalNav } from "../../utilities";
import CreateContestForm from "../../forms/create-contest";
import CreateCompetitionForm from "../../forms/create-competition";
import JoinCompetitionForm from "../../forms/join-competition";

class CompetitionsTab extends React.Component {
  componentWillMount() {
    this.props.memberCompetitions();
  }

  competitionTabs = competition => {
    return {
      "info": {
        title: "Information",
        view: <div className="round-container">
          <ul>
            <li><h3>Competition Info<a className="right black-text"><i className="fa fa-pencil" aria-hidden="true"></i></a></h3></li>
            <li>Name: Carnegie Mellon Informatics and Mathematics Competition</li>
            <li>Short name: CMIMC</li>
            <li>Website: <a className="teal-text text-darken-3">cmimc.org</a></li>
            <li><h3>Membership Info</h3></li>
            <li>Your are a: <span className="bold-text">(member/secure member/director)</span></li>
            <li><a className="teal-text text-darken-3">Step down as director</a></li>
            <li><a className="teal-text text-darken-3">Leave competition</a></li>
            <li><h3>Database</h3></li>
            <li><Link to="/view-database" className="btn teal darken-3">View database</Link></li>
          </ul>
        </div>
      },
      "members": {
        title: "Members",
        view: <div className="round-container">
          <Button className="teal darken-3">Add new member</Button>
          <h3>Roster</h3>
          <Table className="roster">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Membership</th>
                <th className="center-align">Remove</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Cody Johnson</td>
                <td>ctj@math.cmu.edu</td>
                <td>member (<a className="teal-text text-darken-3">change permissions</a>)</td>
                <td className="center-align"><a className="black-text"><i className="fa fa-times" aria-hidden="true"></i></a></td>
              </tr>
              <tr>
                <td>Cody Johnson</td>
                <td>ctj@math.cmu.edu</td>
                <td>member (<a className="teal-text text-darken-3">change permissions</a>)</td>
                <td className="center-align"><a className="black-text"><i className="fa fa-times" aria-hidden="true"></i></a></td>
              </tr>
              <tr>
                <td>Cody Johnson</td>
                <td>ctj@math.cmu.edu</td>
                <td>member (<a className="teal-text text-darken-3">change permissions</a>)</td>
                <td className="center-align"><a className="black-text"><i className="fa fa-times" aria-hidden="true"></i></a></td>
              </tr>
            </tbody>
          </Table>
        </div>
      },
      "contests": {
        title: "Contests",
        view: <div className="round-container">
          <Modal header="Create Contest" trigger={ <Button className="teal darken-3">Create contest</Button> }>
            <CreateContestForm />
          </Modal>
          <div style={{borderBottom: "1px solid #cfd8dc"}}>
            <h3>CMIMC 2018<a className="right black-text"><i className="fa fa-times" aria-hidden="true"></i></a><a className="right right-space black-text"><i className="fa fa-pencil" aria-hidden="true"></i></a></h3>
            <ul>
              <li><a href="/view-contest" className="teal-text text-darken-3">View contest</a></li>
              <li>Date: January 28th, 2018</li>
              <li>Test solve deadline: January 14th, 2018</li>
              <li>Location(s): Carnegie Mellon University (5000 Forbes Ave, Pittsburgh, PA), CMU Qatar Campus (14 Jihad St, Al Qaeda, Qatar)</li>
              <li>Status: <span className="bold-text">(active/inactive)</span> (<a className="teal-text text-darken-3">mark as inactive</a>)</li>
            </ul>
          </div>
          <div style={{borderBottom: "1px solid #cfd8dc"}}>
            <h3>CMIMC 2018<a className="right black-text"><i className="fa fa-times" aria-hidden="true"></i></a><a className="right right-space black-text"><i className="fa fa-pencil" aria-hidden="true"></i></a></h3>
            <ul>
              <li><a href="/view-contest" className="teal-text text-darken-3">View contest</a></li>
              <li>Date: January 28th, 2018</li>
              <li>Test solve deadline: January 14th, 2018</li>
              <li>Location(s): Carnegie Mellon University (5000 Forbes Ave, Pittsburgh, PA), CMU Qatar Campus (14 Jihad St, Al Qaeda, Qatar)</li>
              <li>Status: <span className="bold-text">(active/inactive)</span> (<a className="teal-text text-darken-3">mark as inactive</a>)</li>
            </ul>
          </div>
        </div>
      }
    };
  }

  render () {
    const { competitions: { content, message, requestStatus } } = this.props;
    return (
      <div style={{marginTop: "36px"}}>
        <Modal
          header="Request to Join a Competition"
          trigger={ <Button className="teal darken-3">Join a competition</Button> }>
          <JoinCompetitionForm />
        </Modal>
          {
            content && content.map((competition, idx) => (
              <div key={idx}>
                <h2 className="teal-text text-darken-3">{ competition.short_name }</h2>
                <div style={{borderBottom: "1px solid #cfd8dc"}}>
                  <VerticalNav tabs={ this.competitionTabs(competition) } active="info" />
                </div><br />
              </div>
            ))
          }
        <RightButtonPanel>
          Does your competition want to join USMCA? <Modal header="Form a Competition" trigger={<a className="teal-text text-darken-3">Register your competition.</a>}>
            <CreateCompetitionForm />
          </Modal>
        </RightButtonPanel>
      </div>
    );
  }
}

const mapStateToProps = state => ({
        competitions: state.competitions.memberCompetitions
      }),
      mapDispatchToProps = dispatch => ({
        memberCompetitions: () => { memberCompetitions()(dispatch); }
      });

export default connect(mapStateToProps, mapDispatchToProps)(CompetitionsTab);
