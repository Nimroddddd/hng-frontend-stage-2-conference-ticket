import { FormControl, MenuItem, Select, InputLabel } from "@mui/material"
import { useEffect, useState } from "react"


export default function First(props) {

  const [ selectedTicket, setSelectedTicket ] = useState("regular")
  const [ ticketAmount, setTicketAmount ] = useState(1)
  
  function changeTicketAmount(e) {
    setTicketAmount(e.target.value)
    console.log(typeof(e.target.value))
    localStorage.setItem("ticketAmount", e.target.value)
  }

  function handleSelectedTicketChange(e) {
    setSelectedTicket(e)
    localStorage.setItem("ticketTier", e)
  }

  useEffect(() => {
    const ticketAmount = localStorage.getItem("ticketAmount")
    const ticketTier = localStorage.getItem("ticketTier")
    setSelectedTicket(ticketTier)
    if(ticketAmount) setTicketAmount(ticketAmount)
  }, [])
  

  return (
    <>
      <div className='flex flex-col items-center px-34 bg-indigo-600 rounded-4xl p-4'>
        <p className='text-3xl'>Techember Fest "25</p>
        <p className='text-center'>Join us for an unforgettable experience Techember. Secure your spot now.</p>
        <p className="text-center">📍04 Rumens road, Ikoyi, Lagos || March 15, 2025 | 7:00 PM</p>
      </div>
      <hr />
      <p aria-label="ticket type">Select Ticket Type:</p>
      <div className='flex gap-3 justify-evenly w-full p-2'>
        <div aria-label="regular" name="REGULAR" className={`cursor-pointer flex flex-col rounded-3xl border-indigo-900 border p-3 basis-1/3 ${selectedTicket === "REGULAR" && "bg-indigo-500"}`} onClick={() => handleSelectedTicketChange("REGULAR")}>
          <p>Free</p>
          <p>REGULAR ACCESS</p>
          <p>20/52</p>
        </div>
        <div aria-label="vip" name="VIP" className={`cursor-pointer flex flex-col rounded-3xl border-indigo-900 border p-3 basis-1/3 ${selectedTicket === "VIP" && "bg-indigo-500"}`} onClick={() => handleSelectedTicketChange("VIP")}>
          <p>$150</p>
          <p>VIP ACCESS</p>
          <p>20/52</p>
        </div>
        <div aria-label="vvip" name="VVIP" className={`cursor-pointer flex flex-col rounded-3xl border-indigo-900 border p-3 basis-1/3 ${selectedTicket === "VVIP" && "bg-indigo-500"}`} onClick={() => handleSelectedTicketChange("VVIP")}>
          <p>$300</p>
          <p>VVIP ACCESS</p>
          <p>20/52</p>
        </div>
      </div>
      <div className='flex flex-col'>
        <p>Number of tickets</p>
        <FormControl className='basis-1'>
          <Select
            labelId="demo-simple-select-label"
             id="demo-simple-select"
            value={ticketAmount}
            onChange={changeTicketAmount}
            sx={{color: "white"}}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className='flex gap-3'>
        <button className='rounded-3xl basis-1/2 p-2 border-indigo-300 border-2 cursor-pointer'>Cancel</button>
        <button className='bg-indigo-300 rounded-3xl basis-1/2 p-2 border-indigo-900 border cursor-pointer' onClick={props.goNext}>Next</button>
      </div>
    </>
  )
}