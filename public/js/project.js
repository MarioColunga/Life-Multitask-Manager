document.getElementById("saveProject").addEventListener("click", saveProject);

async function saveProject(event) {
  event.preventDefault();

  const projectName = document.getElementById("inputProjectName").value.trim();
  const projectDescription = document
    .getElementById("inputProjectDescription")
    .value.trim();
  const params = window.location.href.split("/");
  const userId = params[params.length - 1];
  const deadLine = document.getElementById("inputProjectDeadLine").value.trim();

  if (projectName && projectDescription && userId && deadLine) {
    const response = await fetch("/api/projects/", {
      method: "POST",
      body: JSON.stringify({
        projectName,
        projectDescription,
        userId,
        deadLine,
      }),
      headers: { "Content-Type": "application/json" },
    });
    // document.location = "/profileProjectTableRender/" + userId;
  }
}
