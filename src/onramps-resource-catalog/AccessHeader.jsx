import React from 'react';
import styles from "./ResourceCatalog.module.scss";

const AccessHeader = ({ baseUrl }) => {
  return (
    <>
      <div className="row">
        <div className="col d-flex">
          <img alt="Access Logo" style={{ height: "75px" }} src={`${baseUrl}/access_logo.png`} />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <h3 className="border-bottom">The ACCESS On-Ramps Program</h3>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <p>
            Need more advanced computing and storage options for your work?
            The On-Ramps program offers your institution cost-free entry to the nation's
            cyberinfrastructure resources. Simply select a resource from the catalog below to
            get started. On-Ramps expands your cyberinfrastructure with many powerful resource options.
          </p>
          <p>
            <a href="https://allocations.access-ci.org" target="_blank">Learn more on our About On-Ramps page</a>
          </p>
          <h4 className="border-bottom">About ACCESS</h4>
          <p>
            ACCESS is a program established and funded by the National Science Foundation to
            help researchers and educators, with or without supporting grants,
            to utilize the nation's advanced computing systems and services — at no cost.
          </p>
          <p>
            <a
              href="https://access-ci.org"
              target="_blank"
              className="btn btn-info me-2 fw-bold"
            >Learn more about ACCESS <i className='bi bi-box-arrow-up-right'></i></a>
            <a
              href="https://allocations.access-ci.org/get-your-first-project"
              target="_blank"
              className={`btn btn-secondary fw-bold ${styles.btnSecondary}`}
            >Get Your First Project <i className='bi bi-box-arrow-up-right'></i></a>
          </p>
        </div>
      </div>

    </>
  )
}

export default AccessHeader;