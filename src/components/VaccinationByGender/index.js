import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'

import './index.css'

const vaccinationByGenderChart = data => (
  <ResponsiveContainer width={1000} height={300}>
    <PieChart>
      <Pie
        cx="50%"
        cy="50%"
        data={data}
        startAngle={180}
        endAngle={0}
        innerRadius="40%"
        outerRadius="70%"
        dataKey="count"
      >
        <Cell name="Male" fill="#f54394" />
        <Cell name="Female" fill=" #5a8dee" />
        <Cell name="Others" fill="#2cc6c6" />
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

const VaccinationByGender = props => {
  const {vaccinationByGenderList} = props

  console.log(vaccinationByGenderList)

  return (
    <div className="vaccination-by-gender-container">
      <h1 className="vaccination-by-gender-chart-title">
        Vaccination by gender
      </h1>
      {vaccinationByGenderChart(vaccinationByGenderList)}
    </div>
  )
}

export default VaccinationByGender
