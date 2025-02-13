import { useState } from "react"
import First from "./components/First"
import Second from "./components/Second"
import Third from "./components/Third"

function App() {

  const [ currentStage, setCurrentStage ] = useState("1")
  const [ currentDetails, setCurrentDetails ] = useState("Ticket Selection")

  return (
    <div className="bg-indigo-300 py-14 lg:text-base text-sm">
      <div className='flex flex-col mx-auto max-w-[800px] bg-indigo-900 h-full py-3 pb-10 text-white rounded-4xl'>
        <div className='flex justify-between mx-[10%]'>
          <p>{currentDetails}</p>
          <p>Step {currentStage}/3</p>
        </div>
        <div className='flex flex-col w-[90%] md:w-[80%] mx-auto mt-10 space-y-6 bg-indigo-700 rounded-4xl p-5'>
          {currentStage === "1" && <First goNext={() => {
            setCurrentStage("2");
            setCurrentDetails("Attendee Details")
          }}/>}
          {currentStage === "2" && 
            <Second goBack={() => {
              setCurrentStage("1")
              setCurrentDetails("Ticket Selection")
              }}
              goNext={() => {
                setCurrentStage("3")
                setCurrentDetails("Ready")
              }}
            />}
          {currentStage === "3" && 
            <Third goFirst={() => {
              setCurrentStage("1")
              setCurrentDetails("Ticket Selection")
            }} />
          }
        </div>
      </div>
    </div>
  )
}

export default App
