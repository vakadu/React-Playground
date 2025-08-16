"use client";

import Dropdown from './dropdown.jsx';

export default function App() {
	return (
		<div className="App">
			<Dropdown data={['bangalore', 'chennai', 'vizag', 'trivandrum', 'pune']} />
		</div>
	);
}
