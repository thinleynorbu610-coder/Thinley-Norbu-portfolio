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
    github:[        // one link per account; add or remove freely
      "https://github.com/nthinley817-sys",
      "https://github.com/thinleynorbu610-coder"
    ],
    linkedin:"https://www.linkedin.com/in/thinley-norbu-610372431",
    resume:null     // e.g. "files/resume.pdf"
  },
  stats: [
    {n:"11",l:"Featured Projects"},{n:"15+",l:"Technologies Learned"},
    {n:"4",l:"Near-launch Services"},{n:"4",l:"Learning Areas"}
  ],
  timeline: [
    {year:"2024",title:"Started exploring programming",desc:"First lines of code. Broke a lot of things.",done:true},
    {year:"2025",title:"Started building web projects",desc:"HTML, CSS, JavaScript — then actual deployed sites.",done:true},
    {year:"2026",title:"Developing full-stack projects",desc:"Go and PostgreSQL on the back, React on the front.",done:true},
    {year:"Future",title:"Professional software developer",desc:"Shipping products people rely on.",done:false}
  ],
  projects: [
    {title:"Nexora",category:"Web",status:"wip",statusLabel:"Team project",
     desc:"A technology team website where our team leader and members collaborate to design and build secure, scalable and intelligent digital solutions for real-world problems.",
     focus:["Team collaboration","Real-world solutions"],image:"images/projects/nexora-hero.png",github:"https://github.com/thinleynorbu610-coder/Nexero",demo:"https://nexero.onrender.com",demoLabel:"View Live Preview",details:"team.html",detailsLabel:"Meet the Team"},
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
     focus:["Digital heritage","Bilingual storytelling"],image:"images/projects/buli-trulku-hero.png",github:null,demo:"contact.html",demoLabel:"Request Live Preview",details:null},
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
  road: [
    {name:"Programming Foundations",state:"done"},{name:"HTML & CSS",state:"done"},
    {name:"JavaScript",state:"done"},{name:"Frontend Development",state:"done"},
    {name:"Backend Development",state:"now"},{name:"Databases",state:"now"},
    {name:"Full-Stack Development",state:"next"},{name:"DevOps",state:"next"},
    {name:"Professional Developer",state:"next"}
  ],

  /* ── Nexora team page (team.html) ─────────────────────────────
     photo: null shows a profile icon. To add a real photo, drop it in
     images/team/ and set photo:"images/team/your-name.jpg".
     me:true marks your own card. */
  team: {
    name:"Nexora",
    site:"https://nexero.onrender.com",
    members: [
      {name:"Tshewang Dorji",role:"Team Leader",lead:true,photo:null,
       tagline:"Keeps the team aligned while building intelligent, real-world systems.",
       skills:["Full-Stack Development","AI & ML Prototyping","System Architecture","Team Leadership"]},
      {name:"Thinley Norbu",role:"Full-Stack Developer",me:true,photo:null,
       tagline:"Builds full web platforms for Bhutan, from wireframe to database.",
       skills:["UI/UX Design","Full-Stack Development","Wireframing & Prototyping","Responsive Web Design"]},
      {name:"Jamyang Lodey",role:"Backend Developer",photo:null,
       tagline:"Turns complex requirements into dependable backend systems.",
       skills:["Backend Development","Database Design","System Architecture","Agile Development"]},
      {name:"Tshering Tandin Tobden",role:"Backend Developer",photo:null,
       tagline:"Builds the APIs and data layers Nexora’s products run on.",
       skills:["Backend Development","API Design","Database Design","Server-Side Logic"]},
      {name:"Yeshi Ngedup",role:"Cybersecurity Specialist",photo:null,
       tagline:"Makes sure what Nexora builds is safe to rely on.",
       skills:["Security Assessment","Network Security","Secure Development","Security Best Practices"]}
    ],
    work: [
      {title:"Project LHAKGAY",status:"In development",
       problem:"Only 45% of early-grade students in Bhutan meet reading proficiency benchmarks, with a large urban–rural gap made worse by unreliable rural internet.",
       solution:"An AI recommendation engine with an offline-first design, local caching, offline audio narration and a reward system that keeps young readers engaged.",
       tech:["Python","AI/ML","Offline-first"]},
      {title:"Project RIGPEL",status:"In development",
       problem:"Most Bhutanese firms have no links to training providers, so young people's skills don't connect to real jobs and many leave the country.",
       solution:"A secure Skill Passport and matching engine that connects skills to opportunities, with contracts aligned to the Labour and Employment Act 2007.",
       tech:["PostgreSQL","React","Node.js"]},
      {title:"SmartStudy (Studify)",status:"In development",
       problem:"College students lack a structured way to plan study time and stay consistent, relying on scattered notes and reminders.",
       solution:"A gamified study-planning and task platform that rewards consistency and helps students follow through.",
       tech:["Node.js","PostgreSQL","JavaScript"]},
      {title:"BhutanCare",status:"In development",
       problem:"Hospital services relied on manual booking, records and queues, making care harder to reach and coordinate.",
       solution:"One platform for online appointments, patient profiles, doctor and admin management, lab results and digital queues.",
       tech:["React","Node.js","PostgreSQL"]}
    ],
    services: [
      {title:"Web Development",desc:"Fast, responsive websites and web apps with clean, maintainable code."},
      {title:"Backend Development",desc:"Reliable server-side systems that stay stable under real use."},
      {title:"API Development",desc:"Secure, well-documented APIs that let systems talk cleanly."},
      {title:"Database Solutions",desc:"Data models and optimisation that stay fast as products grow."},
      {title:"Cybersecurity",desc:"Security reviews and hardening built into every project."},
      {title:"System Architecture",desc:"Designs that anticipate scale, with clear boundaries and data flow."},
      {title:"UI/UX Design",desc:"Interfaces built around how people actually use them."},
      {title:"Software Consulting",desc:"Guidance on scoping a build and planning what comes next."}
    ]
  }
};
