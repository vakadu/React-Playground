import { useState, useRef, useEffect } from 'react';

export default function Dropdown({ data }) {
	const [open, setOpen] = useState(false);
	const [selected, setSelected] = useState([]);
	const ref = useRef();

	const handleSelect = (city) => {
		let newValues = [...selected];
		if (newValues.includes(city)) {
			newValues = newValues.filter((item) => item !== city);
		} else {
			newValues.push(city);
		}
		setSelected(newValues);
	};

	const handleOutside = (e) => {
		if (ref && ref.current && !ref.current.contains(e.target)) {
			setOpen(!open);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleOutside);

		return () => {
			document.addEventListener('mousedown', handleOutside);
		};
	}, []);

	return (
		<div
			ref={ref}
			style={{ position: 'relative' }}
		>
			<div
				style={{ maxWidth: 200, border: '1px solid' }}
				onClick={() => setOpen(!open)}
			>
				{selected.length > 0 ? selected?.join(',') : 'Choose State'}
			</div>
			{open && (
				<div style={{ position: 'absolute' }}>
					{data?.map((city) => {
						return (
							<div>
								<input
									type="checkbox"
									checked={selected.includes(city)}
									onChange={() => handleSelect(city)}
								/>
								{city}
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
}
