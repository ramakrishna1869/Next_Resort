

import { useState } from 'react';
import { DateRange } from 'react-date-range';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

const CalenderComponent = ({onDatesSelect}) => {
    const [showCalender, setShowCalender] = useState(false)
    const [date, setDate] = useState([
        {
            startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
        }
    ])

    const [selectedDates, setSelectedDates] = useState(null)

    const handleSelectDates = async()=>{
        const startDate = date[0].startDate.toLocaleDateString();
        const endDate = date[0].endDate.toLocaleDateString();
        
        setSelectedDates(`Selected Dates: ${startDate} - ${endDate}`)
        setShowCalender(false)

        const bookingDates = {startDate, endDate}

        console.log("selectedDates form calender:",bookingDates)

        if(onDatesSelect){
            onDatesSelect(bookingDates)
        }
    }

    const currentDate = new Date().toDateString();
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate()+1)

    const formattedDate = nextDate.toDateString()

  return (
    <div className="max-w-md mx-auto">
      {/* Date Display Button */}
      <div 
        className="bg-white border-2 border-gray-300 rounded-lg p-4 cursor-pointer hover:border-primary-500 transition-colors duration-200 mb-4"
        onClick={() => setShowCalender(!showCalender)}
      >
        <div className="flex items-center justify-between">
          <div>
            {!selectedDates ? (
              <div className="text-gray-600">
                <span className="text-sm font-medium">Select dates</span>
                <div className="text-xs text-gray-500 mt-1">
                  {`${currentDate} - ${formattedDate}`}
                </div>
              </div>
            ) : (
              <div className="text-primary-600 font-medium">
                {selectedDates}
              </div>
            )}
          </div>
          <svg 
            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${showCalender ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Calendar */}
      {showCalender && (
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 mb-4">
          <DateRange
            editableDateInputs={true}
            onChange={item => setDate([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={date}
            className="w-full"
          />
        </div>
      )}
      
      {/* Select Button */}
      <button 
        onClick={handleSelectDates}
        className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
      >
        Confirm Dates
      </button>
    </div>
  )
}

export default CalenderComponent

