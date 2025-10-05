import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover"
import { Button } from "../ui/button"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { Calendar } from "../ui/calendar"
import { OnSelectHandler } from "react-day-picker"

function DatePickerCustom({ date, setDate }: { date: Date | undefined, setDate: (date: Date | undefined) => void }) {
    return (
        <div className="w-full">
            {/* <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        data-empty={!date}
                        className="data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal"
                    >
                        <CalendarIcon />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto bg-white p-0">
                    <Calendar mode="single" selected={date} onSelect={setDate as OnSelectHandler<Date | undefined>} />
                </PopoverContent>
            </Popover> */}
            <input
                className="w-full shadow rounded border py-3 bg-white px-3"
                type="date"
                value={date ? format(date, "yyyy-MM-dd") : ""}
                onChange={(e) => setDate(new Date(e.target.value))}
            />
        </div>
    )
}

export default DatePickerCustom