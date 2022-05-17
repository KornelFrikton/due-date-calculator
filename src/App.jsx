import React, { useEffect, useState } from "react";

function App() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [day, setDay] = useState("");
  const [hour, setHour] = useState(0);

  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");

  const [selectedDate, setSelectedDate] = useState("");

  const handleDateChange = (e) => {
    setDate(e.target.value);
    setSelectedDate(new Date(e.target.value));
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  const handleTurnaroundChange = (e) => {
    setHour(e.target.value);
  };

  useEffect(() => {
    const weekday = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    if (selectedDate !== "") {
      setDay(weekday[selectedDate.getDay()]);
    }
    // eslint-disable-next-line
  }, [date]);

  const calculateDueDate = (e) => {
    e.preventDefault();
    setSelectedDate(new Date(date));

    if (day === "Saturday" || day === "Sunday") {
      alert("Please choose a weekday!");
    } else {
      const timeArray = time.split(":");
      let plusHour = parseInt(time) + (hour % 8);
      let plusDay = parseInt(hour / 8);
      const newHour = parseInt(time) + parseInt(hour);
      if (newHour < 17 || (newHour === 17 && timeArray[1] === "00")) {
        timeArray[0] = newHour.toString();
      } else if (plusHour < 17 || (plusHour === 17 && timeArray[1] === "00")) {
        timeArray[0] = plusHour.toString();
      } else {
        plusHour = plusHour - 17 + 9;
        timeArray[0] = plusHour.toString();
        plusDay++;
      }
      setNewTime(timeArray.toString().replace(",", ":"));

      let calculatedDate = selectedDate.setDate(selectedDate.getDate());
      let skippedDay = 0;
      let calculatedDay = 0;
      while (plusDay > skippedDay) {
        calculatedDate = selectedDate.setDate(selectedDate.getDate() + 1);
        calculatedDay = new Date(calculatedDate).getDay();
        if (calculatedDay === 6 || calculatedDay === 0) {
          plusDay++;
        }
        skippedDay++;
      }
      const finalDate = new Date(calculatedDate).toLocaleDateString("en-EN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        weekday: "long",
      });
      setNewDate(finalDate);
    }
  };

  return (
    <div className="App">
      <form action="" method="get" onSubmit={calculateDueDate}>
        <div>
          <label htmlFor="date">
            Please set the submit date (only weekdays):
          </label>
          <input
            type="date"
            label="date"
            value={date}
            onChange={handleDateChange}
            required
          ></input>
          Submit day: {day}
        </div>
        <div>
          <label htmlFor="time">
            Please set the submit time (only between 9:00 and 17:00):
          </label>
          <input
            type="time"
            label="time"
            value={time}
            min="09:00"
            max="17:00"
            onChange={handleTimeChange}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="turnaround">
            Please set the turnaround time (hours):
          </label>
          <input
            type="number"
            label="turnaround"
            value={hour}
            min="0"
            onChange={handleTurnaroundChange}
            required
          ></input>
        </div>
        <input type="submit" value="Calculate"></input>
      </form>
      <h2>The issue is resolved:</h2>
      <div>
        <p>Date: {newDate}</p>
        <p>Time: {newTime}</p>
      </div>
    </div>
  );
}

export default App;