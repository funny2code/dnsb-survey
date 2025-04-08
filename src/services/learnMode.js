const elements = [
  {
    name: "timer",
    title: "COUNT UP OR COUNT DOWN TIMER",
    description: "Keeps track of time and displays Progress status",
    rotation: "",
    position: { left: "8%", top: "5%" },
    widget: "",
  },
  {
    name: "start",
    title: "START",
    description: "User controls when to begin",
    rotation: "",
    position: { left: "150px", top: "40px" },
    widget: "",
  },
  {
    name: "pause",
    title: "PAUSE",
    description: `A one time, five minutes maximum for a bathroom break 
                    or to place that takeout order. An overlay comes onto the 
                    timer that counts down using text that goes from green to 
                    orange to red. The button area goes blue and text changes 
                    to say CONTINUE.`,
    rotation: "",
    position: { left: "80%", top: "40px" },
    widget: "",
  },
  {
    name: "add_to_story",
    title: "ADD IT",
    description: `When TALK is active, the respondent has recorded their 
                additional choice as seen in the text balloon this button becomes 
                blue and blinks three times, pauses for five seconds and blinks three 
                times again in a cycle of three times. When an answer is completed in 
                a widget below it is also blue to allow someone to move the answer up 
                with a touch rather than a swipe`,
    rotation: "rotate(-90deg)",
    position: { left: "140px", top: "210px" },
    widget: "",
  },
  {
    name: "preview",
    title: "PREVIEW",
    description: `See a story as it builds or unabridged at the end. 
                    We use the Answer Queue area to display completed story content. 
                    Use Roll to Scroll arrows to move earlier or later. Simply click 
                    outside the Answer Queue to make it disappear`,
    rotation: "",
    position: { left: "80%", top: "210px" },
    widget: "",
  },
  {
    name: "compare",
    title: "COMPARE",
    description: `When the number of responses exceeds Thirty 
                for the aggregate sample on specific Questions 
                that are pre-selected, randomly chosen, or triggered 
                by survey monitoring behavior that raises Concern over 
                respondent engagement intensity, edge will appear as a 
                small figure next to the compare button and it will be blue 
                (active). If touched, or herwise chosen the system checks to 
                make sure the respondent has completed that question and then 
                presents a side by side set on rings, Single bars or clustered 
                bars that shows their response On the left-hand side and that other 
                respondent To the right. The button remains blue, and The text is changed 
                to say Continue`,
    rotation: "rotate(-90deg)",
    position: { left: "30%", top: "87%" },
    widget: "",
  },

  {
    name: "exit",
    title: "EASY EXIT",
    description: `(We don’t ask for confirmation. If you press it, we are sorry to see you go, but “Goodbye”)`,
    rotation: "",
    position: { left: "80%", top: "763px" },
    widget: "",
  },
  {
    name: "pdf_it",
    title: "PDF IT",
    description: `Available upon successful end point of a Narrative 
                  surveys generates a .dpf of the story with blanks filled 
                  with answers up to 25 characters. Answers that exceed the 
                  maximum display character count show a partial listing on 
                  the storyline page and use a superscript number to correspond 
                  to a final page that has those numbers and the response answers 
                  to all questions as a series of footnotes. This includes choices 
                  or choices with weights, percentages, importance values, or rankings 
                  or ratings with the traditional version of the question placed to its 
                  Left replacing the Sentences with blanks`,
    rotation: "0",
    position: { left: "80px", top: "87%" },
    widget: "",
  },
  {
    name: "add_choice",
    title: "",
    description: "",
    rotation: "",
    position: { left: "10%", top: "100%" },
    widget: "barrel",
  },

  {
    name: "continue",
    title: "",
    description: "",
    rotation: "",
    position: { left: "10%", top: "100%" },
    widget: "barrel",
  },
  {
    name: "barrel",
    title: "",
    description: "",
    rotation: "",
    position: { left: "10%", top: "100%" },
    widget: "barrel",
  },
  {
    name: "barrel_lever",
    title: "",
    description: "",
    rotation: "",
    position: { left: "10%", top: "100%" },
    widget: "barrel",
  },
  {
    name: "sticky_arrow_multiple",
    title: "",
    description: "",
    rotation: "",
    position: { left: "10%", top: "100%" },
    widget: "barrel",
  },
  {
    name: "sticky_arrow_single",
    title: "",
    description: "",
    rotation: "",
    position: { left: "10%", top: "100%" },
    widget: "barrel",
  },
  {
    name: "sick_arrow_ranking",
    title: "",
    description: "",
    rotation: "",
    position: { left: "10%", top: "100%" },
    widget: "barrel",
  },
  {
    name: "sticky_arrow_rating",
    title: "",
    description: "",
    rotation: "",
    position: { left: "10%", top: "100%" },
    widget: "barrel",
  },
  {
    name: "barrel_choice_list",
    title: "",
    description: "",
    rotation: "",
    position: { left: "10%", top: "100%" },
    widget: "barrel",
  },
  {
    name: "bar",
    title: "",
    description: "",
    rotation: "",
    position: { left: "10%", top: "100%" },
    widget: "bar",
  },
  {
    name: "bar_counter_button",
    title: "",
    description: "",
    rotation: "",
    position: { left: "10%", top: "100%" },
    widget: "bar",
  },
  {
    name: "bar_counter",
    title: "",
    description: "",
    rotation: "",
    position: { left: "10%", top: "100%" },
    widget: "bar",
  },
  {
    name: "ring",
    title: "",
    description: "",
    rotation: "",
    position: { left: "10%", top: "100%" },
    widget: "ring",
  },
  {
    name: "ring_lever",
    title: "",
    description: "",
    rotation: "",
    position: { left: "10%", top: "100%" },
    widget: "ring",
  },
  {
    name: "ring_choice_list",
    title: "",
    description: "",
    rotation: "",
    position: { left: "10%", top: "100%" },
    widget: "ring",
  },
  {
    name: "ring_tally",
    title: "",
    description: "",
    rotation: "",
    position: { left: "10%", top: "100%" },
    widget: "ring",
  },
  {
    name: "ring_total",
    title: "",
    description: "",
    rotation: "",
    position: { left: "10%", top: "100%" },
    widget: "ring",
  },
  {
    name: "triad",
    title: "",
    description: "",
    rotation: "",
    position: { left: "10%", top: "100%" },
    widget: "triad",
  },
  {
    name: "triad_puck",
    title: "",
    description: "",
    rotation: "",
    position: { left: "10%", top: "100%" },
    widget: "triad",
  },
  {
    name: "triad_choice_list",
    title: "",
    description: "",
    rotation: "",
    position: { left: "10%", top: "100%" },
    widget: "triad",
  },
];

export default elements;
