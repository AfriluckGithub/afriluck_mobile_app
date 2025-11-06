import { Button } from "@heroui/button";
import React, { useState } from "react";

export const datePresetsOptions = [
  { name: "Today", id: 0 },
  { name: "This Week", id: 1 },
  { name: "Last Week", id: 2 },
  { name: "This Month", id: 3 },
  { name: "Last Month", id: 4 },
  { name: "First Quarter", id: 5 },
  { name: "Second Quarter", id: 6 },
  { name: "Third Quarter", id: 7 },
  { name: "Fourth Quarter", id: 8 },
  { name: "Year", id: 9 },
];

export const quickFilterTimeOptions = [
  { name: "Anopa", id: 10 },
  { name: "Midday", id: 11 },
  { name: "Afriluck", id: 12 },
];

export const winsLossesOptions = [
  { name: "Wins", id: 13 },
  { name: "Losses", id: 14 },
];

export const getDateRange = (filterId) => {
  const today = new Date();
  const startOfDay = new Date(today.setHours(0, 0, 0, 0));
  const endOfDay = new Date(today.setHours(23, 59, 59, 999));

  switch (filterId) {
    case 0:
      return { start: startOfDay, end: endOfDay };
    case 1:
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay());
      return { start: startOfWeek, end: endOfDay };
    case 2:
      const lastWeekStart = new Date(today);
      lastWeekStart.setDate(today.getDate() - today.getDay() - 7);
      const lastWeekEnd = new Date(lastWeekStart);
      lastWeekEnd.setDate(lastWeekStart.getDate() + 6);
      return { start: lastWeekStart, end: lastWeekEnd };
    case 3:
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      return { start: startOfMonth, end: endOfDay };
    case 4:
      const lastMonthStart = new Date(
        today.getFullYear(),
        today.getMonth() - 1,
        1
      );
      const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);
      return { start: lastMonthStart, end: lastMonthEnd };
    default:
      return null;
  }
};

export const applyFilters = (
  results,
  appliedStartDate,
  appliedEndDate,
  appliedFilter
) => {
  let filtered = [...results];

  if (appliedStartDate || appliedEndDate) {
    filtered = filtered.filter((result) => {
      const resultDate = new Date(result.date);
      const start = appliedStartDate ? new Date(appliedStartDate) : null;
      const end = appliedEndDate ? new Date(appliedEndDate) : null;

      if (start && end) {
        return resultDate >= start && resultDate <= end;
      } else if (start) {
        return resultDate >= start;
      } else if (end) {
        return resultDate <= end;
      }
      return true;
    });
  }

  if (appliedFilter !== null && appliedFilter <= 9) {
    const dateRange = getDateRange(appliedFilter);
    if (dateRange) {
      filtered = filtered.filter((result) => {
        const resultDate = new Date(result.date);
        return resultDate >= dateRange.start && resultDate <= dateRange.end;
      });
    }
  }

  if (appliedFilter !== null && appliedFilter >= 10) {
    filtered = filtered.filter((result) => {
      const drawUpper = result.draw?.toUpperCase() || "";

      if (appliedFilter === 10) {
        return drawUpper.includes("ANOPA");
      }
      if (appliedFilter === 11) {
        return drawUpper.includes("MIDDAY");
      }
      if (appliedFilter === 12) {
        return drawUpper.includes("L7M");
      }
      if (appliedFilter === 13) {
        return result.status === "won";
      }
      if (appliedFilter === 14) {
        return result.status === "lost";
      }
      return true;
    });
  }

  return filtered;
};

