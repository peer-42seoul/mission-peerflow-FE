// import {
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
//   SelectChangeEvent,
// } from '@mui/material'
// import React from 'react'

// interface DropdownProp {
//   changeOptions: (e: SelectChangeEvent<HTMLSelectElement>) => void
//   option: any[]
// }

// const Dropdown = ({ changeOptions, option }: DropdownProp) => {
//   return (
//     <FormControl fullWidth>
//       <InputLabel id="demo-simple-select-label">Age</InputLabel>
//       <Select
//         labelId="demo-simple-select-label"
//         id="demo-simple-select"
//         value={1}
//         label="option"
//         onChange={changeOptions}
//       >
//         {option.map((option) => (
//           <MenuItem key={option.value} value={option.value}>
//             {option.name}
//           </MenuItem>
//         ))}
//       </Select>
//     </FormControl>
//   )
// }

// export default Dropdown

// import {
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
//   SelectChangeEvent,
// } from '@mui/material'
// import React, { useState } from 'react'

// interface DropdownProp {
//   changeOptions: (value: string) => void
//   option: any[]
// }

// const Dropdown = ({ changeOptions, option }: DropdownProp) => {
//   const [optionValue, setOptionValue] = useState('')

//   const handleOptionChange = (e: SelectChangeEvent<HTMLSelectElement>) => {
//     const selectedValue = e.target.value
//     console.log(`whiat is selectedValue ${selectedValue}`)
//     setOptionValue(selectedValue)
//     changeOptions(selectedValue)
//   }

//   return (
//     <FormControl fullWidth>
//       <InputLabel id="demo-simple-select-label">게시판 타입</InputLabel>
//       <Select
//         labelId="demo-simple-select-label"
//         id="demo-simple-select"
//         value={optionValue}
//         label="option"
//         onChange={handleOptionChange}
//       >
//         {option.map((option) => (
//           <MenuItem key={option.value} value={option.value}>
//             {option.name}
//           </MenuItem>
//         ))}
//       </Select>
//     </FormControl>
//   )
// }

// export default Dropdown
