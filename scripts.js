const apiBaseUrl = 'http://localhost:8080/api/cursos';

// Função para buscar todos os cursos e exibir na lista
function fetchCourses() {
    fetch(apiBaseUrl)
        .then(response => response.json())
        .then(courses => {
            const courseList = document.getElementById('courseList');
            courseList.innerHTML = ''; // Limpa a lista

            courses.forEach(course => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <span><strong>${course.nome}</strong>: ${course.descricao} - ${course.conteudo}</span>
                    <button onclick="deleteCourse(${course.id})">Deletar</button>
                `;
                courseList.appendChild(li);
            });
        });
}

// Função para adicionar um novo curso
document.getElementById('courseForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const descricao = document.getElementById('descricao').value;
    const conteudo = document.getElementById('conteudo').value;

    fetch(apiBaseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, descricao, conteudo })
    })
    .then(response => response.json())
    .then(() => {
        document.getElementById('courseForm').reset(); // Limpa o formulário
        fetchCourses(); // Atualiza a lista de cursos
    });
});

// Função para deletar um curso
function deleteCourse(id) {
    fetch(`${apiBaseUrl}/${id}`, { method: 'DELETE' })
    .then(() => fetchCourses());
}

// Buscar os cursos ao carregar a página
window.onload = fetchCourses;
