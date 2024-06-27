//
EMIC:ifdef(usedFunction.page.show)
export function show(page){
    fetch(`./pages/${page}`) // Cambia esta URL a la que necesitas
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.text();
    })
    .then(html => {
        document.querySelector("#content").innerHTML = html;
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}
EMIC:endif

