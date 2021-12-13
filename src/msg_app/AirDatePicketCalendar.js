import AirDatepicker from "air-datepicker";
import "air-datepicker/air-datepicker.css";
import { useEffect, useRef } from "react";

function AirDatepickerReact(props) {
  let $input = useRef();
  let dp = useRef();

  // Start init
  /* eslint-disable */
  useEffect(() => {
    // Save instance for the further update
    dp.current = new AirDatepicker($input.current, { ...props });
  }, []);

  useEffect(() => {
    // Update if props are changed
    dp.current.update({ ...props });
    // handleCalendar(dp.current);
  }, [props]);

  //   console.log(dp.current);

  return <input ref={$input} />;
}

export default AirDatepickerReact;
