const forAllOfClassName = (className, action) =>
    Array.from(document.getElementsByClassName(className)).forEach((el) => action(el));
const forAllOfTagName = (className, action) =>
    Array.from(document.getElementsByTagName(className)).forEach((el) => action(el));

function addBackground() {
    let l1 = document.createElement("div")
    l1.className = "bg1"
    document.body.appendChild(l1)
    let l2 = document.createElement("div")
    l2.className = "bg2"
    document.body.appendChild(l2)
    let l3 = document.createElement("div")
    l3.className = "bg3"
    document.body.appendChild(l3)
}

function addHeader(curpage, sticky) {
    let self = document.currentScript;
    let header = document.createElement("header")
    let counter = 0
    let curpagetext = () => {
        counter++;
        if (counter == curpage) return `<span class="sub hideportrait">(you're here)</span>`
        return ``
    }
    let checkSticky = () => {
        if (sticky) return `stickyheader`
        return ``
    }
    header.innerHTML = `
        <style>
            .stickyheader {
                @media(orientation: landscape) {
                    position: sticky;
                    top: 25px;
                }
            }
        </style>
        <div class="textbox alt ${checkSticky()}">
            <div class="avbox hstretch">
                <a href="index.html" class="menubutton">main ${curpagetext()}</a>
                <a href="projects.html" class="menubutton">projects ${curpagetext()}</a>
            </div>
        </div>
    `
    self.parentElement.appendChild(header)
}

function calculateAge(dateString) {
    const today = new Date();
    const birthDate = new Date(dateString);
    const m = today.getMonth() - birthDate.getMonth();
    let age = today.getFullYear() - birthDate.getFullYear();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    if (!age) age = 19;
    return age;
}

function initWavyText(){
    let delay = 70;
    let upValue = -5;

    let elements = document.getElementsByTagName('wavy');
    let root = document.querySelector(':root');
    root.style.setProperty('--wavy-text-up-value', upValue + 'px');

    for (let i = 0; i < elements.length; i++){
        let element = elements[i];
        let space = element.getAttribute("space") || 1;
        let text = element.textContent;
        if (text !== "" && text !== null) {
            element.innerHTML = text
                .split("")
                .map(letter => {
                    return `<span style="margin: 0px ${space}px;">` + letter + `</span>`;
                })
                .join("");

            Array.from(element.children).forEach((span, index) => {
                setTimeout(() => {
                span.classList.add("wavy-effect");
                }, (index * delay) % (text.length * delay));
            });
        }
    }

}

function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (!targetId) return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function init() {
    initWavyText();
    initSmoothScrolling();

    const ageSpan = document.getElementById("ageSpan");
    if (ageSpan) ageSpan.textContent = calculateAge("2007-02-15");
}

document.addEventListener("DOMContentLoaded", init)
