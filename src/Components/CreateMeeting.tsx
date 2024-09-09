import styled from "styled-components";
import Calendar from "./Calendar/Calendar";
import FloatingFooter from "./FloatingFooter";
import { useState } from "react";

const CalendarContainer = styled.div`
  margin-bottom: 16px;
`;

const Complete = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #d8b9ff;
  color: #4b015e;
  font-family: "copasetic";
  font-size: 36px;
  width: 295px;
  height: 600px;
  border-radius: 9px;
  position: relative;
  user-select: none;
  &:after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border: 4px solid #481154;
    border-radius: 6px;
    margin: 16px;
  }
`;

const CreateMeeting = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const initialMonth = new Date().getMonth();
  const selectedDates = [startDate, endDate].filter(Boolean);
  const [step, setStep] = useState(0);

  const handleDateClick = (dateString: string) => {
    if (dateString === startDate) {
      setStartDate("");
      setEndDate("");
      return;
    }

    if (dateString === endDate) {
      setEndDate("");
      return;
    }

    if (!startDate) {
      setStartDate(dateString);
      return;
    }

    if (!endDate) {
      setEndDate(dateString);
      return;
    }
  };

  const getCtaVerbiage = () => {
    if (!startDate) {
      return "START DATE";
    }

    if (!endDate) {
      return "END DATE";
    }

    return "CREATE MEETING";
  };

  const handleSubmit = () => {
    setStep(step + 1);
  };

  return step === 0 ? (
    <div>
      <div>
        <CalendarContainer>
          <Calendar
            initialMonth={initialMonth}
            onDateClick={handleDateClick}
            selectedDates={selectedDates}
          />
        </CalendarContainer>
        <FloatingFooter
          disabled={!startDate || !endDate}
          onButtonClick={handleSubmit}
          text={getCtaVerbiage()}
        />
      </div>
    </div>
  ) : (
    <Complete onClick={handleSubmit}>
      <div>I'm glad you're staying here</div>
      {step > 1 && (
        <div
          style={{
            fontFamily: "simplifica",
            fontSize: "24px",
            marginTop: "40px",
          }}
        >
          {"< for now >"}
        </div>
      )}
    </Complete>
  );
};

export default CreateMeeting;
