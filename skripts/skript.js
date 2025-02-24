const iconLink = "CDB_Imgs/ikons";
const mediaList = document.querySelectorAll(".media-list");
const search = document.querySelectorAll(".search");

function changeIcon(element, type, x) {
    function change(z) {
        element.src = `${iconLink}/${x}-${z}.svg`;
    }

    switch (type) {
        case "mouseenter":
        case "mouseover":
        case "focus":
            change("hover");
            break;
        case "mouseleave":
        case "mouseout":
        case "blur":
            change(element.getAttribute("icon"));
            break;
        case "click":
            change("activated");
            let timer = setTimeout(
                () => change(element.getAttribute("icon")),
                300
            );
    }
}

function icons(e) {
    let t = e.target;
    if (t.hasAttribute("icon")) {
        let type = e.type;
        let x = t.src.slice(t.src.lastIndexOf("/") + 1, t.src.lastIndexOf("-"));
        changeIcon(t, type, x);
    }
}

function searchE(e) {
    t = e.target;
    if (e.type == "focus") {
        inp = e.target.firstElementChild;
        img = e.target.parentElement.lastElementChild.lastElementChild;

        e.target.parentElement.removeEventListener("mouseenter", searchE);
        e.target.parentElement.removeEventListener("mouseleave", searchE);

        changeIcon(
            img,
            e.type,
            img.src.slice(
                img.src.lastIndexOf("/") + 1,
                img.src.lastIndexOf("-")
            )
        );
        return;
    }
    if (e.type == "blur") {
        inp = e.target.firstElementChild;
        img = e.target.parentElement.lastElementChild.lastElementChild;

        e.target.parentElement.addEventListener("mouseenter", searchE);
        e.target.parentElement.addEventListener("mouseleave", searchE);

        changeIcon(
            img,
            e.type,
            img.src.slice(
                img.src.lastIndexOf("/") + 1,
                img.src.lastIndexOf("-")
            )
        );
    }
    if (t.classList.contains("search")) {
        inp = e.target.firstElementChild;
        img = e.target.lastElementChild.lastElementChild;

        changeIcon(
            img,
            e.type,
            img.src.slice(
                img.src.lastIndexOf("/") + 1,
                img.src.lastIndexOf("-")
            )
        );
    }
}

mediaList.forEach((item) => {
    item.addEventListener("mouseover", icons);
    item.addEventListener("mouseout", icons);
    item.addEventListener("click", icons);
});

search.forEach((item) => {
    item.addEventListener("mouseenter", searchE);
    item.addEventListener("mouseleave", searchE);
    item.firstElementChild.addEventListener("focus", searchE);
    item.firstElementChild.addEventListener("blur", searchE);
    item.lastElementChild.lastElementChild.addEventListener("click", icons);
});
