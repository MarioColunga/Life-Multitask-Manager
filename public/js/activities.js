document.getElementById("saveActivity").addEventListener("click", saveActivity);

async function saveActivity(event) {
  event.preventDefault();
  console.log("Into saveActivity");

  const userId = document.getElementById("user_Id").innerHTML;
  const projectId = document.getElementById("projectId").innerHTML;
  const activityName = document
    .getElementById("inputActivityName")
    .value.trim();
  const activityDescription = document
    .getElementById("inputActivityDescription")
    .value.trim();
  const activityDeadLine = document
    .getElementById("inputActivityDeadLine")
    .value.trim();
  const startHour = document.getElementById("inputStartHour").value.trim();
  const endHour = document.getElementById("inputEndHour").value.trim();
  if (
    projectId &&
    activityName &&
    activityDescription &&
    activityDeadLine &&
    startHour &&
    endHour
  ) {
    await fetch("/api/activities/", {
      method: "POST",
      body: JSON.stringify({
        projectId,
        activityName,
        activityDescription,
        activityDeadLine,
        startHour,
        endHour,
      }),
      headers: { "Content-Type": "application/json" },
    });
    document.getElementById("inputActivityName").innerHTML = "";
    document.getElementById("inputActivityDescription").innerHTML = "";
    document.getElementById("inputActivityDeadLine").innerHTML = "";
    document.getElementById("inputStartHour").innerHTML = "";
    document.getElementById("inputEndHour").innerHTML = "";
    alert("Activity Saved!!");
  }
}