function Filter({
  onApplyFilters,
  datePresets = datePresetsOptions,
  quickFilters = quickFilterTimeOptions,
  showButton = true,
}) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const clearInputFields = () => {
    const startInput = document.getElementById("filter-start-date");
    const endInput = document.getElementById("filter-end-date");
    if (startInput) startInput.value = "";
    if (endInput) endInput.value = "";
  };

  const handleReset = () => {
    setStartDate("");
    setEndDate("");
    setSelectedFilter(null);
    clearInputFields();
    onApplyFilters({
      startDate: "",
      endDate: "",
      selectedFilter: null,
    });
  };

  const handleApply = (e) => {
    e.stopPropagation();
    onApplyFilters({
      startDate,
      endDate,
      selectedFilter,
    });
    closeModal();
  };

  const handleCancel = (e) => {
    e.stopPropagation();
    closeModal();
  };

  return (
    <>
      {/* Backdrop */}
      {isModalOpen && (
        <div
          onClick={closeModal}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(76, 76, 76, 0.32)",
            zIndex: 998,
            transition: "opacity 0.3s ease",
          }}
        />
      )}

      {/* Filter Styles */}
      <style>
        {`
          .bg-option-one {
            background-color: #156064;
            border: solid 4px #156064;
            color: white;
          }
          .bg-option-two {
            background-color: transparent;
            border: solid 2px #156064;
            color: #156064;
          }
          .universal {
            border-radius: 12px;
            margin: 3px;
            padding: 5px;
            width: auto;
            transition: all 0.45s ease;
            cursor: pointer;
          }

          .date-field {
            padding: 8px;
            border-radius: 5px;
            border: 1px solid #D9D9D9;
            width: 100%;
            color: #717171;
            background-color: #D9D9D9;
          }

          .date-field::-webkit-datetime-edit-text {
            color: #71717193;
          }
          .date-field::-webkit-datetime-edit-month-field,
          .date-field::-webkit-datetime-edit-day-field,
          .date-field::-webkit-datetime-edit-year-field {
            color: #717171;
          }

          .date-field:valid {
            color: #000000ff;
          }
        `}
      </style>

      {/* Filter Button */}
      {showButton && (
        <div
          className={
            isModalOpen
              ? "filter-btn text-white flex flex-col"
              : "filter-btn text-white flex flex-col justify-center items-center"
          }
          onClick={openModal}
          style={{
            height: isModalOpen ? "auto" : "60px",
            minHeight: isModalOpen ? "33rem" : "60px",
            maxHeight: isModalOpen ? "90vh" : "60px",
            width: isModalOpen ? "25rem" : "70px",
            borderRadius: "20px",
            overflow: isModalOpen ? "auto" : "hidden",
            zIndex: 999,
            position: "absolute",
            top: 125,
            right: 15,
            transition: "height 0.4s ease, width 0.4s ease",
            backgroundColor: isModalOpen ? "#F7F7F7" : "#156064",
          }}
        >
          {isModalOpen ? (
            <div>
              {/* Filter Contents */}
              <div style={{ marginTop: "20px" }}>
                <div
                  className="date-picker-section"
                  style={{
                    margin: "20px",
                    marginTop: "0px",
                    fontWeight: "500",
                  }}
                >
                  <p style={{ color: "black" }}>Filter by date</p>

                  <div
                    style={{ display: "flex", gap: "10px", marginTop: "10px" }}
                  >
                    {/* Start Date */}
                    <div>
                      <label style={{ color: "#949494", fontSize: "14px" }}>
                        From
                      </label>
                      <input
                        className="date-field"
                        id="filter-start-date"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                    </div>

                    {/* End Date */}
                    <div>
                      <label style={{ color: "#949494", fontSize: "14px" }}>
                        To
                      </label>
                      <input
                        className="date-field"
                        id="filter-end-date"
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        min={startDate}
                      />
                    </div>
                  </div>

                  {/* Date Presets */}
                  {datePresets.length > 0 && (
                    <>
                      <hr style={{ margin: "18px", background: "#green" }} />
                      <div>
                        <p style={{ color: "black", marginBottom: "10px" }}>
                          Quick Filters
                        </p>
                        <div className="flex grid-or-flex-container items-center justify-center flex-wrap">
                          {datePresets.map((datePreset) => (
                            <div
                              key={datePreset.id}
                              onClick={() => setSelectedFilter(datePreset.id)}
                              className={
                                selectedFilter === datePreset.id
                                  ? "universal bg-option-one"
                                  : "universal bg-option-two"
                              }
                            >
                              <p>{datePreset.name}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {/* Quick Filters */}
                  {quickFilters.length > 0 && (
                    <>
                      <hr style={{ margin: "12px", background: "#green" }} />
                      <div
                        style={{ marginBottom: "20px" }}
                        className="flex grid-or-flex-container items-center justify-center flex-wrap"
                      >
                        {quickFilters.map((timeOption) => (
                          <div
                            key={timeOption.id}
                            onClick={() => setSelectedFilter(timeOption.id)}
                            className={
                              selectedFilter === timeOption.id
                                ? "universal bg-option-one"
                                : "universal bg-option-two"
                            }
                          >
                            <p>{timeOption.name}</p>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {/* Action Buttons */}
                  <div
                    className="choice-btns flex flex-row"
                    style={{
                      justifyContent: "space-between",
                      marginTop: "35px",
                    }}
                  >
                    <Button
                      style={{
                        background: "black",
                        color: "white",
                        width: "100px",
                        height: "40px",
                      }}
                      onPress={handleReset}
                    >
                      Reset
                    </Button>

                    <div>
                      <Button
                        style={{
                          background: "#C8C8C8",
                          marginRight: "2px",
                          color: "black",
                          width: "100px",
                          height: "40px",
                        }}
                        onClick={handleCancel}
                      >
                        Cancel
                      </Button>
                      <Button
                        className="bg-primary"
                        style={{
                          marginLeft: "2px",
                          color: "white",
                          width: "100px",
                          height: "40px",
                        }}
                        onClick={handleApply}
                      >
                        Apply
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <svg
              className="text-center"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              color="#ffffff"
              fill="none"
            >
              <path
                d="M3 7H6"
                stroke="#ffffff"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3 17H9"
                stroke="#ffffff"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18 17L21 17"
                stroke="#ffffff"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15 7L21 7"
                stroke="#ffffff"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 7C6 6.06812 6 5.60218 6.15224 5.23463C6.35523 4.74458 6.74458 4.35523 7.23463 4.15224C7.60218 4 8.06812 4 9 4C9.93188 4 10.3978 4 10.7654 4.15224C11.2554 4.35523 11.6448 4.74458 11.8478 5.23463C12 5.60218 12 6.06812 12 7C12 7.93188 12 8.39782 11.8478 8.76537C11.6448 9.25542 11.2554 9.64477 10.7654 9.84776C10.3978 10 9.93188 10 9 10C8.06812 10 7.60218 10 7.23463 9.84776C6.74458 9.64477 6.35523 9.25542 6.15224 8.76537C6 8.39782 6 7.93188 6 7Z"
                stroke="#ffffff"
                strokeWidth="1.5"
              />
              <path
                d="M12 17C12 16.0681 12 15.6022 12.1522 15.2346C12.3552 14.7446 12.7446 14.3552 13.2346 14.1522C13.6022 14 14.0681 14 15 14C15.9319 14 16.3978 14 16.7654 14.1522C17.2554 14.3552 17.6448 14.7446 17.8478 15.2346C18 15.6022 18 16.0681 18 17C18 17.9319 18 18.3978 17.8478 18.7654C17.6448 19.2554 17.2554 19.6448 16.7654 19.8478C16.3978 20 15.9319 20 15 20C14.0681 20 13.6022 20 13.2346 19.8478C12.7446 19.6448 12.3552 19.2554 12.1522 18.7654C12 18.3978 12 17.9319 12 17Z"
                stroke="#ffffff"
                strokeWidth="1.5"
              />
            </svg>
          )}
        </div>
      )}
    </>
  );
}

export default Filter;
