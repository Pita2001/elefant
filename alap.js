document.addEventListener("DOMContentLoaded", function () {
    fetch("https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.clubs.json")
        .then(response => response.json())
        .then(data => {
            displayClubs(data.clubs);
        })
        .catch(error => {
            console.error("Hiba történt a JSON adatok lekérése közben:", error);
        });

    function displayClubs(clubs) {
        const container = document.getElementById("jsonContainer");

        clubs.forEach(club => {
            const card = document.createElement("div");
            card.classList.add("club-card");

            const nameDiv = document.createElement("div");
            nameDiv.classList.add("name");
            nameDiv.textContent = club.name;
            card.appendChild(nameDiv);

            const codeDiv = document.createElement("div");
            codeDiv.textContent = `Kód: ${club.code}`;
            card.appendChild(codeDiv);

            const countryDiv = document.createElement("div");
            countryDiv.textContent = `Ország: ${club.country}`;
            card.appendChild(countryDiv);

            if (club.image) {
                const img = document.createElement("img");
                img.src = club.image;
                img.classList.add("club-image");
                img.addEventListener("click", () => openImageModal(club));
                card.appendChild(img);
            } else if (club.link) {
                const link = document.createElement("a");
                link.href = club.link;
                link.textContent = "További információ";
                card.appendChild(link);
            } else {
                const icon = document.createElement("i");
                icon.classList.add("fas", "fa-info-circle", "info-icon");
                icon.addEventListener("click", () => openDetailsModal(club));
                card.appendChild(icon);
            }

            container.appendChild(card);
        });
    }

    function openDetailsModal(club) {
        const modalContent = document.getElementById("modalContent");
        modalContent.innerHTML = "";

        const keys = Object.keys(club);
        keys.forEach(key => {
            const detailRow = document.createElement("p");
            detailRow.innerHTML = `<strong>${key}:</strong> ${club[key]}`;
            modalContent.appendChild(detailRow);
        });

        const modal = document.getElementById("detailsModal");
        modal.style.display = "block";

        const closeModal = document.getElementById("closeModal");
        closeModal.onclick = function () {
            modal.style.display = "none";
        };

        window.onclick = function (event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        };
    }

    function openImageModal(club) {
        const modalContent = document.getElementById("modalContent");
        modalContent.innerHTML = "";
    
        const img = document.createElement("img");
        img.src = club.image;
        img.classList.add("club-image-modal");
    
        modalContent.appendChild(img);
    
        const modal = document.getElementById("detailsModal");
        modal.style.display = "block";
    
        const closeModal = document.getElementById("closeModal");
        closeModal.onclick = function () {
            modal.style.display = "none";
        };
    
        window.onclick = function (event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        };
    }
});
