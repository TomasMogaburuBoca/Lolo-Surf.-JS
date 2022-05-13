const lista = document.getElementById('lista')
fetch('https://jsonplaceholder.typicode.com/posts')  
    .then((response) =>{
        return response.json();
        console.log(response);
    })
    .then((json) =>{
        console.log(json);
        json.forEach( post => {
            let div = document.createElement('div')
            div.innerHTML=  `
                <h4>${post.id}</h4>
                <p>${post.tittle}</p>
                <p>${post.body}</p>
                
            `	
            lista.appendChild(div)
            
        }); 
    })