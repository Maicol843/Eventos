let events = [];

const eventName = document.querySelector("#eventName");
const eventDate = document.querySelector("#eventDate");
const buttoAdd = document.querySelector("#bAdd");

const json = load();
const arr = JSON.parse(json);
events = [...arr];
renderEvents();

document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
});

buttonAdd.addEventListener("click", (e) => {
    addEvent();
});

function addEvent(){
    if (eventName.value === "" || eventDate.value === ""){
        return;
    }
    if (datediff(eventDate.value) < 0){
        return;
    }


    const newEvent = {
        id: (Math.random() * 100).toString(36).slice(2),
        name: eventName.value,
        date: eventDate.value,
    };

    events.unshift(newEvent);
    save(JSON.stringify(events));
    eventName.value = "";
    renderEvents();
}

function renderEvents(){
    const eventsHTML = events.map((event) => {
        return `
            <div class = "task">
                <div class = "days">
                    <span class = "days-number">${datediff(event.date)}</span>
                    <span class = "days-text">días</span>
                </div>
                <div class = "event-name">${event.name}</div>
                <div class = "event-date">${event.date}</div>
                <div class = "actions">
                    <button data-id = "${event.id} class = "bDelete">Eliminar</button>
                </div>
            </div>`;
    });

    document.querySelector("#tasksContainer").innerHTML = eventsHTML.join("");

    document.querySelectorAll(".bDelete").forEach((button) => {
        button.addEventListener("click", (e) => {
            const id = button.getAttribute("data-id");
            events = events.filter((event) => event.id !== id);
            save();
            renderEvents();
        });
    });
}
