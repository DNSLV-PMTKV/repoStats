import React from 'react';
import { CartesianGrid, Label, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const Chart = (props) => {
	return (
		<ResponsiveContainer width='75%' height='40%'>
			<LineChart
				width={400}
				height={400}
				data={props.data}
				margin={{
					top: 50
				}}
			>
				<Line type='monotone' dataKey='count' stroke='#8884d8' dot={{ r: 4 }} strokeWidth={2} />
				<Line type='monotone' dataKey='unique' stroke='#82ca9d' />
				<CartesianGrid stroke='#ccc' />
				<XAxis dataKey='name'>
					<Label value={props.repo} offset={250} position='top' />
				</XAxis>
				<YAxis scale='linear' />
				<Legend />
				<Tooltip />
				<CartesianGrid strokeDasharray='3 3' />
			</LineChart>
		</ResponsiveContainer>
	);
};

export default Chart;
