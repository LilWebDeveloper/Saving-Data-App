import React, { useState } from "react";
import { Popover } from "@headlessui/react";
import { format, parse, isValid} from "date-fns";
import { DatepickerProps } from "../interfaces/DatepickerProps";

const Datepicker: React.FC<DatepickerProps> = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(value);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    onChange?.(date);
    setOpen(false);
  };

  return (
    <div className="relative">
      <Popover className="relative">
        {({ open }) => (
          <div className="mt-2">
            <input
              id='Data urodzenia'
              name="Data urodzenia"
              type="date"
              value={selectedDate ? format(selectedDate, "yyyy-MM-dd") : ""}
              onChange={(e) => {
                const date = parse(e.target.value, "yyyy-MM-dd", new Date());
                if (isValid(date)) handleDateChange(date);
              }}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        )}
      </Popover>
    </div>
  );
};

export default Datepicker;
