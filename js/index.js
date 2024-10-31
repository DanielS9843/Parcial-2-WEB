let currentPage = 1;
let apiUrl = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos';
let apiKey = 'DEMO_KEY';

document.addEventListener("DOMContentLoaded", () => {
    fetchPhotos("2015-07-02");
});

async function fetchPhotos(date) {
    let url = `${apiUrl}?earth_date=${date}&api_key=${apiKey}&page=${currentPage}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayPhotos(data.photos);
        
        if (data.photos.length > 0) {
            displayPhotoDetail(data.photos[0]);
        } else {
            document.getElementById("photo-detail").innerHTML = "<p>There are no photos available for this date.</p>";
        }
    } catch (error) {
        console.error("Error getting photo:", error);
    }
}

function displayPhotos(photos) {
    const photoList = document.getElementById("photo-list");
    photoList.innerHTML = ""; 

    photos.forEach(photo => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${photo.id}</td>
            <td>${photo.rover.name}</td>
            <td>${photo.camera.full_name}</td>
            <td><button onclick='displayPhotoDetail(${JSON.stringify(photo)})'>More</button></td>
        `;

        photoList.appendChild(row);
    });
}

function displayPhotoDetail(photo) {
    const photoDetail = document.getElementById("photo-detail");
    photoDetail.innerHTML = `
        <img src="${photo.img_src}" alt="Foto de Marte" style="width: 100%; max-width: 400px;">
        <p><strong>ID:</strong> ${photo.id}</p>
        <p><strong>Martian Sol:</strong> ${photo.sol}</p>
        <p><strong>Earth Date:</strong> ${photo.earth_date}</p>
    `;
}

function searchByDate() {
    const date = document.getElementById("date").value;
    currentPage = 1;
    fetchPhotos(date);
}

function nextPage() {
    currentPage++;
    const date = document.getElementById("date").value;
    fetchPhotos(date);
}

function previousPage() {
    if (currentPage > 1) currentPage--;
    const date = document.getElementById("date").value;
    fetchPhotos(date);
}

