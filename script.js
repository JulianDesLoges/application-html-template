///////////////////
//// Templates ////
///////////////////

const staticTemplates = {
    "own-name": "Max Mustermann",
    "own-street": "Musterstraße 42",
    "own-postal": "12345 Musterstadt",
    "own-place-of-residence": "Musterstadt",
    "own-phone": "12345 67891011",
    "own-mobile": "1234 5678910",
    "own-email": "max@mustermann.com",
    "own-birth": "01.01.1975 in Musterstadt",

    "address-hint1": "",
    "address-hint2": "",
    "address-hint3": "",
    "company-name": "Musterfirma GmbH",
    "contact-title": "Frau",
    "contact-surname": "Petra",
    "contact-name": "Personal",
    "company-street": "Musterstraße 8-10",
    "company-postal": "12345 Musterstadt",

    "cl-subject": "Bewerbung als Projektleiter",
    "salutation-start": "Sehr geehrte",
    "cl-text":
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    At in tellus integer feugiat scelerisque. Aliquam nulla facilisi cras fermentum. Lectus sit amet est placerat in.
    Nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper.
    <br/>
    <br/>
    Morbi leo urna molestie at elementum eu facilisis. Id donec ultrices tincidunt arcu non sodales neque. Est pellentesque
    elit ullamcorper dignissim. Vestibulum sed arcu non odio euismod. Aliquet eget sit amet tellus cras adipiscing enim. Rutrum
    tellus pellentesque eu tincidunt tortor aliquam. Cras pulvinar mattis nunc sed. Nulla at volutpat diam ut venenatis tellus in
    metus. Viverra nam libero justo laoreet. Dui sapien eget mi proin sed libero.
    <br/>
    <br/>
    Integer quis auctor elit sed vulputate mi. Neque sodales ut etiam sit amet nisl purus.
    Vel fringilla est ullamcorper eget nulla facilisi etiam. Elementum eu facilisis sed odio morbi
    quis commodo odio aenean. Urna molestie at elementum eu facilisis sed odio morbi. Nulla malesuada pellentesque elit
    eget gravida cum sociis natoque penatibus. Egestas fringilla phasellus faucibus scelerisque eleifend donec. Dictumst
    vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras. Urna et pharetra pharetra massa massa ultricies. Vitae
    congue mauris rhoncus aenean. Ut diam quam nulla porttitor massa. In nisl nisi scelerisque eu ultrices vitae.
    <br/>
    <br/>
    Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Gravida rutrum quisque non tellus orci.
    <br/>`
};


const skillTemplates = [
    {
        "name": "IT-Kenntnisse",
        "type": "scale",
        "skills": {
            "MS Office": 0.65,
            "Adobe CC": 0.5,
            "HTML / CSS": 0.83,
            "CMS": 0.4
        }
    },
    {
        "name": "Fremdsprachen",
        "type": "text",
        "skills":  {
            "Englisch": "C2",
            "Spanisch": "B2",
            "Italienisch": "A2"
        },
    }
]


const cvTemplates = [
    {
        "name": "Berufserfahrung",
        "stations": [
            {
                "timespan": "2019 - jetzt",
                "name": "Dritte Station GmbH",
                "details": [
                    "Senior Projektmanager"
                ]
            },
            {
                "timespan": "2017 - 2019",
                "name": "Zweite GmbH und Co. KG",
                "details": [
                    "Projektmanager"
                ]
            },
            {
                "timespan": "2015 - 2017",
                "name": "Erstes Beispiel GmbH",
                "details": [
                    "Junior Projektmanager"
                ]
            },
        ]
    },
    {
        "name": "Ausbildung",
        "stations": [
            {
                "timespan": "2012 - 2015",
                "name": "Universität Musterstadt",
                "details": [
                    "BWL-Studium",
                    "Schwerpunkt: Marketing und Management",
                    "Abschuss: Bachelor of Science"
                ]
            },
            {
                "timespan": "2004 - 2012",
                "name": "Muster-Gymnasium",
                "details": [
                    "Leistungsfächer: Mathe und Englisch",
                    "Abschluss: Abitur"
                ]
            }
        ]
    }
]


const dynamicTemplates = {
    "date": fillDate,
    "page-count": fillPageCount,
};


///////////////////////
//// Page creation ////
///////////////////////

const MAX_SKILL_POINTS = 6;
const leftColContent = document.querySelector(".page.cv .col-left .content");
const rightColContent = document.querySelector(".page.cv .col-right .content");
const pages = document.querySelectorAll(".page");

main();


function main() {

    document.querySelectorAll("[static-template]").forEach((element, index, array) => {
        element.innerHTML = staticTemplates[element.attributes["static-template"].value];
    });
    
    
    document.querySelectorAll("[dynamic-template]").forEach((element, index, array) => {
        element.innerHTML = dynamicTemplates[element.attributes["dynamic-template"].value](element, index, array);
    });

    
    createSkillSection();
    createCVSection();
}


//////////////////////////////////
//// Dynamic template filling ////
//////////////////////////////////

function fillDate(element, index, array) {
    return new Date().toLocaleDateString("de", { day: "2-digit", month: "2-digit", year: "numeric" });
}


function fillPageCount(element, index, array) {

    let pageIndex;
    pages.forEach((el, i, arr) => {
        if (el.querySelector("[dynamic-template='page-count']") === element) {
            pageIndex = i + 1;
            return;
        }
    });

    return "Seite " + pageIndex + " von " + pages.length;
}


////////////////////////
//// Skill creation ////
////////////////////////

function createSkillSection() {

    for (const skillBlock of skillTemplates) {
        createSkillBlock(skillBlock);
    }
}


function createSkillBlock(skillBlock) {

    const createSkillFn = skillBlock.type === "scale" ? createScaleSkill : createTextSkill;

    const skillBlockEl = createElement({ classes: "skill-block" });
    const skillTitleEl = createElement({ tag: "h2", innerHTML: skillBlock.name });
    skillBlockEl.appendChild(skillTitleEl);

    for (const skill in skillBlock.skills) {
        skillBlockEl.appendChild(createSkillFn(skill, skillBlock.skills[skill]));
    }

    leftColContent.appendChild(skillBlockEl);
}


function createScaleSkill(skillName, skillValue) {

    const skillEl = createElement({ classes: "skill" });
    const textEl = createElement({ classes: "text", innerHTML: skillName });
    skillEl.appendChild(textEl);

    const skillPointsEl = createElement({ classes: "skill-points"});
    skillEl.appendChild(skillPointsEl);

    for (let i = 0; i < MAX_SKILL_POINTS; i++) {
        const skillPointEl = createElement({ classes: "skill-point" });

        if (Math.round(skillValue * MAX_SKILL_POINTS) > i) {
            skillPointEl.classList.add("filled")
        }

        skillPointsEl.appendChild(skillPointEl);
    }

    return skillEl;
}


function createTextSkill(skillName, skillValue) {

    const skillEl = createElement({ classes: "skill" });
    const textEl = createElement({ classes: "text", innerHTML: skillName });
    skillEl.appendChild(textEl);

    const skillPointsEl = createElement({ classes: "skill-points"});
    skillEl.appendChild(skillPointsEl);

    const skillPointEl = createElement({ innerHTML: skillValue });
    skillPointsEl.appendChild(skillPointEl);

    return skillEl;
}


/////////////////////
//// CV creation ////
/////////////////////

function createCVSection() {

    for (const section of cvTemplates) {

        const sectionTitleEl = createElement({ tag: "h1" });
        sectionTitleEl.innerHTML = section.name;
        rightColContent.appendChild(sectionTitleEl);

        for (const station of section.stations) {

            const timespanEl = createElement({ classes: "timespan", innerHTML: station.timespan });
            rightColContent.appendChild(timespanEl);

            const descriptionEl = createElement({ classes: "description", });
            rightColContent.appendChild(descriptionEl)

            const descriptionTitleEl = createElement({ tag: "h2", innerHTML: station.name });
            descriptionEl.appendChild(descriptionTitleEl);

            const unorderedListEl = createElement({ tag: "ul"});
            descriptionEl.appendChild(unorderedListEl);
            
            for (descriptionPoint of station.details) {

                const listEntryEl = createElement({tag: "li", innerHTML: descriptionPoint});
                unorderedListEl.appendChild(listEntryEl);
            }

        }
    }
}


///////////////
//// Utils ////
///////////////

function createElement(options) {

    const element = document.createElement(options.tag ? options.tag : "div");
    if (options.classes) { element.classList.add(options.classes); }
    element.innerHTML = options.innerHTML ? options.innerHTML : "";
    return element;
}