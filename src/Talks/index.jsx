//> React
// Contains all the functionality necessary to define React components
import React from "react";

//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import {
  MDBTabPane,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBBtn,
} from "mdbreact";

//> CSS
import "./projects.scss";

class Talks extends React.Component {
  state = {};

  render() {
    const { repoList } = this.props;

    return (
      <MDBTabPane tabId={this.props.id} role="tabpanel">
        <h3 className="font-weight-bold">Repositories</h3>
        <MDBRow className="project-list">
        {repoList && repoList.map((repo, i) => {
          return(
            <MDBCol md="6" key={i}>
              <a
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <li>
                <div>
                  <p className="lead mb-1 float-left">
                  {repo.name.length > 25 ? ( repo.name.substring(0,25)+"..." ) : ( repo.name )}
                  </p>
                  {repo.languages.length > 0 &&
                  <small className="mb-1 float-right text-muted">
                  <MDBIcon icon="square" className="pr-1" style={{color: repo.languages[0].color}} />
                  {repo.languages[0].name}
                  </small>
                  }
                </div>
                <div className="clearfix" />
                <div>
                  <img src={repo.avatarUrl} alt={repo.name}/>
                  <small>Owned by {repo.owner.username}</small>
                </div>
                <div className="py-2">
                  <img 
                  className="img-badge"
                  />
                </div>
                </li>
              </a>
            </MDBCol>
          );
        })}
        </MDBRow>
      </MDBTabPane>
    );
  }
}

export default Talks;

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © Simon Prast
 */
