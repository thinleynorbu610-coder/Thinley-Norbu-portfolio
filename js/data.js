/* ══════════════════════════════════════════════════════════
   CONTENT — edit these arrays, nothing else. This is the only
   file you need to touch to change text.

   Adding images — two ways:
   Project cover images are bundled in images/projects/ and set
   through each project's "image" field below. Visitors cannot
   upload or replace project images from the page.

   Your profile photo lives at images/profile/bg.png.

   Links: any link left as null or "#" is hidden automatically,
   so nothing on the page points nowhere. Fill one in and it
   appears.
   ══════════════════════════════════════════════════════════ */
const DATA = {
  /* contact details — used by the contact section, footer and form */
  contact: {
    email:"nthinley817@gmail.com",
    github:"https://github.com/nthinley817-sys",
    linkedin:null,  // e.g. "https://www.linkedin.com/in/your-profile"
    resume:null     // e.g. "files/resume.pdf"
  },
  stats: [
    {n:"10",l:"Featured Projects"},{n:"15+",l:"Technologies Learned"},
    {n:"4",l:"Near-launch Services"},{n:"4",l:"Learning Areas"}
  ],
  timeline: [
    {year:"2024",title:"Started exploring programming",desc:"First lines of code. Broke a lot of things.",done:true},
    {year:"2025",title:"Started building web projects",desc:"HTML, CSS, JavaScript — then actual deployed sites.",done:true},
    {year:"2026",title:"Developing full-stack projects",desc:"Go and PostgreSQL on the back, React on the front.",done:true},
    {year:"Future",title:"Professional software developer",desc:"Shipping products people rely on.",done:false}
  ],
  projects: [
    {title:"BhutanCare",category:"Web",status:"wip",statusLabel:"In progress",
     desc:"A digital healthcare platform improving hospital appointment booking and patient access to health services.",
     tech:["HTML","CSS","JavaScript","Go","PostgreSQL","Docker"],image:"images/projects/bhutancare-homepage.png",github:"#",demo:"#",details:"#"},
    {title:"QuickBite",category:"Web",status:"live",statusLabel:"Live",
     desc:"QR-based canteen ordering. Students scan a code, browse the menu, and order without queuing.",
     tech:["JavaScript","Node.js","PostgreSQL"],image:"images/projects/quickbite-canteen.png",github:"#",demo:"#",details:"#"},
    {title:"Tourism Data Analysis",category:"Data",status:"live",statusLabel:"Complete",
     desc:"Statistical analysis of tourist arrival trends in Bhutan, with visualisations of seasonality and origin markets.",
     tech:["Python","Pandas","Matplotlib"],image:"images/projects/tourism-data-analysis.png",github:"#",demo:null,details:"#"},
    {title:"Appointment UI Concept",category:"UI/UX",status:"live",statusLabel:"Design",
     desc:"Figma exploration for BhutanCare booking — problem framing, wireframes, and a tested final design.",
     tech:["Figma","Prototyping"],image:"images/projects/appointment-ui-concept.png",github:null,demo:"#",details:"#"},
    {title:"Inventory REST API",category:"Backend",status:"wip",statusLabel:"In progress",
     desc:"A Go service with auth, role-based access, and a normalised Postgres schema.",
     tech:["Go","PostgreSQL","JWT","Docker"],image:"images/projects/inventory-rest-api.png",github:"#",demo:null,details:"#"},
    {title:"Database Systems Project",category:"Academic",status:"live",statusLabel:"Submitted",
     desc:"Coursework building a normalised schema for a library system, with triggers, views and query optimisation.",
     tech:["PostgreSQL","SQL"],image:"images/projects/database-systems.png",github:"#",demo:null,details:"#"},
    {title:"Kyabje Buli Trulku Rinpoche",category:"Web",status:"wip",statusLabel:"Near launch",
     desc:"A bilingual digital storytelling experience documenting Kyabje Buli Trulku Rinpoche's life and spiritual lineage. Contact me to request a preview and confirm the project details.",
     focus:["Digital heritage","Bilingual storytelling"],image:"images/projects/buli-trulku-hero.png",github:null,demo:"#contact",demoLabel:"Request Live Preview",details:null},
    {title:"DrukHaus",category:"Web",status:"wip",statusLabel:"Near launch",
     desc:"A Bhutanese-inspired house design catalog featuring duplex concepts and custom architectural design inquiries. Broader service rollout depends on securing sufficient funding.",
     focus:["Design catalog","Custom inquiries"],image:"images/projects/drukhaus-duplex.jpg",github:null,demo:"https://drukhaus.onrender.com",demoLabel:"View Live Preview",details:null},
    {title:"Heritage Loom",category:"Web",status:"wip",statusLabel:"Near launch",
     desc:"An online marketplace connecting shoppers with Bhutanese artisans, handwoven textiles and locally made crafts. Public service launch depends on securing the project budget.",
     focus:["Artisan marketplace","Bhutanese crafts"],image:"images/projects/heritage-loom.png",github:null,demo:"https://heritage-loom.onrender.com",demoLabel:"View Live Preview",details:null},
    {title:"Yangchen Gatshel HSS",category:"Web",status:"wip",statusLabel:"Near launch",
     desc:"A school website bringing together information, notices, events and community updates for students, parents and staff. Full service rollout depends on securing sufficient funding.",
     focus:["Education","School community"],image:"images/projects/yghss-campus.jpg",github:null,demo:"https://yghss.onrender.com",demoLabel:"View Live Preview",details:null}
  ],
  stack: [
    {group:"Frontend",items:[
      {name:"HTML",level:"Confident",note:"Semantic structure, accessibility, forms.",used:"Every project"},
      {name:"CSS",level:"Confident",note:"Flexbox, Grid, responsive layouts, custom properties.",used:"Every project"},
      {name:"JavaScript",level:"Working",note:"DOM, events, async/await, fetch and APIs.",used:"QuickBite, BhutanCare"},
      {name:"Bootstrap",level:"Working",note:"Fast prototyping before moving to custom CSS.",used:"Early projects"},
      {name:"React",level:"Learning",note:"Components, props, state, hooks.",used:"This website"}]},
    {group:"Backend",items:[
      {name:"Java",level:"Learning",note:"Building a foundation in Java programming.",used:"Current learning"},
      {name:"Go",level:"Working",note:"HTTP handlers, routing, middleware, JSON APIs.",used:"BhutanCare"},
      {name:"Node.js",level:"Working",note:"Express routing and REST endpoints.",used:"QuickBite"}]},
    {group:"Database",items:[
      {name:"PostgreSQL",level:"Working",note:"Schema design, joins, normalisation, CRUD, indexes.",used:"Most backend projects"}]},
    {group:"Tools",items:[
      {name:"Git",level:"Confident",note:"Branching, commits, merge conflicts, history.",used:"Everything"},
      {name:"GitHub",level:"Confident",note:"Pull requests, issues, collaboration, Pages.",used:"Everything"},
      {name:"VS Code",level:"Confident",note:"Extensions, debugger, integrated terminal.",used:"Daily"},
      {name:"Docker",level:"Learning",note:"Containers, images, compose, volumes.",used:"BhutanCare"},
      {name:"Agile",level:"Learning",note:"Learning iterative planning and collaborative delivery.",used:"Current learning"}]},
    {group:"Data & Analysis",items:[
      {name:"Data analytics",level:"Learning",note:"Exploring data preparation, analysis, and communicating insights.",used:"Current learning"}]},
    {group:"Design",items:[
      {name:"Figma",level:"Working",note:"Wireframes, components, auto layout, prototyping.",used:"UI/UX work"}]}
  ],
  skills: [
    {name:"HTML",pct:90},{name:"CSS",pct:85},{name:"JavaScript",pct:70},
    {name:"Go",pct:60},{name:"PostgreSQL",pct:60},{name:"Docker",pct:50}
  ],
  logs: [
    {topic:"REST APIs",category:"Backend",date:"August 2026",status:"Completed",difficulty:3,
     learned:"Resource naming, HTTP verbs and status codes, and why statelessness matters for scaling.",
     applied:"Rebuilt the Inventory API with proper routes and consistent error responses.",
     next:"Pagination, rate limiting, and API versioning.",tech:["Go","JSON","Postman"]},
    {topic:"HTML & CSS",category:"Frontend",date:"March 2025",status:"Completed",difficulty:1,
     learned:"Semantic HTML, responsive layouts, Flexbox and Grid, and modern CSS custom properties.",
     applied:"Built my first three sites without a framework, mobile-first.",
     next:"Container queries and CSS nesting.",tech:["HTML","CSS"]},
    {topic:"JavaScript",category:"Programming",date:"July 2025",status:"Completed",difficulty:3,
     learned:"DOM manipulation, event handling, fetch, promises and async/await.",
     applied:"Made QuickBite menus load and update without a page refresh.",
     next:"Modules, bundling, and TypeScript.",tech:["JavaScript"]},
    {topic:"Git & GitHub",category:"DevOps",date:"May 2025",status:"Completed",difficulty:2,
     learned:"Version control, branching strategy, commits, pull requests, resolving conflicts.",
     applied:"Every project since. Recovered work I would otherwise have lost, twice.",
     next:"GitHub Actions and CI pipelines.",tech:["Git","GitHub"]},
    {topic:"PostgreSQL",category:"Database",date:"January 2026",status:"Completed",difficulty:3,
     learned:"Database design, normalisation, joins, relationships, CRUD, and basic indexing.",
     applied:"Designed the BhutanCare appointment schema so double-booking is impossible at the DB level.",
     next:"Query plans, transactions and isolation levels.",tech:["PostgreSQL","SQL"]},
    {topic:"UI/UX Fundamentals",category:"UI/UX",date:"April 2026",status:"In progress",difficulty:2,
     learned:"Visual hierarchy, spacing systems, and testing a design with real users before building it.",
     applied:"Redesigned the BhutanCare booking flow after watching three people fail at it.",
     next:"Accessibility auditing and design systems.",tech:["Figma"]},
    {topic:"Java Programming",category:"Programming",date:"Currently learning",status:"In progress",difficulty:2,
     learned:"Building a foundation in Java syntax, object-oriented programming, and core language concepts.",
     applied:"Working through programming exercises as I learn.",
     next:"Create a small Java application and continue practising.",tech:["Java","OOP"]},
    {topic:"Agile Methods",category:"Project Management",date:"Currently learning",status:"In progress",difficulty:2,
     learned:"Learning how teams plan work iteratively, collaborate, and adapt as projects evolve.",
     applied:"Exploring how Agile practices can support my project work.",
     next:"Practise breaking work into small, reviewable tasks.",tech:["Agile","Planning"]},
    {topic:"Data Analytics",category:"Data",date:"Currently learning",status:"In progress",difficulty:2,
     learned:"Developing skills in understanding datasets, finding patterns, and communicating useful insights.",
     applied:"Connecting data analysis concepts with my tourism data project.",
     next:"Continue practising analysis and data visualisation.",tech:["Python","Pandas"]},
    {topic:"Mathematics for Programming",category:"Mathematics",date:"Currently learning",status:"In progress",difficulty:2,
     learned:"Strengthening mathematical foundations that support programming and analytical problem-solving.",
     applied:"Practising problem-solving concepts alongside programming.",
     next:"Keep building confidence with logic and discrete mathematics.",tech:["Logic","Problem solving"]}
  ],
  notes: [
    {title:"Undo the last commit, keep the changes",cat:"Git",fav:true,
     body:"Rewinds the last commit but leaves your files alone. The one I actually use.",
     code:"git reset --soft HEAD~1",tags:["git","commands"]},
    {title:"The N+1 query problem",cat:"Database",fav:true,
     body:"Looping over rows and querying inside the loop turns 1 query into 101. Use a join or a single WHERE IN.",
     code:null,tags:["postgres","performance"]},
    {title:"Centre anything with Grid",cat:"CSS",fav:false,
     body:"Two lines. Works regardless of the child size.",
     code:"display: grid;\nplace-items: center;",tags:["css","layout"]},
    {title:"Go error handling habit",cat:"Go",fav:false,
     body:"Wrap errors with context as they travel up, so the log tells you where it actually broke.",
     code:'if err != nil {\n  return fmt.Errorf("fetch user: %w", err)\n}',tags:["go","errors"]},
    {title:"Mistake: I stored passwords as plain text",cat:"Lessons",fav:true,
     body:"In my first login form. Hash with bcrypt, always, and never invent your own auth scheme.",
     code:null,tags:["security","mistakes"]},
    {title:"Kill the process on a busy port",cat:"Terminal",fav:false,
     body:"When the server says the port is already in use.",
     code:"lsof -ti:3000 | xargs kill -9",tags:["terminal","commands"]},
    {title:"Idea: offline-first for weak connections",cat:"Ideas",fav:false,
     body:"Campus wifi drops constantly. A service worker plus a local cache would make most of my apps usable anyway.",
     code:null,tags:["ideas","pwa"]},
    {title:"Semantic HTML is free accessibility",cat:"CSS",fav:false,
     body:"A button element gets keyboard support, focus and screen reader roles for nothing. A styled div gets none of it.",
     code:null,tags:["html","a11y"]}
  ],
  road: [
    {name:"Programming Foundations",state:"done"},{name:"HTML & CSS",state:"done"},
    {name:"JavaScript",state:"done"},{name:"Frontend Development",state:"done"},
    {name:"Backend Development",state:"now"},{name:"Databases",state:"now"},
    {name:"Full-Stack Development",state:"next"},{name:"DevOps",state:"next"},
    {name:"Professional Developer",state:"next"}
  ]
};
