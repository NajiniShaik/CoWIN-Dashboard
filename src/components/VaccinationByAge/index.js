import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'

import './index.css'

const vaccinationByAgeChart = data => (
  <ResponsiveContainer width={1000} height={300}>
    <PieChart>
      <Pie
        cx="50%"
        cy="50%"
        data={data}
        startAngle={0}
        endAngle={360}
        innerRadius="0%"
        outerRadius="60%"
        dataKey="count"
      >
        <Cell name="18-44" fill="#2d87bb" />
        <Cell name="45-60" fill="#a3df9f" />
        <Cell name="Above 60" fill="#64c2a6" />
      </Pie>
      <Legend
        iconType="circle"
        layout="horizontal"
        verticalAlign="bottom"
        align="center"
      />
    </PieChart>
  </ResponsiveContainer>
)

const VaccinationByAge = props => {
  const {vaccinationByAgeList} = props

  console.log(vaccinationByAgeList)

  return (
    <div className="vaccination-by-age-container">
      <h1 className="vaccination-by-age-chart-title">Vaccination by Age</h1>
      {vaccinationByAgeChart(vaccinationByAgeList)}
    </div>
  )
}

export default VaccinationByAge
