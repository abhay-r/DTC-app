import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Header from "./components/Home/Header/Header";
import Second from "./components/Second/Second";
// import Condition from "./components/Second/Condition/Condition";
import Login from "./components/Login/login";
function App() {
  const question = {'No power': [
    {
      Que: "Are there any signs of power from the system?",
      heading: "Check the laptop for any signs of power (Est. 1 Minute)",
      subHeading: "Check for the below signs of power",
      desc: [
        "Anything being displayed on the screen",
        "Power LED lights up (even if temporary)",
        "Status LED lights up (even if temporary)",
        "Any beep codes or fan sounds are heard",
      ],
      Note: "",
      important: "",
      yes:['false','5',''],
      No:[false,'1',''],
    },
    {
      Que: "Did the hard reset resolve the issue?",
      heading:
        "Use a known good outlet and perform a hard reset on the laptop (Est. 2 Minute)",
      subHeading: "",
      desc: [
        "Disconnect any external devices including the AC adapter",
        "Hold the power button down for 10 seconds (20 seconds for Alienware).",
        "Bypass any power strips, surge protectors or battery backups",
        " Verify the wall outlet is functional",
        "Proceed to the next step",
        "Plug only the AC adapter back into the laptop",
        "Attempt to power on the system",
      ],
      Note: "Restart the computer (if the computer boots) to ensure the issue is resolved.",
      important:
        "Be sure the power button is held down for the entire 10 seconds (20 sec for Alienware) or the system may not fully reset. If the reset was performed correctly, the Dell logo screen should be seen before Windows starts to load",
      yes:[true,'','Troubleshooting flow ended'],
      No:[false,'2',''],
    
    },

    {
      Que: "That was the result of M-BIST when run? MBIST Failed - Solid Amber Light, MBIST Pass - LED Light Off. If No LED select No else Yes",
      heading:'Perform M-BIST (Motherboard Built in Self Test) (Est. 1 Minute)',
      subHeading:'M-BIST is a hardware level diagnostic which will identify low level motherboard failures….Leave the AC adapter plugged into the system.',
      desc: [
        "Hold down the M key on the keyboard and press the power button at the same time.",
        "Look at the battery LED for the result of the diagnostic.",
        "A solid amber light indicates a failure."
      ],
      Note:'',
      important:'',
      yes:['','',''],
      No:[false,'3',''],
  
    },
    {
      Que: "What is the type and location of the damage? If No damage select No",
      heading:'Check the AC adapter/power cord and DC port/USB C for damage (Est. 1 Minute)',
      subHeading:'',
      desc: [
        "Check if the connector pins are bent or missing/broken off.",
        "Check if the power cord or DC cable is damaged or frayed.",  
        "Types of damage can include kinks, cuts, loose ports, punctures such as animal bites.",
        "Check whether the DC-in/USB C port on the system is loose or broken in any way.",
        "The DC-in/USB C port should not be loose and barrel style connectors should have a center plastic stand in the center of the port as seen in the image.",
        "Check for debris. Ensure the ports and connectors are free from debris."
      ],
      Note:'For more information on -How to Identify AC Adapter Damage on Dell Systems – Refer',
      important:'',
      yes:['','',''],
      No:[false,'4',''],
    },
    {
      Que: "Does the system power on with the known good adapter?",
      heading:'Test with a known good AC adapter (Est. 3 Minute)',
      subHeading:'',
      desc: [
        "Check whether a known good AC adapter is available to test with. Be sure that any adapter being used to test with meets the wattage requirements of the computer.",
        "Attempt to power on the system with the known good AC adapter plugged in.",  
      ],
      Note:'For more information on -How to Identify AC Adapter Damage on Dell Systems – Refer',
      important:'',
      yes:['','',''],
      No:[true,'','R1 Replace MotherBoard'],
    },
    {
      Que: "Can The customer use the caps Lock key?",
      heading:'VERIFY THAT THE CAPS LOCK KEY CAN BE TOGGLED BY THE USER.',
      subHeading:'',
      desc: [
        "The system turns on, but there is no video or it can't get past the Dell screen { May power back off }.",
        "The Caps Lock key won't light up while it is toggled.", 
        "If the hard drive activity light is not flickering, it can be solidly on, consistently on, or off.",
        ".Depending on the system, diagnostic codes may be present and vary. 1. The power button can flash a recurrent code. 2. On or off power button with a numeric code displayed in LEDs; this button may be on the back of some devices. 3. Repeating beeps that can be heard." 
      ],
      Note:'For more information on -How to Identify AC Adapter Damage on Dell Systems – Refer',
      important:'',
      yes:[false,'6',''],
      No:[true,'','Tranfer to No Boot Troubleshooting'],
      
    },
    {
      Que: "Is the Dell logo visible to the customer?",
      heading:'Check whether Dell logo is visible to the customer',
      subHeading:'',
      desc: [
        "The system turns on with video and moves past the Dell screen before disappearing, but it does not enter Windows.",
        "The Caps Lock key will light up when toggled.",
        "The hard drive activity light may be on all the time, flicker, or be off.",
        "On the screen, there can be an error message.",
        "There won't be any diagnostic codes, and the power button will solidly illuminate in its normally operational colour.",
         "Operating system sounds won't be audible."
      ],
      Note:'For more information on -How to Identify AC Adapter Damage on Dell Systems – Refer',
      important:'',
      yes:[true,'','Tranfer to No Boot Troubleshooting'],
      No:[true,'','Tranfer to No Video and Distorted Video Troubleshooting'],
    },
  ]}
  // 'Do you find any FAN noise?',
  // 'Is system Hanging/Restarting?',
  // 'User shared video?',
  // 'User shared images?',
  // 'CPU- Powering ON?',
  // 'Keyboard Capslock and Numlock is working?',
  // 'EPSA done?'

  const [issue, setIssue] = useState("");
  // const [index,setIndex] = useState(0)
  const [userResponse, setUserResponse] = useState([]);
  const [display, setDisplay] = useState("none");
  const [data, setData] = useState({
    brand: "Dell",
    model: "",
    issues: "",
    product: "",
    case: "",
  });
  return (
    <>
      <Router>
        <Header display={display} />
        <Routes>
          <Route
            path="/"
            element={<Home setIssue={setIssue} data={data} setData={setData} />}
          />
          <Route path="/login" element={<Login setDisplay={setDisplay} />} />

          <Route
            path="/:issue/:id"
            element={<Second data={data} issues={issue} question={question} userResponse={userResponse} setUserResponse={setUserResponse} />}
          >
            {/* <Route path=':id' element={<Condition issues={issue} question={question} />}/> */}
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
