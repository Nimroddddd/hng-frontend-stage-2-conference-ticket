import { useEffect, useState } from "react"

export default function Third(props) {

  const [imageUrl, setImageUrl] = useState("")
  const [email, setEmail] = useState("")
  const [request, setRequest] = useState("")
  const [name, setName] = useState("")
  const [ticketAmount, setTicketAmount] = useState("")
  const [ticketTier, setTicketTier] = useState("")

  useEffect(() => {
    const loadedAvatar = localStorage.getItem("avatar")
    const loadedEmail = localStorage.getItem("email")
    const loadedRequest = localStorage.getItem("request")
    const loadedName = localStorage.getItem("name")
    const loadedTicketAmount = localStorage.getItem("ticketAmount")
    const loadedTicketTier = localStorage.getItem("ticketTier")

    setImageUrl(loadedAvatar)
    setEmail(loadedEmail)
    setRequest(loadedRequest)
    setName(loadedName)
    setTicketAmount(loadedTicketAmount)
    setTicketTier(loadedTicketTier)

  })
  return (
    <>
      <h1 className="text-3xl text-center">Your Ticket is Booked!</h1>
      <p className="text-center">Check your email for a copy or you can <span>download</span></p>
      <div className="p-5 border shadow-2xl rounded-2xl">
        <div className=" bg-indigo-400 p-5 text-center rounded-3xl" >
          <p className="text-3xl">Techember Fest "25</p>
          <p>📍 04 Rumens road, Ikoyi, Lagos</p>
          <p>March 15, 2025 | 7:00 PM</p>
          <img src={imageUrl} className="rounded-3xl mt-5 w-[80%] mx-[10%]"/>
          <div className="flex flex-col gap-1 mt-7 bg-indigo-600 p-5 rounded-3xl">
            <div className="flex justify-between gap-1">
              <p className="bg-indigo-500 basis-1/2 p-1 md:p-3">{name}</p>
              <p className="bg-indigo-500 basis-1/2 p-1 md:p-3">{email}</p>
            </div>
            <div className="flex justify-between gap-1">
              <p className="bg-indigo-500 basis-1/2 p-1 md:p-3">{ticketTier}</p>
              <p className="bg-indigo-500 basis-1/2 p-1 md:p-3">{ticketAmount} {ticketAmount == 1 ? "Ticket" : "Tickets"}</p>
            </div>
            <p className="text-left bg-indigo-500 h-16 max-h-16 overflow-hidden"><span className="font-extralight">special request: </span>{request ? request : "Nil"}</p>
          </div>
        </div>
      </div>
      <div className='flex gap-3'>
        <button className='rounded-3xl basis-1/2 p-2 border-indigo-300 border-2 cursor-pointer' onClick={props.goFirst}>Book Another Ticket</button>
        <button className='bg-indigo-300 rounded-3xl basis-1/2 p-2 border-indigo-900 border cursor-pointer'>Download Ticket</button>
      </div>
    </>
  )
}