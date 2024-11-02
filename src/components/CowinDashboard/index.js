import {Component} from 'react'

import Loader from 'react-loader-spinner'

import VaccinationCoverage from '../VaccinationCoverage'

import VaccinationByGender from '../VaccinationByGender'

import VaccinationByAge from '../VaccinationByAge'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CowinDashboard extends Component {
  state = {
    vaccinationCoverageList: [],
    vaccinationByAgeList: [],
    vaccinationByGenderList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount = () => {
    this.getData()
  }

  getData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const url = 'https://apis.ccbp.in/covid-vaccination-data'

    const response = await fetch(url)

    if (response.ok === true) {
      const data = await response.json()
      const vaccinationCoverage = data.last_7_days_vaccination.map(eachObj => ({
        vaccineDate: eachObj.vaccine_date,
        dose1: eachObj.dose_1,
        dose2: eachObj.dose_2,
      }))

      const vaccinationByAge = data.vaccination_by_age.map(eachObj => ({
        age: eachObj.age,
        count: eachObj.count,
      }))

      const vaccinationByGender = data.vaccination_by_gender.map(eachObj => ({
        count: eachObj.count,
        gender: eachObj.gender,
      }))

      this.setState({
        vaccinationCoverageList: vaccinationCoverage,
        vaccinationByAgeList: vaccinationByAge,
        vaccinationByGenderList: vaccinationByGender,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  covinDashboard = () => {
    const {
      vaccinationCoverageList,
      vaccinationByAgeList,
      vaccinationByGenderList,
    } = this.state

    return (
      <>
        <VaccinationCoverage
          vaccinationCoverageList={vaccinationCoverageList}
        />

        <VaccinationByGender
          vaccinationByGenderList={vaccinationByGenderList}
        />

        <VaccinationByAge vaccinationByAgeList={vaccinationByAgeList} />
      </>
    )
  }

  getFailureViewContainer = () => (
    <>
      <div className="err-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
          alt="failure view"
          className="failure-view"
        />
        <h1 className="err-msg">Something went wrong</h1>
      </div>
    </>
  )

  getLoadingContainer = () => (
    <div data-testid="loader" className="loading-container">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderViewsBasedOnAPIStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.covinDashboard()
      case apiStatusConstants.failure:
        return this.getFailureViewContainer()
      case apiStatusConstants.inProgress:
        return this.getLoadingContainer()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <nav className="navbar">
          <div className="navbar-container">
            <div className="nav-card">
              <img
                src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
                alt="website logo"
                className="website-logo"
              />
              <p className="website-name">Co-Win</p>
            </div>
            <h1 className="title">CoWIN Vaccination in India</h1>
          </div>
        </nav>
        <div className="bg-container">
          <div className="cards-container">
            {this.renderViewsBasedOnAPIStatus()}
          </div>
        </div>
      </>
    )
  }
}

export default CowinDashboard
