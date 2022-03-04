document.getElementById('saveActivity').addEventListener('click', saveActivity);

async function saveActivity(){
  event.preventDefault();
  console.log('Into saveActivity');
  
  const projectId = document.getElementById('projectId').innerHTML;
  const activityName = document.getElementById('inputActivityName').value.trim();
  const activityDescription = document.getElementById('inputActivityDescription').value.trim();  
  const activityDeadLine = document.getElementById('inputActivityDeadLine').value.trim();
  const startHour = document.getElementById('inputStartHour').value.trim();
  const endHour = document.getElementById('inputEndHour').value.trim();

  if (projectId && activityName && activityDescription && activityDeadLine && startHour && endHour) {
    //const response = await fetch('/api/users/saveProject', {
    const response = await fetch('/api/activities/', {
      method: 'POST',
      body: JSON.stringify({ projectId,activityName,activityDescription,activityDeadLine,startHour,endHour }),
      headers: { 'Content-Type': 'application/json' },
    });
  }
  
}
