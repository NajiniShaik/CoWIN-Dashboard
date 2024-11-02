import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts'

import './index.css'

const vaccinationCoverageChart = data => {
  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }

  return (
    <ResponsiveContainer width={1000} height={300}>
      <BarChart
        data={data}
        margin={{
          top: 15,
        }}
      >
        <XAxis
          dataKey="vaccineDate"
          tick={{
            stroke: '#94a3b8',
            strokeWidth: 0,
          }}
        />
        <YAxis
          tickFormatter={DataFormatter}
          tick={{
            stroke: '#94a3b8',
            strokeWidth: 0,
          }}
        />
        <Legend
          wrapperStyle={{
            padding: 30,
          }}
        />
        <Bar dataKey="dose1" name="Boys" fill="#f54394" barSize="20%" />
        <Bar dataKey="dose2" name="Girls" fill="#5a8dee" barSize="20%" />
      </BarChart>
    </ResponsiveContainer>
  )
}

const VaccinationCoverage = props => {
  const {vaccinationCoverageList} = props
  console.log(vaccinationCoverageList)

  return (
    <div className="container">
      <h1 className="container-title">Vaccination Coverage</h1>
      {vaccinationCoverageChart(vaccinationCoverageList)}
    </div>
  )
}

export default VaccinationCoverage
