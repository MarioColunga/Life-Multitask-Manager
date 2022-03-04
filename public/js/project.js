document.getElementById('saveProject').addEventListener('click', saveProject);

async function saveProject(){
  event.preventDefault();
  console.log('Into saveProject');
  const projectName = document.getElementById('inputProjectName').value.trim();
  const projectDescription = document.getElementById('inputProjectDescription').value.trim();
  const userId = 1;
  const deadLine = document.getElementById('inputProjectDeadLine').value.trim();

  if (projectName && projectDescription && userId && deadLine) {
    //const response = await fetch('/api/users/saveProject', {
    const response = await fetch('/api/projects/', {
      method: 'POST',
      body: JSON.stringify({ projectName, projectDescription, userId, deadLine }),
      headers: { 'Content-Type': 'application/json' },
    });
    console.log('project Saved!!');
    document.location = '/profileProjectTableRender/'+userId;
  }
}
